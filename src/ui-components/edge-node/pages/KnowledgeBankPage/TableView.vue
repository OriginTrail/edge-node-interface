<template>
  <teleport to="body">
    <el-dialog
      v-model="assetPreviewOpen"
      title="Knowledge Asset Preview"
      style="max-width: 650px"
      @keydown.meta.a.prevent="assetPreviewSelectAll"
      @keydown.ctrl.a.prevent="assetPreviewSelectAll"
    >
      <template #header="scope">
        <span :id="scope.titleId" :class="scope.titleClass">
          Knowledge Asset Preview
        </span>
        <div class="text-start m-0 d-flex gap-2 align-items-center">
          <span>UAL:</span>
          <input :value="assetPreviewUAL" class="ual" readonly />
        </div>
      </template>
      <el-scrollbar
        max-height="400"
        style="min-height: 200px"
        v-loading="assetPreviewLoading"
        element-loading-text="Getting Knowledge asset from DKG. Please wait..."
        element-loading-background="transparent"
      >
        <pre
          class="text-start json-preview"
          v-html="assetPreviewJSON"
          readonly
        />
      </el-scrollbar>
      <template #footer>
        <el-button
          type="primary"
          @click="assetPreviewOpen = false"
          size="large"
          round
        >
          OK
        </el-button>
      </template>
    </el-dialog>
  </teleport>

  <div class="d-flex h-100 flex-column">
    <div class="flex-grow-1" ref="tableViewRef">
      <el-table
        :data="data"
        v-loading="dataLoading"
        element-loading-background="transparent"
        :border="true"
        style="width: 100%"
        table-layout="auto"
        :default-sort="sort"
        @sort-change="sortChanged"
      >
        <el-table-column
          prop="ual"
          sortable
          label="UAL"
          min-width="260"
          show-overflow-tooltip
          :formatter="(row) => formatUAL(row.ual)"
        />
        <el-table-column
          prop="public_assertion_id"
          sortable
          label="Merkle Proof"
          width="420"
          show-overflow-tooltip
        />
        <!--        <el-table-column-->
        <!--          prop="sender"-->
        <!--          sortable-->
        <!--          label="Owner"-->
        <!--          min-width="160"-->
        <!--          show-overflow-tooltip-->
        <!--        />-->
        <!--        <el-table-column-->
        <!--          prop="transaction_hash"-->
        <!--          sortable-->
        <!--          label="TX Hash"-->
        <!--          show-overflow-tooltip-->
        <!--        >-->
        <!--          <template #default="scope">-->
        <!--            <a-->
        <!--              class="table-link"-->
        <!--              target="_blank"-->
        <!--              :href="`https://sepolia.basescan.org/tx/${scope.row.transaction_hash}`"-->
        <!--            >-->
        <!--              {{ scope.row.transaction_hash }}-->
        <!--            </a>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column
          prop="backend_synced_at"
          sortable
          label="Time synced"
          width="160"
          :formatter="(row) => formatDate(row.backend_synced_at)"
        />
        <el-table-column label="View" min-width="150" width="150">
          <template #default="scope">
            <el-button
              link
              :type="KNOWLEDGE_BANK_SHOW_GRAPH ? 'default' : 'primary'"
              size="small"
              @click="previewAssetJSON(scope.row.id, scope.row.ual)"
            >
              View json
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              v-if="KNOWLEDGE_BANK_SHOW_GRAPH"
            >
              Explore in graph
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="row my-4 gy-2 footer">
      <div class="col-12 text-center text-md-start col-md-2">
        <span>
          Showing {{ firstShownIndex + 1 }}-{{ lastShownIndex + 1 }}
          out of
          {{ total }}
        </span>
      </div>
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        size="default"
        :background="true"
        layout="prev, pager, next"
        :total="total"
        class="col justify-content-center"
        :disabled="dataLoading"
      />
      <div class="col-12 text-center text-md-end col-md-2"></div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ElNotification } from "element-plus";
