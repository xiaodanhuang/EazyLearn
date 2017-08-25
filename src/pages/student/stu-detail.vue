<template>
	<div class="stu-detail">
		<div class="stu-courselist">
			<div class="course-pic"></div>
			<div class="course-detail">
				<div class="course-name">web开发大全</div>
				<span class="stu-icon"></span>
				<span class="stu-number">4567</span>
				<el-rate v-model="value5" disabled show-text text-color="#ff9900" text-template="{value}"></el-rate>
				<div class="tea-name">讲师：郑帝元</div>
				<el-button class="course-add">添加课程</el-button>
			</div>
		</div>
		<div class="clear"></div>
		<el-tabs v-model="activeName" >
			<el-tab-pane label="公告" name="first"></el-tab-pane>
			<el-tab-pane label="目录" name="second"></el-tab-pane>
			<el-tab-pane label="讨论区" name="third"></el-tab-pane>
		</el-tabs>
		<div class="no-data displayNone"></div>
		<div class="tea-proclamation displayNone">
			<span>作业必须在9月1日之前完成，否则无成绩。</span>
			<span>一2017:09:12 12:08</span>
		</div>
		<div class="tea-catalog">
			<div>第一章</div>
			<li v-for="item in catalog">
				{{item}}
				<span class="play-icon"></span>
			</li>

		</div>
		<div class="tea-question">
			<li v-for="item in questionList">
				<img src="../../assets/avatar.png">
				<span class="stu-information">
                    <div class="name">{{item.name}}</div>
                    <div class="time">{{item.time}}</div>
                </span>
				<el-button type="text" @click="dialogconment = true">
					<span class="btn-conment"></span>
				</el-button>
				<div class="question">{{item.word}}</div>
				<div class="answer">
					<div v-for="item in answer">
						{{item}}
					</div>

				</div>
			</li>
		</div>
		<el-dialog title="" :visible.sync="dialogconment" size="tiny" :before-close="handleClose">
			<el-input placeholder="回复消息啦啦啦" icon="edit" v-model="anserComent"></el-input>
			<span slot="footer" class="dialog-footer">
    	<el-button @click="dialogconment = false">取 消</el-button>
    	<el-button type="primary" @click="conment()">评论</el-button>
  			</span>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		name: 'stu-detail',
		data() {
			return {
			    value5:3.7,
                activeName: 'first',
				catalog:[
				    'java的初步认识',
					'java初步语法',
					'java继承',
					'java接口'
				],
                dialogconment:false,
                anserComent:'',
                answer:[],
                questionList:[
                    {name:'小蛋黄',src:"../../assets/avatar.png",time:'07-27 22:20',word:'蠢狗'},
                    {name:'小蛋黄allalalalallal',src:"../../assets/avatar.png",time:'07-27 22:20',word:'蠢狗'},
                    {name:'小蛋黄',src:"../../assets/avatar.png",time:'07-27 22:20',word:'蠢狗'},
                    {name:'小蛋黄',src:"../../assets/avatar.png",time:'07-27 22:20',word:'蠢狗'}
                ]

			}
		},
		mounted: function() {
	
		},
		methods: {
            conment(){
                this.dialogconment = false;

                this.answer.push(this.anserComent);

            },
            handleClose(done) {
                this.dialogconment=false;
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
			 li{
				 list-style: none;
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
	li{
		list-style: none;
		text-align:left;
		width:80%;
		margin:0 auto;
		margin-bottom:10px;
		padding: 5px 0px 10px 20px;
		border-bottom: 1px dashed #e0e0e0;

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

	.question,.answer{
		padding-left:50px;
	}

	}
	.el-dialog{
	.el-input{
		width:80%;
	}

	}




	}
</style>