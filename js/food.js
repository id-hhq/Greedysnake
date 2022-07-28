// 需要缩小定义 构造函数的作用
//匿名函数 自调用函数 IIFE ， 关住作用域
(function () {
    //全局的变量
    var ps = "absolute";
    //创建一个 食物 的构造函数
    function Food(option) {
        //避免传参错误
        option = option instanceof Object ? option : {};
        //传入数据可能是类似数组等对象
        this.width = option.width || 20;
        this.height = option.height || 20;
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.color = option.color || "red";
        //增加一个属性 存储将来这个对象渲染出来的 div 元素
        this.elements = [];

    }

    //渲染一个元素到页面上 需要添加到原型对象的方法中
    Food.prototype.render = function (map) {
        var ele = document.createElement("div");
        //每次设置样式之前，都随机获取一个x 和 y 的值
        this.x = Tools.getRandom(0, map.clientWidth / this.width - 1) * this.width;
        this.y = Tools.getRandom(0, map.clientHeight / this.height - 1) * this.height;
        //添加对应样式
        ele.style.width = this.width + "px";
        ele.style.height = this.height + "px";
        ele.style.left = this.x + "px";
        ele.style.top = this.y + "px";
        ele.style.backgroundColor = this.color;
        ele.style.position = ps;
        //让新元素添加到指定父级中
        map.appendChild(ele);
        //将新元素添加到数组中
        this.elements.push(ele);
    };
    //删除一个食物div的方法
    Food.prototype.remove = function (map, i) {
        //获取食物下标
        //将元素从 html 中删除
        map.removeChild(this.elements[i]);
        //将元素从 数组 中删除
        this.elements.splice(i, 1);
    };
    //利用 window 对象暴露 Food 函数 可以给外部使用
    window.Food = Food;
})();