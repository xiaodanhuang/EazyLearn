<template>
	<div class="stu-work">
		<nav>
			<a class="work-new"v-bind:class="{ workchoose: workchoose}" @click="workchoose=1">最新</a>
			<a class="work-hot"v-bind:class="{workchoose: !workchoose }"@click="workchoose=0">最热</a>
			<a class="work-todo">
				<el-checkbox v-model="checked">只看没做过的</el-checkbox>
			</a>
		</nav>
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
</template>

<script>
	export default {
		name: 'stu-course',
		data() {
			return {
				checked:false,
				 workchoose: true,
				  value5: 3.7



			}
		},
		mounted: function() {


		},
		methods: {
			  handleClose(tag) {
			  	console.log(1);

      }
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
</style>
