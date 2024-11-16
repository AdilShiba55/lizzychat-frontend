<template>
  <div id="buy-premium-timer">
    <div class="element">
      <span class="value">{{min === 0 ? '00' : getFormattedNumber(min)}}</span>
      <span class="key">min</span>
    </div>

    <span class="dot">:</span>

    <div class="element">
      <span class="value">{{second === 0 ? '00' : getFormattedNumber(second)}}</span>
      <span class="key">sec</span>
    </div>

    <span class="dot">:</span>

    <div class="element">
      <span class="value">{{millisecond === 0 ? '00' : getFormattedNumber(millisecond)}}</span>
      <span class="key">ms</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      min: 59,
      second: 59,
      millisecond: 59,
      timer: null  // Store the timer reference
    }
  },
  mounted() {
    const millisecondCookie = window.$cookies.get('buyPremiumTimeMillisecond')
    const secondCookie = window.$cookies.get('buyPremiumTimeSecond')
    const minCookie = window.$cookies.get('buyPremiumTimeMin')
    if (millisecondCookie) {
      this.millisecond = millisecondCookie
    }
    if (secondCookie) {
      this.second = secondCookie
    }
    if (minCookie) {
      this.min = minCookie
    }
    this.startTimer()

    window.addEventListener('beforeunload', this.handleBeforeUnload);
  },
  unmounted() {
    this.saveTimerToCookie()
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  },
  methods: {
    getFormattedNumber(number) {
      return number < 10 ? '0' + number : number;
    },
    saveTimerToCookie() {
      window.$cookies.set('buyPremiumTimeMillisecond', this.millisecond)
      window.$cookies.set('buyPremiumTimeSecond', this.second)
      window.$cookies.set('buyPremiumTimeMin', this.min)
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.millisecond > 0) {
          this.millisecond--;
        } else {
          this.millisecond = 99;
          if (this.second > 0) {
            this.second--;
          } else {
            this.second = 59;
            if (this.min > 0) {
              this.min--;
            } else {
              this.min = 59;
              this.seconds = 59;
              this.millisecond = 59;
            }
          }
        }
      }, 10);
    },
    handleBeforeUnload() {
      this.saveTimerToCookie()
    }
  }
}
</script>

<style lang="scss">
#buy-premium-timer {
  display: flex;
  gap: 10px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px white solid;

  .dot {
    color: white;
    font-size: 20px;
    font-weight: bold;
  }

  .element {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25px;

    .value {
      color: white;
      text-align: center;
      font-weight: bold;
      width: 25px;
    }
    .key {
      color: #c7c7c7;
      font-size: 12px;
      font-weight: bold;
    }
  }
}
</style>