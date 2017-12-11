import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export  default  new Vuex.Store({
    state: {
        teacherId:'',
        courseId:'',
        courseSrc:'',
        courseStu:'',
        courseTeacher:'',
        courseName:'',
        stuId:'',
        manageId:'',
        userName:'',
        courseList:[]
    },
    mutations: {
        postTeacherId (state, id) {
            state.teacherId=id;
        },
        postCourseId (state, id) {
            state.courseId=id;
        },
        postCourseSrc (state, courseSrc) {
            state.courseSrc=courseSrc;
        } ,
        postCourseStu (state,courseStu) {
            state.courseStu=courseStu;
        } ,
        postCourseTeacher (state,courseTeacher) {
            state.courseTeacher= courseTeacher;
        },
        postCourseName (state,courseName) {
            state.courseName=courseName;
        } ,
        postStuId (state,stuId) {
            state.stuId=stuId;
        },
        postManageId (state, manageId) {
            state.manageId= manageId;
        },
        postUserName (state, userName) {
            state.userName=userName;
        },
        postCourseList (state, courseList) {
            state.courseList=courseList;
        }

    }
});