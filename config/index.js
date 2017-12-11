// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 9604,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        //登录模块
        '/loginBymanagerName': {
            target: 'http://127.0.0.1:8080/api/queryBymanagerName',
            changeOrigin:true,
            pathRewrite: {
                '^/loginBymanagerName': '/'
            }
        },
        '/loginByteaName': {
            target: 'http://127.0.0.1:8080/api/queryByteaName',
            changeOrigin:true,
            pathRewrite: {
                '^/loginByteaName': '/'
            }
        },
        '/loginBystuName': {
            target: 'http://127.0.0.1:8080/api/queryBystuName',
            changeOrigin:true,
            pathRewrite: {
                '^/loginBystuName': '/'
            }
        },
        //修改密码模块
        '/managePasswordUpdate': {
            target: 'http://127.0.0.1:8080/api/managePasswordUpdate',
            changeOrigin:true,
            pathRewrite: {
                '^/managePasswordUpdate': '/'
            }
        },
        //管理员课程资源管理
        '/manageByCourse': {
            target: 'http://127.0.0.1:8080/api/manageByCourse',
            changeOrigin:true,
            pathRewrite: {
                '^/manageByCourse': '/'
            }
        },
        '/manageCourseAdd': {
            target: 'http://127.0.0.1:8080/api/manageCourseAdd',
            changeOrigin: true,
            pathRewrite: {
                '^/manageCourseAdd': '/'
            }
        },
        '/manageCourseDelete': {
            target: 'http://127.0.0.1:8080/api/manageCourseDelete',
            changeOrigin:true,
            pathRewrite: {
                '^/manageCourseDelete': '/'
            }
        },
        //管理员教师资源管理
        '/manageByTeacher': {
            target: 'http://127.0.0.1:8080/api/manageByTeacher',
            changeOrigin:true,
            pathRewrite: {
                '^/manageByTeacher': '/'
            }
        },

        '/manageTeacherAdd': {
            target: 'http://127.0.0.1:8080/api/manageTeacherAdd',
            changeOrigin: true,
            pathRewrite: {
                '^/manageTeacherAdd': '/'
            }
        },
        '/manageTeacherDelete': {
            target: 'http://127.0.0.1:8080/api/manageTeacherDelete',
            changeOrigin:true,
            pathRewrite: {
                '^/manageTeacherDelete': '/'
            }
        },
        '/manageTeacherUpdate': {
            target: 'http://127.0.0.1:8080/api/manageTeacherUpdate',
            changeOrigin:true,
            pathRewrite: {
                '^/manageTeacherUpdate': '/'
            }
        },
        '/manageCourseUpdate': {
            target: 'http://127.0.0.1:8080/api/manageCourseUpdate',
            changeOrigin:true,
            pathRewrite: {
                '^/manageCourseUpdate': '/'
            }
        },
        //管理员学生资源管理
        '/manageByStudent': {
            target: 'http://127.0.0.1:8080/api/manageByStudent',
            changeOrigin:true,
            pathRewrite: {
                '^/manageByStudent': '/'
            }
        },
        '/manageStudentAdd': {
            target: 'http://127.0.0.1:8080/api/manageStudentAdd',
            changeOrigin: true,
            pathRewrite: {
                '^/manageStudentAdd': '/'
            }
        },
        '/manageStudentDelete': {
            target: 'http://127.0.0.1:8080/api/manageStudentDelete',
            changeOrigin:true,
            pathRewrite: {
                '^/manageStudentDelete': '/'
            }
        },
        '/manageStudentUpdate': {
            target: 'http://127.0.0.1:8080/api/manageStudentUpdate',
            changeOrigin:true,
            pathRewrite: {
                '^/manageStudentUpdate': '/'
            }
        },
        '/teacherByCourse': {
            target: 'http://127.0.0.1:8080/api/teacherByCourse',
            changeOrigin: true,
            pathRewrite: {
                '^/teacherByCourse': '/'
            }
        },
        '/teacherByChapter': {
            target: 'http://127.0.0.1:8080/api/teacherByChapter',
            changeOrigin: true,
            pathRewrite: {
                '^/teacherByChapter': '/'
            }
        },
        '/teacherChapterAdd': {
            target: 'http://127.0.0.1:8080/api/teacherChapterAdd',
            changeOrigin: true,
            pathRewrite: {
                '^/teacherChapterAdd': '/'
            }
        },
        '/teacherChapterDelete': {
            target: 'http://127.0.0.1:8080/api/teacherChapterDelete',
            changeOrigin: true,
            pathRewrite: {
                '^/teacherChapterDelete': '/'
            }
        },
        '/teacherChapterUpdate': {
            target: 'http://127.0.0.1:8080/api/teacherChapterUpdate',
            changeOrigin: true,
            pathRewrite: {
                '^/teacherChapterUpdate': '/'
            }
        },
        '/teacherByProclamation': {
            target: 'http://127.0.0.1:8080/api/teacherByProclamation',
            changeOrigin: true,
            pathRewrite: {
                '^/teacherByProclamation': '/'
            }
        },
        '/teacherProclamationUpdate': {
            target: 'http://127.0.0.1:8080/api/teacherProclamationUpdate',
            changeOrigin: true,
            pathRewrite: {
                '^/teacherProclamationUpdate': '/'
            }
        },
        '/teacherCourseWare': {
            target: 'http://127.0.0.1:8080/api/teacherCourseWare',
            changeOrigin: true,
            pathRewrite: {
                '^/teacherCourseWare': '/'
            }
        },
        '/stuByCourse': {
            target: 'http://127.0.0.1:8080/api/stuByCourse',
            changeOrigin:true,
            pathRewrite: {
                '^/stuByCourse': '/'
            }
        },
        '/stuMyCourse': {
            target: 'http://127.0.0.1:8080/api/stuMyCourse',
            changeOrigin:true,
            pathRewrite: {
                '^/stuMyCourse': '/'
            }
        },
        '/stuCourseByTime': {
            target: 'http://127.0.0.1:8080/api/stuCourseByTime',
            changeOrigin:true,
            pathRewrite: {
                '^/stuCourseByTime': '/'
            }
        },
        '/stuCourseByStu': {
            target: 'http://127.0.0.1:8080/api/stuCourseByStu',
            changeOrigin:true,
            pathRewrite: {
                '^/stuCourseByStu': '/'
            }
        },
        '/stuCourseByComment': {
            target: 'http://127.0.0.1:8080/api/stuCourseByComment',
            changeOrigin: true,
            pathRewrite: {
                '^/stuCourseByComment': '/'
            }
        },
        '/stuCommentAdd': {
            target: 'http://127.0.0.1:8080/api/stuCommentAdd',
            changeOrigin: true,
            pathRewrite: {
                '^/stuCommentAdd': '/'
            }
        },
        '/stuGuestAdd': {
            target: 'http://127.0.0.1:8080/api/stuGuestAdd',
            changeOrigin: true,
            pathRewrite: {
                '^/stuGuestAdd': '/'
            }
        },
        //课件的上传，下载和删除
        '/upLoadFile': {
            target: 'http://127.0.0.1:8080/api/upLoadFile',
            changeOrigin: true,
            pathRewrite: {
                '^/upLoadFile': '/'
            }
        },
        '/downLoad': {
            target: 'http://127.0.0.1:8080/api/downLoad',
            changeOrigin: true,
            pathRewrite: {
                '^/downLoad': '/'
            }
        },
        '/fileDelete': {
            target: 'http://127.0.0.1:8080/api/delete',
            changeOrigin: true,
            pathRewrite: {
                '^/fileDelete': '/'
            }
        },
        //作业的上传下载和删除
        '/upLoadWork': {
            target: 'http://127.0.0.1:8080/api/upLoadWork',
            changeOrigin: true,
            pathRewrite: {
                '^/upLoadWork': '/'
            }
        },
        '/homeDownLoad': {
            target: 'http://127.0.0.1:8080/api/homeDownLoad',
            changeOrigin: true,
            pathRewrite: {
                '^/homeDownLoad': '/'
            }
        },
        '/workDelete': {
            target: 'http://127.0.0.1:8080/api/workDelete',
            changeOrigin: true,
            pathRewrite: {
                '^/workDelete': '/'
            }
        },
        '/homeWorked': {
            target: 'http://127.0.0.1:8080/api/homeWorked',
            changeOrigin: true,
            pathRewrite: {
                '^/homeWorked': '/'
            }
        },
        '/stuCourseAdd': {
            target: 'http://127.0.0.1:8080/api/stuCourseAdd',
            changeOrigin: true,
            pathRewrite: {
                '^/stuCourseAdd': '/'
            }
        },
        '/stuCourseWork': {
            target: 'http://127.0.0.1:8080/api/stuCourseWork',
            changeOrigin: true,
            pathRewrite: {
                '^/stuCourseWork': '/'
            }
        },
        '/stuCourseQuery': {
            target: 'http://127.0.0.1:8080/api/stuCourseQuery',
            changeOrigin: true,
            pathRewrite: {
                '^/stuCourseQuery': '/'
            }
        },
        '/stuTeacherChat': {
            target: 'http://127.0.0.1:8080/api/stuTeacherChat',
            changeOrigin: true,
            pathRewrite: {
                '^/stuTeacherChat': '/'
            }
        },
        '/upLoadImage': {
            target: 'http://127.0.0.1:8080/upLoadImage',
            changeOrigin: true,
            pathRewrite: {
                '^/upLoadImage': '/'
            }
        }


    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
