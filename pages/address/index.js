// pages/address/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addresses:[],
    default:null,
    orid:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.orid){
      this.setData({orid:options.orid});
    }
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
    app.macie.getAllAddress().then(data=>{
      console.log(data);
      if(data.status===1){
        self.setData({addresses:data.addresses,default:data.default});
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
  createAddress:function(){
    wx.navigateTo({
      url: '/pages/address/create',
    })
  },
  delete:function(e){
    let self = this;
    let id = e.currentTarget.dataset.id;
    let params = {};
    params["id"] = id;
    app.macie.deleteAddress(params).then(data=>{
      if(data.status===1){
        self.onShow();
      }
    });
  },
  set:function(e){
    let self = this;
    let id = e.currentTarget.dataset.id;
    let params = {};
    params["id"] = id;
    app.macie.setDefaultAddress(params).then(data=>{
      if(data.status===1){
        self.onShow();
      }
    });
  },
  selectAddress:function(e){
    wx.showLoading({
      title: '正在设置',
    });
    let self = this;
    let id = e.currentTarget.dataset.id;
    let params = {};
    params["aid"] = id;
    params["orid"] = this.data.orid;
    console.log(params);
    app.macie.setOrderAddress(params).then(data=>{
      console.log(data);
      wx.hideLoading({
        complete: (res) => {},
      });
      if(data.status===1){
        wx.navigateBack({
          delta: 1,
        });
      }else{
        self.onShow();
      }
    });
  }
  
})