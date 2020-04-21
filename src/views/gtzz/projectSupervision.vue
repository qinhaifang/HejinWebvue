<template>
  <div class="pl20">
    <div class="search-border">
      <p><span class="blueBox"></span>项目督办</p>
    </div>
    <el-table :data="tableData" :height="windowHeight" border style="width: 100%" v-loading="loading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading">
      <template v-for="(item,index) in tableHeader" >
        <el-table-column v-if="index==0" :align="item.align" type="index" :prop="item.prop" :label="item.name" :width="item.width" :key="index" ></el-table-column>
        <el-table-column  v-else :prop="item.prop" :align="item.align" :label="item.name" :width="item.width" :key="index" show-overflow-tooltip></el-table-column>
      </template>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.pagination.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.pagination.total" class="center p20">
    </el-pagination>
    <!--<page :pagination="pagination"></page>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import Page from '@/components/pagination'
  import {xmDuban} from '@/api/gtzz/gtzz'
  export default{
    props:{},
    components:{
      Page
    },
    data(){
      return{
        loading:false,
        windowHeight:window.innerHeight-220,
        tableHeader:[
          {name:'序号',prop:'',width:'50',align:'center'},
          {name:'项目名称',prop:'projectName',width:'',align:'left'},
          {name:'项目类型',prop:'projectType',width:'300',align:'left'},
          {name:'督办状态',prop:'isStart',width:'160',align:'center'},
          {name:'督办人',prop:'createBy',width:'160',align:'center'},
          {name:'时间',prop:'createTime',width:'160',align:'center'}
        ],
        pagination:{
          total:1,
          currentPage:1
        },
        tableData: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10
        }
      }
    },
    created() {
      this.getTable()
    },
    methods:{
      getTable(){
        this.loading = true;
        xmDuban(this.queryParams).then(response =>{
          this.tableData = response.data.rows;
          this.pagination.total = response.data.total;
          this.pagination.currentPage = response.data.currentPage;
          this.loading = false;
        })
      },
      handleSizeChange(val) {
        this.queryParams.pageSize = val;
        this.getTable();
      },
      handleCurrentChange(val) {
        this.queryParams.pageNum = val;
        this.getTable();
      },
    }

  }

</script>
<style scoped>

</style>
