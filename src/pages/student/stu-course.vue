<template>
	<div class="stu-course">
		<div class="Tabc">
			<el-tabs v-model="activeName" @tab-click="sortBy(activeName)" >
				<el-tab-pane label="综合排序" name="0"></el-tab-pane>
				<el-tab-pane label="最新" name="1"></el-tab-pane>
    			<el-tab-pane label="最热" name="2"></el-tab-pane>
 			</el-tabs>
		</div>
		<div class="course-list">
			<ul>
				<li v-for="item in courseData">
					<a class="course-detail">
						<img v-bind:src="item.src" class="course-pic"/>
						<p class="course-name">{{item.courseName}}</p>
						<p class="course-teacher"><span>教师:</span><span>{{item.courseTeacher}}</span></p>
						<p class="course-time"><span>课程时间:</span><span>{{item.courseTime}}</span></p>
						<i class="course-into"@click="courseInto(item.id,item.courseStu,item.src,item.courseTeacher,item.courseName )"></i>
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
				activeName:0,
				courseData: [],
				urlList:[
				    'stuByCourse',
					'stuCourseByTime' ,
					'stuCourseByStu',
				],
				tags: [
		          { name: '全部', type: 'danger' ,url:'../../assets/course-softdesign.jpg'},
          { name: '前端', type: 'gray'},
          { name: '后端', type: 'gray'},
        ],
         list: [
		{ name: '综合排序', type: 'danger' },
        { name: '最新', type: 'gray'},
         { name: '热度', type: 'gray'}
         
        ]

			}
		},
		mounted: function() {
            this.$nextTick(function () {
                var $this=this;
                $.ajax({
                    url:'/stuByCourse',
                    type:'post',
                    dataType: 'json',
                    success:function(data){
                        $this.courseData=data;
                        console.log(data);

                    },
                    error:function(){

                    }

                });

            });
		    var height = $(".stu-course").height();
	        $(".course-list").height(height - 177);
            $(".el-tag").click(function(){
    	    $(this).toggleClass("el-tag--danger");
    	
  
});
	
		},
		methods: {
            sortBy(name) {
                var $this=this;
                $.ajax({
                    url:'/'+this.urlList[name],
                    type:'post',
                    dataType: 'json',
                    success:function(data){
                        $this.courseData=data;

                    },
                    error:function(){
                        console.log('error');

                    }

                })
            },
		    courseInto(id,courseStu,src,courseTeacher,courseName ){
                console.log(id,courseStu,src,courseTeacher);
                this.$store.commit('postCourseId',id);
                this.$store.commit('postCourseStu',courseStu);
                this.$store.commit('postCourseSrc',src);
                this.$store.commit('postCourseTeacher',courseTeacher);
                this.$store.commit('postCourseName',courseName );
                this.$router.push('/index/stu-tail');

			},
            close:function(){
		        console.log('ascdf')
	}
		}

	}
</script>

<style lang="scss" rel="stylesheet/scss" type="text/css">
	.stu-course {
		height:100%;
		  .el-tabs__nav-wrap {
    		background: #F5F5F5;
}
		.Tab{
			padding-top:10px;
			text-align: left;
	    	.Tab-list{
				font-weight:bold;
				color: #333;
				text-align: right;
				width:50px;
				display:inline-block;
		
			}
			.el-tag{
				display:inline-block;
				width:90px;
				margin-left:15px;
				height:30px;
				line-height:30px;
				i{
					display:none;
					float:right;
					margin:7px 5px 5px 0px;
				}
	
			}
			.el-tag--danger{
				color:#1D90E6;
				i{
					display:inline-block!important;
				}
	
			}

		
		}
		.course-list{
			width:100%;
			overflow:auto;
			ul{
				list-style: none;
		     	text-align:left;
				width:100%;
	        li {
		       display: inline-block;
				position: relative;
				width:25%;
			}
		}
			.course-pic{
				width:224px;
				height:125px;

			}
			.course-detail{
				display: inline-block;
				padding: 10px;
    			margin:10px;
    			border: 2px solid #F5F5F5;
    			position: relative;
   		 		font-weight:bold;
				.course-teacher,.course-time{
	  		 		text-align: left;
    		 		font-size: 12px;
			 		color:#333333;
  
  		 		}
    			.course-into{
					width: 25px;
					height: 25px;
					background-image: url(../../assets/btn-icon.png);
					background-position: -4px -1653px;
					display: inline-block;
					border-radius: 15px;
					position: absolute;
					right: 0px;
					bottom: 5px;
					cursor:pointer;

				}
			}
		}

	}
</style>