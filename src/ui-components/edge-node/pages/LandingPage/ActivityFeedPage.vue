<template>
  <ion-page>
    <ion-content class="background">
      <div class="d-flex flex-column position-relative home">
        <div class="dkg-activity-feed">
          <img src="/images/dkg-activity-feed.svg" alt="Opis slike" />
        </div>

        <ActivityTable />

        <FooterComponent />
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage } from "@ionic/vue";

import ActivityTable from "./ActivityFeedComponents/ActivityTableComponent.vue";
import FooterComponent from "./LandingPageComponentes/FooterComponent.vue";

export default {
  components: { IonPage, IonContent, ActivityTable, FooterComponent },
};
</script>

<style scoped lang="scss">
.home {
  gap: 24px;

  .banner {
    position: relative;

    .heading {
      z-index: 10;
      max-width: 90%;
      width: 975px;
      position: absolute;
      top: 20px;
      @media screen and (min-width: 1400px) {
        top: 40px;
      }
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      h1 {
        font-size: 24px;
        line-height: 32px;
        @media screen and (min-width: 975px) {
          font-size: 36px;
          line-height: 48px;
        }
        @media screen and (min-width: 1400px) {
          font-size: 48px;
          line-height: 60px;
        }
        font-weight: 500;
        font-family: "Space Grotesk";
      }
      form {
        position: relative;
        width: 80%;
        margin: 24px auto;

        input {
          background: #191934;
          border: 1.5px solid #8b85f4;
          border-radius: 50px;
          height: 70px;
          width: 100%;
          padding: 8px 24px;
        }

        button {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: radial-gradient(
            53.33% 74.69% at 50% 107.05%,
            #d5d3f9 0%,
            #6344df 100%
          );
          color: #fff;
          border-radius: 50px;
          padding: 16px 24px;
        }
      }
    }
  }

  .planet {
    background: url(/images/planet.webp);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 23%;
    aspect-ratio: 1;

    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%) translateY(22px);
  }

  .kpis {
    gap: 24px;
    & > div {
      flex: 1;
      position: relative;

      .kpi {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        text-align: center;

        h3 {
          font-family: "Manrope";
          font-weight: 500;
          font-size: 16px;
          @media screen and (min-width: 975px) {
            font-size: 20px;
          }
          margin-bottom: 16px;
        }
        span {
          font-family: "Space Grotesk";
          font-weight: 500;
          font-size: 24px;
          @media screen and (min-width: 975px) {
            font-size: 32px;
          }
          @media screen and (min-width: 1400px) {
            font-size: 48px;
          }

          &.highlight {
            color: #8b85f4;
          }
        }
      }
    }
  }
}

.dashboard {
  display: flex;
  gap: 20px;
  width: 100%;

   .left,
   .right {
    flex: 1;
  }
}

@media (max-width: 1300px) {
  .dashboard {
    flex-direction: column;
  }

   .left,
   .right {
    flex: none;
    width: 100%;
  }
}

.dkg-activity-feed img {
  width: 100%;
  height: auto;
  display: block;
}
</style>
