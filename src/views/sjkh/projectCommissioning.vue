<template>
  <div class="pl20">
    <div class="search-border">
      <p><span class="blueBox"></span>投产项目 <small style="color: #d24747">(运城市发改委）</small></p>
      <el-form ref="queryForm"  :model="queryParams" label-width="100px">
        <el-form-item label="时间选择">
          <el-date-picker
            v-model="queryParams.constructionDate"
            type="year"
            value-format="yyyy"
            placeholder="选择日期">
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

    <table class="layui-table sjkh">
      <colgroup>
        <col width="300">
        <col width="400">
        <col width="100">
        <col width="100">
      </colgroup>
      <thead>
      <tr>
        <th>考核内容</th>
        <th>评分办法</th>
        <th>满分</th>
        <th>自评分</th>
      </tr>
      </thead>
      <tbody v-html="touchang">{{touchang}}</tbody>
    </table>
      <p style="color: #BDC9FE;padding: .5rem 0">*注：竣工投产项目指投资500万元以上、当年竣工投产的新、改、扩建项目。数据以市统计局入库数据为准，严禁重复申报，严禁虚报投资额。每季度由市工信局组织或委托第三方机构实地认定。</p>
  </div>
</template>

<script type="text/ecmascript-6">
  import {touchang} from '../../api/sjkh/sjkh'
  export default{
    props:{},
    components:{},
    data(){
      return{
        loading:false,
        touchang:{},
        // 查询参数
        queryParams: {
          constructionDate:'',
          constructionQuarter:''
        }
      }
    },
    created() {
      this.getTable()
    },
    methods:{
      getTable(){
        this.loading = true;
        touchang(this.queryParams).then(response =>{
          let data = response.data.rows[0];
          var $content ='<tr> <td> <span>工业投资增幅: '+data.gutouZangfu+' </span> <span>目标任务:  '+data.aimTask+'</span> <span>实际完成:  '+data.realyComplete+' </span> </td> <td>工业投资增幅完成目标任务得满分，未完成按比例扣分</td> <td rowspan="">8分</td> <td rowspan="">'+data.gutouFen+'</td> </tr> ' +
            '<tr> <td><span>全年竣工投产工业项目: '+data.allYearProject+' 个</span> <span>本季度竣工投产项目:  '+data.jiduProject+' 个</span></td> <td>全年一类，二类，三类区域工业项目竣工投产任务分别是12个，8个，4个，共计112个；每季度一类。二类。三类区域工业项目任务分别是3个，2个，1个，合计3分；一类区少完成一个减1分，超额完成一个加1分；二类区少完成一个减1.5分，超额完成一个加1.5分；三类区少完成一个减3分，超额完成一个加3分；累计记分不超过12分</td> <td>12分</td> <td>'+data.jungongFen+'</td> </tr>';
          this.touchang = $content;
          this.loading = false;
        })
      },
      onSubmit() {
        this.getTable();
      }
    }

  }

</script>
<style scoped>
  table tr th{
    height: 40px;
    line-height: 40px;
    border-bottom:1px solid #fff;
    border-right:1px solid #fff;
  }
</style>

