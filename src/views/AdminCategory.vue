<template>
  <v-container style="min-height:100%" v-resize="resize" fluid>
    <v-data-table
      :headers="headers"
      :items="listC"
      class="elevation-2 px-2"
      :height="tableHeight"
      v-if="$mq!=='xs'"
      :options.sync="option"
      :footer-props="{
        'items-per-page-options': [-1]
      }"
      :items-per-page="100"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Kategori</v-toolbar-title>
          <v-btn icon :loading="isLoading" @click="getCategories()" class="ml-4">
            <v-icon small>fa-sync</v-icon>
          </v-btn>

          <v-spacer></v-spacer>
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
      <template v-slot:item.createdDate="{ item }">
        <div class="py-2">
          <div>
            <v-icon small>far fa-clock</v-icon>
            <span class="mx-2 font-weight-normal">{{ item.createdDate | time}}</span>
            <b class="font-weight-black">WIB</b>
          </div>
          <div class="font-weight-medium grey--text caption">{{ item.createdDate | date}}</div>
        </div>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon :id="'edit-'+item.id" small class="mr-2" @click="editItem(item)">
          fa-pencil-alt
        </v-icon>
      </template>
    </v-data-table>
    <div v-else>

      <v-app-bar fixed app :color="$vuetify.theme.dark ? '':'white'" flat>

        <v-toolbar-title >Kategori</v-toolbar-title>

      </v-app-bar>

      <v-card
        :id="'card-'+category.id"
        v-for="category in listC"
        :key="category.id"
        elevation="5"
        ripple
        class="pa-2 mb-3"
        @click="showSheet(category)">
          <v-avatar color="red">
              <span class="white--text headline">{{ category.name | initial }}</span>
          </v-avatar>
          <span class="ml-4 sub-title-2 font-weight-bold">{{category.name}}</span>
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
      </v-list>
    </v-bottom-sheet>
    <v-btn
      id="addBtn"
      fab large bottom color="error" fixed right style="margin-bottom: 64px"
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
              label="Nama Kategori"
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
  </v-container>
</template>
<style>
</style>

<script>
import { mapActions, mapGetters } from 'vuex';
// @ is an alias to /src

export default {
  name: 'AdminCategory',
  components: {},
  data() {
    return {
      showDialog: false,
      sheet: false,
      formTitle: 'Kategori',
      valid: false,
      rules: {
        name: [v => !!v || 'Nama tidak boleh kosong'],

      },
      isLoading: false,
      categoryLoading: false,
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
        { text: 'Diperbaharui oleh', value: 'updatedBy' },
        { text: 'Diperbaharui tanggal', value: 'updatedDate' },
        { text: 'Dibuat oleh', value: 'createdBy' },
        { text: 'Dibuat tanggal', value: 'createdDate' },
        {
          text: 'Aksi', value: 'action', sortable: false, align: 'center',
        },
        // { text: 'Iron (%)', value: 'iron' },
        // { text: '', value: 'data-table-expand' },
      ],
      filter: '',
      tableHeight: 400,
      option: {},
    };
  },
  watch: {
    option() {
      this.getCategories();
    },
  },
  computed: {
    listC() {
      return this.categories();
    },
  },
  methods: {
    resize() {
      this.tableHeight = window.innerHeight - 220;
    },
    ...mapActions('categories', ['getCategories', 'addCategory', 'editCategory']),
    ...mapGetters('categories', ['categories']),
    showSheet(item) { this.sheetSelected = item; this.sheet = true; },
    async close() {
      this.object = { category: {} };
      if (this.showDialog) {
        this.$refs.form.resetValidation();
      }
      this.showDialog = false;
      this.supplierSearch = null;
      this.selectedImage = null;
      this.errors = [];

      await this.$nextTick();
      this.editState = -1;
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
          this.editCategory({ index: this.editState, data: this.object }).then(() => {
            this.$notify({
              group: 'notif',
              type: 'success',
              title: 'Tambah Kategori',
              text: 'Berhasil mengubah kategori',
            });
            this.close();
          })
            .catch((err) => {
              if (err.response && err.response.data.code === 400) {
                const { data } = err.response;
                this.errors = data.errors;
              }
              this.$notify({
                group: 'notif',
                type: 'error',
                title: 'Tambah Kategori',
                text: 'Gagal menambah kategori',
              });
              this.isLoading = false;
            })
            .finally(() => {
              this.isLoading = false;
            });
        } else {
          this.addCategory(this.object).then(() => {
            this.close();
            this.$notify({
              group: 'notif',
              type: 'success',
              title: 'Ubah Kategori',
              text: 'Berhasil mengubah kategori',
            });
          })
            .catch((err) => {
              if (err.response && err.response.data.code === 400) {
                const { data } = err.response;
                this.errors = data.errors;
              }
              this.$notify({
                group: 'notif',
                type: 'error',
                title: 'Ubah Kategori',
                text: 'Gagal mengubah kategori',
              });
              this.isLoading = false;
            })
            .finally(() => {
              this.isLoading = false;
            });
        }
      }
    },
    addProductPrompt() {
      this.object = {};
      this.editState = -1;
      this.showDialog = true;
    },
    validate() {
      return this.$refs.form.validate();
    },
  },
  created() {
    if (this.$mq === 'xs') {
      this.getCategories();
    }
  },
};
</script>
