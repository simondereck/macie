const app = getApp();
// pages/moi/bind.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    this.setData({id:id});
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  bind:function(options){
    let password = options.detail.value.password;
    let params = {};
    params["password"] = password;
    if (password === "") {
      wx.showToast({
        title: '密码不能为空',
        duration: 5000,
        icon: "none"
      });
      return;
    }
    wx.showLoading({
      title: '正在加载'
    });
    app.macie.bindPassword(params).then(data=>{
      wx.hideLoading();
      if(data.status==1){
        wx.showModal({
          title:'提示',
          content:data.message,
          success:function(){
            wx.switchTab({
              url: '/pages/moi/password',
            });
          }
        });
      }else{
        wx.showModal({
          title: '提示',
          content:data.message
        });
      }
    });

  }

});