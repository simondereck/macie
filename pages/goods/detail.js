// pages/category/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good: null,
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    flash: false,
    number:1,
    islike:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    let params = { id: id };
    let self = this;
    
    app.macie.getGoodsDetail(params).then(data => {
      console.log(data);
      if (data.status === 1) {
        console.log(wx.getStorageSync("'" + data.good.id + "'"));
        let islike = wx.getStorageSync("'" + data.good.id + "'")?true:false;
        self.setData({ good: data.good ,islike:islike});
      }
    });
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
  mins: function () {
    let value = this.data.number - 1;
    if(value>0){
      this.setData({number:value});
    }else{
      wx.showToast({
        title: '数量不能为0',
      })
    }
  },
  add: function () {
    let value = this.data.number + 1;
    this.setData({ number: value });
  },
  car:function(){
    //put into car
    let params = {};
    params["gid"] = this.data.good.id;
    params["count"] = this.data.number;
    app.macie.addToCar(params).then(data => {
      console.log(data);
      if(data.status===1){
        wx.showToast({
          title: '添加成功',
        });
      }
    });
  },
  like:function(){
    let params = {};
    params["gid"] = this.data.good.id;
    console.log(params);
    app.macie.favorite(params).then(data => {});
    this.setData({ islike: true });
  },
  dislike: function () {
    let params = {};
    params["gid"] = this.data.good.id;
    console.log(params);
    app.macie.dislike(params).then(data => {});
    this.setData({islike:false});
  },
  buy:function(){
    let params = {};
    params["gid"] = this.data.good.id;
    params["count"] = this.data.number;
    app.macie.addToCar(params).then(data => {
      console.log(data);
      if (data.status === 1) {
        wx.switchTab({
          url: '/pages/car/index',
        });
      }else if(!data.islogin){
        wx.navigateTo({
          url: '/pages/moi/login',
        })
      }
    });
  }
})