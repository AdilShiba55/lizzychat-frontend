<template>
  <div id="image-playground-admin-page">
    <text-field :form="filter"
                field-name="prompt"
                label="Prompt"
                :disabled="isLoading || isGenerating"
                hide-details/>

    <v-select
        v-model="filter.characterTypeId"
        label="Character type"
        :items="characterTypes"
        item-title="name"
        item-value="id"
        variant="outlined"
        :disabled="isLoading || isGenerating"
        hide-details/>

    <v-btn color="primary"
           class="generate-button"
           @click="generateByPrompt"
           :loading="isGenerating"
           :disabled="isLoading || !isFilterValid()"
           block>Generate</v-btn>

    <div class="items">
      <div v-for="(item, index) in items" class="item">
        <v-btn v-if="!item.id"
               class="close-button"
               @click="close(item)">
          <v-icon icon="mdi-close"/>
        </v-btn>
        <div class="actions">
          <v-btn v-if="item.id" @click="copy(item.url)">
            <v-icon icon="mdi-content-copy"/>
          </v-btn>
          <v-btn v-if="item.id" @click="copy(item.path)">
            <v-icon icon="mdi-link-variant"/>
          </v-btn>
        </div>
        <img :src="item.url" alt=""/>
        <div class="main-actions">
          <v-btn v-if="!item.id"
                 color="success"
                 class="save-button"
                 @click="saveImage(item)"
                 :loading="item.isSaving"
                 :disabled="isLoading || isGenerating"
                 block>Save</v-btn>
          <v-btn v-else
                 color="error"
                 class="delete-button"
                 @click="deleteImage(item)"
                 :loading="item.isSaving"
                 :disabled="isLoading || isGenerating"
                 block>Delete</v-btn>

          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props"
                     color="primary"
                     class="download-button"
                     icon="mdi-download"
                     rounded/>
            </template>
            <v-list>
              <v-list-item
                  v-for="(target, index) in [512, 380, 320, 220, 120, 100]"
                  :key="index"
                  :value="index"
                  @click="download(item, target)">
                <v-list-item-title>{{ target }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from "@/components/TextField.vue";
import {characterAdminApi} from "@/api/characterAdmin.api.js";
import {characterApi} from "@/api/character.api.js";
import {UtFile} from "@/util/UtFile.js";
import {imageApi} from "@/api/image.api.js";
import {dictApi} from "@/api/dict.api.js";
import {playgroundImageAdminApi} from "@/api/playgroundImageAdmin.api.js";
import {useErrorStore} from "@/stores/error.js";
import {UtCharacterType} from "@/util/UtCharacterType.js";

export default {
  components: {TextField},
  data() {
    return {
      errorStore: useErrorStore(),
      items: [],
      filter: {
        prompt: null,
        characterTypeId: null
      },
      isGenerating: false,
      isLoading: false
    }
  },
  mounted() {
    this.fetchData()
  },
  computed: {
    characterTypes() {
      return UtCharacterType.getCharacterTypes()
    }
  },
  methods: {
    async download(file, target) {
      const processedFile = await playgroundImageAdminApi.resize({...file, target})
      UtFile.downloadFileFromByteArray(processedFile.content, processedFile.name)
    },
    async copy(value) {
      await navigator.clipboard.writeText(value);
    },
    isFilterValid() {
      return !!this.filter.characterTypeId && !!this.filter.prompt
    },
    async fetchData() {
      this.isLoading = true;
      try {
        this.items = await playgroundImageAdminApi.findAll()
      } catch (error) {
        await this.errorStore.handleError(error)
      } finally {
        this.isLoading = false;
      }
    },
    async generateByPrompt() {
      this.isGenerating = true;
      try {
        const response = await imageApi.generateByPrompt(this.filter.prompt, this.filter.characterTypeId);
        const file = UtFile.getFileFromBase64(response.content, response.name)
        console.log('file', file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.items.unshift({
            ...response,
            url: reader.result
          })
        }
      } catch (error) {
        await this.errorStore.handleError(error)
      } finally {
        this.isGenerating = false;
      }
    },
    async saveImage(item) {
      console.log('item', item)
      item.isSaving = true;
      try {
        const response = await playgroundImageAdminApi.create({name: item.name, content: item.content})
        item.id = response.id;
      } catch (error) {
        await this.errorStore.handleError(error)
      } finally {
        item.isSaving = false;
      }
    },
    async deleteImage(item) {
      item.isSaving = true;
      try {
        await playgroundImageAdminApi.delete(item.id)
        const index = this.items.indexOf(item);
        this.items.splice(index, 1);
      } catch (error) {
        await this.errorStore.handleError(error)
      } finally {
        item.isSaving = false;
      }
    },
    close(item) {
      const index = this.items.indexOf(item);
      this.items.splice(index, 1);
    }
  }
}
</script>

<style lang="scss">
#image-playground-admin-page {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px 12px;

  .items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 10px;

    .item:hover {
      .actions {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
    }

    .item {
      display: flex;
      flex-direction: column;
      position: relative;

      .actions {
        display: none;
        position: absolute;
        top: 3px;
        left: 3px;

        .v-btn {
          min-width: unset;
          padding: 10px;
        }
      }

      .main-actions {
        display: flex;

        .v-btn {
          min-width: unset;
        }
        .download-button {
          height: 100%;
          border-radius: 0 0 4px 0;
        }
      }

      .close-button {
        position: absolute;
        right: -5px;
        top: -5px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        min-width: unset;
        padding: unset;
      }

      img {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }

      .save-button, .delete-button {
        border-top-left-radius: unset;
        border-top-right-radius: unset;
        border-bottom-right-radius: unset;
      }
    }
  }
}
</style>