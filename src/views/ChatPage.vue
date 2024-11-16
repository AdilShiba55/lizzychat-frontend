<template>
  <div id="chat-page">
    <div class="content">
      <chat-toolbar :item="character"
                    :is-fetching-character="isFetchingCharacter"
                    :is-typing="isSendMessage"
                    @open-details="openDetails"/>

      <div v-if="isFetchingData || messages.length > 0" class="messages-container">
        <div class="messages">
          <progress-circular v-if="isFetchingData" :size="50"/>
          <div v-else-if="total > messages.length" style="text-align: center">
            <v-btn text="load more"
                   variant="outlined"
                   width="150px"
                   color="white"
                   @click="fetchData"
                   rounded/>
          </div>
          <div v-for="(message, index) in messages" :key="index">
            <message-box v-if="message.typeId === MESSAGE_TYPE.userText || message.typeId === MESSAGE_TYPE.userTextAsk || message.typeId === MESSAGE_TYPE.aiText"
                         :message="message"
                         :failed="message.failed"/>
            <image-message-box v-else-if="message.typeId === MESSAGE_TYPE.aiImage"
                               :message="message"/>
          </div>

        </div>
      </div>

      <div v-else-if="!isFetchingData && messages.length === 0" class="no-messages-container">
        <no-messages/>
      </div>

      <div class="input-container">
        <div class="response-type" @click.prevent.stop>
          <v-select
              v-model="responseTypeOrder"
              :items="responseTypes"
              item-title="name"
              item-value="order"
              variant="outlined"
              :disabled="isFetchingData || isSendMessage"
              hide-details>
            <template #selection="{item}">
              <span style="font-weight: bold; color: white">give me: {{item.title}}</span>
            </template>
            <template #item="{ item, props: { onClick } }" >
              <div>
                <v-list-item :disabled="getResponseType(item).soon"
                             @click="onClick" class="response-type-menu-item">
                  <span>{{item.title}}</span>
                  <div v-if="getResponseType(item).soon"
                       class="soon-target">soon</div>
                </v-list-item>
              </div>
            </template>
          </v-select>
        </div>

        <message-limit-target v-if="authStore.isLoginChecked"
                              :message-type-id="getCurrentResponseType().id"/>

        <v-text-field v-model="form.text"
                      class="message-text-input"
                      placeholder="Type a message..."
                      variant="outlined"
                      append-icon="mdi-send"
                      @click:append="sendMessage"
                      :readonly="isResponseTypeImage || isResponseTypeAudio"
                      :disabled="isFetchingData || isSendMessage"
                      maxlength="180"
                      hide-details/>
      </div>
    </div>
  </div>
</template>
<script>
import ChatToolbar from "@/components/ChatToolbar.vue";
import {useAuthStore} from "@/stores/auth.js";
import {useToolbarStore} from "@/stores/toolbar.js";
import {useDialogStore} from "@/stores/dialog.js";
import {UtRouter} from "@/util/UtRouter.js";
import router from "@/router/index.js";
import {CHARACTER_IMAGE_TYPE, MESSAGE_TYPE} from "@/util/constants.js";
import {chatApi} from "@/api/chat.api.js";
import NoMessages from "@/components/NoMessages.vue";
import MessageBox from "@/components/MessageBox.vue";
import ProgressCircular from "@/components/ProgressCircular.vue";
import {UtScroll} from "@/util/UtScroll.js";
import ExploreBuyPremium from "@/components/ExploreBuyPremium.vue";
import {UtMobile} from "@/util/UtMobile.js";
import {useHead} from "@unhead/vue";
import {useCharacterDetailsSidebar} from "@/stores/characterDetailsSidebar.js";
import ImageMessageBox from "@/components/ImageMessageBox.vue";
import MessageLimitTarget from "@/components/MessageLimitTarget.vue";
import {UtMessage} from "@/util/UtMessage.js";
import {useErrorStore} from "@/stores/error.js";

