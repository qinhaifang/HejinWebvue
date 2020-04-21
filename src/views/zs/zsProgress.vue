<template>
  <div class="tab">
    <div class="tab-left">
      <box-border></box-border>
      <el-tabs :tab-position="tabPosition" @tab-click="handleClick" v-model="activeName">
        <el-tab-pane name="1" label="洽谈项目表">
          <div class="search-border">
            <p><span class="blueBox"></span>洽谈项目表</p>
            <el-form ref="queryForm"  :model="queryParams" label-width="100px">
              <el-form-item label="项目名称">
                <el-input v-model="queryParams.projectName" placeholder="项目名称"></el-input>
              </el-form-item>
              <el-form-item label="项目所在地">
                <el-input v-model="queryParams.projectAddress" placeholder="项目所在地"></el-input>
              </el-form-item>
              <el-form-item label="所属行业">
                <el-input v-model="queryParams.projectIndustry" placeholder="所属行业"></el-input>
              </el-form-item>
              <el-form-item label="选择时间">
                <el-date-picker
                  v-model="queryParams.constructionDate"
                  align="right"
                  type="year"
                  format="yyyy"
                  placeholder="选择年">
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
        <el-tab-pane name="2" label="拟签约项目表">
          <div class="search-border">
            <p><span class="blueBox"></span>拟签约项目表</p>
            <el-form ref="queryForm"  :model="queryParams" label-width="100px">
              <el-form-item label="项目名称">
                <el-input v-model="queryParams.projectName" placeholder="项目名称"></el-input>
              </el-form-item>
              <el-form-item label="项目所在地">
                <el-input v-model="queryParams.projectAddress" placeholder="项目所在地"></el-input>
              </el-form-item>
              <el-form-item label="所属行业">
                <el-input v-model="queryParams.projectIndustry" placeholder="所属行业"></el-input>
              </el-form-item>
              <el-form-item label="选择时间">
                <el-date-picker
                  v-model="queryParams.constructionDate"
                  align="right"
                  type="year"
                  format="yyyy"
                  placeholder="选择年">
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
        <el-tab-pane name="3" label="签约项目表">
          <div class="search-border">
            <p><span class="blueBox"></span>签约项目表</p>
            <el-form ref="queryForm"  :model="queryParams" label-width="100px">
              <el-form-item label="项目名称">
                <el-input v-model="queryParams.projectName" placeholder="项目名称"></el-input>
              </el-form-item>
              <el-form-item label="项目所在地">
                <el-input v-model="queryParams.projectAddress" placeholder="项目所在地"></el-input>
              </el-form-item>
              <el-form-item label="所属行业">
                <el-input v-model="queryParams.projectIndustry" placeholder="所属行业"></el-input>
              </el-form-item>
              <el-form-item label="选择时间">
                <el-date-picker
                  v-model="queryParams.constructionDate"
                  align="right"
                  type="year"
                  format="yyyy"
                  placeholder="选择年">
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
        <el-tab-pane name="4" label="落地项目表">
          <div class="search-border">
            <p><span class="blueBox"></span>落地项目表</p>
            <el-form ref="queryForm"  :model="queryParams" label-width="100px">
              <el-form-item label="项目名称">
                <el-input v-model="queryParams.projectName" placeholder="项目名称"></el-input>
              </el-form-item>
              <el-form-item label="项目所在地">
                <el-input v-model="queryParams.projectAddress" placeholder="项目所在地"></el-input>
              </el-form-item>
              <el-form-item label="所属行业">
                <el-input v-model="queryParams.projectIndustry" placeholder="所属行业"></el-input>
              </el-form-item>
              <el-form-item label="选择时间">
                <el-date-picker
                  v-model="queryParams.constructionDate"
                  align="right"
                  type="year"
                  format="yyyy"
                  placeholder="选择年">
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
        <el-tab-pane name="5" label="开工项目表">
          <div class="search-border">
            <p><span class="blueBox"></span>开工项目表</p>
            <el-form ref="queryForm"  :model="queryParams" label-width="100px">
              <el-form-item label="项目名称">
                <el-input v-model="queryParams.projectName" placeholder="项目名称"></el-input>
              </el-form-item>
              <el-form-item label="项目所在地">
                <el-input v-model="queryParams.projectAddress" placeholder="项目所在地"></el-input>
              </el-form-item>
              <el-form-item label="所属行业">
                <el-input v-model="queryParams.projectIndustry" placeholder="所属行业"></el-input>
              </el-form-item>
              <el-form-item label="选择时间">
                <el-date-picker
                  v-model="queryParams.constructionDate"
                  align="right"
                  type="year"
                  format="yyyy"
                  placeholder="选择年">
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
  import {zsProgress} from '@/api/zsyz/task'
  export default{
    props:{},
    components:{
      BoxBorder,
    },
    data(){
      return{
        loading:false,
        tabPosition: 'left',
        activeName:'1',
        windowHeight:window.innerHeight-280,
        tableHeader:[
          {name:'序号',prop:'',width:'50',align:'center'},
          {name:'项目名称',prop:'projectName',width:'300',align:'left'},
          {name:'项目所在地',prop:'projectAddress',width:'100',align:'center'},
          {name:'所属行业',prop:'projectIndustry',width:'100',align:'center'},
          {name:'总投资合计(亿元)',prop:'investmentTotal',width:'140',align:'center'},
          {name:'投资方国别及地区',prop:'investmentCity',width:'200',align:'left'},
          {name:'引资方',prop:'recipient',width:'140',align:'left'},
          {name:'投资方',prop:'investors',width:'200',align:'left'},
          {name:'建设内容',prop:'constructionContent',width:'240',align:'left'},
          {name:'时间',prop:'constructionDate',width:'100',align:'center'}
        ],
        pagination:{
          total:1,
          currentPage:1
        },
        tableData: [],
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          projectType:'1',
          projectAddress:'',
          projectIndustry:'',
          constructionDate:'',
          constructionQuarter:''
        }
      }
    },
    created() {
      this.getTable()
    },
    methods:{
      handleClick(row) {
        this.queryParams.projectType = this.activeName;
        this.getTable();
      },
      getTable(){
        this.loading = true;
        zsProgress(this.queryParams).then(response =>{
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



