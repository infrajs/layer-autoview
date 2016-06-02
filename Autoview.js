/*
	Прокрутка блоков за мышкой. Нужна вёрстка. и должна быть указана высота у autoview
	<div class="autoview" style="height:100px; overflow:hidden">
		<div class="autoviewbody">
		</div>
	</div>
*/

window.Autoview = {
	init: function (div) {
		if (typeof(div)=='string') {
			var div = $('#'+div);
		} else {
			var div = $(div);
		}
			
		var delta = 0;

		var divs=div.parents('.autoview:first');
		if (!divs.length) {
			if (div.filter('.autoview').length) {
				divs = div;
			} else {
				var divs = div.find('.autoview').filter('[data-status!="ready"]').data('status', 'ready');
			}
		}
		
		divs.each(function(){
			var div=$(this);
			var body = div.find('.autoviewbody');
			if(!body.length)return;
			
			body.css('transition','0.1s');
			//Для каждого дива свой set и check
			var inwork=false;//Метка о том что идут уже проверки
			var posy=0;
			var move=function(y){
				posy=y;//Последнее положение курсора на div
				window.inwork=inwork;
				if(inwork)return;//Уже идут проверки выходим
				inwork=true;
				check();
			}
			
			var check=function(){
				var size=div.height();//Доступная высота в которой нужно весь контент уместить

				var height=body.height();//Высота всего контента, так как иллюстрации долго грузятся может меняться
				var scroll=$(document).scrollTop();
				var top=div.offset().top;
				var pos=posy-top+scroll;
				
				/*if(pos<0){
					if(delta>pos)delta=pos;
				}else if(pos>size){
					if(delta<pos-size)delta=pos-size;
				}
				pos=pos-delta;*/
			/*
					мышка перемещается от 0 до height текущее значение положения мышки хранится в pos
					длина картинки от 0 до height-любая

					отрицательный margin у картинки сверху должен быть равен
				*/
					var d=50;
				if(pos<d)pos=0;
				if(pos+d>size)pos=size;
				
				var k=pos/size;//На сколько близко к концу - процент на который нужно приблизиться к концу
				var maxmargin=height-size;
				var needmargin=maxmargin*k;

				
				var oldmargin=body.css('margin-top');
				oldmargin.replace('px','');
				if(!oldmargin||oldmargin=='auto')oldmargin=0;
				oldmargin=parseInt(oldmargin);
				oldmargin*=-1;
				
				difmargin=needmargin-oldmargin;//Считаем что нужно дальше чем есть сейчас, это будет +
				difmargin=Math.floor(difmargin);
				var isback=(difmargin<0);
				
				
				if(isback){
					var newdif=-1*Math.sqrt(-1*difmargin);
					newdif=difmargin/3;
					newdif=Math.floor(newdif);
				}else{
					var newdif=Math.sqrt(difmargin);
					newdif=difmargin/3;
					newdif=Math.ceil(newdif);
				}
				var newmargin=oldmargin+newdif;
				body.css('margin-top','-'+newmargin+'px');
				
				if (!difmargin || newmargin == needmargin){
					inwork = false;
					window.inwork = inwork;
					return;
				}
				setTimeout(check, 50);
			}			
			var set=function(){}
			
			body.css('margin-top','0');
			div.mousemove(function(evt){
				move(evt.clientY);
			});
		});
	}
}
infrajs.autoview=function(layer){
	if(!layer.autoview)return;
	Autoview.init(layer.div);
};