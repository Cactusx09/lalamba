$(document).ready(function(){
	$('.header__hamb').click(function(){
		var hamb = $(this),
			wrap = $('.main_wrp'),
			btns = $('.s_btns'),
			menu = $('.menu'),
			playlist = $('.playlist'),
			width = menu.outerWidth(),
			a = $('.menu__tabs').offset().top,
			b = $('.menu__bot').offset().top,
			distance = Math.abs(a - b)-30;
		$('.menu__filter').css('max-height',distance+'px');
		$('._scroll').perfectScrollbar('update');
		if(!hamb.hasClass('_close')){
			wrap.css('transform','translateX('+width+'px)');
			btns.css('transform','translateX(-'+width+'px)');
		}else{
			playlist.removeClass('_active');
			wrap.css('transform','none');
			btns.css('transform','none');
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
	//popup tabs
	$('.popup_user__head_item').click(function(){
		var el = $(this),
			n = el.index(),
			wrap = el.closest('.popup').find('.popup_user__tab').eq(n);
		el.addClass('_current').siblings().removeClass('_current');
		wrap.addClass('_current').siblings().removeClass('_current');
		//recalculate
		var name = 'user',
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

	//popup login artist/listener fields change
	$('.popup_login__options .g_radio').change(function(){
		var el = $(this),
			fields = el.closest('.popup_login__tab').find('.popup_login__options_artist');
		if(el.val() == 'artist'){
			fields.addClass('_visible');
		}else{
			fields.removeClass('_visible');
		}
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

	//datepicker
	if($('input[name="birthday"]').length){
		$('input[name="birthday"]').dateDropper();
	}

	//report textarea
	var flag = false;
	$('.popup_report__options .g_radio').change(function(){
		var el = $(this),
			textarea = el.nextAll('._textarea');
		if(el.val() == 'other' && !flag){
			textarea.addClass('_visible');
			flag = true;
			//recalculate
			var name = 'report',
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
		}else if(el.val() == 'other' && flag){
			textarea.removeClass('_visible');
			flag = false;
		}

	});


	//table numbers

	$('tbody').each(function(){
		var n = 0;
		$(this).find('.t_number').each(function(){
			var el = $(this);
			n++;
			el.html('<span>'+n+'.</span><i class="play-button paused"><span class="left"></span><span class="right"></span><span class="triangle-1"></span><span class="triangle-2"></span></i>');
		});
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

		$("input[type=file]").each(function(){
			var el = $(this),
				text = el.data('text');
			el.nicefileinput({
				label : text
			});
		});
	}

	//play/pause animation
	$(".play_event").click(function() {
		$(this).toggleClass("paused").find('.play-button').toggleClass("paused");
		$('.s_text__info_ico').toggleClass('paused');
	});
	$(".t_number").click(function() {
		var el = $(this),
			tr = el.closest('tr');
		el.find('.play-button').toggleClass("paused");
		tr.siblings().find('.play-button').addClass('paused');
		tr.toggleClass('_active').siblings().removeClass('_active');
	});

	//rating open
	$('.s_text__info_num').click(function(){
		$('.rating').addClass('_active');
		$('.rating__table_wrp').perfectScrollbar();
	});
	//rating sorting
	$('.rating__table').tablesorter({
		cssHeader: 'table_header'
	});
	//rating tabs
	$('.rating__head a').click(function(){
		$(this).addClass('_current').siblings().removeClass('_current');
	});
	//rating close
	$('.rating__close').click(function(){
		$('.rating').removeClass('_active');
	});

	//playlist open
	$('.menu__panel_playlist').click(function(){
		$('.playlist').addClass('_active');
		$('.rating').removeClass('_active');
		$('.playlist__table_wrp').perfectScrollbar();
	});
	//playlist sorting
	$('.playlist__table').tablesorter({
		cssHeader: 'table_header'
	});
	//playlist tabs
	$('.playlist__head a').click(function(){
		$(this).addClass('_current').siblings().removeClass('_current');
	});
	//playlist remove track
	$('.playlist__table .t_del').click(function(){
		var tr = $(this).closest('tr'),
			numbers = tr.closest('table').find('tbody .t_number'),
			tr_n = tr.index()-1;
		var n = 0;
		tr.fadeOut(300);
		//script for table numeration update (craching when table already sort)


//		setTimeout(function(){
//			tr.remove();
//			numbers.each(function(){
//				var el = $(this),
//					tr_index = $(this).closest('tr').index();
//				n++;
//				if(tr_index>tr_n){
//					el.text(n-1+'.');
//				}else{
//					el.text(n+'.');
//				}
//			});
//		},300);
	});

	//pop_message
//	setTimeout(function(){
//		$('.popup_message[data-name="alert3"]').addClass('_visible');
//	},2000);

	//mobile
	$('.playlist__btn').click(function(){
		$('.playlist').removeClass('_active');
	});

	$('.rating__filter').click(function(){
		$('.rating').toggleClass('_trans');
		$('.rating__table_wrp').perfectScrollbar('update');
	});
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
