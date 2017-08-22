<template>
	<div class="tea-work">
    <nav>
      <a class="work-new"v-bind:class="{ workchoose: workchoose}" @click="workchoose=1">创建作业</a>
      <a class="work-hot"v-bind:class="{workchoose: !workchoose }"@click="workchoose=0">已下发的作业</a>
    </nav>
    <div class=" work-make" v-if="workchoose">
      <div class="work-content">
        <div class="work-title">
          <div class="work-kind">试卷题目</div>
          <el-input placeholder="请填写题目" icon="edit"></el-input>
          <el-button style="margin-top: 12px;">保存</el-button>
        </div>
        <div class="work-radio">
          <div class="work-kind">单选题目</div>
          <el-input placeholder="请填写题目" icon="edit"></el-input>
          <el-input placeholder="选项" icon="edit"></el-input>
          <a>x</a>
          <el-input placeholder="选项"icon="edit"></el-input>
          <a>x</a>
          <div class="el-input new-radio">新建选项</div>
          <el-button style="margin-top: 12px;">保存</el-button>
        </div>
        <div class="work-checkbox">
          <div class="work-kind">多选题目</div>
          <el-input placeholder="请填写题目" icon="edit"></el-input>
          <el-input placeholder="选项" icon="edit"></el-input>
          <a>x</a>
          <el-input placeholder="选项"icon="edit"></el-input>
          <a>x</a>
          <div class="el-input new-radio">新建选项</div>
          <el-button style="margin-top: 12px;">保存</el-button>
        </div>
        <div class="work-check">
          <div class="work-kind">判断题目</div>
          <el-input placeholder="请填写题目" icon="edit"></el-input>
          <el-button style="margin-top: 12px;">保存</el-button>
        </div>
        <div class="work-input">
          <div class="work-kind">填空</div>
          <el-input placeholder="请填写题目" icon="edit"></el-input>
          <el-button style="margin-top: 12px;">保存</el-button>
        </div>
        <div class="work-input">
          <div class="work-true">判断</div>
          <el-input placeholder="请填写题目" icon="edit"></el-input>
          <el-button style="margin-top: 12px;">保存</el-button>
        </div>
        <div class="work-think">
          <div class="work-kind">思考题</div>
          <el-input placeholder="请填写题目" icon="edit"></el-input>
          <el-button style="margin-top: 12px;">保存</el-button>
        </div>
        <el-button style="margin:0 auto;margin: 12px 0px 10px 0px;">保存为作业</el-button>

      </div>
    </div>
    <div class="work-made" v-if="!workchoose">
      <div class="home-list">
        <ul>
          <li>
            <a class="work-detail">
              <P>JAVA阶段测试(一)</P>
              <img src="../../assets/work-java.png" />
              <p><span>截止时间:</span><span>2017.05.06</span></p>
              <el-rate v-model="value5" disabled show-text text-color="#ff9900" text-template="{value}"></el-rate>
            </a>
          </li>
        </ul>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'tea-work',
    data() {
      return {
        checked:false,
        workchoose: true,
        input2: '',
        value5: 3.7,
        workTemplate:[
          '单选题',
          '多选题',
          '填空题',
          '判断题',
          '思考题'
        ]
      }
    },
    mounted: function() {
      var height=$(".f-content").height();
      $(".work-make").height(height-60);


    },
    methods: {
      handleClose(tag) {
        console.log(1);

      }
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss" type="text/css">
  .teacher{
    overflow:auto;
    padding-bottom: 10px;
  }
  .tea-work {
    position: relative;
    overflow: auto;
    z-index: 1;

    .displayNone {
      display: none;
    }
    li {
      list-style: none;
    }
    nav {
      width: 100%;
      border-bottom: 1px solid #000000;
      height: 50px;
      margin-top: 10px;
      border: 1px solid #e0e0e0;

      .work-new, .work-hot {
        display: inline-block;
        float: left;
        line-height: 50px;
        cursor: pointer;
        width: 100px;
      }

      .workchoose, .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__inner:hover {
        border: none;
        border-bottom-color: #e0e0e0;
        color: #8391a5;
        width: 100px;
      }

    }

    .work-content {
      height: 100%;
      margin-left: 200px;
      text-align: left;
      overflow: auto;
      position: relative;

      .work-kind {
        text-align: left;
        padding: 10px;
      }

      .el-input {
        width: 80%;
        margin-top: 20px;

      }

      .new-radio {
        display: inline-block;
        zoom: 1;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border: 1px dashed #e0e0e0;
        padding: 6px 10px;
        background: #fafafa;
        color: #b2b2b2;
        cursor: pointer;
      }

      .work-made {

        .home-list {

          li {
            list-style: none;
            .work-detail {
              width: 217px;
              height: 262px;
              display: inline-block;
              border: 2px;
            }
          }
        }
      }
    }
  }


</style>
