<template>
	<div class="user-passwordFind">
		<el-date-picker
				v-model="value6"
				type="daterange"
				placeholder="选择日期范围">
		</el-date-picker>
	</div>
</template>

<script>
    export default {
        name: 'user-passwordFind',
        data () {
            return {
                value6:''
            }
        },
        methods: {
        },
        components: {}

    }
</script>

<style lang="scss" rel="stylesheet/scss" type="text/css">
	.user-passwordFind{
		position: relative;
		overflow: auto;
		z-index: 1;
		margin-top:20px;


	}


</style>