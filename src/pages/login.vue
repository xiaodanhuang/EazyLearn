<template>
	<div class="login">
		<el-form :model="form" ref="loginForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="账号" prop="name">
				<el-input v-model="form.name" type="text"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="form.password"type="password"></el-input>
			</el-form-item>
			<el-form-item label="用户类别">
				<el-radio-group v-model="form.category">
					<el-radio :label="1">学生</el-radio>
					<el-radio :label="2">教师</el-radio>
					<el-radio :label="3">管理员</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
				<el-button @click="resetForm('loginForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					password: '',
					category: 0,
				},
				url:[
				    'loginBystuName',
					'loginByteaName',
					'loginBymanagerName'
					],
				routerUrl:[
                    '/index/stu-course',
                    '/teacher/tea-course',
					'/manager/manager-course'
			  ]
			};
		},
        mounted: function() {
		},
		methods: {
		    //找回密码
            userFind:function(){
                this.$router.push('/user-passwordFind');
			},
			//登录
			submitForm(formName) {
                var $this=this;
			    if(!(this.form.name&&this.form.password&&this.form.category)){
                    var  h = this.$createElement;
                    this.$notify({
                        title: '',
                        message: h('i', { style: 'color: teal'}, '账户或密码为空'),
                        type: 'warning',
						position: 'right-bottom',
                        offset: 300,
                        duration:1000

                    });
			      return 0;
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
                        var src = this.form.category - 1;
                        $.ajax({
                            url: '/' + this.url[this.form.category - 1],
                            type: 'post',
                            dataType: 'json',
                            data: {
                                name: this.form.name,
                                password: this.form.password
                            },
                            success: function (data) {
                                if (src == 0) {
                                    $this.$store.commit('postStuId', data.id);
                                }
                                if (src == 1) {
                                    $this.$store.commit('postTeacherId', data.id);
                                }
                                if (src == 2) {
                                    $this.$store.commit('postManageId', data.id);
                                }
                                $this.$store.commit('postUserName', data.username);
                                $this.$router.push($this.routerUrl[$this.form.category - 1]);
                            },
                            error:function(){
                                var  h = $this.$createElement;
                                $this.$notify.error({
                                    title: '',
                                    message: h('i', { style: 'color: teal'}, '账户或密码输入错误'),
                                    position: 'right-bottom',
                                    offset: 300,
                                    duration:0

                                });
                            }

                        });

                    }
                });
            },
			//重置
			resetForm(formName) {
                this.form= {
                    	name: '',
                        password: '',
                        category: 0,
                }
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
		margin-left: -250px;
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