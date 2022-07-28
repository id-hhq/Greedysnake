(function() {
    //定义一个全局变量 储存 this
    var that;
    //创建 游戏 的构造函数
    function Game(map) {
        //设置三个属性 储存 食物 蛇 地图
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }
    //添加一个游戏开始的方法 方法内初始化 蛇 和食物
    Game.prototype.start = function() {
        //1.添加蛇和食物到地图上
        this.food.render(this.map);
        this.food.render(this.map);
        this.food.render(this.map);
        this.snake.render(this.map);
        //2.游戏逻辑开始
        //2.1 让蛇自动运动起来
        runSnake();
        //2.2 通过上下左右箭头 控制蛇的运动方向
        bindKey();
       
        
        
    };
    //封装一个私有函数控制上下左右控制方向
    function bindKey() {
        //给文档绑定一个键盘按下事件
        document.onkeydown = function(e) {
            switch(e.keyCode) {
                case 37:
                    that.snake.direction = "left";
                    break;
                case 38:
                    that.snake.direction = "top";
                    break;
                case 39:
                    that.snake.direction = "right";
                    break;
                case 40:
                    that.snake.direction = "bottom";
            }
        };
    }
    //封装一个私有函数 只能在模块内使用
    function runSnake() {
        //开启一个定时器 让蛇连续运动
        var timer = setInterval(function () {
            //定时器函数内部的this 指向的是 window
            //让蛇开始运动
            that.snake.move();
            //删掉上一次的蛇
            that.snake.remove(that.map);
            //渲染新位置
            that.snake.render(that.map);
            
            //记录最大的位置
            var maxX = that.map.offsetWidth / that.snake.width;
            var maxY = that.map.offsetHeight/ that.snake.height;
            //找到蛇头的位置
            var headX = that.snake.body[0].x;
            var headY = that.snake.body[0].y;
            //每次走都要判断是否吃到食物
            //2.3 判断蛇头与食物是碰撞 
            // var foodX = that.food.x;
            // var foodY = that.food.y;
            //获取蛇头具体坐标 px值
            var hX = headX * that.snake.width;
            var hY = headY * that.snake.height;
            //判断
            //将食物的数组中的每一个都要进行对比 谁被吃掉 就删掉 渲染一个新元素
            for (var i = 0 ; i < that.food.elements.length ; i++) {
                if (that.food.elements[i].offsetLeft === hX && that.food.elements[i].offsetTop === hY) {
                    //删除食物
                    //渲染新食物
                    that.food.remove(that.map,i);
                    that.food.render(that.map);
                    //添加新蛇节
                    var last = that.snake.body[that.snake.body.length - 1];
                    that.snake.body.push({
                        x: last.x,
                        y: last.y,
                        color: last.color
                    });
                }
            }
            //2.4 判断是否超出游戏范围
            // 每移动一次判断是否超出游戏范围
            
            //进行判断
            if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
                //停止定时器
                clearInterval(timer);
                //弹出提醒
                alert("Game Over!");
            }

        },150);
    }
    //window暴露Game函数
    window.Game = Game;
})();