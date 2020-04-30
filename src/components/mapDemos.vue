<template>
    <div>
      <baidu-map :style="{width:map.width,height:map.height}" class="map" ak="MRd6z4uQFq8AKcnis0OItL6NHG0gHcKn" :zoom="map.zoom" :center="{lng: map.center.lng, lat: map.center.lat}" :scroll-wheel-zoom="true" @ready="handler">
        <!--@ready="handler"-->
        <!--比例尺控件-->
        <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
        <!--缩放控件-->
        <!--<bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" ></bm-navigation>-->
        <!--聚合动态添加的点坐标-->
        <bm-marker-clusterer :averageCenter="true">
              <bm-marker  v-for="(marker,item) of mapData" v-if="marker.isProvince == '是'" :key="item" :position="{lng: marker.xCoor, lat: marker.yCoor}" @click="lookDetail(marker)" :icon="{url: map.province, size: { width: 100, height: 50 }}"
              ></bm-marker>
              <bm-marker  v-for="marker of mapData" v-if="marker.isCity == '是'" :key="marker.id" :position="{lng: marker.xCoor, lat: marker.yCoor}" @click="lookDetail(marker)" :icon="{url: map.city, size: { width: 100, height: 50 }}"
              ></bm-marker>
              <bm-marker  v-for="marker of mapData" v-if="marker.isOnethree == '是'" :key="marker.id" :position="{lng: marker.xCoor, lat: marker.yCoor}" @click="lookDetail(marker)" :icon="{url: map.point, size: { width: 100, height: 50 }}"
              ></bm-marker>
          <bm-marker  v-for="marker of mapData" v-if="marker.isOnethree == '否' && marker.isCity == '否' && marker.isProvince == '否'" :key="marker.id" :position="{lng: marker.xCoor, lat: marker.yCoor}" @click="lookDetail(marker)" :icon="{url: map.other, size: { width: 100, height: 50 }}"
          ></bm-marker>

        </bm-marker-clusterer>
        <!--&lt;!&ndash;信息窗体&ndash;&gt;-->
        <bm-info-window :position="{lng: infoWindow.info.xCoor, lat: infoWindow.info.yCoor}" :title="infoWindow.info.projectName" :show="infoWindow.show" >
          <p><span class="left">投资金额：</span><span class="right">{{infoWindow.info.totalInvestment}}万元</span></p>
          <p><span class="left">责任单位：</span><span class="right">{{infoWindow.info.dutyCompany}}</span></p>
          <p><span class="left">包联领导：</span><span class="right">{{infoWindow.info.dutyPerson}}</span></p>
          <div class="clear"></div>
        </bm-info-window>
      </baidu-map>
    </div>
</template>


<script type="text/ecmascript-6">
  import {BaiduMap} from 'vue-baidu-map'
  import {BmScale} from 'vue-baidu-map'
  import {BmNavigation} from 'vue-baidu-map'
  import BmMarkerClusterer from  'vue-baidu-map/components/extra/MarkerClusterer'
  import {BmMarker} from 'vue-baidu-map'
  import {BmInfoWindow} from 'vue-baidu-map'
