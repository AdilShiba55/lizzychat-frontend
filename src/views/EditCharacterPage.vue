<template>
  <div id="edit-character-page">

    <v-switch
        v-if="authStore.isAdmin"
        v-model="adminMode"
        class="switch-admin-mode"
        color="primary" label="Admin"
        :disabled="isLoading"
        hide-details/>

    <v-stepper ref="stepper" :items="['Type', 'Hair', 'Body', 'Details', 'Personality','Avatars']"
               alt-labels
               :mobile="UtRouter.isLessThan930()">

      <template v-slot:prev>
        <div>
          <v-btn color="white" variant="outlined"
                 class="stepper-prev-button"
                 prepend-icon="mdi-arrow-left-bold"
                 @click="stepPrev"
                 :disabled="isLoading || isEditing || isFirstStep"
                 block>Previous
          </v-btn>
        </div>
      </template>

      <template v-slot:next>
        <div>
          <v-btn v-if="isLastStep"
                 class="stepper-edit-button"
                 append-icon="mdi-pencil"
                 :disabled="false"
                 :loading="isEditing"
                 @click="editCharacter"
                 block>
            {{ isCreate ? 'Create' : 'Update' }}
          </v-btn>
          <v-btn v-else color="white"
                 class="stepper-next-button"
                 append-icon="mdi-arrow-right-bold" @click="stepNext"
                 :disabled="isNextStepDisabled || isLoading"
                 :loading="isEditing"
                 block>Next
          </v-btn>
        </div>
      </template>

      <template v-slot:item.1>
        <choose-character-type v-model:character-type-id="form.typeId"/>
      </template>

      <template v-slot:item.2>
        <choose-hair-style v-model:hair-style-id="form.hairStyleId"/>

        <choose-hair-color v-model:hair-color-id="form.hairColorId"
                           :character-type-id="form.typeId"/>

        <choose-eyes-color v-model:eyes-color-id="form.eyesColorId"
                           :character-type-id="form.typeId"
                           :admin-mode="adminMode"/>
      </template>

      <template v-slot:item.3>
        <choose-ethnicity v-model:ethnicity-id="form.ethnicityId"/>

        <choose-body-type v-model:body-type-id="form.bodyTypeId"/>
      </template>

      <template v-slot:item.4>

        <div class="form-container">
          <v-form ref="form">
            <v-text-field v-model="form.name"
                          label="Name"
                          bg-color="white"
                          class="required"
                          variant="outlined"
                          color="#ec61a1"
                          :rules="errorStore.getRule('name')"/>

            <template v-if="adminMode">
              <v-text-field v-model="form.age"
                            label="Age (18+)"
                            bg-color="white"
                            class="required"
                            variant="outlined"
                            color="#ec61a1"
                            type="number"
                            :rules="errorStore.getRule('age')"/>

              <v-text-field v-model="form.cost"
                            label="Cost (crystals)"
                            bg-color="white"
                            class="required"
                            variant="outlined"
                            color="#ec61a1"
                            type="number"
                            :rules="errorStore.getRule('cost')"/>
            </template>

            <v-textarea
                v-model="form.description"
                label="Profile description"
                bg-color="white"
                class="description-field required"
                color="#ec61a1"
                variant="outlined"
                maxlength="500"
                :disabled="isLoading || isEditing"
                :rules="errorStore.getRule('description')"/>

            <v-switch
                v-if="adminMode"
                v-model="form.archived"
                class="switcher-archive"
                label="archived"
                color="error"
                :disabled="isLoading || isEditing"
                hide-details/>
          </v-form>
        </div>

        <choose-occupations v-model:occupation-id="form.occupationId"
                            :occupations="dicts.occupation"/>

        <div class="small-tags-container">

          <choose-age v-model:age="form.age"/>

          <choose-race v-model:race-id="form.raceId" :character-type-id="form.typeId"/>

          <choose-pregnant v-model:pregnant="form.pregnant" :character-type-id="form.typeId"/>

          <choose-with-glasses v-model:with-glasses="form.withGlasses"/>
        </div>
      </template>

      <template v-slot:item.5>
        <choose-personality v-model:personality-id="form.personalityId"/>
      </template>

      <template v-slot:item.6>
        <choose-day-time v-model:dayTimeId="form.dayTimeId"/>
        <choose-mood v-model:mood-id="form.moodId"/>
        <choose-clothes v-if="adminMode" v-model:clothes-id="form.clothesId"/>
        <choose-clothes-color v-model:clothes-color-id="form.clothesColorId"/>
        <choose-location-dropdown v-if="adminMode" v-model:form="form" :disabled="isLoading"/>

        <generate-character-avatar :form="form"
                                   field-name="avatarFiles"
                                   :disabled="isLoading || isEditing"/>
      </template>
    </v-stepper>
  </div>
