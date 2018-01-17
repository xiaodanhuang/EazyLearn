<template>
	<div class="stu-detail">
		<div class="stu-courselist">
			<img class="course-pic":src="$store.state.courseSrc" />
			<div class="course-detail">
				<div class="course-name">课程名称：{{$store.state.courseName}}</div>
				<div class="tea-name">讲师：{{$store.state.courseTeacher}}</div>
				<el-button class="course-add" @click="courseAdd()">{{isCourse}}</el-button>
				<el-button class="course-add" @click="hostCommentButton()">添加评论</el-button>
			</div>
		</div>
		<div class="clear"></div>
		<el-tabs v-model="activeName" >
			<el-tab-pane label="公告" name="first">
				{{proclamation}}
			</el-tab-pane>
			<el-tab-pane label="目录" name="second">
				<div class="tea-catalog">
					<li v-for="item in catalog">
						<span class="chapterName">{{item.chapterName}}</span>
						<span class="play-icon" @click="pdfShowButton(item.id)"></span>
					</li>
				</div>
			</el-tab-pane>
			<el-tab-pane label="讨论区" name="third">
				<div class="tea-question">
					<li v-for="(item, key, index) in questionList">
						<div>
						<img :src="item.avater">
						<span class="stu-information">
                    	<div class="name">{{item.username}}</div>
                    	<div class="time">{{item.commentTime}}</div>
						</span>
						<el-button type="text" @click="CommentButton(item.id,key)">
							<span class="btn-conment"></span>
						</el-button>
						</div>
						<div class="host-comment">{{item.comment}}</div>
						<div class="guest-comment" v-for="list in item.guestlist">
							{{list.username}}:{{ list.comment }}
						</div>
					</li>
				</div>

			</el-tab-pane>
		</el-tabs>
		<el-dialog title="添加回复" :visible.sync="isDialog" size="tiny" :before-close="commentClose() ">
			<el-input placeholder="回复消息啦啦啦" icon="edit" v-model="guest.comment"></el-input>
			<span slot="footer" class="dialog-footer">
    			<el-button @click="dialogClose()">取 消</el-button>
    			<el-button type="primary" @click="conment()">评论</el-button>
  			</span>
		</el-dialog>
		<el-dialog title="添加评论" :visible.sync="isHost" size="tiny" :before-close="commentClose() ">
			<el-input placeholder="添加评论" icon="edit" v-model="guest.comment"></el-input>
			<span slot="footer" class="dialog-footer">
    			<el-button @click="dialogClose()">取 消</el-button>
    			<el-button type="primary" @click="hostPost()">确认添加</el-button>
  			</span>
		</el-dialog>
		<el-dialog title="目录课件列表" :visible.sync="isWare" size="tiny" :before-close="commentClose() ">
			<div v-if="fileShow" class="no-data"></div>
			<div  v-if="!fileShow" class="my-file">
				<ul>
					<li v-for="item in wareFile">
						<span class="file">{{item.filename.replace(/\d+/g,'') }}</span>
						<a :href="'/downLoad?filename='+item.filename"><i class="el-icon-download" ></i></a>
					</li>
				</ul>
			</div>
			<span slot="footer" class="dialog-footer">
    			<el-button @click="dialogClose()">取 消</el-button>
    			<el-button type="primary" @click="hostPost()">确认添加</el-button>
  			</span>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		name: 'stu-detail',
		data() {
			return {
			    wareFile:[],
                isHost:false,
				isWare:false,
                fileShow:1,
				isCourse:'添加课程',
                proclamation:'我是',
			    value5:3.7,
                activeName: 'first',
				catalog:[],
                isDialog:false,
                isHost:false,
                answer:[],
                questionList:[],
				guest:{
                    key:'',
                    comment:'',
					hostId:'',
					stuId:''
				}

			}
		},
		mounted: function() {

            var  $this=this;
            $.ajax({
                url:'/teacherByProclamation',
                type:'post',
                data:{
                    id:this.$store.state.courseId
                },
                dataType: 'json',
                success:function(data){
                    console.log(data);
                    $this.proclamation=data.proclamation;
                },
                error:function(){
                    console.log('error');
                }
            });
            $.ajax({
                url:'/teacherByChapter',
                type:'post',
                data:{
                    courseId:this.$store.state.courseId
                },
                dataType: 'json',
                success:function(data){
                    $this.catalog=data;
                },
                error:function(){
                    console.log('error');
                }
            });
            $.ajax({
                url:'/stuCourseByComment',
                type:'post',
                data:{
                    courseId:this.$store.state.courseId
                },
                dataType: 'json',
                success:function(data){
                    console.log(data);
                    $this.questionList=data;
                },
                error:function(){
                    console.log('error');
                }
            });
            $.ajax({
                url:'/stuCourseQuery',
                type:'post',
                data:{
                    stuId:this.$store.state.stuId,
                    courseId:this.$store.state.courseId
                },
                dataType: 'json',
                success:function(data){
                   if(data.length==1){
                       $this.isCourse='已添加课程';
				   }else{
                       $this.isCourse='添加课程';
				   }
                },
                error:function(){
                    console.log('error');
                }
            });

	
		},
		methods: {
            courseAdd:function(){
                console.log(this.$store.state.courseId);
                console.log(this.$store.state.stuId);
                var $this=this;
                if(this.isCourse!='已添加课程') {
                    $.ajax({
                        url: '/stuCourseAdd',
                        type: 'post',
                        data: {
                            stuId: this.$store.state.stuId,
                            courseId: this.$store.state.courseId
                        },
                        dataType: 'json',
                        success: function (data) {
                            if (data == 1) {
                                var h = $this.$createElement;
                                $this.$notify.error({
                                    title: '',
                                    message: h('i', {style: 'color: teal'}, '添加成功'),
                                    position: 'right-bottom',
                                    offset: 300,
                                    duration: 1000

                                });
                                $this.isCourse = '已添加课程';
                            }
                            else {
                                $this.$notify.error({
                                    title: '',
                                    message: h('i', {style: 'color: teal'}, '添加失败'),
                                    position: 'right-bottom',
                                    offset: 300,
                                    duration: 1000

                                });
                            }
                        },
                        error: function () {
                            console.log('error');
                        }
                    });
                }
			},
            pdfShowButton:function(id){
                var $this=this;
                $.ajax({
                    url:'/teacherCourseWare',
                    type:'post',
                    data:{
                        chapterId:id
                    },
                    dataType: 'json',
                    success:function(data){
                       $this.wareFile=data;

                       $this.isWare=true;
                        if(data.length>0){
                            $this.fileShow= 0;
                        }else{
                            $this.fileShow= 1;
                        }
                    },
                    error:function(){
                        console.log('error');
                    }
                });
            },
            conment(){
                this.guest.stuId=this.$store.state.stuId;
                this.isDialog =false;
                console.log(this.guest);
                var $this=this;
                $.ajax({
                    url:'/stuGuestAdd',
                    type:'post',
                    data:{
                        commentId:this.guest.hostId,
                        stuId:this.guest.stuId,
                        comment:this.guest.comment

                    },
                    dataType: 'json',
                    success:function(data){
                        console.log(data);
                        $this.questionList[$this.guest.key].guestlist=data;
                        $this.guest.comment=''

                    },
                    error:function(){
                        console.log('error');
                    }
                });


            },
			hostPost:function(){
                var $this=this;
                var date= new Date().Format("yyyy-MM-dd hh:mm");
                var id= $(".tea-question li").length+1;
                $.ajax({
                    url:'/stuCommentAdd',
                    type:'post',
                    data:{
                        id: id,
						courseId:this.$store.state.courseId ,
						hostId:this.$store.state.stuId,
						comment:this.guest.comment,
						commentTime: date


                    },
                    dataType: 'json',
                    success:function(data){
                        console.log(data);
                        $this.questionList=data;
                        $this.guest.comment=''
                        $this.isHost=false;

                    },
                    error:function(){
                        console.log('error');
                    }
                });
			},
			CommentButton:function(id,key){
                this.guest.hostId=id;
                this.guest.key=key;
                this.isDialog= true;


			},
            hostCommentButton:function(){
                this.isHost=true;
			},
            commentClose :function() {
            },
			dialogClose:function(){
                this.isHost=false;
                this.isDialog=false;
                this.isWare=false;

			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss" type="text/css">
	.displayNone{
		display:none;
	}
	.stu-detail {
		height:100%;
		.clear{
			clear: both;
		}
		.course-pic{
			width:400px;
			height:200px;
			background:url("../../assets/course-detail.png");
			background-size:cover;
			margin:20px;
			display:inline-block;
			float:left;

		}
		.course-detail{
			 width:400px;
			 height:200px;
			 margin:20px;
			 float:left;
		     text-align:left;
			.stu-icon{
				width:27px;
				height:19px;
				background-position: -55px -350px !important;
				background:url("../../assets/ui_sprite.png");
				display:inline-block;
			}
			.stu-number{
				font-size:12px;
				position: relative;
				top:-7px;
			}
			.tea-name{
				font-size:16px;
				margin-top:5px;
			}
			.course-add{;
				margin-top: 70px;

			}

		 }
	     .no-data{
			  width:200px;
			  height:200px;
			  background:url("../../assets/no-data.png");
			  background-position: -400px -1100px;
			  background-repeat: no-repeat;
			  margin:0 auto;
		 }
		 .tea-proclamation{
			 width:80%;
			 height:500px;
			 margin:0 auto;

		 }
		 .tea-catalog{
			 width:80%;
			 text-align:left;
			 padding-left:20px;
			 margin:0 auto;
			 overflow: auto;
			 height: 200px;
			 li{
				 list-style: none;
				 border-bottom: 1px dashed #e0e0e0;
			     height:30px;
			     margin-top:5px;
				 .play-icon{
					 display:inline-block;
					 width: 13px;
					 height: 15px;
					 background: url(../../assets/listIcons.png);
					 background-position:0px -1025px;
					 float:right;
				 }

			 }
	     }
		.tea-question{
			height:350px;
			overflow:auto;

			li{
				list-style: none;
				text-align:left;
				width:80%;
				margin:0 auto;
				margin-bottom:10px;
				padding: 5px 0px 10px 20px;
				border-bottom: 1px dashed #e0e0e0;
				overflow: auto;

			}
			img{
				width: 50px;
				height: 50px;
				border-radius: 25px;
			}
			.stu-information{
				display:inline-block;
				text-align:left;
				position: relative;
				top: -10px;
				.name{
					font-size:14px;
					width:100px;
					overflow:hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				.time{
					font-size:12px;
				}
		}
		.el-button--text {
			float: right;
			.btn-conment{
				display:inline-block;
				width:50px;
				height:30px;
				background:url("../../assets/btn-comment.png");
				background-size: cover;
				float:right;
			}
		}
		.guest-comment {
			font-size: 12px;
		}


	}
	.chapterName{
		display:inline-block;
		width:80px;
	}
	.el-dialog{
		.el-input{
			width:80%;
		}
	.no-data{
		width:200px;
		height:200px;
		background-image: url("../../assets/no-data.png");
		display:inline-block;
	}

	}





	}
</style>