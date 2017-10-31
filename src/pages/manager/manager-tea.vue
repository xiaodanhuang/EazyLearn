<template>
	<div class="manager-tea">
		<nav>
			<el-button>导入</el-button>
			<el-button>删除</el-button>
		</nav>
		<el-table :data="teaData" border style="width: 100%">
			<el-table-column type="selection" width="55"align="center"></el-table-column>
			<el-table-column fixed prop="id"label="教师号" align="center"></el-table-column>
			<el-table-column prop="username" label="教师"align="center"></el-table-column>
			<el-table-column prop="time" label="时间" align="center"></el-table-column>
			<el-table-column label="操作"align="center">
				<template scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
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
		name: 'manager-tea',
		data() {
            return {
                teaData: []
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
            },
            handleDelete(index, row) {
                console.log(index, row);
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
		.block {
			position: fixed;
			bottom: 20px;
			right: 20px;
		}
    }

</style>