<template>
  <div class="tab">
    <div class="tab-left">
      <box-border></box-border>
      <el-tabs :tab-position="tabPosition" @tab-click="handleClick" v-model="activeName">
        <el-tab-pane label="工作亮点" name="1">
          <p><span class="blueBox"></span>工作亮点</p>
          <el-table
            :data="tableData"
            style="width: 100%" :loading="loading">
            <template >
              <el-table-column type="index" prop="" label="序号" width="60"></el-table-column>
              <el-table-column prop="title" label="标题" width=""></el-table-column>
              <el-table-column prop="createTime" label="创建时间" width="100"></el-table-column>
              <el-table-column prop="" label="操作" width="100" fixed="right">
                <template slot-scope="scope">
                  <el-button @click="openClick(scope)" type="text" size="small">查看</el-button>
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
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import BoxBorder from '@/components/boxStyle'
  import {spProcess,spWork} from '@/api/sp/spProcess'
  export default{
    props:{},
    components:{
      BoxBorder,
    },
    data(){
      return{
        loading:false,
        activeName:'1',
        tabPosition: 'left',
        tableHeader:[
          {name:'序号',prop:'',width:'50',align:'center'},
          {name:'标题',prop:'title',width:'',align:'left'},
          {name:'创建时间',prop:'createTime',width:'200',align:'center'},
//            {name:'操作',width:'100',align:'right',fixed:"right"},
        ],
        tableData: [],
        pagination:{
          total:1,
          currentPage:1
        },
        queryParams: {
          type:5,
          pageNum: 1,
          pageSize: 10
        }
      }
    },
    created() {
      this.getTable()
    },
    methods:{
      rowClick(row){
        this.$router.push({name:'publicPage',params:{id:row.id,type:'leaderFollow'}})
//          console.log(row.id)
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
      },
      handleClick(row) {
        this.queryParams.type = this.activeName;
        this.getTable();
      },
      getTable(){
        this.loading = true;
        spProcess(this.queryParams).then(response =>{
          this.tableData = response.data.rows;
          this.pagination.total = response.data.total;
          this.pagination.currentPage = response.data.currentPage;
          this.loading = false;
        })
      },
      click(record,index){
        return{
          on:{
            click:()=>{
              this.$message(`${record},${index}`);
            }
          }
        }

      },
      handleSizeChange(val) {
        this.queryParams.pageSize = val;
        this.getTable();
      },
      handleCurrentChange(val) {
        this.queryParams.pageNum = val;
        this.getTable();
      }
    }
  }

</script>
<style scoped>
  .tab{
    display: flex;
    height: 100%;
    /*padding: 0 20px;*/
  }
  .tab-left{
    width: 100%;
    position: relative;
  }
  .right{
    /*width: 79%;*/
    margin-left: 10px;
    position: relative;
  }
  .el-tab-pane {
    height: 100%;
    padding: 10px 0;
    border-bottom: 1px solid #1b93a0;
  }
</style>



