/**
 * Created by Whiskey on 2016/4/11.
 */
charset = "UTF-8";
var win = document.getElementById("win");
var close = document.getElementsByTagName("span")[0];
var title = document.getElementsByTagName("h2")[0];
var confirm = document.getElementsByTagName("button")[0];
var cancel = document.getElementsByTagName("button")[1];
var click = document.getElementsByTagName("button")[2];
var mask = document.getElementById("mask");

// 创建eventUtil对象
var eventUtil = {
    // 添加
    addHandler: function (elt, type, handler) {
        if (elt.addEventListener) {
            elt.addEventListener(type, handler, false);
        } else if (elt.attachEvent) {
            elt.attachEvent("on" + type, handler);
        } else {
            elt["on" + type] = handler;
        }
    }
};

function setBlock() {
    win.style.display = "block";
    mask.style.display = "block";
}

function setNone() {
    win.style.display = "none";
    mask.style.display = "none";
}

function setDrag(event) {
    var disX, disY;
    event = event || window.event;
    disX = event.clientX - win.offsetLeft;
    disY = event.clientY - win.offsetTop;
    document.onmousemove = function (event) {
        event = event || window.event;
        win.style.left = event.clientX + 200 - disX + "px";
        win.style.top = event.clientY + 100 - disY + "px";
    };
    document.onmouseup = function () {
        document.onmousedown = null;
        document.onmousemove = null;
    }
}

eventUtil.addHandler(click, "click", setBlock);
eventUtil.addHandler(close, "click", setNone);
eventUtil.addHandler(cancel, "click", setNone);
eventUtil.addHandler(mask, "click", setNone);
eventUtil.addHandler(title, "mousedown", setDrag);
eventUtil.addHandler(confirm, "click", function () {
    alert("这是一个弹出层")
});