// pages/brand/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:0,
    brands:null,
    goods:null,
    selectBrand:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.brand) {
      this.setData({ selectBrand: app.globalData.brand});
      app.globalData.brand = null;
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
    
    if (self.data.selectBrand) {
      let params = { brand: self.data.selectBrand};
      app.macie.getBrands(params).then(data => {
        if (data.status === 1) {
          self.setData({ brands:data.brands, goods:data.goods, selectBrand:data.brand});
        }
      });
    } else {
      let params = {};
      app.macie.getBrands(params).then(data => {
        console.log(data);
        if (data.status === 1) {
          self.setData({ brands: data.brands, goods: data.goods, selectBrand: data.brand });
        }
      });
    }
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
  selectGoods:function(e){
    let self = this;
    let id = e.currentTarget.dataset.id;
    let params = {brand:id,page:0};
    console.log(params);
    app.macie.getBrandGoods(params).then(data=>{
      if(data.status===1){
        self.setData({goods: data.goods,page:data.page,selectBrand:id});
      }
    });
  },
  goodsDetail:function(e){
    console.log(e);
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/goods/detail?id='+id,
    });
  }
})