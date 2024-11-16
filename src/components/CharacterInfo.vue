<template>
  <div class="character-info">
    <div class="title">
      <div class="name">{{name}}</div>
      <div class="status">{{status}}</div>
    </div>
    <div class="description">{{description}}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: {type: String, required: true},
    status: {type: String, required: true},
    description: {type: String, required: true}
  }
}
</script>

<style lang="scss">
.character-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 10px;
  border-radius: 20px;
  color: white;
  background-color: $main-overlay;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 10px;
  width: 270px;
  max-width: 350px;


  .title {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .name, .status {
      font-weight: bold;
    }
    .status {
      color: #57c54f;
    }
  }
  .description {
    font-weight: bold;
  }
}
</style>