<template>
  <div class="tab">
    <div class="tab-left">
      <box-border></box-border>
      <el-tabs :tab-position="tabPosition" @tab-click="handleClick" v-model="activeName">
        <el-tab-pane name="1" label="高位推动">
          <p><span class="blueBox"></span>高位推动</p>
          <div :loading="loading" class="contents" v-html="contents">
            <viewer :contents="contents">
              {{contents}}
            </viewer>

          </div>
        </el-tab-pane>
        <el-tab-pane name="2" label="挂图作战">
          <p><span class="blueBox"></span>挂图作战</p>
          <div :loading="loading" class="contents" v-html="contents">{{contents}}</div>
        </el-tab-pane>
        <el-tab-pane name="3" label="周周研判">
          <p><span class="blueBox"></span>周周研判</p>
          <div :loading="loading" class="contents" v-html="contents">{{contents}}</div>
        </el-tab-pane>
        <el-tab-pane name="4" label="压茬推进">
          <p><span class="blueBox"></span>压茬推进</p>
          <div :loading="loading" class="contents" v-html="contents">{{contents}}</div>
        </el-tab-pane>
        <el-tab-pane name="5" label="严格考核">
          <p><span class="blueBox"></span>严格考核</p>
          <div :loading="loading" class="contents" v-html="contents">{{contents}}</div>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import BoxBorder from '@/components/boxStyle'
  import {tjjz} from '@/api/ztgk/ztgk'
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
        contents:'',
        queryParams: {
          type:'1'
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
        tjjz(this.queryParams).then(response =>{
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



