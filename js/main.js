$(document).ready(function(){
	$('.header__hamb').click(function(){
		var hamb = $(this),
			wrap = $('.main_wrp'),
			menu = $('.menu'),
			width = menu.outerWidth(),
			a = $('.menu__tabs').offset().top,
			b = $('.menu__bot').offset().top,
			distance = Math.abs(a - b)-30;
		$('.menu__filter').css('max-height',distance+'px');
		$('._scroll').perfectScrollbar('update');
		if(!hamb.hasClass('_close')){
			wrap.css('transform','translateX('+width+'px)');
		}else{
			wrap.css('transform','none');
		}
		hamb.toggleClass('_close');
		menu.toggleClass('_active');
	});
	//inputs
	$('.g_input input').change(function(){
		if($(this).val()==''){
			$(this).next().removeClass('_active');
		}else{
			$(this).next().addClass('_active');
		}
	});
	//popup tabs
	$('.popup_login__head_item').click(function(){
		var el = $(this),
			n = el.index(),
			wrap = el.closest('.popup').find('.popup_login__tab').eq(n);
		el.addClass('_current').siblings().removeClass('_current');
		wrap.addClass('_current').siblings().removeClass('_current');
		//recalculate
		var name = 'login',
			popup = $('.popup_'+name),
			popup_h = popup.outerHeight(),
			popup_w = popup.outerWidth(),
			h = $(window).height(),
			px = window.pageYOffset + h/2 - popup_h/2;
		popup.css({
			'top': px+'px',
			'margin-left': '-'+ popup_w/2 +'px'
		});
		$('.popup.popup_'+name+', .overlay').addClass('_visible');
	});

	//popups
	$('._open_pop').click(function(e){
		e.preventDefault();
		var name = $(this).data('name'),
			popup = $('.popup_'+name),
			popup_h = popup.outerHeight(),
			popup_w = popup.outerWidth(),
			h = $(window).height(),
			px = window.pageYOffset + h/2 - popup_h/2;
		popup.css({
			'top': px+'px',
			'margin-left': '-'+ popup_w/2 +'px'
		});
		$('.popup.popup_'+name+', .overlay').addClass('_visible');
	});
	$('.overlay, ._close_pop').click(function(e){
		e.preventDefault();
		$('.popup, .overlay').removeClass('_visible');
	});

	//report textarea
	$('.popup_report__options .g_radio').change(function(){
		if($(this).val() == 'other'){
			$(this).nextAll('._textarea').addClass('_visible');
		}else{
			$(this).nextAll('._textarea').removeClass('_visible');
		}
	});

	//range slider
	if($('*').is('.footer__volume_range')){
		$('input[type="range"]').each(function(){
			var el = $(this);
			el.rangeslider({
				polyfill: false,
				onSlide: function(position, value) {
					el.closest('.footer__volume_range')
						.find('.footer__volume_out').val(parseInt(value));
				}
			});
		});
	}
	//custom scroll
	$('._scroll').perfectScrollbar();
	//menu tabs
	$('.menu__tabs span').click(function(){
		var el = $(this),
			n = el.index();
		el.addClass('_current').siblings().removeClass('_current');
		el.closest('.menu').find('.menu__filter').removeClass('_current').eq(n).addClass('_current');
		$('._scroll').perfectScrollbar('update');
	});

	//validate
	$("form").each(function () {
		var it = $(this);
		it.validate({
			rules: {
				name: {required: true},
				password: {required: true},
				mail: {required: true},
				repeat: {required: true}
			},
			messages: {},
			errorPlacement: function (error, element) {},
			submitHandler: function (form) {
//				$.ajax({
//					type: "POST",
//					url: "../mail.php",
//					data: it.serialize()
//				}).done(function () {
//
//				});
				return false;
			},
			success: function () {},
			highlight: function (element, errorClass) {
				$(element).addClass('_error');
			},
			unhighlight: function (element, errorClass, validClass) {
				$(element).removeClass('_error');
			}
		});
	});

	//footer volume
	var wrap = $('.footer__volume'),
		range = wrap.find('input[type="range"]'),
		onfooter = false;
	$('.footer__event_helper').hover(function(){
		$('.footer__volume,.footer__social').addClass('_active');
	},function(){
		if(!onfooter){
			$('.footer__volume,.footer__social').removeClass('_active');
		}
	});
	$('.footer').hover(function(){
		onfooter = true;
	},function(){
		onfooter = false;
		$('.footer__volume,.footer__social').removeClass('_active');
	});
	$('.footer').bind('mousewheel DOMMouseScroll',function(e){
		if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
			var i = parseInt(range.val())+10;
			range.val(parseInt(i)).change();
			console.log(i);
		}
		else{
			var n = range.val()-10;
			range.val(parseInt(n)).change();
		}
	});
	//resize
	$(window).resize(function () {
		$('.menu__filter').css('max-height','0');
		var a = $('.menu__tabs').offset().top,
			b = $('.menu__bot').offset().top,
			distance = Math.abs(a - b)-30;
		$('.menu__filter').css('max-height',distance+'px');
		$('._scroll').perfectScrollbar('update');
	});

	//file input
	if($('input[type=file]').length){
		var text = $("input[type=file]").attr('data-text');
		$("input[type=file]").nicefileinput({
			label : 'Upload my track'
		});
		$(".NFI-filename").val(text);
		$("input[type=file]").on('change',function(){
			$(".NFI-button").addClass('hide-for-pre');
			$(".NFI-filename").addClass('_active');
			$('#close-input').show();
			if($(".NFI-filename").val()==""){
				$(".NFI-filename").val(text).removeClass('_active');
				$(".NFI-button").removeClass('hide-for-pre');
				$('#close-input').hide();
			}
			setTimeout(function(){
				$('#close-input').addClass('big');
			},1000);
		});
		$('.NFI-wrapper').append('<div id="close-input"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M18 1.4L16.6 0 9 7.6 1.4 0 0 1.4 7.6 9 0 16.6 1.4 18 9 10.4 16.6 18 18 16.6 10.4 9 18 1.4Z" fill="rgb(204, 204, 204)"/></svg></div>');
		$('#close-input').click(function(){
			$(this).hide();
			$(".NFI-filename").val(text).removeClass('_active');
			$('.NFI-current').trigger("click");
			$(".NFI-button").removeClass('hide-for-pre');
		});
		$('.NFI-button').wrapInner('<span></span>');
	}
});
//var path = document.getElementsByClassName('.g_wrp').getAttribute("style");
//
//var img = new Image();                            // load an image
//img.crossOrigin = "";                             // we need CORS here...
//img.onload = function() {                         // when image has loaded:
//  var div = document.querySelector("div");
//  div.appendChild(this);                          // add image to DOM (demo)
//  div.style.background = analyse(img, 5);         // bg color = result from analyse
//}
//img.src = "http://i.imgur.com/rUeQDjE.png";       // some image (CORS enabled)
//
//function analyse(img, border) {
//  var canvas = document.createElement("canvas"),  // create a canvas element
//      ctx = canvas.getContext("2d"),              // get context
//      w = img.naturalWidth,                       // get actual width..
//      h = img.naturalHeight;
//
//  canvas.width = w;                               // set canvas size
//  canvas.height = h;
//
//  ctx.drawImage(img, 0, 0);                       // draw in image
//
//  // do checks:, for example:
//  //if (border*2 > canvas.width || border*2 > canvas.height) throw "Image too small!";
//
//  // get borders, avoid overlaps (though it does not really matter in this case):
//  var top = ctx.getImageData(0, 0, w, border).data;
//  var left = ctx.getImageData(0, border, border, h - border*2).data;
//  var right = ctx.getImageData(w - border, border, border, h - border*2).data;
//  var bottom = ctx.getImageData(0, h - border, w, border).data;
//
//  var r = 0, g = 0, b = 0, cnt = 0;
//
//  // count pixels and add up color components: (see function below)
//  countBuffer(top);
//  countBuffer(left);
//  countBuffer(right);
//  countBuffer(bottom);
//
//  // calc average
//  r = (r / cnt + 0.5)|0;
//  g = (g / cnt + 0.5)|0;
//  b = (b / cnt + 0.5)|0;
//
//  return "rgb(" + r + "," + g + "," + b + ")";
//
//  function countBuffer(data) {
//    var i = 0, len = data.length;
//    while(i < len) {
//        r += data[i++];   // add red component etc.
//        g += data[i++];
//        b += data[i++];
//        i++;
//        cnt++;            // count one pixel
//    }
//  }
//
//}
