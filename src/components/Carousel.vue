<template>

  <carousel-3d
    :center="true"
    :nav="false"
    :display=5
    :autoplay="true"
    :width="width"
    :height="height">


    <slide
        v-for="(item, i) in carousels"
        :key="i"
        style="border-width:0px; background-color:transparent"
        :index="i">
        <v-img
            :height="height"
            :src="item.src"
            style="border-radius:8px"/>
    </slide>

  </carousel-3d>
</template>

<script>

export default {
  computed: {
    height() {
      switch (this.$mq) {
        case 'xs': {
          return 100;
        }
        default: {
          break;
        }
      }
      return 186;
    },
    width() {
      switch (this.$mq) {
        case 'xs': {
          return 300;
        }
        default: {
          break;
        }
      }
      return 590;
    },
    display() {
      switch (this.$mq) {
        case 'xs': {
          return 3;
        }
        default: {
          break;
        }
      }
      return 5;
    },
  },
  data() {
    return {
      carousels: [
        {
          src: 'https://www.static-src.com/siva/asset//05_2020/home-591-m11-live-r.jpg?output-format=webp',
        },
        {
          src: 'https://www.static-src.com/siva/asset//05_2020/lenovo590x197.jpg?output-format=webp',
        },
        {
          src: 'https://www.static-src.com/siva/asset//05_2020/wardah-hompej590x197rev.jpg?output-format=webp',
        },
        {
          src: 'https://www.static-src.com/siva/asset//05_2020/Homepage-desktop-X8rev.jpg?output-format=webp',
        },
        {
          src: 'https://www.static-src.com/siva/asset//05_2020/OTO-27-Mei-carousel-desktop.jpg?output-format=webp',
        },
        {
          src: 'https://www.static-src.com/siva/asset//05_2020/Home-Page-Citibank-May-20_590x197rev.jpg?output-format=webp',
        },
        {
          src: 'https://www.static-src.com/siva/asset//05_2020/JBL-Car-audio-carousel-desktop-homepage-rev-3.jpg?output-format=webp',
        },
        {
          src: 'https://www.static-src.com/siva/asset//05_2020/200526-rev-Ooredoo_Payday-590x197-Homepage_Desktop.jpg?output-format=webp',
        },
      ],
    };
  },
};

</script>
