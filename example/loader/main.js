require.config({
    // paths:{
    //     a:'./a'
    // },
    paths:{
        common:'./common',
        aa: 'pkg/a/aa',
        bb:'pkg/b/bb'
    },
    // packages:[
    //     {
    //         name:'aa',
    //         location:'pkg/a',
    //         main:'aa'
    //     },
    //     {
    //         name:'bb',
    //         location:'pkg/b',
    //     }
    // ]
})

require(['common/util'], function(require, module, exports){
    console.log("=======================>start")
})


