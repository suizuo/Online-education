import request from '@/utils/request'

export default {
    //课程分类
    getSubjectList(){
      return request({
        url: `/eduService/subject/getAllSubject`,
        method: 'get',
      })    
    }

}
