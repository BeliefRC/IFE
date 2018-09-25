//单张图片上传，只考虑支持FileReader接口的浏览器
function previewImage() {

	//判断浏览器是否有FileReader接口
	if (typeof FileReader == 'undefined') {
		$("#destination,#destination2").css({
			'background' : 'none'
		}).html('亲,您的浏览器无法使用图片本地预览,使用结余宝手机端上传图片');
		//如果浏览器是ie
		if ($.browser.msie === true) {
			
		}
		//如果是不支持FileReader接口的低版本firefox 可以用getAsDataURL接口
		else if ($.browser.mozilla === true) {
			
		}
	} else {//支持FileReader接口  
		showPicture();
	}
}

//重定义图片尺寸大小
function showOriginalImg(path,id){
	var p = new Image();
    p.src = path;
	p.onload = function(){
		var w,h;
		w = this.width;
		h = this.height;
		if(w>h){
			$("#"+id).css("width","auto");
		}else{
			$("#"+id).css("height","auto");
		}
		var pNode = this.parentNode;
		var f_width = 80;
		var f_height = 80;
		var imgMaxSize = f_width;
		var i_width = w;
		var i_height = h;
		if (i_width <= i_height) {//图片的高度大于宽度
			var hh = i_height * (imgMaxSize / i_width);
			$("#"+id).css("margin-top",(imgMaxSize - hh)/2 + 'px');
		} else {//图片的高度小于宽度
			var ww = i_width * (imgMaxSize / i_height);
			$("#"+id).css("margin-left",(imgMaxSize-ww)/2 + 'px');
		}
	}
}

//删除图片
function del(a){
	//删除图片
	var b = $(a).parent().parent();
	b.html('');
	//清空file的值
	var obj = document.getElementById('imgUpload') ; 
	obj.outerHTML=obj.outerHTML.replace(/(value=\").+\"/i,"$1\"");
	showPicture();//重新定义onchange事件
}


//图片预览
function showPicture(){
	$("#imgUpload").change(
		function(e) {
			for (var i = 0; i < e.target.files.length; i++) {
				var file = e.target.files.item(i);
				//允许文件MIME类型 也可以在input标签中指定accept属性
				//console.log(/^image\/.*$/i.test(file.type));
				if (!(/^image\/.*$/i.test(file.type))) {
					continue; //不是图片 就跳出这一次循环
				}
				//实例化FileReader API
				var freader = new FileReader();
				freader.readAsDataURL(file);
				freader.onload = function(e) {
					var img = '<div class="container"><div class="close" onclick="del(this)">×</div><div style="width:80px;height:80px;overflow:hidden"><img src="' + e.target.result
							+ '" style="width:80px;height:80px" id="pic1"/></div></div>';
					$("#destination").empty().append(img);
					var imgs = document.getElementById("pic1");
					//$("#destination").empty().append(img);
					showOriginalImg(e.target.result,"pic1")
				}
			}
	});
}
