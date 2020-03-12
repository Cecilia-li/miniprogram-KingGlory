import {request} from '../../utils/request'

Page({
  data: {
    heroList: ['小乔', '大乔'],
    index:0,
    resultsList:[],
    img: [],
    // imgFlag: false
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  loadHero:function(){
    let that = this;
    request({
      url:'http://gamehelper.gm825.com/wzry/hero/list?channel_id=90009a&app_id=h9044j&game_id=7622&game_name=%E7%8E%8B%E8%80%85%E8%8D%A3%E8%80%80&vcode=12.0.3&version_code=1203&cuid=2654CC14D2D3894DBF5808264AE2DAD7&ovr=6.0.1&device=Xiaomi_MI+5&net_type=1&client_id=1Yfyt44QSqu7PcVdDduBYQ%3D%3D&info_ms=fBzJ%2BCu4ZDAtl4CyHuZ%2FJQ%3D%3D&info_ma=XshbgIgi0V1HxXTqixI%2BKbgXtNtOP0%2Fn1WZtMWRWj5o%3D&mno=0&info_la=9AChHTMC3uW%2BfY8%2BCFhcFw%3D%3D&info_ci=9AChHTMC3uW%2BfY8%2BCFhcFw%3D%3D&mcc=0&clientversion=&bssid=VY%2BeiuZRJ%2FwaXmoLLVUrMODX1ZTf%2F2dzsWn2AOEM0I4%3D&os_level=23&os_id=dc451556fc0eeadb&resolution=1080_1920&dpi=480&client_ip=192.168.0.198&pdunid=a83d20d8'
    }).then((res)=>{
      if (res.data.error_code === 0) {
        let hero = [];
        for(let i = 0; i < 30; i++) {
          hero.push(res.data.list[i].name);
        }
        that.setData({
          heroList:hero,
          resultsList: res.data.list.slice(0, 30)
        });
      }
    });
  },
  getImgUrl: function(e) {
    let that = this ;
    that.setData({
      img: e.detail
    });
    // console.log(that.data.img);
  },

  /* 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    this.loadHero();
  },
  formReset(){
    this.setData({
      img:[],
      imgFlag: false
    });
  },
  formSubmit: function (e) {
    let that = this;
    
    let txt = e.detail.value.description;
    console.log(that.data.img);
    console.log(that.data.resultsList[that.data.index].hero_id);
    if(!txt){
      wx.showToast({
        title: '请先填写攻略文字',
        icon: 'none',
        duration: 2000
      });
    }else {
      request({
        url:'https://result.eolinker.com/RpWxAgXfa68dd94a3d6e344be61ce00291284790183c7bc?uri=gameWz/upload',
        data: {
          heroId:that.data.resultsList[that.data.index].hero_id,
          description: txt,
          imgUrl: that.data.img
        }
      }).then((res)=>{
        if (res.data.code === 0) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          });
          wx.switchTab({
            url:"../skills/skills"
          });
        }
      });
    }
  }
 
})