import {
  computed,
  h,
  ref,
  watchEffect,
  defineProps,
  onMounted,
  onUnmounted,
} from "vue";
import HexagonOutline from "@/ui-components/common/icons/HexagonOutline.vue";
import { useConfig } from "@/services/config";

const props = defineProps({
  fullScreen: {
    type: Boolean,
    default: false,
  },
});

const { config, endpoints, appConfig } = useConfig();
const KNOWLEDGE_BANK_SHOW_GRAPH = config.getBool("kb_graph_is_turned_on");

function formatDate(dateString) {
  const date = new Date(dateString);
  return h("span", [
    date.toLocaleDateString(),
    h("br"),
    date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    }),
  ]);
}

function formatUAL(ual) {
  if (!ual) return "";

  return h("span", [
    h(HexagonOutline, {
      size: 18,
      color: appConfig["$secondary-color"],
      class: "me-2",
    }),
    h("span", { style: "vertical-align: middle; line-height: 18px" }, ual),
  ]);
}

function sortChanged(newSort) {
  sort.value = newSort;
}

const currentPage = ref(1);
const pageSize = ref(props.fullScreen ? 8 : 5);
const sort = ref(undefined);
const data = ref([]);
const total = ref(0);

const firstShownIndex = computed(
  () => (currentPage.value - 1) * pageSize.value,
);

const lastShownIndex = computed(
  () => Math.min(firstShownIndex.value + pageSize.value, total.value) - 1,
);

const tableViewRef = ref(null);
const tableInView = ref(true);
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    tableInView.value = entry.isIntersecting;
  });
});
onMounted(() => observer.observe(tableViewRef.value));
onUnmounted(() => observer.disconnect());

const dataLoading = ref(false);
watchEffect(async () => {
  if (!tableInView.value) return;

  try {
    dataLoading.value = true;
    const offset = firstShownIndex.value;
    const limit = pageSize.value;
    const res = await axios.get(
      `${endpoints.edgeNodeBackend.value}/knowledge-bank/assets?offset=${offset}&limit=${limit}`,
      { withCredentials: true },
    );

    data.value = res.data.data;
    total.value = res.data.totalItems;
  } catch (err) {
    ElNotification({
      title: "Failed to load data",
      message: `Loading data failed: ${err?.message ?? err}`,
      type: "error",
    });
  } finally {
    dataLoading.value = false;
  }
});

const assetPreviewOpen = ref(false);
const assetPreviewLoading = ref(false);
const assetPreviewJSON = ref("");
const assetPreviewUAL = ref("");

async function previewAssetJSON(assetId, assetUAL) {
  assetPreviewOpen.value = true;
  assetPreviewLoading.value = true;
  assetPreviewJSON.value = "";
  assetPreviewUAL.value = "";
  try {
    assetPreviewUAL.value = assetUAL;
    const res = await axios.get(
      `${endpoints.edgeNodeBackend.value}/knowledge-bank/assets/preview-external`,
      {
        withCredentials: true,
        params: {
          assetUAL,
        },
      },
    );
    assetPreviewJSON.value = JSON.stringify(res.data, null, 2);
  } catch (err) {
    assetPreviewJSON.value = "Failed to load.";
    ElNotification({
      title: "Failed to preview JSON",
      message: `Loading JSON Asset data failed: ${err?.message ?? err}`,
      type: "error",
    });
  } finally {
    assetPreviewLoading.value = false;
  }
}

function assetPreviewSelectAll(event) {
  event.target.tagName === "INPUT"
    ? event.target.select()
    : window
        .getSelection()
        .selectAllChildren(event.target.querySelector("pre"));
}
</script>

<style scoped lang="scss">
.footer {
  color: $text-color-default;
}

.json-preview {
  margin: 0;
  height: 100%;
  color: $text-color-default;
  background-color: $primary-color-dark;
  filter: brightness(0.8);
}

.ual {
  outline: none;
  background: transparent;
  border: none;
  width: 100%;
  color: $secondary-color;
}

.table-link {
  color: $secondary-color;
  cursor: pointer;
  width: 100%;
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;

  &::after {
    color: inherit;
  }
}
</style>
