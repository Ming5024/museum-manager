import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import './plugins/element.js'

import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

import Chart from './components/chart.vue'

// register component to use
Vue.component('v-chart', ECharts)
Vue.component('Chart', Chart);

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
