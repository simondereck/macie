// pages/category/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category:null,
    price:true,
    order:0,
    page:0,
    goods:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    console.log(id);
    let self = this;
    app.macie.getCategoryDetail(id).then(data=>{
      console.log(data);
      if(data.status===1){
        self.setData({category:data.category,goods:data.goods});
        console.log(data.goods);
        wx.setNavigationBarTitle({
          title: data.category.name,
        });
      }
    });
  },

  order:function(e){
    console.log(e);
    let self = this;
    var params = {};
    let id = e.currentTarget.dataset.id;
    if (id === 2) {
      self.setData({order:1,page:0});
      params["order"] = 1;
    } else if(id===3){
      if(self.price==true){
        self.setData({ order: 2, price: false, page: 0});
        params["order"] = 2;
      }else if(self.price){
        self.setData({ order: 3, price: true, page: 0});
        params["order"] = 3;
      }
    }else if(id===4){
      self.setData({ order: 4, page: 0});
      params["order"] = 4;
    }
    params["cid"] = self.data.category.id;
    params["page"] = self.data.page;
    app.macie.getGoods(params).then(data=>{
      if(data.status === 1){
        self.setData({goods:data.goods,page:data.page});
      }
    });  
  },
  detail:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/goods/detail?id='+id,
    })
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
    console.log("device");
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

  }
})