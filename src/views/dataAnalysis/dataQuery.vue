<template>
  <div class="pl20">
    <div class="search-border">
      <p><span class="blueBox"></span>数据查询</p>
      <el-form ref="queryForm"  :model="queryParams" label-width="100px">
        <el-form-item label="项目名称">
          <el-input v-model="queryParams.projectName" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="项目级别">
          <el-input v-model="queryParams.projectLevel" placeholder="请输入单位"></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-input v-model="queryParams.projectType" placeholder="请输入类别"></el-input>
        </el-form-item>
        <el-form-item label="投资主体">
          <el-input v-model="queryParams.projectGenre" placeholder="请输入投资主体"></el-input>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
      </el-form>
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
  import {dataQuery} from '../../api/dataAnalysis/dataQuery'
  export default{
    props:{},
    components:{

    },
    data(){
      return{
        loading:false,
        windowHeight:window.innerHeight-270,
        tableHeader:[
          {name:'序号',prop:'',width:'50',align:'center'},
          {name:'项目名称',prop:'projectName',width:'300',align:'left'},
          {name:'项目级别',prop:'projectLevelRemark',width:'300',align:'left'},
          {name:'类别',prop:'projectType',width:'160',align:'center'},
          {name:'投资主体',prop:'projectGenre',width:'200',align:'center'},
          {name:'项目性质',prop:'projectBuild',width:'200',align:'left'},
          {name:'投资金额(亿元)',prop:'totalInvestment',width:'140',align:'center'},
          {name:'包联领导',prop:'leader',width:'160',align:'center'},
          {name:'责任单位',prop:'dutyCompany',width:'200',align:'center'},
          {name:'责任人',prop:'dutyPerson',width:'200',align:'center'}
        ],
        pagination:{
          total:null,
          currentPage:1
        },
        tableData: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          projectName:'',
          projectLevel:'',
          projectType:'',
          projectGenre:''
        }
      }
    },
    created() {
      this.getTable()
    },
    methods:{
      getTable(){
        this.loading = true;
        dataQuery(this.queryParams).then(response =>{
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
      onSubmit() {
        this.queryParams.pageNum = 1;
        this.getTable();
      }
    }

  }

</script>
