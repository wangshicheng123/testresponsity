// 获取当前的时间
let start = new Date();

// 遇到异步代码放到事件循环的队列中，
// 满足异步代码的2个执行条件后进行执行
setTimeout(function(){
    let end = new Date();
    console.log(end-start, 'ms');
},500);

// 以同步的方式延迟1000毫秒执行代码
while(new Date()-start < 1000){}


// 注意： 当setTimeout的回调函数一旦进入evnet loop后，的触发条件一直在进行执行，
// 虽然500毫秒的触发条件已经达到，但是主线程依然没有空闲，所以，
// 还是需要等待主线程空闲的时候；
