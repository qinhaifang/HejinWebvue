<template>
    <div>
      <p class="p20"><span class="blueBox"></span>十四五项目库</p>
      <el-table :data="tableData" border style="width: 100%">
        <template v-for="(item,index) in tableHeader">
          <el-table-column prop="date" :label="item.name" :width="item.width" :key="index" ></el-table-column>
        </template>
      </el-table>
      <page :pagination="pagination"></page>
    </div>
</template>

<script>
  import Page from '@/components/pagination'
    export default{
      props:{},
      components:{
        Page
      },
      data(){
         return{
           tableHeader:[
             {name:'序号',width:'80'},
             {name:'项目名称',width:'300'},
             {name:'建设内容和生产规模',width:'300'},
             {name:'预计总投资（亿元）',width:'200'},
             {name:'十四五”时期投资（亿元）',width:'200'},
             {name:'建设地点',width:'200'},
             {name:'建设起止年限',width:'200'},
             {name:'投资类型',width:'200'},
             {name:'是否纳入国家“十四五”规划',width:'200'},
             {name:'是否纳入省“十四五”规划',width:'200'},
             {name:'是否纳入市“十四五”规划',width:'200'},
             {name:'项目法人（筹建）单位',width:'200'},
             {name:'项目主管（责任）部门',width:'200'},
             {name:'项目主管部门联系人及电话',width:'200'},
           ],
           pagination:{
             total:30,
             currentPage:2
           },
           tableData: []
         }
       },
      methods:{
        getList(){

        }
      }

    }

</script>
