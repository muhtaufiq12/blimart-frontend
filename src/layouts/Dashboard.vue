<template>
    <v-app>
        <MainAppBar/>
        <v-content  class="background">
            <router-view
             class="pa-3 mx-auto"></router-view>
        </v-content>
    </v-app>
</template>
<script>
import MainAppBar from './DashboardAppBar.vue';

export default {
  components: {
    MainAppBar,
  },

};
</script>