</template>

<script>
import TextField from "@/components/TextField.vue";
import ImagesUploader from "@/components/ImagesUploader.vue";
import {useAuthStore} from "@/stores/auth.js";
import {UtError} from "@/util/UtError.js";
import {characterAdminApi} from "@/api/characterAdmin.api.js";
import {characterApi} from "@/api/character.api.js";
import {dictApi} from "@/api/dict.api.js";
import {UtFile} from "@/util/UtFile.js";
import router from "@/router/index.js";
import {UtGender} from "@/util/UtGender.js";
import GenerateCharacterAvatar from "@/components/GenerateCharacterAvatar.vue";
import {useToolbarStore} from "@/stores/toolbar.js";
import {UtCharacterType} from "@/util/UtCharacterType.js";
import {UtEyesColor} from "@/util/UtEyesColor.js";
import {UtBodyType} from "@/util/UtBodyType.js";
import {UtRace} from "@/util/UtRace.js";
import {UtEthnicity} from "@/util/UtEthnicity.js";
import {UtHairStyle} from "@/util/UtHairStyle.js";
import {UtHairColor} from "@/util/UtHairColor.js";
import ChooseCharacterType from "@/components/ChooseCharacterType.vue";
import ChooseHairStyle from "@/components/ChooseHairStyle.vue";
import ChooseHairColor from "@/components/ChooseHairColor.vue";
import ChooseEthnicity from "@/components/ChooseEthnicity.vue";
import ChooseBodyType from "@/components/ChooseBodyType.vue";
import ChooseEyesColor from "@/components/ChooseEyesColor.vue";
import ChooseOccupations from "@/components/ChooseOccupations.vue";
import {UtOccupation} from "@/util/UtOccupation.js";
import ChooseRace from "@/components/ChooseRace.vue";
import {useErrorStore} from "@/stores/error.js";
import ChooseAge from "@/components/ChooseAge.vue";
import {UtRouter} from "@/util/UtRouter.js";
import {UtBreastSize} from "@/util/UtBreastSize.js";
import {UtAgeLook} from "@/util/UtAgeLook.js";
import ChoosePersonality from "@/components/ChoosePersonality.vue";
import {UtPersonality} from "@/util/UtPersonality.js";
import {useHead} from "@unhead/vue";
import ChoosePregnant from "@/components/ChoosePregnant.vue";
import {useDialogStore} from "@/stores/dialog.js";
import ChooseWithGlasses from "@/components/ChooseWithGlasses.vue";
import ChooseClothesColor from "@/components/ChooseClothesColor.vue";
import ChooseDayTime from "@/components/ChooseDayTime.vue";
import {UtDayTime} from "@/util/UtDayTime.js";
import {UtNumber} from "@/util/UtNumber.js";
import ChooseMood from "@/components/ChooseMood.vue";
import ChooseClothes from "@/components/ChooseClothes.vue";
import ChooseLocationDropdown from "@/components/ChooseLocationDropdown.vue";

