<template>

  <div class="activity-item">
    <div class="details-left">
      <p class="powered-by-text">
        Powered by:
        <span class="powered-logo">
          <img
            src="/images/edge-node-logo.svg"
            alt="logo"
            class="header-logo"
          />
          <strong>Origin Trails</strong>
        </span>
      </p>
    </div>
    <div class="details-right">
      <p>Privacy Policy <span></span> Terms of Service</p>
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
  justify-content: space-between;
  align-items: center; 
  margin-bottom: 15px;
  padding: 20px;
  background: radial-gradient(
    53.33% 74.69% at 50% 107.05%,
    #03061c 0%,
    #1b1b34 100%
  );
  border: 1.5px solid #8b85f4;
  border-radius: 50px;
}

.details-left,
.details-right {
  flex: 1; 
}

.details-left {
  text-align: left; 
}

.details-right {
  text-align: right;
}
.details-right p {
  color: #7f7f7f;
}

.details-left p,
.details-right p {
  margin: 0;
}

.powered-by-text {
  display: inline-flex;
  align-items: center; 
  line-height: 1; 
  color: #a376db !important; 
}

.powered-logo {
  display: inline-flex;
  align-items: center;
}

.powered-logo img {
  width: 20px; 
  height: auto;
  margin-right: 4px; 
  margin-left: 10px;
}

.details-right p span {
  position: relative;
  padding-right: 20px; 
}

.details-right p span::after {
  content: "|";
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 30px; 
  color: #7f7f7f;
  margin-left: 10px; 
  margin-right: 10px;
  font-weight: 300;
}
</style>
