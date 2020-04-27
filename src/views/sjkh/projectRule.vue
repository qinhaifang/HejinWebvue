<template>
  <div class="pl20">
    <div class="search-border">
      <p><span class="blueBox"></span>入规项目 <small style="color: #d24747">(运城市统计局）</small></p>
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
      <tbody v-html="rule">{{rule}</tbody>
    </table>
  </div>
</template>

<script type="text/ecmascript-6">
  import {rule} from '../../api/sjkh/sjkh'
  export default{
    props:{},
    components:{},
    data(){
      return{
        loading:false,
        rule:'',
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
        rule(this.queryParams).then(response =>{
          let data = response.data.rows[0];
          var $content ='<tr> <td> <span>固定资产投资增幅: '+data.gutouZangfu+'  </span> <span>目标任务:  '+data.aimTask+' </span> <span>实际完成:  '+data.realyComplete+'</span> </td> <td>固定资产投资增幅完成目标任务计12分，未完成按比例扣分，超额完成1个百分点加0.3分，加分不超过3分，总分不超过15分</td> <td rowspan="" class="center">15分</td> <td rowspan="" class="center">'+data.gutouFen+'</td> </tr>' +
            ' <tr> <td> ' +
            '<span>入规工业企业全年目标任务：</span> ' +
            '<span> '+data.oneQuarterComplete+' </span> ' +
            '<span>'+data.twoQuarterComplete+'</span> ' +
            '<span>'+data.threeQuarterComplete+'</span> ' +
            '<span>'+data.fourQuarterComplete+'</span> ' +
              //'<span>当年新增新投产工业企业:  000  个</span> ' +
            '</td> <td>入规工业企业按照第一季度完成全年目标任务的10%，上半年20%，前三季度40%，全年100%分配任务，完成任务计4.6分，完不成任务按比例计分;超额完成目标每个加0.2分，加分不超过0.4分。当年增加新投产工业企业1个及以上加0.5分</td> <td class="center">5分</td> <td class="center">'+data.rugFen+'</td> </tr>' +
            ' <tr> <td> <span>入限服务企业全年目标任务：</span> ' +
            '<span>  '+data.serviceOneQuarterComplete+'</span> ' +
            '<span>'+data.serviceTwoQuarterComplete+'</span>' +
            ' <span>'+data.serviceThreeQuarterComplete+'  </span> ' +
            '<span>'+data.serviceFourQuarterComplete+' </span> </td>' +
            ' <td>入限服务企业按照第一季度完成全年目标任务的10%，上半年20%，前三季度40%，全年100%分配任务，完成任务计4.6分，完不成任务按比例计分;超额完成目标每个加0.2分，加分不超过0.4分。总分不超过5分</td> <td class="center">5分</td> <td class="center">'+data.serviceFen+'</td> </tr>' +
            ' <tr> <td> <span>入限贸易企业全年目标任务：</span> <span> '+data.myiOneQuarterComplete+'</span> ' +
            '<span> '+data.myiTwoQuarterComplete+'</span>' +
            ' <span>'+data.myiThreeQuarterComplete+'</span> ' +
            '<span>'+data.myiFourQuarterComplete+'</span> </td>' +
            ' <td>入限贸易企业按照第一季度完成全年目标任务的10%，上半年20%，前三季度40%，全年100%分配任务，完成任务计4.5分，完不成任务按比例计分;超额完成目标每个加0.1分，加分不超过0.5分。总分不超过5分</td> <td class="center">5分</td> <td class="center">'+data.myiFen+'</td> </tr>';
          this.rule = $content;
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
