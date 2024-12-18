<template>


        <div class="box bottom-item">
            <div class="kpi">
              <h3>Total TRAC staked</h3>
              <span>{{ totalTracStaked }}</span>
            </div>
        </div>

   
  </template>
  
  <script>
  export default {
    name: "CenteredText",
  };
  </script>
  
  <style scoped>
  
  
  .center-container p {
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  .bottom-item {
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(
      53.33% 74.69% at 50% 107.05%,
      #03061c 0%,
      #1b1b34 100%
    );
    border: 1.5px solid #8b85f4;
    padding: 25px;
    width: 18%;
    text-align: center;
    border-radius: 8px;
    font-size: 16px;
    font-family: "Space Grotesk";
    font-weight: 500;
    min-width: 150px;
  }
  
  @media (max-width: 768px) {
    .bottom-item {
      width: 45%;
    }
  }
  
  @media (max-width: 480px) {
    .bottom-item {
      width: 100%;
    }
  }
  </style>
  