module.exports = function(url,method="POST",params) {
  return new Promise((resolve,reject)=>{
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      header: {
        // 'content-type': 'application/json' // 默认值
        "Content-Type": "application/x-www-form-urlencoded",

      },
      method:method,
      data:  Object.assign({}, params),
      success:resolve,
      fail:reject
    })
  });
}


