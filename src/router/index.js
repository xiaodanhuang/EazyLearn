import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Login from  '@/pages/Login'
import Manager from  '@/pages/manager'
import Userset from '@/pages/user-set'
import Usercourse from '@/pages/user-course'
import Stdcourse from  '@/pages/student/stu-course'
import Stdwork from  '@/pages/student/stu-work'
import Stdtail from  '@/pages/student/stu-detail'
import Stdquestion from  '@/pages/student/stu-question'
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
		},{
			path:'/user-set',
			component:Userset


		},{
		path:'/user-course',
			component:Usercourse

		},

		{
			path: '/login',
			component:Login
		},
        {
            path: '/manager',
            component:Manager
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


				},
                {

                    path:"stu-tail",
                    name:'stu-tail',
                    component:Stdtail


                }

			]

		}

	]
})
