<template>
    <div>
        <v-row>
            <v-col
            v-for="(i, idx) in categoriesC"
            cols="12"
            sm="6"
            :key="idx" md="4">
                <v-card elevation="5" class="pa-2" :to="`/category/${i.id}`">
                    <v-avatar color="red">
                        <span class="white--text headline">{{ i.name | initial }}</span>
                    </v-avatar>
                    <span class="ml-4 sub-title-2 font-weight-bold">{{i.name}}</span>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Category',
  methods: {
    ...mapActions('categories', ['getCategories']),
    ...mapGetters('categories', ['categories']),
  },
  computed: {
    categoriesC() {
      return this.categories();
    },
  },
  created() {
    this.getCategories();
  },
};
</script>
