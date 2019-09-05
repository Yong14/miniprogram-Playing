const fetch = require('../../utils/fetch');
// pages/store/store.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store: [],
    loading: "正在努力加载...",
    page: 1,
    id: 0,
    hasMore: true
  },

  //获取商铺
  getStore({ id, type }) {
    fetch(`https://locally.uieee.com/categories/${parseInt(id) + 1}/shops`, { _page: 1, _limit: 20 }).then((res) => {
      this.setData({
        store: res.data
      })
      this.setData({
        id
      })
      wx.setNavigationBarTitle({
        title: type
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStore(options);
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
    this.setData({
      page: 1,
      hasMore: true,
      store: [],
    });
    let _this = this;
      (function () {
        console.log(_this.data);
        return fetch(`https://locally.uieee.com/categories/${parseInt(_this.data.id) + 1}/shops`, { _page: _this.data.page, _limit: 20 })
          .then(res => {
            _this.setData({
              store: res.data
            })
          })
      })(_this)
      .then(()=>{
        wx.stopPullDownRefresh();
      })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.hasMore) {
      this.setData({
        loading: '没有更多商家了'
      })
      return
    }
    this.data.page++;
    // ${parseInt(this.data.id) + 1}
    fetch(`https://locally.uieee.com/categories/${parseInt(this.data.id) + 1}/shops`, { _page: this.data.page, _limit: 20 })
      .then(res => {
        // console.log(res.header['X-Total-Count']);
        let hasMore = this.data.page * 20 < res.header['X-Total-Count']
        this.setData({
          store: this.data.store.concat(res.data),
          hasMore
        })
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})