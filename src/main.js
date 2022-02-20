import { createApp } from 'vue'
import App from './App.vue'

import interact from 'interactjs'

const app = createApp(App);
app.provide("interactjs", interact);
app.mount('#app');
