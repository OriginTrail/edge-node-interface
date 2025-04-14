<template>
  <ion-page>
    <ion-content class="background">
      <div
        class="d-flex flex-column position-relative explorer-wrapper content-wrapper"
      >
        <div class="page">
          <div class="sidebar">
            <div class="input desktop">
              <form method="get" action="/knowledge-graph">
                <input
                  name="ual"
                  placeholder="  Search by UAL"
                  required
                  autocomplete="off"
                  :value="uals?.join(',')"
                />
                <button>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19.3333 13.25C15.9736 13.25 13.25 15.9736 13.25 19.3333C13.25 22.6931 15.9736 25.4167 19.3333 25.4167C20.7429 25.4167 22.0404 24.9373 23.0719 24.1326L25.4696 26.5303L25.9999 27.0607L27.0606 26L26.5303 25.4697L24.1326 23.072C24.9372 22.0405 25.4167 20.7429 25.4167 19.3333C25.4167 15.9736 22.6931 13.25 19.3333 13.25ZM22.7427 22.3966C23.4726 21.5848 23.9167 20.5109 23.9167 19.3333C23.9167 16.802 21.8646 14.75 19.3333 14.75C16.802 14.75 14.75 16.802 14.75 19.3333C14.75 21.8646 16.802 23.9167 19.3333 23.9167C20.5109 23.9167 21.5848 23.4726 22.3966 22.7427L22.7427 22.3966Z"
                    />
                  </svg>
                </button>
              </form>
            </div>

            <div class="info box" v-if="assertion?.length">
              <div>
                <hgroup>
                  <h1>Knowledge Assets</h1>
                  <!-- <p>Latest update: 02/06/2023</p> -->
                </hgroup>
                <hr />
                <div class="main" v-for="ual in uals" :key="ual">
                  <img class="ka-image" src="/images/White outlline KA 1.png" />
                  <div>
                    <dl>
                      <dt v-if="owner">Publisher:</dt>
                      <el-tooltip v-if="owner" placement="top" :content="owner">
                        <dd v-if="owner">
                          <a>{{ owner }}</a>
                        </dd>
                      </el-tooltip>
                      <dt>UAL:</dt>
                      <el-tooltip placement="top" :content="ual">
                        <dd>
                          <a>{{ ual }}</a>
                        </dd></el-tooltip
                      >
                      <dt>Blockchain:</dt>
                      <dd>
                        <img
                          :src="getBlockchainImg(ual)"
                          class="blockchain-img"
                        />
                        {{ getBlockchain(ual) }}
                      </dd>
                    </dl>
                  </div>
                </div>
                <hr />
                <dl class="description desktop">
                  <dt class="col-3 d-flex">JSON:</dt>
                  <dd class="col-9">
                    <div>
                      {{ assertion ? JSON.stringify(assertion, null, 2) : "" }}
                    </div>
                  </dd>
                </dl>
                <el-button
                  link
                  type="primary"
                  @click="showJson = true"
                  class="desktop"
                  :disabled="assetFailed"
                  >View more</el-button
                >
                <el-button
                  type="primary"
                  @click="showJson = true"
                  class="mobile view-json-button"
                  rounded
                  :disabled="assetFailed"
                  >View JSON</el-button
                >
              </div>
            </div>
          </div>
          <div class="box fallback-message" v-if="assetFailed">
            <h2 class="title">Failed to Load the Knowledge Asset</h2>
            <p class="description">Please check the UAL or try again later.</p>
          </div>
          <div v-else ref="graphContainer" class="box graph-container"></div>
          <div class="input mobile">
            <form method="get" action="/knowledge-graph">
              <input
                name="ual"
                placeholder="  Search by UAL"
                required
                autocomplete="off"
              />
              <button>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.3333 13.25C15.9736 13.25 13.25 15.9736 13.25 19.3333C13.25 22.6931 15.9736 25.4167 19.3333 25.4167C20.7429 25.4167 22.0404 24.9373 23.0719 24.1326L25.4696 26.5303L25.9999 27.0607L27.0606 26L26.5303 25.4697L24.1326 23.072C24.9372 22.0405 25.4167 20.7429 25.4167 19.3333C25.4167 15.9736 22.6931 13.25 19.3333 13.25ZM22.7427 22.3966C23.4726 21.5848 23.9167 20.5109 23.9167 19.3333C23.9167 16.802 21.8646 14.75 19.3333 14.75C16.802 14.75 14.75 16.802 14.75 19.3333C14.75 21.8646 16.802 23.9167 19.3333 23.9167C20.5109 23.9167 21.5848 23.4726 22.3966 22.7427L22.7427 22.3966Z"
                    fill="#8B85F4"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
      <teleport to="body">
        <el-dialog
          v-model="showJson"
          @close="showJson = false"
          width="800"
          height="600"
        >
          <div class="dialog-content">
            <pre>{{ assertion ? JSON.stringify(assertion, null, 2) : "" }}</pre>
          </div>
          <template #footer>
            <CopyTextButton
              copy-text="Copy JSON"
              :text-to-copy="JSON.stringify(assertion, null, 2)"
              button-size="large"
            >
              <img src="/images/chatdkg/icons/copy.svg" />
            </CopyTextButton>
          </template>
        </el-dialog>
      </teleport>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { IonContent, IonPage, loadingController } from "@ionic/vue";
