<template>
    <v-card
      height="345"
      elevation="4"
      min-width="160"
      class="ma-2"
      style="flex:1 158px; -webkit-box-flex: 1;"
      :to="'/product/'+object.id">
        <v-img
          :src="'/products/photo/'+object.id | serverImg"
          height="200px"
        >
        </v-img>
        <v-card-text>
            <div id="name" class="mb-0 text--primary font-weight-medium name text-truncate"
            >{{ object.name }}
            </div>
            <div class="mb-1 text--secondary">{{ object.variant }}
            </div>
            <div class="mb-2" v-if="object.discount">
                <v-chip
                id="percentDiscount"
                    color="primary"
                    label
                    outlined
                    x-small

                    >
                    {{ object.discount }}% OFF
                </v-chip>
                <span
                  id="price"
                  class="ml-2 price"
                  style="text-decoration: line-through;">
                  {{ object.price | price }}</span>
            </div>
            <div id="discounted" class="subtitle-1 font-weight-bold error--text">

            {{ (100 - object.discount)/100*object.price | price }}
            </div>
        </v-card-text>
    </v-card>
</template>
<style lang="css">
  .price{
    font-size: 9px!important;
  }
  .name{
   display: -webkit-box;
   -webkit-line-clamp: 2; /* number of lines to show */
   -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>

<script>
export default {
  name: 'Product',
  props: {
    item: Object,
  },
  computed: {
    object() {
      return this.item;
    },
  },
};

</script>
