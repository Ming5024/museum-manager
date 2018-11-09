<template>
  <div class="piechart" style="width:600px; display:inline-block; margin:0 40px 0 0">
    <el-container>
      <el-header>
        <div style="display:inline-block; margin: auto"><span class="chartTitle">{{ chartTitle }}</span></div>
        <el-select v-model="dateRange" size="small" placeholder="请选择" style="width: 100px; float:right">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-header>
      <el-main>
        <v-chart 
          :options="chartData"
          :init-options="initOptions"
          auto-resize/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: 'Chart',
  props: {
    chartData: {
      type: Object,
      default: () => null
    },
    chartTitle: {
      type: String,
      default: "123"
    }
  },
  data() {
    let options = qs.parse(location.search, { ignoreQueryPrefix: true })
    return {
      initOptions: {
        renderer: options.renderer || 'canvas'
      },
      options: [{
        value: 3,
        label: '最近三天'
      }, {
        value: 7,
        label: '最近一周'
      }, {
        value: 15,
        label: '最近15天'
      }, {
        value: 30,
        label: '最近30天'
      }, {
        value: 180,
        label: '最近半年'
      }],
      dateRange: 7
    }
  },
  watch: {
    dateRange: function() {
      this.$emit("refresh-data", this.dateRange);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
.echarts {
  min-width: 400px;
  width: 90%;
}
.chartTitle {
  font-size: 20px;
}
</style>
