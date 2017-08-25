<template>
	<div class="user-course">
		<div class="course-list">
			<ul>
				<li   v-for="item in coursename">
					<a class="course-detail" v-for="item in coursename">
						<img src="../assets/course-softdesign.jpg" class="course-pic"/>
						<p class="course-name">{{item.name}}</p>
						<p class="course-teacher"><span>教师:</span><span>{{item.teacher}}</span></p>
						<p class="course-time"><span>课程时间:</span><span>{{item.time}}</span></p>
						<i class="course-into"></i>
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
                activeName: 'first',
                coursename: [
                    {name:'HTML5秘籍',teacher:'吴亦凡',time:'随意学'},
                    {name:'JAVA编程思想',teacher:'郑帝元',time:'2017.05.10-2017.12.20'},
                    {name:'MySQL学习进阶',teacher:'郑基石',time:'随意学'},
                ],



                tags: [
                    { name: '全部', type: 'danger' ,url:'../assets/course-softdesign.jpg'},
                    { name: '前端', type: 'gray'},
                    { name: '后台', type: 'gray'},
                    { name: '安卓', type: 'gray'},
                    { name: 'ios', type: 'gray'  },
                    { name: '大数据', type:'gray'},
                    { name: '网络安全', type: 'gray'},
                    { name: '其他', type: 'gray' }
                ],
                model: [
                    { name: '任意学', type: 'danger' },
                    { name: '定时开班', type: 'gray'}

                ],
                list: [
                    { name: '综合排序', type: 'danger' },
                    { name: '最新', type: 'gray'},
                    { name: '热度', type: 'gray'}

                ]

            }
        },
        mounted: function() {
            var height = $(".stu-course").height();
            $(".course-list").height(height - 177);
            $(".el-tag").click(function(){
                $(this).toggleClass("el-tag--danger");


            });

        },
        methods: {
            handleClose(tag) {
                console.log(1);

            }
        }

    }
</script>

<style lang="scss" rel="stylesheet/scss" type="text/css">
	.user-course {
		height:100%;
	.el-tabs__nav-wrap {
		margin-top:40px;
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

	i{display:inline-block!important}

	}


	}
	.course-list{
		width:100%;
	ul{
		list-style: none;
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
		background-image: url(../assets/btn-icon.png);
		background-position: -4px -1653px;
		display: inline-block;
		border-radius: 15px;
		position: absolute;
		right: 0px;
		top: 220px;
	}
	}
	}

	}
</style>