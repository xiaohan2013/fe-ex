// 迭代器和生成器

// 当一个对象实现了Symbol.iterator属性时，我们认定它是可迭代的。
// 内置的类型如：Array, Map, Set, String, Int32Array, Uint32Array等都实现了Symbol.iterator


// for..of语句
let someArray = [1, 'string', false];
for( let entry of someArray ) {
    console.log(entry)
}

// for..of vs for..in语句
// 区别1：
// for..of : 迭代的是对象的键
// for..in ：迭代对象的键对应的值

let list = [4, 5, 6]
for( let i in list ){
    console.log(i)
}
for( let i of list){
    console.log(i)
}
// 区别2：
// for..in可以操作任何对象，提供了查看对象属性的一种方法
// 关注迭代对象的值，内置对象Map和Set已实现了Symbol.iterator方法,让我们可以访问它们保存的值
let pets = new Set(["Cat", "Dog", "Hamster"])
pets["species"] = "mammals";
for( let pet in pets ) {
    console.log(pet)
}
for( let pet of pets ) {
    console.log(pet)
}

// 目标代码生成：ES5和ES3
