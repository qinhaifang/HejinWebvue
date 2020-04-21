<template>
    <div class="pl20">
      <div class="search-border">
        <p><span class="blueBox"></span>十四五项目库</p>
        <el-form ref="queryForm"  :model="queryParams" label-width="100px">
          <el-form-item label="项目名称">
            <el-input v-model="queryParams.projectName" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="项目法人单位">
            <el-input v-model="queryParams.impersonalEntity" placeholder="请输入单位"></el-input>
          </el-form-item>
          <el-form-item label="项目主管部门">
            <el-input v-model="queryParams.competentDepartment" placeholder="请输入部门"></el-input>
          </el-form-item>
          <el-form-item label="投资类型">
            <el-input v-model="queryParams.investmentType" placeholder="请输入投资类型"></el-input>
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
  import Page from '@/components/pagination'
  import {fourtenfive} from '../../api/skjs/fourteenfive'
    export default{
      props:{},
      components:{
        Page
      },
      data(){
         return{
           loading:false,
           windowHeight:window.innerHeight-270,
           tableHeader:[
             {name:'序号',prop:'',width:'50',align:'center'},
             {name:'项目名称',prop:'projectName',width:'300',align:'left'},
             {name:'建设内容和生产规模',prop:'constructionContent',width:'300',align:'left'},
             {name:'预计总投资（亿元）',prop:'estimatedTotalInvestment',width:'160',align:'center'},
             {name:'"十四五"时期投资（亿元）',prop:'fourteenFiveInvestment',width:'200',align:'center'},
             {name:'建设地点',prop:'constructionAddress',width:'200',align:'left'},
             {name:'建设起止年限',prop:'constructionStartEndYear',width:'140',align:'center'},
             {name:'投资类型',prop:'investmentType',width:'160',align:'center'},
             {name:'是否纳入国家“十四五”规划',prop:'isCountryPlan',width:'200',align:'center'},
             {name:'是否纳入省“十四五”规划',prop:'isProvincePlan',width:'200',align:'center'},
             {name:'是否纳入市“十四五”规划',prop:'isCityPlan',width:'200',align:'center'},
             {name:'项目法人（筹建）单位',prop:'impersonalEntity',width:'200',align:'center'},
             {name:'项目主管（责任）部门',prop:'competentDepartment',width:'200',align:'center'},
             {name:'项目主管部门联系人',prop:'competentName',width:'170',align:'center'},
             {name:'项目主管部门联系电话',prop:'contactPhone',width:'170',align:'center'},
           ],
           pagination:{
             total:1,
             currentPage:1
           },
           tableData: [],
           // 查询参数
           queryParams: {
             pageNum: 1,
             pageSize: 10,
             projectName:undefined,
             impersonalEntity:'',
             competentDepartment:'',
             investmentType:''
           }
         }
       },
      created() {
        this.getTable()
      },
      methods:{
        getTable(){
          this.loading = true;
          fourtenfive(this.queryParams).then(response =>{
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
