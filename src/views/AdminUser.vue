<template>
  <v-container style="min-height:100%" v-resize="resize" fluid>
    <v-data-table
      :headers="headers"
      :items="filteredItem"
      :search="mobileOption.filter"
      class="elevation-2 px-2"
      :items-per-page="mobileOption.itemsPerPage"
      :server-items-length="pagingC.total_item"
      :height="tableHeight"
      v-if="$mq!=='xs'"
      :options.sync="option"
      :footer-props="{
        'items-per-page-options': [10, 15, 25, 50, 100]
      }"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Pengguna</v-toolbar-title>
          <v-btn icon :loading="isLoading" @click="pagination(option)" class="ml-4">
            <v-icon small>fa-sync</v-icon>
          </v-btn>
          <v-text-field
            v-model="mobileOption.filter"
            outlined
            dense
            color="secondary"
            label="Filter"
            filled
            single-line
            hide-details
            prepend-inner-icon="small fas fa-filter"
            class="ml-6 small-icon"
            style="max-width:200px"
          ></v-text-field>

          <v-spacer></v-spacer>
          <!-- <v-scale-transition origin="center center">
            <v-btn
              v-show="isSelectedComputed"
              color="error"
              class="mr-2"
              @click="deleteMultipleCall"
            >
              <v-icon small left>fa-trash</v-icon>
              Hapus ({{ selected.length }})
            </v-btn>
          </v-scale-transition>-->
        </v-toolbar>
      </template>
      <template v-slot:item.updatedDate="{ item }">
        <div class="py-2">
          <div>
            <v-icon small>far fa-clock</v-icon>
            <span class="mx-2 font-weight-normal">{{ item.updatedDate | time}}</span>
            <b class="font-weight-black">WIB</b>
          </div>
          <div class="font-weight-medium grey--text caption">{{ item.updatedDate | date}}</div>
        </div>
      </template>

      <template v-slot:item.isAdmin="{ item }">
        <v-simple-checkbox v-model="item.isAdmin" disabled></v-simple-checkbox>
      </template>
      <template v-slot:item.isBlocked="{ item }">
        <span v-if="item.isBlocked" class="font-weight-bold error--text">Banned</span>
        <span v-else>-</span>
      </template>
      <template v-slot:item.isActive="{ item }">
        <div>
          <span
            v-if="item.isActive"
            class="overline text--secondary">
            <v-icon x-small color="success">fas fa-circle</v-icon> Online
          </span>

          <span
            v-else
            class="overline text--secondary">
            <v-icon x-small color="error">fas fa-circle</v-icon> OFFLINE
          </span>
        </div>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          v-if="item.isBlocked"
          :id="'unblock-'+item.id"
          small @click="showUnblockDialog(item)">fa-unlock-alt
        </v-icon>
        <v-icon v-else :id="'delete-'+item.id" small @click="showDeleteDialog(item)">fa-ban
        </v-icon>
      </template>
    </v-data-table>
    <div v-else>

      <v-app-bar fixed app :color="$vuetify.theme.dark ? '':'white'" flat>

        <v-toolbar-title >Pengguna</v-toolbar-title>
        <v-spacer></v-spacer>

        <div style="width:100px" class="input-field primary--text ml-2 subtitle-2 mt-1">
            <span class="font-weight-regular">Sort: </span>
            <select v-model="mobileOption.orderBy">
              <option value="asc" selected>a-Z</option>
              <option value="desc" selected>Z-a</option>
            </select>
            <label>
              <v-icon x-small color="primary" >fa-arrow-down</v-icon>
            </label>
        </div>
        <div style="width:100px" class="input-field primary--text ml-2 subtitle-2 mt-1">
            <select v-model="mobileOption.sortBy">
            <option v-for="(item, idx) in mobileOption.sortableFields"
              :value="item.field"
              :key="idx">
              {{item.name}}
            </option>
            </select>
            <label>
              <v-icon x-small color="primary" >fa-chevron-down</v-icon>
            </label>
        </div>
      </v-app-bar>
      <v-card class="mt-n3 mb-3 ml-n3 border-vertical"
        tile
        outlined
        style="min-width:100vw; position:sticky; top:56px; z-index:2">

          <v-card-text>
            <v-text-field
              v-model="mobileOption.filter"
              class="mx-4 super-dense"
              placeholder="Cari..."
              filled
              rounded
              hide-details
              dense
            >
            <template v-slot:prepend-inner>
              <v-icon x-small>fa-search</v-icon>
            </template>
            </v-text-field>
          </v-card-text>
      </v-card>

      <v-card
        :id="'card-'+user.id"
        v-for="user in filteredItem"
        :key="user.id"
        elevation="5"
        ripple
        class="pa-2 mb-3"
        @click="showSheet(user)">
        <v-card-title>

          <span class="font-weight-bold">{{user.username}}
            <span v-if="user.isBlocked" class="font-weight-bold error--text subtitle-2">
              Banned
            </span>
          </span>
        </v-card-title>
        <v-card-subtitle>


          <div style="font-size:12px" class="primary--text font-weight-bold">
            {{ user.email }}
          </div>
          <div style="font-size:12px" class="text--secondary">
            {{ user.isAdmin ? "Admin":"User" }}
          </div>

          <div>
            <span
              v-if="user.isActive"
              class="overline text--secondary">
              <v-icon x-small color="success">fas fa-circle</v-icon> Online
            </span>

            <span
              v-else
              class="overline text--secondary">
              <v-icon x-small color="error">fas fa-circle</v-icon> OFFLINE
            </span>
          </div>
        </v-card-subtitle>
      </v-card>
    </div>
    <div class="surface"
      style="width:100%;position:fixed; bottom:52px; left:0;border-width:1px;"
      v-if="$mq=='xs'">
      <v-card class="text-center py-2" tile flat outlined>
        <div style="position:absolute;"  class="input-field primary--text ml-2 subtitle-2 mt-1">
            <select v-model="mobileOption.itemsPerPage" @change="pageSizeChanged">
              <option v-for="(item, index) in mobileOption.itemsPerPageOption"
                :key="index"
                v-bind:value="item" selected>
                {{item}}
                </option>
            </select>
            <label> <v-icon x-small color="primary" class="mb-1">fa-chevron-up</v-icon></label>
        </div>
        <v-pagination
          class="pagination"
          :value="pagingC.page"
          @input="paginationChanged"
          :length="pagingC.total_page"
          :total-visible="5"
        ></v-pagination>
      </v-card>
    </div>
    <v-bottom-sheet v-model="sheet">
      <v-list>
        <v-subheader>Aksi</v-subheader>
        <v-list-item v-if="sheetSelected.isBlocked"
           ripple @click="showUnblockDialog(sheetSelected)">
          <v-list-item-icon>
            <v-icon>fa-unlock</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Unblock</v-list-item-title>
        </v-list-item>
        <v-list-item v-else ripple @click="showDeleteDialog(sheetSelected)">
          <v-list-item-icon>
            <v-icon>fa-ban</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Blokir</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
    <v-dialog v-model="unblockDialog" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">Apakah Anda yakin?</v-card-title>

        <v-card-text>
          Apakah Anda yakin ingin meng-unblock pengguna
          <b v-if="editState != -2">{{ object.username }}</b>
          <b v-else-if="selected[0]">{{ selected[0].username }}, ...</b>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn id="unblockConfirmBtn"
          color="error" text @click="unblockItem" :loading="isLoading">Yakin</v-btn>

          <v-btn color="secondary" text @click="close" :loading="isLoading">Batal</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">Apakah Anda yakin?</v-card-title>

        <v-card-text>
          Apakah Anda yakin ingin menangguhkan pengguna
          <b v-if="editState != -2">{{ object.username }}</b>
          <b v-else-if="selected[0]">{{ selected[0].username }}, ...</b>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn id="deleteConfirmBtn"
          color="error" text @click="deleteItem" :loading="isLoading">Yakin</v-btn>

          <v-btn color="secondary" text @click="close" :loading="isLoading">Batal</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<style>
