/*
    校验
*/

var validator = {
    types:{},
    message:[],
    config:{},
    validate: function(data){

        var i, msg, type, checker, result_ok;

        this.message = [];

        for(i in data){
            if(data.hasOwnProperty(i)) {
                type = this.config[i];
                checker = this.types[type];

                if(!type){
                    continue;
                }

                if(!checker){
                    throw {
                        name: "ValidationError",
                        message: "No handler to validate type " + type
                    }
                }

                result_ok = checker.validate(data[i]);
                if( result_ok ) {
                    msg = "Invalid value for *" + i + "*, " + checker.instructions;
                    this.message.push(msg)
                }
            }
        }

        return this.hasErrors();
    },
    hasErrors: function(){
        return this.message.length !== 0;
    }
}


// 验证给定的值是否不为空
validator.types.isNonEmpty = {
    validate: function( value ){
        return value !== ""
    },
    instructions: "传入的值不能为空"
}

validator.types.isNumber = {
    validate: function( value ){
        return !isNaN(value)
    },
    instructions: "传入的值只能是合法的数字，例如： 1， 3， 4"
}

validator.types.isAlphaNum = {
    validate: function( value ){
        return !/[^a-z0-9]/i.test( value )
    },
    instructions: "传入的值只能保护字母和数字，不能包含特殊字符"
}


var data = {
    first_name: 'Tom',
    last_name: "Xu",
    age: 'Unknown',
    username: "ToxXu"
}
validator.config = {
    first_name: 'isNonEmpty',
    age: 'isNumber',
    username: 'isAlphaNum'
}

validator.validate(data);
if( validator.hasErrors() ) {
    console.log(validator.message.join("\n"))
}



// 策略对象
var strategies = {

}

var Validator = function(){}

Validator.prototype.add = function(dom, rules) {
    var self = this;
    for(var i = 0, rule; rule = rule[i++];){
        (function(rule){
            var strategyAry = rule.strategy.split(":");
            var errorMsg = rule.errorMsg;
            self.cache.push(function(){
                var strategy = strategyAry.shift();
                strategyAry.unshift(dom.value);
                strategyAry.push(errorMsg);
                return strategys[strategy].apply(dom,strategyAry);
            });
        })(rule)
    }
}

Validator.prototype.start = function(){
    for(var i = 0, validatorFunc; validatorFunc = this.cache[i++]; ) {
        var msg = validatorFunc(); // 开始效验 并取得效验后的返回信息
        if(msg) {
            return msg;
        }
    }
}


// 代码调用
var registerForm = document.getElementById("registerForm");
var validateFunc = function(){
    var validator = new Validator(); // 创建一个Validator对象
    /* 添加一些效验规则 */
    validator.add(registerForm.userName,[
        {strategy: 'isNotEmpty',errorMsg:'用户名不能为空'},
        {strategy: 'minLength:6',errorMsg:'用户名长度不能小于6位'}
    ]);
    validator.add(registerForm.password,[
        {strategy: 'minLength:6',errorMsg:'密码长度不能小于6位'},
    ]);
    validator.add(registerForm.phoneNumber,[
        {strategy: 'mobileFormat',errorMsg:'手机号格式不正确'},
    ]);
    var errorMsg = validator.start(); // 获得效验结果
    return errorMsg; // 返回效验结果
};
// 点击确定提交
registerForm.onsubmit = function(){
    var errorMsg = validateFunc();
    if(errorMsg){
        alert(errorMsg);
        return false;
    }
}


// 状态，行为和结构

// 策略模式的三个对象
// 1. 环境对象
// 2. 抽象策略对象
// 3. 具体策略对象

var Shipping = function(){
    this.company = ""
}
Shipping.prototype = {
    setStrategy: function(company){
        this.company = company;
    },

    calculate: function(package){
        return this.company.calculate(package)
    }
}

var UPS = function(){
    this.calculate = function(package){
        return "$45.90"
    }
}

var USPS = function(package){
    this.calculate = function(package){
        return "$32.23"
    }
}

var Fedex = function(){
    this.calculate = function(){
        return "$323.30"
    }
}

var log = (function(){
    var log = "";

    return {
        add: function(msg){ log += msg + "\n"; },
        show: function(){ alert(log); log = ""; }
    }
})()

function run(){
    var package = { from : '7612', to: '10012', weight: '1kg' };

    var ups = new UPS();
    var usps = new USPS();
    var fedex = new Fedex();

    var Shipping = new Shipping();
    Shipping.setStrategy(ups)
    Shipping.setStrategy(usps)
    Shipping.setStrategy(fedex)

    log.show()
}



// jQuery Hooks
// plugin API







