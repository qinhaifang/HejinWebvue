<template>
  <div class="pl20">
    <div class="search-border">
      <p><span class="blueBox"></span>在建项目 <small style="color: #d24747">(运城市发改委）</small></p>
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
        <col width="120">
        <col width="">
        <col width="300">
        <col width="100">
        <col width="100">
      </colgroup>
      <thead>
        <tr>
          <th colspan="2">考核内容</th>
          <th>评分办法</th>
          <th>满分</th>
          <th>自评分</th>
        </tr>
      </thead>
      <tbody v-html="reBuilt">{{reBuilt}}</tbody>
    </table>

  </div>
</template>

<script type="text/ecmascript-6">
  import {reBuilt} from '../../api/sjkh/sjkh'
  export default{
    props:{},
    components:{},
    data(){
      return{
        loading:false,
        reBuilt:'',
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
        reBuilt(this.queryParams).then(response =>{
          let data = response.data.rows[0];
          let $content = '<tr> <td rowspan="2">省级重点项目</td> <td rowspan=""> <span>年度项目数量： '+data.shengTotal+'   个</span> <span>在建：  '+data.shengstartTotal+'   个</span> <span>新开工:  '+data.shengNew+'   个</span> <span>总投资规模:  '+data.zguimo+' 亿元</span> </td> <td>年度项目数量考核从高到低排名，排名第一记满分，后续位次按0.1分递减排队；项目数量相同，排队优先顺序以在建，新开工，总投资规模为依据</td> <td rowspan="" class="center">3.5分</td> <td rowspan="">'+data.sheng1Score+'</td> </tr>' +
            ' <tr> <td>年度计划投资完成率: '+data.yearplanDivision+' </td> <td>年度计划投资完成率按从高到低排名，排名第一满分，后续名次按照0.1分递减；无省级重点项目按照县（市、区）、运城开发区省级重点项目排队最低得分计分。前期项目开工后投资完成额可纳入计分</td> <td rowspan="" class="center">3.5分</td> <td rowspan="">'+data.sheng2Score+'</td> </tr>' +
            ' <tr> <td rowspan="2">"1311"重大工程项目</td> <td rowspan="">计划投资完成率：'+data.oneplanDivision+'</td> <td >计划投资完成率由高到低排名，排名第一记满分，后续位次按0.1分递减</td> <td rowspan="" class="center">3分</td> <td rowspan="">'+data.one1Score+'</td> </tr>' +
            ' <tr> <td> <span>投资完成额:  '+data.oneTotal+'   亿元</span> <span>全市“1311”重大工程项目投资完成额： '+data.onecityTotal+'    亿元</span> <span>投资完成额占全市“1311”重大工程项目投资完成额比重：'+data.citytotalDivision+' </span> </td> <td >投资完成额占全市“1311”重大工程项目投资完成额比重，按区域分类由高到低排名，第一名记满分，后续位次按0.1分递减</td> <td rowspan="" class="center">3分</td> <td rowspan="">'+data.one2Score+'</td> </tr>' +
            ' <tr> <td rowspan="3">季度集中开工项目</td> <td rowspan=""> <span>项目开工： '+data.jiduCount+'  个</span> <span>年度计划新开工项目总数： '+data.yearplanCount+'   个</span> <span>一季度开工率： '+data.onejiduDivision+'   </span> <span>二季度开工率：  '+data.twojiduDivision+'  </span> <span>三季度开工率： '+data.threejiduDivision+'   </span> </td> <td>开工项目个数占年度计划新开工项目总数比例从高到低排名，排名第一记满分，后续位次按0.1分递减，一季度达不到30%，二季度达不到80%，三季度达不到100%分值为零</td> <td rowspan="" class="center">3分</td> <td rowspan="">'+data.jidu1Score+'</td> </tr>' +
            ' <tr> <td rowspan=""> <span>新开工项目中产业项目： '+data.industryCount+'   个（不含房地产项目）</span> <span>新开工项目总数：'+data.newStart+'    个</span> <span>新开工项目中产业项目占新开工项目总数比例：'+data.industrynewDivision+'</span> </td> <td>新开工项目中产业项目占新开工项目总数比例从高到低排名，排名第一记满分，后续位次依次按照0.1分递减，运城开发区不低于60%，其它一类和二类区不低于55%，三类区不低于50%，低于此标准的不计分</td> <td rowspan="" class="center">3分</td> <td rowspan="">'+data.jidu2Score+'</td> </tr>';
          if(data.isHomecourt == 0){
            $content += '<tr> <td rowspan="">本季度是全市集中开工主会场</td> <td>凡作为全市集中开工主会场的县（市、区）、运城开发区每一次加0.2分奖励分值</td> <td rowspan="" class="center">0.2分</td> <td rowspan=""></td> </tr>';
          }else{
            $content += '<tr> <td rowspan="">本季度不是全市集中开工主会场</td> <td>凡作为全市集中开工主会场的县（市、区）、运城开发区每一次加0.2分奖励分值</td> <td rowspan="" class="center">0.2分</td> <td rowspan=""></td> </tr>';
          }
          $content +=' <tr> <td rowspan="3">项目建设库</td> <td rowspan=""> <span>项目储备库动态总投资： '+data.storeTotal+'  亿元</span> <span>上年度实际完成投资总量： '+data.investMoney+'  亿元</span> <span>项目储备库动态总投资达到上年度实际完成投资总量： '+data.mulpitle+'  倍</span> </td> <td>项目储备库动态总投资达到上年度实际完成投资总量3倍以上,占1分，达不到要求不计分</td> <td rowspan="" class="center">1分</td> <td rowspan="">'+data.store1Score+'</td> </tr>' +
            ' <tr> <td rowspan=""> <span>项目建设库年度计划投资:  '+data.yearPlan+'   亿元</span> <span>当年市下达投资任务:  '+data.shiTask+'    亿元</span> <span>项目建设库年度计划投资达到当年市下达投资任务:  '+data.mulpitleTask+'   倍</span> </td> <td >项目建设库年度计划投资达到当年市下达投资任务1.2倍以上，占3分，达不到要求不计分</td> <td rowspan="" class="center">3分</td> <td rowspan="">'+data.store2Score+'</td> </tr>' +
            ' <tr> <td rowspan="">项目入库管理和月调度: '+data.dispatch+'</td> <td >项目入库管理和月调度占2分，未达到要求每次减0.1分</td> <td rowspan="" class="center">2分</td> <td rowspan="">'+data.store3Score+'</td> </tr>';
          this.reBuilt = $content;
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
    border:1px solid #fff;
  }
  table tbody tr td{
    border:1px solid #fff;
  }
</style>
