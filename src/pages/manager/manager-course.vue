<template>
	<div class="manager-course">
		<nav>
			<el-button @click="addCourse()">添加</el-button>
		</nav>
		<el-table  max-height="400"  ref="courseTable" :data="courseData" border style="width: 100%">
			<el-table-column type="index" label="序号" width="80"></el-table-column>
			<el-table-column prop="id"label="课程号" align="center"width="80"></el-table-column>
			<el-table-column prop="courseName" label="课程" align="center"></el-table-column>
			<el-table-column prop="category" label="类别" align="center"></el-table-column>
			<el-table-column prop="courseStu" label="选课人数"align="center"width="100"></el-table-column>
			<el-table-column prop="teacherNum" label="教师号"align="center"width="80"></el-table-column>
			<el-table-column prop="courseTeacher"width="100" label="教师"align="center"></el-table-column>
			<el-table-column prop="courseTime" label="时间" align="center"></el-table-column>
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
				<el-input v-model="postData.courseName" placeholder="请输入课程名"></el-input>
				<el-date-picker
						v-model="postData.courseTime"
						type="daterange"
						placeholder="请输入教学时间">
				</el-date-picker>

			</div>
			<span slot="footer" class="dialog-footer">
    	<el-button @click="editFalse()">取 消</el-button>
    	<el-button type="primary" @click=" handlePost()">确认修改</el-button>
  			</span>
		</el-dialog>
		<el-dialog title="添加课程资源" :visible.sync="addData" size="tiny"  :before-close="handleClose">
			<span class="logo-small"></span>
			<div class="user-list">
				<el-input v-model="insertData.id" placeholder="请输入课程id"></el-input>
				<el-input v-model="insertData.courseName" placeholder="请输入课程名"></el-input>
				<el-input v-model="insertData.category" placeholder="请输入课程类别"></el-input>
				<el-input v-model="insertData.teacherNum" placeholder="请输入教师号"></el-input>
				<el-input  v-model="insertData.courseTeacher"placeholder="请输入教师名"></el-input>
				<el-date-picker
						v-model="insertData.courseTime"
						type="daterange"
						placeholder="请输入教学时间">
				</el-date-picker>
			</div>
			<span slot="footer" class="dialog-footer">
    	<el-button @click="editFalse()">取 消</el-button>
    	<el-button type="primary" @click="insertCourse()">确认修改</el-button>
  			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'manager-course',
		data() {
            return {
                number:'',
                editData:false,
				addData:false,
				postData:{
                    courseName:'',
                    teacherNum:'',
                    category:'',
                    courseTeacher:'',
                    courseTime:''

				},
				insertData:{
                    id:'',
                    courseName:'',
                    category:'',
					teacherNum:'',
                    courseTeacher:'',
                    courseTime:''
				},
                courseData: []
			}
        },
        mounted: function () {
            this.$nextTick(function () {
                var $this=this;
                $.ajax({
                    url:'/manageByCourse',
                    type:'post',
                    dataType: 'json',
                    success:function(data){
                        $this.courseData=data;
                        $this.number=data.length;

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
                    this.postData.courseName=row.courseName,
                    this.postData.teacherNum=row.teacherNum,
                    this.postData.category=row.category,
                    this.postData.courseTeacher=row.courseTeacher;

            },
            editFalse(){
				this.editData=false;
                this.addData=false;
                this.insertData={
                    id:'',
                        courseName:'',
                        category:'',
                        teacherNum:'',
                        courseTeacher:'',
                        courseTime:''
                }

			},
            handleClose() {
				this.editData=false;
                this.addData=false;
                this.insertData={
                    id:'',
                    courseName:'',
                    category:'',
                    teacherNum:'',
                    courseTeacher:'',
                    courseTime:''
                }

			},
            handlePost(){
                var $this=this;
                this.postData.courseTime= new Date(this.postData.courseTime[0]).Format("yyyy.MM.dd")+'-'+
                    new Date(this.postData.courseTime[1]).Format("yyyy.MM.dd");

                $.ajax({
                    url:'/manageCourseUpdate',
                    data:{
                        id:this.postData.id,
						courseName:this.postData.courseName,
                        category:this.postData.category,
                        teacherNum:this.postData.teacherNum,
                        courseTeacher: this.postData.courseTeacher,
                        courseTime:this.postData.courseTime
                    },

                    dataType: 'json',
                    type:'post',
                    success:function(data){
                        $this.courseData=data;
                        $this.editData=false;


                    },
                    error:function(){
                        console.log('update false');
                        $this.editData=false;


                    }

                });

			},
            handleDelete(index, row) {
                var $this=this;
                $.ajax({
					url:'/manageCourseDelete',
					data:{
					    id:row.id
					},
                    dataType: 'json',
                    success:function(data){
                          $this.courseData=data;


                    },
                    error:function(){
                      console.log('error');
                    }

				});
            },
			addCourse(){
                this.addData=true;
			},
            insertCourse(){
                var $this=this;
				this.insertData.courseTime= new Date(this.insertData.courseTime[0]).Format("yyyy.MM.dd")+'-'+
                          new Date(this.insertData.courseTime[1]).Format("yyyy.MM.dd");
                $.ajax({
                    url:'/manageCourseAdd',
                    data:{
                        id:this.insertData.id,
                        courseName:this.insertData.courseName,
                        category:this.insertData.category,
                        teacherNum:this.insertData.teacherNum,
                        courseTeacher: this.insertData.courseTeacher,
                        courseTime:this.insertData.courseTime
                    },

                    dataType: 'json',
                    type:'post',
                    success:function(data){
                        $this.courseData=data;
                        $this.addData=false;
                        $this.insertData={
                            id:'',
                                courseName:'',
                                category:'',
                                teacherNum:'',
                                courseTeacher:'',
                                courseTime:''
                        }


                    },
                    error:function(){
                        console.log('update false');
                    }

                });




            },
            deleteByCheck(rows){

            }
        }

	}
</script>

<style lang="scss" rel="stylesheet/scss" type="text/css">
	.manager-course{
		height:100%;
		nav{
			text-align:left;
			padding:20px;
		}
		.el-date-picker{
			width:100%;
		}
		.el-input {
			margin-bottom:10px;
		}
		.el-range-editor.el-input__inner {
			width:100%;
		
		}
		.block {
			position: fixed;
			bottom: 20px;
			right: 20px;
		}

	}
</style>