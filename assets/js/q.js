$(document).ready(function(){

//form *
$("fieldset > input").after('<span style="color: #ff0000; margin-right: 20px;">*</span>');
$("textarea").after('<span style="color: #ff0000; margin-left: 2px;">*</span>');

//about redirect
$(".about").click(function () {

	if(window.location.pathname == '/ru/') {
		window.location.assign("/ru/o-kompanii/");
	} else if(window.location.pathname == '/en/') {
		window.location.assign("/en/o-kompanii/");
	} else {
		window.location.assign("/o-kompanii/");
	}

});
//about redirect

//menu border fix
$("nav a").each(function () {

if($(this).attr('class')) { var hovnumber = $("nav a").index(this); }
var navli = 'nav li';
if(hovnumber == 0) {
	$(navli).find('a').eq(hovnumber+1).css({ 'border-left' : 'none', 'padding-left' : '17px' });
} else {
	$(navli).find('a').eq(hovnumber-1).css({ 'border-right' : 'none', 'padding-right' : '17px' });
	$(navli).find('a').eq(hovnumber+1).css({ 'border-left' : 'none', 'padding-left' : '17px' });
}
	$(navli).hover(function(){

	});

});
//menu border fix

//gallery wrap
$('.portfolio img').each(function () {
    $(this).wrap("<a class='fancybox-buttons' data-fancybox-group='button' href='" + this.src + "'></a>");
});
//gallery

//head slider
$('#nslider').html('<div class="navy prev-slide"></div><div class="navy next-slide"></div><div class="auto play"></div>');
$('<div class="navy prev-slide"></div><div class="navy next-slide"></div><div class="auto play"></div>').insertAfter($(".slider"));

$().ready(function(){
  $(".faq li").hover(function(){ $(this).children('h3').css({ 'border-bottom' : '1px dashed #000', 'color' : '#000' }); },
                   function(){
				if($("div:visible")) {
				
						$(this).children('h3').css({ 'border-bottom' : '1px dashed #2c9bf9', 'color' : '#2c9bf9' });
				   
					} else {
						$(this).children('h3').css({ 'border-bottom' : '1px dashed #2c9bf9', 'color' : '#000' });
					}
				   });
});

	$(".faq li div").hide();
	$(".faq li").click(function(){

if($(this).children('h3').next("div").is(":hidden")) {
		
if($("div:visible")) {
	
	$("div:visible").slideUp("slow");
	$(".faq li").removeClass("show");
}

		$(this).addClass("show");
		$(this).children('h3').next("div").slideDown("slow");

} else {

		$(this).removeClass("show");
		$(this).children('h3').next("div").slideUp("slow");
		
}

});
//head slider


//check url for googlemap
if($("aside form").length) {

$('legend').after('<div id="errormes">Поля заполнены некорректно</div>');

$('#submit').click(function(e) {

	var name = $("input[id='name']").val().length;
	var tel = $("input[id='tel']").val().length;
	var email = $("input[id='email']").val().length;
	var message = $("textarea[id='message']").val().length;

if(name < 2 || tel < 5 || email < 6 || message < 1) {

	e.preventDefault();
	if(name < 2) { $("input[id='name']").css({ 'border' : '1px solid #ff0000' })} else { $("input[id='name']").css({ 'border' : '1px solid #EFEFEF' }) }
	if(tel < 5) { $("input[id='tel']").css({ 'border' : '1px solid #ff0000' })} else { $("input[id='tel']").css({ 'border' : '1px solid #EFEFEF' }) }
	if(email < 6) { $("input[id='email']").css({ 'border' : '1px solid #ff0000' })} else { $("input[id='email']").css({ 'border' : '1px solid #EFEFEF' }) }
	if(message < 1) { $("textarea[id='message']").css({ 'border' : '1px solid #ff0000' })} else { $("textarea[id='message']").css({ 'border' : '1px solid #EFEFEF' }) }

	$("#errormes").fadeIn("fast");
	setTimeout(function(){
		$("#errormes").fadeOut("slow");
	}, 2000);

} else { }

});

//$("#vdturn").prop('disabled', true);

	$('<div class="googlemap"><iframe width="100%" height="665" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps/ms?msa=0&amp;msid=207853767617533525698.0004db31f662e51c6fd9e&amp;hl=ru&amp;ie=UTF8&amp;t=v&amp;ll=59.433022,24.811951&amp;spn=0.004686,0.018471&amp;output=embed"></iframe></div>').insertAfter($("body"));

}
//check url for googlemap


if($(".slider ul figure").length) {
$(".slider ul figure").addClass("slide-item");

/*
  SlidesJS 3.0.3 http://slidesjs.com
  (c) 2013 by Nathan Searles http://nathansearles.com
  Updated: March 15th, 2013
  Apache License: http://www.apache.org/licenses/LICENSE-2.0
*/
(function(){(function(a,b,c){var d,e,f;return f="slidesjs",e={width:940,height:528,start:1,navigation:{active:!0,effect:"slide"},pagination:{active:!0,effect:"slide"},play:{active:!1,effect:"slide",interval:5e3,auto:!1,swap:!0,pauseOnHover:!1,restartDelay:2500},effect:{slide:{speed:500},fade:{speed:300,crossfade:!0}},callback:{loaded:function(){},start:function(){},complete:function(){}}},d=function(){function b(b,c){this.element=b,this.options=a.extend(!0,{},e,c),this._defaults=e,this._name=f,this.init()}return b}(),d.prototype.init=function(){var c,d,e,f,g,h,i=this;return c=a(this.element),this.data=a.data(this),a.data(this,"animating",!1),a.data(this,"total",c.children().not(".slidesjs-navigation",c).length),a.data(this,"current",this.options.start-1),a.data(this,"vendorPrefix",this._getVendorPrefix()),"undefined"!=typeof TouchEvent&&(a.data(this,"touch",!0),this.options.effect.slide.speed=this.options.effect.slide.speed/2),c.css({overflow:"hidden"}),c.slidesContainer=c.children().not(".slidesjs-navigation",c).wrapAll("<div class='slidesjs-container'>",c).parent().css({overflow:"hidden",position:"relative"}),a(".slidesjs-container",c).wrapInner("<div class='slidesjs-control'>",c).children(),a(".slidesjs-control",c).css({position:"relative",left:0}),a(".slidesjs-control",c).children().addClass("slidesjs-slide").css({position:"absolute",top:0,left:0,width:"100%",zIndex:0,display:"none",webkitBackfaceVisibility:"hidden"}),a.each(a(".slidesjs-control",c).children(),function(b){var c;return c=a(this),c.attr("slidesjs-index",b)}),this.data.touch&&(a(".slidesjs-control",c).on("touchstart",function(a){return i._touchstart(a)}),a(".slidesjs-control",c).on("touchmove",function(a){return i._touchmove(a)}),a(".slidesjs-control",c).on("touchend",function(a){return i._touchend(a)})),c.fadeIn(0),this.update(),this.data.touch&&this._setuptouch(),a(".slidesjs-control",c).children(":eq("+this.data.current+")").eq(0).fadeIn(0,function(){return a(this).css({zIndex:10})}),this.options.navigation.active&&(g=a("<a>",{"class":"slidesjs-previous slidesjs-navigation",href:"#",title:"Previous",text:"Previous"}).appendTo(c),d=a("<a>",{"class":"slidesjs-next slidesjs-navigation",href:"#",title:"Next",text:"Next"}).appendTo(c)),a(".slidesjs-next",c).click(function(a){return a.preventDefault(),i.stop(!0),i.next(i.options.navigation.effect)}),a(".slidesjs-previous",c).click(function(a){return a.preventDefault(),i.stop(!0),i.previous(i.options.navigation.effect)}),this.options.play.active&&(f=a("<a>",{"class":"slidesjs-play slidesjs-navigation",href:"#",title:"Play",text:"Play"}).appendTo(c),h=a("<a>",{"class":"slidesjs-stop slidesjs-navigation",href:"#",title:"Stop",text:"Stop"}).appendTo(c),f.click(function(a){return a.preventDefault(),i.play(!0)}),h.click(function(a){return a.preventDefault(),i.stop(!0)}),this.options.play.swap&&h.css({display:"none"})),this.options.pagination.active&&(e=a("<ul>",{"class":"slidesjs-pagination"}).appendTo(c),a.each(Array(this.data.total),function(b){var c,d;return c=a("<li>",{"class":"slidesjs-pagination-item"}).appendTo(e),d=a("<a>",{href:"#","data-slidesjs-item":b,html:b+1}).appendTo(c),d.click(function(b){return b.preventDefault(),i.stop(!0),i.goto(1*a(b.currentTarget).attr("data-slidesjs-item")+1)})})),a(b).bind("resize",function(){return i.update()}),this._setActive(),this.options.play.auto&&this.play(),this.options.callback.loaded(this.options.start)},d.prototype._setActive=function(b){var c,d;return c=a(this.element),this.data=a.data(this),d=b>-1?b:this.data.current,a(".active",c).removeClass("active"),a("li:eq("+d+") a",c).addClass("active")},d.prototype.update=function(){var b,c,d;return b=a(this.element),this.data=a.data(this),a(".slidesjs-control",b).children(":not(:eq("+this.data.current+"))").css({display:"none",left:0,zIndex:0}),d=b.width(),c=this.options.height/this.options.width*d,this.options.width=d,this.options.height=c,a(".slidesjs-control, .slidesjs-container",b).css({width:d,height:c})},d.prototype.next=function(b){var c;return c=a(this.element),this.data=a.data(this),a.data(this,"direction","next"),void 0===b&&(b=this.options.navigation.effect),"fade"===b?this._fade():this._slide()},d.prototype.previous=function(b){var c;return c=a(this.element),this.data=a.data(this),a.data(this,"direction","previous"),void 0===b&&(b=this.options.navigation.effect),"fade"===b?this._fade():this._slide()},d.prototype.goto=function(b){var c,d;if(c=a(this.element),this.data=a.data(this),void 0===d&&(d=this.options.pagination.effect),b>this.data.total?b=this.data.total:1>b&&(b=1),"number"==typeof b)return"fade"===d?this._fade(b):this._slide(b);if("string"==typeof b){if("first"===b)return"fade"===d?this._fade(0):this._slide(0);if("last"===b)return"fade"===d?this._fade(this.data.total):this._slide(this.data.total)}},d.prototype._setuptouch=function(){var b,c,d,e;return b=a(this.element),this.data=a.data(this),e=a(".slidesjs-control",b),c=this.data.current+1,d=this.data.current-1,0>d&&(d=this.data.total-1),c>this.data.total-1&&(c=0),e.children(":eq("+c+")").css({display:"block",left:this.options.width}),e.children(":eq("+d+")").css({display:"block",left:-this.options.width})},d.prototype._touchstart=function(b){var c,d;return c=a(this.element),this.data=a.data(this),d=b.originalEvent.touches[0],this._setuptouch(),a.data(this,"touchtimer",Number(new Date)),a.data(this,"touchstartx",d.pageX),a.data(this,"touchstarty",d.pageY),b.stopPropagation()},d.prototype._touchend=function(b){var c,d,e,f,g,h,i,j=this;return c=a(this.element),this.data=a.data(this),h=b.originalEvent.touches[0],f=a(".slidesjs-control",c),f.position().left>.5*this.options.width||f.position().left>.1*this.options.width&&250>Number(new Date)-this.data.touchtimer?(a.data(this,"direction","previous"),this._slide()):f.position().left<-(.5*this.options.width)||f.position().left<-(.1*this.options.width)&&250>Number(new Date)-this.data.touchtimer?(a.data(this,"direction","next"),this._slide()):(e=this.data.vendorPrefix,i=e+"Transform",d=e+"TransitionDuration",g=e+"TransitionTimingFunction",f[0].style[i]="translateX(0px)",f[0].style[d]=.85*this.options.effect.slide.speed+"ms"),f.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(){return e=j.data.vendorPrefix,i=e+"Transform",d=e+"TransitionDuration",g=e+"TransitionTimingFunction",f[0].style[i]="",f[0].style[d]="",f[0].style[g]=""}),b.stopPropagation()},d.prototype._touchmove=function(b){var c,d,e,f,g;return c=a(this.element),this.data=a.data(this),f=b.originalEvent.touches[0],d=this.data.vendorPrefix,e=a(".slidesjs-control",c),g=d+"Transform",a.data(this,"scrolling",Math.abs(f.pageX-this.data.touchstartx)<Math.abs(f.pageY-this.data.touchstarty)),this.data.animating||this.data.scrolling||(b.preventDefault(),this._setuptouch(),e[0].style[g]="translateX("+(f.pageX-this.data.touchstartx)+"px)"),b.stopPropagation()},d.prototype.play=function(b){var c,d,e,f=this;return c=a(this.element),this.data=a.data(this),!this.data.playInterval&&(b&&(d=this.data.current,this.data.direction="next","fade"===this.options.play.effect?this._fade():this._slide()),a.data(this,"playInterval",setInterval(function(){return d=f.data.current,f.data.direction="next","fade"===f.options.play.effect?f._fade():f._slide()},this.options.play.interval)),e=a(".slidesjs-container",c),this.options.play.pauseOnHover&&(e.unbind(),e.bind("mouseenter",function(){return f.stop()}),e.bind("mouseleave",function(){return f.options.play.restartDelay?a.data(f,"restartDelay",setTimeout(function(){return f.play(!0)},f.options.play.restartDelay)):f.play()})),a.data(this,"playing",!0),a(".slidesjs-play",c).addClass("slidesjs-playing"),this.options.play.swap)?(a(".slidesjs-play",c).hide(),a(".slidesjs-stop",c).show()):void 0},d.prototype.stop=function(b){var c;return c=a(this.element),this.data=a.data(this),clearInterval(this.data.playInterval),this.options.play.pauseOnHover&&b&&a(".slidesjs-container",c).unbind(),a.data(this,"playInterval",null),a.data(this,"playing",!1),a(".slidesjs-play",c).removeClass("slidesjs-playing"),this.options.play.swap?(a(".slidesjs-stop",c).hide(),a(".slidesjs-play",c).show()):void 0},d.prototype._slide=function(b){var c,d,e,f,g,h,i,j,k,l,m=this;return c=a(this.element),this.data=a.data(this),this.data.animating||b===this.data.current+1?void 0:(a.data(this,"animating",!0),d=this.data.current,b>-1?(b-=1,l=b>d?1:-1,e=b>d?-this.options.width:this.options.width,g=b):(l="next"===this.data.direction?1:-1,e="next"===this.data.direction?-this.options.width:this.options.width,g=d+l),-1===g&&(g=this.data.total-1),g===this.data.total&&(g=0),this._setActive(g),i=a(".slidesjs-control",c),b>-1&&i.children(":not(:eq("+d+"))").css({display:"none",left:0,zIndex:0}),i.children(":eq("+g+")").css({display:"block",left:l*this.options.width,zIndex:10}),this.options.callback.start(d+1),this.data.vendorPrefix?(h=this.data.vendorPrefix,k=h+"Transform",f=h+"TransitionDuration",j=h+"TransitionTimingFunction",i[0].style[k]="translateX("+e+"px)",i[0].style[f]=this.options.effect.slide.speed+"ms",i.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(){return i[0].style[k]="",i[0].style[f]="",i.children(":eq("+g+")").css({left:0}),i.children(":eq("+d+")").css({display:"none",left:0,zIndex:0}),a.data(m,"current",g),a.data(m,"animating",!1),i.unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd"),i.children(":not(:eq("+g+"))").css({display:"none",left:0,zIndex:0}),m.data.touch&&m._setuptouch(),m.options.callback.complete(g+1)})):i.stop().animate({left:e},this.options.effect.slide.speed,function(){return i.css({left:0}),i.children(":eq("+g+")").css({left:0}),i.children(":eq("+d+")").css({display:"none",left:0,zIndex:0},a.data(m,"current",g),a.data(m,"animating",!1),m.options.callback.complete(g+1))}))},d.prototype._fade=function(b){var c,d,e,f,g,h=this;return c=a(this.element),this.data=a.data(this),this.data.animating||b===this.data.current+1?void 0:(a.data(this,"animating",!0),d=this.data.current,b?(b-=1,g=b>d?1:-1,e=b):(g="next"===this.data.direction?1:-1,e=d+g),-1===e&&(e=this.data.total-1),e===this.data.total&&(e=0),this._setActive(e),f=a(".slidesjs-control",c),f.children(":eq("+e+")").css({display:"none",left:0,zIndex:10}),this.options.callback.start(d+1),this.options.effect.fade.crossfade?(f.children(":eq("+this.data.current+")").stop().fadeOut(this.options.effect.fade.speed),f.children(":eq("+e+")").stop().fadeIn(this.options.effect.fade.speed,function(){return f.children(":eq("+e+")").css({zIndex:0}),a.data(h,"animating",!1),a.data(h,"current",e),h.options.callback.complete(e+1)})):f.children(":eq("+d+")").stop().fadeOut(this.options.effect.fade.speed,function(){return f.children(":eq("+e+")").stop().fadeIn(h.options.effect.fade.speed,function(){return f.children(":eq("+e+")").css({zIndex:10})}),a.data(h,"animating",!1),a.data(h,"current",e),h.options.callback.complete(e+1)}))},d.prototype._getVendorPrefix=function(){var a,b,d,e,f;for(a=c.body||c.documentElement,d=a.style,e="transition",f=["Moz","Webkit","Khtml","O","ms"],e=e.charAt(0).toUpperCase()+e.substr(1),b=0;f.length>b;){if("string"==typeof d[f[b]+e])return f[b];b++}return!1},a.fn[f]=function(b){return this.each(function(){return a.data(this,"plugin_"+f)?void 0:a.data(this,"plugin_"+f,new d(this,b))})}})(jQuery,window,document)}).call(this);


    $(function() {
      $('body > ul').slidesjs({
        width: 1,
        height: 1,
        play: {
          active: true,
          auto: true,
          interval: 4000,
          swap: true
        }
      });
    });
 

	function htmSlider(){
		/* Зададим следующие переменные */

		/* обертка слайдера */
		var slideWrap = $('.slider ul');
		/* ссылки на предудыщий иследующий слайд */
		var nextLink = $('.next-slide');
		var prevLink = $('.prev-slide');

		var playLink = $('.auto');
		
		var is_animate = false;
		
		/* ширина слайда с отступами */
		var slideWidth = $('.slide-item').outerWidth();
		
		/* смещение слайдера */
		var newLeftPos = slideWrap.position().left - slideWidth;
		
		/* Клик по ссылке на следующий слайд */
		nextLink.click(function(){
			if(!slideWrap.is(':animated')) {
	
				slideWrap.animate({left: newLeftPos}, 800, function(){
					slideWrap
						.find('.slide-item:first')
						.appendTo(slideWrap)
						.parent()
						.css({'left': 0});
				});

			}
		});

		/* Клик по ссылке на предыдующий слайд */
		prevLink.click(function(){
			if(!slideWrap.is(':animated')) {
			
				slideWrap
					.css({'left': newLeftPos})
					.find('.slide-item:last')
					.prependTo(slideWrap)
					.parent()
					.animate({left: 0}, 800);

			}
		});
		
		
		/* Функция автоматической прокрутки слайдера */
		function autoplay(){
			if(!is_animate){
				is_animate = true;
				slideWrap.animate({left: newLeftPos}, 800, function(){
					slideWrap
						.find('.slide-item:first')
						.appendTo(slideWrap)
						.parent()
						.css({'left': 0});
					is_animate = false;
				});
			}
		}
		
		/* Клики по ссылкам старт/пауза */
		playLink.click(function(){
			if(playLink.hasClass('play')){
				timer = setInterval(autoplay, 2000);
			} else {
				clearInterval(timer);
			}
		});

	}

	/* иницилизируем функцию слайдера */
	htmSlider();
}

});