/* 
    自己封装的工具库
    基于可插拔的架构去写
*/

(function () {
  var root =
    (typeof self == "object" && self.self === self && self) ||
    (typeof global == "object" && global.global === global && global) ||
    this ||
    {};

  //  这里返回的其实是一个new好的underscore实例
  var _ = function (obj) {
    // 如果传入的不是 underscore 实例，则会 new 一个实例
    // new 出来的 Object.create(obj)
    if (!(this instanceof _)) return new _(obj);

    // 记录的是 _(data) 传入的 data 参数 [11, 22, 33]
    this._wrapped = obj;
  };

  //  判断传入的参数，是否是一个function
  _.isFunction = function (obj) {
    return typeof obj === "function" || false;
  };

  //  实现each方法
  _.each = function (array, fn) {
    for (let i = 0; i < array.length; i++) {
      fn(array[i], i);
    }

    return array;
  };

  /*
    实现一个节流函数,需要解决三个问题
    1.每个一段时间，执行一次
    2.第一次触发会立即执行
    3.如果在间隔时间内触发，会在间隔末尾再执行一次
  */  
  _.throttle = function(callback,wait){
    let isFirst = true;
    let execDate = +new Date();
    let throttleId = null;
    
    return function(){
        if(isFirst){
            callback()
            execDate = +new Date();
            isFirst = false;
        }else{
            let currentDate = +new Date();
            if(currentDate-execDate>=wait){
                callback();
                execDate = +new Date();
            }else{
                if(throttleId){
                    clearTimeout(throttleId)
                }
                const timeWait = execDate+wait - +new Date();
                setTimeout(()=>{
                    callback()
                    execDate = +new Date();
                },timeWait)
            }
        }
    }
  }

})();
