function fox_tap(ele,callback) {
    // 两个参数，一个是要点击的元素，一个是回调函数，因为touch事件一般伴随着event事件对象

    // 要解决点击延迟问题，需要同过touch三个事件来实现
    // 首先触摸开始到触摸结束的事件不能太长，太长就是长按不是点击
    // 其次触摸时候不能移动，移动的话就不是点击了

    // 要定义两个变量，分别是触摸开始的时间和记录是否触发了触摸移动的变量
    var startTime = 0;
    var bool = false;
    var targetTime = 150;

    ele.addEventListener('touchstart',function (e) {
        startTime = Date.now();
    })
    ele.addEventListener('touchmove',function (e) {
        bool = true;
    })
    ele.addEventListener('touchend',function (e) {
        var time = Date.now() - startTime;
        if (time>targetTime){
            return;
        } else if (bool = false){
            return;
        } else{
            console.log('click封装成功');
            callback(e);
        }
    })
}