window.requestAnimationFrame = window.requestAnimationFrame || 
                                window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.msRequestAnimationFrame ||
                                function(callback){
                                    setTimeout(callback, 1000/60)
                                }












