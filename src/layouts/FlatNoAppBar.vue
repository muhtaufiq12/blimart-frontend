<template>
    <v-app>
        <MainAppBar :mobile="false"/>
        <v-content  class="background">
            <router-view class="mx-auto"
            style="margin-bottom:30px; max-width:1200px;"></router-view>
        </v-content>
        <Footer  style="margin-bottom:84px;"/>
    </v-app>
</template>
<script>
import MainAppBar from './MainAppBar.vue';
import Footer from './Footer.vue';

export default {
  components: {
    MainAppBar, Footer,
  },

};
</script>
