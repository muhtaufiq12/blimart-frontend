<template>
  <v-container style="min-height:100%" v-resize="resize" fluid>
    <v-data-table
      :headers="headers"
      :items="listC"
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
          <v-toolbar-title>Pengadaan</v-toolbar-title>
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
    </v-data-table>
    <div v-else>

      <v-app-bar fixed app :color="$vuetify.theme.dark ? '':'white'" flat>

        <v-toolbar-title >Pengadaan</v-toolbar-title>
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
        :id="'card-'+supply.id"
        v-for="supply in filteredItem"
        :key="supply.id"
        elevation="5"
        ripple
        class="pa-2 mb-3">
        <v-card-title>

          <span class="font-weight-bold">{{supply.productName}}</span>
        </v-card-title>
        <v-card-subtitle>


          <div style="font-size:14px" class="primary--text font-weight-bold">
            {{ supply.id }}
          </div>
          <div style="font-size:14px" class="font-weight-medium text--primary">
            {{ supply.productResponse.name }}
          </div>
          <div style="font-size:12px" class="text--secondary">
            {{ supply.supplierResponse.name }}
          </div>
          <div style="font-size:12px" class="text--primary error--text">
            <b>{{ supply.qty }}</b> Pcs
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

    <!-- <v-bottom-sheet v-model="sheet">
      <v-list>
        <v-subheader>Aksi</v-subheader>
        <v-list-item ripple @click="showDeleteDialog(sheetSelected)">
          <v-list-item-icon>
            <v-icon>fa-trash</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Hapus</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet> -->
    <v-btn id="addBtn" fab large bottom color="error" fixed right style="margin-bottom: 64px"
      @click="addProcurement">
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
            <v-autocomplete
              v-model="object.productId"
              :items="productsC"
              :loading="productLoading"
              :rules="rules.product"
              validate-on-blur
              no-data-text="Produk tidak ditemukan"
              :item-text="productText"
              label="Produk"
              dense
              item-value="id"
              outlined
            >
            <template v-slot:item="{item}">
              <span class="subtitle-2">{{item.name}}
                <span class="caption text--secondary">({{item.blimartResponse.name}})</span>
              </span>
            </template>
            </v-autocomplete>
            <v-autocomplete
              v-model="object.supplierId"
              :items="suppliersC"
              :loading="supplierLoading"
              :rules="rules.supplier"
              validate-on-blur
              no-data-text="Supplier tidak ditemukan"
              item-text="name"
              label="Supplier"
              item-value="id"
              dense
              outlined
            ></v-autocomplete>
            <v-text-field
              v-model="object.qty"
              outlined
              :rules="rules.count"
              dense
              label="Jumlah"
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
  name: 'AdminPengadaan',
  components: {},
  data() {
    return {
      showDialog: false,
      // sheet: false,
      formTitle: 'Pengadaan',
      valid: false,
      productLoading: true,
      supplierLoading: true,
      rules: {
        product: [v => !!v || 'Produk tidak boleh kosong'],
        supplier: [v => !!v || 'Supplier tidak boleh kosong'],
        count: [v => !!v || 'Jumlah tidak boleh kosong'],
      },
      isLoading: false,
      editState: -1,
      object: {},
      // sheetSelected: {},
      headers: [
        {
          text: 'No',
          align: 'start',
          value: 'id',
        },
        {
          text: 'Produk',
          value: 'productResponse.name',
        },
        {
          text: 'Supplier',
          value: 'supplierResponse.name',
        },
        {
          text: 'Jumlah',
          value: 'qty',
        },
        { text: 'Diperbaharui oleh', value: 'updatedBy' },
        { text: 'Diperbaharui tanggal', value: 'updatedDate' },
        // {
        //   text: 'Aksi', value: 'action', sortable: false, align: 'center',
        // },
        // { text: 'Iron (%)', value: 'iron' },
        // { text: '', value: 'data-table-expand' },
      ],
      filter: '',
      tableHeight: 400,
      option: { page: 1, itemsPerPage: 10 },
      mobileOption: {
        sortBy: 'id',
        filter: '',
        orderBy: 'asc',
        sortableFields: [{
          field: 'id',
          name: 'UUID',
        },
        {
          field: 'qty',
          name: 'Jumlah',
        }],
        itemsPerPage: 10,
        itemsPerPageOption: [10, 15, 25, 50, 100],
      },
    };
  },
  watch: {
    option() {
      this.pagination(this.option);
    },
  },
  computed: {
    listC() {
      return this.supplies();
    },
    productsC() {
      return this.products();
    },
    suppliersC() {
      return this.suppliers();
    },
    filteredItem() {
      return this.supplies()
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
    ...mapActions('procurements', ['pagination', 'addSupply', 'editSupply']),
    ...mapGetters('procurements', ['supplies', 'paging']),
    ...mapActions('products', { productPagination: 'pagination' }),
    ...mapGetters('products', ['products']),
    ...mapGetters('suppliers', ['suppliers']),
    ...mapActions('suppliers', ['getSuppliers']),
    paginationChanged(v) {
      const b = this.option;
      const buf = { ...b };
      buf.page = v;
      this.option = buf;
    },
    productText: item => `${item.name} — ${item.blimartResponse.name}`,
    pageSizeChanged(v) {
      const b = this.option;
      const buf = { ...b };
      buf.itemsPerPage = v.target.value;
      this.option = buf;
    },
    // showSheet(item) { this.sheetSelected = item; this.sheet = true; },
    close() {
      this.object = { };
      if (this.showDialog) {
        this.$refs.form.resetValidation();
      }
      this.showDialog = false;
      this.selectedImage = null;
      setTimeout(() => {
        this.editState = -1;
      }, 300);
    },

    save() {
      this.isLoading = true;
      if (this.validate()) {
        this.addSupply(this.object).then(() => {
          this.close();
          this.$notify({
            group: 'notif',
            type: 'success',
            title: 'Tambah Supply',
            text: 'Berhasil menambah supply',
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
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    addProcurement() {
      this.object = {};
      this.editState = -1;
      this.showDialog = true;
    },
    validate() {
      return this.$refs.form.validate();
    },
  },
  created() {
    this.productPagination({ page: 1, itemsPerPage: 1000 }).finally(() => {
      this.productLoading = false;
    });
    this.getSuppliers().finally(() => {
      this.supplierLoading = false;
    });
    if (this.$mq === 'xs') {
      this.pagination(this.option);
    }
  },
};
</script>
