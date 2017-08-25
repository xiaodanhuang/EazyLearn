<template>
	<div class="tea-question">
		<div class="no-data"></div>
		<div class="question-list">
			<li v-for="item in questionList">
				<img src="../../assets/avatar.png">
				<span class="stu-information">
                    <div class="name">{{item.name}}</div>
                    <div class="time">{{item.time}}</div>
                </span>
                <el-button type="text" @click="dialogconment = true">
                    <span class="btn-conment"></span>
                </el-button>
				<div class="question">{{item.word}}</div>
                <div class="answer">
                    <div v-for="item in answer">
                        {{item}}
                    </div>

                </div>
			</li>
		</div>
        <el-dialog title="" :visible.sync="dialogconment" size="tiny" :before-close="handleClose">
            <el-input placeholder="回复消息啦啦啦" icon="edit" v-model="anserComent"></el-input>
            <span slot="footer" class="dialog-footer">
    	<el-button @click="dialogconment = false">取 消</el-button>
    	<el-button type="primary" @click="conment()">评论</el-button>
  			</span>
        </el-dialog>
	</div>
</template>


<script>
    export default {
        name: 'tea-question',
        data() {
            return {
                dialogconment:false,
                anserComent:'',
                answer:[],
                questionList:[
					{name:'小蛋黄',src:"../../assets/avatar.png",time:'07-27 22:20',word:'蠢狗'},
                    {name:'小蛋黄allalalalallal',src:"../../assets/avatar.png",time:'07-27 22:20',word:'蠢狗'},
                    {name:'小蛋黄',src:"../../assets/avatar.png",time:'07-27 22:20',word:'蠢狗'},
                    {name:'小蛋黄',src:"../../assets/avatar.png",time:'07-27 22:20',word:'蠢狗'}
				]

            }
        },
        mounted: function() {


        },
        methods: {
            conment(){
                this.dialogconment = false;
                
                this.answer.push(this.anserComent);

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
	.tea-question{
		position: relative;
		overflow: auto;
		z-index: 1;
		.no-data{
			width:200px;
			height:200px;
			background:url("../../assets/no-data.png");
			background-position: -400px -850px;
			background-repeat: no-repeat;
			margin:0 auto;
		}
		.question-list{
			li{
				list-style: none;
                text-align:left;
                width:80%;
                margin:0 auto;
                margin-bottom:10px;
                padding: 5px 0px 10px 20px;
                border-bottom: 1px dashed #e0e0e0;

			}
			img{
                width: 50px;
                height: 50px;
                border-radius: 25px;
			}
            .stu-information{
                display:inline-block;
                text-align:left;
                position: relative;
                top: -10px;
                .name{
                    font-size:14px;
                    width:100px;
                    overflow:hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .time{
                    font-size:12px;
                }
            }
            .el-button--text {
                float: right;
                .btn-conment{
                    display:inline-block;
                    width:50px;
                    height:30px;
                    background:url("../../assets/btn-comment.png");
                    background-size: cover;
                    float:right;
                }
            }

            .question,.answer{
                padding-left:50px;
            }

		}
    .el-dialog{
        .el-input{
            width:80%;
        }

    }
	}



</style>
