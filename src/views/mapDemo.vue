<template>
    <div>
      <div class="map-area" :id="mapId"></div>
      <!--<baidu-map class="bm-view" :center="center" :zoom="zoom"-->
                 <!--@mousemove="syncPolyline"-->
                 <!--@click="paintPolyline"-->
                 <!--@rightclick="newPolyline"-->
                 <!--mapType="BMAP_NORMAL_MAP"-->
                 <!--:scroll-wheel-zoom="true">-->
        <!--<bm-marker :position="{lng: 121.4095, lat: 31.1796}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" />-->
      <!--</baidu-map>-->
      <!--<bm-control>-->
        <!--<button @click="toggle('polyline')">{{ polyline.editing ? '停止绘制' : '开始绘制' }}</button>-->
      <!--</bm-control>-->
      <!--<bm-polyline :path="path" v-for="path of polyline.paths"></bm-polyline>-->
    </div>
</template>


<script type="text/ecmascript-6">
  import loadMap from '@/api/loadMap'
    export default{
      components: {},
      data(){
        return {
          center: {lng: 110.711954414, lat: 35.580172115},
          zoom: 15,
          polyline: {
            editing: false,
            paths: []
          },
          mapId:'BMap-' + parseInt(Date.now() + Math.random()),
          myMap:null
        }
      },
      mounted(){
        this.initMap()
      },
      methods: {
        initMap(){
          loadMap('MRd6z4uQFq8AKcnis0OItL6NHG0gHcKn').then(resolut =>{
            this.myMap = new BMap.Map(this.mapId); // 创建Map实例
            this.myMap.centerAndZoom(new BMap.Point(110.711, 35.580), 15) // 初始化地图,设置中心点坐标和地图级别
            //添加地图类型控件
            this.myMap.addControl(
              new BMap.MapTypeControl({
                mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
              })
            )
            this.myMap.setCurrentCity('太原') // 设置地图显示的城市 此项是必须设置的
            this.myMap.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
          })
          .catch(err => {
            console.log('地图加载失败')
          })
        }
//        toggle (name) {
//          this[name].editing = !this[name].editing
//        },
//        syncPolyline (e) {
//          if (!this.polyline.editing) {
//            return
//          }
//          const {paths} = this.polyline
//          if (!paths.length) {
//            return
//          }
//          const path = paths[paths.length - 1]
//          if (!path.length) {
//            return
//          }
//          if (path.length === 1) {
//            path.push(e.point)
//          }
//          this.$set(path, path.length - 1, e.point)
//        },
//        newPolyline (e) {
//          if (!this.polyline.editing) {
//            return
//          }
//          const {paths} = this.polyline
//          if(!paths.length) {
//            paths.push([])
//          }
//          const path = paths[paths.length - 1]
//          path.pop()
//          if (path.length) {
//            paths.push([])
//          }
//        },
//        paintPolyline (e) {
//          if (!this.polyline.editing) {
//            return
//          }
//          const {paths} = this.polyline
//          !paths.length && paths.push([])
//          paths[paths.length - 1].push(e.point)
//        }
      }
    }

</script>
<style scoped>
  .map-area {
    width: 100%;
    height: 500px;
  }
</style>
