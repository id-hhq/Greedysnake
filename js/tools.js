//制作工具对象
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