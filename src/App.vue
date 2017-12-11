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
            Date.prototype.Format = function (fmt) {
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
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
