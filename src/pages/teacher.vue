<template>
	<div class="teacher">
		<t-head></t-head>
		<div class="index-content-row">
			<div class="content-warp">
				<div class="index-content">
					<f-content></f-content>
				</div>
			</div>
		</div>

	
	</div>
</template>

<script>
		import THead from './common/t-head.vue'
		import FContent from './common/f-content.vue'
		export default {
		name: 'teacher',
		data () {
			return {
				msg: 'Welcome to Your INDEX'
			}
		},
		components: {THead,FContent}

	}
</script>
<style lang="scss" rel="stylesheet/scss" type="text/css">

	.teacher{
		position: relative;
		height: 100%;
		overflow:hidden;
		z-index:0;
	

		.index-content-row {
			position: absolute;
			height: 100%;
			width: 100%;
			top: 60px;
			bottom: 0;

			.content-warp {
				position: relative;
				width: 100%;
				height: 100%;
			}
		}

		.index-content{
			position: absolute;
			height: 100%;
			width:100%;
		}

	}
</style>