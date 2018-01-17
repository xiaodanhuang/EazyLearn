<template>
	<div class="user-set">
		<div id="particles" class="bg"></div>
		<div class="my-info">
		<img class="avatar"src="../assets/avatar.png">
		<el-input v-model="changeForm.id"placeholder="请输入账户id"icon="edit"></el-input>
		<el-input v-model="changeForm.username" placeholder="请输入账户姓名"icon="edit"></el-input>
		<el-input type="password" v-model="changeForm.pass"placeholder="新密码"icon="edit"></el-input>
		<el-input type="password" v-model="changeForm.checkPass"placeholder="再次输入密码"icon="edit"></el-input>
		<div id="slider">
			<div id="slider_bg" style="width: 0px;"></div>
			<span id="label" style="left: 0px;">&gt;&gt;</span>
			<span id="labelTip">拖动滑块验证</span>
		</div>
		<el-button :disabled="dis" id="true-button"style="margin-top: 12px;" @click="changeMessage()">保存</el-button>
		<el-button style="margin-top: 12px;" @click="loginBack()">取消</el-button>
		</div>

	</div>
</template>

<script>
    export default {
        name: 'user-set',
        data () {
            return {
                dis:true,
				changeForm:{
				    id:'',
					username:'',
				    pass:'',
					checkPass:''
				}
            }
        },
        mounted: function (){
           var  $this=this;
            $("#true-button").attr("disabled","disabled");
            particlesJS.load('particles','./static/particles/particles.json');
            var slider = new SliderUnlock("#slider",{
                successLabelTip : "验证成功"
            },function(){
                console.log('ha');
                $this.dis=false;


            });
            slider.init();
		},
        methods: {
            loginBack:function(){
                this.dialoglogin = false;
                this.$router.push('/');
            },
            changeMessage:function(){
                var $this=this;
                var Regx =  /^[0-9a-zA-Z]*$/g;
                if(!Regx.test(this.changeForm.pass)||!this.changeForm.pass){
                    var  h = this.$createElement;
                    this.$notify({
                        title: '',
                        message: h('i', { style: 'color: teal'}, '请输入长度为8位的数字或字母'),
                        type: 'warning',
                        position: 'right-bottom',
                        offset: 300,
                        duration: 1000
                    });
                    var slider = new SliderUnlock("#slider",{
                        successLabelTip : "验证成功"
                    },function(){
                        $this.dis=false;
                    });
                    slider.init();
                    $this.dis=true;
                    return 0;
                }
             if(this.changeForm.pass!=this.changeForm.checkPass){
                 var  h = this.$createElement;
                 this.$notify.error({
                     title: '',
                     message: h('i', { style: 'color: teal'}, '两次密码输入不同'),
                     position: 'right-bottom',
                     offset: 300,
                     duration:1000
                 });
                 var slider = new SliderUnlock("#slider",{
                     successLabelTip : "验证成功"
                 },function(){
                     $this.dis=false;
                 });
                 slider.init();
                 $this.dis=true;
                 return 0;
			 }
                $.ajax({
                    url:'/managePasswordUpdate',
                    data:{
                        id:this.changeForm.id,
                        username:this.changeForm.username,
                        password:this.changeForm.pass
                    },
                    dataType: 'json',
                    type:'post',
                    success:function(data){
                       if(data==1){
                           $this.$router.push("/");
					   }
					   else{
                           $this.changeForm= {
                               id: '',
                               username: '',
                               pass: ''
                           }
                           var slider = new SliderUnlock("#slider",{
                               successLabelTip : "验证成功"
                           },function(){
                               console.log('ha');
                               $this.dis=false;
                           });
                           slider.init();
                           $this.dis=true;
						   var  h = $this.$createElement;
                           $this.$notify.error({
                               title: '',
                               message: h('i', { style: 'color: teal'}, '账户或输入用户姓名错误'),
                               position: 'right-bottom',
                               offset: 300,
                               duration:1000
                           });
					   }
                    },
                    error:function(){
                        console.log('update false');
                    }
                });
			}
        },
        components: {

		}

    }
</script>

<style lang="scss" rel="stylesheet/scss" type="text/css">
	.bg{
		width:100%;
		height:100%;
		position:absolute;
		z-index:-1;
		top:0px;
	}
	.user-set {

		position: relative;
		overflow: hidden;
		width:100%;
		height:100%;
	.my-info{
		width:60%;
		margin-left:20%;
		margin-top:10%;
		-webkit-box-shadow: 0 1px 3px rgba(0,0,0,.3);
		box-shadow: 0 1px 3px rgba(0,0,0,.3);
		background-color:white;
		padding-bottom:10px;
	}

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