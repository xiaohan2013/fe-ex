// 迭代器和生成器
// 当一个对象实现了Symbol.iterator属性时，我们认定它是可迭代的。
// 内置的类型如：Array, Map, Set, String, Int32Array, Uint32Array等都实现了Symbol.iterator
// for..of语句
var someArray = [1, 'string', false];
for (var _i = 0, someArray_1 = someArray; _i < someArray_1.length; _i++) {
    var entry = someArray_1[_i];
    console.log(entry);
}
// for..of vs for..in语句
// 区别1：
// for..of : 迭代的是对象的键
// for..in ：迭代对象的键对应的值
var list = [4, 5, 6];
for (var i in list) {
    console.log(i);
}
for (var _a = 0, list_1 = list; _a < list_1.length; _a++) {
    var i = list_1[_a];
    console.log(i);
}
// 区别2：
// for..in可以操作任何对象，提供了查看对象属性的一种方法
// 关注迭代对象的值，内置对象Map和Set已实现了Symbol.iterator方法
var pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";
for (var pet in pets) {
    console.log(pet);
}
for (var _b = 0, pets_1 = pets; _b < pets_1.length; _b++) {
    var pet = pets_1[_b];
    console.log(pet);
}
