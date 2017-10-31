<template>
	<div class="manager-course">
		<nav>
			<el-button>导入</el-button>
			<el-button>删除</el-button>
		</nav>
		<el-table :data="courseData" border style="width: 100%">
			<el-table-column type="selection" width="55"align="center">
			</el-table-column>
			<el-table-column prop="id"label="课程号" align="center"width="80"></el-table-column>
			<el-table-column prop="courseName" label="课程" align="center"></el-table-column>
			<el-table-column prop="courseStu" label="选课人数"align="center"width="100"></el-table-column>
			<el-table-column prop="teacherNum" label="教师号"align="center"width="80"></el-table-column>
			<el-table-column prop="courseTeacher" label="教师"align="center"></el-table-column>
			<el-table-column prop="courseTime" label="时间" align="center"></el-table-column>
			<el-table-column label="操作"align="center">
				<template scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="" :visible.sync="editDate" size="tiny" >
			<span class="logo-small"></span>
			<div class="user-list">
				<el-input  placeholder="请输入教师号"></el-input>
				<el-input  placeholder="请输入教师名"></el-input>
				<el-input  placeholder="请输入教学时间"></el-input>
			</div>
			<span slot="footer" class="dialog-footer">
    	<el-button @click="editDate = false">取 消</el-button>
    	<el-button type="primary" @click="editDate = false">确认修改</el-button>
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
		name: 'manager-course',
		data() {
            return {
                editDate:false,
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
                    },
                    error:function(){

                    }
                })
            })
        },
        methods: {
            handleEdit(index, row) {
                this.editDate=true;
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
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
		.el-input {
			margin-bottom:10px;
		}
		.block {
			position: fixed;
			bottom: 20px;
			right: 20px;
		}

	}
</style>