<template>
  <ion-page>
    <ion-content class="background">
      <teleport to="body">
        <el-dialog
          v-model="dirty"
          title="Resume previous work?"
          style="max-width: 420px"
        >
          <p>
            It seems you have a Knowledge Asset you were working on. Would you
            like to continue editing it or start a new one?
          </p>
          <template #footer>
            <el-button type="primary" @click="dirty = false" size="large" round>
              Continue
            </el-button>
            <el-button @click="resetFlow" size="large" round>Delete</el-button>
          </template>
        </el-dialog>
      </teleport>

      <teleport to="body">
        <el-dialog
          v-model="publishKAsError"
          title="Oops.."
          style="max-width: 420px"
        >
          <p>
            We ran into a problem while creating your Knowledge Asset. Would you
            like to try again?
          </p>
          <template #footer>
            <el-button type="primary" @click="publishKAs" size="large" round>
              Try again
            </el-button>
            <el-button @click="resetFlow" size="large" round>
              Restart
            </el-button>
          </template>
        </el-dialog>
      </teleport>

      <div class="d-flex flex-column gap-4">
        <div class="d-flex justify-content-center flex-grow-1">
          <div class="row g-4 w-100">
            <div class="col-12 col-lg-3 order-lg-2">
              <div class="h-100 d-flex flex-column gap-4">
                <div class="d-flex">
                  <page-heading-component
                    :title="
                      CONTRIBUTE_ALLOW_SHARE ? 'Contribute & Share' : 'Publish'
                    "
                    :subtitle="
                      (CONTRIBUTE_ALLOW_SHARE
                        ? 'Here, you can easily upload your files, transform them into Knowledge Assets and share your work.'
                        : 'Here, you can easily upload your files and transform them into Knowledge Assets.') +
                      (CONTRIBUTE_ALLOW_COLLECT_REWARDS
                        ? ' Don\'t forget to claim your rewards in Neuro for your contributions.'
                        : '')
                    "
                  />
                </div>
                <div class="d-flex flex-grow-1">
                  <div class="box px-3 py-4 h-100 w-100">
                    <el-steps
                      direction="vertical"
                      style="height: fit-content"
                      :active="activeStepIndex"
                    >
                      <el-step
                        title="Get Started"
                        :description="
                          'Upload your ' +
                          supportedFilesText +
                          ' file and let’s get started'
                        "
                      />
                      <el-step
                        v-if="kaPreviewShow"
                        :title="
                          (kaPreviewReadonly ? 'Preview' : 'Shape') +
                          ' your Knowledge Asset'
                        "
                        :description="
                          'Make ' +
                          (kaPreviewReadonly ? 'review' : 'edits') +
                          ' to ensure your Knowledge Asset is just right'
                        "
                      />
                      <el-step
                        title="Publish your Knowledge Asset"
                        description="Launch your Asset into the knowledge ecosystem"
                      />
                      <el-step
                        :title="'Contribute more'"
                        :description="'Claim rewards, spread the work and add more knowledge to keep things going'"
                      />
                    </el-steps>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-9">
              <div class="d-flex flex-column h-100 gap-4">
                <div
                  class="box h-100 d-flex justify-content-center align-items-center"
                  :class="{
                    dragging: isDragging && activeStep === STEPS.UPLOAD,
                  }"
                  @dragenter.prevent="isDragging = true"
                  @dragover.prevent="isDragging = true"
                  @dragleave.prevent="isDragging = false"
                  @drop.prevent="handleDrop"
                >
                  <div
                    v-if="
                      activeStep === STEPS.UPLOAD && requiresWalletConnection
                    "
                    class="actions-section"
                  >
                    <img
                      src="/images/contribute/connect-contribute.png"
                      alt="Connect & Contribute"
                      class="image"
                    />
                    <hgroup>
                      <h2>Connect & Contribute</h2>
                      <p>
                        Connect your wallet to begin, or visit our 'How to?'
                        guide for assistance.
                      </p>
                    </hgroup>
                    <div>
                      <el-button
                        type="primary"
                        @click="walletConnected = true"
                        size="large"
                        round
                      >
                        Connect wallet
                      </el-button>
                      <el-button
                        size="large"
                        round
                        @click="$router.push({ name: 'HowTo' })"
                      >
                        Guide
                      </el-button>
                    </div>
                  </div>
                  <div
                    v-else-if="activeStep === STEPS.UPLOAD"
                    class="actions-section"
                  >
                    <dot-lottie-vue
                      src="/images/contribute/uploadedge.json"
                      class="image"
                      autoplay
                      :segment="filesUploading ? [27, 105] : [0, 27]"
                      style="width: 100%; height: 100%"
                      ref="animationUpload"
                    />
                    <hgroup>
                      <h2>Drag&Drop files here</h2>
                      <p>
                        To upload your {{ supportedFilesText }}, drag it from
                        your computer or simply click 'Upload'.
                      </p>
                    </hgroup>
                    <div>
                      <input
                        type="file"
                        ref="fileUploadInput"
                        :multiple="CONTRIBUTE_ALLOW_UPLOAD_MULTIPLE"
                        :accept="supportedFiles"
                        hidden
                        @change="processUploadedFiles"
                      />
                      <el-button
                        type="primary"
                        size="large"
                        round
                        @click="fileUploadInput.click()"
                        :loading="filesUploading"
                      >
                        {{ filesUploading ? "Uploading..." : "Upload" }}
                      </el-button>
                    </div>
                  </div>
                  <div
                    v-else-if="activeStep === STEPS.PREVIEW"
                    class="align-self-start w-100"
                  >
                    <file-editor
                      :value="kaPreviewString"
                      :readonly="kaPreviewReadonly"
                    />
                  </div>
                  <div
                    v-else-if="activeStep === STEPS.PUBLISH"
                    class="actions-section"
                  >
                    <dot-lottie-vue
                      src="/images/contribute/creatingedge.json"
                      class="image"
                      autoplay
                      loop
                      style="width: 100%; height: 100%"
                      ref="animationCreating"
                    />
                    <!-- <img
                      src="/images/contribute/creating-ka.png"
                      alt="Creating Knowledge Assets"
                      class="image creating-ka"
                    /> -->
                    <hgroup>
                      <h2>
                        Creating Knowledge
                        {{ kaGenerated.length === 1 ? "Asset" : "Assets" }}
                      </h2>
                      <p v-if="kaGenerated.length === 1">
                        Please hold while we launch your Asset into the
                        knowledge ecosystem.
                      </p>
                      <p v-else>
                        Creation of Knowledge Assets has been started. <br />
                        You can check the progress inside your Knowledge graph
                        page.
                      </p>
                    </hgroup>
                    <div>
                      <el-button
                        v-if="kaGenerated.length !== 1"
                        type="primary"
                        size="large"
                        rount
                        @click="activeStep = STEPS.END"
                      >
                        Continue
                      </el-button>
                    </div>
                  </div>
                  <div
                    v-else-if="activeStep === STEPS.END"
                    class="actions-section"
                  >
                    <dot-lottie-vue
                      src="/images/contribute/successedge.json"
                      class="image"
                      autoplay
                      style="width: 100%; height: 100%"
                      ref="animationSuccess"
                    />
                    <hgroup>
                      <h2>Success!</h2>
                      <p v-if="CONTRIBUTE_ALLOW_COLLECT_REWARDS">
                        You can now claim your Neuro rewards
                      </p>
                      <p v-else>Contribute more?</p>
                    </hgroup>
                    <div>
                      <el-button
                        type="primary"
                        size="large"
                        round
                        v-if="CONTRIBUTE_ALLOW_COLLECT_REWARDS"
                      >
                        Claim Rewards
                      </el-button>
                      <el-button size="large" round @click="resetFlow">
                        Contribute more
                      </el-button>
                      <el-button
                        v-if="CONTRIBUTE_SHOW_TRANSACTION_DETAILS"
                        size="large"
                        round
                        @click="publishKAsResponseViewTXDetails"
                      >
                        Transaction details
                      </el-button>
                      <el-button
                        size="large"
                        circle
                        v-if="CONTRIBUTE_ALLOW_SHARE"
                      >
                        <el-icon size="large">
                          <Share />
                        </el-icon>
                      </el-button>
                    </div>
                  </div>
                  <div v-else>
                    <p>Invalid State!</p>
                  </div>
                </div>
                <div
                  v-if="activeStep === STEPS.PREVIEW"
                  class="d-flex justify-content-between align-items-center"
                >
                  <div></div>
                  <div>
                    <el-button
                      type="primary"
                      size="large"
                      round
                      @click="publishKAs"
                    >
                      Create Knowledge Asset
                    </el-button>
                  </div>
                </div>
                <div
                  v-if="activeStep === STEPS.END"
                  class="d-flex justify-content-between align-items-center"
                >
                  <div>
                    <router-link :to="{ name: 'KnowledgeBank' }">
                      <el-button type="primary" link>
                        Knowledge bank
                      </el-button>
                    </router-link>
                  </div>
                  <div>
                    <router-link :to="{ name: 'AIAssistant' }">
                      <el-button type="primary" link>
                        Ask questions about your new Knowledge Asset
                      </el-button>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex">
          <footer-component></footer-component>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { computed, readonly, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { IonContent, IonPage } from "@ionic/vue";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
import { ElNotification } from "element-plus";
import { Share } from "@element-plus/icons-vue";
import axios from "axios";
import FooterComponent from "../single-components/FooterComponent.vue";
import PageHeadingComponent from "../single-components/PageHeadingComponent.vue";
import FileEditor from "@/ui-components/common/FileEditor.vue";
import { fileArrayToFileList, handleDataTransfer } from "@/utils/fileUtils";
import { useConfig } from "@/services/config";

const route = useRoute();
function onBeforeRouteEnter(exec) {
  watch(
    () => route.name === "Contribute",
    (entered) => {
      if (entered) exec();
    },
  );
}

const { config, endpoints } = useConfig();

const CONTRIBUTE_VIA_WALLET = ref(false);
const CONTRIBUTE_ALLOW_UPLOAD_MULTIPLE = ref(false);
const CONTRIBUTE_EDIT_ENABLED = config.getBool("edit_is_turned_on");
const CONTRIBUTE_SHOW_PREVIEW = config.getBool("preview_is_turned_on");
const CONTRIBUTE_ALLOW_SHARE = config.getBool("share_is_turned_on");
const CONTRIBUTE_ALLOW_COLLECT_REWARDS = config.getBool(
  "collect_rewards_is_turned_on",
);
const CONTRIBUTE_ALLOW_RESUME = config.getBool("contribute_allow_resume");
const CONTRIBUTE_SHOW_TRANSACTION_DETAILS = config.getBool(
  "contribute_show_transaction_details",
);

const STEPS = {
  UPLOAD: "upload",
  PREVIEW: "preview",
  PUBLISH: "publish",
  END: "end",
};

const CONTRIBUTE_SUPPORTED_FILES = config.getArray("supported_filetypes");
const supportedFilesText = computed(() =>
  CONTRIBUTE_SUPPORTED_FILES.value.map((f) => f.toUpperCase()).join("/"),
);
const supportedFiles = computed(() =>
  CONTRIBUTE_SUPPORTED_FILES.value
    .map((f) => {
      switch (f) {
        case "json":
          return "application/json";
        case "pdf":
          return "application/pdf";
        case "csv":
          return "text/csv";
        default:
          return `text/${f}`;
      }
    })
    .join(", "),
);

const walletConnected = ref(false);
const requiresWalletConnection = computed(
  () => CONTRIBUTE_VIA_WALLET.value && !walletConnected.value,
);
const dirty = ref(false);

const animationUpload = ref();
const animationCreating = ref();
const animationSuccess = ref();

const fileUploadInput = ref();
const filesUploaded = ref([]);
const filesUploading = ref(false);
const kaGenerated = ref([]);
const kaGeneratedMultiple = computed(() => kaGenerated.value.length > 1);
const kaPreview = ref(null);
const kaPreviewString = computed(() =>
  kaPreview.value ? JSON.stringify(kaPreview.value.content, null, 4) : null,
);
const kaPreviewShow = readonly(ref(CONTRIBUTE_SHOW_PREVIEW));
const kaPreviewReadonly = readonly(ref(!CONTRIBUTE_EDIT_ENABLED.value));

const availableSteps = kaPreviewShow
  ? [STEPS.UPLOAD, STEPS.PREVIEW, STEPS.PUBLISH, STEPS.END]
  : [STEPS.UPLOAD, STEPS.PUBLISH, STEPS.END];
const activeStep = ref(STEPS.UPLOAD);
const activeStepIndex = computed(() =>
  availableSteps.indexOf(activeStep.value),
);

onBeforeRouteEnter(() => {
  if (!CONTRIBUTE_ALLOW_RESUME.value) return resetFlow();

  if (activeStepIndex.value !== 0) {
    dirty.value = true;
  }
});

async function transformFilesToKAs() {
  filesUploading.value = true;
  animationUpload.value.getDotLottieInstance().play();
  try {
    let uploadedFile = filesUploaded.value[0];
    if (uploadedFile.type === "application/json") {
      const fileContent = await uploadedFile.text();
      const jsonContent = JSON.parse(fileContent);
      if (!!jsonContent["@context"] || !!jsonContent["@type"])
        uploadedFile = new File(
          [fileContent],
          uploadedFile.name.replace(".json", ".jsonld"),
          { type: "application/ld+json" },
        );
    }

    const formData = new FormData();
    formData.append("file", uploadedFile);
    const res = await axios.post(
      `${endpoints.edgeNodeBackend.value}/knowledge-bank/datasets/import`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      },
    );
    kaGenerated.value = res.data.assets;
  } finally {
    filesUploading.value = false;
    animationUpload.value.getDotLottieInstance().stop();
  }
}

