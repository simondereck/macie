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
    console.log(options);
    let email = options.detail.value.email;
    let telephone = options.detail.value.telephone;
    let username = options.detail.value.username;

    var params = {};
    params["email"] = email;
    params["telephone"] = telephone;
    params["username"] = username;
    params["id"] = this.data.id;

    if (username === "") {
      wx.showToast({
        title: '昵称不能为空',
        duration: 5000,
        icon: "none"
      });
      return;
    }

    if (email === "") {
      wx.showToast({
        title: '邮箱不能为空',
        duration: 5000,
        icon: "none"
      });
      return;
    }

    if (telephone === "") {
      wx.showToast({
        title: '手机不能为空',
        duration: 5000,
        icon: "none"
      });
      return;
    }


    wx.showLoading({
      title: '正在加载'
    });
    
    let uid = wx.getStorageSync("uid");
    params["uid"] = uid;
    params["platform"] = 1;
    console.log(params);
    wx.showLoading({
      title: '正在登录，请耐心等待',
    });
    wx.request({
      url: "https://lechengeois.com/macie/api/web/index.php?r=wechat/setinfo",
      header: {
        "Content-Type": "application/x-www-form-urlencoded" 
      },
      dataType: 'json',
      data: params,
      method: "POST",
      success: res => {
        wx.hideLoading();
        if(res.data.status==1){
          console.log(res.data);
          app.macie.setCookie(res); 
          wx.showModal({
            title:"提示",
            content:"绑定成功",
            success(res){
              wx.switchTab({
                url: '/pages/moi/index',
              });
            }
          });
        }else if(res.data.status==2){
          app.macie.setCookie(res); 
          wx.showModal({
            title:"提示",
            content:res.data.message,
            success:function(){
              wx.navigateTo({
                url: '/pages/moi/password',
              });
            }
          });
        }else{
          wx.showModal({
            title:"提示",
            content:res.data.message
          });
        }
      }
    });
  }

});