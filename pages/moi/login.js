// pages/moi/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    email:null,
    password:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let params = wx.getStorageSync("loginInfo");
    console.log(params);
    if(params){
      this.setData({email:params.email,password:params.password});
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
  forgot:function(){
    wx.navigateTo({
      url: '/pages/moi/forgot',
    });
  },
  singup:function(){
    wx.navigateTo({
      url:'/pages/moi/singup'
    });
  },
  login: function (options){
    var submitValue = options.detail.value;
    let email = submitValue.email;
    let password = submitValue.password;
    if(email===""){
      wx.showToast({
        title: '用户名不能为空',
        duration: 5000,
        icon: "none"
      });
      return;
    }

    if (password === "") {
      wx.showToast({
        title: '密码不能为空',
        duration: 5000,
        icon: "none"
      });
      return;
    }
    let params = {email:email,password:password};
    wx.showLoading({
      title: '正在登录，请耐心等待',
    });
    wx.request({
      url: "https://lechengeois.com/macie/api/web/index.php?r=site/login",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json"
      },
      data: Object.assign({}, params),
      method: "POST",
      success: res => {
        wx.hideLoading({
          complete: (res) => {},
        });
        console.log(res);
        if (res.data.status===1) {
          wx.setStorageSync('login', params);
          // wx.setStorageSync('user', res.data.user);
          app.macie.setCookie(res);        
          wx.showModal({
            title: '提示',
            content: '登录成功',
            success (res) {
              wx.navigateBack({
                delta: 1,
              });
            }
          });
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.message,
            success (res) {
          
            }
          });
        }
      },
      fail: error => {
        console.log(error);
        wx.hideLoading({
          complete: (res) => {},
        });
      }
    })
  },
  wechatlogin:function(){
    wx.showLoading({
      title: '正在登录',
    });
    wx.login({
      complete: (res) => {
        let uid = wx.getStorageSync("uid");
        let params = {};
        params["code"] = res.code;
        params["uid"] = uid;
        wx.request({
          url: "https://lechengeois.com/macie/api/web/index.php?r=wechat/wechatlogin",
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            // "Content-Type": "application/json"
          },
          data: Object.assign({}, params),
          method: "POST",
          success: res => {
            console.log(res);
            wx.hideLoading();
            if (res.data.status===1) {
              wx.setStorageSync('login', params);
              app.macie.setCookie(res);
              wx.showModal({
                title:"提示",
                content:"登录成功",
                success:function(res){
                  wx.navigateBack({});
                }
              });
            } else if(res.data.status===2){
              let id = res.data.image.id;
              console.log(id);
              wx.showModal({
                title:"提示",
                content:"绑定信息",
                success:function(res){
                  wx.navigateTo({
                    url: '/pages/moi/bind?id='+id,
                  });
                }
              });
            }else{
              wx.showModal({
                title:"提示",
                content:res.data.message,
              });
            }
          },
          fail: error => {
            wx.hideLoading();
            console.log(error);
          }
        });
      },
    });
  }
})