function Demo(){
    this.a=10;
    this.fn=function(){
        console.log("this my fn");
    }

}

function Student(){
    this.name="xiaowang";
    this.age=12;
    this.eat=function(){
        console.log("eat food");
    }
}

Demo.prototype.eat=function(){
    console.log("米线太多了");
}

console.log(Demo.prototype);
// 原型下的属性和方法都会被所有实例化对象所共享
var demo= new  Demo();
demo.eat();
console.log(demo.__proto__);

// 打印结果是true,
// 说明类下的属性prototype和实例化对下下的属性__proto__是相同的
console.log(Demo.prototype===demo.__proto__);


// 向外部暴露出的对象就是module.exports暴露出的对象
// 我们可以使用者对象下的类进行构造对象
// 注意module.exports与exports的区别
// exports是module.exports的一个引用，一旦对其进行赋值，其以前引用的指向就消失了；
// 
module.exports={
    Demo,
    Student
}


// exports是module.exports的引用，如果直接赋值为一个对象，
// 将失去原来引用的指向（即module.exports得地址）
// exports.Student=Student;
// exports={
//     Student: function(){
//         console.log(":efasdsfg");
//     }
// }