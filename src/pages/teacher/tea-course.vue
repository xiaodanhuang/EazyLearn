<template>
	<div class="tea-course">
		<nav>
			<el-menu  class="el-menu-vertical-demo" >
				<el-menu-item @click="queryChapter(item.id)" v-for="(item, key,index) in courseList" :index="item.id+item.courseName">
					<span>{{item.courseName}}</span>
				</el-menu-item>
			</el-menu>
		</nav>
		<aside>
		<el-tabs v-model="courseContent" >
			<el-tab-pane label="公告" name="1">
				<textarea  maxlength="200" v-model="proclamation"></textarea>
				<el-button type="primary" plain @click="postProclamation()">修改公告</el-button>
			</el-tab-pane>
			<el-tab-pane label="目录" name="0">
				<div  v-if="!wareShow" class="chapter">
				<div class="chapter-nav">
					<el-button size="mini" @click="AddButton()" icon="el-icon-search">添加章节</el-button>
				</div>

				<ul class="chapter-list" v-for="item in  chapterList">
					<li>
						<span>{{item.chapterName}}</span>
						<i class="el-icon-view"@click="pdfShowButton(item.id)"></i>
						<i class="el-icon-edit" @click="EditButton(item.id)"></i>
						<i class="el-icon-delete" @click="DeleteButton(item.id)"></i>
					</li>
				</ul>
				</div>
				<div  v-if="wareShow"class="course-ware">
					<div class="back">
						<i style="float:left"class="el-icon-arrow-left" @click="pdfHideButton()"></i>
					</div>
					<div class="no-file">
						<div v-if="fileShow" class="no-data"></div>
						<div  v-if="!fileShow" class="my-file">
							<ul>
								<li v-for="item in courseWare">
									<span class="file">{{item.filename.replace(/\d+/g,'') }}</span>
									<a :href="'/downLoad?filename='+item.filename"><i class="el-icon-download" ></i></a>
									<i class="el-icon-delete" @click="DeleteWareButton(item.id,item.filename)"></i>
								</li>
							</ul>
						</div>
						<form id="form" method ="post" enctype ="multipart/form-data">
						<input type="file" name="file"  accept=".pdf,.pptx"/>
						<input name="chapterId"class="displayNone"type="text"v-model="chapterId">
						<el-button native-type="submit"@click="upFiles()">上传</el-button>
					</form>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
		</aside>
		<el-dialog title="添加课程章节" :visible.sync="chapterAdd" size="tiny"  :before-close="chapterClose">
			<span class="logo-small"></span>
			<div class="user-list">
				<el-input v-model="chapterMessage.chapterName" placeholder="请输入课程章节"></el-input>
			</div>
			<span slot="footer" class="dialog-footer">
    	<el-button @click="chapterClose()">取 消</el-button>
    	<el-button type="primary" @click="postChapterAdd()">确认添加</el-button>
  			</span>
		</el-dialog>
		<el-dialog title="编辑课程章节" :visible.sync="chapterEdit" size="tiny"  :before-close="chapterClose">
			<span class="logo-small"></span>
			<div class="user-list">
				<el-input v-model="chapterMessage.chapterName" placeholder="请输入课程章节"></el-input>
			</div>
			<span slot="footer" class="dialog-footer">
    	<el-button @click="chapterClose()">取 消</el-button>
    	<el-button type="primary" @click="postChapterEdit()">确认修改</el-button>
  			</span>
		</el-dialog>
	</div>
</template>

