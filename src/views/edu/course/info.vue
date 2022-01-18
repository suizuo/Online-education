<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>

<el-form label-width="120px">

        <el-form-item label="课程标题">
            <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
        </el-form-item>


          <el-form-item label="课程分类">
            <el-select
                v-model = "courseInfo.subjectParentId"
                placeholder="一级分类" @change="subjectLevelOneChanged">   
            <el-option
                v-for="subject in subjectOneList"
                :key="subject.id"
                :label="subject.title"
                :value="subject.id"/>
            </el-select>


            <el-select
                v-model = "courseInfo.subjectId"
                placeholder="二级分类">   
            <el-option
                v-for="subject in subjectTwoList"
                :key="subject.id"
                :label="subject.title"
                :value="subject.id"/>
            </el-select>
        </el-form-item>




        <el-form-item label="课程讲师">
            <el-select
                v-model = "courseInfo.teacherId"
                placeholder="请选择">
            <el-option
                v-for="teacher in teacherList"
                :key="teacher.id"
                :label="teacher.name"
                :value="teacher.id"/>
            </el-select>
        </el-form-item>

        <el-form-item label="总课时">
            <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
        </el-form-item>

        <el-form-item label="课程简介">
           <tinymce :height='300' v-model = "courseInfo.description"/>
        </el-form-item>


            <!-- 课程封面 -->
            <el-form-item label="课程封面">

                <el-upload
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :action="BASE_API+'/eduOss/fileOss'"
                    class="avatar-uploader">
                    <img :src="courseInfo.cover" height="200" width="200" >
                </el-upload>

            </el-form-item>
 

        <el-form-item label="课程价格">
            <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
        </el-form-item>

        <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
        </el-form-item>
        </el-form>
  </div>
</template>
<script> 
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
import Tinymce from '@/components/Tinymce'
export default {
    //第三方组件，声明之后才可以使用
    components:{Tinymce},
    data() {
        return {
            saveBtnDisabled:false,
            courseInfo:{
                title:'',
                subjectId:'',
                teacherId:'',
                lessonNum:0,
                description:'',
                subjectParentId:'',
                cover:'/static/hy.jpg',
                price:0
            },
            courseId:'',
            //封装所有讲师的数据
            teacherList:[],
            //一级分类
            subjectOneList:[],
            //二级分类
            subjectTwoList:[],
            BASE_API:process.env.BASE_API
        }
    },
    created() {
        //获取到路由中的id值 
        if(this.$route.params && this.$route.params.id){
            this.courseId = this.$route.params.id
            //调用方法
            this.getInfo()
        }else{
        //初始化所有讲师
        this.getListTeacher()
        this.getOneSubject()
        }

      
    },
    methods: {

        //根据课程id查询信息
        getInfo() {
            course.getCourseInfoId(this.courseId)
                .then(response =>{
                    // 在courseInfo中有课程的基本信息，包含一级分类id和二级分类id
                    this.courseInfo = response.data.courseInfoVo
                    //查询出所有的分类
                    subject.getSubjectList()
                        .then(response =>{
                            //获取所有的一级分类
                            this.subjectOneList = response.data.list

                            //把所有的一级数组进行遍历
                            for(var i =0;i<this.subjectOneList.length;i++){
                                var oneSubject = this.subjectOneList[i];
                                // 比较当前courseInfo里面的一级分类id和所有的一级分类id是否相等
                                if(this.courseInfo.subjectParentId == oneSubject.id){
                                    //获取一级分类所有的二级分类
                                    this.subjectTwoList = oneSubject.children
                                }
                            }
                        })
                //初始化所有讲师
                this.getListTeacher()
                })
        },

        // 上传封面成功
        handleAvatarSuccess(res,file){
           this.courseInfo.cover = res.data.url
        },
        // 上传之前要调的方法
        beforeAvatarUpload(file){
            const isJPG = file.type === 'image/jpeg'
            const isLt8M = file.size /1024 /1024 <8

            if(!isJPG){
                this.$message.error('上传头像的图片只能是jpg格式')
            }
            if(!isLt8M){
                this.$message.error('上传头像图片大小不能超过8MB!')
            }
            return isLt8M && isJPG
        },

        //当点击某个一级分类触发的change事件，显示对应的二级分类
        subjectLevelOneChanged(value){
            //设置二级分类框为空
            this.courseInfo.subjectId = ""
            //value就是一级分类的id值
            // alert(value);
            //遍历所有的分类，包含一级和二级
            for(var i = 0; i < this.subjectOneList.length;i++){
                //每个一级分类
                var oneSubject = this.subjectOneList[i]
                //判断，所有的一级分类的id 和 点击的一级分类的id是否一样
                if(value === oneSubject.id){
                    //从一级分类中获取所有的二级分类
                    this.subjectTwoList = oneSubject.children
                }
            }
        },

        //查询所有的一级分类
        getOneSubject(){
            subject.getSubjectList()
                .then(response =>{
                    this.subjectOneList = response.data.list
                })
        },

      //监听路由变化(原有bug：当先点击修改再点击添加时，会携带修改的数据到添加页面，
                            // 所以可以通过监听路由变化来设置teacher为空)
            getPath(){
                this.courseInfo ={cover:'/static/hy.jpg'}
            },
        //添加课程
        addCourse(){
            course.addCourseInfo(this.courseInfo)
                .then(response =>{
                    //提示信息
                    this.$message({
                        typr:'success',
                        message:'添加课程信息成功'
                    })
                //跳转到第二部
                this.$router.push({path:'/course/chapter/'+response.data.courseId})
                })      
            },
            //修改课程
            updateCourse(){
                course.updateCourseInfo(this.courseInfo)
                    .then(response =>{
                    //提示信息
                    this.$message({
                        typr:'success',
                        message:'修改课程信息成功'
                    })
                    //跳转到第二部
                    this.$router.push({path:'/course/chapter/'+this.courseId})
                    })
            },
        saveOrUpdate(){
            //判断是添加还是修改
            if(!this.courseInfo.id){
                //添加
                this.addCourse()
            }else{
                this.updateCourse()
            }
        },
        //查询所有讲师
        getListTeacher(){
            course.getListTeacher()
                .then(response =>{
                   this.teacherList = response.data.items
                })
        }
    },
    watch:{
         '$route' : 'getPath'
    },
}

</script>


<style scoped>
    .tinymce-container{
        line-height: 29px;
    }
</style>