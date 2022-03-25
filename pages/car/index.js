// pages/car/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:null,
    page:0,
    user:null,
    isedit:false,
    prices:0,
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
    let params = { page: this.data.page };

    app.macie.carInfo(params).then(data => {
      console.log(data);
      if (data.status === 1) {
        let user = wx.getStorageSync("userinfo");
        self.setData({ goods: data.goods, user: user });
        self.caculate();
      }else if(data.islogin){
        let user = wx.getStorageSync("userinfo");
        self.setData({ goods: null, user: user });
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

  login:function(){
    wx.navigateTo({
      url: '/pages/moi/login',
    })
  },
  edit:function(){
    let status = this.data.isedit;
    this.setData({isedit:!status});
  },
  mins:function(e){
    let id = e.currentTarget.dataset.id;
    let self = this;
    this.data.goods.forEach(function(item,key){
      console.log(key,item);
      if (item.item.id === id) {
        if (parseInt(item.count)===1){
          wx.showModal({
            title: '警告',
            content: '商品数量不能为 0',
          });
          return;
        }else{
          self.data.goods[key].count = parseInt(item.count) -1;
          let params = {};
          params["gid"] = id;
          params["count"] = parseInt(item.count);
          self.updateCount(params);
          self.setData({goods:self.data.goods});
          return false;
        }
      }
    });
  },
  plus:function(e){
    let id = e.currentTarget.dataset.id;
    let self = this;
    this.data.goods.forEach(function (item,key) {
      if (item.item.id === id) {
        if (parseInt(item.count) === item.item.total) {
          wx.showModal({
            title: '警告',
            content: '库存不足',
          });
          return;
        } else {
          self.data.goods[key].count = parseInt(item.count) + 1;
          let params = {};
          params["gid"] = id;
          params["count"] = parseInt(item.count);
          self.updateCount(params);
          self.setData({ goods: self.data.goods });
          return false;
        }
      }
    });
  },
  trash:function(e){
    let id = e.currentTarget.dataset.id;
    let self = this;
    this.data.goods.forEach(function (item,key) {
      if (item.item.id === id) {
        self.data.goods.splice(key,1);
        let params = {gid:id};
        self.remove(params);
        self.setData({goods:self.data.goods});
        return false;
      }
    });
  },
  updateCount:function(params){
    app.macie.addition(params).then(data => {
      console.log(data);
    });
  },
  remove:function(params){
    app.macie.removeFromCar(params).then(data=>{
      console.log(data);
    });
  },
  caculate:function(){
    let self = this;
    var count = 0;
    this.data.goods.forEach(function(item,key){
      let price = parseInt(item.count) * parseFloat(item.item.dprice);
      count = count  + price;
    });
    this.setData({prices:count});
  },
  order(){
    app.macie.makeOrder().then(data=>{
      console.log(data);

      if(data.status===1){
        wx.navigateTo({
          url: '/pages/car/order?orid='+data.orid,
        });
      }else{
        wx.showModal({
          title: '失败',
          content: '提交订单失败',
        });
      }
    });
  }

})