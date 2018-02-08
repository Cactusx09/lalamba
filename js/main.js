$(document).ready(function(){
	$('.header__hamb').click(function(e){
		e.stopPropagation();
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
	$('.menu, .popup_message, .header__login, .overlay,.playlist,.rating').click(function(e){
		e.stopPropagation();
	});

	$(window).click(function(){
		var hamb = $('.header__hamb'),
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
		playlist.removeClass('_active');
		wrap.css('transform','none');
		btns.css('transform','none');
		hamb.removeClass('_close');
		menu.removeClass('_active');
	});

	//inputs
	$('.g_input input, .g_input textarea').change(function(){
		if($(this).val()==''){
			$(this).next().removeClass('_active');
		}else{
			$(this).next().addClass('_active');
		}
	});

	//add track btn copy
	$('.popup_like__copy').click(function(e){
		e.preventDefault();
		var el = $(this);
		copyToClipboard(el);
		el.addClass('_copy');
		setTimeout(function(){
			el.removeClass('_copy');
		},1500);
	});
	function copyToClipboard(element) {
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val($(element).text()).select();
		document.execCommand("copy");
		$temp.remove();
	}

	//select
	$('.g_select__head').click(function(){
		var head = $(this),
			body = head.next('.g_select__body');
		head.toggleClass('_active');
		body.toggleClass('_active');
	});
	$('.g_select__body a').click(function(){
		var a = $(this),
			text = a.text(),
			body = a.closest('.g_select__body'),
			head = body.prev('.g_select__head'),
			input = head.prev('input');
		a.addClass('_current').siblings().removeClass('_current');
		body.removeClass('_active');
		head.removeClass('_active');
		input.val(text).parent('.g_select').removeClass('_error');
		head.find('span').text(text);
	});
	//popup tabs
	$('.popup_login__head_item').click(function(){
		var el = $(this),
			n = el.index(),
			wrap = el.closest('.popup').find('.popup_login__tab').eq(n);
		el.addClass('_current').siblings().removeClass('_current');
		wrap.addClass('_current').siblings().removeClass('_current');
		wrap.find('.popup__fields').scrollTop(0);
		//recalculate
		var name = 'login',
			popup = $('.popup_'+name),
			popup_h = popup.outerHeight(),
			popup_w = popup.outerWidth(),
			h = $(window).height(),
			px = h/2 - popup_h/2;
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
			px = h/2 - popup_h/2;
		popup.css({
			'top': px+'px',
			'margin-left': '-'+ popup_w/2 +'px'
		});
		$('.popup.popup_'+name+', .overlay').addClass('_visible');
	});

	//popups

    $('.popup').each(function(){
        var popup = $(this),
            popup_h = popup.outerHeight(),
            popup_w = popup.outerWidth(),
            h = $(window).height(),
            px = h/2 - popup_h/2;
        popup.css({
            'top': px+'px',
            'margin-left': '-'+ popup_w/2 +'px'
        });
	});
	$('._open_pop').click(function(e){
		e.preventDefault();
		var el = $(this),
			name = el.data('name'),
			popup = $('.popup_'+name),
			popup_h = popup.outerHeight(),
			popup_w = popup.outerWidth(),
			h = $(window).height(),
			px = h/2 - popup_h/2;
		popup.css({
			'top': px+'px',
			'margin-left': '-'+ popup_w/2 +'px'
		});
		if(name=="reset"){
			$('.popup_login').removeClass('_visible');
		}
		$('.popup.popup_'+name+', .overlay').addClass('_visible');
		if($(this).closest('.popup_reset').length){
			$('.popup_reset').removeClass('_visible');
			var tab = $(this).data('tab');
			if(tab=="register"){
				$('.popup_login__head_item').eq(1).trigger('click');
			}else{
				$('.popup_login__head_item').eq(0).trigger('click');
			}
			var name = 'login',
				popup = $('.popup_'+name),
				popup_h = popup.outerHeight(),
				popup_w = popup.outerWidth(),
				h = $(window).height(),
				px = h/2 - popup_h/2;
			popup.css({
				'top': px+'px',
				'margin-left': '-'+ popup_w/2 +'px'
			});
		}
		if(name=="ua"){
			$(this).closest('.popup').removeClass('_visible');
		}
		$('.popup.popup_'+name+' .popup__fields').scrollTop(0);
	});
	$('.overlay').click(function(e){
		e.preventDefault();
		$('.popup, .overlay').removeClass('_visible');
	});
	$('._close_pop, ._close_popup').click(function(e){
		e.preventDefault();
		$(this).closest('.popup').removeClass('_visible');
		if($('.popup._visible').length==0){
			$('.overlay').removeClass('_visible');
		}
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
		$('.popup_login .popup__fields').scrollTop(0);
		//recalculate
		var name = 'login',
			popup = $('.popup_'+name),
			popup_h = popup.outerHeight(),
			popup_w = popup.outerWidth(),
			h = $(window).height(),
			px = h/2 - popup_h/2;
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
				px = h/2 - popup_h/2;
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
	$("._validate").each(function () {
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
	///add track form
	var uploadForm = $('.popup_upload__form');
	(function(){
		var it = uploadForm;
		it.validate({
			rules: {
				name: {required: true},
				genre: {required: true},
				mood: {required: true},
				explicit: {required: false},
				language: {required: true},
				accepted: {required: true}
			},
			messages: {},
			errorPlacement: function (error, element) {},
			submitHandler: function (form) {
				$.ajax({
					type: "POST",
					url: "../mail.php",
					data: it.serialize()
				}).done(function () {

				});
				return false;
			},
			success: function () {},
			highlight: function (element, errorClass) {
				$(element).addClass('_error');
				if($(element).parent('.g_select').length){
					$(element).parent('.g_select').addClass('_error');
				}
			},
			unhighlight: function (element, errorClass, validClass) {
				$(element).removeClass('_error');
				if($(element).parent('.g_select').length){
					$(element).parent('.g_select').removeClass('_error');
				}
			}
		});
	})();
	uploadForm.dropzone({
		url: "/",
		maxFiles: 1,
		previewsContainer: uploadForm.find('.g_upload__info')[0],
		previewTemplate: '<div class="g_upload__item"><div class="g_upload__item_name" data-dz-name></div><small data-dz-size></small><span class="g_upload__item_progress" data-dz-uploadprogress></span><i data-dz-remove>&times;</i></div>',
		clickable: uploadForm.find('.g_upload')[0],
		acceptedFiles: '.mp3,.flac',
		init: function() {
			this.on("maxfilesexceeded", function(file) {
				this.removeAllFiles();
				this.addFile(file);
			});
			this.on("addedfile", function() {
				if (this.files[1]!=null){
					this.removeFile(this.files[0]);
				}
			});
			this.on('dragleave drop',function(){
				uploadForm.removeClass('_over');
			});
			this.on('dragover',function(){
				uploadForm.addClass('_over');
			});
		}
	});
	uploadForm.on('dragleave drop',function(){
		uploadForm.removeClass('_over');
	});
	uploadForm.on('dragover',function(){
		uploadForm.addClass('_over');
	});

	//change user info form
	///add track form
	var userForm = $('.popup_user__form');
	(function(){
		var it = userForm;
		it.validate({
			rules: {

			},
			messages: {},
			errorPlacement: function (error, element) {},
			submitHandler: function (form) {
				$.ajax({
					type: "POST",
					url: "../mail.php",
					data: it.serialize()
				}).done(function () {

				});
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
	})();
	userForm.dropzone({
		url: "/",
		maxFiles: 1,
		previewsContainer: userForm.find('.g_upload__info')[0],
		previewTemplate: '<div class="g_upload__item"><div class="g_upload__item_name" data-dz-name></div><small data-dz-size></small><span class="g_upload__item_progress" data-dz-uploadprogress></span><i data-dz-remove>&times;</i></div>',
		clickable: userForm.find('.g_upload')[0],
		acceptedFiles: '.jpg,.jpeg,.png',
		init: function() {
			this.on("maxfilesexceeded", function(file) {
				this.removeAllFiles();
				this.addFile(file);
			});
			this.on("addedfile", function(file) {
				if (this.files[1]!=null){
					this.removeFile(this.files[0]);
				}
			});
			this.on("removedfile", function(file) {
				userForm.find('.g_upload__zone_thumb').css({
					'background-image':'url("")'
				});
			});
			this.on('dragleave drop',function(){
				userForm.removeClass('_over');
			});
			this.on('dragover',function(){
				userForm.addClass('_over');
			});
		},
		thumbnail: function(file, dataUrl) {
			userForm.find('.g_upload__zone_thumb').css({
				'background-image':'url("'+dataUrl+'")'
			});
		}
	});
	userForm.on('dragleave drop',function(){
		userForm.removeClass('_over');
	});
	userForm.on('dragover',function(){
		userForm.addClass('_over');
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

	//next btn
	$('.s_btns__next').click(function(){
		$('.g_wrp__img._current').removeClass('_current')
			.next().addClass('_current');
		setTimeout(function(){
			//now you can refresh link for next track
		},1100);
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
		$('.playlist').toggleClass('_active');
		$('.rating').removeClass('_active');
		$('.playlist__table_wrp').perfectScrollbar();
	});
	//playlist sorting
	$('.playlist__table_my').tablesorter({
		cssHeader: 'table_header',
		headers: {
			9: {
				sorter: false
			}
		}
	});
	$('.playlist__table_item').tablesorter({
		cssHeader: 'table_header',
		headers: {
			8: {
				sorter: false
			}
		}
	});
	//playlist tabs
	$('.playlist__head a').click(function(){
		var el = $(this),
			n = el.index();
		el.addClass('_current').siblings().removeClass('_current');
		$('.playlist__table').eq(n).addClass('_current').siblings().removeClass('_current');
	});
	//playlist remove track
	$('.playlist__table .t_del').click(function(){
		var tr = $(this).closest('tr'),
			numbers = tr.closest('table').find('tbody .t_number'),
			tr_n = tr.index()-1;
		var n = 0;
		if($(this).get(0).tagName!="TH"){
			tr.fadeOut(300);
		}
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

	//popup message example
	var messageCounter = 0,
		popupError = '<div class ="popup_message__item _red"><i><img src="images/ico/red.svg" alt=""></i><h6>Please accept User Agreement to finish your upload</h6><div class="popup_message__item_close"><span>&times;</span></div></div>',
		popupDone = '<div class="popup_message__item _green"><i><img src="images/ico/green.svg" alt=""></i><h6>Your track was successfully uploaded</h6><div class="popup_message__item_close"><span>&times;</span></div></div>',
		popupInfo = '<div class="popup_message__item _blue"><i><img src="images/ico/blue.svg" alt=""></i><h6>We resend your new password on your mail</h6><div class="popup_message__item_close"><span>&times;</span></div></div>'
	var popup_messageTest = setInterval(function(){
		switch(messageCounter){
			case 0:
				$('.popup_message').append(popupError);
				setTimeout(function(){
					$('.popup_message__item').last().addClass('_visible');
				},700);
				break;
			case 1:
				$('.popup_message').append(popupDone);
				setTimeout(function(){
					$('.popup_message__item').last().addClass('_visible');
				},700);
				break;
			case 2:
				$('.popup_message').append(popupInfo);
				setTimeout(function(){
					$('.popup_message__item').last().addClass('_visible');
				},700);
				clearInterval(popup_messageTest);
				break;
		}
		messageCounter++;
	},2300);

	//popup message remove
	$('.popup_message').on('click','.popup_message__item_close',function(){
		$(this).closest('.popup_message__item').removeClass('_visible');
	});


	//mobile
	$('.playlist__btn').click(function(){
		$('.playlist').removeClass('_active');
	});

	$('.rating__filter').click(function(){
		$('.rating').toggleClass('_trans');
		$('.rating__table_wrp').perfectScrollbar('update');
	});
});

//mobile hover disable
function getMobileOperatingSystem() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;

	// Windows Phone must come first because its UA also contains "Android"
	if (/windows phone/i.test(userAgent)) {
		return "Windows Phone";
	}

	if (/android/i.test(userAgent)) {
		return "Android";
	}

	// iOS detection from: http://stackoverflow.com/a/9039885/177710
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		return "iOS";
	}

	return null;
}

if (getMobileOperatingSystem()) {
	try {
		for (var si in document.styleSheets) {
			var styleSheet = document.styleSheets[si];
			if (!styleSheet.rules) continue;

			for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
				if (!styleSheet.rules[ri].selectorText) continue;

				if (styleSheet.rules[ri].selectorText.match(':hover')) {
					styleSheet.deleteRule(ri);
				}
			}
		}
	} catch (ex) {}
}


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
