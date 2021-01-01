<template>
  <v-container style="min-height:100%" v-resize="resize" fluid>
    <v-data-table
      :headers="headers"
      :items="filteredItem"
      class="elevation-2 px-2"
      v-if="$mq!=='xs'"
      :items-per-page="mobileOption.itemsPerPage"
      :options.sync="option"
      :height="tableHeight"
      :server-items-length="pagingC.total_item"
      :footer-props="{
        'items-per-page-options': mobileOption.itemsPerPageOption
      }"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Produk</v-toolbar-title>
          <v-btn icon :loading="isLoading" @click="pagination(option)" class="ml-4">
            <v-icon small>fa-sync</v-icon>
          </v-btn>
          <v-text-field
            v-model="filter"
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
          :src="item.photoUrl | serverImg"
          class="border-1 my-2">
        </v-img>
      </template>
      <template v-slot:item.price="{ item }">
        <div>{{item.price | price}}</div>
      </template>
      <template v-slot:item.discount="{ item }">
        <div>
          <v-chip v-if="item.discount" small color="primary">
            <b>{{item.discount }} %</b>
          </v-chip>
          <span v-else>-</span>
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
        <v-icon :id="'edit-'+item.id" small class="mr-2" @click="editItem(item)">
          fa-pencil-alt
        </v-icon>
        <v-icon :id="'delete-'+item.id" small class="mr-2" @click="qrShow(item)">fa-qrcode</v-icon>
        <v-icon :id="'copy-'+item.id" small class="mr-2" @click="copyItem(item)">fa-copy</v-icon>
        <v-icon :id="'delete-'+item.id" small @click="showDeleteDialog(item)">fa-trash-alt</v-icon>
      </template>
    </v-data-table>
    <div v-else class="pb-12">
      <v-app-bar fixed app :color="$vuetify.theme.dark ? '':'white'" flat>
        <v-toolbar-title>Produk</v-toolbar-title>
        <v-spacer></v-spacer>

        <div style="width:100px" class="input-field primary--text ml-2 subtitle-2 mt-1">
          <span class="font-weight-regular">Sort:</span>
          <select v-model="mobileOption.orderBy">
            <option value="asc" selected>a-Z</option>
            <option value="desc" selected>Z-a</option>
          </select>
          <label>
            <v-icon x-small color="primary">fa-arrow-down</v-icon>
          </label>
        </div>
        <div style="width:100px" class="input-field primary--text ml-2 subtitle-2 mt-1">
          <select v-model="mobileOption.sortBy">
            <option
              v-for="(item, idx) in mobileOption.sortableFields"
              :value="item.field"
              :key="idx"
            >{{item.name}}</option>
          </select>
          <label>
            <v-icon x-small color="primary">fa-chevron-down</v-icon>
          </label>
        </div>
      </v-app-bar>
      <v-card
        class="mt-n3 mb-3 ml-n3 border-vertical"
        tile
        outlined
        style="min-width:100vw; position:sticky; top:56px; z-index:2"
      >
        <v-card-text>
          <v-text-field
            v-model="filter"
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
        v-for="item in filteredItem"
        :key="item.id"
        class="px-2 border-2 mb-2"
        ripple
        @click="showSheet(item)"
      >
        <v-row>
          <v-col cols="auto">
            <v-img
              width="86"
              height="86"
              :src="'/products/photo/'+item.id | serverImg"
              class="border-1"
            ></v-img>
          </v-col>
          <v-col align-self="center">
            <div>{{ item.name }}</div>
            <div
              style="font-size:12px"
              class="secondary--text font-weight-regular">
              {{ item.blimartResponse.name }}
            </div>

            <div
              style="font-size:12px"
              class="primary--text font-weight-bold"
            >{{ item.price | price }}</div>
            <div
              style="font-size:12px"
              class="text--secondary"
            >{{ item.category || '--Kategori--' }}</div>
          </v-col>
        </v-row>
      </v-card>
    </div>

    <div
      class="surface"
      style="width:100%;position:fixed; bottom:52px; left:0;border-width:1px;"
      v-if="$mq=='xs'"
    >
      <v-card class="text-center py-2" tile flat outlined>
        <div style="position:absolute;" class="input-field primary--text ml-2 subtitle-2 mt-1">
          <select v-model="mobileOption.itemsPerPage" @change="pageSizeChanged">
            <option
              v-for="(item, index) in mobileOption.itemsPerPageOption"
              :key="index"
              v-bind:value="item"
              selected
            >{{item}}</option>
          </select>
          <label>
            <v-icon x-small color="primary" class="mb-1">fa-chevron-up</v-icon>
          </label>
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
        <v-list-item ripple @click="copyItem(sheetSelected)">
          <v-list-item-icon>
            <v-icon>fa-copy</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Salin</v-list-item-title>
        </v-list-item>
        <v-list-item ripple @click="qrShow(sheetSelected)">
          <v-list-item-icon>
            <v-icon>fa-qrcode</v-icon>
          </v-list-item-icon>
          <v-list-item-title>QR Code</v-list-item-title>
        </v-list-item>
        <v-list-item ripple @click="showDeleteDialog(sheetSelected)">
          <v-list-item-icon>
            <v-icon>fa-trash</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Hapus</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
    <v-btn
      id="addBtn"
      fab
      large
      bottom
      color="error"
      fixed
      right
      style="margin-bottom: 64px"
      @click="showDialog=true"
    >
      <v-icon>fa-plus</v-icon>
    </v-btn>
    <v-dialog v-model="qrDialog" max-width="310">
      <v-card>
        <v-card-title>
          QR Code
          <v-spacer></v-spacer>
          <v-btn icon @click="qrDialog = false">
            <v-icon>fa-times</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <VueQRCodeComponent v-if="object.id" class="mt-4" :text="object.id" ></VueQRCodeComponent>
        </v-card-text>
      </v-card>
    </v-dialog>

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
              <strong>{{ key }}</strong>
              <span v-for="(i, idx) in item" :key="idx">{{i}},</span>
            </v-alert>
            <v-file-input
              v-model="selectedImage"
              accept="image/png, image/jpeg"
              placeholder="Upload gambar"
              prepend-icon="fa-camera"
              :rules="rules.photo"
              label="Gambar"
              dense
              class="mt-4"
            >
              <template v-slot:append-outer>
                <v-avatar tile size="84" class="mt-n6">
                  <v-img :src="photoUrlComputed" alt="Gambar Produk" />
                </v-avatar>
              </template>
            </v-file-input>
            <v-text-field
              v-model="object.name"
              outlined
              :rules="rules.name"
              dense
              label="Produk"
              class
              style
            ></v-text-field>
            <v-autocomplete
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
            ></v-autocomplete>
            <v-autocomplete
              v-model="object.retail"
              :items="retailsC"
              :loading="retailLoading"
              :rules="rules.retail"
              validate-on-blur
              no-data-text="Retail tidak ditemukan"
              item-text="name"
              return-object
              label="Retail"
              dense
              outlined
            ></v-autocomplete>
            <v-text-field
              v-model="object.price"
              outlined
              :rules="rules.price"
              dense
              ref="priceAdd"
              label="Harga"
              class="mt-2"
              prefix="Rp."
              suffix="00,-"
              style
            ></v-text-field>
            <v-text-field
              v-model="object.discount"
              outlined
              :rules="rules.discount"
              dense
              ref="priceAdd"
              label="Diskon"
              class="mt-2"
              suffix="%"
              style
            ></v-text-field>
            <v-text-field
              v-model="object.stock"
              outlined
              :rules="rules.stock"
              dense
              label="Stok"
              class
            ></v-text-field>
            <v-text-field
              v-model="object.variant"
              outlined
              :rules="rules.variant"
              dense
              label="Varian"
              class
              style
            ></v-text-field>

            <v-row>
              <v-col>
                <v-autocomplete
                  v-model="object.mark1"
                  :items="marksC"
                  :loading="markLoading"
                  :rules="rules.mark1"
                  validate-on-blur
                  no-data-text="Mark tidak ditemukan"
                  item-text="name"
                  item-value="name"
                  label="Mark 1"
                  dense
                  outlined
                ></v-autocomplete>
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="object.mark2"
                  :items="marksC"
                  :loading="markLoading"
                  :rules="rules.mark2"
                  validate-on-blur
                  no-data-text="Mark tidak ditemukan"
                  item-text="name"
                  item-value="name"
                  label="Mark 2"
                  dense
                  outlined
                ></v-autocomplete>
              </v-col>
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
              id="save"
              color="secondary"
              :disabled="!valid"
              @click="save"
              :loading="isLoading"
              type="submit"
            >Simpan</v-btn>
            <v-btn color="secondary" outlined @click="close" :loading="isLoading" style>
              Batal
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-dialog v-model="deleteDialog" max-width="500" persistent>
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
            :loading="isLoading"
          >Yakin</v-btn>

          <v-btn color="secondary" text @click="close" :loading="isLoading">Batal</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="copyDialog" max-width="450" persistent>
      <v-form v-model="valid2" ref="form2" @submit.prevent="validate2">
        <v-card>
          <v-card-title class="headline">Menyalin Produk</v-card-title>

          <v-card-text>
            Produk yang disalin:
            <br />
            <v-card outlined>
              <v-row>
                <v-col cols="auto" class="pl-6">
                  <v-img width="86" height="86" :src="'/products/photo/'+object.id | serverImg">
                  </v-img>
                </v-col>

                <v-col class="pa-0" align-self="center">
                  <v-row class="ml-0">
                    <v-col cols="12" md="8" style="font-size:14px" class="font-weight-bold">
                      <div>
                        <router-link
                          :to="'/product/'+object.id"
                          class="onSurface--text"
                          style="text-decoration:none"
                        >{{ object.name }}</router-link>
                      </div>

                      <div
                        style="font-size:12px"
                        class="primary--text font-weight-bold"
                      >{{ object.variant }}</div>
                      <div style="font-size:12px" class="text--secondary">
                        {{ object.category.name }}
                      </div>
                      <div
                        cols="auto"
                        md="12"
                        class="pa-0 error--text"
                        align-self="center"
                      >{{object.price | price}}</div>
                    </v-col>
                  </v-row>
                </v-col>
                <v-spacer></v-spacer>
              </v-row>
            </v-card>
            <br />

            <v-autocomplete
              v-model="object.retail"
              :items="retailsC"
              :loading="retailLoading"
              :rules="rules.retailCopy"
              validate-on-blur
              no-data-text="Retail tidak ditemukan"
              item-text="name"
              return-object
              label="Retail Tujuan"
              dense
              outlined
            ></v-autocomplete>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn :disabled="!valid2" color="error" text @click="copyAction">Yakin</v-btn>

            <v-btn color="secondary" text @click="close">Batal</v-btn>
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
import axios from 'axios';
// eslint-disable-next-line import/extensions
import VueQRCodeComponent from 'vue-qr-generator';

