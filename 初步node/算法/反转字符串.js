/**
 * 给定一个字符串，你需要
 * 反转字符串中每个单词的字符顺序，
 * 同时保留空格和单词的初始顺序；
 */

function reverseWord(str){
    var arr1=str.split(" ");
    var res=[];
    str.split(" ").forEach((item,index)=>{
        item=item.split(" ").reverse().join("");
        res.push(item);
        // console.log(res.join(" "));
    });
    return res.join(" ");
}

var str="Let`s   take LeetCode contest";
console.log(reverseWord(str));

// 注意match方法的使用