</style>

<script>
import { mapActions, mapGetters } from 'vuex';
// @ is an alias to /src

export default {
  name: 'AdminUser',
  components: {},
  data() {
    return {
      showDialog: false,
      sheet: false,
      formTitle: 'Pengguna',
      isLoading: false,
      categoryLoading: false,
      deleteDialog: false,
      unblockDialog: false,
      editState: -1,
      object: {},
      sheetSelected: {},
      headers: [
        {
          text: 'Username',
          align: 'start',
          value: 'username',
        },
        {
          text: 'Email',
          value: 'email',
        },
        {
          text: 'Admin',
          value: 'isAdmin',
        }, {
          value: 'isBlocked',
          text: 'Banned',
        },
        {
          text: 'Status',
          value: 'isActive',
        },
        { text: 'Diperbaharui oleh', value: 'updatedBy' },
        { text: 'Diperbaharui tanggal', value: 'updatedDate' },
        {
          text: 'Aksi', value: 'action', sortable: false, align: 'center',
        },
        // { text: 'Iron (%)', value: 'iron' },
        // { text: '', value: 'data-table-expand' },
      ],
      mobileOption: {
        sortBy: 'username',
        filter: '',
        orderBy: 'asc',
        sortableFields: [{
          field: 'username',
          name: 'Nama',
        }, {
          field: 'email',
          name: 'Email',
        }, {
          field: 'isActive',
          name: 'Status',
        }, {
          field: 'isAdmin',
          name: 'Role',
        }],
        itemsPerPage: 10,
        itemsPerPageOption: [10, 15, 25, 50, 100],
      },
      filter: '',
      tableHeight: 400,
      option: { page: 1, itemsPerPage: 10 },
    };
  },
  watch: {
    option() {
      this.pagination(this.option);
    },
  },
  computed: {
    listC() {
      return this.users();
    },
    filteredItem() {
      return this.users()
        .filter(this.$options.filters.dynamicSearch(this.mobileOption.filter))
        .sort(this.mobileOption.orderBy === 'asc' ? this.$options.filters.dynamicSortA(this.mobileOption.sortBy) : this.$options.filters.dynamicSortD(this.mobileOption.sortBy));
    },
    pagingC() {
      return this.paging();
    },
  },
  methods: {
    resize() {
      this.tableHeight = window.innerHeight - 220;
    },
    ...mapActions('users', ['pagination', 'editUser', 'deleteUser', 'unblockUser']),
    ...mapGetters('users', ['users', 'paging']),
    showSheet(item) { this.sheetSelected = item; this.sheet = true; },
    paginationChanged(v) {
      const b = this.option;
      const buf = { ...b };
      buf.page = v;
      this.option = buf;
    },
    pageSizeChanged(v) {
      const b = this.option;
      const buf = { ...b };
      buf.itemsPerPage = v.target.value;
      this.option = buf;
    },
    async close() {
      this.object = { };
      if (this.showDialog) {
        this.$refs.form.resetValidation();
      }
      this.deleteDialog = false;
      this.unblockDialog = false;
      await this.$nextTick();

      this.editState = -1;
    },
    unblockItem() {
      this.isLoading = true;
      this.sheet = false;
      this.unblockUser({ index: this.deleteIndex, data: this.object }).then(() => {
        this.$notify({
          group: 'notif',
          type: 'success',
          title: 'Unblock Pengguna',
          text: 'Berhasil meng-unblock pengguna',
        });
        this.close();
      }).catch(() => {
        this.$notify({
          group: 'notif',
          type: 'error',
          title: 'Unblock Pengguna',
          text: 'Gagal meng-unblock pengguna',
        });
      }).finally(() => {
        this.isLoading = false;
      });
    },
    deleteItem() {
      this.isLoading = true;
      this.sheet = false;
      this.deleteUser({ index: this.deleteIndex, data: this.object }).then(() => {
        this.$notify({
          group: 'notif',
          type: 'success',
          title: 'Blokir Pengguna',
          text: 'Berhasil memblokir pengguna',
        });
        this.close();
      }).catch(() => {
        this.$notify({
          group: 'notif',
          type: 'error',
          title: 'Hapus Pengguna',
          text: 'Gagal memblokir pengguna',
        });
      }).finally(() => {
        this.isLoading = false;
      });
    },
    showDeleteDialog(item) {
      this.deleteIndex = this.listC.indexOf(item);
      this.object = { ...item };
      this.deleteDialog = true;
    },
    showUnblockDialog(item) {
      this.deleteIndex = this.listC.indexOf(item);
      this.object = { ...item };
      this.unblockDialog = true;
    },
  },
  created() {
    if (this.$mq === 'xs') {
      this.pagination(this.option);
    }
  },
};
</script>
