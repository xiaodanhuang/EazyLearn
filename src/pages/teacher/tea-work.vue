<template>
	<div class="tea-work">
      <el-tabs v-model="nav" type="card">
        <el-tab-pane label="创建作业" name="first">
            <form id="form" method ="post" enctype ="multipart/form-data">
              <input name="teacherNum" type="hidden" v-model="courseForm.teacherNum" />

              <input name="courseId" type="hidden" v-model="courseForm.courseId"/>

              <el-input name="courseName"placeholder="请填写课程名称"v-model="courseForm.courseName">
              </el-input>
              <el-input name="workName"placeholder="请填写题目" v-model="courseForm.workName">
              </el-input>
                <div class="el-upload__text">
                  <i class="el-icon-upload"></i>
                  <input type="file" name="file"  accept=".pdf,.pptx"/>
                </div>
              <el-button native-type="submit" style="margin-top: 12px;" @click="saveButton()">保存</el-button>
          </form>
        </el-tab-pane>
        <el-tab-pane label="已下发作业" name="second" @tab-click="homeWorked()">
          <div v-if="ishomeWork"class="no-data"></div>
          <div v-if="!ishomeWork"class="course-list">
            <ul>
              <li v-for="item in courseData">
                <a class="course-detail">
                  <img src="../../assets/course-detail.png" class="course-pic"/>
                  <p class="course-name">{{item.filename}}</p>
                  <p class="course-teacher"><span>课程:</span><span>{{item.courseName}}</span></p>
                  <p class="course-teacher">
                    <span>下载学生已提交的作业:</span>
                    <a :href="'/homeDownLoad?filename='+item.src"><i class="el-icon-download"></i></a>
                  </p>
                  <a :href="'/homeDownLoad?filename='+item.src"><i class="el-icon-download"></i></a>
                  <i class="el-icon-delete" @click="workDelete(item.id,item.src)"></i>
                </a>
              </li>
            </ul>

          </div>
        </el-tab-pane>
      </el-tabs>


  </div>
</template>
<script>
  export default {
    name: 'tea-work',
    data() {
      return {
          ishomeWork:1,
          nav:'first',
          courseList:[],
          courseData: [{src:'',filename:'测试1',courseName:'数据结构'}],
          courseForm:{
              teacherNum:'',
              courseId:'',
              courseName:'',
              workName:''
          }

      }
    },
    mounted: function() {
      var height=$(".f-content").height();
      $(".work-make").height(height-60);
        this.$nextTick(function () {
            var $this=this;
            this.teacherNum=this.$store.state.teacherId;
            let param = new URLSearchParams();
            param.append("teacherNum",this.$store.state.teacherId);
            this.$axios.post('/teacherByCourse',param).then(function (data) {
                data=data.data;
                $this.courseList=data;
            }).catch(function (data) {
                console.log(data);
            });
            this.$axios.post('/homeWorked',param).then(function (data) {
                data=data.data;
                $this.courseData=data;
                if($this.courseData.length>0){
                    $this.ishomeWork=0;
                }
            }).catch(function (data) {
                console.log('homeworked');
            });
        })
    },

    methods: {
        homeWorked:function(){
            console.log("ahajjajaj");
        },
        workDelete:function(id,filename){
            console.log(id)
            var $this=this;
            $.ajax({
                url:'/workDelete',
                type:'post',
                data:{
                    id:id,
                    filename:filename,
                    teacherNum:this.$store.state.teacherId
                },
                dataType: 'json',
                success:function(data){
                    $this.courseData=data;
                    if($this.courseData.length>0){
                        $this.ishomeWork=0;
                    }
                },
                error:function(data){
                    console.log('作业删除失败');
                }
            });
        },
        saveButton:function(){
            for(let i=0;i<this.courseList.length;i++){
                if(this.courseForm.courseName==this.courseList[i].courseName){
                    this.courseForm.courseId=this.courseList[i].id;
                }
            }
            this.courseForm.teacherNum=this.$store.state.teacherId;
            var $this=this;
            var  options={
                url:'/upLoadWork', //form提交数据的地址
                type:'post', //form提交的方式(method:post/get)
                success:function(data){
                    var  h = $this.$createElement;
                    $this.$notify.error({
                        title: '',
                        message: h('i', { style: 'color: teal'}, '已发布作业'),
                        position: 'right-bottom',
                        offset: 300,
                        duration:1000
                    });
                    $this.courseForm={
                        teacherNum:'',
                            courseId:'',
                            courseName:'',
                            workName:''
                    }
                    $this.courseData=data;
                    if($this.courseData.length>0){
                        $this.ishomeWork=0;
                    }


                }, //提交成功后执行的回调函数
                error:function(){
                    console.log('false');
            },
                dataType: 'json',//服务器返回数据类型
                clearForm:true, //提交成功后是否清空表单中的字段值
                restForm:true, //提交成功后是否重置表单中的字段值，即恢复到页面加载时的状态
                timeout:6000 //设置请求时间，超过该时间后，自动退出请求，单位(毫秒)。
            };
            console.log(this.courseForm)
           $("#form").ajaxForm(options);
        }

    }

  }
</script>

<style lang="scss" rel="stylesheet/scss" type="text/scss">
    .displayNone {
        display: none;
    }
  .tea-work{
    width:100%;
    height:100%;
    .el-input{
        width:60%;
    }
    .el-upload__text{
        margin-top:20px;
    }
    .no-data{
        width:200px;
        height:200px;
        background:url("../../assets/no-data.png");
        background-position: -400px -300px;
        background-repeat: no-repeat;
        margin:0 auto;
    }
    form{
      margin-top:10%;
        .el-input{
            margin-bottom:20px;
        }

    }
    .course-list{
      width:100%;
      position:relative;
      overflow:auto;
      text-align: left;
      height:600px;
      ul{
        list-style: none;
        text-align:left;
        margin:auto 0;
        li {
          display: inline-block;
          position: relative;
          text-align: center;
          width:25%;
        }
      }
      .course-pic{
        width:224px;
        height:125px;

      }
      p{
        margin:10px;
      }
      .course-detail{
        display: inline-block;
        padding: 10px;
        margin:10px;
        border: 2px solid #F5F5F5;
        position: relative;
        font-weight:bold;

        i{

        }
      }
    }


  }


</style>
