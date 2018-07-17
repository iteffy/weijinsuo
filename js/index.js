// ui框架：bootstrap,妹子UI，jqueryUI,easyUI,jqueryMobile,mui,framework7
// 移动端UI框架：bootstrap,jqueryMobile,mui,framework7
// 模板引擎：artTemplate,handlebars,mustache,velocity

$(function() {
    // 调用动态轮播图
    render();
    // 调用移动端tab标签页
    initMobileTab();
    // 工具提示
    $('[data-toggle="tooltip"]').tooltip();
});

// 数据缓存
var getData = function(callback) {
    if (window.data) {
        callback && callback(window.data);
    } else {
        $.ajax({
            type: 'get',
            url: 'js/data.json',
            dataType: 'json', // 强制将后台的数据转成json对象
            data: '',
            success: function(data) {
                // 将数据缓存
                window.data = data;
                callback && callback(window.data);
            }
        })
    }
};

var render = function() {
    getData(function(data) {
        // 动态轮播图
        // 1.获取数据源 ajax
        // 2.根据数据动态渲染，根据当前设备（根据屏幕宽度判断）
        // 2.1 准备数据
        // 2.2 把数据转换成html格式的字符串（动态创建元素，字符串拼接，模板引擎[artTemplate腾讯出品]，框架）
        // 2.3 把字符渲染到页面当中
        // 3 测试功能
        // 4.移动端手势切换

        // 2.根据数据动态渲染，根据当前设备（根据屏幕宽度判断）
        var isMobile = $(window).width() < 768 ? true : false;
        // 2.2 使用模板引擎[artTemplate腾讯出品] 把数据转换成html格式的字符串
        // 分析哪些html静态内容要变成动态的。-- 点容器、轮播图片容器
        // 开始使用 参数1：模板的id，参数2：对象
        var pointHtml = template('pointTemplate', { list: data });
        var imageHtml = template('imageTemplate', { list: data, isMobile: isMobile });
        /*2.3 把字符渲染页面当中*/
        $('.carousel-indicators').html(pointHtml);
        $('.carousel-inner').html(imageHtml);
    })
};
// render();
// 测试功能
// resize 页面尺寸发生改变的事件
$(window).on('resize', function() {
    render();
    // trigger通过js主动触发某个事件
}).trigger('resize')

// 4.手势切换
var startX = 0;
var distanceX = 0;
var isMove = false;
// originalEvent 代表js原生事件
$(".wjs_banner").on('touchstart', function(e) {
  startX = e.originalEvent.touches[0].clientX;
}).on('touchmove',function(e) {
  var moveX = e.originalEvent.touches[0].clientX;
  distanceX = moveX - startX;
  isMove = true;

}).on('touchend',function(e) {
  // 距离足够 50px 一定要滑动过
  if (isMove && Math.abs(distanceX) > 50) {
    // 左滑 右滑的判断 
    if (distanceX > 0) {
      // 右滑，上一张
      // 调用bootstrap的轮播图js方法
      $('.carousel').carousel('prev');
    } else {
      // 左滑，下一张
      $('.carousel').carousel('next');
    }
  }
  startX = 0;
  distanceX = 0;
  isMove = false;
})

// 初始化移动端tab页签页
var initMobileTab = function() {
  //1.解决换行问题
  var $navTabs = $(".wjs_product .nav-tabs"); // ul
  var width = 0; // 定义ul的宽度 现在不知道是多少 它的宽度是它内部所有li的宽度总和
  $navTabs.find('li').each(function(index,item) {
    var $currentLi = $(this);
    // width() 内容宽度
    // innerWidth() 内容+内边距
    // outerWidth() 内容+内边距+边框
    // outerWidth(true) 内容+内边距+边框+外边距
    var liWidth = $currentLi.outerWidth(true);
    width += liWidth;
  })
  console.log(width);
  $navTabs.width(width);
  //2.修改结构，使之能区域滑动 一般是大盒子里套小盒子，小盒子的长度或高度非常长，让小盒子在大盒子内做移动.
  // 加父容器 class为nav-tabs-parent设置父容器的样式为width:100%; overflow:hidden;

  //3.实现滑动效果 iscroll插件或自己实现
  // IScroll(param,obj) 第一个参数为dom对象，$('div')[0] 这是jquery对象转成dom对象。第2个参数为对象属性
  new IScroll($('.nav-tabs-parent')[0],{
    scrollX: true,
    scrollY:false,
    click: true  // iscroll默认将点击设置为false，所以要设置为true
  })

};












