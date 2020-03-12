// components/upload/upload.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    img: {    // 保存图片的本地地址
      type: Array,
      value: [],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgFlag: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    chooseImg() {
      var that = this;
      wx.chooseImage({
        count: 9, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          let tempFilePaths = res.tempFilePaths;
          console.log(res);
          // let imgList = that.data.img;
          // imgList.push(tempFilePaths)
          // that.setData({
          //   img: imgList,
          // })  // 这里采取的是可以循环添加图片
          that.setData({
            img: tempFilePaths,
            imgFlag: true
          });     // 这里采取的是一次性添加，但是如果不仅要九张，很明显就需要上面那种方法了
          that.triggerEvent('getImgUrl',tempFilePaths);
        },
        fail: function() {
          that.setData({
            // img: [],
            // imgFlag: false
          })
        }
      })
    },
    delImg(e){
      console.log(e.currentTarget.dataset.index);
      let that = this;
      let imgList = that.data.img;
      imgList.splice(e.currentTarget.dataset.index,1);
      if(imgList.length===0){
        that.setData({
          img:imgList,
          imgFlag: false
        });
      }else {
        that.setData({
          img:imgList
        })
      }
      
    },
    /* 开始上传*/
    startUpload() {
      let imgList = this.data.img;
      let leng = imgList.length;
      for (let i = 0; i < leng; i++) {
        this.uploadImg(i);
      }
    },
  
    /*  用户上传图片*/
    uploadImg(index) {
      let imgList = this.data.img;
      const uploadTask = wx.uploadFile({
        url: '......',
        filePath: imgList[index],
        name: 'fileData',
        header: {
          "Content-Type": "multipart/form-data"
        },
        formData: {
          //....
          'userId': index
        },
        success: function (res) {
          console.log(res)
        },
        fail(res) {
          console.log(res)
        },
        complete(res) {
          // console.log(res)  
        }
      })
  
      uploadTask.onProgressUpdate((res) => {
        console.log('上传进度', res.progress)
        console.log('已经上传的数据长度', res.totalBytesSent)
        console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
      })
    },
  
    /* 用户预览图片*/
    previewImg(e) {
      var imgList = this.data.img
      var index = e.currentTarget.dataset.index
      wx.previewImage({
        current: imgList[index],
        urls: imgList,
      })
    }
  }
})
