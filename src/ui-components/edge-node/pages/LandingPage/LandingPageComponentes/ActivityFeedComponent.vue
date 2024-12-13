<template>
    <div class="activity-feed">

        <div class="activity-header">
            <h2>Activity feed</h2>
            <button class="show-all-activity">Show all activity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</button>

        </div>

        
      <div v-for="(item, index) in activities" :key="index" class="activity-item">
     
            <img  class="icon-img" src="/images/explorer-ka.png" alt="Icon" />
      

            <div class="details">
            <p><strong>UAL:</strong> <span class="ual">{{ item.ual }}</span></p>

            
            <div class="inline-details">
                <div class="nice-status">{{ item.status }}</div>
                
                <img style=" margin-top: 10px;" class = "icon-img-small" src="/images/icons/link-icon.svg" alt="Chain Icon" />

                <div style class="inline-row-style">
                <img class="icon-img-small" src="/images/icons/base-blockchain.svg" alt="Base Icon" />
                <p style="padding: 10px 0px;">{{ item.network }}</p>
                </div>

              

                <p style="padding: 10px; margin-left: auto; color: #636575;">{{ item.time }}</p>

            </div>

            </div>

      </div>
    </div>
  </template>
  
  <script>
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
      const button = document.querySelector('.show-all-activity');
      if (button) {
        button.addEventListener('click', () => {
          window.location.href = 'http://localhost:5173/ActivityFeedPage';
        });
      }
    },
  };
  </script>
  

  <style scoped>


.activity-feed {
  width: 100%; /* Zauzima ceo raspoloživi prostor */
  min-width: 50% !important;
  max-width: 1200px; /* Opcionalno ograničenje širine */
  margin: 0 auto; /* Centriranje kontejnera */
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
    display: flex; /* Postavlja fleksibilni raspored */
    align-items: center; /* Vertikalno poravnanje elemenata */
    gap: 15px; /* Razmak između elemenata */
    margin-bottom: 15px;
    padding: 5px;
    background: radial-gradient(
        53.33% 74.69% at 50% 107.05%,
        #03061c 0%,
        #1b1b34 100%
    );
    border: 1.5px solid #8b85f4;
    border-radius: 8px;

    width: 100%; /* Aktivnost zauzima celu širinu */
    box-sizing: border-box; /* Uključuje padding i border u širinu */
}

  
  .icon-img {
    margin-left: 15px;
    width: 70px; /* Širina slike */
    height: 70px; /* Visina slike */
    }

.icon-img-small {
   
    width: 20px; /* Širina slike */
    height: 20px; /* Visina slike */
    }

  
  .details p {
    
    margin: 0;
  }
  .created {
    color: #9c27b0;
  }

  .nice-status {
    margin: 5px 2px;
  padding: 5px 8px; /* Unutrašnje margine, prilagodite po želji */
  background-color: #8B85F4; /* Ljubičasta boja */
  color: white ; /* Boja teksta */
  border: none; /* Bez ivica */
  border-radius: 25px; /* Zaobljeni uglovi */
  font-size: 16px; /* Velicina fonta */
  cursor: pointer; /* Kursor u obliku ruke */
}

.details{
    width: 100%;
  }

  .inline-details {
    width: 100%;
  display: flex; /* Postavlja elemente u isti red */
  gap: 25px; /* Razmak između elemenata */
  align-items: bottom; /* Vertikalno centriranje */
    margin-top: 20px;
}

.inline-details p {
  margin: 0; /* Uklanja dodatne margine između <p> elemenata */
}

.activity-header {
  display: flex; /* Postavlja h2 i dugme u isti red */
  justify-content: space-between; /* Postavlja razmak između h2 i dugmeta */
  align-items: center; /* Vertikalno centriranje */
  color: white; /* Bela boja teksta */
  padding: 20px; /* Unutrašnji razmak */
  border-radius: 10px; /* Zaobljeni uglovi */
  background-image: url("/images/activity-feed.svg"); /* Dodaje sliku kao pozadinu */
  background-size: cover; /* Sliku razvlači da pokrije ceo element */
  background-position: center; /* Pozicionira sliku u centru */
  background-repeat: no-repeat; /* Sprečava ponavljanje slike */
  margin-bottom: 30px;
}


.activity-header h2 {
  font-family: "Space Grotesk";
  margin: 0; /* Uklanja podrazumevane margine */
  font-size: 1.5rem; /* Podešava veličinu fonta */
}

.activity-header .show-all-activity {
  background: none; /* Bez pozadine */
  border: none; /* Bez ivica */
  color: white; /* Bela boja teksta */
  font-size: 1rem; /* Veličina fonta */
  cursor: pointer; /* Pokazivač se menja u 'pointer' */
  
}

.ual {
  color: #6D6AC6; /* Postavite željenu boju (ovde je narandžasta) */
  font-weight: bold; /* Opcionalno, da se istakne */
}

.inline-row-style {
  display: flex; /* Postavlja elemente u jedan red */
  align-items: center; /* Vertikalno centriranje */
  gap: 10px; /* Razmak između elemenata */
}
  </style>
  