// ┌ ┬ ┐
// ├ ┼ ┤│─
// └ ┴ ┘ 

// ┌─  loginLink
// ├─  mask
// ├─  loginBox 
// │   ├─ loginBoxHeader
// │      ├─ closeBtn

//*******************************************************************
//获取元素对象
function g(el) { return document.getElementById(el); }

//*******************************************************************
//点击半透明遮罩和关闭按钮时，使半透明遮罩和登陆框不可见
g("mask").onclick = g("closeBtn").onclick = function () {
    g("mask").style.display = "none";
    g("loginBox").style.display = "none";
}
//点击页面标题栏“登录”链接时，使半透明遮罩和登陆框可见
g("loginLink").onclick = function () {
    g("mask").style.display = "block";
    g("loginBox").style.display = "block";
}

//函数: 自动居中
function autoCenter(el) {
    var bodyW = document.documentElement.clientWidth;
    var bodyH = document.documentElement.clientHeight;

    var elW = el.offsetWidth;
    var elH = el.offsetHeight;

    el.style.left = (bodyW - elW) / 2 + "px";
    el.style.top = (bodyH - elH) / 2 + "px";
}
//函数: 自动全屏
function fillToBody(el) {
    el.style.width = document.documentElement.clientWidth + "px";
    el.style.height = document.documentElement.clientHeight + "px";
}

var mouseOffsetX = 0;
var mouseOffsetY = 0;
var isDraging = false;

g("loginBoxHeader").addEventListener('mousedown', function (e) {
    var e = e || window.event;
    //鼠标点击点离浮出层左边框的距离
    mouseOffsetX = e.pageX - g("loginBox").offsetLeft;
    //鼠标点击点离浮出层上边框的距离
    mouseOffsetY = e.pageY - g("loginBox").offsetTop;
    isDraging = true;
})

document.onmousemove = function (e) {
    var e = e || window.event;
    mouseX = e.pageX;
    mouseY = e.pageY;
    
    var moveX = 0;
    var moveY = 0;

    if (isDraging === true) {

        moveX = mouseX - mouseOffsetX;
        moveY = mouseY - mouseOffsetY;

        //获取页面宽高度
        //document.documentElement.clientWidth 和 document.body.clientWidth 是不一样的 !
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;

        //获取浮出层的宽高度
        //offsetWidth 和 clientWidth 是不一样的 !
        var loginBoxWidth = g("loginBox").offsetWidth;
        var loginBoxHeight = g("loginBox").offsetHeight;

        var maxMoveX = pageWidth - loginBoxWidth;
        var maxMoveY = pageHeight - loginBoxHeight;

        //moveX = moveX > 0 ? moveX : 0;
        //moveX = moveX < maxMoveX ? moveX : maxMoveX;
        moveX = Math.min(maxMoveX, Math.max(0, moveX));
        moveY = Math.min(maxMoveY, Math.max(0, moveY));
        g("loginBox").style.left = moveX + "px";
        g("loginBox").style.top = moveY + "px";
    }
}

var mousePanel, mouseCtrl, mouseType;
var moving = 0, mouseStartX = 0, mouseStartY = 0;
function onMouseDown(e, panel, ctrl, type) {
    var  e = e || window.event;

    mouseStartX = e.pageX - ctrl.offsetLeft;
    mouseStartY = e.pageY - ctrl.offsetTop;

    mousePanel = panel;
    mouseCtrl = ctrl;
    mouseType = type;

    moving = setInterval(onMove, 10);
}

function onMove() {
    if (moving) {
        var toX = mouseX - mouseStartX;
        var toY = mouseY - mouseStartY;
        //限定浮出层最大宽高度
        var maxToX = document.documentElement.clientWidth - mousePanel.offsetLeft - 10;
        var maxToY = document.documentElement.clientHeight - mousePanel.offsetTop - 10;

        toX = Math.min(maxToX,Math.max(toX, 300));
        toY = Math.min(maxToY,Math.max(toY, 200));

        switch (mouseType) {
            case "r":
                mouseCtrl.style.left = toX + "px";
                mousePanel.style.width = toX + "px";
                break;
            case "b":
                mouseCtrl.style.top = toY + "px";
                mousePanel.style.height = toY + "px";
                break;
            case "rb":
                console.log(mouseCtrl.style.left);
                mouseCtrl.style.left = toX-8 + "px";
                mouseCtrl.style.top = toY-8 + "px";
                mousePanel.style.width = toX + "px";
                mousePanel.style.height = toY + "px";
                break;
        }
    }
}

document.onmouseup = function () {
    isDraging = false;

    clearInterval(moving);
    moving = 0;
    var cls = document.getElementsByClassName("resizable-box");
    for (var i = 0; i < cls.length; i++) {
        cls[i].style.left = "";
        cls[i].style.top = "";
    }
}

function resizable(el) {
    var panel = el;
    var rightBox = document.createElement("div");
    var bottomBox = document.createElement("div");
    var rightBottomBox = document.createElement("div");
    rightBox.class = rightBox.className = "resizable-right resizable-box";
    bottomBox.class = bottomBox.className = "resizable-bottom resizable-box";
    rightBottomBox.class = rightBottomBox.className = "resizable-right-bottom resizable-box";

    panel.appendChild(rightBox);
    panel.appendChild(bottomBox);
    panel.appendChild(rightBottomBox);

    rightBox.addEventListener("mousedown", function (e) {
        onMouseDown(e, panel, rightBox, "r");
    })
    bottomBox.addEventListener("mousedown", function (e) {
        onMouseDown(e, panel, bottomBox, "b");
    })
    rightBottomBox.addEventListener("mousedown", function (e) {
        onMouseDown(e, panel, rightBottomBox, "rb");
    })
}

//*******************************************************************************

window.onload = window.onresize = function () {
    autoCenter(g("loginBox"));
    fillToBody(g("mask"));
    resizable(g("loginBox"));
}