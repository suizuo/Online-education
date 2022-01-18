import request from '@/utils/request'

export default {
    //讲师列表(条件查询分页)
    //current代表当前页，limit每页记录数，teacherQuery条件对象
    getTeacherListPage(current,limit,teacherQuery){

      return request({
        url: `/eduService/teacher/pageTeacherCondition/${current}/${limit}`,
        method: 'post',
        // data表示把对象转换成json传递到接口里面
        data: teacherQuery
      })
    
    },
    //逻辑删除讲师
    deleteTeacherId(id){
      return request({
        url: `/eduService/teacher/${id}`,
        method: 'delete',
      })
    },
    //添加讲师
    addTeacher(teacher){
      return request({
        url: `/eduService/teacher/addTeacher`,
        method: 'post',
        data: teacher
      })
    },
    //根据id查询讲师
    getTeacherInfo(id){
      return request({
        url: `/eduService/teacher/getTeacher/${id}`,
        method: 'get',
      })
    },
    //修改讲师
    updateTeacherInfo(teacher){
      return request({
        url: `/eduService/teacher/updateTeacher`,
        method: 'post',
        data: teacher
      })
    }

}
