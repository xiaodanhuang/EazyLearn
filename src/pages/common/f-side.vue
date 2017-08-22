<template>
	<div class="f-side">
		<i class="head-icon">
		</i>
		<div class="today-do">
		今天做什么捏?
		</div>
		<div class="f-nav">
			<a class="nav">
				<i class="nav-mission"></i>
				<span>任务</span>
			</a>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: 'f-side',
		data () {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		methods: {
		},
		components: {}

	}
</script>

<style lang="scss" rel="stylesheet/scss" type="text/css">
	.f-side {
		width:100px;
		height: 100%;
		 color: #a0a9ad;
        background-color: #272c2f;
    position:fixed;
    .head-icon{
		width:60px;
		height:60px;
		background-image: url(../../assets/avatar.png);
		background-repeat:no-repeat;
		background-size: cover;
		border-radius: 30px;
		display:block;
		margin:0 auto;
		margin-top:15px;
	
	}
	.today-do{
		font-size:12px;
		margin-top:10px;
	}
	.nav-mission{
		background-image: url(../../assets/btn-icon.png);
		display: inline-block;
    	height: 32px;
   		width: 32px;
    	line-height: 32px;
   		background-position: 0px -1324px;
	}
	.nav{
		height:32px;
		display:block;
		span{
			display: inline-block;
			line-height:32px;
			height:32px;
			position: relative;
   			 top: -10px;
    		font-size: 15px;
			
		}
	}

	
		
	}
	
</style>