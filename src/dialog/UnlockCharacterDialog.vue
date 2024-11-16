<template>
  <BaseDialog id="unlock-character-dialog" :class="{'unlocked':isAlreadyUnlocked, 'enough-crystals':isEnoughCrystals}"
              title="Unlock"
              width="400">
    <template v-slot:content>
      <div class="character-card-container">
        <character-card :character="character"/>
      </div>

      <div class="button-containers">
        <div class="button-container">
          <v-btn v-if="!isAlreadyUnlocked" variant="outlined"
                 size="x-large"
                 :loading="isLoading"
                 @click="unlock"
                 rounded
                 block>
            <template v-slot:prepend>
              <img class="crystals" src="/crystals_256x256.webp"/>
            </template>
            <template v-slot:default>{{ character.cost}}</template>
            <template v-slot:append>
              <img class="crystals" src="/crystals_256x256.webp"/>
            </template>
          </v-btn>
          <div v-else class="check-text">
            <div class="text">UNLOCKED</div>
            <v-icon icon="mdi-check-bold"/>
          </div>
        </div>
      </div>
    </template>
  </BaseDialog>
</template>
<script>
import BaseDialog from "@/dialog/BaseDialog.vue";
import {useDialogStore} from "@/stores/dialog.js";
import CharacterCard from "@/components/CharacterCard.vue";
import {useAuthStore} from "@/stores/auth.js";
import {purchaseApi} from "@/api/purchase.api.js";
import {useErrorStore} from "@/stores/error.js";

export default {
  components: {CharacterCard, BaseDialog},
  data() {
    return {
      errorStore: useErrorStore(),
      authStore: useAuthStore(),
      unlockCharacterDialog: useDialogStore().getUnlockCharacterDialog,
      addBalanceDialog: useDialogStore().getAddBalanceDialog,
      isLoading: false
    }
  },
  computed: {
    character() {
      return this.unlockCharacterDialog.character;
    },
    isEnoughCrystals() {
      const currentCrystalCount = this.authStore.getBalance
      return currentCrystalCount >= this.character.cost
    },
    isAlreadyUnlocked() {
      return this.authStore.isCharacterEnabled(this.character)
    }
  },
  methods: {
    async unlock() {
      if(!this.isEnoughCrystals) {
        this.addBalanceDialog.show()
        return;
      }

      this.isLoading = true;
      try {
        await purchaseApi.unlockCharacter(this.character.id)
        this.authStore.addUnlockedCharacterId(this.character.id)
      } catch (error) {
        await this.errorStore.handleError(error)
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style lang="scss">
#unlock-character-dialog {
  .header, .footer {
    display: none;
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .character-card-container {
      display: flex;
      justify-content: center;
      .character-card {
        width: 100%;
        max-width: 350px;
        box-shadow: 0 0 14px #ffc000;
        border: unset;
        border: 2px #ffc000 solid;
        border-radius: 4px;

        &__character-info {
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
        }
      }
    }
    .button-containers {
      display: flex;
      justify-content: center;

      .button-container {
        display: flex;
        justify-content: center;
        width: 250px;

        .v-btn {
          color: #ffc000;
          box-shadow: 0 0 14px #efeff2;

          &__prepend {
            .crystals {
              position: absolute;
              left: 15px;
              width: 40px;
            }
          }
          &__append {
            .crystals {
              position: absolute;
              right: 15px;
              width: 40px;
            }
          }
        }

        .check-text {
          display: flex;
          gap: 10px;
          margin-left: 25px;

          .text {
            font-weight: bold;
          }
          .mdi-check-bold {
            color: #00e300;
          }
        }
      }
    }
  }
}
</style>