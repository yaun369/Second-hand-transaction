// pages/submit/submit.js
const Bmob = require('../../utils/Bmob-1.7.0.min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    preview: ['../../images/add.png'],
    index: 0,
    classArray: [],
    fileList: []
  },
  getClassList() {
    let query = Bmob.Query("class");
    query.select("title");
    query.find().then(res => {
      // console.log(res);
      // let arr = [];
      res.forEach(element => {
        this.data.classArray.push(element.title);
      });
      // console.log(this.data.classArray);
      // this.data.classArray = res.concat();
      this.setData({
        res: res,
        classArray: this.data.classArray
      })
    });
  },
  bindPickerChange(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit(e) {
    const obj = e.detail.value;
    // console.log(obj);
    if (this.data.fileList.length === 0) {
      wx.showToast({
        title: '最少上传一张图片哦',
        icon: 'none'
      })
    } else if (!(obj.title && obj.wechat && obj.info && obj.price)) {
      wx.showToast({
        title: '填写信息有误请核对',
        icon: 'none'
      })
    } else {
      wx.showLoading();
      // console.log(e.detail.value);
      const query = Bmob.Query('product');
      var file;
      for (let item of this.data.fileList) {
        // console.log('item', item);
        file = Bmob.File('submit.jpg', item);
      }
      file.save().then(ress => {
        // console.log("ress", ress);
        query.set("image", ress);
        query.set("user", wx.getStorageSync('userInfo'));
        query.set("title", obj.title);
        query.set("class", obj.class.title);
        query.set("content", obj.info);
        query.set("wechat", obj.wechat);
        query.set("price", obj.price);
        query.save().then(res => {
          // console.log(res)
          wx.hideLoading();
          wx.showToast({
            title: '提交成功',
            icon: 'none'
          })
        }).catch(err => {
          console.log(err)
        })
      })
    }
  },
  updataImages() {
    const that = this;
    wx.chooseImage({
      count: 6,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        let tempFilePaths = res.tempFilePaths;
        that.data.fileList = tempFilePaths;
        // console.log(that.data.fileList);
        that.setData({
          preview: tempFilePaths
        });
      }
    })
  },
  getUserInfo: function(e) {
    wx.setStorageSync('userInfo', e.detail.userInfo);
    Bmob.User.upInfo(e.detail.userInfo);
    this.setData({
      hasNewUser: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getClassList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        hasNewUser: true
      })
    } else {
      this.setData({
        hasNewUser: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})