<template>
	<div class="manager-tea">
		<nav>
			<el-button @click="insertPost()">添加</el-button>
		</nav>
		<el-table  max-height="400" :data="teaData" border style="width: 100%">
			<el-table-column type="index" label="序号" width="80"></el-table-column>
			<el-table-column prop="id"label="教师号" align="center"></el-table-column>
			<el-table-column prop="username" label="教师"align="center"></el-table-column>
			<el-table-column prop="time" label="时间" align="center"></el-table-column>
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
				<el-input   v-model="postData.username" placeholder="请输入课程名"></el-input>
				<el-date-picker
						v-model="postData.time"
						align="right"
						placeholder="入职时间"
						type="date">
				</el-date-picker>
			</div>
			<span slot="footer" class="dialog-footer">
    	<el-button @click="editFalse()">取 消</el-button>
    	<el-button type="primary" @click=" handlePost()">确认修改</el-button>
  			</span>
		</el-dialog>
		<el-dialog title="添加教师资源" :visible.sync="addData" size="tiny"  :before-close="handleClose">
			<span class="logo-small"></span>
			<div class="user-list">
				<el-input v-model="insertData.id" placeholder="请输入教师号"></el-input>
				<el-input v-model="insertData.username" placeholder="请输入教师姓名"></el-input>
				<el-date-picker
						v-model="insertData.time"
						align="right"
						placeholder="入职时间"
						type="date">
				</el-date-picker>
			</div>
			<span slot="footer" class="dialog-footer">
    	<el-button @click="editFalse()">取 消</el-button>
    	<el-button type="primary" @click="addPost()">确认修改</el-button>
  			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'manager-tea',
		data() {
            return {
                teaData: [],
				editData:false,
                addData:false,
				insertData:{
                    id:'',
					username:'',
                    time:''
				},
                postData:{
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
                   url:'/manageByTeacher',
                   type:'post',
                   dataType: 'json',
				   success:function(data){
                       $this.teaData=data;
				   },
				   error:function(){

				   }
			   })
            })
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
                this.editData=true;
                this.postData.id=row.id;
                this.postData.username=row.username;
            },
            editFalse(){
                this.editData=false;
                this.addData=false;
                this.postData.time='';
                this.insertData.time='';

            },
            handleClose() {
                this.editData=false;
                this.addData=false;
                this.postData.time='';
                this.insertData.time='';

            },
            handlePost(){
                var $this=this;

                this.postData.time= new Date(this.postData.time).Format("yyyy.MM.dd");
                $.ajax({
                    url:'/manageTeacherUpdate',
                    data:{
                        id:this.postData.id,
                        username:this.postData.username,
                        time:this.postData.time
                    },

                    dataType: 'json',
                    type:'post',
                    success:function(data){
                        $this.teaData=data;
                        $this.editData=false;
                        $this.postData.time='';


                    },
                    error:function(){
                        console.log('update false');
                    }

                });

            },
            handleDelete(index, row) {
                var $this=this;
                $.ajax({
                    url:'/manageTeacherDelete',
                    data:{
                        id:row.id
                    },
                    dataType: 'json',
                    success:function(data){
                        $this.teaData=data;
                    },
                    error:function(){
                        console.log('error');
                    }

                });
            },
			insertPost(){
                this.addData=true;
			},
			addPost(){
                var $this=this;
                if(!(this.insertData.id&&this.insertData.username&&this.insertData.time)){
                    var  h = this.$createElement;
                    this.$notify({
                        title: '',
                        message: h('i', { style: 'color: teal'}, '部分资料未填写'),
                        type: 'warning',
                        position: 'right-bottom',
                        offset: 300,
                        duration:1000

                    });
                    return 0;
                }
                if(this.insertData.id.match(/\d/g).length!=4){
                    var  h = this.$createElement;
                    this.$notify({
                        title: '',
                        message: h('i', { style: 'color: teal'}, '教师id格式错误请输入长度为4位的数字'),
                        type: 'warning',
                        position: 'right-bottom',
                        offset: 300,
                        duration: 1000

                    });
                    return 0;
                }
                this.insertData.time=new Date(this.insertData.time).Format("yyyy.MM.dd")
                $.ajax({
                    url:'/manageTeacherAdd',
                    data:{
                        id:this.insertData.id,
                        username:this.insertData.username,
                        time:this.insertData.time
                    },

                    dataType: 'json',
                    type:'post',
                    success:function(data){
                        $this.teaData=data;
                        $this.addData=false;
                        $this.insertData.time='';


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
	.manager-tea {
		height:100%;
		nav{
			text-align:left;
			padding:20px;
		}
		.el-input {
			margin-bottom:10px;
		}
		.el-date-editor.el-input.el-input--prefix.el-input--suffix.el-date-editor--date {
			width: 100%;
		}
		.block {
			position: fixed;
			bottom: 20px;
			right: 20px;
		}
    }

</style>