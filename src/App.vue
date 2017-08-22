<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {}
		},
		created() {
			// POST 参数统一由`JS`对象转换为`application/x-www-form-urlencoded`
//			this.axios.interceptors.request.use(config => {
//				return config;
//			});

			// 对于`status`非0的响应结果，转为reject
			this.axios.interceptors.response.use(response => {
//				if (0 == response.data.status) {
//					return response;
//				} else {
//					var error = new Error(response.data.msg);
//					error.status = response.data.status;
//					return Promise.reject(error);
//				}
			}, function (error) {
				return Promise.reject(error);
			});
		}
	}
</script>

<style>
	html,body {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #333333;
		height: 100%;

	}
</style>
