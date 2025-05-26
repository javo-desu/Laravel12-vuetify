import './bootstrap';
import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './vuetify';
import { Motion } from 'motion-v'

createApp(App).use(vuetify).mount('#app');
App.component('Motion', Motion)

App.mount('#app')