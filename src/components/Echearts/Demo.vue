<template>
  <div id="main" style="width: 600px; height: 400px;"></div>
</template>

<script>
export default {
  name: "Demo",
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      console.log("init")
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      let myChart = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      let option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['5分钟', '10分钟', '15分钟', '20分钟', '25分钟', '30分钟']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            color: '#60aeff',
            data: [10, 8, 30, 44, 34, 22],
            type: 'line',
            areaStyle: {}
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  }
}
</script>

<style>

</style>