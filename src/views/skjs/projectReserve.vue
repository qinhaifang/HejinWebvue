<template>
  <div class="pl20">
    <div class="search-border">
      <p><span class="blueBox"></span>储备项目库</p>
      <el-form ref="queryForm"  :model="queryParams" label-width="100px">
        <el-form-item label="项目名称">
          <el-input v-model="queryParams.projectName" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="建设单位">
          <el-input v-model="queryParams.constructionUnit" placeholder="请输入单位"></el-input>
        </el-form-item>
        <el-form-item label="储备时间">
          <el-date-picker
            v-model="queryParams.storeTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
        <div class="clear"></div>
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
import {projectReserve} from '../../api/skjs/fourteenfive'
     export default{
      props:{},
      components:{},
      data(){
         return{
           loading:false,
           windowHeight:window.innerHeight-270,
           tableHeader:[
             {name:'序号',prop:'',width:'50',align:'center'},
             {name:'项目名称',prop:'projectName',width:'300',align:'left'},
             {name:'建设内容',prop:'constructionContent',width:'300',align:'left'},
             {name:'建设单位',prop:'constructionUnit',width:'160',align:'left'},
             {name:'总投资额（亿元）',prop:'investmentTotal',width:'200',align:'center'},
             {name:'储备时间',prop:'storeTime',width:'200',align:'left'},
             {name:'是否开工',prop:'isStart',width:'140',align:'center'},
             {name:'联系人',prop:'contactName',width:'160',align:'center'},
             {name:'联系电话',prop:'contactPhone',width:'200',align:'center'},
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
             constructionUnit:'',
             storeTime:''
           }
         }
       },
      created() {
        this.getTable()
      },
      methods:{
        getTable(){
          this.loading = true;
          projectReserve(this.queryParams).then(response =>{
            console.log(333,this.queryParams)
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
