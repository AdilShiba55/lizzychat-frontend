<template>
  <v-dialog
      :id="id"
      class="base-dialog"
      :model-value="opened"
      @click:outside="close"
      transition="dialog-bottom-transition"
      :height="height"
      :width="width"
      :min-height="minHeight"
      persistent>
    <v-btn class="close-button"
           @click="close">
      <v-icon icon="mdi-close"/>
    </v-btn>
    <v-card>
      <div class="header">
        <slot name="header">
          <v-toolbar :title="title"/>
        </slot>
      </div>
      <div class="content">
        <slot name="content">
          <v-card-text>
            <div class="text-h2 pa-12">Default Content</div>
          </v-card-text>
        </slot>
      </div>
      <div class="footer">
        <slot name="footer">
          <div>Default Footer</div>
        </slot>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    id: {type: String, default: 'base-dialog'},
    title: {type: String, default: 'BaseDialog'},
    height: {type: String, default: 'auto'},
    width: {type: String, default: 'auto'},
    minHeight: {type: String, default: 'auto'}
  },
  data() {
    return {
      opened: true
    }
  },
  mounted() {
    document.addEventListener('keydown', this.detectKeydown)
  },
  unmounted() {
    document.removeEventListener('keydown', this.detectKeydown)
  },
  methods: {
    detectKeydown(event) {
      if (event.key === 'Escape') {
        this.close()
      }
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.v-dialog.base-dialog {
  .close-button {
    position: absolute;
    z-index: 2400;
    right: -5px;
    top: -5px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    min-width: unset;
    padding: unset;
  }
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  .v-overlay__scrim {
    background: unset;
  }
  .v-overlay__content {
    min-width: 350px;

    .v-card {
      color: white;
      overflow-y: hidden;
      box-shadow: 0 0 8px #efeff2;
      background-color: $main-black;
    //background: linear-gradient(to bottom,#2a5079da,#1b2f4dda),url(https://www.halloftarot.com/media/box-bg1.webp) no-repeat;
    //background-position: center;
    }
  }

  .header {
    background-color: $main-black;
    border-bottom: 1px solid #dee2e6;

    .v-toolbar {
      color: white;
      background-color: $main-black;

      .v-toolbar-title {
        &__placeholder {
          font-weight: 500;
        }
      }
    }
  }

  .content {
    overflow-y: auto;
  }

  .footer {
    border-top: 1px solid #dee2e6;
  }

  .content {
    padding: 20px;
  }
}
</style>