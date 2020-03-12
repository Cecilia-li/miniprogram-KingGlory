//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currentTab: 0,
    swiperImageUrl:[]
  },
  //滑动切换
  swiperTab: function(e) {
    this.setData({
      currentTab: e.detail.current
    })
  },
  newsClassifyTab:function(e){
    this.setData({
       currentTab: e.currentTarget.id
    })
  },  
  skip:function(){
    console.log("navigateTo");
    wx.navigateTo({
      url: '../content/content'
    })
  },
  onLoad:function(){    
    var that =this;    
    wx.request({      
      url: 'https://result.eolinker.com/iyeY73J603e452ad9775839412aa3b0319b607a6e56683a?uri=/demo/swiper-image',      
      header: {        
        'content-type': 'application/json'      
      },      
      success: function (res) {              
        that.setData({            
          swiperImageUrl: res.data.urls
        })      
      }    
    })  
  } 
})