export default {
  components: {
    MessageLimitTarget,
    ImageMessageBox, ExploreBuyPremium, ProgressCircular, MessageBox, NoMessages, ChatToolbar},
  data() {
    return {
      errorStore: useErrorStore(),
      authStore: useAuthStore(),
      toolbarStore: useToolbarStore(),
      loginDialog: useDialogStore().getLoginDialog,
      getPremiumDialog: useDialogStore().getPremiumDialog,
      characterDetailsSidebar: useCharacterDetailsSidebar(),
      unlockCharacterDialog: useDialogStore().getUnlockCharacterDialog,
      character: {},
      messages: [],
      total: 1,
      responseTypeOrder: 1,
      form: {
        text: '',
        pageNum: 1,
        pageSize: 10
      },
      responseTypes: [
        {
          order: 1,
          id: MESSAGE_TYPE.aiText,
          name: 'text'
        },
        {
          order: 2,
          id: MESSAGE_TYPE.aiImage,
          name: 'photo',
          characterImageTypeId: CHARACTER_IMAGE_TYPE.routine
        },
        {
          order: 3,
          id: MESSAGE_TYPE.aiImage,
          name: 'photo 16+',
          characterImageTypeId: CHARACTER_IMAGE_TYPE.underwear
        },
        {
          order: 4,
          id: MESSAGE_TYPE.aiImage,
          name: 'photo 18+',
          characterImageTypeId: CHARACTER_IMAGE_TYPE.naked
        },
        {
          order: 5,
          id: null,
          name: 'voice',
          soon: true
        },
      ],
      isFetchingData: false,
      isFetchingCharacter: false,
      isSendMessage: false
    }
  },
  watch: {
    responseTypeOrder() {
      this.form.text = ''
      if(this.isResponseTypeImage) {
        this.form.text = 'Send me your photo, please ;)'
      }
    }
  },
  computed: {
    MESSAGE_TYPE() {
      return MESSAGE_TYPE
    },
    responseTypeIcon() {
      if(this.isResponseTypeImage) return 'mdi-camera'
      else return 'mdi-email-newsletter'
    },
    isResponseTypeText() {
      return this.getCurrentResponseType().id === MESSAGE_TYPE.aiText
    },
    isResponseTypeImage() {
      return this.getCurrentResponseType().id === MESSAGE_TYPE.aiImage
    },
    isResponseTypeAudio() {
      return this.getCurrentResponseType().id === MESSAGE_TYPE.aiVoice
    },
    currentMessageCount() {
      const responseTypeId = this.getCurrentResponseType().id;
      return this.authStore.getUserInfo[UtMessage.getMessageCountFieldName(responseTypeId)]
    },
    currentLimit() {
      const responseTypeId = this.getCurrentResponseType().id;
      return this.authStore.getUserInfo[UtMessage.getLimitFieldName(responseTypeId)]
    },
    isMessageLimitDanger() {
      const difference = this.currentLimit - this.currentMessageCount;
      return this.currentMessageCount >= this.currentLimit || difference < 3;
    },
    isMessageLimitReached() {
      return this.currentMessageCount >= this.currentLimit
    },
    characterId() {
      return this.$route.params?.characterId
    }
  },
  async created() {
    useHead({
      title: 'Chat AI - LizzyChat',
      link: [
        { rel: 'canonical', href: `https://www.lizzychat.com/chat/${this.characterId}` }
      ]
    })
    this.toolbarStore.setBackPath('/chat')
    this.toolbarStore.setShowDiscountButton(true)
  },
  async mounted() {
    await this.fetchDataWithCharacter()
  },
  unmounted() {
    this.toolbarStore.setBackPath(null)
    this.toolbarStore.setShowDiscountButton(false)
  },
  methods: {
    getResponseType(item) {
      return this.responseTypes.find(type => type.order === item.value)
    },
    getCurrentResponseType() {
      return this.responseTypes.find(type => type.order === this.responseTypeOrder)
    },
    messageLimitClicked() {
      if(!this.authStore.isPremium) {
        this.getPremiumDialog.show()
      }
    },
    openDetails() {
      this.characterDetailsSidebar.isDrawer ? this.characterDetailsSidebar.close() : this.characterDetailsSidebar.open(this.character);
    },
    scrollToBottom() {
      const messagesContainer = document.getElementsByClassName('messages')[0];
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight+60;
      }
    },
    toPremium() {
      router.push('/premium')
    },
    async sendMessage() {
      if(this.form.text.trim().length === 0) {
        this.form.text = ''
        return;
      }
      if(!this.authStore.isCharacterEnabled(this.character)) {
        this.unlockCharacterDialog.show(this.character)
        return;
      }
      if(this.isMessageLimitReached && import.meta.env.VITE_MESSAGE_LIMIT_ENABLED === 'true') {
        this.getPremiumDialog.show()
        return;
      }
      this.isSendMessage = true;
      const text = this.form.text
      if(this.isResponseTypeText) {
        this.form.text = ''
      }
      const userMessage = {
        characterId: this.characterId,
        dtCreate: new Date(),
        id: null,
        text: text,
        typeId: MESSAGE_TYPE.userText,
        userId: this.authStore.getTokenInfo.id
      }
      try {
        this.messages.push(userMessage)
        await this.$nextTick(() => {
          this.scrollToBottom();
        });

        if(this.isResponseTypeText) {
          const response = await chatApi.sendTextMessage(text, this.characterId)
          this.authStore.increaseUserLastMonthTextMessageCount()
          this.messages.push(response.message)
        } else if(this.isResponseTypeImage) {
          const response = await chatApi.sendImageMessage(text, this.characterId, this.getCurrentResponseType().characterImageTypeId)
          this.authStore.increaseUserLastMonthImageMessageCount()
          this.messages.push(response.message)
        }
        await this.$nextTick(() => {
          this.scrollToBottom();
        });
      } catch (error) {
        userMessage.failed = true;
        await this.errorStore.handleError(error)
      } finally {
        this.isSendMessage = false;
      }
    },
    async fetchDataWithCharacter() {
      this.isFetchingData = true;
      this.isFetchingCharacter = true;
      try {
        const response = await chatApi.getMessagesWithCharacter({
          characterId: this.characterId,
          pageNum: this.form.pageNum,
          pageSize: this.form.pageSize
        })
        this.character = response.character;
        this.messages = response.content.items.reverse();
        this.total = response.content.total;
        this.form.pageNum++;
        await this.$nextTick(() => {
          this.scrollToBottom();
        });
      } catch (error) {
        await this.errorStore.handleError(error)
      } finally {
        this.isFetchingData = false;
        this.isFetchingCharacter = false;
      }
    },
    async fetchData() {
      this.isFetchingData = true;
      try {
        const response = await chatApi.getMessages({
          characterId: this.characterId,
          pageNum: this.form.pageNum,
          pageSize: this.form.pageSize
        })
        this.messages.unshift(...response.items.reverse())
        this.total = response.total;
        this.form.pageNum++;
      } catch (error) {
        await this.errorStore.handleError(error)
      } finally {
        this.isFetchingData = false;
      }
    }
  }
}
</script>

