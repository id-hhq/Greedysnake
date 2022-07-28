//自调用函数 关住作用域
(function() {
      //全局的变量
      var ps = "absolute";
    //创建 蛇 的构造函数
    function Snake(option) {
        //避免传参错误
        option = option instanceof Object ? option : {};
        // 给对象添加属性
        //设置蛇节的宽度和高度属性
        this.width = option.width || 20;
        this.height = option.height || 20;
        //蛇身的数据
        this.body = [
            {x: 3,y:2,color:"blue"},
            {x: 2,y:2,color:"green"},
            {x: 1,y:2,color:"green"}
        ];
        //设置蛇移动的方向 也可以设置为 left top bottom
        this.direction = "right";
        //添加一个元素的数组 存储所有渲染的div元素
        this.elements = [];
    }
    //添加 渲染 方法
    Snake.prototype.render = function() {
        //生成对应个数的 div 元素
        //遍历 body 数组
        for (var i = 0 , len = this.body.length ; i < len ; i++) {
            //根据数组数据 生成 新的 div
            var piece = this.body[i];
            //创建新元素
            var ele = document.createElement("div");
            //添加样式
            ele.style.width = this.width + "px";
            ele.style.height = this.height + "px";
            ele.style.left = piece.x * this.width + "px";
            ele.style.top = piece.y * this.height + "px";
            ele.style.position = ps;
            ele.style.backgroundColor = piece.color;
             //让新元素添加到指定父级中
            map.appendChild(ele);
            //添加的新元素添加到数组里
            this.elements.push(ele);
        }
    };
    //添加蛇的运动方法
    Snake.prototype.move = function() {
        // 蛇身的每一节 都要 变到上一节的位置 
        //从后往前循环 避免前面数据影响后面变化
        for (var i = this.body.length - 1 ; i > 0 ; i--) {
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        //存储蛇头数据
        var head = this.body[0];
        //蛇头 根据方向变化
        switch (this.direction) {
            case "right":
                head.x += 1;
                break;
            case "left":
                head.x -= 1;
                break;
            case "top":
                head.y -= 1;
                break;
            case "bottom":
                head.y +=1;
        }
    };
    //删除上一次渲染的所有div元素
    Snake.prototype.remove = function(map) {
        //遍历数组删除所有元素
        //将元素从 html 中删除
        for (var i = this.elements.length - 1 ; i >= 0 ; i--) {
            map.removeChild(this.elements[i]);
        }
        //数组也需要清空
        this.elements = [];
    };
    //window暴露 Snake 函数
    window.Snake = Snake;
})();