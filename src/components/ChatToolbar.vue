<template>
  <div class="chat-toolbar"
       @click="openProfile">
    <div class="info-container">
      <div class="img-container" :class="{'present':isAvatarPresent}">
        <v-skeleton-loader v-if="!isImageLoaded && isAvatarPresent" height="100%" width="100%" loading/>
        <img v-if="isAvatarPresent"
             v-show="isImageLoaded"
             :src="imgUrl"
             alt="character-avatar"
             @load="isImageLoaded = true"/>
        <v-icon v-else icon="mdi-image-off-outline"/>
      </div>
      <div class="info">
        <div class="name">{{name}}</div>
        <typing-effect v-if="isTyping"/>
        <div v-else class="status">{{status}}</div>
      </div>
    </div>

    <v-btn id="menu-activator"
           icon="mdi-dots-vertical"/>
    <v-menu v-model="menuOpened"
            location="start"
            class="chat-toolbar-menu"
            :close-on-content-click="false"
            transition="slide-x-transition"
            activator="#menu-activator">

      <v-list>
        <v-list-item title="Profile"
                     append-icon="mdi-account-circle"
                     @click="openProfile"/>
      </v-list>
    </v-menu>

  </div>
</template>

<script>
import TypingEffect from "@/components/TypingEffect.vue";
import ProgressCircular from "@/components/ProgressCircular.vue";

export default {
  components: {ProgressCircular, TypingEffect},
  props: {
    item: {type: Object, required: true},
    isFetchingCharacter: {type: Boolean, default: true},
    isTyping: {type: Boolean, default: false}
  },
  data() {
    return {
      menuOpened: false,
      isImageLoaded: false
    }
  },
  computed: {
    isAvatarPresent() {
      return this.item.avatarUrls && this.item.avatarUrls.length > 0
    },
    imgUrl() {
      return this.item.avatarUrls[0]
    },
    name() {
      return this.isFetchingCharacter ? '...' : this.item.name
    },
    status() {
      return this.isFetchingCharacter ? '...' : 'online';
    }
  },
  methods: {
    openProfile() {
      this.menuOpened = false;
      const chatToolbarMenu = document.getElementsByClassName('chat-toolbar-menu')[0]
      if(chatToolbarMenu) {
        chatToolbarMenu.style.display = 'none'
      }
      this.$emit('open-details')
    }
  }
}
</script>

<style lang="scss">
.chat-toolbar-menu {
  .v-list {
    color: white;
    background: linear-gradient(90deg, #573bea, #f14c98 72%) !important;
    .v-list-item {
      &-title {
        font-weight: 500;
      }
      .mdi {
        color: white;
        font-size: 30px;
      }
    }
  }
}
.chat-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px white solid;
  border-radius: 4px;
  padding: 10px;
  background-color: #313030;
  z-index: 100;
  height: 80px;
  cursor: pointer;

 .info-container {
   display: flex;
   gap: 15px;

   .img-container {
     width: 60px;
     height: 60px;
     border-radius: 50%;
     overflow: hidden;
     display: flex;
     justify-content: center;
     align-items: center;

     .v-skeleton-loader {
       background-color: #242424;
     }

     .mdi {
       color: white;
       font-size: 32px;
     }
   }

   .img-container.present {
     align-items: baseline;

     img {
       width: 80px;
     }
   }

   .progress-container {
     display: flex;
     align-items: center;
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
     .status {
       color: #599355;
     }
   }
 }

  .v-btn {
    background-color: #474646;

    .mdi-dots-vertical {
      color: white;
      font-size: 30px;
    }
  }
}
</style>