<template>
    <agile
      ref="carousel"
      v-if="items.length > 0"
      :dots="false"
      :navButtons="true"
      :centerMode="true"
      :infinite="true"
      :slidesToShow="2"
      :responsive="[
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 4,
                        navButtons:true
                    }
                },
                {
                    breakpoint: 960,
                    settings: {
                        slidesToShow: 5,
                        navButtons:true
                    }
                },
                {
                    breakpoint: 1264,
                    settings: {
                        slidesToShow: 6,
                        navButtons:true
                    }
                }
            ]">
        <template slot="prevButton">
          <v-btn  class="navBut"  icon outlined color="primary">
            <v-icon small>fa-chevron-left</v-icon>
          </v-btn>
        </template>
        <template slot="nextButton">
          <v-btn  class="navBut"  icon outlined color="primary">
            <v-icon small>fa-chevron-right</v-icon>
          </v-btn>
        </template>
        <div v-for="(item, i) in items"
            :key="i"
            class="slide">
            <Product :item="item"/>
        </div>
    </agile>
</template>

<style lang="css">
  .navBut{
    margin-top: -400px;
  }
</style>
<script>

import Product from './Product.vue';

export default {
  name: 'ProductCarousel',
  components: { Product },
  props: {
    value: Array,
  },
  computed:
  {
    items() {
      return this.value;
    },
  },
};

</script>
