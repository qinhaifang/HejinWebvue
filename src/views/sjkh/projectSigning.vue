<template>
  <div class="pl20">
    <div class="search-border">
      <p><span class="blueBox"></span>签约项目 <small style="color: #d24747">(运城市商务局、运城市招商办）</small></p>
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
    <table cellspacing="0" cellpadding="0" class="sjkh">
      <colgroup>
        <col width="280">
        <col width="300">
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
      <tbody v-html="signing">{{signing}}</tbody>
    </table>
  </div>
</template>

<script type="text/ecmascript-6">
  import {signing} from '../../api/sjkh/sjkh'
  export default{
    props:{},
    components:{},
    data(){
      return{
        loading:false,
        // 查询参数
        queryParams: {
          constructionDate:'',
          constructionQuarter:''
        },
        signing:''
      }
    },
    created() {
      this.getTable()
    },
    methods:{
      getTable(){
        this.loading = true;
        signing(this.queryParams).then(response =>{
          let data = response.data.rows[0],signing = '';
          signing = '<tr><td rowspan="">战略新兴产业项目'+data.zhanTotal+'</td> <td rowspan="">凡签约1亿元战略新兴产业项目得2分，2亿得4分，以此类推</td> <td rowspan="" style="text-align:center;"></td> <td rowspan="" style="text-align:center;">'+data.zhanScore+'</td> </tr> ' +
            '<tr> <td>传统产业项目'+data.chuanTotal+'</td> <td rowspan="">凡签约1亿元传统产业项目得1分，2亿得2分，以此类推</td> <td rowspan="" style="text-align:center;"></td> <td rowspan="" style="text-align:center;">'+data.chuanScore+'</td> </tr>' +
            ' <tr> <td>非工业项目'+data.noindustrialTotal+'</td> <td rowspan="">凡签约1亿元非工业项目得0.6分，2亿得1.2分，以此类推</td> <td rowspan="" style="text-align:center;"></td> <td rowspan="" style="text-align:center;">'+data.noindustrialScore+'</td> </tr> ' +
            '<tr> <td>开工率： '+data.startworkDivision+'   <span style="color: #c9c9c9;display: block;font-size: .8rem">开工率=当年签约并开工项目个数/当年签约项目个数*100%</span></td><td rowspan="">签约项目半年后开工率要达到40%，为达到目标每低一个百分点扣0.1分</td> <td rowspan="" style="text-align:center;"></td> <td rowspan="" style="text-align:center;">'+data.startworkScore+'</td> </tr>' +
            ' <tr> <td colspan="2">本季度本单位综合分值=战略新兴项目得分+传统产业项目得分+非工业项目得分</td> <td rowspan="" style="text-align:center;">15分</td> <td rowspan="" style="text-align:center;">'+data.sum+'</td> </tr> ' ;
          if(data.isNo1 == 0){
            signing += '<tr> <td colspan="2">季度签约项目综合分值=综合分值排名是否第一 <span style="display: block;"><input type="radio" disabled checked>是<span>15分</span></span> <span style="display: block;"><input type="radio" readonly="readonly" disabled>否<span>季度签约项目分值=本季度本单位各类签约项目综合分值/本季度第一名单位各类项目综合分值*15</span></span> </td> <td rowspan="" style="text-align:center;">15分</td> <td rowspan="" style="text-align:center;">15分</td> </tr>'
          }else {
            signing += '<tr> <td colspan="2">季度签约项目综合分值=综合分值排名是否第一 <span style="display: block;"><input type="radio" disabled>是15分</span> <span style="display: block;"><input type="radio"  checked disabled>否<span>季度签约项目分值=本季度本单位各类签约项目综合分值/本季度第一名单位各类项目综合分值*15</span></span> </td> <td rowspan="" style="text-align:center;">15分</td> <td rowspan="" style="text-align:center;"></td> </tr>';
          }
          this.signing = signing;
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
    border-right: 1px solid #fff;
  }
</style>
