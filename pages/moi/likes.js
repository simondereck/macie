// pages/moi/likes.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    likes:null
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
    let self = this;
    app.macie.getLikes().then(data => {
      console.log(data);
      if (data.status === 1) {
        self.setData({likes:data.likes});
      } else if (!data.islogin) {
        wx.navigateTo({
          url: '/pages/moi/login',
        });
      }
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

  },
  goodsDetail:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/goods/detail?id=' + id,
    });
  }
})