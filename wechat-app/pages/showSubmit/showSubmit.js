// pages/showSubmit/showSubmit.js
const Bmob = require('../../utils/Bmob-1.7.0.min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    preview: ['../../images/add.png'],
    fileList: []
  },
  formSubmit(e) {
    console.log(e.detail.value);
    const obj = e.detail.value;
    if (this.data.fileList.length === 0) {
      wx.showToast({
        title: '最少上传一张图片哦',
        icon: 'none'
      })
    } else if (!obj.info) {
      wx.showToast({
        title: '填写信息有误请核对',
        icon: 'none'
      })
    } else {
      wx.showLoading();
      const query = Bmob.Query('show');
      var file;
      for (let item of this.data.fileList) {
        file = Bmob.File('showsubmit.jpg', item);
      }
      file.save().then(ress => {
        query.set("image", ress);
        query.set("user", wx.getStorageSync('userInfo'));
        query.set("content", obj.info);
        query.save().then(res => {
          wx.hideLoading();
          wx.showToast({
            title: '提交成功',
            icon: 'none'
          })
          wx.redirectTo({
            url: '/pages/show/show',
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
      count: 3,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        that.data.fileList = tempFilePaths;
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