<template>
	<div class="today">
		<Fside></Fside>
		<div class="today-content">
			<div class="today-time">
				<span>2017-5-14</span>
				<span>一天之计在于晨,快来计划一下今天的任务哟</span>
			</div>
			<el-button class="btn-plus" type="text" @click="dialog = true"></el-button>
			<el-dialog title="添加任务" :visible.sync="dialog" size="tiny" :before-close="handleClose">
				<form>
					<div class="today-add">
						<el-input v-model="projectname" placeholder="请输入计划名称" icon="edit">
						</el-input>
						<el-time-picker is-range v-model="projecttime" placeholder="请选择完成计划的时间">
						</el-time-picker>
						<el-rate v-model="projectvalue" show-text :texts="[ '可完成','一般', '重要', '很重要','必须完成' ]">
						</el-rate>
					</div>
					<div slot="footer" class="dialog-footer">
						<el-button native-type="reset" @click="dialog= false">取 消</el-button>
						<el-button type="primary" @click="add()">确 定</el-button>
					</div>
				</form>
			</el-dialog>
			<div class="today-project">
				<ul>
					<li v-for="item in items">
						<div class="today-project-list" @click="item.isfinish=!item.isfinish">
							<i v-bind:class="{ unfinish: !item.isfinish,finish:item.isfinish }"></i>
							<span class="today-todo">{{item.name}}</span>
							<span class="today-totime">{{item.time}}</span>
							<el-rate v-model="item.value" disabled text-color="#ff9900">
							</el-rate>
						</div>

					</li>
				</ul>
			</div>

		</div>
	</div>
</template>

<script>
	import Fside from './common/f-side.vue'

	export default {
		data() {
			return {
				dialogVisible: false,
				projectname: "",
				projecttime: "",
				projectvalue: 0,
				dialog: false,
				items: [],
				index: 0,

			}
		},
		components: {
			Fside
		},
		mounted: function() {
			var height = $(".today-content").height();
			$(".today-mymisson").height(height - 202);
		},

		methods: {
			formattime: function(d) {
				return(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes())

			},
			add: function() {
				this.dialog = false,
					this.items.push({
						name: this.projectname,
						value: this.projectvalue,
						isfinish:this.index,
						time: this.formattime(this.projecttime[0]) + "至" + this.formattime(this.projecttime[1]),
						
					});
				this.projectname = "";
				this.projecttime = "";
				this.projectvalue = "";

			}

		}
	}
</script>

<style lang="scss" rel="stylesheet/scss" type="text/css">
	.today {
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 2222;
		.today-content {
			margin-left: 100px;
			height: 100%;
			.today-project {
				clear: both;
				width: 60%;
				height: 78%!important;
				margin: 0 auto;
				background-image: url(../assets/f-user.png);
				margin-top: 50px;
				color:#333333;
				ul {
					list-style: none;
				}
				.today-project-list {
					.unfinish {
						width: 25px;
						height: 25px;
						background-image: url(/static/img/btn-icon.ca3e337.png);
						background-position: -4px -943px;
						display: inline-block;
						border-radius: 15px;
					}
					.finish {
						background-position: -36px -943px;
						width: 25px;
						height: 25px;
						background-image: url(/static/img/btn-icon.ca3e337.png);
						display: inline-block;
						border-radius: 15px;
					}
					.today-todo,.today-totime {
						display: inline-block;
						height: 25px;
						line-height: 25px;
						position: relative;
						top: -5px;
						text-align: left;
						font-family: Microsoft YaHei;
						margin-right: 10px;
						
					}
					.el-rate {
						display: inline-block;
						position: relative;
						top: -10px;
					}
				}
			}
			.today-time {
				height: 50px;
				border-bottom: 1px solid #F76333;
				span {
					float: left;
					margin: 20px;
					color: #F76333;
				}
			}
			.today-add {
				position: relative;
				z-index: 22222;
				.el-input {
					width: 200px;
					display: block;
					margin: 0 auto;
					margin-bottom: 10px;
				}
			}
			.btn-plus {
				width: 50px;
				height: 50px;
				background-image: url(../assets/btn-plus.png);
				background-size: cover;
				animation: changehovertree 4s linear infinite;
				position: absolute;
				left: 100px;
			}
			.el-dialog__close:hover {
				color: #272C2F;
			}
			.dialog-footer {
				margin: 20px 0px 20px 0px;
				float: right;
				.el-button--primary {
					background-color: #272c2f;
					border-color: #272c2f;
				}
				.el-button--default:hover {
					border-color: #272c2f;
					color: #272C2F
				}
				.el-input__inner:focus {
					outline: 0;
					border-color: #272c2f;
				}
				.el-dialog__close:hover {
					color: #272C2F;
				}
			}
			@-webkit-keyframes changehovertree {
				0% {
					-webkit-transform: rotate(0)
				}
				50% {
					-webkit-transform: rotate(180deg)
				}
				100% {
					-webkit-transform: rotate(360deg)
				}
			}
			@keyframes changehovertree {
				0% {
					transform: rotate(0)
				}
				50% {
					transform: rotate(180deg)
				}
				100% {
					transform: rotate(360deg)
				}
			}
		}
	}
</style>