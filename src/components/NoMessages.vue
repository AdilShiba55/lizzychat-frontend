<template>
  <div id="no-messages">
    <div>
      <h2 class="title">No messages here yet...</h2>
      <h4 class="description">Send a message and start conversation.</h4>
    </div>
    <v-icon icon="mdi-message-processing"/>
  </div>
</template>

<style lang="scss">
#no-messages {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 20px;
  //border: 1px red solid;
  width: 220px;
  padding: 10px 20px 20px 20px;
  background-color: rgba(173, 38, 162, 0.4);
  .title, .description {
    text-align: center;
  }
  .title {
    color: white;
    font-size: 14px;
    font-weight: bold;
  }
  .description {
    color: #cbcbcb;
    font-size: 14px;
  }
  .mdi {
    color: white;
    font-size: 48px;
  }
}
</style>


<script setup>
</script>