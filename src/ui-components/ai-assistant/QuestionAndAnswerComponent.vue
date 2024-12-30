<template>
  <div class="w-100">
    <KnowledgeAssetsPopup
      v-if="isKAPopupOpen"
      :source-knowledge-assets="kaPopupAssets"
      :expanded="clickedAssetUal"
      @close="closeKAPopup"
    />
    <div class="answer-page-wrapper">
      <div
        ref="answerRowRef"
        class="question-answer-row"
        @scroll="handleMainSectionScroll"
      >
        <el-scrollbar class="page-scrollbar flex-grow-1">
          <div
            v-for="(qaPair, index) in qaPairs"
            :key="index"
            class="answer-section-wrapper d-flex flex-column"
            :class="{ 'is-thinking': isLoadingForIndex[index] }"
            :data-answerIndex="index"
          >
            <QuestionComponent
              ref="latestQuestionRefs"
              :question-text="
                qaPair.hasVideos
                  ? qaPair.question.split('\n\n')[0]
                  : qaPair.question
              "
            />
            <ThinkingComponent
              v-if="isLoadingForIndex[index]"
              ref="LatestThinkingRefs"
              :thinking-message="thinkingMessage"
              :streamed-s-k-as="streamedSKAs"
            />
            <AnswerComponent
              v-else-if="qaPair.answer"
              ref="latestAnswerRefs"
              :answer-index="index"
              :coordinates="qaPair.answer.coordinates"
              :answer="qaPair.answer.answer"
              :files="qaPair.answer.files"
              :table-data="qaPair.answer.tableData"
              :images="qaPair.answer.images"
              :videos="qaPair.answer.videos"
              :source-knowledge-assets="qaPair.answer.sourceKnowledgeAssets"
              :follow-up-prompt-suggestions="
                qaPair.answer.followUpPromptSuggestions
              "
              :is-latest-answer="index === qaPairs.length - 1"
              :sentiment-score="qaPair.answer?.sentimentScore"
              :error="qaPair.answer.isError"
              @select-prompt="handleSelectPrompt"
              @open-ka-list="handleOpenKAList"
            />
            <ErrorComponent
              v-else-if="qaPair.error"
              ref="latestErrorRefs"
              :error-message="qaPair.error.errorMessage"
            />
          </div>
          <el-button
            v-if="!isLoading"
            :icon="RefreshLeft"
            class="start-again"
            size="large"
            circle
            @click.stop="goToHome"
          />
        </el-scrollbar>
      </div>
      <div class="prompt-input-row">
        <PromptInput
          ref="promptInputRef"
          class="col-12"
          placeholder-text="Ask anything..."
          :value="promptInputValue"
          :should-disable-input="isLoading"
          @update:value="promptInputValue = $event"
          @ask-question="askQuestion"
          @audio-question-asked="handleAudioQuestion"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { scrollIntoView } from "seamless-scroll-polyfill";
import { RefreshLeft } from "@element-plus/icons-vue";
import PromptInput from "./PromptInput.vue";
import AnswerComponent from "./AnswerComponent.vue";
import QuestionComponent from "./QuestionComponent.vue";
import ThinkingComponent from "./Answer/ThinkingComponent.vue";
import ErrorComponent from "./Answer/ErrorComponent.vue";
import KnowledgeAssetsPopup from "./Answer/KA/KnowledgeAssetsPopup.vue";
import {
  getErrorMessage,
  CHUNKING_DONE_MESSAGE,
  THINKING_MESSAGE,
  ERROR_CODE_RESPONSES,
  THREE_RECOMMENDED_QUESTIONS,
} from "@/utils/constants";
import createSocket, { userUUID } from "@/services/createSocket";
import { configMixin } from "@/services/config";

