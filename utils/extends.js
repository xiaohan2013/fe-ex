// https://www.cnblogs.com/humin/p/4556820.html
// 1. 原型链继承

function Animal( name ) {
    this.name = name || "Animal";
    this.sleep = function(){
        console.log(this.name + " is sleeping.")
    }
}

Animal.prototype.eat = function(food){

}

function Cat(){}
Cat.prototype = new Animal()


// 2. 构造继承
function Cat(name){
    Animal.call(this);
    this.name = name || "Tom"
}

// 特点：

// 解决了1中，子类实例共享父类引用属性的问题
// 创建子类实例时，可以向父类传递参数
// 可以实现多继承（call多个父类对象）
// 缺点：

// 实例并不是父类的实例，只是子类的实例
// 只能继承父类的实例属性和方法，不能继承原型属性/方法
// 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能

// 3. 实例继承
function Cat(name){
    var instance = new Animal()
    instance.name = name || "Tom"
    return instance;
}

// 特点：

// 不限制调用方式，不管是new 子类()还是子类(),返回的对象具有相同的效果
// 缺点：

// 实例是父类的实例，不是子类的实例
// 不支持多继承


// 4. 拷贝继承
function Cat(name){
    var animal = new Animal()
    for(var p in animal){
        Cat.prototype[p] = animal[p]
    }
    Cat.prototype.name = name || 'Tom'
}

// 特点：

// 支持多继承
// 缺点：

// 效率较低，内存占用高（因为要拷贝父类的属性）
// 无法获取父类不可枚举的方法（不可枚举方法，不能使用for in 访问到）

// 5. 组合继承
function Cat(name){
    Animal.call(this);
    this.name = name || "Tom"
}
Cat.prototype = new Animal()

// 特点：

// 弥补了方式2的缺陷，可以继承实例属性/方法，也可以继承原型属性/方法
// 既是子类的实例，也是父类的实例
// 不存在引用属性共享问题
// 可传参
// 函数可复用
// 缺点：

// 调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）

// 6. 寄生组合继承
function Cat(name){
    Animal.call(this);
    this.name = name || "Tom";
}
(function(){
    var S = function(){}
    S.prototype = Animal.prototype;
    Cat.prototype = new S()
})()

// 特点：

// 堪称完美
// 缺点：

// 实现较为复杂
// 推荐指数：★★★★（实现复杂，扣掉一颗星）


function __extends(child, parent) {
    for(var p in parent){
        if(parent.hasOwnProperty(p)){
            child[p] = parent[p]
        }
    }

    function base(){
        this.constructor = child;
    }
    base.prototype = parent.prototype;
    child.prototype = new base();
}

