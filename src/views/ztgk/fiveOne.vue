<template>
  <div class="pl20">
    <div class="search-border">
      <el-form ref="queryForm"  :model="queryParams" label-width="100px">
        <el-form-item label="选择时间">
          <el-date-picker
            v-model="queryParams.construction_date"
            align="right"
            type="year"
            placeholder="选择年">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="季度选择">
          <el-select v-model="queryParams.construction_quarter" placeholder='季度选择'>
            <el-option label="第一季度" value="1"></el-option>
            <el-option label="第二季度" value="2"></el-option>
            <el-option label="第三季度" value="3"></el-option>
            <el-option label="第四季度" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
      </el-form>
    </div>
    <div class="qy">
      <p class="p10"><span class="blueBox"></span>签约信息</p>
      <el-table :data="qytableData" :height="height" border style="width: 100%" v-loading="loading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading">
        <template v-for="(item,index) in qytableHeader" >
          <el-table-column v-if="index==0" :align="item.align" type="index" :prop="item.prop" :label="item.name" :width="item.width" :key="index" ></el-table-column>
          <el-table-column  v-else :prop="item.prop" :align="item.align" :label="item.name" :width="item.width" :key="index" show-overflow-tooltip></el-table-column>
        </template>
      </el-table>
      <!--<el-pagination-->
        <!--@size-change="handleSizeChange"-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page="this.pagination.currentPage"-->
        <!--:page-sizes="[10, 20, 30, 40]"-->
        <!--:page-size="10"-->
        <!--layout="total, sizes, prev, pager, next, jumper"-->
        <!--:total="this.pagination.total" class="center p20">-->
      <!--</el-pagination>-->
    </div>
    <div class="kg">
      <p class="p10"><span class="blueBox"></span>开工信息</p>
      <el-table :data="kgtableData"  border style="width: 100%" v-loading="loading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading">
        <template v-for="(item,index) in kgtableHeader" >
          <el-table-column v-if="index==0" :align="item.align" type="index" :prop="item.prop" :label="item.name" :width="item.width" :key="index" ></el-table-column>
          <el-table-column  v-else :prop="item.prop" :align="item.align" :label="item.name" :width="item.width" :key="index" show-overflow-tooltip></el-table-column>
        </template>
      </el-table>
    </div>
    <div class="gm">
      <p class="p10"><span class="blueBox"></span>观摩信息</p>
      <el-table :data="gmtableData"  border style="width: 100%" v-loading="loading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading">
        <template v-for="(item,index) in gmtableHeader" >
          <el-table-column v-if="index==0" :align="item.align" type="index" :prop="item.prop" :label="item.name" :width="item.width" :key="index" ></el-table-column>
          <el-table-column  v-else :prop="item.prop" :align="item.align" :label="item.name" :width="item.width" :key="index" show-overflow-tooltip></el-table-column>
        </template>
      </el-table>
    </div>
    <div class="sj">
      <p class="p10"><span class="blueBox"></span>考核信息</p>
      <el-table :data="sjtableData"  border style="width: 100%" v-loading="loading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading">
        <template v-for="(item,index) in khtableHeader" >
          <el-table-column v-if="index==0" :align="item.align" type="index" :prop="item.prop" :label="item.name" :width="item.width" :key="index" ></el-table-column>
          <el-table-column  v-else :prop="item.prop" :align="item.align" :label="item.name" :width="item.width" :key="index" show-overflow-tooltip></el-table-column>
        </template>
      </el-table>
    </div>
    <div class="tb">
      <p class="p10"><span class="blueBox"></span>通报信息</p>
      <el-table :data="tbtableData"  border style="width: 100%" v-loading="loading" element-loading-text="拼命加载中..." element-loading-spinner="el-icon-loading">
        <template v-for="(item,index) in tbtableHeader" >
          <el-table-column v-if="index==0" :align="item.align" type="index" :prop="item.prop" :label="item.name" :width="item.width" :key="index" ></el-table-column>
          <el-table-column  v-else :prop="item.prop" :align="item.align" :label="item.name" :width="item.width" :key="index" show-overflow-tooltip></el-table-column>
        </template>
      </el-table>
    </div>

  </div>
</template>


<script type="text/ecmascript-6">
  import {fiveOne} from '@/api/ztgk/ztgk'
    export default{
       data(){
          return{
            loading:false,
            height:'200',
            qytableHeader:[
              {name:'序号',prop:'',width:'50',align:'center'},
              {name:'项目名称',prop:'projectName',width:'300',align:'left'},
              {name:'项目所在地',prop:'projectAddress',width:'100',align:'center'},
              {name:'所属行业',prop:'projectIndustry',width:'140',align:'left'},
              {name:'总投资合计（亿元）',prop:'investmentTotal',width:'160',align:'center'},
              {name:'投资方国别及地区',prop:'investmentCity',width:'140',align:'center'},
              {name:'引资方',prop:'recipient',width:'140',align:'center'},
              {name:'投资方',prop:'investors',width:'200',align:'left'},
              {name:'建设内容',prop:'constructionContent',width:'200',align:'left'},
              {name:'时间',prop:'constructionDate',width:'100',align:'center'}
            ],
            kgtableHeader:[
              {name:'序号',prop:'',width:'50',align:'center'},
              {name:'开工标题',prop:'notifyTitle',width:'',align:'left'},
            ],
            gmtableHeader:[
              {name:'序号',prop:'',width:'50',align:'center'},
              {name:'观摩标题',prop:'viewTitle',width:'',align:'left'},
            ],
            khtableHeader:[
              {name:'序号',prop:'',width:'50',align:'center'},
              {name:'排名',prop:'assessRank',width:'',align:'left'},
            ],
            tbtableHeader:[
              {name:'序号',prop:'',width:'50',align:'center'},
              {name:'通报标题',prop:'notifyTitle',width:'',align:'left'},
            ],
            pagination:{
              total:1,
              currentPage:1
            },
            qytableData:[],
            kgtableData:[],
            gmtableData:[],
            sjtableData:[],
            tbtableData:[],
            // 查询参数
            queryParams: {
              pageNum: 1,
              pageSize: 10,
              construction_date:'2020',
              construction_quarter:'2'
            }
          }
       },
      created(){
        this.getTable()
      },
      methods:{
        getTable(){
          this.loading = true;
          fiveOne(this.queryParams).then(response =>{
            this.loading = false;
//            签约信息
            this.qytableData = response.data.data.signInfos;
//            开工信息
            this.kgtableData = response.data.data.ptStartprojectList;
//            观摩信息
            this.gmtableData = response.data.data.observeEmulateInfos;
//            考核信息
            this.sjtableData = response.data.data.assessmentInfos;
//            通报信息
            this.tbtableData = response.data.data.briefingInfos;
//            this.pagination.total = response.data.total;
//            this.pagination.currentPage = response.data.currentPage;
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

</style>
