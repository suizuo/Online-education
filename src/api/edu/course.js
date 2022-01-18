import request from '@/utils/request'

export default {


    //删除课程信息
    deleteCourse(courseId){
      return request({
        url: `/eduService/course/${courseId}`,
        method: 'delete',
      })
   },



  //分页查询课程
   //current代表当前页，limit每页记录数
   getCourseListPage(current,limit,courseQuery){
      return request({
        url: `/eduService/course/pageCourseCondition/${current}/${limit}`,
        method: 'post',
        data:courseQuery
      })
   },

    //添加课程信息
    addCourseInfo(courseInfo){
      return request({
        url: `/eduService/course/addCourseInfo`,
        method: 'post',
        data:courseInfo
      })    
    },
    // 查询所有讲师，用于课程显示
     getListTeacher(){
       return request({
         url:`/eduService/teacher/findAll`,
         method:'get'
       })
     },
     //根据课程id查询课程基本信息
     getCourseInfoId(id){
      return request({
        url:`/eduService/course/getCourseInfo/${id}`,
        method:'get'
      })
    },
     //修改课程信息
     updateCourseInfo(courseInfo){
      return request({
        url:`/eduService/course/updateCourseInfo/`,
        method:'post',
        data:courseInfo
      })
    },

    //课程确认信息的显示
    getpublishCourseInfo(id){
      return request({
        url:`/eduService/course/getPublishCourseInfo/${id}`,
        method:'get',
      })
    },
    //课程最终发布
    publishCourse(id){
      return request({
        url:`/eduService/course/publishCourse/${id}`,
        method:'post',
      })
    },
    //课程列表
    getListCourse(){
      return request({
        url:`/eduService/course`,
        method:'get',
      })
    },

}
