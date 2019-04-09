// pages/classInfo/classInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [{
      id: 1,
      user: 'tt收藏sd',
      image: 'http://bmob-cdn-20041.b0.upaiyun.com/2018/06/28/a7da358740a1268a80bd00998be8b7b6.jpg',
      title: '天天快递桑萨努时代',
      value: '200.34'
    }, {
      id: 2,
      user: 'tt收藏sd',
      image: 'http://bmob-cdn-20041.b0.upaiyun.com/2018/06/28/a7da358740a1268a80bd00998be8b7b6.jpg',
      title: '天天快递桑萨努时代',
      value: '200.34'
    }, {
      id: 3,
      user: 'tt收藏sdtt收藏sdtt收藏sd',
      image: 'http://bmob-cdn-20041.b0.upaiyun.com/2018/06/28/a7da358740a1268a80bd00998be8b7b6.jpg',
      title: '天天快递桑萨努时代',
      value: '200.34'
    }, {
      id: 4,
      user: 'tt收藏sd',
      image: 'http://bmob-cdn-20041.b0.upaiyun.com/2018/06/28/a7da358740a1268a80bd00998be8b7b6.jpg',
      title: '天天快递桑sssss萨努时代',
      value: '200.34'
    }]
  },
  goToInfo(e) {
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/shopInfo/shopInfo?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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