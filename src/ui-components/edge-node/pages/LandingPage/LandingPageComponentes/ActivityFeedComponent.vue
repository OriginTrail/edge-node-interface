<template>
    <div class="activity-feed">

        <div class="activity-header">
            <h2>Activity feed</h2>
            <button class="show-all-activity">Show all activity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;</button>

        </div>

        
      <div v-for="(item, index) in activities" :key="index" class="activity-item">
     
            <img  class="icon-img" src="/images/explorer-ka.png" alt="Icon" />
      

            <div class="details">
            <p><strong>UAL:</strong> {{ item.ual }}</p>
                
            <div class="inline-details">
                <div class="nice-status">{{ item.status }}</div>
                
                
                <p style="padding: 10px;"> {{ item.network }}</p>
                <p style="padding: 10px; float: left;">{{ item.time }}</p>
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
  };
  </script>
  
  <style scoped>
  
  .activity-feed {
    background-color: #1b1b34;
    color: white;
    padding: 20px;
    border-radius: 10px;
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
    gap: 15px;
    margin-bottom: 15px;
    padding: 5px;
    background: radial-gradient(
            53.33% 74.69% at 50% 107.05%,
            #03061C 0%,
            #1b1b34 100%
          );
    border: 1.5px solid #8b85f4;
    border-radius: 8px;
  }
  
  .icon-img {
    width: 80px; /* Širina slike */
    height: 80px; /* Visina slike */
    }

  
  .details p {
    margin: 0;
  }
  .created {
    color: #9c27b0;
  }

  .nice-status {
  padding: 10px 20px; /* Unutrašnje margine, prilagodite po želji */
  background-color: #8B85F4; /* Ljubičasta boja */
  color: white ; /* Boja teksta */
  border: none; /* Bez ivica */
  border-radius: 25px; /* Zaobljeni uglovi */
  font-size: 16px; /* Velicina fonta */
  cursor: pointer; /* Kursor u obliku ruke */
}



  .inline-details {
  display: flex; /* Postavlja elemente u isti red */
  gap: 15px; /* Razmak između elemenata */
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
  background: linear-gradient(90deg, #6a1b9a, #8e24aa); /* Gradijent pozadine */
  color: white; /* Bela boja teksta */
  padding: 10px 20px; /* Unutrašnji razmak */
  border-radius: 10px; /* Zaobljeni uglovi */
  background:"/images/explorer-cover.svg";
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

  </style>
  