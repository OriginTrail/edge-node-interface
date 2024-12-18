<template>
  <ion-tabs class="container mt-4">
    <ion-router-outlet></ion-router-outlet>
    <ion-tab-bar slot="top" class="box">
      <router-link to="/" class="header-logo-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.0001 8.22586C11.707 8.22586 8.22611 11.7062 8.22611 15.9999C8.22611 20.293 11.707 23.7733 16.0001 23.7733C18.3864 23.7733 20.5212 22.6977 21.9471 21.0053L27.8326 25.959C24.9954 29.3264 20.7479 31.4665 16.0001 31.4665C7.45784 31.4665 0.533447 24.5416 0.533447 15.9999C0.533447 7.45759 7.45784 0.533203 16.0001 0.533203V8.22586ZM29.3645 23.7882L22.717 19.9143C22.9439 19.5259 23.1382 19.1163 23.2957 18.6888L30.516 21.35C30.2024 22.2005 29.8158 23.0155 29.3645 23.7882ZM23.7739 15.9999H31.4671C31.4671 15.0837 31.3869 14.1863 31.2341 13.3138L23.6568 14.6499C23.7336 15.0884 23.7739 15.5394 23.7739 15.9999ZM27.8892 6.10748L21.9757 11.0279C21.6861 10.6802 21.3666 10.3584 21.0214 10.0659L25.9904 4.19361C26.6773 4.77547 27.3129 5.41571 27.8892 6.10748Z"
            fill="url(#paint0_radial_1973_12230)"
          />
          <defs>
            <radialGradient
              id="paint0_radial_1973_12230"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(16.0002 8.5) rotate(-90) scale(19 13.5667)"
            >
              <stop stop-color="#D5D3F9" />
              <stop offset="1" stop-color="#6344DF" />
            </radialGradient>
          </defs>
        </svg>
        <p class="header-logo-title">
          {{ appConfig["$logo-title"] }}{{ nodeName ? ": " : "" }}
          <span v-if="nodeName" class="node-name">{{ nodeName }}</span>
        </p>
      </router-link>
      <div class="tabs" v-if="isAuthenticated"></div>
      <div
        class="d-flex justify-content-center align-items-center actions-wrapper"
      >
        <div class="input">
          <form method="get" action="/explore">
            <input
              name="ual"
              placeholder="Search by UAL"
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
        <el-button type="primary" round size="large">Learn More</el-button>
      </div>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import {
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/vue";
import { useConfig } from "@/services/config";
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const search = ref("");
const router = useRouter();

const goToExplore = () => {
  if (search.value.trim()) {
    router.push({ path: "/explore", query: { ual: search.value } });
  }
};

const { appConfig, config } = useConfig();

const store = useStore();
const isAuthenticated = computed(() => store.getters.isAuthenticated);
const nodeName = config.getString("edge_node_name");
</script>

<style scoped lang="scss">
.mr-3 {
  margin-right: 10px;
}
ion-tab-bar {
  height: 25px;
  padding: 25px;
  border-radius: 50px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow-x: hidden;
  overflow-y: hidden;

  background: transparent;

  .tabs {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin: 0 10px;
    align-items: center;

    ion-tab-button {
      background-color: transparent;
      text-wrap: nowrap;
    }
  }
}

ion-label {
  color: $text-color-default;
  text-align: center;
  font-feature-settings:
    "liga" off,
    "clig" off;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-wrap: nowrap;
}

a.router-link-exact-active ion-label {
  color: $secondary-color;
}

.router-link {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.el-button {
  background: radial-gradient(
    53.33% 74.69% at 50% -7.05%,
    #d5d3f9 0%,
    #6344df 100%
  );
  color: white !important;
  border: none !important;
}

.header-logo-title {
  margin: 0px;
  margin-left: 8px;
}

.input {
  width: 400px;

  background: #03061c;
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

  position: relative;

  button {
    background-color: transparent;
  }
}

.actions-wrapper {
  gap: 24px;
}

@media (max-width: 1000px) {
  .input {
    visibility: hidden;
    width: 0;
  }
}
</style>
