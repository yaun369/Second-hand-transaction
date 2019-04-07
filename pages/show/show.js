// pages/show/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showList: [{
      images: ["http://bmob-cdn-20041.b0.upaiyun.com/2018/06/28/a7da358740a1268a80bd00998be8b7b6.jpg", "http://bmob-cdn-20041.b0.upaiyun.com/2018/06/28/53f44ecb4041b0ed8085347bb77f858a.jpg", "http://bmob-cdn-20041.b0.upaiyun.com/2018/06/28/f25d00e340db95f580430ee6757f5bd5.jpg"],
      avatar: 'http://bmob-cdn-20041.b0.upaiyun.com/2018/06/28/53f44ecb4041b0ed8085347bb77f858a.jpg',
      nickname: '图书图书图书图书图书图书',
      info: '图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书'
    }, {
      images: ["http://bmob-cdn-20041.b0.upaiyun.com/2018/06/28/a7da358740a1268a80bd00998be8b7b6.jpg", "http://bmob-cdn-20041.b0.upaiyun.com/2018/06/28/53f44ecb4041b0ed8085347bb77f858a.jpg", "http://bmob-cdn-20041.b0.upaiyun.com/2018/06/28/f25d00e340db95f580430ee6757f5bd5.jpg"],
      avatar: 'http://bmob-cdn-20041.b0.upaiyun.com/2018/06/28/53f44ecb4041b0ed8085347bb77f858a.jpg',
      nickname: '图书图书图书图书图书图书',
      info: '图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书'
    }, {
      images: ["http://bmob-cdn-20041.b0.upaiyun.com/2018/06/28/a7da358740a1268a80bd00998be8b7b6.jpg", "http://bmob-cdn-20041.b0.upaiyun.com/2018/06/28/53f44ecb4041b0ed8085347bb77f858a.jpg", "http://bmob-cdn-20041.b0.upaiyun.com/2018/06/28/f25d00e340db95f580430ee6757f5bd5.jpg"],
      avatar: 'http://bmob-cdn-20041.b0.upaiyun.com/2018/06/28/53f44ecb4041b0ed8085347bb77f858a.jpg',
      nickname: '图书图书图书图书图书图书',
      info: '图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书图书'
    }]
  },
  goToSubmit(){
    wx.navigateTo({
      url: '/pages/showSubmit/showSubmit',
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