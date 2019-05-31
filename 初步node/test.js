console.log("start");
for(var i=0; i< 5; ++i){
    // 遇到function回调函数会把其放在事件循环event loop中，
    // 触发异步代码的条件是： 当前线程空闲，满足触发条件（时间IO,磁盘IO）

    setTimeout(function(){
        console.log(i);
    },0); // 即使当前触发条件时0秒，也会等当前线程空闲才会执行；
}

//  在for 循环中是使用的i是全局变量

console.log("test: "+i);
console.log("end");
