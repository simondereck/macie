// pages/moi/singup.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    email:null,
    telephone:null,
    password:null,
    repassword:null
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

  checkEmail: function (email) {
    var reg = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');
    var emailVar = reg.test(email);     // 得到的值为布尔型
    if (!emailVar) {
      wx.showToast({
        title: '输入的邮箱不正确',
        duration: 5000,
        icon: "none"
      });
      return false;
    }
    return true;
  },

  singup: function (options){
    var submitValue = options.detail.value;
    let username = submitValue.username;
    let email = submitValue.email;
    let telephone = submitValue.telephone;
    let password = submitValue.password;
    let repassword = submitValue.repassword;

    if (username === "") {
      wx.showToast({
        title: '用户名不能为空',
        duration: 5000,
        icon: "none"
      });
      return;
    }
    if(email===""){
      wx.showToast({
        title: '邮箱不能为空',
        duration: 5000,
        icon: "none"
      });
      return;
    }
    if (telephone===""){
      wx.showToast({
        title: '电话不能为空',
        duration: 5000,
        icon: "none"
      });
      return;
    }

    if (password===""){
      wx.showToast({
        title: '密码不能为空',
        duration: 5000,
        icon: "none"
      });
      return;
    }

    if(repassword===""){
      wx.showToast({
        title: '确认密码不能为空',
        duration: 5000,
        icon: "none"
      });
      return;
    }

    if(password!=repassword){
      wx.showToast({
        title: '两次密码不一样',
        duration: 5000,
        icon: "none"
      });
      return;
    }

    if(!this.checkEmail(email)){
      return;
    }
    let params ={
      username:username,
      email:email,
      telephone:telephone,
      password:password
    };
    wx.showLoading({
      title: '正在注册，请耐心等待',
    });
    app.macie.singup(params).then(data=>{
      wx.hideLoading({
        complete: (res) => {},
      });
        if(data.status===1){
          wx.showModal({
            title: '提示',
            content: '注册成功',
            success (res) {
              wx.navigateBack({
                delta: 1,
              });
            }
          });
        }else{
          wx.showModal({
            title:'提示',
            content:data.message,
            success (res) {
            
            }
          });
        }
    });

  }
})