<template>
	<div class="stu-work">
		<div v-if="ishomeWork"class="no-data"></div>
		<div v-if="!ishomeWork"class="course-list">
			<ul>
				<li v-for="item in courseData">
					<a class="course-detail">
						<img src="../../assets/course-detail.png" class="course-pic"/>
						<p class="course-name">{{item.filename}}</p>
						<p class="course-teacher"><span>课程:</span><span>{{item.src}}</span></p>
						<a :href="'/homeDownLoad?filename='+item.src"><i class="el-icon-download"></i></a>
						<a :href="'/homeDownLoad?filename='+item.src"><i class="el-icon-upload2"></i></a>

					</a>
				</li>
			</ul>

		</div>
	</div>
</template>

<script>
	export default {
		name: 'stu-course',
		data() {
			return {
				checked:false,
				 workchoose: true,
				  value5: 3.7,
                  ishomeWork:1,
                  courseData:[]



			}
		},
		mounted: function() {
		    var $this=this;
            $.ajax({
                url:'/stuCourseWork',
                type:'post',
                data:{
                    stuId:this.$store.state.stuId
                },
                dataType: 'json',
                success:function(data){
                    $this.courseData=data;
                    if($this.courseData.length>0){
                        $this.ishomeWork=0;
                    }
                },
                error:function(){
                    console.log('error');
                }
            });


		},
		methods: {
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
                       console.log(data);
                    },
                    error:function(){
                        console.log('error');
                    }
                });
            },
		}

	}
</script>

<style lang="scss" rel="stylesheet/scss" type="text/css">
	.stu-work{
		nav{
			width:100%;
			border-bottom: 1px solid #000000;
			height:50px;
			margin-top:10px;
		    border: 1px solid #e0e0e0;
			.work-new,.work-hot{
				display:inline-block;
				float:left;
				line-height:50px;
				width:60px;

			}
			.workchoose,.el-checkbox__input.is-checked .el-checkbox__inner,.el-checkbox__inner:hover{
			    background-color:#e0e0e0;
			    color: #8391a5;
			    border:none;
			}
			.work-todo{
				display:inline-block;
				float:right;
				line-height:50px;
				width:200px;

			}
		}
		.home-list{
			ul{
				list-style: none;
			}
	}
		.work-detail{
				width:217px;
				height:262px;
				display:inline-block;
				border: 2px solid #F5F5F5;
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
	.no-data{
		width:200px;
		height:200px;
		background:url("../../assets/no-data.png");
		background-position: -400px -300px;
		background-repeat: no-repeat;
		margin:0 auto;
	}
</style>
