//=============================== Tools ========================
var Tools = {
    //获取一个范围内部的随机整数
    getRandom : function (min,max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
    },
    //获取随机颜色
    getColor : function () {
        //rgb(r,g,b) 0-255 之间
        var r = this.getRandom(0,255);
        var g = this.getRandom(0,255);
        var b = this.getRandom(0,255);
        //返回一个颜色
        return "rgb("+r+","+g+","+b+")";
    }
};
//================================= Foods =======================
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
// ================================ Snake =================
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
//========================================= Game ============================
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

        },100);
    }
    //window暴露Game函数
    window.Game = Game;
})();
//================================== main ==========================
(function () {
    //测试
    var map = document.getElementById("map");
    var game = new Game(map);
    game.start();
})();