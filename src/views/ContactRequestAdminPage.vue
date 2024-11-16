<template>
  <div id="contact-request-admin-page">
    <div class="filters">
      <text-field :form="filter"
                  field-name="text"
                  label="text"
                  :disabled="isLoading"/>

      <yes-no-dropdown :form="filter"
                       field-name="archived"
                       label="Archived"
                       with-never-mind/>
    </div>

    <template v-if="!isLoading">
      <v-table theme="dark">
        <thead>
        <tr>
          <th class="text-left">
            ID
          </th>
          <th class="text-left">
            Created
          </th>
          <th class="text-left">
            Archived
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in items"
            :key="item.id" :class="{'blocked':!!item.dtArchive}">
          <td>{{ item.id }}</td>
          <td>{{ new Date(item.dtCreate).toLocaleDateString() }}</td>
          <td>{{ item.dtArchive ? new Date(item.dtArchive).toLocaleDateString() : '--' }}</td>
          <td class="actions">
            <div class="actions-container">
              <v-icon icon="mdi-pencil" @click="contactEditDialog.show(item.id)"/>
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
import {useContactEditDialogStore, useDialogStore} from "@/stores/dialog.js";
import {contactRequestAdminApi} from "@/api/contactRequestAdmin.api.js";
import {useErrorStore} from "@/stores/error.js";

export default {
  components: {ProgressCircular, TextField, YesNoDropdown},
  watch: {
    'contactEditDialog.successCount'() {
      this.fetchData()
    },
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
    }
  },
  mounted() {
    this.fetchData()
  },
  data() {
    return {
      errorStore: useErrorStore(),
      contactEditDialog: useContactEditDialogStore(),
      filter: {
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
    fetchDataDebounce: debounce(function () {
      this.fetchData()
    }, 600),
    async fetchData() {
      this.isLoading = true;
      try {
        const response = await contactRequestAdminApi.search(this.filter)
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
#contact-request-admin-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 10px;

  .filters, {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
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