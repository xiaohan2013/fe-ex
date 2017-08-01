// 注册订阅

class Watch {
    constructor(){
        this.target = this;
        this.update();
    },
    update(){

    }
}

class Dep {
    constructor(){
        this.subs = []
    }
    addSub(sub:Watch):void{
        this.subs.push(sub)
    },
    notify():void{
        this.subs.forEach(function(sub){
            sub.update()
        })
    }
}


// 发布
new Watch()
// 订阅
let dep = new Dep()
