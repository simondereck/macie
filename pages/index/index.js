//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swipers:null,
    category:null,
    activities:null,
    items:null,
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    flash: false,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
  },
  onShow:function(){
    let self = this;
    app.macie.swiper().then(data => {
      if (data.status === 1) {
        console.log(data.swipers);
        self.setData({ swipers: data.swipers });
      }
    });
    app.macie.getCategorys().then(data => {
      console.log(data);
      if (data.status === 1) {
        console.log(data.category);
        self.setData({ category: data.category });
      }
    });
    app.macie.getActivity().then(data => {
      if (data.status === 1) {
        console.log(data);
        self.setData({ activities: data.activities });
      }
    });
    app.macie.getIndexGoods().then(data=>{
      if (data.status === 1) {
        console.log(data);
        self.setData({ items: data.items });
      }
    });
  },
  categoryTap:function(e){
    // console.log(e);
    let category = e.currentTarget.dataset.category;
    console.log(category);
    if(category){
      wx.navigateTo({
        url: '/pages/category/index?id='+category,
      });
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  search:function(){
    wx.navigateTo({
      url: '/pages/search/index',
    });
  },
  activity:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/activity/index?id='+id,
    });
  },
  store:function(){
    wx.navigateTo({
      url: '/pages/common/store',
    })
  },
  about:function(){
    wx.navigateTo({
      url: '/pages/common/about',
    });
  },
  goodDetail:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/goods/detail?id='+id,
    });
  },
  brandDetail:function(e){
    let id = e.currentTarget.dataset.id;
    app.globalData.brand = id;
    wx.switchTab({
      url: '/pages/brand/index'
    });
  },
  swiperClick:function(e){
    let id = e.currentTarget.dataset.id;
    var swiper = this.data.swipers[id];
    console.log(swiper);
    if(swiper.type=="1"){
      wx.navigateTo({
        url: '/pages/activity/index?id='+swiper.activity
      });
    }else if(swiper.type=="2"){
      wx.navigateTo({
        url: '/pages/brand/index?id='+swiper.brand
      });
    }else if(swiper.type=="3"){
      wx.navigateTo({
        url: '/pages/category/index?id='+swiper.category
      });
    }else if(swiper.type=="4"){
      wx.navigateTo({
        url: '/pages/goods/detail?id='+swiper.good
      });
    }
  },

  onShareAppMessage: function () {

  },
})
