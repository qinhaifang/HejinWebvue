<template>
    <div>
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
    export default{
      props:{
        pagination:{
          type:Object,
          default: ()=>{}
        }
      },
      methods: {
        handleSizeChange(val) {
          this.$parent.getTable();
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          this.$parent.getTable();
          console.log(`当前页: ${val}`);
        }
      },
      data() {
        return {

        };
      }
    }

</script>
