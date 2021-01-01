<template>
  <div>
    <router-view/>
    <notifications group="notif" position="top right" style="top:24px"/>

  </div>
</template>

<style lang="css">
.pointer{
  cursor: pointer;
}
.border-0{
  border-radius: 0px;
}
.border-1{
  border-radius: 4px;
}
.border-2{
  border-radius: 8px;
}
.border-3{
  border-radius: 12px;
}
.border-4{
  border-radius: 16px;
}
.border-5{
  border-radius: 20px;
}
.border-vertical{
  border-left-width: 0px!important;
  border-right-width: 0px!important;
}
.border-top{
  border-bottom-width: 0px!important;
  border-left-width: 0px!important;
  border-right-width: 0px!important;
}
.border-bottom{
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
}
.pagination li button{
  color: var(--v-primary-base)!important;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  border-color: var(--v-primary-base)!important;
  border-width: 1px;
  border-style: solid;
  font-size: 12px;
  min-height: 24px;
  height: 24px;
  min-width: 24px;
  width: 24px;
  padding: 0px;

}
.pagination li button.v-pagination__item--active{
  color: #ffffff!important;

}
.pagination li button i{
  color: var(--v-primary-base)!important;
  font-size: 12px !important;
}

.input-field.white-background input {
  background-color: rgba(255, 255, 255, 0.25);
  padding-left: 4px;
  padding-right: 4px;
}
.input-field.white-background i {
  top: 0 !important;
  padding-top: 0.5rem;

  height: calc(100% - 0.6rem);
  background-color: rgba(255, 255, 255, 0.719);
}
.input-field.white-background > i.w-helper {
  height: calc(100% - 1.75rem) !important;
}
.input-field.white-background label {
  margin-left: 3.3rem !important;
}
.input-field.white-background label.active {
  transform: translateY(-18px) scale(0.8) !important;
  transform-origin: 0 0;
}
/* label color */
.input-field.white-background label {
  color: rgb(231, 231, 231);
}
/* label focus color */
.input-field.white-background input:focus + label {
  color: #ffffff !important;
}
/* label underline focus color */
.input-field.white-background input:focus {
  border-bottom: 1px solid #2196f3 !important;
  box-shadow: 0 1px 0 0 #2196f3 !important;
}
/* valid color */
.input-field.white-background input.valid {
  border-bottom: 1px solid rgb(255, 255, 255);
  box-shadow: 0 1px 0 0 rgb(221, 221, 221);
}
/* invalid color */
.input-field.white-background input.invalid {
  border-bottom: 1px solid rgb(189, 0, 0);
  box-shadow: 0 1px 0 0 rgb(202, 61, 61);
}
/* icon prefix focus color */
.input-field.white-background .prefix.active {
  color: rgb(70, 70, 70);
}
.input-field.white-background .prefix {
  color: rgb(70, 70, 70);
}


/* label color */
.input-field label {
  color: #000;
}
/* label focus color */
.input-field input:focus + label {
  color: #5caad1 !important;
}
/* label underline focus color */
.input-field input:focus {
  border-bottom: 1px solid #2196f3 !important;
  box-shadow: 0 1px 0 0 #2196f3 !important;
}
/* valid color */
.input-field input.valid {
  border-bottom: 1px solid #000 !important;
  box-shadow: 0 1px 0 0 #000 !important;
}
/* invalid color */
.input-field input.invalid {
  border-bottom: 1px solid rgb(189, 0, 0);
  box-shadow: 0 1px 0 0 rgb(202, 61, 61);
}
/* icon prefix focus color */
.input-field .prefix.active {
  color: #000;
}

.super-dense .v-input__slot{

  min-height: 22px!important;
}

.super-dense input{

  max-height: 22px;
  font-size: 12px;
}

.wedge {
  flex: 1 175px;
  -webkit-box-flex: 1;
}
</style>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',

  components: {

  },

  methods: {
    ...mapActions('auth', ['refresh']),

  },
  data() {
    return {

    };
  },
  mounted() {
    this.refresh();
  },
};
</script>
