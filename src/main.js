import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { projectAuth } from './firebase/Config'

//global styles
import './assets/main.css'

let app
// Es wird immer ausgeführt, wenn AuthStateChanged
projectAuth.onAuthStateChanged( () => {
    //wenn die seit aaktuallisert bleibt angemeldet und ladet der User nicht neu
    if(!app) {
        app = createApp(App).use(router).mount('#app')
    }
})
