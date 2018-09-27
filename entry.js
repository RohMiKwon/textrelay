import Vue from '../../../../common/js/BaseInjector';

import App from './App';
import { store } from './store';

new Vue({
    el: '#app',
    store,
    components: {
        App
    },
    template: '<App/>'
});
