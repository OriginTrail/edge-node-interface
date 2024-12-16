<template>
  <ion-page>
    <ion-content class="background">
      <div class="notifications-wrapper d-flex flex-column">
        <div class="flex-grow-1 d-flex flex-column flex-lg-row">
          <div class="all-notifications">
            <el-table
              :data="data"
              v-loading="dataLoading"
              element-loading-background="transparent"
              table-layout="auto"
              :default-sort="sort"
              @sort-change="sortChanged"
              class="notifications-table"
            >
              <el-table-column label="All notifications">
                <template #default="scope">
                  <div class="single-notification-wrapper">
                    <div class="icon">
                      <InfoIcon />
                    </div>
                    <div>
                      <p class="notification-title">{{ scope.row.title }}</p>
                      <p class="notification-time">
                        {{ formatDateLocal(scope.row.created_at) }}
                      </p>
                      <p class="notification-message">
                        {{ scope.row.message }}
                      </p>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="d-none d-lg-block w-50 text-center">
            <!--            <img-->
            <!--              src="/images/notifications-background-new.svg"-->
            <!--              alt="Notifications Background"-->
            <!--              class="pt-1 notifications-image"-->
            <!--            />-->
          </div>
        </div>
        <div class="row py-4 gy-2 footer">
          <div class="col-12 text-center text-md-start col-md-2">
            <span>
              Showing {{ firstShownIndex + 1 }}-{{ lastShownIndex + 1 }}
              out of
              {{ total }}
            </span>
          </div>
          <el-pagination
            @change="getNotifications"
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
        <div class="">
          <footer-component></footer-component>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from "axios";
import FooterComponent from "@/ui-components/edge-node/single-components/FooterComponent.vue";
import { IonContent, IonPage } from "@ionic/vue";
import { formatDateLocal } from "@/utils/dateUtils";
import { configMixin } from "@/services/config";
import InfoIcon from "@/ui-components/common/icons/InfoIcon.vue";

export default {
  components: { IonContent, IonPage, FooterComponent, InfoIcon },
  mixins: [configMixin],
  data() {
    return {
      sort: undefined,
      data: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      dataLoading: false,
    };
  },
  computed: {
    firstShownIndex() {
      return (this.currentPage - 1) * this.pageSize;
    },
    lastShownIndex() {
      return Math.min(this.firstShownIndex + this.pageSize, this.total) - 1;
    },
  },
  mounted() {
    this.getNotifications();
  },
  methods: {
    formatDateLocal,
    sortChanged(newSort) {
      this.sort = newSort;
    },
    async getNotifications() {
      try {
        this.dataLoading = true;
        const offset = this.firstShownIndex;
        const limit = this.pageSize;
        const res = await axios.get(
          `${this.endpoints.edgeNodeBackend}/notifications?offset=${offset}&limit=${limit}&seenFilter=false`,
          { withCredentials: true },
        );

        this.data = res.data.data;
        this.total = res.data.totalItems;
      } catch (e) {
        console.error(e);
      } finally {
        this.dataLoading = false;
      }
    },
  },
};
</script>

<style lang="scss">
@use "sass:color";
.notifications-table {
  background: none;
  border-radius: 0;

  th {
    font-weight: bold !important;
    color: $text-color-default;
    padding-left: 16px !important;
  }

  .el-table__inner-wrapper::before {
    display: none;
  }

  .el-table__cell {
    border: none !important;
    background: none !important;
  }

  .cell {
    padding: 0;
  }
}

.footer {
  font-size: 12px;
}

.all-notifications {
  width: 100%;
  @media screen and (min-width: 993px) {
    width: 50%;
  }
}

.single-notification-wrapper {
  width: 100%;
  position: relative;

  display: flex;
  padding: 14px 16px;
  align-items: flex-start;
  gap: 16px;
  border-radius: 16px;
  background: $primary-color-dark;
  box-shadow: 0px 4px 4px 0px rgba(9, 11, 33, 0.02);

  p {
    word-wrap: break-word;
    word-break: break-word;
    max-width: 100%;
    white-space: normal;
    padding-bottom: 0;
    margin-bottom: 4px;
  }

  .icon {
    background: $secondary-color;
    padding: 7px;
    border-radius: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .notification-title {
    color: $secondary-color;
    font-family: Manrope;
    font-size: 14.5px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
  }

  .notification-time {
    color: $text-color-dark;
    font-family: Manrope;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }

  .notification-message {
    color: $text-color-light;
    font-family: Manrope;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
}

// TODO: Change image color
// .notifications-image {
// }
</style>
