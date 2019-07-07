// module.exports可以把类对象，数组，方法和对象公布给外部


function fn(){
    this.sleep=function(){
        console.log("睡觉");
    }
    this.name="小王"
}
fn.prototype.eat=function(){
    console.log("我已经快撑死啦");
}
// 导出的是fn这个对象
// module.exports=fn;

// 导出的数组
// module.exports=["assd","ewrg","44684"]

// 如果导出的就是对象，我们在使用的时候就可以直接使用，不用new 了
var myfn=new fn();
module.exports=myfn;