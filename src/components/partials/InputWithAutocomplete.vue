<script>
import { store } from '../../data/store';

export default {
  name: 'InputWithAutocomplete',
  data() {
    return {
      store,
      timerToCallApi: null,
    }
  },
  methods: {
    
    autoComplete(){
      // Cancella il timer precedente se esiste
      clearTimeout(this.timerToCallApi);

      // Verifica se l'input è vuoto
      if(!this.store.selectedAddress.trim()){
        // Se l'input è vuoto, ferma il codice
        this.store.arraySuggest = [];
        return;
      }

      // Imposto un timer per ritardare la chiamata di 200ms
      this.timerToCallApi = setTimeout(() =>{
        store.tomTomGeocode(5);
      }, 200);

    },

    selectedFromSuggest(address){
      store.selectedAddress = address.address.freeformAddress;
      this.$refs.inputAddress.focus();
    },

    outOfInput(){
      setTimeout(() => {
        this.clearSuggest();
      }, 150);
    },

    pressEnter(){
      console.log('pressEnter');
      this.clearSuggest();
      this.store.toSearch();
    },

    clearSuggest(){
      this.store.arraySuggest = [];
    }
  },
}
</script>

<template>
  <div class="position-relative w-100" id="container-search">
    <input
      v-model="store.selectedAddress"
      @click="autoComplete" 
      @input="autoComplete" 
      @blur="outOfInput" 
      @keypress.enter="pressEnter"
      ref="inputAddress"
      class="form-control"
      id="input-search"
      type="text"
      placeholder="Digita qui l'indirizzo">
    <ul class="list-group" id="list-search">
      <li
        @click="selectedFromSuggest(address)"
        class="cursor-pointer list-group-item list-group-item-action"
        v-for="address in store.arraySuggest"
        :key="address.id">{{ address.address.freeformAddress }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use '../../scss/partials/variables' as *;

  #container-search{
    padding: 2px;
  }

  #input-search{
    position: relative;
    z-index: 2;

    padding: 14px;
    padding-right: 60px;
    padding-left: 22px;

    margin-left: 2px;
    border: 0;
    border-radius: 30px;
  }

  #list-search{
    position: absolute;
    z-index: 1;
    top: 0;
    width: 100%;
    padding-top: 55px;

    border: var(--bs-border-width) solid var(--bs-border-color);
    border-radius: 28px;
    background-color: white;
    overflow: hidden;

    li{
      border-radius: 0;
      padding-left: 22px;
    }

    li:last-child {
      border-bottom: none;
    }
  }

  .cursor-pointer{
    cursor: pointer;
  }

  #input-search:focus{
  border-color: var(--bs-border-color);
  box-shadow: none;
  
    & + #list-search{
      border-color: $primaryColor;
      box-shadow: 0 0 0 0.25rem rgba($primaryColor, 0.25);
    }
  }
</style>