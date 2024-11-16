<template>
  <div class="character-chat-item" ref="characterChatItem">
    <div class="img-container" :class="{'present':item.avatarUrl}">
      <v-skeleton-loader v-if="item.avatarUrl && !isImageLoaded" height="100%" width="100%" loading/>
      <img v-if="item.avatarUrl"
           v-show="isImageLoaded"
           :src="item.avatarUrl"
           alt="character avatar"
           @load="isImageLoaded = true"/>
      <v-icon v-else icon="mdi-image-off-outline"/>
    </div>
    <div class="info">
      <div class="name">{{item.name}}</div>
      <div class="message" :class="{'empty':(!item.text && !item.characterImageId)}">{{itemMessage}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {type: Object, required: true}
  },
  data() {
    return {
      isImageLoaded: false
    }
  },
  mounted() {
    this.adaptMessageWidth()
    window.addEventListener('resize', this.adaptMessageWidth);
  },
  unmounted() {
    window.removeEventListener('resize', this.adaptMessageWidth)
  },
  computed: {
    itemMessage() {
      if(this.item.text) return this.item.text
      else if(this.item.characterImageId) return 'image'
      else return 'start!'
    }
  },
  methods: {
    adaptMessageWidth() {
      const chatItem = this.$refs.characterChatItem
      if(chatItem) {
        const message = chatItem.getElementsByClassName('message')[0]
        if(message) {
          message.style.width = `${chatItem.clientWidth-120}px`
        }
      }
    },
  }
}
</script>

<style lang="scss">
.character-chat-item:hover {
  background-color: #270835;
  //background-color: #5f2c5a;
}
.character-chat-item {
  display: flex;
  border: 1px white solid;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  gap: 15px;
  background-color: $main-black;
  .img-container {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px white solid;

    .v-skeleton-loader {
      background-color: #242424;
    }

    img {
      width: 65px;
      height: auto;
    }

    .mdi {
      color: white;
      font-size: 32px;
    }
  }
  .img-container.present {
    align-items: baseline;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .name {
      color: white;
      font-size: 16px;
      font-weight: bold;
    }
    .message {
      color: #9d9d9d;
      font-weight: 500;
      width: 300px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .empty {
      color: #2cb02c;
      font-weight: bold;
    }
  }
}
</style>