export default {
  components: {
    ChooseLocationDropdown,
    ChooseClothes,
    ChooseMood,
    ChooseDayTime,
    ChooseClothesColor,
    ChooseWithGlasses,
    ChoosePregnant,
    ChoosePersonality,
    ChooseAge,
    ChooseRace,
    ChooseOccupations,
    ChooseEyesColor,
    ChooseBodyType,
    ChooseEthnicity,
    ChooseHairColor, ChooseHairStyle, ChooseCharacterType, GenerateCharacterAvatar, TextField, ImagesUploader
  },
  watch: {
    'form.typeId'() {
      const isRealCharacterType = this.form.typeId === UtCharacterType.REAL.id
      if (isRealCharacterType) {
        const hairColorsByCharacterTypeId = UtHairColor.getHairColorsByCharacterTypeId(this.form.typeId)
        const eyesColorsByCharacterTypeId = UtEyesColor.getEyesColorsByCharacterTypeId(this.form.typeId)

        if (this.form.raceId !== UtRace.HUMAN.id) {
          this.form.raceId = UtRace.HUMAN.id;
        }

        const hairColorIsAvailable = hairColorsByCharacterTypeId.filter(item => item.id === this.form.hairColorId).length > 0
        if (!hairColorIsAvailable) {
          this.form.hairColorId = UtHairColor.BLONDE.id;
        }

        const eyesColorIsAvailable = eyesColorsByCharacterTypeId.filter(item => item.id === this.form.eyesColorId).length > 0
        if (!eyesColorIsAvailable) {
          this.form.eyesColorId = UtEyesColor.BROWN.id;
        }

        if(this.form.pregnant) {
          this.form.pregnant = false;
        }
      }
    }
  },
  data() {
    return {
      isLoading: false,
      isEditing: false,
      toolbarStore: useToolbarStore(),
      loginDialog: useDialogStore().getLoginDialog,
      errorStore: useErrorStore(),
      authStore: useAuthStore(),
      step: 1,
      adminMode: false,
      form: {
        name: 'Example Name',
        description: 'Example Profile Description',
        typeId: UtCharacterType.REAL.id,
        ethnicityId: UtEthnicity.CAUCASIAN.id,
        hairStyleId: UtHairStyle.SHORT.id,
        hairColorId: UtHairColor.BLONDE.id,
        bodyTypeId: UtBodyType.SLIM.id,
        raceId: UtRace.HUMAN.id,
        eyesColorId: UtEyesColor.BROWN.id,
        occupationId: UtOccupation.DOCTOR.id,
        genderId: UtGender.FEMALE,
        personalityId: UtPersonality.CAREGIVER.id,
        clothesId: null,
        clothesColorId: null,
        moodId: null,
        locationId: null,
        cost: 0,
        archived: false,
        pregnant: false,
        withGlasses: false,
        avatarFiles: [],
        dayTimeId: null,
        age: UtNumber.getRandomNumberBetween(18, 29),
      },
      dicts: {
        occupation: []
      },
    }
  },
  async created() {
    let canonical = 'https://www.lizzychat.com/myAI/edit'
    if(this.isUpdate) {
      canonical+= `/${this.characterId}`
    }
    useHead({
      title: 'Create AI - LizzyChat',
      link: [
        { rel: 'canonical', href: canonical }
      ]
    })
    this.toolbarStore.setBackPath('/myAI')
  },
  async mounted() {
    if (this.isUpdate) {
      await this.fetchData()
      this.emitter.on('logout', () => router.push('/myAI'))
    }
    await this.fetchDicts()
  },
  unmounted() {
    this.toolbarStore.setBackPath(null)
    this.emitter.off('logout')
  },
  computed: {
    isNextStepDisabled() {
      return (
          (this.step === 1 && !this.form.typeId) ||
          (this.step === 2 && (!this.form.hairStyleId || !this.form.hairColorId || !this.form.eyesColorId)) ||
          (this.step === 3 && (!this.form.ethnicityId || !this.form.bodyTypeId)) ||
          (this.step === 4 && (!this.form.name || !this.form.description)) ||
          (this.step === 5 && !this.form.personalityId)
      )
    },
    isFirstStep() {
      return this.step === 1
    },
    isLastStep() {
      return this.step === 6
    },
    UtRouter() {
      return UtRouter
    },
    UtHairColor() {
      return UtHairColor
    },
    UtCharacterType() {
      return UtCharacterType
    },
    characterId() {
      return this.$route.params?.characterId
    },
    isCreate() {
      return !this.characterId
    },
    isUpdate() {
      return !!this.characterId;
    },
    isAdminka() {
      const currentPath = router.currentRoute.value.fullPath;
      return currentPath.startsWith('/adminka')
    }
  },
  methods: {
    stepNext() {
      if (this.step === 5 && !this.authStore.isAuthorized) {
        this.loginDialog.openLoginOrVerify()
      } else {
        this.step++;
        this.$refs.stepper.next()
      }
    },
    stepPrev() {
      this.step--;
      this.$refs.stepper.prev()
    },
    async fetchData() {
      this.isLoading = true;
      try {
        const method = this.isAdminka ? characterAdminApi.findById : characterApi.findById;
        const character = await method(this.characterId)
        this.setForm(character)
      } catch (error) {
        await this.errorStore.handleError(error, this.$refs.form)
      } finally {
        this.isLoading = false;
      }
    },
    async fetchDicts() {
      this.isLoading = true;
      try {
        this.dicts = await dictApi.findNotArchived(['occupation'])
      } catch (error) {
        await this.errorStore.handleError(error)
      } finally {
        this.isLoading = false;
      }
    },
    close() {
      this.$emit('close')
    },
    setForm(character) {
      this.form = {
        ...character,
        archived: !!character.dtArchive,
        dtCreate: new Date(character.dtCreate)?.toLocaleDateString()
      }

      this.form.avatarFiles.forEach(avatarFile => {
        const reader = new FileReader()
        const file = UtFile.getFileFromBase64(avatarFile.content, avatarFile.name)
        reader.readAsDataURL(file)
        reader.onload = () => {
          avatarFile.url = reader.result
        }
      })

      if (character.dtArchive) {
        this.form.dtArchive = new Date(character.dtArchive)?.toLocaleDateString()
      }
      console.log('setForm', this.form)
    },
    async editCharacter() {
      if(!this.authStore.isAuthorized) {
        this.loginDialog.openLoginOrVerify()
      } else {
        this.isEditing = true;
        try {
          const method = this.isAdminka ? characterAdminApi.edit : characterApi.edit;
          await method({
            ...this.form,
            breastSizeId: UtBreastSize.getBreastSizeByBodyTypeId(this.form.bodyTypeId).id,
            ageLookId: UtAgeLook.getAgeLookIdByAge(this.form.age).id
          })
          const path = this.isAdminka ? '/adminka/character' : '/myAI'
          await router.push(path)
        } catch (error) {
          await this.errorStore.handleError(error)
        } finally {
          this.isEditing = false;
        }
      }
    },
  }
}
</script>

