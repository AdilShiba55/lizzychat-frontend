<template>
  <v-dialog id="choose-character-type-dialog"
            v-model="opened"
            width="auto"
            height="auto"
            transition="dialog-bottom-transition"
            persistent>
    <div class="content">
      <div class="app-name">lizzychat</div>
      <div class="title">I'm interested in: <v-icon icon="mdi-gesture-tap-button" size="30"/></div>
      <div class="types">
        <div class="type" @click="$emit('update:typeId', UtCharacterType.REAL.id)">
          <div class="highlight"/>
          <img src="/character_real_cropped.jpeg" alt=""/>
          <div class="name">Realistic</div>
        </div>
        <div class="type" @click="$emit('update:typeId', UtCharacterType.ARTISTIC.id)">
          <div class="highlight"/>
          <img src="/character_art_cropped.jpeg" alt=""/>
          <div class="name">Artistic</div>
        </div>
        <div class="type" @click="$emit('update:typeId', UtCharacterType.ANIMEv1.id)">
          <div class="highlight"/>
          <img src="/character_animeV2_cropped.jpeg" alt=""/>
          <div class="name">Anime V2</div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>

import {UtCharacterType} from "@/util/UtCharacterType.js";

export default {
  computed: {
    UtCharacterType() {
      return UtCharacterType
    }
  },
  props: {
    typeId: {type: Number},
  },
  data() {
    return {
      opened: true
    }
  }
}
</script>

<style lang="scss">
#choose-character-type-dialog {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  .content {
    color: white;
    overflow-y: scroll;
    background-color: $main-black;
    padding: 10px 10px 20px 10px;
    border-radius: 1.5rem;
    border: 3px gray solid;

    .app-name {
      text-align: center;
      font-weight: bold;
      font-size: 40px;
      color: #ec61a1;
    }

    .title {
      text-align: center;
      font-weight: bold;
      font-size: 25px;
      color: white;
      margin-bottom: 15px;
    }

    .types {
      display: flex;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;

      .type {
        &:nth-child(1) {
          .highlight {
            background-color: rgba(35, 175, 206, 0.3);
          }
        }
        &:nth-child(2) {
          .highlight {
            background-color: rgba(52, 81, 229, 0.3);
          }
        }
        &:nth-child(3) {
          .highlight {
            background-color: rgba(180, 168, 32, 0.3);
          }
        }
      }

      .type {
        position: relative;
        height: 200px;
        width: 200px;
        border-radius: 10px;
        overflow-y: hidden;
        display: flex;
        justify-content: center;
        align-items: baseline;
        cursor: pointer;

        .highlight {
          width: 100%;
          height: 100%;
          position: absolute;
          bottom: 0;
        }
        img {
          width: 200px;
          transition: width 0.3s ease;
        }
        .name {
          position: absolute;
          left: 3px;
          bottom: 2px;
          font-weight: bold;
          padding: 2px 10px;
          border-radius: 4px;
          background-color: rgba(0, 0, 0, 0.8);
        }
      }
      .type:hover {
        img {
          width: 230px;
        }
      }
    }
  }
}

@media (max-width: 700px) {
  #choose-character-type-dialog {
    .content {
      .types {
        .type {
          height: 130px;
        }
      }
    }
  }
}
</style>