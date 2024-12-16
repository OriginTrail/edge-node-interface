<template>
  <div class="activity-feed">
    <div class="activity-header">
      <h2>Activity feed</h2>
      <button class="show-all-activity">
        Show all activity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;
      </button>
    </div>

    <div v-for="(item, index) in activities" :key="index" class="activity-item">
      <img class="icon-img" src="/images/explorer-ka.png" alt="Icon" />

      <div class="details">
        <p>
          <strong>UAL:</strong> <span class="ual">{{ item.ual }}</span>
        </p>

        <div class="inline-details">
          <div class="nice-status">{{ item.status }}</div>

          <img
            style="margin-top: 10px"
            class="icon-img-small"
            src="/images/icons/link-icon.svg"
            alt="Chain Icon"
          />

          <div style class="inline-row-style">
            <img
              class="icon-img-small"
              src="/images/icons/base-blockchain.svg"
              alt="Base Icon"
            />
            <p style="padding: 10px 0px">{{ item.network }}</p>
          </div>

          <p style="padding: 10px; margin-left: auto; color: #636575">
            {{ item.time }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DKG_EXPLORER_URL } from "@/utils/constants";

export default {
  name: "ActivityFeed",
  data() {
    return {
      activities: [
        {
          ual: "dkg://did:otp:0xDbF8e9d36A73Cd890efF09",
          status: "Created",
          network: "Base",
          time: "2s Ago",
        },
        {
          ual: "dkg://did:otp:0xDbF8e9d36A73Cd890efF09",
          status: "Created",
          network: "Base",
          time: "3s Ago",
        },
        {
          ual: "dkg://did:otp:0xDbF8e9d36A73Cd890efF09",
          status: "Created",
          network: "Base",
          time: "3s Ago",
        },
        // Add more items as needed
      ],
    };
  },
  mounted() {
    const button = document.querySelector(".show-all-activity");
    if (button) {
      button.addEventListener("click", () => {
        window.location.href = "http://localhost:5173/activities";
        //window.location.href = DKG_EXPLORER_URL + "/activities";
      });
    }
  },
};
</script>

<style scoped>
.activity-feed {
  width: 100%; 
  min-width: 50% !important;
  max-width: 1200px; 
  margin: 0 auto;
}

.show-all {
  background-color: #6a1b9a;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 15px; 
  margin-bottom: 15px;
  padding: 5px;
  background: radial-gradient(
    53.33% 74.69% at 50% 107.05%,
    #03061c 0%,
    #1b1b34 100%
  );
  border: 1.5px solid #8b85f4;
  border-radius: 8px;

  width: 100%; 
  box-sizing: border-box; 
}

.icon-img {
  margin-left: 15px;
  width: 70px; 
  height: 70px;
}

.icon-img-small {
  width: 20px; 
  height: 20px; 
}

.details p {
  margin: 0;
}
.created {
  color: #9c27b0;
}

.nice-status {
  margin: 5px 2px;
  padding: 5px 8px; 
  background-color: #8b85f4; 
  color: white;
  border: none;
  border-radius: 25px; 
  font-size: 16px; 
  cursor: pointer; 
}

.details {
  width: 100%;
}

.inline-details {
  width: 100%;
  display: flex;
  gap: 25px; 
  align-items: bottom; 
  margin-top: 20px;
}

.inline-details p {
  margin: 0; 
}

.activity-header {
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  color: white; 
  padding: 20px; 
  border-radius: 10px;
  background-image: url("/images/activity-feed.svg"); 
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat;
  margin-bottom: 30px;
}

.activity-header h2 {
  font-family: "Space Grotesk";
  margin: 0; 
  font-size: 1.5rem; 
}

.activity-header .show-all-activity {
  background: none; 
  border: none; 
  color: white; 
  font-size: 1rem; 
  cursor: pointer;
}

.ual {
  color: #6d6ac6; 
  font-weight: bold; 
}

.inline-row-style {
  display: flex; 
  align-items: center; 
  gap: 10px; 
}
</style>
