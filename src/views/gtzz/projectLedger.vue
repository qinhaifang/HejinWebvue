<template>
    <div class="p20 xmtz">
      <div class="left border">
        <box-border></box-border>
          <el-tabs v-model="activeName"  type="card" @tab-click="handleClick"   class="waringTab">
            <el-tab-pane label="全部" name=""></el-tab-pane>
            <el-tab-pane label="产业类" name="产业类" style="border: 0"></el-tab-pane>
            <el-tab-pane label="基础设施类" name="基础设施类"></el-tab-pane>
            <el-tab-pane label="民生社会类" name="民生社会类"></el-tab-pane>
            <el-table :data="tableData" :height="windowHeight"  style="width: 100%" v-loading="loading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading"   @row-click="rowClick">
              <template v-for="(item,index) in tableHeader" >
                <el-table-column v-if="index==0" :align="item.align" type="index" :prop="item.prop" :label="item.name" :width="item.width" :key="index" ></el-table-column>
                <el-table-column  v-else :prop="item.prop" :align="item.align" :label="item.name" :width="item.width" :key="index" show-overflow-tooltip></el-table-column>
              </template>
            </el-table>
          </el-tabs>

      </div>
      <div class="right">
        <box-border></box-border>
        <map-demos :mapData="projectMap"></map-demos>
      </div>


    </div>
</template>


<script type="text/ecmascript-6">
  import BoxBorder from '@/components/boxStyle'
  import {xmtz} from '../../api/gtzz/gtzz'
  import MapDemos from '@/components/mapDemos'
    export default{
      components:{
        BoxBorder,
        MapDemos
      },
      data(){
        return{
          activeName:'',
          loadin:false,
          windowHeight:window.innerHeight-185,
          projectMap:null,
          tableHeader:[
            {name:'序号',prop:'',width:'50',align:'center'},
            {name:'项目名称',prop:'projectName',width:'',align:'left'},
            {name:'投资主体',prop:'projectGenre',width:'100',align:'left'}
          ],
          tableData: [],
          queryParams: {
            pageNum:1,
            pageSize: 10000,
            projectType:''
          }
        }
      },
      created() {
        this.getTable()
      },
      methods:{
        getTable(){
          this.loading = true;
          xmtz(this.queryParams).then(response =>{
            this.tableData = response.data.rows;
            this.projectMap = response.data.rows;
            this.loading = false;
          })
        },
        onSubmit() {
          this.getTable();
        },
        handleClick(tab, event) {
          this.queryParams.projectType = this.activeName;
          this.getTable();
        },
        rowClick(row){
          this.$router.push({name:'projectDesc',params:row})
        }

      }
    }

</script>
<style scoped>
  .xmtz{
    display: flex;
    /*height: 100%;*/
  }
  .left{
    width: 30%;
    position: relative;
  }
  .right{
    width: 68%;
    position: relative;
    left: 1%;
  }
  .el-tabs__content{
    border: 0;
  }
  .el-table tbody{
    cursor: pointer!important;
  }
</style>

