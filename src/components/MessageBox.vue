<template>
  <div class="message-box" :class="messageClass">
    <div class="message">
      <div class="text">
        <span>{{message.text}}</span>
        <v-icon v-if="failed" icon="mdi-alert-circle"></v-icon>
      </div>
      <div class="date">{{dtCreate}}</div>
    </div>
  </div>
</template>

<script>
import {MESSAGE_TYPE} from "@/util/constants.js";

export default {
  props: {
    message: {type: Object, required: true},
    failed: {type: Boolean, default: false}
  },
  computed: {
    dtCreate() {
      const date = new Date(this.message.dtCreate);
      const time = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      return this.isToday ? time : date.toLocaleDateString()
    },
    isToday() {
      const now = new Date()
      const date = new Date(this.message.dtCreate)
      return date.getDate() === now.getDate() &&
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear();
    },
    messageClass() {
      return this.isUserMessage ? 'user' : 'character'
    },
    isUserMessage() {
      return [MESSAGE_TYPE.userText, MESSAGE_TYPE.userGift, MESSAGE_TYPE.userTextAsk].includes(this.message.typeId)
    }
  }
}
</script>

<style lang="scss">
.message-box {
  display: flex;
  .message {
    display: flex;
    flex-direction: column;
    max-width: 80%;
    //min-width: 10%;
    .text {
      position: relative;
      color: white;
      background-color: #5f2c5a;
      width: 100%;
      padding: 15px;
      border-radius: 10px;

      .mdi-alert-circle {
        position: absolute;
        top: -15px;
        left: -15px;
        color: #ad0303;
        font-size: 30px;
      }
    }
    .date {
      color: gray;
      margin-top: 7px;
      font-size: 12px;
    }
  }
}
.message-box.user {
  justify-content: right;
  .message {
    align-items: end;
    .text {
      color: white;
      background-color: #313030;
    }
    .date {
      text-align: right;
    }
  }
}
.message-box.character {
  justify-content: left;
  .message {
    align-items: start;
    .text {
      //border-top-right-radius: 10px;
      //border-bottom-left-radius: 5px;
      //border-bottom-right-radius: 10px;
    }
    .date {
      text-align: left;
    }
  }
}

@media (max-width: 500px) {
  .message-box {
    .message {
      max-width: 85%;
    }
  }
}
</style>