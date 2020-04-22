<template>
  <div class="pl20">
    <div class="search-border">
      <p><span class="blueBox"></span>周周研判</p>
      <el-form ref="queryForm"  :model="queryParams" label-width="100px">
        <el-form-item label="时间选择">
          <el-date-picker
        v-model="queryParams.year"
        type="year"
        value-format="yyyy"
        placeholder="选择日期">
      </el-date-picker>
        </el-form-item>
        <el-form-item label="月选择">
          <el-date-picker
            v-model="queryParams.month"
            type="month"
            value-format="MM"
            placeholder="选择月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="周选择">
          <el-select v-model="queryParams.week" placeholder='季度选择'>
            <el-option label="第一周" value="1"></el-option>
            <el-option label="第二周" value="2"></el-option>
            <el-option label="第三周" value="3"></el-option>
            <el-option label="第四周" value="4"></el-option>
          </el-select>
        </el-form-item>

        <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
      </el-form>
    </div>

    <el-table :data="tableData" :height="windowHeight" border style="width: 100%" v-loading="loading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading">
      <template >
        <el-table-column type="index" prop="" label="序号" width="60"></el-table-column>
        <el-table-column prop="meetingTitle" label="会议主题" width=""></el-table-column>
        <el-table-column prop="mettingTime" label="会议时间" width="100" align="center"></el-table-column>
        <el-table-column prop="" label="操作" width="200" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button @click="openClick(scope)" type="text" size="small">会议议程</el-button>
            <el-button @click="openClick(scope)" type="text" size="small">会议纪要</el-button>
          </template>
        </el-table-column>
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
  import {weekJudged} from '@/api/gtzz/gtzz'
  export default{
    props:{},
    components:{
      Page
    },
    data(){
      return{
        loading:false,
        windowHeight:window.innerHeight-270,
//        tableHeader:[
//          {name:'序号',prop:'',width:'50',align:'center'},
//          {name:'会议主题',prop:'meetingTitle',width:'300',align:'left'},
//          {name:'会议内容',prop:'mettingTime',width:'300',align:'left'},
//          {name:'会议时间',prop:'mettingTime',width:'160',align:'center'}
//        ],
        pagination:{
          total:1,
          currentPage:1
        },
        tableData: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          year:'',
          week:'',
          month:'',
        }
      }
    },
    created() {
      this.getTable()
    },
    methods:{
      getTable(){
        this.loading = true;
        weekJudged(this.queryParams).then(response =>{
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
      },
      openClick(scope){
        this.$alert(scope.row.content,scope.row.title , {
          confirmButtonText: '确定',
          callback: action => {
//              this.$message({
//                type: 'info',
//                message: `action: ${ action }`
//              });
          }
        });
      }
    }

  }

</script>
