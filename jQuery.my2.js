//先创建一个自调用函数，形成一个局部作用域。
;(function(){
    //要先有一个基础选择器
    function jQuery(selector){
        //返回实例对象
        return new Init(selector);
    }

    //创建一个实例对象
    function Init(selector){
        //获取到的是一个伪数组
        let dom = document.querySelectorAll(selector)    
        //先循环数组
        for(let i = 0; i < dom.length; i++){
            //然后把这个结果付给自己
            this[i] = dom[i];
        }
        //伪数组是有一个长度的，因此也要把长度设置给自己
        this.length = dom.length;
    };
    //封装一个遍历数组的方法
    Init.prototype.each = function(callback){
        for(let i = 0; i <this.length; i++){
            //在遍历里面的逻辑是不确定的-传回调函数进来
            callback(i,this[i]);
        }
    }
    /**
   * jq的css方法，有两个功能
   *    设置css样式
   *      jq对象.css(属性名,属性值)
   *    获取css样式
   *      jq对象.css(属性名)
   * 
   *  */

    Init.prototype.css = function(property,value){
        //再判断如果没有输入第二个属性值，那么用户就是在获取这个元素的样式
        if(value == undefined){
            //就获取这个元素的样式
            return window.getComputedStyle(this[0])[property]
        }else{
        //添加css的样式
        //用一个数组把需要带单位的属性存起来
        let isArr = ['width','height','top','left'];
        //然后循环
        for(let i = 0; i <this.length; i++){
            //判断数组，如果使用者没有输入带单位的属性，就帮它补上去，如果带了就不用。
            if(isArr.indexOf(property) !== -1){
                //如果不等于负一的话就是没有带单位
                //那么就给他加上单位
                //判断
                if(value.toString().indexOf('px') === -1){
                    //就给他加上
                    this[i].style[property] = value + 'px';
                }else {
                    //否则的话就不用加上
                    this[i].style[property] = value;
                }
            }else {
                //否则就不用加上
                this[i].style[property] = value;
            }
        }
        //再返回一个this ，因为可以实现链式编程
        return this
    }
 }
  // 实现addClass功能
  /**
   *  jq里面的addClass
   *    jq对象.addClass(类名)
   * 
   */
    Init.prototype.addClass = function(ClassName){
        //循环遍历数组
        for(let i = 0; i < this.length; i++){
            //给数组某一个元素添加实现添加类名
            this[i].classList.add(ClassName);
        }
        //返回一个this，实现链式编程
        return this;
    }
      /**
   * 封装移除类名的方法
   * 
   */
    Init.prototype.removeClass = function(ClassName){
        this.each(function(i,e){
            e.classList.remove(ClassName)
        })
        //返回一个this
        return this;
    }
    /** 
   *  切换类名 
   * 
   */
    Init.prototype.toggleClass = function(ClassName){
        //循环数组
        this.each(function(i,e){
            e.classList.toggle(ClassName);
        })
    }


    //让外面可以用到
    window.$ = window.jQuery = jQuery;
})();