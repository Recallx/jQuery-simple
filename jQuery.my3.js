//封装一个jQuery功能的js文件，简单的功能
//用一个局部函数装起来，防止代码的重复。
(function(){
    //设置一个基础选择器
    function jQuery(selector){
        //new一个实例对象
        return new Init(selector)
    }

    //如果我们要设置方法给原型，就要自己构造一个函数
    function Init(selector){
        //我们要获取这个伪数组
        let dom = document.querySelectorAll(selector)
        //循环遍历，拿到这个数组里面的东西
        for(let i = 0; i < dom.length; i++){
            this[i] = dom[i];
        }
        //还有长度也要拿到
        this.length = dom.length;
    }
    //把方法添加给原型
    Init.prototype.css = function(prototy,value){
        //判断用户输入的是一个属性还是两个属性
        if(value == undefined){
            //返回属性的样式
            return window.getComputedStyle(this[0])[prototy];
        }else {
            //否则的话就帮用户更改这个属性的样式
            //先用一个数组把常用的样式单词存起来
            let isAll = ['width','height','top','left'];
            //循环数组
            for(let i =0; i < this.length; i++){
            //然后判断这个属性需不需要带单位
            if(isAll.indexOf(prototy) !== -1){
                //再判断是否等于-1
                if(value.toString().indexOf('px')===-1){
                    //如果等于-1就是代表里面没有加px
                    //现在给它加上px
                    this[i].style[prototy] = value + 'px';
                }else{
                    this[i].style[prototy] = value;
                }
            }else{
                this[i].style[prototy] = value;
            }
        }
        //返回this，因为实现链式编程
        return this;
    }
 }
    //实现addClass功能
    Init.prototype.addClass = function(className){
        //遍历
        for(let i = 0; i < this.length; i++){
            //添加功能
            this[i].classList.add(className)
        }
        //返回一个this
        return this;
    }

    //实现removeClass功能
    Init.prototype.removeClass =function(className){
        //用each循环数组
        this.each(function(i,e){
            //添加移除功能
            e.classList.remove(className)
        })
        //返回一个this
        return this;
    }


    //实现toggleClass功能
    Init.prototype.toggleClass = function(className){
        //遍历数组。
        this.each(function(i,e){
            //添加切换功能
            e.classList.toggle(className);
        })
        //返回一个this
        return this;
    }
    //同步获取id的功能给$
    window.$ = window.jQuery = jQuery;
})()