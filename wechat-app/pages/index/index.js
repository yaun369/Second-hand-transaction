// pages/index/index.js
const Bmob = require('../../utils/Bmob-1.7.0.min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    navigation: [{
      id: 2,
      src: '../../images/read.png',
      title: '图书'
    }, {
      id: 2,
      src: '../../images/sport.png',
      title: '体育'
    }, {
      id: 2,
      src: '../../images/camera.png',
      title: '数码'
    }, {
      id: 2,
      src: '../../images/user.png',
      title: '服饰'
    }],
    shopList: [{
      id: 1,
      user: 'nickname',
      image: 'http://bmob-cdn-20041.b0.upaiyun.com/2018/06/28/a7da358740a1268a80bd00998be8b7b6.jpg',
      title: '华为matebook笔记本',
      value: '2800'
    }, {
      id: 2,
      user: '一天又一天',
      image: 'http://bmob-cdn-20041.b0.upaiyun.com/2018/06/28/a7da358740a1268a80bd00998be8b7b6.jpg',
      title: 'iPhoneX美版64G版本',
      value: '4400'
    }, {
      id: 3,
      user: '哒哒哒',
      image: 'http://bmob-cdn-20041.b0.upaiyun.com/2018/06/28/a7da358740a1268a80bd00998be8b7b6.jpg',
      title: '耐克sbat-A3系列运动鞋',
      value: '200'
    }]
  },
  goToInfo(e) {
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/shopInfo/shopInfo?id=' + id,
    })
  },
  goToShow() {
    wx.navigateTo({
      url: '/pages/show/show',
    })
  },
  bindInputValue(e) {
    this.searchValue = e.detail.value;
  },
  bindSearch() {
    if (this.searchValue != undefined) {
      wx.navigateTo({
        url: '/pages/classInfo/classInfo?search=' + this.searchValue,
      })
    } else {
      wx.showToast({
        title: '请输入商品名称',
        icon: 'none'
      })
    }
  },
  goToClassInfo(e) {
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/classInfo/classInfo?id=' + id,
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
    const query = Bmob.Query("banner");
    query.find().then(res => {
      console.log(res);
      this.setData({
        banners: res
      })
    });
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