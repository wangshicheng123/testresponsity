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

// 向外部暴露出的对象就是module.exports暴露出的对象
// 我们可以使用者对象下的类进行构造对象
// 注意module.exports与exports的区别
// exports是module.exports的一个引用，一旦对其进行赋值，其以前引用的指向就消失了；
// 
module.exports={
    Demo,
    Student
}