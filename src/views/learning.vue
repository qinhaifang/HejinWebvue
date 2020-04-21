<template>
    <div class="learn">
      <!--<box-border></box-border>-->
      <p class="p20"><span class="blueBox"></span>学习交流</p>

      <ul class="list">
        <li v-for="(item,index) in listData" :key="index" @click="openDesc(item.id)">
          <div class="left">
            <img v-if="item.imageUrl !==''" src="item.imageUrl" width="100%" height="100%" alt="">
            <img v-else src="../assets/images/logo.png" width="100%" height="100%" alt="">
          </div>
          <div class="right">
            <h3>{{item.title}}</h3>
            <span class="date">{{item.createTime}}</span>
          </div>
          <div class="clear"></div>
        </li>
      </ul>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.pagination.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.pagination.total" class="center p20">
      </el-pagination>
    </div>
</template>


<script type="text/ecmascript-6">
  import {spProcess} from '@/api/sp/spProcess'
  import BoxBorder from '@/components/boxStyle'
    export default{
       props:{},
      components:{
        BoxBorder
      },
      data(){
        return{
          listData: [],
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
      created(){
        this.getList()
      },
      methods:{
        getList(){
          this.loading = true;
          spProcess(this.queryParams).then(response =>{
            this.listData = response.data.rows;
            this.pagination.total = response.data.total;
            this.pagination.currentPage = response.data.currentPage;
            this.loading = false;
          })
        },
        openDesc(id){
          this.$message(`这是一条消息提示 ${id}`);
        },
        handleSizeChange(val) {
          this.queryParams.pageSize = val;
          this.getList();
        },
        handleCurrentChange(val) {
          this.queryParams.pageNum = val;
          this.getList();
        }
      }

    }

</script>
<style scoped>
  .learn{
    position: relative;
    height: 100%;
  }
  .list li{
    padding: 10px 0;
    border-bottom: 1px dashed #9caaf2;
    position: relative;
  }
  .list .left{
    width: 20%;
  }
  .list .right{
    width: 78%;
  }
  .list .right .date{
    display: block;
    padding-top: 20px;
    position: absolute;
    bottom: 10%;
  }
</style>
