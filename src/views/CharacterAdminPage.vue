<template>
  <div id="character-admin-page">

    <div class="filters">
      <text-field :form="filter"
                  field-name="text"
                  label="Name/Description"
                  :disabled="isLoading"/>

      <yes-no-dropdown :form="filter"
                       field-name="systemOnly"
                       label="System only"/>

      <yes-no-dropdown :form="filter"
                       field-name="archived"
                       label="Archived"
                       with-never-mind/>
    </div>

    <div class="buttons">
      <v-btn color="success"
             prepend-icon="mdi-plus"
             :loading="isLoading"
             @click="toCharacterEditing()"
             block>CREATE</v-btn>
    </div>

    <template v-if="!isLoading">
      <v-table theme="dark">
        <thead>
        <tr>
          <th class="text-left">
            ID
          </th>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Type
          </th>
          <th class="text-left">
            Cost
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in items"
            :key="item.id" :class="{'blocked':!!item.dtArchive}">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ getType(item).name }}</td>
          <td>{{ item.cost }}</td>
          <td class="actions">
            <div class="actions-container">
              <v-icon icon="mdi-pencil" @click="toCharacterEditing(item)"/>
            </div>
          </td>
        </tr>
        </tbody>
      </v-table>

      <v-pagination
          v-model="filter.pageNum"
          :length="pageCount"
          :total-visible="6"
          :disabled="isLoading"
          color="white"/>
    </template>
    <progress-circular v-else/>
  </div>
</template>

<script>
import YesNoDropdown from "@/components/YesNoDropdown.vue";
import TextField from "@/components/TextField.vue";
import {debounce} from "lodash";
import ProgressCircular from "@/components/ProgressCircular.vue";
import {characterAdminApi} from "@/api/characterAdmin.api.js";
import {CHARACTER_TYPE} from "@/util/constants.js";
import ImagesUploader from "@/components/ImagesUploader.vue";
import {useErrorStore} from "@/stores/error.js";
import router from "@/router/index.js";

export default {
  components: {ImagesUploader, ProgressCircular, TextField, YesNoDropdown},
  watch: {
    'filter.pageNum'() {
      this.fetchData()
    },
    'filter.text'() {
      this.filter.pageNum = 1;
      this.fetchDataDebounce();
    },
    'filter.archived'() {
      this.filter.pageNum = 1;
      this.fetchData()
    },
    'filter.systemOnly'() {
      this.filter.pageNum = 1;
      this.fetchData()
    }
  },
  created() {
    this.fetchData()
  },
  data() {
    return {
      errorStore: useErrorStore(),
      filter: {
        systemOnly: true,
        pageNum: 1,
        pageSize: 25
      },
      items: [],
      total: 0,
      isLoading: false
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.filter.pageSize);
    }
  },
  methods: {
    toCharacterEditing(item) {
      let path = '/adminka/character/edit'
      if(item) {
        path += `/${item.id}`
      }
      router.push(path)
    },
    getType(item) {
      return CHARACTER_TYPE.filter(type => type.id === item.typeId)[0]
    },
    fetchDataDebounce: debounce(function () {
      this.fetchData()
    }, 600),
    async fetchData() {
      this.isLoading = true;
      try {
        const response = await characterAdminApi.search(this.filter)
        this.items = response.items;
        this.total = response.total;
        console.log('items', this.items)
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
#character-admin-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 10px;

  .filters, .buttons {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Adjust minmax values as needed */
    gap: 10px;
  }

  table {
    tr.blocked {
      background-color: gray;
    }
  }

  .v-pagination {
    &__list {
      justify-content: left;
    }
  }
}
</style>