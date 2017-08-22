<template>
	<div class="tea-course">
		<div class="el-uploaded">
			<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
		</div>
			<i class="no-data"></i>
		<div>
		</div>
		<div class="loaded-course">
			<div class="course-list">
				<li v-for="item in courseware">
          <i class="course-icon"></i>
					{{item}}
				</li>
			</div>
		</div>
		<el-upload class="upload-course"drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
	 	 	<i class="el-icon-upload"></i>
  			<div class="el-upload__text">点击上传课件</em></div>
		</el-upload>
	</div>
</template>

<script>
	  export default {
	  		name:'tea-course',
    data() {
      return {
          courseware:[
            '课件一',
            '课件二',
            '课件三',
            '课件四'
          ]
      ,
      	 data: [{
          label: 'JAVA疯狂讲义',
          children: [{
            label: '第一章java基本语句',
            label: '第二章java继承',
            label: '第三章java基本语句',
          }]
        }, {
          label: 'html5秘籍',
          children: [{
            label: '第一章元素',
            label: '第二章元素',
             }]

        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
    methods: {
    	handleNodeClick(data) {
        console.log(data);
     },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
    }}
</script>

<style lang="scss" rel="stylesheet/scss" type="text/css">
.tea-course{
	width:100%;
	height:100%;
	.upload-course{
		margin-top:30px;
		float:left;
	}
	.loaded-course {
    	float: left;
    	width: 400px;
    	height: 100%;
    .course-list {
       list-style: none;
       margin-top: 30px;
      li{
        height:30px;
        .course-icon{
          width:18px;
          height:18px;
          display:inline-block;
          background: url("../../assets/iconItems.png");
          background-size: 100%;
          position:relative;
          top: 4px;

        }
      }
    }
	}
	.el-uploaded{
		width:200px;
		height:100%;
		float:left;
		text-align: left;
	 	color: #ffffff;
	 	background-color: #272C2F;

		.el-tree{
			border:none;
			background-color: #272C2F!important;
			color: #ffffff;
		}
		.el-tree-node__content:hover {
   			 background:  #272C2F!important;
		}
	}
	.no-data{
		background: url(../../assets/no-data.png);

	}
}
</style>
