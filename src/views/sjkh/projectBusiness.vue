<template>
  <div class="pl20">
    <div class="search-border">
      <p><span class="blueBox"></span>优化营商环境 <small style="color: #d24747">(运城市行政审批局）</small></p>
      <el-form ref="queryForm"  :model="queryParams" label-width="100px">
        <el-form-item label="时间选择">
          <el-date-picker
            v-model="queryParams.constructionDate"
            value-format="yyyy"
            type="year"
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
      <tbody v-html="business">{{business}</tbody>
    </table>
  </div>
</template>

<script type="text/ecmascript-6">
  import {business} from '../../api/sjkh/sjkh'
  export default{
    props:{},
    components:{},
    data(){
      return{
        loading:false,
        business:'',
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
        business(this.queryParams).then(response =>{
          let data = response.data.rows[0];
          var $content ='<tr><td>'+data.assessmentContent1+'</td> <td>深化企业投资项目承诺制改革，政府统一服务事项、企业承诺事项、流程再造等重大改革事项落地见效。适用于承诺制的企业项目办理达到100；</td> <td rowspan="" class="center">1分</td> <td rowspan="">'+data.assessmentContent1+'</td> </tr> ' +
            '<tr> <td>'+data.assessmentContent2+'</td> <td>编制多规合一，形成一张蓝图</td> <td rowspan="" class="center">1分</td> <td rowspan="">'+data.assessmentContent2+'</td> </tr> ' +
            '<tr> <td>'+data.assessmentContent3+'</td> <td>90%以上政务服务事项实现“一网通办”</td> <td rowspan="" class="center">1分</td> <td rowspan="">'+data.assessmentContent3+'</td> </tr>' +
            ' <tr> <td>'+data.assessmentContent4+'</td> <td>70%以上政务服务事项实现“一窗办理”</td> <td rowspan="" class="center">1分</td> <td rowspan="">'+data.assessmentContent4+'</td> </tr> ' +
            '<tr> <td>'+data.assessmentContent5+'</td> <td>行政审批办理时限在法定时限基础上减少70%以上</td> <td rowspan="" class="center">1分</td> <td rowspan="">'+data.assessmentContent5+'</td> </tr> ' +
            '<tr> <td>'+data.assessmentContent6+'</td> <td>相对集中行政许可权改革情况</td> <td rowspan="" class="center">1分</td> <td rowspan="">'+data.assessmentContent6+'</td> </tr> ' +
            '<tr> <td>'+data.assessmentContent7+'</td> <td>乡、镇便民服务中心和村（社区）便民服务站点实现全覆盖</td> <td rowspan="" class="center">0.5分</td> <td rowspan="">'+data.assessmentContent7+'</td> </tr> ' +
            '<tr> <td>'+data.assessmentContent8+'</td> <td>全省“一网通办”65项高频事实现“最多跑一次”或“不见面审批”</td> <td rowspan="" class="center">0.5分</td> <td rowspan="">'+data.assessmentContent8+'</td> </tr>' +
              //' <tr> <td colspan="2">总计</td> <td>7分</td> <td></td> </tr> ' +
            '<tr> <td>'+data.assessmentContent9+'</td> <td>纪委监委对优化营商环境具体工作落实情况的监督检查结果</td> <td class="center">2分</td> <td>'+data.assessmentContent9+'</td> </tr>' +
            ' <tr> <td>'+data.assessmentContent10+'</td> <td>“零投诉”营商环境创建工作</td> <td class="center">1分</td> <td>'+data.assessmentContent10+'</td> </tr> ' +
            '<tr> <td>'+data.assessmentContent11+'</td> <td>工作受到中央、省、市通报表彰的加0.5，0.3，0.2分，通报批评的扣0.5，0.3，0.2分；按最高分数只进行一次加减分；承接全省或全市“放管服效”改革及营商环境工作会议或活动的加0.3分、0.2分</td> <td></td> <td>'+data.assessmentContent11+'</td> </tr>';
          this.business = $content;
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
