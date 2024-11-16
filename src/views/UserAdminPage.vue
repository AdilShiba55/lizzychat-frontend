<template>
  <div id="user-admin-page">
    <div class="filters">
      <text-field :form="filter"
                  field-name="text"
                  label="username or email"
                  :disabled="isLoading"/>

      <yes-no-dropdown :form="filter"
                       field-name="blocked"
                       label="Blocked"
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
            Email
          </th>
          <th class="text-left">
            Username
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in items"
            :key="item.id" :class="{'blocked':!!item.dtBlocked}">
          <td>{{ item.id }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.username }}</td>
          <td class="actions">
            <div class="actions-container">
              <v-icon icon="mdi-pencil" @click="userEditDialog.show(item.id)"/>
            </div>
          </td>
        </tr>
        </tbody>
      </v-table>

      <v-pagination
          v-if="items.length > 0"
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
import {userApi} from "@/api/user.api.js";
import YesNoDropdown from "@/components/YesNoDropdown.vue";
import TextField from "@/components/TextField.vue";
import {debounce} from "lodash";
import UserEditDialog from "@/dialog/UserEditDialog.vue";
import {userAdminApi} from "@/api/userAdmin.api.js";
import ProgressCircular from "@/components/ProgressCircular.vue";
import {useDialogStore} from "@/stores/dialog.js";
import {useErrorStore} from "@/stores/error.js";

export default {
  components: {ProgressCircular, UserEditDialog, TextField, YesNoDropdown},
  watch: {
    'userEditDialog.success'() {
      this.userEditDialog.close()
      this.fetchData()
    },
    'filter.pageNum'() {
      this.fetchData()
    },
    'filter.text'() {
      this.filter.pageNum = 1;
      this.fetchDataDebounce();
    },
    'filter.blocked'() {
      this.filter.pageNum = 1;
      this.fetchData()
    }
  },
  mounted() {
    this.fetchData()
  },
  data () {
    return {
      errorStore: useErrorStore(),
      userEditDialog: useDialogStore().getUserEditDialog,
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
        const response = await userAdminApi.search(this.filter)
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
#user-admin-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 10px;

  .filters {
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