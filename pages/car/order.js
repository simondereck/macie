// pages/car/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:null,
    statusString:null,
    selectMethod: true,
    paymethod: null,
    orid:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.orid){
      let orid = options.orid;
      this.setData({orid:orid});
    }else{
      wx.switchTab({
        url: '/pages/index/index',
      })
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
    let params = {orid:self.data.orid};
    app.macie.orderDetail(params).then(data => {
      if(data.status===1){
        let status = "";
        if (data.order.status === 0) {
          status = "未付款";
        } else if (data.order.status === 1) {
          status = "等待发货";
        } else if (data.order.status === 2) {
          status = "已经发货";
        } else if (data.order.status === 3) {
          status = "退款";
        } else if (data.order.status === 4) {
          status = "已经退款";
        } else if (data.order.status === 5) {
          status = "完成";
        }
        console.log(data);
        self.setData({ order: data.order, statusString:status });
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
  deleteOrder:function(){
    let orid = this.data.order.orid;
    let params = {orid:orid};
    wx.showNavigationBarLoading();
    app.macie.deleteOrder(params).then(data=>{
      wx.hideNavigationBarLoading();
      if(data.status===1){
        wx.showModal({
          title: '提示',
          content: '你的订单删除成功',
          success(){
            wx.navigateBack({
              delta: 1,
            });
          }
        });
      }      
    });
  },
  pay:function(){
    let self = this;
    if (!this.data.paymethod) {
      this.setData({ selectMethod: false });
      console.log(self.data.selectMethod);
      return;
    }

    if (this.data.paymethod == 1) {
      wx.showLoading({
        title: '正在申请支付',
      });
      wx.login({
        success: res => {
          let params = {};
          params["orid"] = self.data.order.orid;
          params["code"] = res.code;
          app.macie.wechatOrder(params).then(res => {
            wx.hideLoading();
            console.log(res);
            if (res.status === 1) {
              let payInfo = JSON.parse(res.results.payInfo);
              console.log(res);
              wx.requestPayment({
                timeStamp: payInfo.timeStamp.toString(),
                nonceStr: payInfo.nonceStr,
                package: payInfo.package,
                signType: payInfo.signType,
                paySign: payInfo.paySign,
                total_fee: res.params.amount,
                success: function (res) {
                  console.log("success", res);
                },
                fail: function (res) {
                  console.log("fail", res);
                },
                complete: function (res) {
                  console.log("finish", res)
                }
              });
            }
          });
        }
      });
      return;
      // console.log(utils.createNonceStr())
    }else if(this.data.paymethod == 2){
      let params = {};
      params["orid"] = self.data.order.orid;
      wx.showLoading({
        title: '正在加载',
      });
      app.macie.deuxPay(params).then(res => {
        wx.hideLoading();
        console.log(res);
        if (res.status == 1) {
          wx.showModal({
            title: '我们已经帮你复制了链接',
            content: "请把已复制的内容粘贴到浏览器中",
          });
          wx.setClipboardData({
            data: res.message,
          });
        }
      });
    }

  },
  methodSelect: function (option) {
    let type = option.detail;
    this.setData({ paymethod: type });
    this.pay();
  },
  setAddress:function(){
    let orid = this.data.order.orid;
    wx.navigateTo({
      url: '/pages/address/index?orid='+orid,
    });
  }

})