<template>
  <div class="pl20">
    <div class="search-border">
      <p><span class="blueBox"></span>签约项目 <small style="color: #d24747">(运城市商务局、运城市招商办）</small></p>
      <el-form ref="queryForm"  :model="queryParams" label-width="100px">
        <el-form-item label="时间选择">
          <el-date-picker
            v-model="queryParams.constructionDate"
            type="year"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="季度选择">
          <el-select v-model="queryParams.constructionQuarter" placeholder='季度选择'>
            <el-option label="第一季度" value="一季度"></el-option>
            <el-option label="第二季度" value="二季度"></el-option>
            <el-option label="第三季度" value="三季度"></el-option>
            <el-option label="第四季度" value="四季度"></el-option>
          </el-select>
        </el-form-item>

        <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
      </el-form>
    </div>

    <el-table :data="tableData" :height="windowHeight" border style="width: 100%" v-loading="loading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading">
      <el-table-column
        prop="date"
        label="考核内容"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="评分办法"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="满分">
      </el-table-column>
      <el-table-column
        prop="address"
        label="自评分">
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import {signing} from '../../api/sjkh/sjkh'
  export default{
    props:{},
    components:{},
    data(){
      return{
        loading:false,
        windowHeight:window.innerHeight-280,
        tableHeader:[
          {name:'序号',prop:'',width:'50',align:'center'},
          {name:'项目名称',prop:'projectName',width:'300',align:'left'},
          {name:'建设内容和生产规模',prop:'constructionContent',width:'300',align:'left'},
          {name:'预计总投资（亿元）',prop:'estimatedTotalInvestment',width:'160',align:'center'}
        ],
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }
        ],
        // 查询参数
        queryParams: {
          constructionDate:'',
          constructionQuarter:''
        }
      }
    },
    created() {
      this.getTable()
    },
    methods:{
      getTable(){
        this.loading = true;
        signing(this.queryParams).then(response =>{
          this.tableData = response.data.rows;
          this.loading = false;
        })
      },
      onSubmit() {
        this.getTable();
      }
    }

  }

</script>
