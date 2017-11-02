<template>
	<div class="manager-stu">
		<nav>
			<el-button>导入</el-button>
			<el-button @click="insertFill()">添加</el-button>
			<el-button @click="deleteByCheck(stuData)">删除</el-button>
		</nav>
		<el-table :data="stuData" border style="width: 100%">
			<el-table-column type="index" label="序号" width="80"></el-table-column>
			<el-table-column type="selection" width="55"align="center">
			</el-table-column>
			<el-table-column  prop="id" label="学号" align="center"></el-table-column>
			<el-table-column prop="username" label="姓名"align="center"></el-table-column>
			<el-table-column prop="schoolTime" label="入学时间" align="center"></el-table-column>
			<el-table-column label="操作"align="center">
				<template scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="" :visible.sync="editData" size="tiny"  :before-close="handleClose">
			<span class="logo-small"></span>
			<div class="user-list">
				<el-input v-model="postData.username" placeholder="请输入课程名"></el-input>
				<el-input v-model="postData.schoolTime" placeholder="请输入教学时间"></el-input>
			</div>
			<span slot="footer" class="dialog-footer">
    	<el-button @click="editFalse()">取 消</el-button>
    	<el-button type="primary" @click=" handlePost()">确认修改</el-button>
  			</span>
		</el-dialog>
		<el-dialog title="添加学生资源" :visible.sync="addData" size="tiny"  :before-close="handleClose">
			<span class="logo-small"></span>
			<div class="user-list">
				<el-input v-model="insertData.id" placeholder="请输入学号"></el-input>
				<el-input v-model="insertData.username" placeholder="请输入学生姓名"></el-input>
				<el-input v-model="insertData.time" placeholder="请输入学时间"></el-input>
			</div>
			<span slot="footer" class="dialog-footer">
    	<el-button @click="editFalse()">取 消</el-button>
    	<el-button type="primary" @click="insertPost()">确认修改</el-button>
  			</span>
		</el-dialog>
		<div class="block">
			<el-pagination
					:page-sizes="[100, 200, 300, 400]"
					:page-size="100"
					layout="total, sizes, prev, pager, next, jumper"
					:total="400">
			</el-pagination>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'manager-stu',
		data() {
            return {
                addData:false,
                stuData: [],
				postData: {
                    id: '',
                    username: '',
                    schoolTime: ''
                },
				editData:false,
                insertData:{
                    id:'',
                    username:'',
                    time:''
                }

			}
        },
        mounted: function () {
            this.$nextTick(function () {
                var $this=this;
                $.ajax({
                    url:'/manageByStudent',
                    type:'post',
                    dataType: 'json',
                    success:function(data){
                        $this.stuData=data;
                    },
                    error:function(){

                    }

                })
            })
        },
        methods: {
            handleEdit(index, row) {
                this.editData=true;
                this.postData.id=row.id;
                this.postData.username=row.username;
                this.postData.schoolTime=row.schoolTime;
            },
            editFalse(){

                this.editData=false;
                this.addData=false;

            },
            handleClose() {
                this.editData=false;
                this.addData=false;

            },
            handlePost(){
                var $this=this;
                $.ajax({
                    url:'/manageStudentUpdate',
                    data:{
                        id:this.postData.id,
                        username:this.postData.username,
                        time:this.postData.schoolTime
                    },

                    dataType: 'json',
                    type:'post',
                    success:function(data){
                        $this.stuData=data;
                        $this.editData=false;


                    },
                    error:function(){
                        console.log('update false');
                    }

                });

            },
            handleDelete(index, row) {
                var $this=this;
                $.ajax({
                    url:'/manageStudentDelete',
                    data:{
                        id:row.id
                    },
                    dataType: 'json',
                    success:function(data){
                            $this.stuData=data;
                    },
                    error:function(){
                        console.log('error');
                    }

                });
            },
            deleteByCheck(rows){
                console.log(rows);

			},
            insertFill(){
                this.addData=true;

            },
			insertPost(){
                var $this=this;
                $.ajax({
                    url:'/manageStudentAdd',
                    data:{
                        id:this.insertData.id,
                        username:this.insertData.username,
                        schoolTime:this.insertData.time
                    },

                    dataType: 'json',
                    type:'post',
                    success:function(data){
                        $this.stuData=data;
                        $this.addData=false;


                    },
                    error:function(){
                        console.log('update false');
                    }

                });

			}
        }

	}
</script>

<style lang="scss" rel="stylesheet/scss" type="text/css">
	.manager-stu{
		height:100%;
		nav{
			text-align:left;
			padding:20px;
		}
	    .el-input {
		margin-bottom:10px;
	    }
		.block{
			position: fixed;
			bottom: 20px;
			right: 20px;
		}
	}
</style>