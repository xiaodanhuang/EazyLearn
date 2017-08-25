<template>
	<div class="user-set">
		<img class="avatar"src="../assets/avatar.png">
		<el-input placeholder="小蛋黄"icon="edit"></el-input>
		<el-input placeholder="密码"icon="edit"></el-input>
		<el-input placeholder="再次输入密码"icon="edit"></el-input>
		<el-button style="margin-top: 12px;">取消</el-button>
		<el-button style="margin-top: 12px;">保存</el-button>

	</div>
</template>

<script>
    export default {
        name: 'user-set',
        data () {
            return {
            }
        },
        methods: {
        },
        components: {}

    }
</script>

<style lang="scss" rel="stylesheet/scss" type="text/css">
	.user-set {
		position: relative;
		overflow: auto;
		z-index: 1;
		.avatar{
			width:100px;
			height:100px;
			border-radius:50px;
			margin-top:20px;

		}
		.el-input{
			width:80%;
			display:block;
			margin:0 auto;
			margin-top:20px;
		}

	}


</style>