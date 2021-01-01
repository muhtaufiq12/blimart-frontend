<template>
  <v-container>
    <a-scene embedded arjs style="z-index:1000">
      <a-marker preset="hiro">
          <a-box position='0 0.5 0' material='color: yellow;'></a-box>
      </a-marker>
        <a-entity camera></a-entity>
    </a-scene>
  </v-container>
</template>

<script>

export default {
  name: 'HelloWorld',

  data: () => ({

  }),
};
</script>
