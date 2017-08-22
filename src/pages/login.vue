<template>
	<div class="login">
		<el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="账号" prop="name">
				<el-input v-model="form.name" type="text"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="form.password"type="password"></el-input>
			</el-form-item>
			<el-form-item label="用户类别">
				<el-radio-group v-model="form.category">
					<el-radio label="学生"></el-radio>
					<el-radio label="教师"></el-radio>
					<el-radio label="管理员"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('numberValidateForm')">登录</el-button>
				<el-button @click="resetForm('numberValidateForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	export
	default {
		data() {
			return {
				form: {
					name: '',
					password: '',
					category: 1,
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						console.log(this.form.name+this.form.password+this.form.category);
						
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				$('.el-form')[0].reset()
			}
		}
	}
</script>
<style>
	.login {
		width: 100%;
		height: 100%;
		background-image: url(../assets/bg.jpg);
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		opacity: 80;
		-moz-opacity: 0.8;
	}
	
	.el-form {
		width: 500px;
		padding: 30px;
		height: 400px;
		position: absolute;
		top: 200px;
		left: 50%;
		margin-left: -200px;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 2px;
    	box-shadow: 0 2px 5px rgba(0,0,0,0.9);
    	box-sizing: border-box;
	}
	
	.el-form-item__label,
	.el-radio {
		text-align: center;
		color: #FFFFFF;
	}
	
	.el-form-item__content {
		width: 300px;
	}
	.el-radio__input.is-checked .el-radio__inner {
    border-color: #800000;
    background:  #800000;
}
.el-radio__inner:hover {
    border-color: #800000;
}
.el-button--primary ,.el-button--primary:focus, .el-button--primary:hover{
    color: #fff;
    background-color:#800000;
    border-color: #800000;
}
.el-button--default,.el-button--default:focus, .el-button--default:hover {
	 color: #800000;
 
    border-color: #800000;
}
.el-input__inner:focus,.el-input__inner:hover {
    border-color:  #800000;
}
</style>