export default {
  name: 'AdminProduct',
  components: { VueQRCodeComponent },
  data() {
    return {
      showDialog: false,
      deleteDialog: false,
      sheet: false,
      formTitle: 'Produk',
      valid: false,
      valid2: false,
      sheetSelected: null,
      qrDialog: false,
      filter: '',
      copyDialog: false,
      rules: {
        name: [v => !!v || 'Nama tidak boleh kosong'],
        mark1: [v => !!v || 'Mark 1 tidak boleh kosong'],
        mark2: [v => !!v || 'Mark 2 tidak boleh kosong'],
        category: [v => !!v || 'Kategori tidak boleh kosong'],
        retail: [v => !!v || 'Retail tidak boleh kosong'],
        retailCopy: [
          v => !!v || 'Retail tidak boleh kosong',
          v => (!!v && v.id !== this.object.blimartResponse.id)
            || 'Retail tujuan tidak boleh sama dengan retail asal',
        ],
        price: [
          v => !!v || 'Harga tidak boleh kosong',
          v => parseFloat(v, 10) > 0 || 'Harga harus lebih dari 0',
        ],
        discount: [
          v => !!v || 'Diskon tidak boleh kosong',
          v => parseFloat(v, 10) >= 0 || 'Diskon harus lebih dari sama dengan 0',
          v => parseFloat(v, 10) < 100 || 'Diskon harus kurang dari 100',
        ],
        stock: [
          v => !!v || 'Stock tidak boleh kosong',
          v => parseInt(v, 10) >= 0 || 'Stock tidak boleh negatif',
        ],
        variant: [v => !!v || 'Varian tidak boleh kosong'],
        photo: [
          () => {
            if (!(this.object.photoUrl || this.selectedImage)) {
              return 'Gambar tidak boleh kosong';
            }
            return true;
          },
        ],
      },
      errors: {},
      isLoading: false,
      categoryLoading: false,
      getRetailLoading: false,
      markLoading: false,
      editState: -1,
      object: { category: {} },
      selectedImage: null,
      headers: [
        { text: 'Gambar', value: 'photoUrl' },
        {
          text: 'Nama',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Harga',
          value: 'price',
        },
        {
          text: 'Diskon',
          value: 'discount',
        },
        {
          text: 'Retail',
          value: 'blimartResponse.name',
        },
        {
          text: 'Kategori',
          value: 'category',
        },
        {
          text: 'Varian',
          value: 'variant',
        },
        {
          text: 'Stok',
          value: 'stock',
        },
        { text: 'Diperbaharui oleh', value: 'updatedBy' },
        { text: 'Diperbaharui tanggal', value: 'updatedDate' },
        {
          text: 'Aksi',
          value: 'action',
          sortable: false,
          align: 'center',
        },
        // { text: 'Iron (%)', value: 'iron' },
        // { text: '', value: 'data-table-expand' },
      ],
      mobileOption: {
        sortBy: 'name',
        filter: '',
        orderBy: 'asc',
        sortableFields: [
          {
            field: 'name',
            name: 'Nama',
          },
          {
            field: 'price',
            name: 'Harga',
          },
          {
            field: 'category',
            name: 'Kategori',
          },
        ],
        itemsPerPage: 10,
        itemsPerPageOption: [5, 10, 15, 25, 50, 100],
      },
      tableHeight: 400,
      option: { page: 1, itemsPerPage: 10 },
    };
  },
  watch: {
    option(v) {
      this.pagination(v);
    },
  },
  computed: {
    listC() {
      return this.products();
    },
    marksC() {
      return this.marks();
    },
    filteredItem() {
      return this.products()
        .filter(this.$options.filters.dynamicSearch(this.filter))
        .sort(this.mobileOption.orderBy === 'asc' ? this.$options.filters.dynamicSortA(this.mobileOption.sortBy) : this.$options.filters.dynamicSortD(this.mobileOption.sortBy));
    },
    categoriesC() {
      return this.categories();
    },
    retailsC() {
      return this.retails();
    },
    photoUrlComputed() {
      if (this.selectedImage) {
        return URL.createObjectURL(this.selectedImage);
      }
      if (typeof this.object.photoUrl === 'string') {
        return this.$options.filters.serverImg(
          `/products/photo/${this.object.id}`,
        );
      }
      // eslint-disable-next-line global-require
      return require('../assets/img-placeholder.png');
    },
    pagingC() {
      return this.paging();
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
    ...mapActions('products', [
      'pagination',
      'addProduct',
      'editProduct',
      'deleteProduct',
      'uploadPicture',
    ]),
    ...mapGetters('products', ['products', 'paging']),
    ...mapActions('categories', ['getCategories']),
    ...mapGetters('categories', ['categories']),
    ...mapActions('retails', ['getRetails']),
    ...mapGetters('retails', ['retails']),
    ...mapActions('ar', ['getMarks']),
    ...mapGetters('ar', ['marks']),
    showSheet(item) {
      this.sheetSelected = item;
      this.sheet = true;
    },
    close() {
      this.object = { category: {} };
      if (this.showDialog) {
        this.$refs.form.resetValidation();
      } else if (this.copyDialog) {
        this.$refs.form2.resetValidation();
      }
      this.showDialog = false;
      this.deleteDialog = false;
      this.selectedImage = null;
      this.copyDialog = false;
      this.errors = {};
      setTimeout(() => {
        this.editState = -1;
      }, 200);
    },
    deleteItem() {
      this.isLoading = true;
      this.sheet = false;
      this.deleteProduct({ index: this.deleteIndex, data: this.object })
        .then(() => {
          this.$notify({
            group: 'notif',
            type: 'success',
            title: 'Hapus Item',
            text: 'Berhasil menghapus produk',
          });
          this.close();
        })
        .catch(() => {
          this.$notify({
            group: 'notif',
            type: 'success',
            title: 'Hapus Item',
            text: 'Berhasil menghapus produk',
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

      // eslint-disable-next-line no-restricted-syntax
      for (let i = 0; i < this.categoriesC.length; i += 1) {
        if (this.categoriesC[i].name === this.object.category) {
          this.object.category = this.categoriesC[i];
          break;
        }
      }
      // eslint-disable-next-line no-restricted-syntax
      for (let i = 0; i < this.retailsC.length; i += 1) {
        if (this.retailsC[i].name === this.object.blimartResponse.name) {
          this.object.retail = this.retailsC[i];
          break;
        }
      }
      this.showDialog = true;
      setTimeout(() => {
        this.$refs.form.resetValidation();
      }, 300);
    },
    copyItem(item) {
      this.sheet = false;
      this.object = { ...item };

      // eslint-disable-next-line no-restricted-syntax
      for (let i = 0; i < this.categoriesC.length; i += 1) {
        if (this.categoriesC[i].name === this.object.category) {
          this.object.category = this.categoriesC[i];
          break;
        }
      }
      this.copyDialog = true;
    },
    qrShow(item) {
      this.sheet = false;
      this.object = { ...item };

      this.qrDialog = true;
    },
    copyAction() {
      this.editState = -1;
      axios
        .get(this.$options.filters.serverImg(this.object.photoUrl), {
          responseType: 'arraybuffer',
        })
        .then((response) => {
          this.selectedImage = this.blobToFile(
            new Blob([response.data]),
            'photo.png',
          );
          this.save();
          // const url = window.URL.createObjectURL(new Blob([response.data]));
        })
        .catch(error => console.log(error));
    },
    blobToFile(theBlob, fileName) {
      // A Blob() is almost a File() - it's just missing the two properties below which we will add
      const buf = theBlob;
      buf.lastModifiedDate = new Date();
      buf.name = fileName;
      return buf;
    },
    showDeleteDialog(item) {
      this.deleteIndex = this.listC.indexOf(item);
      this.object = { ...item };
      this.deleteDialog = true;
    },
    save() {
      if (
        (this.showDialog && this.validate())
        || (this.copyDialog && this.validate2())
      ) {
        this.isLoading = true;

        if (this.editState >= 0) {
          this.editProduct({ index: this.editState, data: this.object })
            .then(() => {
              if (this.selectedImage != null) {
                this.uploadPicture({
                  index: this.editState,
                  id: this.object.id,
                  img: this.selectedImage,
                })
                  .then((r) => {
                    if (r.data.code === 200) {
                      this.$notify({
                        group: 'notif',
                        type: 'success',
                        title: 'Tambah Item',
                        text: 'Berhasil mengubah produk',
                      });
                      this.close();
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    this.errors = { foto: ['Gagal mengupload gambar.'] };
                  })
                  .finally(() => {
                    this.isLoading = false;
                  });
              } else {
                this.$notify({
                  group: 'notif',
                  type: 'success',
                  title: 'Tambah Item',
                  text: 'Berhasil mengubah produk',
                });
                this.close();
                this.isLoading = false;
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
                title: 'Tambah Item',
                text: 'Gagal mengubah produk',
              });
              this.isLoading = false;
            });
        } else {
          this.addProduct(this.object)
            .then((res) => {
              if (this.selectedImage != null) {
                this.uploadPicture({
                  index: 0,
                  id: res.data.data.id,
                  img: this.selectedImage,
                })
                  .then((r) => {
                    if (r.data.code === 200) {
                      this.$notify({
                        group: 'notif',
                        type: 'success',
                        title: 'Ubah Item',
                        text: 'Berhasil menambah produk',
                      });
                      this.close();
                    }
                  })
                  .catch(() => {
                    this.errors = { foto: ['Gagal mengupload gambar.'] };
                  })
                  .finally(() => {
                    this.isLoading = false;
                  });
              } else {
                this.$notify({
                  group: 'notif',
                  type: 'success',
                  title: 'Ubah Item',
                  text: 'Berhasil menambah produk',
                });
                this.close();
                this.isLoading = false;
              }
            })
            .catch((err) => {
              const { data } = err.response;
              if (data.code >= 400 && data.code < 500) {
                this.errors = data.errors;
              }
              this.$notify({
                group: 'notif',
                type: 'error',
                title: 'Ubah Item',
                text: 'Gagal menambah produk',
              });
              this.isLoading = false;
            });
        }
      }
    },
    validate() {
      return this.$refs.form.validate();
    },
    validate2() {
      return this.$refs.form2.validate();
    },
  },
  created() {
    this.categoryLoading = true;
    this.retailLoading = true;
    this.markLoading = true;
    this.getCategories().finally(() => {
      this.categoryLoading = false;
    });
    this.getRetails().finally(() => {
      this.retailLoading = false;
    });

    this.getMarks().finally(() => {
      this.markLoading = false;
    });
    if (this.$mq === 'xs') {
      this.pagination(this.option);
    }
  },
};
</script>
