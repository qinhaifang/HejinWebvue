<template>
  <div class="tab">
    <div class="tab-left">
      <box-border></box-border>
      <el-tabs :tab-position="tabPosition" @tab-click="handleClick" v-model="activeName">
        <el-tab-pane name="9" label="五大招商模式">
          <p><span class="blueBox"></span>五大招商模式</p>
          <div :loading="loading" class="contents" v-html="contents">
            <viewer :contents="contents">
              {{contents}}
            </viewer>

          </div>
        </el-tab-pane>
        <el-tab-pane name="10" label="招商作战图">
          <p><span class="blueBox"></span>招商作战图</p>
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
        activeName:'9',
        contents:'',
        queryParams: {
          type:'9'
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



