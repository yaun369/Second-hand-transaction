// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: ["http://bmob-cdn-20041.b0.upaiyun.com/2018/06/28/a7da358740a1268a80bd00998be8b7b6.jpg", "http://bmob-cdn-20041.b0.upaiyun.com/2018/06/28/53f44ecb4041b0ed8085347bb77f858a.jpg", "http://bmob-cdn-20041.b0.upaiyun.com/2018/06/28/f25d00e340db95f580430ee6757f5bd5.jpg"],
    navigation: [{
      src: '../../images/read.png',
      title: '图书'
    }, {
      src: '../../images/sport.png',
      title: '体育'
    }, {
      src: '../../images/camera.png',
      title: '数码'
    }, {
      src: '../../images/image.png',
      title: '作品'
    }, {
      src: '../../images/like.png',
      title: '喜欢'
    }, {
      src: '../../images/user.png',
      title: '联系'
    }, {
      src: '../../images/ups.png',
      title: '秀'
    }, {
      src: '../../images/star.png',
      title: '收藏'
    }],
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
  onLoad: function(options) {
    // wx.request({
    //   url: 'https://wxapp.geekreading.cn/index/shopList',
    //   data: {},
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data);
    //   }
    // });
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