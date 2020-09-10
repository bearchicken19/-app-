window.onload = function () {
    // 左边区域滑动的动画效果函数
    leftScroll();
}
function leftScroll() {
    // 首先要获取左边盒子里ul可以移动的最大值和最小值
    // 然后通过touch那三个事件实现ul上下移动


    // 首先要获取左边盒子里ul可以移动的最大值和最小值
    // 最大值其实就是ul的初始位置0；最小值是ul父盒子的高度减去ul的高度，因为ul是向上移动，所以是负值
    var maxDistance = 0;
    var moveUl = document.querySelector('.main .main-left ul');
    var ulParent = document.querySelector('.main .main-left');
    var minDistance = ulParent.offsetHeight - moveUl.offsetHeight;
    // console.log(minDistance);
    var distance = 100;

    // 然后通过touch那三个事件实现ul上下移动
    // 定义三个值分别是触摸的初始值，触摸移动的值，ul的从坐标的值
    var moveY = 0;
    var startY = 0;
    // var ulY = moveUl.offsetTop; //offsettop获取的值是距离父盒子中带有定位盒子的顶部距离，父盒子中都没有定位以body为准，所以这里获得的是header盒子的高度
    // console.log(ulY);
    var ulY = 0;
    moveUl.addEventListener('touchstart',function (e) {
        // console.log('touchstart');
        startY = e.touches[0].clientY;
    })
    moveUl.addEventListener('touchmove',function (e) {
        // console.log('touchmove');
        moveY = e.touches[0].clientY - startY;
        // 赋值前需要先判断赋值的大小，是否在允许ul移动的范围内
        // 为了让ul可以上下多移动一些距离，分别在这里给最大值最小值加减一个值
        if ((moveY+ulY)>maxDistance+distance){
            moveY = 0;
            ulY = maxDistance+distance;
        } else if ((moveY+ulY)<minDistance-distance){
            moveY = 0;
            ulY = minDistance-distance;
        }
        // 正常移动的时候不需要有过渡的效果，关闭过渡
        moveUl.style.transition = '';
        // 给ul移动的距离赋值
        moveUl.style.transform='translateY('+(moveY+ulY)+'px)';
    })
    moveUl.addEventListener('touchend',function (e) {
        // console.log('touchend');
        ulY += moveY;
        // 在触摸屏幕结束的时候让ul多移动的那些值过渡移动到初始的最大值最小值位置
        if (ulY>maxDistance){
            ulY = maxDistance;
        } else if (ulY<minDistance){
            ulY = minDistance;
        }
        moveUl.style.transition = 'all 0.5s';
        moveUl.style.transform = 'translateY('+ulY+'px)';
    })


    // 第二大部分，实现点击ul中li标签后给li标签添加类并且移动到该li标签
    // html文件里已经引入了封装好了的tap点击事件js包，封装好的点击事件有回调函数带event事件
    // 对象参数，所有我们可以把点击事件绑定给ul标签，然后通过event对象的target属性判断是哪个
    // li标签添加类并移动

    // 获取每个li标签的高度，移动的时候用
    var liHeight = document.querySelector('.main-left li a').offsetHeight;
    // 给每个li标签绑定自定义属性index
    var liArr = document.querySelectorAll('.main-left li');
    for (var j=0;j<liArr.length;j++){
        liArr[j].dataset['index'] = j;
    }

    // 给ul标签绑定点击tap事件，通过target找到指定的li标签添加类
    fox_tap(moveUl,function (e) {
        // 首先或取带有current类的li标签然后删除这个类（也可以通过排他思想来实现）
        var liCurrent = document.querySelector('.main .main-left li a.current');
        // console.log(liCurrent);
        liCurrent.classList.remove('current');
        // console.log(e.target.parentNode);
        // 获取被点击的li标签添加类
        var li = e.target;
        li.classList.add('current');
        // 获取当前的被点击的li标签的自定义属性index
        var liindex = e.target.parentNode.dataset['index'];
        // console.log(liindex);
        moveUl.style.transition = 'all 0.5s';
        var moveHetght = liindex*liHeight*-1;
        if (moveHetght>maxDistance){
            moveHetght = maxDistance;
        } else if (moveHetght<minDistance){
            moveHetght = minDistance;
        }
        moveUl.style.transform = 'translateY('+moveHetght+'px)';
    })
}