var counter = 0;
module.exports= function () {
    counter += 10;
    this.printNextCount = function () {
        console.log(counter);
    }
}

// module.exports={
    // temp
// }

// 可以看到exports是module.exports的引用
var isEq = (exports === module.exports);
console.log(exports);
console.log(module.exports);
console.log(isEq);