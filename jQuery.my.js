//实现封装一个简单的jQuery功能的js文件
//先用一个自定义函数包起来，防止全局污染的问题。
(function(){
    //先设置一个基础选择器的函数
    function jQuery(selector){
        //返回一个实例对象
        return new Init(selector)
    }

    //我们要给原型加方法，就需要自己写一个构造函数
    function Init(selector){
        //遍历数组，把里面的东西拿出来，然后设置给自己
        let dom = document.querySelectorAll(selector);
        //循环
        for(let i =0; i <dom.length; i++){
            //把这个数组里面的元素设置给自己
            this[i] = dom[i];
        }
        //伪数组返回的还有长度，所以把长度也设置给自己
        this.length = dom.length;
    }
    

    //下面添加功能的时候，有很多地方用的到遍历数组，所以封装起来，后面可以用。
    Init.prototype.each = function(cllback){
        for (let i = 0; i <this.length; i++){
            //里面的逻辑可能都是需要更改的，传回调函数进来
            cllback(i,this[i]);
        }
    }

    //实现添加css的样式功能
    Init.prototype.css  = function(property,value){
        //先判断如果用户输入的是一个属性，就是在获取元素的样式，否则是设置样式
        if(value == undefined){
            return window.getComputedStyle(this[0])[property]
        }else {

        //先把属性的单词用一个数组存起来
        let isAll = ['width','height','top','left']
        //遍历数组,把里面的每一个都找到，可以设置css样式
        for(let i = 0; i < this.length; i++){
            //判断如果用户输入属性没有添加px，就给他加上去，如果有就不用。
            if(isAll.indexOf(property) !== -1){
                //在判断如果等于-1就加上px
                // 把要带单位的属性和不带单位的属性区分开,如果要带单位的属性就进来。
                if(value.toString().indexOf('px')===-1){
                    this[i].style[property] = value + 'px';
                }else {
                    this[i].style[property] = value;
                }
            }else {
                this[i].style[property] = value;
            }
        }
        //返回一个this，实现链式编程
        return this;
    }
 }
   // 实现addClass功能
  /**
   *  jq里面的addClass
   *    jq对象.addClass(类名)
   * 
   */
    Init.prototype.addClass =function(className){
        //遍历数组
        for(let i = 0; i <this.length; i++){
            //添加类名
            this[i].classList.add(className)
        }
    }

    //实现移出功能
    Init.prototype.removeClass = function(className){
        //遍历数组
        this.each(function(i,e){
            e.classList.remove(className);
        })
    }

    //实现切换功能
    Init.prototype.toggleClass = function(className){
        //遍历数组
        this.each(function(i,e){
            e.classList.toggle(className);
        })
    }

    //用$代替jQuery代替可以获取元素
    window.$ = window.jQuery = jQuery;
})();