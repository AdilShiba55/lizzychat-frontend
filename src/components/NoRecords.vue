<template>
  <div id="no-records">
    <v-icon :icon="icon"/>
    <h1>{{title}}</h1>
    <h3>{{description}}</h3>
  </div>
</template>

<script>
export default {
  props: {
    icon: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true}
  }
}
</script>

<style lang="scss">
#no-records {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
  .mdi {
    color: white;
    font-size: 150px;
  }
  h1 {
    color: #ec61a1;
    font-weight: bold;
    text-align: center;
  }
  h3 {
    color: white;
    font-weight: bold;
    text-align: center;
  }
}
</style>