export default {
  name: "QuestionAndAnswerComponent",
  components: {
    AnswerComponent,
    PromptInput,
    QuestionComponent,
    ThinkingComponent,
    ErrorComponent,
    KnowledgeAssetsPopup,
  },
  mixins: [configMixin],
  props: {
    question: {
      type: String,
      required: true,
    },
  },
  emits: ["start-again"],
  data() {
    return {
      RefreshLeft,
      qaPairs: [],
      promptInputValue: "",
      isLoading: false,
      isKAPopupOpen: false,
      kaPopupAssets: [],
      clickedAssetUal: "",
      thinkingMessage: THINKING_MESSAGE,
      streamedSKAs: [],
      socket: null,
    };
  },
  computed: {
    isLoadingForIndex() {
      return this.qaPairs.map(
        (qaPair) =>
          this.isLoading &&
          !qaPair.answer &&
          !qaPair.answer?.isError &&
          !qaPair.error,
      );
    },
  },
  watch: {},
  created() {
    if (!this.question) {
      this.goToHome();
    }
    this.socket = createSocket(this.endpoints.dRAG);
  },
  mounted() {
    this.socket.on("response-chunk", this.handleResponseChunk);
    this.socket.on("source-knowledge-assets", this.handleResponseSKA);
    window.addEventListener("resize", this.setPromptInputWidth);
    this.setPromptInputWidth();

    this.pushQuestionAndStartLoading(this.question);
  },
  beforeUnmount() {
    this.socket.off("response-chunk");
    this.socket.off("source-knowledge-assets");
    window.removeEventListener("resize", this.setPromptInputWidth);
  },
  methods: {
    setPromptInputWidth() {
      const answerRowWidth = this.$refs.answerRowRef.offsetWidth;
      this.$refs.promptInputRef.$el.style.width = `${answerRowWidth}px`;
    },
    handleMainSectionScroll(ev) {
      const evnt = new CustomEvent("questionScroll", {
        detail: ev,
      });
      window.dispatchEvent(evnt);
    },
    goToHome() {
      this.$emit("start-again");
    },
    handleSelectPrompt(selectedPrompt) {
      this.promptInputValue = selectedPrompt;
      this.askQuestion();
    },
    handleAudioQuestion(audioQuestion) {
      this.promptInputValue = audioQuestion;
      this.askQuestion();
    },
    handleOpenKAList(sourceKnowledgeAssets, clickedAssetUal) {
      this.clickedAssetUal = clickedAssetUal;
      this.kaPopupAssets = sourceKnowledgeAssets;
      this.isKAPopupOpen = true;
    },
    closeKAPopup() {
      this.isKAPopupOpen = false;
    },
    askQuestion(inputValue) {
      if (this.promptInputValue.trim() !== "") {
        this.pushQuestionAndStartLoading(this.promptInputValue);

        this.promptInputValue = "";
      }
    },
    handleResponseChunk(data) {
      if (!data?.chunk) {
        return;
      }

      if (data.chunk === CHUNKING_DONE_MESSAGE) {
        this.thinkingMessage = THINKING_MESSAGE;
      } else {
        this.thinkingMessage =
          this.thinkingMessage === THINKING_MESSAGE
            ? data.chunk
            : `${this.thinkingMessage}${data.chunk}`;
      }
    },
    handleResponseSKA(data) {
      if (!data?.sourceKnowledgeAssets) {
        return;
      }
      this.streamedSKAs = data.sourceKnowledgeAssets;
    },
    pushQuestionAndStartLoading(question) {
      this.qaPairs.push({
        question,
        answer: null,
        error: null,
      });

      this.startLoading();
    },

    startLoading() {
      this.isLoading = true;

      const latestQuestionIndex = this.qaPairs.length - 1;
      this.$nextTick(() => {
        scrollIntoView(this.$refs.latestQuestionRefs[latestQuestionIndex].$el, {
          behavior: "smooth",
          block: "start",
        });
      });

      let question = this.qaPairs[latestQuestionIndex].question;

      this.performApiSearch(question, latestQuestionIndex);
    },
    performApiSearch(question, latestQuestionIndex) {
      axios
        .post(
          `${this.endpoints.dRAG}/server/api/ask`,
          {
            question: question,
            useLLM: true,
            uuid: userUUID,
            history: this.qaPairs.slice(-3).map((qaPair) => {
              return {
                question: qaPair.question,
                answer: { answer: qaPair?.answer?.answer },
              };
            }),
            hasVideos: this.qaPairs[latestQuestionIndex].hasVideos,
          },
          { withCredentials: true },
        )
        .then((r) => r.data)
        .then((result) => {
          if (result.cannotAnswer === true) {
            this.qaPairs[this.qaPairs.length - 1].answer = {
              answer: `This system relies on a trusted knowledge base that is continuously being expanded.  
              The information you are looking for is currently not available in the knowledge base.`,
              images: [],
              videos: [],
              sourceKnowledgeAssets: [],
              followUpPromptSuggestions: THREE_RECOMMENDED_QUESTIONS,
            };
          } else {
            if (result.summarized || result.answer) {
              let artworks;
              if (result.hasArtworks) {
                artworks = result.extracted.map((artwork) => {
                  return {
                    name: artwork.artworkName,
                    url: artwork.imageURL,
                    ...artwork,
                  };
                });
              }

              this.qaPairs[this.qaPairs.length - 1].answer = {
                answer: result.summarized || result.answer,
                images:
                  result.images?.map((image) => ({
                    name: "",
                    url: image.replace(/^"|"$/g, ""),
                  })) || artworks,
                videos: result.videos?.map((video) => ({
                  // eslint-disable-next-line no-useless-escape
                  url: video.replace(
                    /youtube\.com\/watch\?v=([\w\-]+)/,
                    "youtube.com/embed/$1",
                  ),
                })),
                sourceKnowledgeAssets: result.knowledgeAssets,
                coordinates: result.coordinates?.map((e) => e.location),
                sentimentScore: result.sentimentScore,
                followUpPromptSuggestions: THREE_RECOMMENDED_QUESTIONS,
                files: result.csvFiles,
                tableData: result.tableData,
              };
            } else {
              const answer = result.extracted
                .map((section) => section.langchain_text)
                .join("\n<hr>");

              this.qaPairs[this.qaPairs.length - 1].answer = {
                answer,
                images: result.images.map((image) => {
                  return { name: "", url: image };
                }),
                videos: [],
                coordinates: result.coordinates?.map((e) => e.location),
                sourceKnowledgeAssets: result.issuerData,
                chartData: this.formatChartData(result.chartData),
                followUpPromptSuggestions: this.promptSuggestions,
              };
            }
          }
          this.streamedSKAs = [];
          this.isLoading = false;

          const latestAnswerIndex = this.qaPairs.length - 1;
          this.$nextTick(() => {
            scrollIntoView(this.$refs.latestAnswerRefs[latestAnswerIndex].$el, {
              behavior: "smooth",
              block: "start",
            });
          });
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log("error", error);
          if (Object.keys(ERROR_CODE_RESPONSES).includes(error.code)) {
            this.qaPairs[this.qaPairs.length - 1].error = {
              errorMessage: getErrorMessage(error.code),
            };
          } else {
            this.qaPairs[this.qaPairs.length - 1].answer = {
              answer:
                "Oops! We're unable to retrieve the answer at the moment. Please try again later.",
              images: [],
              videos: [],
              sourceKnowledgeAssets: [],
              followUpPromptSuggestions: THREE_RECOMMENDED_QUESTIONS,
              isError: true, //to paint it red maybe or something
            };
          }
          this.streamedSKAs = [];
          this.isLoading = false;
          const latestAnswerIndex = this.qaPairs.length - 1;
          this.$nextTick(() => {
            const nextElementToScrollTo = this.qaPairs[latestAnswerIndex]?.error
              ? this.$refs.latestErrorRefs[latestAnswerIndex]
              : this.$refs.latestAnswerRefs[latestAnswerIndex];
            scrollIntoView(nextElementToScrollTo.$el, {
              behavior: "smooth",
              block: "start",
            });
          });
        });
    },
    formatChartData(data) {
      if (data === undefined) return data;
      return {
        labels: data.map((item) =>
          dayjs(item.eventTime).format("HH:mm, DD.MM.YYYY."),
        ),
        datasets: [
          {
            label: "Temperature",
            borderColor: "#00A3AD",
            borderWidth: 4,
            pointRadius: 0,
            pointHitRadius: 0,
            steppedLine: false,
            data: data.map((item) => item.temperatureValue),
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.answer-page-wrapper {
  padding: 0 12px;

  margin: auto;
  width: 100%;
  max-width: 100%;
  @media screen and (min-width: 1024px) {
    max-width: 1024px;
  }

  .question-answer-row {
    .start-again {
      margin-bottom: 48px;
      margin-left: 48px;

      ::v-deep(i),
      ::v-deep(svg) {
        width: 24px;
        height: 24px;
      }
    }

    .page-scrollbar {
      height: calc(100vh - 210px);
      -webkit-mask-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 0) 0 10px,
        rgba(0, 0, 0, 1) 50px
      );
      mask-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 0) 0 10px,
        rgba(0, 0, 0, 1) 50px
      );
    }

    :deep(.page-scrollbar) {
      .el-scrollbar__thumb {
        opacity: 1;
      }
      .el-scrollbar__bar {
        margin-left: 30px;
      }
    }

    .answer-section-wrapper {
      &.is-thinking {
        padding-bottom: 80px;
        @media screen and (max-width: 768px) {
          padding-bottom: 48px;
        }
      }
      overflow: auto;
      :deep(.half-circle-wrapper) {
        border-radius: 16px;
        padding: 8px;
        margin-top: 24px;
        width: 100%;
        height: 342px;
      }
      :deep(.trail-map-wrapper) {
        background-color: #f6f6f6;
        border-radius: 16px;
        padding: 8px;
        margin-top: 24px;
        width: 100%;
        height: 342px;
        > .map-container {
          border-radius: 16px;
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }
      }
      :deep(.half-circle-wrapper) {
        @media screen and (max-width: 768px) {
          height: 242px;
        }
      }
      :deep(.image-preview-container) {
        .map-container {
          border-radius: 16px;
        }
      }
    }
  }

  .prompt-input-row {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    padding-bottom: 50px;
    padding-top: 25px;
    z-index: 9995;
    :deep(.prompt-input-wrapper) {
      z-index: 999;
    }
  }
}
</style>
