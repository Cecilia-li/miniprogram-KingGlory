// pages/skills/skills.js
import {
  request
} from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    heroList: [],
    hotHero: [],
    skills:[],
    heroClassify: [{
      classify: '热门',
      hero:[]
    }, {
      classify: '坦克',
      hero:[]
    }, {
      classify: '战士',
      hero:[]
    }, {
      classify: '刺客',
      hero:[]
    }, {
      classify: '法师',
      hero:[]
    }, {
      classify: '射手',
      hero:[]
    }, {
      classify: '辅助',
      hero:[]
    }],

    active: 0,
    toShow: false
  },

  // bindGetUserInfo() {
  //   const that = this
  //   wx.getUserInfo({
  //     success(res) {
  //       that.setData({
  //         userInfo: res.userInfo
  //       })
  //     }
  //   })
  // },
  toUpload:function(){
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              wx.navigateTo({
                url:"../upload/upload"
              });
            }
          })
        }
      }
    });
  },
  fetchSkills(){
    const that = this
    request({
      url:'https://result.eolinker.com/dSa7SDte032222ab9c999fbed2c6fcebe8c7d7e41660ac3?uri=/skills',
    }).then(res=>{
      that.setData({
        skills:res.data.skillsList
      })
    })
  },
  fetchHero() {
    const that = this
    request({
        url: 'http://gamehelper.gm825.com/wzry/hero/list?channel_id=90009a&app_id=h9044j&game_id=7622&game_name=%E7%8E%8B%E8%80%85%E8%8D%A3%E8%80%80&vcode=12.0.3&version_code=1203&cuid=2654CC14D2D3894DBF5808264AE2DAD7&ovr=6.0.1&device=Xiaomi_MI+5&net_type=1&client_id=1Yfyt44QSqu7PcVdDduBYQ%3D%3D&info_ms=fBzJ%2BCu4ZDAtl4CyHuZ%2FJQ%3D%3D&info_ma=XshbgIgi0V1HxXTqixI%2BKbgXtNtOP0%2Fn1WZtMWRWj5o%3D&mno=0&info_la=9AChHTMC3uW%2BfY8%2BCFhcFw%3D%3D&info_ci=9AChHTMC3uW%2BfY8%2BCFhcFw%3D%3D&mcc=0&clientversion=&bssid=VY%2BeiuZRJ%2FwaXmoLLVUrMODX1ZTf%2F2dzsWn2AOEM0I4%3D&os_level=23&os_id=dc451556fc0eeadb&resolution=1080_1920&dpi=480&client_ip=192.168.0.198&pdunid=a83d20d8'
      }).then((res) => {
        if (res.data.error_code === 0) {
          that.data.heroClassify.map((v, i) => {
            v.hero = res.data.list.slice(i*10,(i+1)*10)
          })
          that.setData({
            heroList: res.data.list,
            hotHero: res.data.list.slice(0, 5),
            testList:that.data.heroClassify[0].hero
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  changeActive(e) {
    this.setData({
      active: e.currentTarget.dataset.index,
      testList:this.data.heroClassify[e.currentTarget.dataset.index].hero
    })
  },
  show() {
    this.setData({
      toShow: !this.data.toShow
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const that = this
    // wx.getSetting({
    //     success(res) {
    //       if (res.authSetting['scope.userInfo']) {
    //         wx.getUserInfo({
    //           success(res) {
    //             that.setData({
    //               userInfo: res.userInfo
    //             })
    //           }
    //         })
    //       }
    //     }
    //   }),
      this.fetchHero()
      this.fetchSkills()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})