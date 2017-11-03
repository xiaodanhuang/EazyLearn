<template>
	<div class="tea-course">
		<div class="el-uploaded">
			<el-collapse v-model="activeName" accordion v-for="(item, index) in courseList">
				<el-collapse-item  v-bind:title="item.courseName" v-bind:name="index">
				<li v-for=" item in item.chapter">
					{{item.chapter}}
				</li>
				</el-collapse-item>
			</el-collapse>
		</div>
			<i class="no-data"></i>
		<div>
		</div>
		<div class="loaded-course">
			<div class="course-list">
				<li v-for="item in courseware">
          <i class="course-icon"></i>
					{{item}}
				</li>
			</div>
		</div>
		<div class="upload-course">
			<el-upload class="upload-demo" action="" :file-list="fileList3">
				<el-button size="small" type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">只能上传pdf/PPT/word文件</div>
			</el-upload>
			<el-button type="text" @click="dialoglogin = true">发布公告</el-button>
			<el-dialog title="" :visible.sync="dialoglogin" size="tiny" >
				<span class="logo-small"></span>
				<el-input placeholder="小蛋黄"icon="edit"></el-input>
				<span slot="footer" class="dialog-footer">
    			<el-button @click="dialoglogin = false">取 消</el-button>
    			<el-button type="primary" @click="dialoglogin = false">安全退出</el-button>
  			</span>
			</el-dialog>
		</div>

	</div>
</template>

<script>
	  export default {
	  		name:'tea-course',
    data() {
      return {
          courseList:[
			  {courseName:'数据结构',
				  id:'12344',
				  chapter:[
                      {chapter:'',id:''},
                      {chapter:'',id:''},
                      {chapter:'',id:''}
				  ]
			  }
		  ],
          dialoglogin: false,
          courseware:[
            '课件一',
            '课件二',
            '课件三',
            '课件四'
          ],
		  fileList3: [{
              name: 'food.pdf',
              url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
              status: 'finished'
          }],
          activeName: '1',
          defaultProps: {
          children: 'children',
          label: 'label'
        }
	  }
    }, mounted: function () {
              this.$nextTick(function () {
                  var $this=this;
                  $.ajax({
                      url:'/teacherByCourse',
                      type:'post',
                      data:{
                          teacherNum:1401
                      },
                      dataType: 'json',
                      success:function(data){
                          var a=0;
                          $this.courseList=data;
                          for(var x in $this.courseList){
                              $.ajax({
                                  url:'/teacherByChapter',
                                  type:'post',
                                  data:{
                                      courseId:$this.courseList[x].id
                                  },
                                  dataType: 'json',
                                  success:function(data){
                                      console.log(data);
                                      if(data!=null&&data) {
                                          var chapter = [];
                                          for (var y in data) {
                                              var obj = {
                                                  chapter: data[y].chapterName,
                                                  id: data[y].id
                                              }
                                              chapter.push(obj);

                                          }
                                          if(chapter.length==0){

                                              chapter.push({
                                                  chapter:'暂无数据'
                                              });
										  }
										  $this.$set($this.courseList[a], 'chapter', chapter);

                                      }
                                      else{
                                          $this.$set($this.courseList[a], 'chapter', '暂无数据');
									  }
                                      a++;

                                  },
                                  error:function(){
                                      console.log('error');
                                  }
                              });
                          }
                          console.log($this.courseList);

                      },
                      error:function(){
                          console.log('error');
                      }
                  });


              })

          },
      }
</script>

<style lang="scss" rel="stylesheet/scss" type="text/css">
.tea-course{
	width:100%;
	height:100%;
	.upload-course{
		margin-top:30px;
		float:left;
		.logo-small {
			background-position: 5px -20px;
			background-repeat: no-repeat;
			width: 200px;
			height: 40px;
			background-image: url(../../assets/logo-small.png);
			display: block;
			margin: 0 auto;
			margin-bottom: 10px;
		}
	}
	.loaded-course {
    	float: left;
    	width: 400px;
    	height: 100%;
    .course-list {
       list-style: none;
       margin-top: 30px;
      li{
		  list-style: none;
        height:30px;
        .course-icon{
          width:18px;
          height:18px;
          display:inline-block;
          background: url("../../assets/iconItems.png");
          background-size: 100%;
          position:relative;
          top: 4px;

        }
      }
    }
	}
	.el-uploaded{
		width:200px;
		height:100%;
		float:left;
		text-align: left;
	 	color: #ffffff;
	 	background-color: #272C2F;

		.el-tree{
			border:none;
			background-color: #272C2F!important;
			color: #ffffff;
		}
		.el-tree-node__content:hover {
   			 background:  #272C2F!important;
		}
	}
	.no-data{
		background: url(../../assets/no-data.png);

	}
	li{
		list-style: none;
	}
}
</style>
