<template>
  <div id="app">
    <el-container>
      <el-header>
        <h1>后台监控系统</h1>
      </el-header>
      <el-main>
        <div style="margin: 0 auto 50px; width:560px">
          <el-table
            :data="tableData"
            border
            style="width: 541px">
            <el-table-column
              align="center"
              prop="userNumber"
              label="用户量"
              width="180">
            </el-table-column>
            <el-table-column
              align="center"
              prop="mostPolular"
              label="最受欢迎的标本"
              width="180">
            </el-table-column>
            <el-table-column
              align="center"
              prop="address"
              label="浏览最多的品种"
              width="180">
            </el-table-column>
          </el-table>
        </div>
        <Chart
          ref="specie"
          :chartData="specieChartData"
          chartTitle="物种访问量分布图"
          @refresh-data="refreshSpecieData"/>
        <Chart
          ref="age"
          :chartData="ageChartData"
          chartTitle="用户年龄段分布图"
          @refresh-data="refreshAgeData"/>
      </el-main>
      <el-footer><span style="font-size: 14px">仅供内部使用</span></el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      specieChartData: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['动物', '植物', '昆虫', '化石']
        },
        series: [{
          name: '访问量',
          type: 'pie',
          radius: '45%',
          center: ['50%', '40%'],
          data: [
            {value: 335, name: '动物'},
            {value: 310, name: '植物'},
            {value: 234, name: '昆虫'},
            {value: 1353, name: '化石'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      },
      ageChartData: {
        // title: {
        //   text: '饼图程序调用高亮示例',
        //   x: 'center'
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['10岁及以下', '11-20岁', '21-40岁', '40-60岁', '60岁以上']
        },
        series: [{
          name: '访问量',
          type: 'pie',
          radius: '45%',
          center: ['50%', '40%'],
          data: [
            {value: 335, name: '10岁及以下'},
            {value: 310, name: '11-20岁'},
            {value: 234, name: '21-40岁'},
            {value: 1353, name: '40-60岁'},
            {value: 1353, name: '60岁以上'},
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      },
      tableData: [{
        userNumber: '250',
        mostPolular: '大灵猫',
        address: '动物'
      }]
    }
  },
  methods: {
    refreshSpecieData: function(dateRange) {
      let self = this;
      // this.$http.get('http://localhost:8000/manager/species', {
      //   params: {
      //     dateRange: dateRange
      //   }
      // }).then(response => {
      //   self.specieChartData.series[0].data = response.data.visitedNum;
      // }) .catch(error => {
      //   console.log(error);
      // });
      this.$http.post('http://localhost:8000/manager/species', {
          dateRange: dateRange
        }, 
        {
          headers: {
            'content-type': "application/x-www-form-urlencoded",
          }
        }
      ).then(function (response) {
        self.specieChartData.series[0].data = response.data.visitedNum;
      }).catch(error => {
        console.log(error);
      });
      // this.$http({
      //   method: 'post',
      //   url: 'http://localhost:8000/manager/species',
      //   data: {
      //     dateRange: dateRange
      //   },
      //   headers: {
      //     'content-type': "application/x-www-form-urlencoded"
      //   }
      // }).then(response => {
      //   self.specieChartData.series[0].data = response.data.visitedNum;
      // }) .catch(error => {
      //   console.log(error);
      // });
    },
    refreshAgeData: function(dateRange) {
      let self = this;
      this.$http.post('http://localhost:8000/manager/age', {
          dateRange: dateRange
        }, 
        {
          headers: {
            'content-type': "application/x-www-form-urlencoded",
          }
        }
      ).then(function (response) {
        self.ageChartData.series[0].data = response.data.ageNum;
      }).catch(error => {
        console.log(error);
      });
    }
  },
  mounted() {
    this.refreshSpecieData(7);
    this.refreshAgeData(7);
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
