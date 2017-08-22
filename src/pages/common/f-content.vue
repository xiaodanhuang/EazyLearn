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
</style>