import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Login from  '@/pages/Login'
import Stdcourse from  '@/pages/student/stu-course'
import Stdwork from  '@/pages/student/stu-work'
import Stdquestion from  '@/pages/student/stu-question'
import Stdset from  '@/pages/student/stu-set'
import Tea from  '@/pages/teacher'
import Teacourse from  '@/pages/teacher/tea-course'
import Teawork from  '@/pages/teacher/tea-work'
import Teaquestion from  '@/pages/teacher/tea-question'


Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name:"login",
			component:Login
		},
		{
			path: '/login',
			component:Login
		},
		,{
				path: '/teacher',
				component:Tea,
				children: [
				{

            path:"tea-course",
            name:'tea-course',
            component:Teacourse
          },
          {

            path:"tea-work",
            name:'tea-work',
            component:Teawork
          },
          {

            path:"tea-question",
            name:'tea-question',
            component:Teaquestion


          }


				]



		}
		,
		{
			path:'/index',
			// name:'index',
			component:Index,
			children: [
				{

					path:"stu-course",
					name:'stu-course',
					component:Stdcourse


				},
				{

					path:"stu-work",
					name:'stu-work',
					component:Stdwork


				},
				{

					path:"stu-question",
					name:'stu-question',
					component:Stdquestion


				}
				,{

					path:"stu-set",
					component:Stdset


				}

			]

		}

	]
})
