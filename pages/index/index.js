const fetch = require('../../utils/fetch');
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    swiperImg:[],
    Sudoku:[]
  },
  //跳转商铺页面
  slipStore(e){
    wx.navigateTo({
      url: `../store/store?id=${e.currentTarget.dataset.id}&type=${e.currentTarget.dataset.type}`
    })
  },
  //获取轮播图图片
  getSwiperImg(){
    fetch('https://locally.uieee.com/slides').then((res)=>{
      this.setData({
        swiperImg:res.data
      })
    })
  },
  //获取九宫格数据
  getSudoku(){
    fetch('https://locally.uieee.com/categories').then((res)=>{
      this.setData({
        Sudoku:res.data
      })
    })
  },
  onLoad: function() {
    this.getSwiperImg();
    this.getSudoku();
  }
})