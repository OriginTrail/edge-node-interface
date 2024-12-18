<template>
  <ion-page>
    <ion-content class="background">
      <div class="d-flex flex-column position-relative home">
        <div class="banner">
          <img
            src="/images/explorer-cover.svg"
            alt="Explorer Cover"
            width="100%"
          />
          <div class="heading">
            <h1>
              Explore the Collective Neuro-Symbolic Decentralized Knowledge
              Graph
            </h1>
            <div class="search-bar">
              <form method="get" action="/explore">
              <input
                name="ual"
                placeholder="Search by UAL"
                autocomplete="off"
                required
              />
              <button>Search</button>
            </form>

            </div>

          </div>
          <div class="planet"></div>
        </div>
        <div class="kpis d-flex flex-row">
          <div>
            <img
              src="/images/explorer-kpi-left.svg"
              alt="Explorer KPI Background Left"
              width="100%"
            />
            <div class="kpi">
              <h3>Number of Knowledge Assets</h3>
              <span class="highlight">{{ numOfKAs }}</span>
            </div>
          </div>
          <div>
            <img
              src="/images/explorer-kpi-right.svg"
              alt="Explorer KPI Background Right"
              width="100%"
            />
            <div class="kpi">
              <h3>Total TRAC staked</h3>
              <span style="color: #1ADEDC;">{{ totalTracStaked }}</span>
            </div>
          </div>
        </div>

        <div class = "mobile-part">
          
          <div style="height: 1000;" class="image-container">
                <img style=" height: 400px" src="/images/upper-part-mobile.svg" alt="Explorer KPI Background Left" class="image1">
                <img style="width: 200px; height: 200px;" src="/images/planet.webp" alt="Explorer KPI Background Left" class="image2">
                <img style="height: 300px;  width: 85%;" src="/images/down-part-mobile.svg" alt="Explorer KPI Background Left" class="image3">
                <div class="text-overlay">

                      <div class="heading">
                      <h6 style="width: 100%;">
                        Explore the Collective Neuro-Symbolic Decentralized Knowledge
                        Graph
                      </h6>
                     
                  </div>
              
                    
                </div>
         
              </div>

          <div class="box bottom-item-mobile">

              <div class="center-container-mobile">
              
                <h3>Total TRAC staked</h3>
                <span style="color: #1ADEDC;">{{ totalTracStaked }}</span>
                <img
                src="/images/trac-background-card-phone.svg"
                alt="Explorer KPI Background Left"
                width="100%"
                height = "600px"
              />
              </div>
          </div>
        </div>

        <ExistingExamplesComponent />

        <div class="dashboard">
          <div class="left">
            <ActivityFeed />
          </div>

          <div class="right">
            <GraphsComponent />
          </div>
        </div>

        

        <FooterComponent />
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage } from "@ionic/vue";

import ExistingExamplesComponent from "./LandingPageComponentes/ExistingExamplesComponent.vue";
import ActivityFeed from "./LandingPageComponentes/ActivityFeedComponent.vue";
import GraphsComponent from "./LandingPageComponentes/GraphsComponent.vue";
import FooterComponent from "./LandingPageComponentes/FooterComponent.vue";

import {
  getNumberOfKnowledgeAssets,
  getTotalTracStaked,
} from "@/services/metricsService.js";

export default {
  components: {
    IonPage,
    IonContent,
    ExistingExamplesComponent,
    ActivityFeed,
    GraphsComponent,
    FooterComponent,
   
    
  },
  data() {
    return {
      numOfKAs: 0,
      totalTracStaked: 0,
    };
  },
  mounted() {
    // this.getNumberOfKAs();
    // this.getTotalTrac();
  },
  methods: {
    async getNumberOfKAs() {
      this.numOfKAs = await getNumberOfKnowledgeAssets();
    },
    async getTotalTrac() {
      this.totalTracStaked = await getTotalTracStaked();
    },
  },
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

          &:focus {
            outline: none;
          }
        }

        button {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: radial-gradient(
            53.33% 74.69% at 50% -7.05%,
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
    min-width: 50%;
    flex: 1;
  }
}

.mobile-part{
    visibility: hidden;
    height: 0;
  }

@media (max-width: 900px) {

  .kpis{
    width: 0;
    height: 0;
    visibility: hidden;
  }
  .banner{
    width: 0;
    height: 0;
    visibility: hidden;
  }

  .mobile-part {
    visibility: visible;
   
    width: 100%;
    height: auto;
    display: block;
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




  
.center-container p {
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  .bottom-item-mobile {
  display: flex;
  justify-content: center; /* Centriranje sadržaja horizontalno */
  align-items: center; /* Centriranje sadržaja vertikalno */
  background: 
    url('/images/trac-background-card-phone.svg') no-repeat center center, /* Slika preko */
    radial-gradient(
      53.33% 74.69% at 50% 107.05%,
      #03061c 0%,
      #1b1b34 100%
    ); /* Gradient ispod slike */
  background-size: cover; /* Slika treba da popuni ceo prostor */
  border: 1.5px solid #8b85f4;
  width: 85%; /* Širina kontejnera */
  text-align: center; /* Centriranje teksta unutar kontejnera */
  border-radius: 8px;
  font-size: 16px;
  font-family: "Space Grotesk";
  font-weight: 500;
  min-width: 150px;
  margin: 0 auto; /* Horizontalno centriranje u roditeljskom elementu */
 
}


.center-container-mobile {
  position: relative;
  width: 100%;
 
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centriranje po vertikali */
  align-items: center; /* Centriranje po horizontali */
  height: 180px;
}

.center-container-mobile h3,
.center-container-mobile span {
  text-align: center;
  z-index: 1; /* Osiguranje da tekst bude ispred slike */
  margin: 0; /* Uklanjanje podrazumevanih margina */
}

.center-container-mobile h3 {
  margin-bottom: 10px; /* Razmak između h3 i span */
}

.center-container-mobile img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* Možete prilagoditi visinu slike prema potrebama */
  object-fit: cover; /* Obezbeđuje da slika popuni prostor bez deformacija */
}

.image-container {
    display: flex;
    flex-direction: column; /* Rasporedi slike vertikalno */
    align-items: center; /* Centriranje slika unutar kontejnera */
    gap: 20px; /* Razmak između slika */
    //height: 1000px; /* Fiksna visina kontejnera */
    padding-bottom: 20px;
    width: 100%; /* Širina kontejnera koja će obuhvatiti celu širinu ekrana */
}


.image2 {
    position: absolute; /* Apsolutno pozicioniranje slike */
    top: 365px; /* Pozicija slike između prve i treće */
    left: 50%; /* Postavljanje slike na sredinu ekrana */
    transform: translateX(-50%); /* Poravnavanje slike na sredinu */
    width: 200px; /* Širina slike */
    height: 200px; /* Visina slike */
}

.text-overlay {
    position: absolute; /* Apsolutno pozicioniranje teksta unutar slike */
    top: 33%; /* Postavlja tekst na sredinu slike po visini */
    left: 50%; /* Postavlja tekst na sredinu slike po širini */
    transform: translate(-50%, -50%); /* Poravnava tekst tačno u centar slike */
    text-align: center; /* Centriranje teksta */
    color: white; /* Boja teksta, možeš promeniti prema potrebi */
}

.text-overlay h3 {
    margin: 0; /* Uklanja marginu sa h3 */
    font-size: 24px; /* Možeš promeniti veličinu fonta */
}

.text-overlay span {
    font-size: 16px; /* Možeš promeniti veličinu fonta */
}

  
</style>
