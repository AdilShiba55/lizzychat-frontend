<template>
  <div id="explore-buy-premium" @click="$emit('click')">
    <div class="cat-gif-container">
      <img src="/catg.gif" alt="" width="45" height="45" style="border-radius: 4px"/>
    </div>
    <span class="text">Up to 75% off</span>
    <buy-premium-timer/>
  </div>
</template>

<script>
import BuyPremiumTimer from "@/components/BuyPremiumTimer.vue";

export default {
  components: {BuyPremiumTimer}
}
</script>

<style lang="scss">
#explore-buy-premium:hover {
  background: linear-gradient(90deg, #644ce3, #ec61a1 72%);
}
#explore-buy-premium {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  cursor: pointer;
  background: linear-gradient(90deg, #573bea, #f14c98 72%);

  .cat-gif-container {
    display: flex;
    align-items: center;
    width: 140px
  }

  .text {
    color: white;
    font-weight: bold;
    font-size: 15px;
    padding: 10px;
    border-radius: 18px;
    background-color: rgb(255 125 177);
  }
}

@media (max-width: 700px) {
  #explore-buy-premium {
    justify-content: space-around;
    .cat-gif-container {
      display: none;
    }
  }
}
</style>