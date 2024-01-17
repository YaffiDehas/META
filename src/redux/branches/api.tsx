import axios from 'axios';

export function getStores() {
    return axios.get("https://mcdonalds-live-engage-api-stage-1.azurewebsites.net/stores.json")
}