<script>
	  export default {
	  		name:'tea-course',
    data() {
      return {
		  chapterMessage:{
				id:'',
			  courseId:'',
              chapterName:''
		  },
		  filename:'zna',
		  chapterId:'',
		  wareShow:0,
          fileShow:1,
          proclamation:'',
          courseList:[],
          chapterAdd:false,
          chapterEdit:false,
          courseContent:0,
		  editData:{},
		  chapterList:[],
		  courseWare:[],
          imageUrl:''
	  }
    },
		  methods:{
              handleAvatarSuccess(file) {
                  this.imageUrl =  "file:///Users/xiaodanhuang/web%20program/EazyJava/upload/cdbe155a050af8023f5ee359fdecc29e.jpg";

			  },
              beforeAvatarUpload(file) {
                  const isJPG = file.type === 'image/jpeg';
                  const isLt2M = file.size / 1024 / 1024 < 2;

                  if (!isJPG) {
                      this.$message.error('上传头像图片只能是 JPG 格式!');
                  }
                  if (!isLt2M) {
                      this.$message.error('上传头像图片大小不能超过 2MB!');
                  }
                  return isJPG && isLt2M;
              },
              upFiles:function(){
                  var $this=this;
                  var  options={
                      url:'/upLoadFile', //form提交数据的地址
                      type:'post', //form提交的方式(method:post/get)
                      success:function(data){
                          if(data.length>0){
                              $this.courseWare=data;
                              $this.fileShow= 0;
                          }else{
                              $this.courseWare=data;
                              $this.fileShow= 1;
                          }

                      }, //提交成功后执行的回调函数
                      dataType:"json",//服务器返回数据类型
                      clearForm:true, //提交成功后是否清空表单中的字段值
                      restForm:true, //提交成功后是否重置表单中的字段值，即恢复到页面加载时的状态
                      timeout:6000 //设置请求时间，超过该时间后，自动退出请求，单位(毫秒)。
                  }
                  $("#form").ajaxForm(options);

              },
              postProclamation:function(){
                 var $this=this;
                  $.ajax({
                      url:'/teacherProclamationUpdate',
                      type:'post',
                      data:{
                          id:this.chapterMessage.courseId,
                          proclamation:this.proclamation
                      },
                      dataType: 'json',
                      success:function(data){
                          $this.proclamation=data.proclamation;
                          $this.$message('修改成功');
                      },
					  error:function(data){
                          console.log(data);
					  },
                      error:function(){
                          console.log('error');
                      }
                  });

			  },
              downloadButton:function(filename){
                  console.log(filename);
			  },
              pdfShowButton:function(id){
                  this.wareShow=!this.wareShow;
                  this.chapterId=id;
                  console.log(id);
                  var $this=this;
                  $.ajax({
                      url:'/teacherCourseWare',
                      type:'post',
                      data:{
                          chapterId:id
                      },
                      dataType: 'json',
                      success:function(data){
                          if(data.length>0){
                              $this.courseWare=data;
                              $this.fileShow= 0;
						  }else{
                              $this.courseWare=data;
                              $this.fileShow= 1;
						  }
                      },
                      error:function(){
                          console.log('error');
                      }
                  });
			  },
              pdfHideButton:function(){
                  this.wareShow=!this.wareShow;
			  },
              AddButton:function(){
                  this.chapterAdd=true;
			  },
              EditButton:function(id){
                  this.chapterMessage.id=id;
                  this.chapterEdit=true;
                  console.log(id);
	          },
              DeleteButton:function(id){
                  var $this=this;
                  this.$message('正在删除');
                  $.ajax({
                      url:'/teacherChapterDelete',
                      type:'post',
                      data:{
                          id:id,
                          courseId:this.chapterMessage.courseId,
                      },
                      dataType: 'json',
                      success:function(data){
                          $this.chapterList=data;
                      },
                      error:function(){
                          console.log('error');
                      }
                  });
			  },
              DeleteWareButton:function(id,filename){
                 var chapterId=filename.replace(/[^0-9]+/g, '');
                 var $this=this;
                  $.ajax({
                      url:'/fileDelete',
                      type:'post',
                      data:{
                          chapterId:chapterId,
                          filename:filename,
						  id:id
                      },
                      dataType: 'json',
                      success:function(data){
                          if(data.length>0){
                              $this.courseWare=data;
                              $this.fileShow= 0;
                          }else{
                              $this.courseWare=data;
                              $this.fileShow= 1;
                          }
                      },
                      error:function(){
                          console.log(' delete error');
                      }
                  });


			  },
              chapterClose:function(){
                  this.chapterAdd=false;
                  this.chapterEdit=false;
              },
              postChapterEdit:function(){
                  this.chapterEdit=false;
                  var $this=this;
                  $.ajax({
                      url:'/teacherChapterUpdate',
                      type:'post',
                      data:{
                          id:this.chapterMessage.id,
                          courseId:this.chapterMessage.courseId,
                          chapterName:this.chapterMessage.chapterName
                      },
                      dataType: 'json',
                      success:function(data){
                          $this.chapterList=data;
                          $this.chapterAdd=false;
                          $this.chapterMessage.chapterName="";
                      },
                      error:function(){
                          console.log('error');
                      }
                  });
			  },
              postChapterAdd:function(){
                  var $this=this;
                  this.chapterMessage.id=''+this.chapterMessage.courseId+($(".chapter-list li").length+1);
                  console.log( this.chapterMessage.id);
                  $.ajax({
                      url:'/teacherChapterAdd',
                      type:'post',
                      data:{
                          id:this.chapterMessage.id+1,
                          courseId:this.chapterMessage.courseId,
						  chapterName:this.chapterMessage.chapterName
                      },
                      dataType: 'json',
                      success:function(data){
                          $this.chapterList=data;
                          $this.chapterAdd=false;
                      },
                      error:function(){
                          console.log('error');
                      }
                  });
			  },
              queryChapter(index){
                 var  $this=this;
                  this.wareShow=0;
				  this.fileShow=1;
                  $(function() {
                      $('a.media').media({width:800, height:600});
                  });
                  this.chapterMessage.courseId=index;
                  $.ajax({
                      url:'/teacherByChapter',
                      type:'post',
                      data:{
                          courseId:index
                      },
                      dataType: 'json',
                      success:function(data){
                          $this.chapterList=data;
                      },
                      error:function(){
                          console.log('error');
                      }
                  });
                  $.ajax({
                      url:'/teacherByProclamation',
                      type:'post',
                      data:{
                          id:index
                      },
                      dataType: 'json',
                      success:function(data){
                         $this.proclamation=data.proclamation;
                      },
                      error:function(){
                          console.log('error');
                      }
                  });
			  }
		  },
		  mounted: function () {
              this.$nextTick(function () {
                  var $this=this;
                  let param = new URLSearchParams();
                  param.append("teacherNum",this.$store.state.teacherId);
                  this.$axios.post('/teacherByCourse',param).then(function (data) {
                      data=data.data;
                      var a=0;
                      $this.courseList=data;
                      console.log( $this.courseList);
                      $this.queryChapter(data[0].id);
                      $this.$store.commit('postCourseList', data.data);
                  }).catch(function (data) {
					  console.log(data);
				  });
              })

          },
      }
