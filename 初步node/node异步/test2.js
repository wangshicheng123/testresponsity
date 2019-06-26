console.log("script start");

let promise1=new Promise(function(resolve){
    console.log("promise1");
    resolve();
    console.log("promise1 end");
}).then(function(){
    console.log("promise2");
});

setTimeout(function(){
    console.log("setTimeout");
});

console.log("script end");

process.nextTick(function(){
    console.log("nexttick");
})

/**
 * 
 * nextTick 是同步和异步的中间执行过程
 * promise优先于setTimeout执行
 * 
 * require(./index)  // index.js  ,  index/index.js
 * 
 * node 下event loop 下的envent.eventEmitter  inherit
 * 手动简单实现一下eventEmitter
 * 
 * 宏任务和微任务：
 * 同步程序代码最快
 * process
 * promise的then方法
 * setTimeout(fn,0)
 * setImmitate(fn) // 最后执行
 * 
 * new promise里面的代码是同步的（resolve之前）
 * promise的then方法在settimeout之前执行
 * 
 * 同步代码--promise同步跟随代码--有同步代码执行（没有进入异步）--process.nexttick---
 * 
 * 5: async/await
 * callback可以是同步的，也可以是异步的（ajax callback）
 * async函数， 返回一个promise对象，当函数执行时候，一旦遇到await先返回
 * 等到触发异步操作完成，在执行函数体内的时候
 */