function isJsonString(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

async function processUploadedFiles() {
  try {
    if (!fileUploadInput.value.files?.length) return;
    filesUploaded.value = fileUploadInput.value.files;

    await transformFilesToKAs();

    if (kaPreviewShow.value && !kaGeneratedMultiple.value) {
      kaPreview.value = kaGenerated.value[0];
      activeStep.value = STEPS.PREVIEW;
    } else {
      if (!kaGeneratedMultiple.value) await publishKAs();
      else activeStep.value = STEPS.PUBLISH;
    }
  } catch (err) {
    const isBadRequest = err?.response?.status === 400;
    fileUploadInput.value.value = null;
    filesUploaded.value = [];
    ElNotification({
      title: "Something went wrong",
      message: isBadRequest
        ? CONTRIBUTE_ALLOW_UPLOAD_MULTIPLE.value
          ? `Please upload valid ${supportedFilesText.value} files.`
          : `Please upload a single valid ${supportedFilesText.value} file.`
        : "Something went wrong. Please try again. " + err.message,
      type: "error",
    });
  }
}

const publishKAsError = ref(false);
const publishKAsResponse = ref(null); // { UAL: string, assertionId: string, transactionHash: string }
const publishKAsResponseViewTXDetails = () => {
  const url = `https://sepolia.basescan.org/tx/${publishKAsResponse.value?.transactionHash}`;
  window.open(url, "_blank");
};
async function publishKAs() {
  activeStep.value = STEPS.PUBLISH;
  publishKAsError.value = false;

  try {
    const res = await axios.post(
      `${endpoints.edgeNodeBackend.value}/knowledge-bank/assets/create`,
      {
        knowledgeAssets: kaGenerated.value.map((ka) => ({
          ...ka,
          content: (isJsonString(ka.content)) ? ka.content : JSON.stringify(ka.content),
        })),
      },
      { withCredentials: true },
    );
    if (res.status === 200) {
      publishKAsResponse.value = res.data?.data ?? null;
      ElNotification({
        title: "Knowledge asset created",
        message:
          "Congratulations! Your Knowledge asset is successfully created!",
        type: "success",
      });
    }
    activeStep.value = STEPS.END;
  } catch (err) {
    console.error(err);
    publishKAsError.value = true;
  }
}

function stepBack() {
  activeStep.value = availableSteps[activeStepIndex.value - 1];
}

function resetFlow() {
  activeStep.value = STEPS.UPLOAD;
  dirty.value = false;
  filesUploaded.value = [];
  filesUploading.value = false;
  kaGenerated.value = [];
  kaPreview.value = null;
  publishKAsError.value = false;
  publishKAsResponse.value = null;
  isDragging.value = false;
}

const isDragging = ref(false);
function handleDrop(event) {
  event.preventDefault();
  isDragging.value = false;
  handleDataTransfer(event.dataTransfer).then((allFiles) => {
    if (allFiles.length > 0) {
      if (!CONTRIBUTE_ALLOW_UPLOAD_MULTIPLE.value && allFiles.length > 1) {
        ElNotification({
          type: "error",
          title: "Something went wrong",
          message: "Uploading multiple files is not allowed!",
        });
        return;
      }

      fileUploadInput.value.files = fileArrayToFileList(allFiles);
      processUploadedFiles();
    }
  });
}
</script>

<style scoped lang="scss">
.dragging {
  opacity: 0.5;
  border: 2px dashed $text-color-default !important;
}

.actions-section {
  padding: 20px;
  max-width: 400px;
  text-align: center;

  .image {
    display: inline-block;
    width: 50%;

    &.creating-ka {
      animation:
        pulse 2s ease-out infinite,
        rotate-hex 12s linear forwards infinite;
      @keyframes rotate-hex {
        0% {
          transform: rotateZ(0);
        }
        16% {
          transform: rotateZ(0);
        }
        17% {
          transform: rotateZ(60deg);
        }
        33% {
          transform: rotateZ(60deg);
        }
        34% {
          transform: rotateZ(120deg);
        }
        49% {
          transform: rotateZ(120deg);
        }
        50% {
          transform: rotateZ(180deg);
        }
        66% {
          transform: rotateZ(180deg);
        }
        67% {
          transform: rotateZ(240deg);
        }
        83% {
          transform: rotateZ(240deg);
        }
        84% {
          transform: rotateZ(300deg);
        }
        99% {
          transform: rotateZ(300deg);
        }
        100% {
          transform: rotateZ(360deg);
        }
      }
      @keyframes pulse {
        0% {
          opacity: 0.3;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0.3;
        }
      }
    }
  }

  hgroup {
    h2 {
      color: $text-color-default;
    }
    p {
      color: $text-color-light;
    }
  }
}
</style>
