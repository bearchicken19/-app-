window.onload = function () {
    // 第一个实现的效果
    // 顶部导航栏刚开始的透明度为0，当屏幕滚动到中间导航栏的高度的时候让它的透明度为1,
    opacityScoll();
    // 第二个实现的效果
    // 倒计时效果
    cutDownTime();
    // 第三个实现的效果，图片轮播图
    imageMove();
}
function opacityScoll() {
    // 首先获取中间导航栏的所有高度
    // 然后获取需要操作的顶部导航栏元素并改变该透明度为0
    // 然后在window.onscoll事件中实时获取屏幕滚动的高度，接着获取屏幕滚动的高度和中间导航栏的所有高度的比值，然后赋值给顶部导航栏的透明度，如果值大于1，直接赋值为1

    // 首先获取中间导航栏的所有高度
    var nav = document.querySelector('.nav');
    var navHeight = nav.offsetTop + nav.offsetHeight;
    // console.log(navHeight);
    // 然后获取需要操作的顶部导航栏元素并改变该透明度为0
    var header = document.querySelector('.header');
    header.style.backgroundColor = 'rgba(201,21,35,0)';
    // 然后在window.onscoll事件中实时获取屏幕滚动的高度，接着获取屏幕滚动的高度和中间导航栏的所有高度的比值，然后赋值给顶部导航栏的透明度，如果值大于1，直接赋值为1
    window.onscroll = function () {
        var moveHeight = window.pageYOffset;
        // var moveHeight = document.documentElement.scrollTop;
        // var moveHeight =document.body.scrollTop;//该方法已经不能用了
        // console.log(moveHeight);
        var percent = moveHeight/navHeight;
        if (percent>=1){
            percent = 1;
        }
        header.style.backgroundColor = 'rgba(201,21,35,'+percent+')';
    }
}

function cutDownTime() {
    // 首先要定义一个总的倒计时事件，单位为秒
    // 获取需要更改倒计时内容的标签
    // 设置一个需要1秒执行一次的定时器，定时器里获取剩余倒计时的时分秒分别赋值给指定标签

    // 首先要定义一个总的倒计时事件，单位为秒
    var totalTime = 3*60*60;
    // 获取需要更改倒计时内容的标签
    var liArr = document.querySelectorAll('.content:nth-child(1) .content-top ul li');
    // console.log(liArr);
    // 设置一个需要1秒执行一次的定时器，定时器里获取剩余倒计时的时分秒分别赋值给指定标签
    var timer = setInterval(function () {
        if (totalTime<=0){
            clearInterval(timer);
            return;
        }
        totalTime--;
        var hour = Math.floor(totalTime/3600);
        var min = Math.floor(totalTime%3600/60);
        var sec = totalTime%60;
        // console.log(hour+'   '+min+'   '+sec);
        liArr[0].innerHTML = Math.floor(hour/10);
        liArr[1].innerHTML = hour%10;
        liArr[3].innerHTML = Math.floor(min/10);
        liArr[4].innerHTML = min%10;
        liArr[6].innerHTML = Math.floor(sec/10);
        liArr[7].innerHTML = sec%10;
    },1000)
}

