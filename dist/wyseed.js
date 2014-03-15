


(function(window){



	var Wyseed = function(){

		//初始化

		var rProtocol = /^(file\:.+\:\/|([\w\-]+\:\/\/))/;

		// 模块加载器的配置对象
        moduleOptions = {
            baseUrl : null,
            charset : {},    // 模块对应的charset存储对象
            alias : {}
        }; 


	var wyModule = {

			//

			init:function(){

				var script,scripts,dataMain,initBaseUrl,url;
				//标准浏览器支持，获取正在加载的js文件 //https://developer.mozilla.org/zh-CN/docs/DOM/document.currentScript
				if(document.currentScript){
					script = document.currentScript;
				}else {
					scripts = document.getElementsByTagName("script");
					script = scripts[scripts.length - 1];
				};

				dataMain = script.getAttribute("data-main");
				initBaseUrl = script.getAttribute("data-baseUrl");

				//获取路径地址

				url = script.hasAttribute ? script.src : script.getAttribute("data-baseUrl",4);
				
				url = url || window.location.href;

				moduleOptions.baseUrl = initBaseUrl ?
					wyModule.mergePath(initBaseUrl,window.location.href):
					url.slice(0,url.lastIndexOf("/")+1);


				if( dataMain ){
					//如果data-main存在的话，转成数组
					dataMain = dataMain.split(",");
					//加载data-main中的js文件
					//wyseedExport.use(dataMain);
				};

			},
			mergePath:function(id,url){               //解析本地地址"file://E:"和http://www.baidu.com/js
				url = "http://www.baidu.com/js";
				var idRoot = id.charAt(0) === "/",
					isHttp = url.slice(0,4) === "http",
					Protocol,urlDir,idDir,i=0,len,dir,dirPath,doMian;
					//获取开始的部分，比如：file:///E:
					Protocol = url.match(rProtocol)[1];
					//获取磁盘的目录
					url = url.slice(Protocol.length);


					if(isHttp){
						doMain = url.slice(0,url.indexOf("/")+1);
						url = idRoot ? "" : url.slice(doMain.length);
					};

					//把html文件名干掉 组装基础路径的目录数组
					urlDir = url.split("/");
					urlDir.pop();
					//组装模块标识的目录数组
					idDir = id.split("/");
					idDir.pop();
					
					if(idRoot){
						idDir.shift();
					};

					len = idDir.length;

					for(;i<len;i++){
						dir = idDir[i];
						//如果有..的话退回到上一层目录，把urlDir删除最后一个
						if(dir === ".."){
							url.pop();
						}else if(dir != "."){  //不为.的时候向下找文件夹

							urlDir.push(dir);

						};
					};

					dirPath = urlDir.join("/");

					
					dirPath = dirPath === "" ? "" : dirPath+"/";

					return Protocol + doMain + dirPath;
			}
	};

	var wyseedExport = {


		use:function(ids,fn){
			//确保是数组
			ids = typeof ids === "string" ? [ids] : ids;
			var len = ids.length,i,result;

			for(i=0;i<len;i++){
				// 获取解析后的模块名和url
				//result = wyModule.paserMoid(ids,)
			}




		}

	};



		wyModule.init();

	}







	Wyseed();


})(this)







