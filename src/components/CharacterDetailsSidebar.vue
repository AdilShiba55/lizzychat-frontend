<template>
  <v-layout id="character-details-sidebar">
    <v-navigation-drawer
        v-model="characterDetailsSidebar.isDrawer"
        :class="{'single-image':(avatars.length === 1)}"
        location="right"
        :rail="false"
        width="320"
        touchless
        hide-overlay
        permanent
        temporary>

      <v-btn class="close-button"
             icon="mdi-close"
             @click="characterDetailsSidebar.close()"/>

      <template v-if="characterDetailsSidebar.isDrawer">
        <v-carousel>
          <v-carousel-item v-for="(avatarUrl, index) in avatars" :key="index">
            <div class="image-container">
              <v-skeleton-loader v-if="!isImageLoaded[index]" width="100%" height="100%"/>
              <img v-show="isImageLoaded[index]" class="character-avatar"
                   :src="avatarUrl"
                   alt="character-avatar"
                   @click="$emit('card-clicked')"
                   @load="isImageLoaded[index] = true"/>
            </div>
          </v-carousel-item>
        </v-carousel>

        <div class="base-info">
          <div class="name">{{name}}</div>
          <div class="description">{{description}}</div>
        </div>

        <div class="second-info">

          <div class="info-item">
            <v-icon icon="mdi-account-circle"/>
            <div class="info-item__data">
              <div class="value">{{age}}</div>
              <div class="field-name">Age</div>
            </div>
          </div>

          <div class="info-item">
            <v-icon icon="mdi-account-circle"/>
            <div class="info-item__data">
              <div class="value">{{raceName}}</div>
              <div class="field-name">Race</div>
            </div>
          </div>

          <div class="info-item">
            <v-icon icon="mdi-account-circle"/>
            <div class="info-item__data">
              <div class="value">{{ethnicityName}}</div>
              <div class="field-name">Ethnicity</div>
            </div>
          </div>

          <div class="info-item">
            <v-icon icon="mdi-account-circle"/>
            <div class="info-item__data">
              <div class="value">{{occupationName}}</div>
              <div class="field-name">Occupation</div>
            </div>
          </div>

          <div class="info-item">
            <v-icon icon="mdi-account-circle"/>
            <div class="info-item__data">
              <div class="value">{{dtCreate}}</div>
              <div class="field-name">Registered</div>
            </div>
          </div>

          <div class="info-item">
            <v-icon icon="mdi-account-circle"/>
            <div class="info-item__data">
              <div class="value">{{email}}</div>
              <div class="field-name">Email</div>
            </div>
          </div>
        </div>
      </template>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
import {useCharacterDetailsSidebar} from "@/stores/characterDetailsSidebar.js";
import {UtEthnicity} from "@/util/UtEthnicity.js";
import {UtRace} from "@/util/UtRace.js";
import {dictApi} from "@/api/dict.api.js";

export default {
  data() {
    return {
      characterDetailsSidebar: useCharacterDetailsSidebar(),
      isImageLoaded: [],
      occupation: null
    }
  },
  computed: {
    character() {
      return this.characterDetailsSidebar.character
    },
    avatars() {
      return this.character ? this.character.avatarUrls : []
    },
    name() {
      return this.character?.name??''
    },
    description() {
      return this.character?.description??''
    },
    age() {
      return this.character?.age??''
    },
    email() {
      return this.name.replace(/\s+/g, '').toLowerCase() + '@liz.com'
    },
    raceName() {
      const raceId = this.character.raceId;
      return UtRace.getRaces().find(item => item.id === raceId)?.name
    },
    ethnicityName() {
      const ethnicityId = this.character.ethnicityId;
      return UtEthnicity.getEthnicities().find(item => item.id === ethnicityId)?.name;
    },
    occupationName() {
      return this.character.occupation?.name;
    },
    dtCreate() {
      return new Date(this.character.dtCreate).toLocaleDateString()
    }
  }
}
</script>

<style lang="scss">
#character-details-sidebar {
  .v-navigation-drawer {
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    background-color: $main-black;
    padding-top: $toolbar-height;

    &__content {
      position: relative;
      .close-button {
        position: fixed;
        z-index: 10;
        top: calc($toolbar-height + 5px);
        left: 5px;
      }
    }

    .v-window {
      height: fit-content !important;
      .image-container {
        height: 400px;
        display: flex;
        justify-content: center;
        border-bottom: 2px solid rgba(255, 255, 255, 0.5);
        .character-avatar {
          width: 100%;
        }
      }

      &__controls {
        display: none;
      }
    }
    .base-info {
      display: flex;
      flex-direction: column;
      color: white;
      padding: 10px 15px 15px 15px;
      gap: 4px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.5);

      .name {
        font-size: 25px;
        font-weight: bold;
      }
      .description {
        font-weight: 600;
      }
    }

    .second-info {
      display: flex;
      flex-direction: column;
      padding: 20px 15px;
      gap: 20px;
      .info-item {
        display: flex;
        align-items: center;
        gap: 15px;
        .mdi {
          color: gray;
          font-size: 40px;
        }
        &__data {
          .value {
            color: white;
            font-size: 16px;
          }
          .field-name {
            color: gray;
          }
        }
      }
    }
  }
}
</style>

