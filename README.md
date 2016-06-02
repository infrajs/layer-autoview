# Свойство autoview для слоёв infrajs

Блок с плавающим содержанием вслед за мышкой.

## Установка через composer

```json
{
	"require":{
		"infrajs/layer-autoview":"~1"
	}
}
```

## Использоваие

```html
<script src="vendor/infrajs/layer-autoview/Autoview.js"></script>
```

Требуется следующая вёрстка с указанной высотой

```html
	<div id="autoview" class="autoview" style="height:100px; overflow:hidden">
		<div class="autoviewbody">
			Длинный контент
		</div>
	</div>
```

```html
<script>
	Autoview.init('autoview'); //id элемента c классом autoview или у которого есть родитель, или вложенный элемент с классом autoview
</script>
```

## Работа с infrajs
Подключается автоматически через [collect](https://github.com/infrajs/collect). У слоя с указанной вёрсткой нужно указать параметр **autoview:true**
