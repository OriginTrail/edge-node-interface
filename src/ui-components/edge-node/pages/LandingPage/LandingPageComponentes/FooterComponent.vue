<template>
    <!-- Hardkodovani podaci -->
    <div class="activity-item">
      <div class="details-left">
        <p class="powered-by-text">Powered by: <span class="powered-logo">
            <img src="/images/edge-node-logo.svg" alt="logo" class="header-logo"> 
            <strong>Origin Trails</strong>
        </span></p>
      </div>
      <div class="details-right">
        <p>Privacy Policy <span></span>   Terms of Service</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ActivityFeed",
  };
  </script>
  
  <style scoped>
  .activity-item {

    display: flex;
    justify-content: space-between; /* Razmak između leva i desna */
    align-items: center; /* Poravnavanje vertikalno */
    margin-bottom: 15px;
    padding: 20px;
    background: radial-gradient(53.33% 74.69% at 50% 107.05%, #03061c 0%, #1b1b34 100%);
    border: 1.5px solid #8b85f4;
    border-radius: 50px; /* Još zaobljenije ivice */
    
  }
  
  .details-left, .details-right {
    flex: 1; /* Uzimaju isti prostor */
  }
  
  .details-left {
    text-align: left; /* Levo poravnanje */
  }
  
  .details-right {
    
    text-align: right; /* Desno poravnanje */
  }
  .details-right p{
    color: #7F7F7F;
  }
  
  .details-left p, .details-right p {
    margin: 0;
   
  }
  
  .powered-by-text {
    display: inline-flex;
    align-items: center; /* Poravnava sve elemente po sredini */
    line-height: 1; /* Osigurava da "Powered by" i "Origin Trails" budu na istoj visini */
    color:  #A376DB !important; /* Ljubičasta boja za tekst */
  }

  .powered-logo {
    display: inline-flex;
    align-items: center; /* Poravnava logo i tekst */
   
  }

  .powered-logo img {
    width: 20px; /* Veličina logotipa, možete prilagoditi */
    height: auto;
    margin-right: 4px; /* Razmak između logotipa i teksta */
    margin-left: 10px;
  }

  .details-right p span {
  position: relative;
  padding-right: 20px; /* Razmak od crte */
}

.details-right p span::after {
  content: "|";
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%); /* Centriranje crte vertikalno */
  font-size: 30px; /* Povećajte veličinu crte */
  color: #7F7F7F; /* Boja crte */
  margin-left: 10px; /* Razmak između crte i sledećeg teksta */
  margin-right: 10px;
  font-weight: 300;
}

  

  </style>
  