<template>
  <v-container style="min-height:100%" v-resize="resize" fluid>
    <v-data-table
      :headers="headers"
      :items="filteredItem"
      class="elevation-2 px-2"
      :height="tableHeight"
      v-if="$mq!=='xs'"
      :footer-props="{
        'items-per-page-options': mobileOption.itemsPerPageOption
      }"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Mark AR</v-toolbar-title>
          <v-btn icon :loading="isLoading" @click="getMarks()" class="ml-4">
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
      <template v-slot:item.photoUrl="{ item }">

        <v-img
          width="86"
          height="86"
          :src="item.path + '.png'"
          class="border-1 my-2"
        ></v-img>
      </template>
      <template v-slot:item.price="{ item }">
        <div>
          {{item.price | price}}
        </div>
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
        <v-icon
          :id="'edit-'+item.id"
          small
          class="mr-2"
          @click="editItem(item)">fa-pencil-alt
        </v-icon>
        <v-icon
          :id="'delete-'+item.id"
          small @click="showDeleteDialog(item)">fa-trash-alt</v-icon>
      </template>
    </v-data-table>
    <div v-else class="pb-12">

      <v-app-bar fixed app :color="$vuetify.theme.dark ? '':'white'" flat>

        <v-toolbar-title >Mark AR</v-toolbar-title>
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
        :id="'card-'+item.id"
        v-for="item in filteredItem" :key="item.id" class="px-2 border-2 mb-2"
        ripple @click="showSheet(item)">
        <v-row>
          <v-col cols="auto">
            <v-img
              width="86"
              height="86"
              :src="item.path + '.png'"
              class="border-1"
            ></v-img>
          </v-col>
          <v-col align-self="center">
            <div>{{ item.name }}</div>
            <div style="font-size:12px" class="text--secondary">
              {{ item.path || '--Kategori--' }}
            </div>

            <div style="font-size:12px" class="primary--text font-weight-bold">
              Dibuat: {{ item.createdDate | date }}
            </div>
          </v-col>
        </v-row>
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
      @click="showDialog=true">
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
              label="Nama"
              class
              style
            ></v-text-field>
            <!-- <v-autocomplete
              v-model="object.category"
              :items="categoriesC"
              :loading="categoryLoading"
              :rules="rules.category"
              validate-on-blur
              no-data-text="Kategori tidak ditemukan"
              item-text="name"
              return-object
              label="Kategori"
              dense
              outlined
            ></v-autocomplete> -->
            <v-text-field
              v-model="object.path"
              outlined
              :rules="rules.path"
              dense
              label="Path"
              class
            >
            </v-text-field>
            <label >Koordinat</label>
            <v-row>
              <v-col>
            <v-text-field
              v-model="object.x"
              outlined
              :rules="rules.x"
              dense
              label="X"
              class
              style
            ></v-text-field></v-col>
              <v-col>
            <v-text-field
              v-model="object.y"
              outlined
              :rules="rules.y"
              dense
              label="Y"
              class
              style
            ></v-text-field></v-col>
            </v-row>
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

          <v-btn
            id="deleteConfirmBtn"
            color="error"
            text
            @click="deleteItem"
            :loading="isLoading">Yakin</v-btn>

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
  name: 'Experiment',
  components: {},
  data() {
    return {
      showDialog: false,
      deleteDialog: false,
      sheet: false,
      formTitle: 'Mark AR',
      valid: false,
      sheetSelected: null,
      rules: {
        name: [v => !!v || 'Nama tidak boleh kosong'],
        path: [v => !!v || 'Path tidak boleh kosong'],
        x: [v => !!v || 'X tidak boleh kosong'],
        y: [v => !!v || 'Y tidak boleh kosong'],
      },
      errors: {},
      isLoading: false,
      categoryLoading: false,
      editState: -1,
      object: {},
      selectedImage: null,
      headers: [
        { text: 'Gambar', value: 'photoUrl' },
        {
          text: 'Nama',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Path',
          value: 'path',
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
          field: 'path',
          name: 'Path',
        }],
        itemsPerPage: 10,
        itemsPerPageOption: [10, 15, 25, 50, 100],
      },
      tableHeight: 400,
      option: { page: 1, itemsPerPage: 10 },
    };
  },
  watch: {
  },
  computed: {
    listC() {
      return this.marks();
    },
    filteredItem() {
      return this.marks()
        .filter(this.$options.filters.dynamicSearch(this.mobileOption.filter))
        .sort(this.mobileOption.orderBy === 'asc' ? this.$options.filters.dynamicSortA(this.mobileOption.sortBy) : this.$options.filters.dynamicSortD(this.mobileOption.sortBy));
    },
  },
  methods: {
    resize() {
      this.tableHeight = window.innerHeight - 220;
    },
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
    ...mapActions('ar', ['addMark', 'getMarks', 'editMark', 'deleteMark']),
    ...mapGetters('ar', ['marks']),
    showSheet(item) { this.sheetSelected = item; this.sheet = true; },
    async close() {
      this.object = {};
      if (this.showDialog) {
        this.$refs.form.resetValidation();
      }
      this.showDialog = false;
      this.deleteDialog = false;
      this.supplierSearch = null;
      this.selectedImage = null;
      this.errors = {};
      await this.$nextTick();

      this.editState = -1;
    },
    deleteItem() {
      this.isLoading = true;
      this.sheet = false;
      this.deleteMark({ index: this.deleteIndex, data: this.object })
        .then(() => {
          this.$notify({
            group: 'notif',
            type: 'success',
            title: 'Hapus Mark',
            text: 'Berhasil menghapus mark',
          });
          this.close();
        }).catch(() => {
          this.$notify({
            group: 'notif',
            type: 'error',
            title: 'Hapus Mark',
            text: 'Gagal menghapus mark',
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    editItem(item) {
      this.sheet = false;
      this.editState = this.listC.indexOf(item);
      this.object = { ...item };

      this.showDialog = true;
    },
    showDeleteDialog(item) {
      this.deleteIndex = this.listC.indexOf(item);
      this.object = { ...item };
      this.deleteDialog = true;
    },
    save() {
      if (this.validate()) {
        this.isLoading = true;

        if (this.editState >= 0) {
          this.editMark({ index: this.editState, data: this.object }).then((res) => {
            if (res.data.code === 200) {
              this.$notify({
                group: 'notif',
                type: 'success',
                title: 'Tambah Mark',
                text: 'Berhasil menambah mark',
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
                title: 'Ubah Mark',
                text: 'Gagal mengubah mark',
              });
              this.isLoading = false;
            }).finally(() => {
              this.isLoading = false;
            });
        } else {
          this.addMark(this.object)
            .then((res) => {
              if (res.data.code === 200) {
                this.$notify({
                  group: 'notif',
                  type: 'success',
                  title: 'Tambah Mark',
                  text: 'Berhasil menambah mark',
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
                title: 'Tambah Mark',
                text: 'Gagal menambah mark',
              });
            }).finally(() => {
              this.isLoading = false;
            });
        }
      }
    },
    validate() {
      return this.$refs.form.validate();
    },
  },
  created() {
    this.getMarks();
  },
};
</script>