import ForceGraph3D from "3d-force-graph";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import * as THREE from "three"; // Import three.js
import {
  getNodeMesh,
  getLinkMesh,
  CAMERA,
  NODE_ZOOM,
  GRAPH_OPTIONS,
  KnowledgeGraph,
} from "@/utils/graphUtils";
import { cleanUal } from "@/utils/knowledgeBankUtils";

import CopyTextButton from "@/ui-components/ai-assistant/Answer/CopyTextButton.vue";

export default {
  components: {
    IonPage,
    IonContent,
    CopyTextButton,
  },
  name: "KnowledgeGraphPage",
  ionViewWillLeave() {
    if (this.loading) {
      this.loading.dismiss().catch(() => {});
      this.loading = null;
    }
  },
  data() {
    return {
      targetNode: null,
      graphInstance: null,
      assertion: null,
      showJson: false,
      loading: null,
      assetFailed: false,
      version: null,
      owner: "",
      // idMap: {},
      uals: [],
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
    userConfig() {
      return this.getUser?.config ?? [];
    },
    EDGE_NODE_BACKEND_ENDPOINT() {
      return (
        this.userConfig.find((c) => c.option === "edge_node_backend_endpoint")
          ?.value ?? import.meta.env.VITE_EDGE_NODE_BACKEND_ENDPOINT
      );
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(newRoute) {
        if (!newRoute.query.ual) return;
        this.uals = Array.isArray(newRoute.query.ual)
          ? newRoute.query.ual
          : newRoute.query.ual.split(",");
        this.loadGraphForUAL(this.uals);
      },
    },
  },
  mounted() {
    this.graph = null;
    this.$nextTick(async () => {
      await this.initializeGraph();
    });
  },
  beforeDestroy() {
    if (this.graph) {
      this.graph._destructor();
      this.graph = null;
    }
  },
  methods: {
    getBlockchain(ual) {
      if (!ual) return "";
      else if (ual.includes("base")) return "Base";
      else if (ual.includes("otp")) return "NeuroWeb";
      else if (ual.includes("gnosis")) return "Gnosis";
      else return "Blockchain";
    },
    getBlockchainImg(ual) {
      if (!ual) return "";
      else if (ual.includes("base")) return "/images/base-label.svg";
      else if (ual.includes("otp")) return "/images/neuro-label.svg";
      else if (ual.includes("gnosis")) return "/images/gnosis-label.svg";
      else return "";
    },
    async getAssetByUal(ual) {
      if (!ual) return null;

      return axios
        .get(
          `${this.EDGE_NODE_BACKEND_ENDPOINT}/knowledge-bank/assets/preview-external`,
          {
            withCredentials: true,
            params: {
              assetUAL: ual,
            },
          },
        )
        .then((r) => ({
          assertion: r.data.assertion,
          owner: null,
          version: "v8",
        }))
        .catch((e) => {
          console.error(`Failed to get asset for UAL '${ual}':`, e);
          return null;
        });
    },
    async initializeGraph() {
      const gData = { nodes: [], links: [] };

      const graph = ForceGraph3D({
        controlType: "orbit",
        worker: true,
      })(this.$refs.graphContainer)
        .showNavInfo(false)
        .backgroundColor(GRAPH_OPTIONS.backgroundColor);
      graph.scene().background = new THREE.Color("#0c0c0c");

      graph.width(1);
      graph.height(1);
      setTimeout(() => {
        graph.width(this.$refs.graphContainer.clientWidth);
        graph.height(this.$refs.graphContainer.clientHeight);
      }, 50);
      graph.cameraPosition(CAMERA.position, CAMERA.target, CAMERA.duration);

      // Set node mesh and properties
      graph.nodeThreeObject((node) => {
        return getNodeMesh(node, this.version);
      });

      graph
        .linkWidth(0.4)
        .linkColor("#ffffff")
        .linkOpacity(1)
        .linkThreeObjectExtend(true)
        .linkThreeObject((link) => {
          return getLinkMesh(link);
        })
        .linkPositionUpdate((sprite, { start, end }) => {
          const middlePos = Object.assign(
            ...["x", "y", "z"].map((c) => ({
              [c]: start[c] + (end[c] - start[c]) / 2, // calc middle point
            })),
          );

          // Position sprite
          Object.assign(sprite.position, middlePos);
        });

      graph.graphData(gData);

      let lights = [];
      const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
      lights.push(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
      directionalLight.position.set(100, 100, 100);
      lights.push(directionalLight);

      graph.lights(lights);
      graph.onNodeClick(async (node) => {
        if (node.id.startsWith("did:dkg") && !node.expanded) {
          this.loading = await loadingController.create({
            message: "Expanding Knowledge Assets...",
          });
          this.loading.present();
          const asset = await this.getAssetByUal(cleanUal(node.id));
          this.loading.dismiss();
          this.version = asset.version;
          this.owner = asset.owner;

          console.log(asset);
          if (!asset || !asset.assertion?.length) {
            console.error("Failed to load asset for UAL:", node.id);
            this.assetFailed = true;
          } else {
            node.expanded = true;
            this.graphInstance.addKnowledgeAssets(asset.assertion, node.id);
            this.graph.graphData(this.graphInstance.data);
          }
        } else {
          this.zoomInOnNode(node);
        }
      });

      const bloomPass = new UnrealBloomPass();
      bloomPass.strength = 0.5;
      bloomPass.radius = 1;
      bloomPass.threshold = 0;

      //graph.postProcessingComposer().addPass(bloomPass);
      this.graph = graph;
      //   await this.loadGraphForUAL(this.uals);
    },
    async loadGraphForUAL(uals) {
      this.loading = await loadingController.create({
        message: "Loading Knowledge Assets...",
      });

      this.loading.present();
      const assets = await Promise.all(
        uals.map((ual) =>
          this.getAssetByUal(cleanUal(ual)).then((asset) => [ual, asset]),
        ),
      );
      this.loading.dismiss();

      this.assertion = [];
      this.graphInstance = new KnowledgeGraph("", {}, "v8");
      this.version = "v8";
      this.owner = null;

      for (const [ual, asset] of assets) {
        if (!asset || !asset.assertion?.length) {
          continue;
        }

        this.assertion = [...this.assertion, ...asset.assertion];
      }
      this.graphInstance.addKnowledgeAssets(this.assertion);

      if (this.assertion.length === 0) {
        console.error("Failed to load asset for UALs:", uals);
        this.assetFailed = true;
      }

      if (this.graphInstance.data.nodes.length > 50) {
        // Customize graph options based on your requirements
        console.log("here");
        this.graph
          .warmupTicks(GRAPH_OPTIONS.warmupTicks)
          .cooldownTicks(GRAPH_OPTIONS.cooldownTicks)
          .cooldownTime(GRAPH_OPTIONS.cooldownTime);
        // .enableNodeDrag(GRAPH_OPTIONS.enableNodeDrag)

        // graph.d3Force("link").distance(GRAPH_OPTIONS.linkDistance);
        // graph.d3Force("charge").strength(GRAPH_OPTIONS.chargeStrength);
      }
      this.graph.graphData(this.graphInstance.data);
    },
    zoomInOnNode(node) {
      if (this.targetNode?.id === node.id) {
        this.graph.cameraPosition(
          CAMERA.position,
          CAMERA.target,
          CAMERA.duration,
        );
        node.isClicked = false;
        this.targetNode = null;
      } else {
        if (this.targetNode) {
          this.targetNode.isClicked = false;
        }
        this.targetNode = node;
        this.graph.cameraPosition(
          { x: node.x, y: node.y, z: node.z + NODE_ZOOM },
          node,
          3000,
        );
        node.isClicked = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  height: calc(100dvh - 150px);
  justify-content: space-between;
  gap: 20px;
}
.input {
  width: 400px;

  background: $background-color;
  outline: none;
  border: 1.5px solid $primary-color-light;
  border-radius: 50px;
  height: 48px;
  padding-left: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  form {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  input {
    width: 80%;
    color: white;
    background: transparent;
    border: none;

    &:focus {
      outline: none;
    }
    &:focus-visible {
      border: none;
      outline-width: 0;
    }
  }

  svg {
    fill: $secondary-color;
  }

  position: relative;

  button {
    background-color: transparent;
  }
}

.page {
  display: flex;
  gap: 24px;
  height: 100%;

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 24px;
    // min-width: 400px;
    height: 100%;

    dl {
      margin: 0;
    }

    hgroup {
      //padding: 12px;
      // background: url(/images/ka-profile-background.svg);
      // background-position: center;
      // background-repeat: no-repeat;
      // background-size: contain;
      h1 {
        margin: 0;
        margin-bottom: 4px;
        font-family: Manrope;
        font-size: 16px;
        font-style: normal;
        font-weight: 800;
        line-height: 16px;
      }
      border-bottom: h1 {
        font-weight: bold;
        font-size: 16px;
        font-family: "Manrope";
      }
      p {
        font-size: 12px;
        font-family: "Manrope";
      }
    }
    .info {
      padding: 24px 12px;
      .main {
        display: flex;
        align-items: center;
        gap: 12px;

        .ka-image {
          max-height: 50px;
        }

        dl {
          display: grid;
          grid-template-columns: auto 1fr;

          dt {
            font-size: 14px;
            line-height: 16px;
            margin: 0;
            font-weight: 400;
          }

          dd {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            color: #fff;
            font-weight: 600;
            font-size: 14px;
            line-height: 16px;

            a {
              font-weight: 500;
              color: #8b85f4;
              text-decoration: underline;
            }
          }
        }
      }
      hr {
        margin: 24px 0;
        height: 1.5px;
        background-color: $primary-color-light;
      }
      dl.description {
        dt {
          padding-right: 12px;
        }

        dd {
          overflow: hidden;
          width: 100%;
          color: var(--text-tx-white-primary, #fff);
          font-feature-settings:
            "liga" off,
            "clig" off;
          text-overflow: ellipsis;
          font-family: "Roboto Mono";
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px;
          div {
            white-space: pre-wrap;
          }
        }

        display: grid;
        grid-template-columns: auto 1fr;
        max-height: 200px;
        overflow-y: auto;
      }
    }

    flex-basis: 0;
  }

  .graph-container {
    overflow: hidden;
    height: 100%;
    flex: 1;
  }

  .fallback-message {
    overflow: hidden;
    height: 100%;
    flex: 1;
    text-align: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #f6768c;
    background-color: rgba(255, 50, 50, 0.1);
    border: 1px solid rgba(255, 50, 50, 0.2);
    border-radius: 8px;
    padding: 24px;
    text-align: center;

    .title {
      margin-bottom: 12px;
      font-size: 1.25rem;
      font-weight: 700;
      color: #ff5454;
    }

    .description {
      margin: 0;
      font-size: 1rem;
      color: #ff8f8f;
    }
  }

  .mobile {
    display: none;
  }
  @media screen and (max-width: 800px) {
    flex-direction: column-reverse;

    .mobile {
      display: flex;
      width: 100%;
    }
    .desktop {
      display: none !important;
    }
  }
}

.el-button {
  color: #8b85f4;
}

.view-json-button {
  background-color: #8b85f4;
  color: #ffffff;
  width: auto !important;
}

.el-dialog {
  background-color: #8b85f4 !important;
}
.dialog-content {
  max-height: 400px;
  overflow: auto;
  text-align: start;

  pre {
    text-wrap: wrap;
  }
}

.blockchain-img {
  margin-left: 4px;
}

@media screen and (max-width: 768px) {
  .page {
    height: auto;
  }

  .graph-container {
    min-height: 400px;
  }
}
</style>
