// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './vuex';
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './plug-in/idCode/jquery.idcode.css'
import './plug-in/reset/reset.css'
import $ from 'jquery'
import axios from 'axios'
import VueAxios from 'vue-axios'
import jqForm from './plug-in/jQuery.Form'
import jqPdf from './plug-in/jQuery.media'
import idCode from './plug-in/idCode/jquery.idcode'
import particles from 'particles.js'
import App from './App'
import router from './router'
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(ElementUi);
Vue.use(particles);



/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
    store,//使用store
	template: '<App/>',
	components: {App}
})
