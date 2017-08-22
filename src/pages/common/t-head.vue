<template>
	<div class="t-head">
		<div class="head-left"></div>
		<div class="head-right">
			<el-button type="text" @click="dialoglogin = true"><img id="user-favition" src="../../assets/avatar.png" /></el-button>
		</div>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="课程管理"index="0"name="first"></el-tab-pane>
			<el-tab-pane label="作业管理"index="1"name="second"></el-tab-pane>
			<el-tab-pane label="线上答疑" index="2"name="third"></el-tab-pane>

			<el-input placeholder="请输入关键字搜索" icon="search"></el-input>
		</el-tabs>
		<el-dialog title="" :visible.sync="dialoglogin" size="tiny" :before-close="handleClose">
			<span class="logo-small"></span>
			<div class="user-list">
			<div class="user-category"@click="go(0)" ><i class="user-course"></i><span>课程管理</span></div>
			<div class="user-category"@click="go(1)" ><i class="user-work"></i><span>作业管理</span></div>
			</div>
				<div class="user-list">
			<div class="user-category"@click="go(2)" ><i class="user-question"></i><span>我的答疑</span></div>
			<div class="user-category"@click="go(3)"><i class="user-set"></i><span>我的设置</span></div>
			</div>
			<span slot="footer" class="dialog-footer">
    	<el-button @click="dialoglogin = false">取 消</el-button>
    	<el-button type="primary" @click="dialoglogin = false">安全退出</el-button>
  			</span>
		</el-dialog>


	</div>
</template>

<script>
	export default {
		name: 't-head',
		data() {
			return {
				activeName: 'first',
				dialoglogin: false,
				dialogin: false,
				url:[
				'/teacher/tea-course',
				'/teacher/tea-work',
				'/teacher/tea-question',
				'/index/stu-set'
				]


			}
		},
		components: {},
		methods: {
			 handleClick(tab) {
			 	this.$router.push(this.url[tab.index]);

    },
    go: function(index) {
			this.$router.push(this.url[index]);

		}

		},
		handleClose(done) {
			console.log(1);
			this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {});
		}


	}
</script>

<style lang="scss" rel="stylesheet/scss" type="text/css">
	.t-head {
		    position: fixed;
    width: 100%;
    height: 60px;
    background-color: #272c2f;
    padding-top: 7.5px;
    box-sizing: border-box;
		.el-tabs__item.is-active,
		.el-tabs__active-bar {
			color: #fff;
			background-color: transparent;
		}
		.el-tabs__item:hover {
    color: #fff;
    cursor: pointer;
}
		.head-left {
			background-position: 0;
			background-repeat: no-repeat;
			width: 150px;
			height: 50px;
			float: left;
			background-image: url(../../assets/bg-logo.png);
		}
		.head-right {
			float: right;
			color: #fff;
			.el-button--text{
				padding:0px;
			}
			span {
				display: inline-block;
				width: 50px;
				margin-right: 20px;
			}
		}
		.el-tabs__header,
		.el-tabs .el-input,
		.el-tabs__content {
			width: 300px;
			display: inline-block;
			border: none;
			border: 0px;
		}
		.el-tabs .el-input__inner,
		.el-tabs .el-input__inner:focus {
			background-color: #464b4d;
			border: none;
			color: #fff;
		}
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
		#user-favition{
			width: 40px;
    border-radius: 20px;
    margin-top: 5px;
		}
		.el-dialog--tiny {
			top:70px;
    width: 30%;
    right: -220px;
    .user-category{
    	background: #f3f5f7;
    	width:100px;
    	display:inline-block;
    	height:25px;
    	line-height:25px;
    	span{
    		    position: relative;
    top: -7px;
    	}
    }
}
		.el-dialog_wrapper {
			z-index: 100000!important;
		}
		.user-course{
    width: 25px;
    height: 25px;
    background-image:url(../../assets/btn-icon.png);
    background-position: -4px -1360px;
    display: inline-block;
    border-radius: 15px;
}
.user-work {
    width: 25px;
    height: 25px;
    background-image: url(../../assets/btn-icon.png);
    background-position: -4px -849px;
    display: inline-block;
    border-radius: 15px;
}
.user-question{
    width: 25px;
    height: 25px;
    background-image: url(../../assets/btn-icon.png);
    background-position: -4px -1199px;
    display: inline-block;
    border-radius: 15px;
}
.user-set {
    width: 25px;
    height: 25px;
    background-image: url(../../assets/btn-icon.png);
    background-position: -4px -1744px;
    display: inline-block;
    border-radius: 15px;
}
		.el-dialog {
			.buttons {
				margin: 20px 0px 20px 0px;
			}
			.el-input {
				width: 200px;
				display: block;
				margin: 0 auto;
				margin-top: 10px;
			}
		}
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
.el-button--text {
	color: #8391a5;
}
.el-button--text:hover {
	color: #fff;
}
	}

	.v-modal {
		z-index: -1!important;
		background-position: 0;
	}
</style>
