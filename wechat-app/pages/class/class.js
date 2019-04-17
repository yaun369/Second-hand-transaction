// pages/class/class.js
const Bmob = require('../../utils/Bmob-1.7.0.min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classArray: [{ title: '平台推荐', color: '#1296db', classItem: [] }, { title: '最近更新', color: '#000', classItem: [] }]
  },
  goToClassInfo(e) {
    // console.log(e.currentTarget.id);
    wx.navigateTo({
      url: `/pages/classInfo/classInfo?title=${e.currentTarget.id}`,
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
    const query = Bmob.Query("class");
    query.find().then(res => {
      // console.log(res);
      this.data.classArray[0].classItem = res.concat();
      this.setData({
        classArray: this.data.classArray
      })
    });
    query.order("-updatedAt");
    query.limit(5);
    query.find().then(res => {
      // console.log(res);
      this.data.classArray[1].classItem = res.concat();
      this.setData({
        classArray: this.data.classArray
      })
    });
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