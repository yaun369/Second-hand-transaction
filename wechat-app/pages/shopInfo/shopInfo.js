// pages/shopInfo/shopInfo.js
const Bmob = require('../../utils/Bmob-1.7.0.min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {},
  copyWechat() {
    // console.log(this.wechat);
    wx.setClipboardData({
      data: this.wechat,
      success(res) {}
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
    // console.log(options);
    const query = Bmob.Query('product');
    query.get(options.id).then(res => {
      // console.log(res);
      this.wechat = res.wechat;
      wx.setNavigationBarTitle({
        title: res.title
      })
      this.setData({
        obj: res
      })
    }).catch(err => {
      console.log(err)
    })
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