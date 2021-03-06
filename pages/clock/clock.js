var intervalT;
var context = wx.createCanvasContext('canvass');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      currentData : 0,
      text:'开始刷牙',
      innerText:120
  },
    //事件处理函数 点击text
    toast: function() {
      wx.navigateTo({
        url: '../Sign_in/Sign_in'
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onReady: function (){
      context.setLineWidth(4);
      context.moveTo(180, 100);
      context.arc(100, 100, 80, 0, -Math.PI * 2 / 120 * 120, true);
      context.setStrokeStyle("#49f");
      context.stroke();
      context.restore();
      context.draw();

  },
  //获取当前滑块的index
  bindchange:function(e){
    const that  = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent:function(e){
    const that = this;

    if (that.data.currentData === e.target.dataset.current){
        return false;
    }else{

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  but:function(e){
    clearInterval(intervalT);//重新清空开始画圆
    this.setData({
      text:'重新开始'
     })
   
    // var flag=getApp().globalData.flag;
    // console.log(flag);
    // if(flag==true)
    // {
    //   return;
    // }
    // getApp().globalData.flag=true;
    // console.log(flag);


    // 使用 wx.createContext 获取绘图上下文 context
    
    var n = 120;     // 倒计时圈中的文字显示
    this.setData({ "innerText": n });
    var _this = this;
    function drawInnerCircle() {    // 绘制固定内圈圆
      context.save();              // save-保存绘图上下文
      context.setLineWidth(1);     // setLineWidth-设置线条宽度；参数-setLineWidth(线条宽度，单位px)
      context.moveTo(180, 100);    // moveTo-把路径移动到画布中的制定点，不创建线条；参数-moveTo(目标位置的x坐标，目标位置的y坐标)
      context.arc(100, 100, 80, 0, 2 * Math.PI, true);  // arc-创建一条弧线；参数-arc(圆心x坐标，圆心y坐标，圆半径，起始弧度，终止弧度，弧度方向是否是逆时针)
      context.stroke();            // stroke-画出当前路径的边框，默认颜色为黑色
      context.restore();           // restore-恢复之前保存的绘图上下文
      context.draw();    // draw-将之前在绘图上下文中的描述(路径，变形，样式)画到canvas中
    }
    function drawOutCircle(n) {    // 绘制倒计时外圈圆
      
      context.save();
      context.setLineWidth(4)
      context.moveTo(180, 100)
      context.arc(100, 100, 80, 0, -Math.PI * 2 / 120 * n, true)
      context.stroke()
      context.restore();
    }
      intervalT = setInterval(function () {
      context.setStrokeStyle("#49f");    // setStrokeStyle-设置描边颜色；参数-setStrokeStyle(描边的颜色，默认颜色为black)
      if (n >= 0) {
        _this.setData({ "innerText": n });
        drawOutCircle(n);
        n -= 1;
      } else {
        clearInterval(intervalT);     // 倒计时一次停止
      }
      drawInnerCircle();
    }, 1000);
  }
})
