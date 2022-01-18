import request from '@/utils/request'

export default {

    getBannerListPage(page,limit,crmBanner){
        return request({
          url: `/eduCms/bannerAdmin/pageBanner/${page}/${limit}`,
          method: 'post',
          // data表示把对象转换成json传递到接口里面
          data:crmBanner
        })
      },




        //删除banner
    deleteBanner(id){
      return request({
        url: `/eduCms/bannerAdmin/removeBanner/${id}`,
        method: 'delete',
      })
    },
    //添加banner
    addBanner(crmBanner){
      return request({
        url: `/eduCms/bannerAdmin/addBanner`,
        method: 'post',
        data: crmBanner
      })
    },
    //根据id查询
    getBannerInfo(id){
      return request({
        url: `/eduCms/bannerAdmin/getBannerById/${id}`,
        method: 'get',
      })
    },
    //修改banner
    updateBanner(crmBanner){
      return request({
        url: `/eduCms/bannerAdmin/updateBanner`,
        method: 'post',
        data: crmBanner
      })
    }



}