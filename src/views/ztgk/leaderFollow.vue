<template>
    <div class="tab">
      <div class="tab-left">
        <box-border></box-border>
        <el-tabs :tab-position="tabPosition">
          <el-tab-pane label="领导调研">
            <p><span class="blueBox"></span>领导调研</p>
            <el-table
              :data="tableData3"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
                width="">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="">
              </el-table-column>
              <el-table-column
                prop="province"
                label="省份"
                width="">
              </el-table-column>
              <el-table-column
                prop="city"
                label="市区"
                width="">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                width="300">
              </el-table-column>
              <el-table-column
                prop="zip"
                label="邮编"
                width="">
              </el-table-column>
            </el-table>
            <page :pagination="pagination"></page>
          </el-tab-pane>
          <el-tab-pane label="领导讲话">
            <p><span class="blueBox"></span>领导讲话</p>
            <el-table
              :data="tableData2"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
                width="">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                align="right">
              </el-table-column>
            </el-table>
            <page :pagination="pagination"></page>
          </el-tab-pane>
          <el-tab-pane label="动态信息">
            <p><span class="blueBox"></span>动态信息</p>
            <el-table
              :data="tableData3"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
                width="">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="">
              </el-table-column>
              <el-table-column
                prop="province"
                label="省份"
                width="">
              </el-table-column>
              <el-table-column
                prop="city"
                label="市区"
                width="">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                width="300">
              </el-table-column>
              <el-table-column
                prop="zip"
                label="邮编"
                width="">
              </el-table-column>
            </el-table>
            <page :pagination="pagination"></page>
          </el-tab-pane>
        </el-tabs>

      </div>
    </div>
</template>


<script>
  import BoxBorder from '@/components/boxStyle'
  import Page from '@/components/pagination'
    export default{
       props:{},
       components:{
          BoxBorder,
          Page
      },
      data(){
        return{
          tabPosition: 'left',
          pagination:{
            total:30,
            currentPage:2
          },
          tableData3: [{
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-08',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-06',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }],
          tableData2:[{
            date: '2016-05-07',
            name: '王小虎',
          },{
            date: '2016-05-07',
            name: '王小虎',
          }]

        }
      },
      methods:{

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



