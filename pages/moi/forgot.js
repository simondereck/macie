// pages/moi/forgot.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  forgot:function(e){
    let email = e.detail.value.email;
    if(email===""){
      wx.showToast({
        title: '邮箱不能空',
        icon:"none",
        duration:4000
      });
      return;
    }
    let params = {email:email};
    wx.showLoading({
      title: '正在提交',
    });
    app.macie.forgotPassword(params).then(data=>{
      wx.hideLoading({
        complete: (res) => {},
      });
      if(data.status===1){
        wx.showModal({
          title: '提示',
          content: data.message,
          success (res) {
            wx.navigateBack({
              complete: (res) => {},
            });
          }
        });
      }else{
        wx.showModal({
          title: '提示',
          content: data.message,
          success (res) {
        
          }
        })
      }
    
    });
  }
})