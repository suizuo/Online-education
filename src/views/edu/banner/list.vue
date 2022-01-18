<template>
    <div class="app-container">

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="crmBanner.title" placeholder="banner名"/>
      </el-form-item>

      <el-form-item>
        <el-input v-model="crmBanner.sort" placeholder="排序"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标题" width="80" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column prop="sort" label="排序" width="60" />

        <el-table-column label="banner缩略" width="100">
                <template scope="scope">
                    <img :src="scope.row.imageUrl" width="40" height="40" class="head_pic"/>
                </template>
            </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/banner/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>

          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteBanner(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

    </div>
</template>


<script>
// 引入调用teacher.js文件
import banner from '@/api/edu/banner.js'


export default {
    data() {
        //定义数据变量和初始值
        return {
            list:null,//查询之后接口返回集合
            page:1,  //当前页
            limit:5,  //每页显示记录数
            total:0, //总记录数
            crmBanner:{},//条件封装的对象
        
        }
    },
    created(){
        //在页面渲染之前执行,一般是调用methods里面的方法
        this.getList()
    },
    methods: {
        //创建具体的方法，调用teacher.js里面定义的方法
        //讲师列表的方法
        getList(page = 1){
            this.page = page
            // axios.post("").then().catch()
            banner.getBannerListPage(this.page,this.limit)
                .then(response => {
                    //response表示接口返回的数据
                    // console.log(response)
                    this.list = response.data.rows
                    this.total = response.data.total
                    console.log(this.rows)   
                    console.log(this.total)
                }) //请求成功
                .catch(error =>{
                    console.log(error)
                })//请求失败
        },
        resetData(){
            //清空表单输入项
            this.crmBanner = {}
            
            //查询所有讲师数据
            
            this.getList()
        },
        //删除banner
        deleteBanner(id){
          this.$confirm('此操作将永久删除banner记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

            
          banner.deleteBanner(id)
            .then(response =>{
              //删除成功
              //提示信息
            this.$message({
            type: 'success',
            message: '删除成功!'
          })
              //回到列表页面
              this.getList(this.page)
            })
      })
    }
  }
}
</script>