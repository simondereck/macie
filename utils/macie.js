const fetch = require('./fetch')
// const baseUrl = "http://127.0.0.1/macie/api/web/index.php?r=";
const baseUrl = "https://lechengeois.com/macie/api/web/index.php?r=";



function login(params){
  let url = baseUrl + "site/login";
  // return fetch(url, "POST", params).then(res => res.data); 
  return requestWithHead(url,params).then(res=>res.data);
}

/**
 * set cookie for user
 */

function setCookie(res) {
  if (!res.header['Set-Cookie']) return;
  let cookies = wx.getStorageSync('mockSessionCookies');
  if (!cookies) cookies = {};
  //解析Set-Cookie. wx.request会将多个Set-Cookie以','连接
  res.header['Set-Cookie'].split('HttpOnly,').forEach(ck => {
    let kv = ck.split(';')[0].split('=');
    cookies[kv[0]] = kv[1];
  })
  wx.setStorageSync('mockSessionCookies', cookies);
}

/**
 * parseJson
 */

function serializeJson(obj) {
  let str = '';
  for (let k in obj) {
    str += k + '=' + obj[k] + ';';
  }
  return str;
}

/**
 * request with api
 */
function requestWithHead(api, params) {
  return new Promise((resolve, reject) => {
    let obj = wx.getStorageSync('mockSessionCookies');
    let str = '';
    for (let k in obj) {
      str += k + "=" + obj[k] + ';';
    }
    wx.request({
      url: api,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json"
        Cookie: str
      },
      method: "POST",
      data: Object.assign({}, params),
      // header: { 'Content-Type': 'json' },
      success: resolve,
      fail: reject
    })
  })
}




function initProgramme(params){
  let url = baseUrl + "site/index";
  return fetch(url,"POST", params).then(res => res.data);
}

function swiper(){
  let uid = wx.getStorageSync("uid");
  let params = {"uid":uid};
  let url = baseUrl + "swiper/index";
  return fetch(url, "POST", params).then(res => res.data);
}

function getCategorys(){
  let uid = wx.getStorageSync("uid");
  let params = {"uid":uid};
  let url = baseUrl + "category/index";
  return fetch(url, "POST", params).then(res => res.data);
}

function getCategoryDetail(cid){
  let uid = wx.getStorageSync("uid");
  let params = {"uid":uid ,"id":cid};
  let url = baseUrl + "category/detail";
  return fetch(url, "POST", params).then(res => res.data);
}

function getGoods(params){
  let uid = wx.getStorageSync("uid");
  params["uid"] = uid;
  let url = baseUrl + "category/goods";
  return fetch(url, "POST", params).then(res => res.data);
}

function getGoodsDetail(params){
  let uid = wx.getStorageSync("uid");
  params["uid"] = uid;
  let url = baseUrl + "category/goods_detail";
  return fetch(url, "POST", params).then(res => res.data);
}

function getActivity(){
  let uid = wx.getStorageSync("uid");
  let params = { "uid": uid };
  let url = baseUrl + "activity/index";
  return fetch(url, "POST", params).then(res => res.data);
}

function getActivityDetail(params){
  let uid = wx.getStorageSync("uid");
  params["uid"] = uid;
  let url = baseUrl + "activity/detail";
  return fetch(url, "POST", params).then(res => res.data);
}

function addToCar(params){
  let uid = wx.getStorageSync("uid");
  params["uid"] = uid;
  let url = baseUrl + "car/add";
  return requestWithHead(url, params).then(d => d.data);
}



function favorite(params){
  //addToLocal and add to server
  let uid = wx.getStorageSync("uid");
  params["uid"] = uid;
  wx.setStorageSync("'"+params["gid"]+"'", params["gid"]);
  let url = baseUrl + "favorite/index";
  return requestWithHead(url, params).then(d => d.data);
}

function dislike(params){
  let uid = wx.getStorageSync("uid");
  params["uid"] = uid;
  wx.removeStorageSync("'" + params["gid"] + "'");
  let url = baseUrl + "favorite/dislike";
  return requestWithHead(url, params).then(d => d.data);
}

function carInfo(params){
  let uid = wx.getStorageSync("uid");
  params["uid"] = uid;
  let url = baseUrl + "car/index";
  return requestWithHead(url, params).then(d => d.data);
}

function getBrands(params){
  let uid = wx.getStorageSync("uid");
  params["uid"] = uid;
  let url = baseUrl + "brand/index";
  return requestWithHead(url, params).then(d => d.data);
}

function getBrandGoods(params){
  let uid = wx.getStorageSync("uid");
  params["uid"] = uid;
  let url = baseUrl + "brand/goods";
  return requestWithHead(url, params).then(d => d.data);
}