//  import {BaiduMap} from 'vue-baidu-map'
//  import {BmScale} from 'vue-baidu-map'
//  import {BmNavigation} from 'vue-baidu-map'
//  import {BmMarkerClusterer} from  'vue-baidu-map'
//  import {BmMarker} from 'vue-baidu-map'
//  import {BmInfoWindow} from 'vue-baidu-map'
    export default{
      props:{
        mapData:{
          type:[],
          default:()=>[]
        }
      },
      components: {
        BaiduMap,
        BmScale,
        BmNavigation,
        BmMarkerClusterer,
        BmMarker,
        BmInfoWindow
      },
      data(){
          return {
            infoWindow:{
              show:false,
              info:{
                xCoor:'',
                yCoor:'',
                projectName:'',   //项目名称
              }

            },
            map:{
              width:'100%',
              height:'690px',
              center: {lng: 110.711954414, lat: 35.580172115},
              zoom: 13,
              province:require("@/assets/images/shenIcon.png"),
              city:require("@/assets/images/shiIcon.png"),
              other:require("@/assets/images/other.png"),
              point:require("@/assets/images/1311Icon.png"),
            }
          }
      },
      watch:{
        mapData(val){
          console.log('地图数据',this.mapData)
        }
      },
      mounted(){

      },
      methods: {
          handler({ BMap, map }) {
//            style:"midnight"
//            let mapStyle={
//              styleJson: [{
//                "featureType": "water",
//                "elementType": "all",
//                "stylers": {
//                  "color": "#044161"
//                }
//              },{
//                "featureType": "land",
//                "elementType": "all",
//                "stylers": {
//                  "color": "#004981"
//                }
//              }, {
//                "featureType": "boundary",
//                "elementType": "geometry",
//                "stylers": {
//                  "color": "#064f85"
//                }
//              }, {
//                "featureType": "railway",
//                "elementType": "all",
//                "stylers": {
//                  "visibility": "off"
//                }
//              }, {
//                "featureType": "highway",
//                "elementType": "geometry",
//                "stylers": {
//                  "color": "#004981"
//                }
//              }, {
//                "featureType": "highway",
//                "elementType": "geometry.fill",
//                "stylers": {
//                  "color": "#005b96",
//                  "lightness": 1
//                }
//              }, {
//                "featureType": "highway",
//                "elementType": "labels",
//                "stylers": {
//                  "color": "#004981"
//                }
//              }, {
//                "featureType": "arterial",
//                "elementType": "geometry.fill",
//                "stylers": {
//                  "visibility": "off"
//                }
//              }, {
//                "featureType": "arterial",
//                "elementType": "geometry",
//                "stylers": {
//                  "color": "#00508b"
//                }
//              }, {
//                "featureType": "poi",
//                "elementType": "all",
//                "stylers": {
//                  "visibility": "off"
//                }
//              }, {
//                "featureType": "green",
//                "elementType": "all",
//                "stylers": {
//                  "color": "#056197",
//                  "visibility": "off"
//                }
//              }, {
//                "featureType": "subway",
//                "elementType": "all",
//                "stylers": {
//                  "visibility": "off"
//                }
//              }, {
//                "featureType": "manmade",
//                "elementType": "all",
//                "stylers": {
//                  "visibility": "off"
//                }
//              }, {
//                "featureType": "arterial",
//                "elementType": "labels",
//                "stylers": {
//                  "visibility": "off"
//                }
//              }, {
//                "featureType": "town",
//                "elementType": "all",
//                "stylers": {
//                  "visibility": "on"
//                }
//              }, {
//                "featureType": "village",
//                "elementType": "labels.text.stroke",
//                "stylers": {
//                  "weight": 0,
//                  "color": "#ffffff00"
//                }
//              }, {
//                "featureType": "village",
//                "elementType": "labels.text.fill",
//                "stylers": {
//                  "color": "#ffffffff",
//                  "weight": 10
//                }
//              }, {
//                "featureType": "village",
//                "elementType": "labels.text",
//                "stylers": {
//                  "fontsize": 30
//                }
//              }, {
//                "featureType": "town",
//                "elementType": "labels.text.stroke",
//                "stylers": {
//                  "weight": 0,
//                  "color": "#ffffff00"
//                }
//              }, {
//                "featureType": "town",
//                "elementType": "labels.text.fill",
//                "stylers": {
//                  "color": "#ffffffff",
//                  "weight": 10
//                }
//              }, {
//                "featureType": "town",
//                "elementType": "labels.text",
//                "stylers": {
//                  "fontsize": 30
//                }
//              }]
//            }
//            map.setMapStyle(mapStyle);
            map.setMapStyle({style:'midnight'});
//             console.log(BMap, map);
          },
          //查看详情
          lookDetail(data){
            this.infoWindow.show =true;
            this.infoWindow.info=data;
            this.activeName = data.projectName;
            //为弹窗口标题添加title
            this.$nextTick(()=>{
              var win=document.querySelector(".BMap_bubble_title");
              win.title = this.activeName;
            })
          },
        }
    }

</script>
<style scoped>
.BMap_bubble_content p{
  height: 30px;
  line-height: 30px;
}
.BMap_scaleCtrl div.BMap_scaleTxt{
  color: #fff!important;
}
</style>
