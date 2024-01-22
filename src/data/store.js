import { reactive } from "vue";
import axios from "axios";
import { router } from '../router'

export const store = reactive({
    apiUrl: "http://127.0.0.1:8000/api/",
    apartmentsList: [], /* Array degli appartamenti da far vedere */
    selectedAddress: '', /* Testo inserito nell'input */
    arraySuggest: [], /* Array dei suggerimenti per l'input text */
    selectedServices: [],
    paramsToSearch: {
        lat: null,
        lon: null,
        radius: 10,
        minRooms: 0,
        minBeds: 0,
        services: '',
    },

    // Funzione ricerca dentro il nostro DB
    toSearch: function() {
        console.log('toSearch');
        if(this.selectedAddress){
            // richiamo tomTomGeocode per avere le coordinate del punto da cercare
            // first api, call axios
            this.tomTomGeocode(1)
                .then(()=>{
                    // prima di fare la chiamata axios, trasformo in stringa l'array dei servizi
                    this.paramsToSearch.services = this.selectedServices.join(' ');
                    console.log(this.paramsToSearch);
                    axios.get(store.apiUrl + 'search-apartments', { 
                        params: this.paramsToSearch,
                    })
                        .then(response => {
                            console.log('axios search-apartments');
                            this.apartmentsList = response.data.data;
                            console.log(this.apartmentsList);

                            router.push('/ricerca-avanzata');
                        })
                        .catch(error => {
                            console.error(error);
                        });
                })
        }
    },

    // Funzione richiesta API tom tom geocode
    tomTomGeocode: function(limit){

        return new Promise((resolve,reject) => {
            // Costruisco l'endpoint
            const apiUrl = 'https://api.tomtom.com/search/2/geocode/';
            const apiQuery = this.selectedAddress + '.json';
            const encodedAddress = encodeURIComponent(apiQuery);
            const endpoint = apiUrl + encodedAddress;
    
            console.log(endpoint);
    
            const params = {
                limit: limit,
                key: 'JFycdOFju9JHTRcWGALUGaqq5FULPTe8',
            };
    
            // Chiamata axios
            axios.get(endpoint, {
                params: params,
            })
                .then(response => {
                    // Se il limit è 1 significa sto avviando dal toSearch
                    if(limit === 1){
                        if(response.data.results.length !== 0){
                            this.selectedAddress = response.data.results[0].address.freeformAddress;
                            this.paramsToSearch.lat = response.data.results[0].position.lat;
                            this.paramsToSearch.lon = response.data.results[0].position.lon;
                            resolve();
                        }
                    }else{
                        this.arraySuggest = response.data.results;
                    }
                    console.log(response.data.results);
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });

        });/* end promise */
    }
});