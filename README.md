# Canvas虹膜消除转场

## 使用方法
- 获取canvas元素
> var canvas = document.getElementById('irisWipe');
- 配置虹膜消除转场属性
> Iris.canvas = canvas; 	// canvas对象
> Iris.poses.steps = [
		{x: 50, y: 50}, 	// 收缩中心点，以百分比为单位
		{x: 30, y: 10}	 	// 放大中心点，以百分比为单位
	];
> Iris.speed = [12, 20]; 	// [收缩速度，放大速度]，数值越大速度越快
- 触发虹膜消除转场
Iris.init();

以上