
sea.js开发规范  
==============
####Sea.js 追求简单、自然的代码书写和组织方式，具有以下核心特性  
    • 书写模块代码。  
    • 自然直观的代码组织方式：依赖的自动加载、配置的简洁清晰，可以让我们更多地享受编码的乐趣。  
    • Sea.js 还提供常用插件，非常有助于开发调试和性能优化，并具有丰富的可扩展接口。

####1  文件目录  
  ![文件整体目录](https://github.com/div-wang/Yscript/blob/lib/seajs/img/image001.png "文件整体目录")  
  * `/dist/`目录下是已经打包好的js静态文件，是由spm自动生成的    
  * `/import/`目录下是没有打包的入口文件  
  * `/jquery/`目录下是jquery文件   
  * `/lib/`目录下是通用的js插件    
  * `package.json`定义打包文件路径和规则    
  * `sea.js`就是主文件    

####2  文件引入  

  sea.js使用统一文件引用：  
  ```javascript
  <script type="text/javascript" src="script/sea.js"></script>
  ```
  
  Jquery使用传统引入方式，不使用`sea.js`模块形式引入：   
        解释：jquery模块引入方式会将jquery打包进js入口文件里，js入口文件太大，占用空间
  ```javascript
  <script type="text/javascript" src="script/jquery/jquery.min.js"></script>
  ```
  
  单页面入口文件引入规则：
  ```javascript
  <script type="text/javascript">
  seajs.use('admin/import/zl');
  </script>
  ```
  
####3   配置文件详解 

#####sea.js配置文件:  
![sea.js配置文件](https://github.com/div-wang/Yscript/blob/lib/seajs/img/image002.png "sea.js配置文件")  
sea.js详细配置规则：[配置](https://github.com/seajs/seajs/issues/262)  
  
#####spm配置文件:
![spm配置文件](https://github.com/div-wang/Yscript/blob/lib/seajs/img/image003.png "spm配置文件") 
`spm.output`是需要打包的文件数组，打包好的文件会放入根据入口名字自动生成一个文件夹下，文件夹会放在`/dist/`目录下；  
![spm打包文件路径](https://github.com/div-wang/Yscript/blob/lib/seajs/img/image004.png "spm打包文件路径")   
  
#####后期想法:  
目前每个项目都是独立打包，都会有个独立的配置文件和`sea.js`，相对比较分散；后期开发统一的`sea.js`文件作为入口，每个项目单独做出一份`config.js`配置`sea.js` 的规则和`Package.json`单独打包，把所有项目的js文件放在一个目录下，统一管理；

####4  模块引入
`sea.js`遵循`CMD`规范，但是写法上更像`AMD`规范；  

模块使用`define`作为关键字函数：  
```javascript
  define(['jquery'],function(require, exports, module) {
    //code
  })
```

引入模块的方式：
```javascript
  define(['jquery'],function(require, exports, module) {
    require(’模块名称’）
  })
```
  
具体`CMD`模块定义规范请阅读玉伯大大的：[CMD 模块定义规范 #242](https://github.com/seajs/seajs/issues/242)  
  
####5  打包上线 
##### sea.js 提供了一个专业的打包工具spm
[spm](https://github.com/spmjs/spm) 是一套完整的浏览器端组件管理解决方案，包含对于 `JavaScript`、`CSS` 和模板的处理。

##### spm依赖于node.js环境，所以请在本机安装node.js让后执行spm的安装（为方便后期使用，spm要全局安装）
    $ npm install spm –g
Blink：[spm中文文档](http://sorrycc.gitbooks.io/spm-handbook/content/index.html)
####spm更新版本到3.6，目前问题：  
  `spm build`命令打包文件无法出现`-debug`文件;  
  ##### 静态文件打包使用的是`spm bulid`命令，spm会自动根据`package.json`合并所有依赖文件；同时会生成不压缩的-debug文件，方便前期调试；

![spm bulid-1](https://github.com/div-wang/Yscript/blob/lib/seajs/img/image005.png "spm bulid-1")   
![spm bulid-2](https://github.com/div-wang/Yscript/blob/lib/seajs/img/image006.png "spm bulid-2")   
  
####6  项目规范 
#####项目js文件在`/import/`目录和`/lib/`目录下开发，功能确定之后使用spm打包合并，并在10.0.0.2上测试（建议统一上传到10.0.0.2进行开发）；
spm打包合并会自动生成`/dist/`文件夹，上线只需上传`/dist/`文件夹即可；  
#####项目上线一定要保证页面的js入口文件使用的是压缩文件，不能使用debug文件上线；




