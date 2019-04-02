// {}是用来解构赋值的
import {a as b,add} from './test.js';
import xx from './default';
console.log(b);

let x=100;
let y=100;

console.log(add(x,y));

xx();
//babel-node test2.js   执行当前js文件