function singup(params){
  let uid = wx.getStorageSync("uid");
  params["uid"] = uid;
  let url = baseUrl + "site/singup";
  return fetch(url, "POST", params).then(res => res.data);
}

function getLikes() {
  let uid = wx.getStorageSync("uid");
  let params = {uid:uid};
  let url = baseUrl + "favorite/all";
  return requestWithHead(url, params).then(d => d.data);
} 

function userinfo() {
  let url = baseUrl + "site/info";
  return requestWithHead(url).then(res => res.data);
}


function searchItem(params) {
  let uid = wx.getStorageSync("uid");
  let url = baseUrl + "search/index";
  params["uid"] = uid;
  return requestWithHead(url, params).then(res => res.data);
}

function getAboutUs(){
  let uid = wx.getStorageSync("uid");
  let params = { uid: uid };
  let url = baseUrl + "site/about"
  return requestWithHead(url, params).then(res => res.data);

}


function getStores() {
  let uid = wx.getStorageSync("uid");
  let params = { uid: uid };
  let url = baseUrl + "site/stores"
  return requestWithHead(url, params).then(res => res.data);
}

function addition(params){
  let uid = wx.getStorageSync("uid");
  params["uid"] = uid;
  let url = baseUrl + "car/addition"
  return requestWithHead(url, params).then(res => res.data);
}

function removeFromCar(params){
  let uid = wx.getStorageSync("uid");
  params["uid"] = uid;
  let url = baseUrl + "car/delete";
  return requestWithHead(url, params).then(res => res.data);
}

function makeOrder(){
  let uid = wx.getStorageSync("uid");
  let params = {uid:uid};
  let url = baseUrl + "order/order"
  return requestWithHead(url, params).then(res => res.data);
}


function orderDetail(params){
  let uid = wx.getStorageSync("uid");
  params["uid"] = uid;
  let url = baseUrl + "order/detail"
  return requestWithHead(url, params).then(res => res.data);
}

function orderLists(params) {
  let uid = wx.getStorageSync("uid");
  params["uid"] = uid;
  let url = baseUrl + "order/orderlists"
  return requestWithHead(url, params).then(res => res.data);
}

function deleteOrder(params){
  let uid = wx.getStorageSync("uid");
  params["uid"] = uid;
  let url = baseUrl + "order/delete"
  return requestWithHead(url, params).then(res => res.data);
}


function deuxPay(params) {
  let uid = wx.getStorageSync("uid");
  params["uid"] = uid;
  let url = baseUrl + "alipay/pay";
  return requestWithHead(url, params).then(res => res.data);
}


function getIndexGoods(){
  let uid = wx.getStorageSync("uid");
  let params = {uid:uid};
  let url = baseUrl + "site/brandgoods";
  return requestWithHead(url, params).then(res => res.data);
}

function wechatOrder(params) {
  let uid = wx.getStorageSync("uid");
  params["uid"] = uid;
  let url = baseUrl + "wechat/orderwechat";
  return requestWithHead(url, params).then(res => res.data);
}

function getAllAddress(){
  let url = baseUrl + "address/index";
  return requestWithHead(url).then(res => res.data);
}


function createAddress(params){
  let url = baseUrl + "address/create";
  return requestWithHead(url,params).then(res=>res.data);
}

function deleteAddress(params){
  let url = baseUrl + "address/delete";
  return requestWithHead(url,params).then(res=>res.data);
}


function setDefaultAddress(params){
  let url = baseUrl + "address/setdefault";
  return requestWithHead(url,params).then(res=>res.data);
}

function setOrderAddress(params){
  let url = baseUrl + "order/setaddress";
  let uid = wx.getStorageSync("uid");
  params["uid"] = uid;
  return requestWithHead(url,params).then(res=>res.data);
}


function forgotPassword(params){
  let url = baseUrl + "site/forgotpassword";
  let uid = wx.getStorageSync('uid');
  params["uid"] = uid;
  return fetch(url,"POST",params).then(res=>res.data);
}

function logout(){
  let url = baseUrl + "site/logout";
  return requestWithHead(url,null).then(res=>res.data);
}

function clearCookie(){
  wx.setStorageSync('mockSessionCookies',null);
}

module.exports = {
  initProgramme, swiper, getCategoryDetail, getCategorys, getGoods, getGoodsDetail, getActivity, getActivityDetail, login, singup, favorite, carInfo, setCookie,logout,clearCookie,
  getBrands,getIndexGoods,getBrandGoods, getLikes, addToCar, 
  removeFromCar, addition, makeOrder, orderDetail, orderLists, deleteOrder, getAboutUs, deuxPay, getStores, userinfo, searchItem, dislike, history, wechatOrder,getAllAddress,createAddress,deleteAddress,setDefaultAddress,setOrderAddress,forgotPassword};