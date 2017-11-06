


//1. 创建正则对象
// RegExp(patterns, attr)
//

// 分割数字
const _re = new RegExp('\\d+', 'gim');

// 正则对象的方法： exec, test, complier

// exec: 检索字符串中指定的值。返回找到的值，并确定其位置。
// test: 检索字符串中指定的值。返回 true 或 false。

// 字符串的方法： match, search, replace, split


// 同一个正则表达式，对同一字符串，产生不同的输出
"1 2 3 4 5 6".match(_re)
// ["1", "2", "3", "4", "5", "6"]
_re.exec("1 2 3 4 5 6")
// ["1", index: 0, input: "1 2 3 4 5 6"]
"a 2 3 4 5 6".search(_re)
2

// 分组的比较
// 捕获分组()
var _re = new RegExp('([a-z]+)(\\d+)');
"000aaa111".match(_re)
_re.exec("000aaa111")
//两者都是返回： ["aaa111", "aaa", "111", index: 3, input: "000aaa111"]

// 非捕获性分组(?:)
var _re = new RegExp('(?:[a-z]+)(?:\\d+)');
"000aaa111".match(_re)
_re.exec("000aaa111")
//返回结果： ["aaa111", index: 3, input: "000aaa111"]

// 区别在于捕获分组会返回子分组，非捕获的不会返回子分组但是会匹配




//先看用捕获性分组匹配会返回什么
// var str1 = '000aaa111';
// var pattern = /([a-z]+)(\d+)/; //捕获性分组匹配
// var arr = pattern.exec(str1);  
// console.log(arr) //['aaa111','aaa','111']   结果子串也获取到了，这并不是我们想要的结果

