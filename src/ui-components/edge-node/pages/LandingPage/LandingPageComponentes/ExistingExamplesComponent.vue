<template>
  <div class="centered-container">
    <div class="centered-text">
      <h2>Explore existing examples</h2>
    </div>


    <div class="bottom-container">
      <div class="bottom-item">
        <div class="center-container">
          <p>Decentralized Science (DeSci)</p>
        </div>
      </div>

      <div class="bottom-item">
        <div class="center-container">
          <p>Supply chains</p>
        </div>
      </div>
      <div class="bottom-item">
        <div class="center-container">
          <p>Life sciences and healthcare</p>
        </div>
      </div>
      <div class="bottom-item">
        <div class="center-container">
          <p>Construction</p>
        </div>
      </div>
      <div class="bottom-item">
        <div class="center-container">
          <p>Metaverse</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CenteredText",
};
</script>

<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px; 
  width: 100%;
}

.centered-text {
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  font-weight: 400;
}

.centered-text h2 {
  font-size: 1.3rem;
  line-height: 32px;
  font-family: "Space Grotesk";
  @media screen and (min-width: 975px) {
    font-size: 1.6rem;
    line-height: 48px;
  }
  @media screen and (min-width: 1400px) {
    font-size: 2rem;
    line-height: 60px;
  }
  font-weight: 500;
}

.bottom-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  gap: 10px;
  flex-wrap: wrap; 
}

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
