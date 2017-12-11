<template>
	<div class="stu-question">
		<nav>
			<el-tabs type="border-card">
				<el-tab-pane>
				<span slot="label"><i class="friend-icon"></i></span>
					<ul >
						<li v-for="item in friendList"><i class="chat-friend"></i> <span>{{item.courseTeacher}}</span></li>
					</ul>
				</el-tab-pane>
			</el-tabs>
		</nav>
		<aside v-if="isChat">
			<header>详细信息</header>
			<img  src="../../assets/chat-firend.jpeg"/>
			<p>教师名：金在中</p>
			<el-button type="success"@click="chatPage()">发送消息</el-button>

		</aside>
		<aside v-if="!isChat">
			<header>talk people</header>
			<div class="chat-message">
				<div class="pop">hahaha</div>
			</div>
			<footer>
				<textarea v-bind="mesaage"></textarea>
				<el-button @click="socketSend()"> 发送</el-button>
			</footer>

		</aside>


	</div>
</template>


<script>
    export default {
        name: 'stu-question',
        data() {
            return {
                friendList:[],
				isChat:true,
				message:''

            }
        },
        mounted: function() {
            var $this =this;
            var websocket = null;
            //判断当前浏览器是否支持WebSocket
            if ('WebSocket' in window) {

                websocket = new WebSocket("ws://localhost:8080/websocket");
            }
            else {
                var  h = this.$createElement;
                this.$notify({
                    title: '',
                    message: h('i', { style: 'color: teal'}, '当前浏览器不支持聊天功能呢)'),
                    type: 'warning',
                    position: 'right-bottom',
                    offset: 300,
                    duration:1000

                });
            }
            $.ajax({
                url:'/stuTeacherChat',
                type:'post',
                data:{
                    stuId:this.$store.state.stuId
                },
                dataType: 'json',
                success:function(data){
                    $this.friendList=data;
                },
                error:function(){
                    console.log('error');
                }
            });

        },
        methods: {
            newScoket:function(){
                websocket.onmessage = function (event) {
                    console.log(event.data);
                }

			},
			socketSend:function(){
                var message=this.message;
                websocket.send(message);


			},
            chatPage:function(){
                this.isChat=false;

			},
            firendButton:function(){
                console.log(this.$store.state);
			},

            handleClose(done) {
                this.dialogconment=false;
            }

        }

    }
</script>

<style lang="scss" rel="stylesheet/scss" type="text/css">
	.teacher{
		overflow:auto;
		padding-bottom: 10px;
	}
	.stu-question{
		position: relative;
		overflow: auto;
		z-index: 1;
		height: 100%;
	nav{
		padding:0px 10px 10px 10px;
		border-bottom: 1px solid #f5f5f5;
		width:200px;
		height:100%;
		background: #272c2f;
		float:left;
		text-align: center;
		.el-tabs.el-tabs--top.el-tabs--border-card {
			height: 100%;
		}

	    li{
			height:40px;
			text-align: center;
			vertical-align: middle;
			border-bottom: 1px solid #d6d6d6;
			padding:2px;
			span{
				position:relative;
				top:-10px;

			}

		}
	    .chat-friend{
			display:inline-block;
			background-image: url("../../assets/chat-firend.jpeg");
			width:35px;
			height:35px;
			background-size: cover;
			border-radius: 50%;
			border:1px solid #272c2f;
		}
		.chat-icon{
			display:inline-block;
			background:url('../../assets/chat.png');
			background-repeat: no-repeat;
			width:35px;
			height:35px;
			background-size: 487px 462px;
			background-position: -185px -96px;
			margin: 0px 20px 0px 20px ;
		}
		.friend-icon{
			display:inline-block;
			background:url('../../assets/chat.png');
			background-repeat: no-repeat;
			width:35px;
			height:35px;
			background-size: 487px 462px;
			background-position: -185px -96px;
			background-position: -304px -246px;

		}

		}
	aside {
		margin-left: 220px;
		height: 100%;
		header {
			font-weight: 400;
			height: 25px;
			display: inline-block;
			font-size: 14px;
			padding: 10px 0;
			width:100%;
			line-height: 25px;
			border-bottom: 1px solid #d6d6d6;
			z-index: 1024;
		}
		img{
			width:200px;
			height:200px;
			margin:50px 0px;
			border: 1px solid #d6d6d6;

		}
		.chat-message{
			width:100%;
			height:450px;
		}
		textarea {
			width: 100%;
			height: 95px;
			border: 0px;
			resize: none;
			overflow: auto;
		}
		button.el-button.el-button--default {
			position: relative;
			/* right: 23px; */
			bottom: px;
			left: 40%;
			top: -10px;
		}
		footer{
			border-top: 1px solid #d6d6d6;

		}
		.el-button{
			margin-top:20px;
		}
	.pop {
		width: 200px;
		height: 60px;
		-webkit-border-radius: 8px;
		-moz-border-radius: 8px;
		border-radius: 8px;
		margin-left: 10px;
		padding: 10px;
		color: #EFEFEF;
		box-sizing: border-box;
		font-family: "Microsoft YaHei";
		background: gray;
		position: relative;
	}

	.pop:before {
		content: '';
		display: block;
		position: absolute;
		top: 20px;
		width: 15px;
		height: 15px;
		margin-left: -17px;
		pading-top: 10px;
		-webkit-transform: rotate(-45deg) skew(20deg, 20deg) translate3d(0, 0, 0);
		-moz-transform: rotate(-45deg) skew(20deg, 20deg) translate3d(0, 0, 0);
		-ms-transform: rotate(-45deg) skew(20deg, 20deg) translate3d(0, 0, 0);
		-o-transform: rotate(-45deg) skew(20deg, 20deg) translate3d(0, 0, 0);
		transform: rotate(-45deg) skew(20deg, 20deg) translate3d(0, 0, 0);
		overflow: hidden;
		z-index: -1;
		background: gray;
	}


	}
	}



</style>
