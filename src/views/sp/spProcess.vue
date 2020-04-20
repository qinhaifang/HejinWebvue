<template>
  <div class="tab">
    <div class="tab-left">
      <box-border></box-border>
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="领导调研">
          <p><span class="blueBox"></span>领导调研</p>
          <el-table
            :data="tableData"
            style="width: 100%">
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
        </el-tab-pane>
        <el-tab-pane label="领导讲话">
          <p><span class="blueBox"></span>领导讲话</p>
          <el-table
            :data="tableData"
            style="width: 100%">
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
        </el-tab-pane>
        <el-tab-pane label="动态信息">
          <p><span class="blueBox"></span>动态信息</p>
          <el-table
            :data="tableData"
            style="width: 100%">
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
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import BoxBorder from '@/components/boxStyle'
  import {spProcess} from '@/api/sp/spProcess'
  export default{
    props:{},
    components:{
      BoxBorder,
    },
    data(){
      return{
        tabPosition: 'left',
        tableHeader:[
          {name:'序号',prop:'',width:'50',align:'center'},
          {name:'标题',prop:'projectName',width:'',align:'left'},
          {name:'创建时间',prop:'projectName',width:'300',align:'right'},
        ],
        tableData: [],
        pagination:{
          total:1,
          currentPage:1
        },
        queryParams: {
          type:1,
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
        spProcess(this.queryParams).then(response =>{
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



