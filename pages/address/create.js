// pages/address/create.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    default:true
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
  createAddress:function(e){
    console.log(e);
    let value = e.detail.value;
    let address = value.address;
    let ville = value.ville;
    let country = value.country;
    let postcode = value.postcode;
    if(address==""){
      wx.showToast({
        title: '地址不能为空',
        icon:'none',
        duration:4000
      });
      return;
    }
    if(ville==""){
      wx.showToast({
        title: '地址不能为空',
        icon:'none',
        duration:4000
      });
      return;
    }
    if(country==""){
      wx.showToast({
        title: '地址不能为空',
        icon:'none',
        duration:4000
      });
      return;
    }
    
    if(postcode==""){
      wx.showToast({
        title: '地址不能为空',
        icon:'none',
        duration:4000
      });
      return;
    }
    let params = {};
    params["postcode"] = postcode;
    params["address"] = address;
    params["ville"] = ville;
    params["country"] = country;
    if(this.data.default){
      params["default"] = 1;
    }
    app.macie.createAddress(params).then(data=>{
      console.log(data);
      if(data.status===1){
        wx.navigateBack({
          delta: 0,
        });
      }
    });
  },
  defaultAddress:function(e){
    this.setData({default:!this.data.default});
  }
})