/*
function imageMove() {
    // 获取需要运动图片的ul以及下面联动的li
    // 定义一个计数器，用来记录图片以及索引li运动的位置，并保持一致
    // 定义一个计时器，通过transform的translateX实现一段时间图片和索引li改变一次，但是该方法是瞬间改变的（没有这只缓动步长），所以在该定时器启动后再给需要移动图片的ul添加transition过渡效果，实现图片缓动移动

    // 获取需要运动图片的ul以及下面联动的li
    var moveUl = document.querySelector('.banner-images');
    // ul添加transition过渡效果，实现图片缓动移动
    moveUl.style.transition = 'all 0.5s';
    var liArr = document.querySelectorAll('.banner-index li');
    // 获取ul每次移动的宽度
    var moveWidth = document.body.offsetWidth;
    // console.log(moveWidth);
    // 定义一个计数器，用来记录图片以及索引li运动的位置，并保持一致
    var index = 1;
    // 定义一个计时器，通过transform的translateX实现一段时间图片和索引li改变一次，但是该方法是瞬间改变的（没有这只缓动步长），所以在该定时器启动后再给需要移动图片的ul添加transition过渡效果，实现图片缓动移动
    var timer = setInterval(function () {
        index++;
        // 这里需要判断index的值，因为ul中的图片有10张，前后各增加了一张，所以当图片走到第10张的时候要瞬间调到第二张，下面的索引li也要相应变化
        if (index===9){
            moveUl.style.transform = 'translateX('+moveWidth*-1+'px)';
            // 瞬间移动的时候要取消ul的过渡效果
            moveUl.style.transition = '';
            liArr[0].classList.add('current');
            // 这里需要跳出不执行之后的代码，才能实现瞬间调到指定地方并瞬间停止过渡，然后重新进入该函数继续执行，但是该操作无法实现，所以行不通
            //但是可以通过把下面的代码也同过做判断index<9才执行的话就可以间接实现瞬间停止后再进入函数
        }
        // 当图片走到第10张之后的时候要把index值变成2
        if (index>9){
            index = 2;
            // 瞬间移动之后要重新添加ul的过渡效果
            moveUl.style.transition = 'all 0.5s';
        }
        if (index<9){
            moveUl.style.transform = 'translateX('+moveWidth*index*(-1)+'px)';
            // 下面索引先排他思想，然后给指定li添加current类
            for (var i=0;i<liArr.length;i++){
                liArr[i].classList.remove('current');
            }
            liArr[index-1].classList.add('current');
        }
    },1000)
}*/
// 该方法还可以通过过渡事件结束的方式来实现
function imageMove() {
    // 获取需要运动图片的ul以及下面联动的li
    // 定义一个计数器，用来记录图片以及索引li运动的位置，并保持一致
    // 定义一个计时器，通过transform的translateX实现一段时间图片和索引li改变一次，但是该方法是瞬间改变的（没有这只缓动步长），所以在该定时器启动后再给需要移动图片的ul添加transition过渡效果，实现图片缓动移动
    // 给ul绑定一个过渡结束事件，每次过度结束的时候判断计数器index的值

    // 获取需要运动图片的ul以及下面联动的li
    var moveUl = document.querySelector('.banner-images');
    // ul添加transition过渡效果，实现图片缓动移动
    moveUl.style.transition = 'all 0.8s';
    var liArr = document.querySelectorAll('.banner-index li');
    // 获取ul每次移动的宽度
    var moveWidth = document.body.offsetWidth;
    // console.log(moveWidth);
    // 定义一个计数器，用来记录图片以及索引li运动的位置，并保持一致
    var index = 1;
    // 定义一个计时器，通过transform的translateX实现一段时间图片和索引li改变一次，但是该方法是瞬间改变的（没有这只缓动步长），所以在该定时器启动后再给需要移动图片的ul添加transition过渡效果，实现图片缓动移动
    var timer = setInterval(function () {
        index++;
        // 因为过渡停止事件把过渡给暂时停止了，所以需要在定时器轮播图片的时候再次开启
        moveUl.style.transition='all 0.8s';
        moveUl.style.transform= 'translateX('+moveWidth*index*-1+'px)';
    },2000)
    // 给ul绑定一个过渡结束事件，每次过度结束的时候判断index的值
    moveUl.addEventListener('webkitTransitionEnd',function () {
        // console.log('过度结束了');
        // 如果index的值大于8，证明图片已经走到最后一张了，所以需要把图片瞬间移动到第二张，并且瞬间停止过渡
        if (index>8){
            index = 1;
            // 这里需要把过渡事件暂时停止，因为瞬间移动的话还开着过渡，眼睛就可以看到图片是慢慢移动到第二张图的
            moveUl.style.transition='';
            moveUl.style.transform='translateX('+moveWidth*index*-1+'px)';
        }
        // index小于1的时候图片已经在第一张，也就是添加的最后一张，需要把index立即赋值到8，并且图片瞬间调到倒数第二张
        if (index<1){
            index = 8;
            moveUl.transition = '';
            moveUl.transform = 'translateX('+moveWidth*index*-1+'px)';
        }
        // 因为这里的index值不可能超过7，所有在这里给索引li添加current类，用排他思想
        // 但是这里索引li添加类会在过渡结束的时候才会添加，所以会稍微慢一点
        for (var i=0;i<liArr.length;i++){
            liArr[i].classList.remove('current');
        }
        // 因为index是从1开始的，所以这里的index需要减1
        liArr[index-1].classList.add('current');
    })

    // 实现触摸屏幕移动时图片跟着移动
    // web移动端特有的三个事件
    // 只需要后去触摸屏幕滑动的距离，然后赋值给ul图片的transform移动就可以了，但是必须是通过
    // 操作index来实现移动，因为上面自动轮播是index控制的，为了保持一致性
    var startX = 0;
    var moveX = 0;
    moveUl.addEventListener('touchstart',function (event) {
        console.log('touchstart');
        // 当触摸屏幕开始时候清除定时器并清除过渡，让自动轮播结束
        clearInterval(timer);
        moveUl.style.transition = '';
        // 获取触摸屏幕时候的x轴坐标
        startX = event.touches[0].clientX;
    })
    moveUl.addEventListener('touchmove',function (event) {
        console.log('touchmove');
        // 获取触摸屏幕移动的距离
        moveX = event.touches[0].clientX - startX;
        // 赋值给到ul图片让图片跟随移动,移动时候要加上当前ul的横坐标值，坐标值必须通过index获得
        moveUl.style.transform = 'translateX('+(moveX+moveWidth*index*-1)+'px)'
    })
    moveUl.addEventListener('touchend',function (event) {
        console.log('touchend');
        // 判断移动的距离，如果大于一张图片的宽度触摸结束就让它顺着方向移动一个宽度，否则保持原有图片不变
        var targetWidth = moveWidth/2;
        if (Math.abs(moveX)>targetWidth){
            // 如果移动的距离是正数，图片向右边移动，index值减减然后赋值，反之相反
            if (moveX>0){
                index--;
                moveUl.style.transition = 'all 0.8s';
                moveUl.style.transform = 'translateX('+moveWidth*index*-1+'px)';
                // 如果一直把图片往右边移动会出现移动到没有的情况，因为出发过渡结束事件并没有判断当index小于0的情况，所以要在上面的过渡结束事件添加内容
            }else{
                index++;
                moveUl.style.transition = 'all 0.8s';
                moveUl.style.transform = 'translateX('+moveWidth*index*-1+'px)';
            }
        } else{
            // 为了图片移动的时候有过渡效果，这里恢复过渡
            moveUl.style.transition = 'all 0.8s';
            moveUl.style.transform ='translateX('+moveWidth*index*-1+'px)';
        }
        // 在触摸屏幕离开的最后恢复定时器并且恢复ul的过渡效果
        timer = setInterval(function () {
            index++;
            // 因为过渡停止事件把过渡给暂时停止了，所以需要在定时器轮播图片的时候再次开启
            moveUl.style.transition='all 0.8s';
            moveUl.style.transform= 'translateX('+moveWidth*index*-1+'px)';
        },2000)
    })
}