<style lang="scss">
.v-list-item.response-type-menu-item {
  position: relative;
  .soon-target {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 9px;
    border: 1px black solid;
    border-radius: 4px;
    padding: 0 5px;
    background-color: #6beb6b;
  }
}
#chat-page {

  .content {
    max-width: 900px;
    padding-top: 5px;
    margin: 0 auto;

    .chat-toolbar {
      margin: 0 5px;
    }

    .messages-container, .no-messages-container {
      display: flex;
      flex-direction: column;
      justify-content: end;
      height: calc(100svh - 226px);

      ::-webkit-scrollbar {
        display: none;
      }

      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .messages {
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow-y: auto;
      padding: 10px 10px 60px 10px;
    }
    .no-messages-container {
      align-items: center;
      justify-content: center;
    }

    .input-container {
      position: relative;
      margin: 0 5px;

      .response-type {
        position: absolute;
        top: -32px;
        display: flex;
        align-items: center;
        gap: 10px;
        width: fit-content;
        margin-bottom: 10px;
        border-radius: 4px;

        .prefix {
          color: white;
          font-weight: bold;
        }

        .v-input {
          border-radius: 4px;
          background: linear-gradient(90deg, #573bea, #f14c98 72%) !important;

          &__control {
            width: fit-content;
          }

          .v-field {
            background-color: unset;

            &__field {
              padding: 0 0 0 20px;
            }

            &__input {
              padding: unset;
              height: 30px;
              min-height: unset;

              .v-select__selection-text {
                font-weight: bold;
              }
            }
          }
        }
      }

      .message-limit {
        position: absolute;
        top: -35px;
        right: 0;
      }

      .message-text-input {

        .v-field {

          input {
            padding: 20px;
            background-color: $main-black;
            border-radius: 4px;
            opacity: 1 !important;
          }
        }

        .v-input {
          &__append {
            position: absolute;
            top: 30%;
            right: 15px;
            color: white;
          }
        }
      }
    }
  }
}
</style>