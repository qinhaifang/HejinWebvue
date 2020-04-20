<template>
  <div class="tab">
    <div class="tab-left">
      <box-border></box-border>
      <el-tabs :tab-position="tabPosition" @tab-click="handleClick" v-model="activeName">
        <el-tab-pane name="一般性工业工程流程" label="一般性工业工程">
          <p><span class="blueBox"></span>一般性工业工程</p>
          <div :loading="loading" class="contents" v-html="contents">
            <viewer :contents="contents">
              {{contents}}
            </viewer>

          </div>
        </el-tab-pane>
        <el-tab-pane name="政府投资审批类工程" label="政府投资审批类工程">
          <p><span class="blueBox"></span>政府投资审批类工程</p>
          <div :loading="loading" class="contents" v-html="contents">{{contents}}</div>
        </el-tab-pane>
        <el-tab-pane name="社会投资备案类工程" label="社会投资备案类工程">
          <p><span class="blueBox"></span>社会投资备案类工程</p>
          <div :loading="loading" class="contents" v-html="contents">{{contents}}</div>
        </el-tab-pane>
        <el-tab-pane name="社会投资核准类工程" label="社会投资核准类工程">
          <p><span class="blueBox"></span>社会投资备案类工程</p>
          <div :loading="loading" class="contents" v-html="contents">{{contents}}</div>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import BoxBorder from '@/components/boxStyle'
  import {sp} from '@/api/sp/spProcess'
  export default{
    props:{},
    components:{
      BoxBorder,
    },
    data(){
      return{
        loading:false,
        tabPosition: 'left',
        activeName:'一般性工业工程流程',
        contents:'',
        queryParams: {
          type:'一般性工业工程流程'
        }
      }
    },
    created() {
      this.getTable()
    },
    methods:{
      handleClick(row) {
        this.queryParams.type = this.activeName;
        this.getTable();
      },
      getTable(){
        this.loading = true;
        sp(this.queryParams).then(response =>{
          this.loading = false;
          this.contents = response.data.rows[0].content
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
  .contents{
    padding: 10px 0;
  }
</style>



