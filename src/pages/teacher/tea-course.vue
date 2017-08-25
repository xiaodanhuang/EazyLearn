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
		<div class="upload-course">
			<el-upload class="upload-demo" action="":on-change="handleChange" :file-list="fileList3">
				<el-button size="small" type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">只能上传pdf/PPT/word文件</div>
			</el-upload>
			<el-button type="text" @click="dialoglogin = true">发布公告</el-button>
			<el-dialog title="" :visible.sync="dialoglogin" size="tiny" :before-close="handleClose">
				<span class="logo-small"></span>
				<el-input placeholder="小蛋黄"icon="edit"></el-input>
				<span slot="footer" class="dialog-footer">
    			<el-button @click="dialoglogin = false">取 消</el-button>
    			<el-button type="primary" @click="dialoglogin = false">安全退出</el-button>
  			</span>
			</el-dialog>
		</div>

	</div>
</template>

<script>
	  export default {
	  		name:'tea-course',
    data() {
      return {
          dialoglogin: false,
          courseware:[
            '课件一',
            '课件二',
            '课件三',
            '课件四'
          ]
      ,fileList3: [{
              name: 'food.pdf',
              url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
              status: 'finished'
          }],
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
        handleChange(file, fileList) {
            this.fileList3 = fileList.slice(-3);
        },
    	handleNodeClick(data) {
        console.log(data);
     },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
		handleClose(done) {
            console.log(1);
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
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
		.logo-small {
			background-position: 5px -20px;
			background-repeat: no-repeat;
			width: 200px;
			height: 40px;
			background-image: url(../../assets/logo-small.png);
			display: block;
			margin: 0 auto;
			margin-bottom: 10px;
		}
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
