// pages/order/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:null,
    type:"1"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({type:options.type});
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
    let params = {};
    params["type"] = this.data.type;
    app.macie.orderLists(params).then(data => {
      console.log(data);
      if (data.status === 1) {
        self.setData({ orders: data.orders });
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
  detail:function(e){
    console.log(e);
    let orid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/car/order?orid=' + orid,
    });
  }
})