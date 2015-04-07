
sea.js开发规范  
==============
####Sea.js 追求简单、自然的代码书写和组织方式，具有以下核心特性  
    •	书写模块代码。  
    •	自然直观的代码组织方式：依赖的自动加载、配置的简洁清晰，可以让我们更多地享受编码的乐趣。  
    Sea.js 还提供常用插件，非常有助于开发调试和性能优化，并具有丰富的可扩展接口。

####1 文件目录  
  
    •	dist目录下是已经打包好的js静态文件，是由spm自动生成的；  
    •	import目录下是没有打包的入口文件；  
    •	jquery目录下是jquery文件；  
    •	lib目录下是通用的js插件；  
    •	package.json定义打包文件路径和规则；  
    •	sea.js就是主文件；  

####2 文件引入  

  Sea.js使用统一文件引用：  
  ```javascript
  <script type="text/javascript" src="script/sea.js"></script>
  ```
  
  Jquery使用传统引入方式，不适用sea.js插件形式引入：
  ```javascript
  <script type="text/javascript" src="script/jquery/jquery.min.js"></script>
  ```
  
  单页面入口文件引入规则：
  ```javascript
  <script type="text/javascript">
	seajs.use('admin/import/zl');
  </script>
  ```
  
