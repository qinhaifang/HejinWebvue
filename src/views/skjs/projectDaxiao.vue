<template>
  <div class="pl20">
    <div class="search-border">
      <p><span class="blueBox"></span>达效库</p>
      <el-form ref="queryForm"  :model="queryParams" label-width="100px">
        <el-form-item label="项目名称">
          <el-input v-model="queryParams.projectName" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="竣工时间">
          <el-date-picker
            v-model="queryParams.completeYear"
            align="right"
            type="year"
            value-format="yyyy"
            placeholder="选择年">
          </el-date-picker>
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
  import {projectDaxiao} from '../../api/skjs/fourteenfive'
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
          {name:'项目名称',prop:'projectName',width:'',align:'left'},
          {name:'总投资额（亿元）',prop:'investmentTotal',width:'200',align:'center'},
          {name:'竣工时间',prop:'completeDate',width:'120',align:'center'},
          {name:'预计产值',prop:'outputDate',width:'140',align:'center'},
          {name:'就业人数',prop:'jobNumber',width:'120',align:'center'}
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
          projectName:undefined,
          constructionProperty:'',
          comleteYear:''
        }
      }
    },
    created() {
      this.getTable()
    },
    methods:{
      getTable(){
        this.loading = true;
        projectDaxiao(this.queryParams).then(response =>{
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