</script>

<style lang="scss" rel="stylesheet/scss" type="text/css">
	.displayNone {
		display: none;
	}
.tea-course{
	width:100%;
	height:100%;
	nav{
		text-align:left;
		padding:0px 10px 10px 10px;
		border-bottom: 1px solid #f5f5f5;
		width:200px;
	    height:100%;
		background: #272c2f;
		float:left;
		.course-add{
			position:relative;
			left:20px;
		}

	}
	aside {
		margin-left: 220px;
		height: 100%;
		.chapter-nav{
			text-align: left;
			background:transparent;
			border:none;
			padding:0px;
			padding-left:14px;
		}
		.chapter-list{
			width:100%;
			list-style: none;
			padding:0px;
		}
		.course-ware{
			text-align:center;
			.my-file{
				margin-bottom:20px;
			}

		}

	}
	textarea{
		resize: none;
		width:400px;
		height:200px;
		border-radius: 2px;
		box-shadow: 0 1px 3px rgba(0,0,0,.3);
		border: none;
		display:block;
		margin-left:50%;
		position:relative;
		left:-200px;
		margin-bottom:20px;
	}

    .user-list{
		.el-input {
			margin-bottom:10px;
		}
	}
	li span{
		list-style: none;
		display:inline-block;
		text-align: left;
		width:200px;
		text-align:left;


	}
	i{
		display:inline-block;
	}
	.el-tabs__header {
		margin: 0px 0px 25px 15px;
	}
	.no-data{
		width:200px;
		height:200px;
		background-image: url("../../assets/no-data.png");
		background-position: -400px 550px;
		display:inline-block;
	}
	.file{
		width:200px;
		display:inline-block;
	}
	.back:after{
		content:'';
		display:block;
		clear:both;
	}
}
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

</style>