<style lang="scss">
#edit-character-page {
  position: relative;

  .switch-admin-mode {
    color: white;
    margin-left: 10px;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .v-form {
      width: 100%;
      max-width: 600px;

      .switcher-archive {
        margin-bottom: 20px;
      }

      &-group {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
      }

      .v-input {
        min-width: 160px;
        flex: 1;

        .v-field {
          .v-label {
            color: #ec61a1;
            opacity: 1;
          }
        }
      }
    }
  }

  .v-stepper-item--selected {
    .v-avatar {
      font-weight: bold;
      background-color: #ec61a1;
    }

    .v-stepper-item__content {
      color: #ec61a1;
    }
  }

  .v-stepper {
    background-color: rgba(255, 255, 255, 0.1);

    &-header {
      display: flex;
      justify-content: center;
    }

    .v-btn.stepper-edit-button {
      background-color: green;

      .v-btn__content {
        font-weight: bold;
      }

      .mdi {
        font-size: 20px;
      }
    }

    .v-btn.stepper-next-button {
      background-color: #ec61a1;

      .v-btn__content {
        font-weight: bold;
      }

      .mdi {
        font-size: 25px;
      }
    }

    .v-btn.stepper-prev-button {
      .v-btn__content {
        font-size: 12px;
        font-weight: bold;
      }

      .mdi {
        font-size: 25px;
      }
    }

    &-header, &-actions {
      color: white;
    }

    &-window {
      background-color: white;
      margin: unset;

      &-item:nth-child(1), &-item:nth-child(2), &-item:nth-child(3), &-item:nth-child(5) {
        padding: 30px 5px;
        gap: 40px;
      }
      &-item:nth-child(4) {
        padding: 25px 5px;

        #choose-occupations {
          margin-bottom: 30px;
        }

        .small-tags-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      }
      &-item:nth-child(6) {
        padding: 30px 5px;
        gap: 10px;
      }

      &-item {
        display: flex;
        flex-direction: column;
      }
    }

    &-actions {
      padding: 20px 10px;
    }
  }

  .v-form {
    .edit-button {
      margin-top: 20px;
    }
  }
}
</style>