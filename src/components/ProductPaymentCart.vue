<template>
  <v-card flat color="transparent" width="100%">
    <v-container>
      <v-row>
        <v-col cols="auto" align-self="center" class="pa-0">
          <slot name="append" v-bind:product="product"></slot>
        </v-col>
        <v-col cols="auto" class="pl-0">
          <v-img width="86" height="86" :src="'/products/photo/'+product.id | serverImg"></v-img>
        </v-col>
        <v-col cols="6" md="6" class="pa-0" align-self="center">
          <v-row class="ml-0">
            <v-col cols="12" md="8" style="font-size:14px" class="font-weight-bold pa-0">
              <div >
                <router-link
                  :to="'/product/'+product.id"
                  class="onSurface--text"
                  style="text-decoration:none">{{ product.name }}</router-link>
              </div>

              <div
                style="font-size:12px"
                class="primary--text font-weight-bold"
              >{{ product.variant }}</div>
              <div style="font-size:12px" class="text--secondary">{{ product.category }}</div>
            </v-col>
            <v-col
              cols="12"
              md="4"
              style="font-size:10px"
              class="text--secondary py-0"
              v-if="!hidePrice"
            >
              <v-row>
                <v-col
                  cols="auto"
                  md="12"
                  class="pa-0"
                  align-self="center">{{product.price | price}}({{nItem}})</v-col>
                <v-col
                  cols="auto"
                  md="12"
                  style="font-size:14px"
                  class="pa-0 error--text ml-xs-2 font-weight-bold"
                >{{product.price * nItem  | price}}</v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-spacer></v-spacer>

        <v-col cols="auto" align-self="center" class="pa-0">
          <slot name="prepend" v-bind:product="product"></slot>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  props: {
    product: Object,
    nItem: { type: Number, default: 0 },
    hidePrice: { type: Boolean, default: false },
  },
};
</script>
