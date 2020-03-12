// pages/content/content.js
import { request } from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: null,
    cinput: "",
    comment: [],
    tocomment: [],
    user: ""
  },

  //获取article接口数据
  getArticle() {
    const that = this
    request({
      url: "https://result.eolinker.com/iTnTRyi567098085c26f4327b92d0306f2d95828a8a8a55?uri=/article",
    }).then(res => {
      that.setData({
        article: res.data.content
      })
    })
  },

  //获取comment接口数据
  getComment() {
    const that = this
    request({
      url: "https://result.eolinker.com/iTnTRyi567098085c26f4327b92d0306f2d95828a8a8a55?uri=/comment",
    }).then(res => {
      that.setData({
        comment: res.data.comment
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getArticle()
    this.getComment()
    this.getuserinfo()
  },

  //获取评论框内容
  incomment: function (e) {
    var that = this;
    that.setData({
      cinput: e.detail.value
    })
  },

  getuserinfo: function(){
    wx.getUserInfo({
      success: (res) =>{
        this.setData({
          user: res.userInfo && res.userInfo.nickName
        })
      }
    })
  },

  //发表评论
  subcomment: function (e) {
    if (this.data.cinput == '') {
      wx.showToast({
        title: '请输入内容',
      })

    } else {
      var textarea_item = {};
      var textareaValue = this.data.cinput;
      this.data.comment.unshift({ "c1": this.data.cinput, "user": this.data.user})
      this.setData({
        comment: this.data.comment
      })
      this.setData({
        'textareaValue': ""
      })
    }
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