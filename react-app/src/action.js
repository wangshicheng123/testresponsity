// Action本质上是一个js的普通法的对象，
// acction内必须使用一个字符串类型的type字段表示将要执行的动作

// 添加参数count是加几个数
export let add =(count)=>{
    console.log("触发了add方法");
    return {
        type: "ADD",
        payload: count
    }
}

export let reduce=()=>{
    console.log("触发了reduce方法");
    return {
        type: "REDUCE"
    }
}
