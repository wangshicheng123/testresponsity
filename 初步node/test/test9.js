var Module =require("./test8.js");


console.log(Module);

// 对于使用module.exports导出的方法，
// 都需要使用new 来实例化一个对象来使用
// var fn= new Module();
// console.log(fn);
// console.log(fn.name);
// console.log(fn.sleep());
// fn.eat();

Module.eat()