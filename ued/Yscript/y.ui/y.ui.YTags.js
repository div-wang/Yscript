/**
 * 创建标签选择器
 * @param {type} config
 * config.id			: 选择器ID
 * config.container		: 显示容器，通常是一个空的DIV
 * config.target		: 数据容器，通常是 INPUT type="hidden"
 * config.skin			: 显示皮肤，CSS类名，给container的
 * config.source		: 数据字典来源，一个URL字符串或者一个数据数组
 * config.adapter		: fn(row) 数据读取适配器
 * config.action		: 动作列表
 * { tagClick		: fn(id) 点击已有标签
 *	 tagDblClick	: fn(id) 双击已有标签
 *	 tagCreate		: fn(text) 添加标签
 * }
 */
function YTags (config){
	var container	= Y('#' + config.container);
	var target		= Y('#' + config.target);
	
	if(typeof config.source === 'string'){
		//TODO:Ajax读取数据列表，并利用 adapter 转换到标准的 id:name 格式
	}else{
		//检查数组
	}
	var tag_list = target.value().split(',');
	
}