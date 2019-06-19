// // console.log("start");
// // for(var i=0; i<5; ++i){
// //     setTimeout(()=>{
// //         console.log((new Date).getTime());
// //     },0);
// // }
// // console.log("end");

// console.log(typeof(null));  // object
// let obj={
//     name: "123"
// }

// console.log(typeof(obj));
// console.log(obj.constructor);
// console.log(obj instanceof Object);  // [Function: Object]

// let arr=[1,2,3,4];
// console.log(arr.constructor); // [Function: Array]
// console.log(typeof(arr));
// console.log(arr instanceof Array);


// let eat=()=>{
//     console.log("food");
// }

// console.log(typeof(eat));
// console.log(eat.constructor);  // [Function: Function]
// console.log(Object.prototype); // {}  注意Object构造函数的原型是一个空对象



let start = new Date();
// console.log(start);

setTimeout(() => {
    let end = new Date();
    console.log(end - start);
}, 500);
while (new Date() - start < 1000) {

}

// 异步代码的执行时机：
// 当前线程空闲
// 满足触发条件（时间I/O,或者是磁盘I/O）