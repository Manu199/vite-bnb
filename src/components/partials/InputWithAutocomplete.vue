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
      }, 100);
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
  <div class="position-relative w-100">
    <input
      v-model="store.selectedAddress" 
      @input="autoComplete" 
      @blur="outOfInput" 
      @keypress.enter="pressEnter"
      ref="inputAddress"
      class="form-control"
      type="text"
      placeholder="Digita qui l'indirizzo">
    <ul class="list-group" id="list-search">
      <li
        @click="selectedFromSuggest(address)"
        class="cursor-pointer list-group-item list-group-item-action list-group-item-secondary"
        v-for="address in store.arraySuggest"
        :key="address.id">{{ address.address.freeformAddress }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>

  #list-search {
    position: absolute;
    z-index: 3;
    top: 100%;
    width: 100%;
  }

  .cursor-pointer{
    cursor: pointer;
  }

  input{
    padding: 14px;
    border-radius: 30px;
    padding-right: 60px;
    padding-left: 22px;
  }
</style>