<template>
  <v-container style="min-height:100%" v-resize="resize" fluid>
    <v-data-table
      :headers="headers"
      :items="filteredItem"
      :search="mobileOption.filter"
      class="elevation-2 px-2"
      :height="tableHeight"
      v-if="$mq!=='xs'"
      :items-per-page="mobileOption.itemsPerPage"
      :server-items-length="pagingC.total_item"
      :options.sync="option"
      :footer-props="{
        'items-per-page-options': [10, 15, 25, 50, 100]
      }"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Supplier</v-toolbar-title>
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
      <template v-slot:item.action="{ item }">
        <v-icon :id="'edit-'+item.id" small class="mr-2" @click="editItem(item)">
          fa-pencil-alt
        </v-icon>
        <v-icon :id="'delete-'+item.id" small @click="showDeleteDialog(item)">fa-trash-alt</v-icon>
      </template>
    </v-data-table>
    <div v-else>

      <v-app-bar fixed app :color="$vuetify.theme.dark ? '':'white'" flat>

        <v-toolbar-title >Supplier</v-toolbar-title>
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
        :id="'card-'+supplier.id"
        v-for="supplier in filteredItem"
        :key="supplier.id"
        elevation="5"
        ripple
        class="pa-2 mb-3"
        @click="showSheet(supplier)">
        <v-card-title>

          <span class="font-weight-bold">{{supplier.name}}</span>
        </v-card-title>
        <v-card-subtitle>


          <div style="font-size:12px" class="primary--text font-weight-bold">
            {{ supplier.email }}
          </div>
          <div style="font-size:12px" class="text--secondary">
            {{ supplier.phone }}
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
        <v-list-item ripple @click="editItem(sheetSelected)">
          <v-list-item-icon>
            <v-icon>fa-pen</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Ubah</v-list-item-title>
        </v-list-item>
        <v-list-item ripple @click="showDeleteDialog(sheetSelected)">
          <v-list-item-icon>
            <v-icon>fa-trash</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Hapus</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
    <v-btn id="addBtn" fab large bottom color="error" fixed right style="margin-bottom: 64px"
      @click="addProductPrompt">
      <v-icon>fa-plus</v-icon>
    </v-btn>

    <v-dialog v-model="showDialog" max-width="500px" persistent>
      <v-form v-model="valid" ref="form" @submit.prevent="validate">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text class="pt-4">
             <v-alert
              dense
              outlined
              v-for="(item, key, index) in errors"
              type="error"
              dismissible
              :key="index"
            >
              <strong>{{ key }}</strong> <span v-for="(i, idx) in item" :key="idx">{{i}}, </span>
            </v-alert>
            <v-text-field
              v-model="object.name"
              outlined
              :rules="rules.name"
              dense
              label="Nama Supplier"
              class
              style
            ></v-text-field>
            <v-text-field
              v-model="object.email"
              outlined
              :rules="rules.email"
              dense
              label="Email Supplier"
              class
              style
            ></v-text-field>
            <v-text-field
              v-model="object.phone"
              outlined
              :rules="rules.phone"
              dense
              label="No Telepon Supplier"
              class
              style
            ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions class="px-4 py-2">
            <div v-if="editState >= 0">
              <v-icon small>fa-clock</v-icon>
              <span class="ml-2 caption">
                <span class="text--secondary">Dibuat:</span>
                <span class="font-weight-bold">{{ object.createdDate | date }}</span>
                - {{ object.createdBy }}
              </span>
            </div>
            <v-spacer></v-spacer>
            <v-btn
              color="secondary"
              :disabled="!valid"
              @click="save"
              :loading="isLoading"
              type="submit"
            >Simpan</v-btn>
            <v-btn
              color="secondary"
              outlined
              @click="close"
              :loading="isLoading"
              style
            >Batal</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-dialog v-model="deleteDialog" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">Apakah Anda yakin?</v-card-title>

        <v-card-text>
          Apakah Anda yakin ingin menghapus item
          <b v-if="editState != -2">{{ object.name }}</b>
          <b v-else-if="selected[0]">{{ selected[0].name }}, ...</b>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn id="deleteConfirmBtn" color="error" text @click="deleteItem" :loading="isLoading">
            Yakin
          </v-btn>

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
  name: 'AdminSupplier',
  components: {},
  data() {
    return {
      showDialog: false,
      sheet: false,
      formTitle: 'Supplier',
      valid: false,
      rules: {
        name: [v => !!v || 'Nama tidak boleh kosong'],
        email: [v => !!v || 'Email tidak boleh kosong', v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email tidak benar'],
        phone: [v => !!v || 'Telepon tidak boleh kosong'],
      },
      isLoading: false,
      categoryLoading: false,
      deleteDialog: false,
      editState: -1,
      object: {},
      errors: [],
      sheetSelected: {},
      headers: [
        {
          text: 'Nama',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Email',
          value: 'email',
        },
        {
          text: 'Telepon',
          value: 'phone',
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
        sortBy: 'name',
        filter: '',
        orderBy: 'asc',
        sortableFields: [{
          field: 'name',
          name: 'Nama',
        }, {
          field: 'email',
          name: 'Email',
        }, {
          field: 'phone',
          name: 'Telepon',
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
      return this.suppliers();
    },
    totalItemC() {
      return this.listC.length;
    },
    filteredItem() {
      return this.suppliers()
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
    ...mapActions('suppliers', ['pagination', 'addSupplier', 'editSupplier', 'deleteSupplier']),
    ...mapGetters('suppliers', ['suppliers', 'paging']),
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
    close() {
      this.object = { };
      if (this.showDialog) {
        this.$refs.form.resetValidation();
      }
      this.showDialog = false;
      this.deleteDialog = false;
      this.supplierSearch = null;
      this.errors = [];
      this.selectedImage = null;
      setTimeout(() => {
        this.editState = -1;
      }, 300);
    },
    editItem(item) {
      this.sheet = false;
      this.editState = this.listC.indexOf(item);
      this.object = { ...item };
      this.showDialog = true;
    },
    save() {
      this.isLoading = true;
      if (this.validate()) {
        if (this.editState >= 0) {
          this.editSupplier({ index: this.editState, data: this.object }).then((res) => {
            if (res.data.code === 200) {
              this.$notify({
                group: 'notif',
                type: 'success',
                title: 'Tambah Supplier',
                text: 'Berhasil mengubah supplier',
              });
              this.close();
            }
          })
            .catch((err) => {
              const { data } = err.response;
              if (data.code === 400) {
                this.errors = data.errors;
              }
              this.$notify({
                group: 'notif',
                type: 'error',
                title: 'Tambah Supplier',
                text: 'Gagal menambah supplier',
              });
              this.isLoading = false;
            })
            .finally(() => {
              this.isLoading = false;
            });
        } else {
          this.addSupplier(this.object).then(() => {
            this.close();
            this.$notify({
              group: 'notif',
              type: 'success',
              title: 'Ubah Supplier',
              text: 'Berhasil mengubah supplier',
            });
          })
            .catch((err) => {
              const { data } = err.response;
              if (data.code === 400) {
                this.errors = data.errors;
              }
              this.$notify({
                group: 'notif',
                type: 'error',
                title: 'Ubah Supplier',
                text: 'Gagal mengubah supplier',
              });
              this.isLoading = false;
            })
            .finally(() => {
              this.isLoading = false;
            });
        }
      }
    },
    deleteItem() {
      this.isLoading = true;
      this.sheet = false;
      this.deleteSupplier({ index: this.deleteIndex, data: this.object }).then(() => {
        this.$notify({
          group: 'notif',
          type: 'success',
          title: 'Hapus Supplier',
          text: 'Berhasil menghapus supplier',
        });
        this.close();
      }).catch(() => {
        this.$notify({
          group: 'notif',
          type: 'error',
          title: 'Hapus Supplier',
          text: 'Gagal menghapus supplier',
        });
      }).finally(() => {
        this.isLoading = false;
      });
    },
    addProductPrompt() {
      this.object = {};
      this.editState = -1;
      this.showDialog = true;
    },
    showDeleteDialog(item) {
      this.deleteIndex = this.listC.indexOf(item);
      this.object = { ...item };
      this.deleteDialog = true;
    },
    validate() {
      return this.$refs.form.validate();
    },
  },
  created() {
    if (this.$mq === 'xs') {
      this.pagination(this.option);
    }
  },
};
</script>
