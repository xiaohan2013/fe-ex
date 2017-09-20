// 算法运行环境Phantomjs


console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
function sort_v2(type, index, list){
    TimeLine.tick('s')
    var _arr = list;
    if(type == 1){ //置顶
        var _pop_element = _arr.splice(index,1);
        _arr.unshift(_pop_element[0]);
    }else if(type == 2){ // 上移
        var _index_elem = _arr[index],
            _prev_elem = _arr[index-1];
        _arr.splice(index, 1, _prev_elem);
        _arr.splice(index-1, 1, _index_elem);
    }else if(type == 3){ // 下移
        var _index_elem = _arr[index],
            _next_elem = _arr[index+1];
        _arr.splice(index, 1, _next_elem);
        _arr.splice(index+1, 1, _index_elem);
    }else if(type == 4){ // 置底
        var _pop_element = _arr.splice(index,1);
        _arr.push(_pop_element[0]);
    }
    TimeLine.tick('e')
    console.log("======>sort_v1===: ", TimeLine.getDiff())
    return _arr;
}

function sort_v1(direction, index, itemslist){
    TimeLine.tick('s')
    var list = [];
    if(direction == '1'){
        list.push(itemslist[index])
        for(var i  in itemslist){
            if(i!=index){
                list.push(itemslist[i])
            }
        }
    }else if(direction == '2'){
        for(var i  in itemslist){
            if(i==index-1){
                list.push(itemslist[index])
            }else if(i==index){
                list.push(itemslist[index-1])
            }else{
                list.push(itemslist[i])
            }
        }
    }else if(direction == '3'){
        for(var i  in itemslist){
            if(i==index+1){
                list.push(itemslist[index])
            }else if(i==index){
                list.push(itemslist[index+1])
            }else{
                list.push(itemslist[i])
            }
        }
    }else if(direction == '4'){
        for(var i  in itemslist){
            if(i!=index){
                list.push(itemslist[i])
            }
        }
        list.push(itemslist[index])
    }
    TimeLine.tick('e')
    console.log("======>sort_v2===: ", TimeLine.getDiff())
    return list;
}



function generateRandom(n, range){
    var _i = n, _r = range, _res = [];
    for(;n > 0; n--){
        _res.push(Math.floor(Math.random()*1000))
    }
    return _res;
}


var TimeLine = {
    time:{
        start:0,
        end:0,
    },
    tick:function(p){
        var _now = +new Date();
        p == 's' ? this.time.start = _now : this.time.end = _now;
    },
    getDiff:function(){
        var diff = this.time.end - this.time.start;
        this.time.end = 0;
        this.time.start = 0;
        return  diff;
    }
}


var list = generateRandom(10000000, 10000000000);
console.log("==================================v1")
sort_v1(1, 900, list);
sort_v1(2, 10000, list);
sort_v1(3, 5600, list);
sort_v1(4, 999990, list);
console.log("==================================v2")
sort_v2(1, 900, list);
sort_v2(2, 10000, list);
sort_v2(3, 5600, list);
sort_v2(4, 999990, list);

// ==================================v1
// ======>sort_v2===:  10244
// ======>sort_v2===:  8626
// ======>sort_v2===:  8678
// ======>sort_v2===:  8076
// ==================================v2
// ======>sort_v1===:  53
// ======>sort_v1===:  0
// ======>sort_v1===:  0
// ======>sort_v1===:  2

phantom.exit(0);

