# Canvas虹膜消除转场

## 使用方法

- 配置虹膜消除转场属性

``` javascript

var irisConf = {
	canvas: document.getElementById('irisWipe'), 	// canvas对象
	poses: {
		steps: [
			{x: 50, y: 50}, 	// 收缩中心点，单位百分比
			{x: 30, y: 10}	 	// 放大中心点，单位百分比
		]
	}, 
	speed: [12, 20]	// [收缩速度，放大速度]，单位百分比，数值越大速度越快
};
```

- 触发虹膜消除转场，将配置对象传入construct方法
``` javascript

Iris.construct(irisConf);

```

以上