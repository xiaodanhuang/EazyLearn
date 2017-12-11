<template>
	<div class="f-content">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'f-content',
		data () {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		components: {}

	}
</script>

<style lang="scss" rel="stylesheet/scss" type="text/css">
	.f-content {
		overflow: auto;
		height:100%;
		background-color: #FFFFFF;
		
	}
	.index-content-row{
		z-index:-2!important;
	}
	.el-tabs__item {
		color: #696969;
	}
	.el-tabs__nav-wrap::after {
		content: "";
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 2px;
		background-color:transparent;
		z-index: 1;
	}
</style>