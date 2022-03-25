// pages/moi/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:null
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
    app.macie.userinfo().then(data => {
      console.log(data);
      if (data.status === 1) {
        self.setData({ userinfo: data.user });
        wx.setStorageSync("userinfo", data.user);
      }else{
        self.setData({userinfo:null});
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
  logout:function(){
    let self = this;
    app.macie.logout().then(data=>{
      if(data.status===1){
        wx.showModal({
          title:'提示',
          content:'退出成功',
          showCancel:false,
          success:function(){
            app.macie.clearCookie();
            self.onShow();
          }
        });
      }else{
        wx.showModal({
          title:'提示',
          content:data.message,
          showCancel:false
        });
      }
    });
  },
  login:function(){
    wx.navigateTo({
      url: '/pages/moi/login',
    });
  },
  likes:function(){
    wx.navigateTo({
      url: '/pages/moi/likes',
    });
  },
  orderlist:function(){
    wx.navigateTo({
      url: '/pages/order/index?tpye=1',
    });
  },
  orderUnPay:function(){
    wx.navigateTo({
      url: '/pages/order/index?type=2',
    })
  },
  orderUncheck:function(){
    wx.navigateTo({
      url: '/pages/order/index?type=3',
    })
  },
  logistics:function(){
    wx.navigateTo({
      url: '/pages/order/index?type=4',
    })
  },
  myaddress:function(){
    wx.navigateTo({
      url: '/pages/address/index',
    })
  }
})