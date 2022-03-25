// pages/search/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywords:null,
    brand:null,
    activity:null,
    category:null,
    goods:null
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

  },
  search:function(e){
    let self = this;
    let keywords = e.detail.value.keyword;
    if(keywords===""){
      wx.showModal({
        title: '提醒',
        content: '关键词不能为空',
      });
      return;
    }

    let params = {keywords:keywords};
    app.macie.searchItem(params).then(data=>{
      console.log(data);
      if(data.status===1){
        self.setData({brand:data.brand,activity:data.activity,category:data.category,goods:data.goods});
      }
    });
    
  },
  activity:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/activity/index?id=' + id,
    });
  },
  brand:function(e){
    let id = e.currentTarget.dataset.id;
    app.globalData.brand = id;
    wx.switchTab({
      url: '/pages/brand/index?id=' + id,
    });
  },
  category:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/category/index?id=' + id,
    });
  },
  detail:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/goods/detail?id=' + id,
    });
  }
})