//This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var isMobileDev = /Android|webOS|iPad|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var isios = /iPad|iPhone|iPod/i.test(navigator.userAgent);
var isSmartPhone = MobileEsp.isMobilePhone || MobileEsp.isIphone || MobileEsp.isAndroidPhone;
var isTablet = MobileEsp.isTierTablet;
var themeBasepath="/wp-content/themes/moncler2014/";
var ieversion=-1;
if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
	ieversion=new Number(RegExp.$1);
}
//DEV ONLY
//isMobileDev = true;
//isTablet=true;
//isSmartPhone=true;
// JavaScript Document

function isValidEmailAddress(emailAddress) {
	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	return pattern.test(emailAddress);
}

var videoPlayer = {
    is_mobile: false,
    is_apple: null,
    is_android: null,
    videoContainer: null,
    videoPlaceholder: null,
    videoCoverImageUrl: null,
    videoFeatShadow: '',
    videoPushUrl: null,
    videoH: null,
    videoUrl: "",
    videoSubBlocks: null,
    videoPlaying: false,

    init: function () {

        var $this = this;
        $this.videoContainer = jQuery('#video-hero-player');
        $this.videoPlaceholder = jQuery('#video-placeholder');
        $this.videoContainer.removeClass('visible');
        $this.videoSubBlocks = jQuery('.sub-block.sub-block-video');

        $this.is_android = MobileEsp.DetectAndroid();
        $this.is_apple = MobileEsp.DetectIphone() || MobileEsp.DetectTierTablet();
        $this.is_mobile = $this.is_android || $this.is_apple;

        if ($this.is_apple) {
            var $cover = $this.videoPlaceholder.find('.video-cover-content');
            var vidUrl = $cover.attr('data-videoUrl');
            if (vidUrl != '') {
                $this.setVideoUrl(vidUrl);
                $this.videoPushUrl = $cover.attr('data-pushUrl');
                $this.videoPushTitle = $cover.attr('data-pushTitle');
            }
            $this.videoCoverImageUrl = $this.videoPlaceholder.find('img.desktop-video-cover').attr('src');
            $this.videoFeatShadow = '<div id="mobile-ft-shadow" class="feat-shadow">' + $this.videoPlaceholder.find('.feat-shadow').html() + '</div>';
            $this.embedAppleVideoCont();

        } else {

            FlashEventsWatcher = (function () {

                FlashEventsWatcher.prototype.pop = null;

                FlashEventsWatcher.prototype.title = null;

                function FlashEventsWatcher() {
                    _.extend(this, Backbone.Events);
                    this.title = "Dolce&Gabanna";
                }

                FlashEventsWatcher.prototype.flashVideoEnd = function () {
                    $this.videoContainer.fadeOut(400).promise().done(function () {
                        $this.videoPlaying = false;
                        $this.videoContainer.css('height', '0px');
                        $this.videoContainer.html('');
                        $this.videoContainer.show();
                        $this.videoPlaceholder.fadeIn(400);
                    });

                    return this.trigger("EVENT_FLASH_FILM_ENDED");
                };

                return FlashEventsWatcher;

            })();
            window.dgw = {
                flashWatcher: null
            };
            dgw.flashWatcher = new FlashEventsWatcher();

            //add listener
            $this.videoPlaceholder.click(function () {

                var $cover = $this.videoPlaceholder.find('.video-cover-content');
                var vidUrl = $cover.attr('data-videoUrl');
                if (vidUrl != '') {
                    $this.setVideoUrl(vidUrl);
                    $this.videoH = $this.videoPlaceholder.find('.video-cover-content img.desktop-video-cover').height();
                    $this.videoPushUrl = $cover.attr('data-pushUrl');
                    $this.videoPushTitle = $cover.attr('data-pushTitle');
                    $this.embedTheVideo();
                }
            });
        }
    },
    embedAppleVideoCont: function () {
        var $this = this;
        $this.videoPlaying = true;
        var htmlcode = "";

        htmlcode += '<video id="myVideo" type="video/mp4" preload="auto" style="width:100%; height:100%;" src="' + $this.videoUrl + '" controls="controls" poster="' + $this.videoCoverImageUrl + '" autobuffer></video>';
        htmlcode += $this.videoFeatShadow;
        $this.videoPlaceholder.html(htmlcode);

        var $video = jQuery('#myVideo');
        $video.on('play', function () { //alert('play!');
            jQuery('#mobile-ft-shadow').fadeOut();
        });
        $video.on('ended', function () {
            jQuery('#mobile-ft-shadow').fadeIn();
        });

        $this.resetVideoH();
        $this.videoPlaceholder.addClass('visible');

        jQuery(window).resize(function (e) {
            $this.resetVideoH();
        });

    },
    embedTheVideo: function () {
        var $this = this;
        //the_main_template_dir

        if ($this.videoUrl != '') {
            var htmlcode = "";
            if ($this.is_android) {
                //android must redirect away!!
                window.open($this.videoUrl);
            } else {

                $this.videoPlaceholder.slideUp(500);
                $this.videoPlaying = true;
                htmlcode += '<object type="application/x-shockwave-flash" id="myVideo" name="myVideo" data="' + the_main_template_dir + 'swf/player.swf" width="100%" height="100%"> <param name="movie" value="' + the_main_template_dir + 'swf/player.swf"> <param name="name" value="myVideo"> <param name="quality" value="high"><param name="autostart" value="1"><param name="bgcolor" value="#000000"> <param name="scale" value="noscale"> <param name="wmode" value="opaque"> <param name="allowFullScreen" value="true"> <param name="allowscriptaccess" value="always"> <param name="flashvars" value="video=' + $this.videoUrl + '&amp;jsNameSpace=dgVideoPlayerWatcher&amp;hasShare=false&amp;autostart=1&amp;width=1280&amp;height=720&amp;controlsOffsetY=-10"></object>';
                $this.videoContainer.html(htmlcode);
                $this.videoContainer.css('height', $this.videoH);
                $this.videoContainer.addClass('visible');
                pushUrl($this.videoPushUrl, $this.videoPushTitle);
                jQuery(window).resize(function (e) {
                    $this.resetVideoH();
                });

            }

        }
    },

    setVideoUrl: function (url) {
        var $this = this;
        $this.videoUrl = url;
    },

    resetVideoH: function () {
        var $this = this;
        //$this.videoH = $this.videoContainer.width() * (627 / 1280);
        $this.videoH = $this.videoContainer.width() * (658 / 1170);
        if ($this.videoPlaying) {
            if ($this.is_apple) {
                $this.videoPlaceholder.css('height', $this.videoH);
            } else {
                $this.videoContainer.css('height', $this.videoH);
            }

        }

    }

}


var block_videoplayer = {
    player: null,
    element: null,
    videoID: null,
    pushUrl: '',
    pushTitle: '',
    playerReady: false,
    YT_player: null,
    videoPlaying: false,
    videoH: null,
    firstPush: true,
    autoplay: false,
    push_the_url: true,

    init: function (autoplay, push_the_url) {
        var $this = this;
        //console.log('block_videoplayer.init');
        $this.autoplay = autoplay;
        $this.push_the_url = push_the_url;
        $this.playerwrapper = jQuery('#videoplayer-wrapper');
        $this.element = jQuery('#video-placeholder');
        $this.videoID = $this.element.attr('data-videoid');
        $this.pushUrl = $this.element.attr('data-pushurl');
        $this.pushTitle = $this.element.attr('data-pushtitle');
        $this.toggleEl = jQuery('#video-placeholder #play-layer , #video-placeholder .featured');

        $this.playerwrapper.hide();
        $this.resetVideoH();
        $this.element.addClass('loading');
        
//if(isMobileDev.any) {
if(isMobileDev && isios == false) {
		
			 jQuery('#video-placeholder #play-layer , #video-placeholder img.desktop-video-cover, .mejs-overlay').hide();

			 block_videoplayer.resetVideoH();
			 $this.playerwrapper.addClass('loading');
			 $this.playerwrapper.html( $this.embedVideoIframeTemplate.replace( '{the-video-id}' , $this.videoID ) );

			 $this.YT_player = new YT.Player('videoplayer', {
			 events: {
			 'onReady': block_videoplayer.onPlayerReady ,
			 'onStateChange': block_videoplayer.onPlayerStateChange
			 //'onError' : video_player.onPlayerStateChange
			 
         }
		 		
         });

		} else if(isios) {
		
		
        jQuery('#video-placeholder').on('click', function () {


var window_height = jQuery(window).height() / 2;		
var window_top_margin = window_height / 2;		

var player_html = jQuery('.videoplayer').html();
jQuery('body').addClass('player_body');
jQuery('<div class="videoplayer_wrap">').html('<div class="videoplayer_player">' + player_html + '</div>').fadeIn(300).appendTo('body')
.css({ 'height' : window_height + 'px', 'margin-top' : window_top_margin + 'px' });
jQuery('<div class="shadow_black">').html('<div id="close">x</div>').appendTo('body');


        });

	jQuery(document).on("click", "#close", function(){
		jQuery('.videoplayer_wrap, .shadow_black').remove();
	});


		jQuery('#video-placeholder .featured').imagesLoaded(function() {
			$this.toggleEl.animate({opacity: 1}, 1000);
			$this.resetVideoH();
			$this.element.removeClass('loading');
			if($this.autoplay){
				jQuery('#video-placeholder #play-layer').click();
			}
		});
	
} else {
         
        jQuery('#video-placeholder').on('click', function () {

            $this.toggleEl.fadeOut(400).promise().done(function () {
                $this.playerwrapper.html($this.embedVideoIframeTemplate.replace('{the-video-id}', $this.videoID)).show();

                $this.YT_player = new YT.Player('videoplayer', {
                    events: {
                        'onReady': block_videoplayer.onPlayerReady,
                        'onStateChange': block_videoplayer.onPlayerStateChange
                    }
                });
            });


        });

	jQuery(document).on("click", "#close", function(){
		jQuery('.videoplayer_wrap, .shadow_black').remove();
	});

		jQuery('#video-placeholder .featured').imagesLoaded(function() {
			$this.toggleEl.animate({opacity: 1}, 1000);
			$this.resetVideoH();
			$this.element.removeClass('loading');
			if($this.autoplay){
				jQuery('#video-placeholder #play-layer').click();
			}
		});

        }
		
		if(isios) {
			
			jQuery('#videoplayer-wrapper').addClass('ios');
			
		}
		//mobileIF

        jQuery(window).resize(function () {
            $this.resetVideoH();
        });


    },

    onPlayerReady: function () {
        var $this = this;
        //console.log('PlayerReady');

        block_videoplayer.playerReady = true;
        block_videoplayer.videoPlaying = true;

        block_videoplayer.playerwrapper.show();
        if (!isMobileDev) {
            block_videoplayer.YT_player.playVideo();
        } else {
            jQuery('#video-placeholder .featured').animate({opacity: 1}, 1000);
        }
    },

    onPlayerStateChange: function (event) {

        if (event.data == YT.PlayerState.ENDED) {
            block_videoplayer.onVideoEnd();
        } else if (event.data == YT.PlayerState.PLAYING) {

            if (block_videoplayer.push_the_url && block_videoplayer.firstPush) {
                pushUrl(block_videoplayer.pushUrl, block_videoplayer.pushTitle);
                block_videoplayer.firstPush = false;
            }
            if (isMobileDev) {
                jQuery('#video-placeholder .featured').slideUp();
            }

        } else if (event.data == YT.PlayerState.PAUSED) {
            if (isMobileDev) {
                jQuery('#video-placeholder .featured').slideDown();
            }

        } else if (event.data == YT.PlayerState.BUFFERING) {
        } else if (event.data == YT.PlayerState.CUED) {
        } else if (event.data == -1) {
        }

    },

    resetVideoH: function () {
        var $this = this;
        $this.videoH = $this.element.width() * (658 / 1170);
        $this.playerwrapper.css('height', $this.videoH);
        $this.element.css('height', $this.videoH);
    },

    onVideoEnd: function () {
        var $this = this;
        if (isMobileDev) {
            block_videoplayer.videoPlaying = false;
            jQuery('#video-placeholder .featured').slideDown();
        } else {
            block_videoplayer.videoPlaying = false;
            block_videoplayer.element.addClass('loading');
            block_videoplayer.playerwrapper.hide().promise().done(function () {
                block_videoplayer.playerwrapper.html('');
                block_videoplayer.YT_player.destroy();
                block_videoplayer.toggleEl.fadeIn(400).promise().done(function () {
                    block_videoplayer.element.removeClass('loading');
                });

            });
        }
    },

    embedVideoIframeTemplate: '<iframe id="videoplayer" src="https://www.youtube.com/embed/{the-video-id}?enablejsapi=1&amp;autoplay=0&amp;autohide=0&amp;controls=1&amp;rel=0&amp;color=white&amp;showinfo=0&amp;modestbranding=0&amp;wmode=opaque&amp;vq=hd720&amp;origin=' + window.location.host + '" frameborder="0" style="width:100%; height:100%;"></iframe>'
}


function onYouTubeIframeAPIReady() {
    var push_the_url = false;
    var autoplay = false;
	block_videoplayer.init(autoplay, push_the_url);
	
	if(jQuery('#heroTop.video-bg.type-yt').length>0 || jQuery('#heroTop.video-player.type-yt').length>0){
		newsPage.init();
	}
}


jQuery(document).ready(function () {


	/* menu two images */
	var img_length = jQuery('ul.bottom_menu ul.sub-menu ul.sub-menu a img').length;
	if(img_length >= 2) {
			jQuery('ul.bottom_menu ul.sub-menu ul.sub-menu a img').parent('a').parent().parent().parent().addClass('two_images');
			jQuery('ul.bottom_menu ul.sub-menu ul.sub-menu a img').parent('a').parent().parent().parent().prev().addClass('two_images_prev');
	}
	/* menu two images */

		jQuery('nav[role="navigation"].main-menu ul.bottom_menu > li').hover(function() {
				jQuery(this).children('ul').stop().slideDown(300).promise().done(
					function() {
						if(isMobileDev) {
							var prev_height = jQuery('ul.bottom_menu > li > a + ul.sub-menu > li + li + li + li').prev().height();
							var image_height = jQuery('ul.bottom_menu > li > a + ul.sub-menu > li + li + li + li').find('ul').children('li').find('img').height();
							jQuery('ul.bottom_menu > li > a + ul.sub-menu > li + li + li + li').css({ 'height' : prev_height + 'px' });
							jQuery('ul.bottom_menu > li > a + ul.sub-menu > li + li + li + li').find('ul').css({ 'margin-top' : prev_height / 2 + 'px' });
							jQuery('ul.bottom_menu > li > a + ul.sub-menu > li + li + li + li').find('ul').children('li').css({ 'margin-top' : -image_height / 2 + 'px' });
						}
						jQuery(this).children('ul').stop().slideDown(0);
					});
		});

    jQuery('nav[role="navigation"].main-menu ul.bottom_menu > li, nav[role="navigation"].main-menu li.bottom_menu_line_children > a + ul').mouseleave(function () {
        jQuery(this).children('ul').stop().slideUp(200);
    });


    jQuery('ul.bottom_menu li.bottom_menu_line_children > a, .bottom_menu_line').mouseenter(function () {
		jQuery('.bottom_menu_line').stop().slideDown(0);
    });

    jQuery('ul.bottom_menu li.bottom_menu_line_children > a, .bottom_menu_line, nav[role="navigation"].main-menu li.bottom_menu_line_children > a + ul').mouseleave(function () {
		
		jQuery('.bottom_menu_line').stop().slideUp(400);
		jQuery('nav[role="navigation"].main-menu li.bottom_menu_line_children > a + ul').stop().slideUp(200);

    });


    jQuery('ul.bottom_menu li.bottom_menu_line_children + li > a').mouseenter(function () {
		jQuery('nav[role="navigation"].main-menu li.bottom_menu_line_children > a + ul,.bottom_menu_line').stop().slideUp(200);
    });
	
    jQuery('nav[role="navigation"].main-menu li.bottom_menu_line_children > a + ul, .bottom_menu_line').mouseenter(function () {
		jQuery('.bottom_menu_line').stop().slideDown(0);
		jQuery('nav[role="navigation"].main-menu li.bottom_menu_line_children > a + ul').stop().slideDown(300);
    });



    jQuery('li.list-menu > a').click(function (e) {
        e.preventDefault();

        if (jQuery(this).next().is(":visible")) {
            jQuery(this).removeClass('active');
            jQuery(this).next('ul').slideUp();
        } else {
            jQuery(this).addClass('active');
            jQuery(this).next('ul').slideDown();
        }

    });

    /* gallery slider */
    var triggers = jQuery('ul.triggers li');
    var images = jQuery('div.images div.item');
    var lastElem = triggers.length - 1;
    var target;

    triggers.first().addClass('active');
    images.hide().first().show();

    function sliderResponse(target) {
        images.fadeOut(300).removeClass('active').eq(target).fadeIn(300).addClass('active');
        triggers.removeClass('active').eq(target).addClass('active');
    }

    triggers.click(function () {
        if (!jQuery(this).hasClass('active')) {
            target = jQuery(this).index();
            sliderResponse(target);
        }
    });

    jQuery('.next').click(function () {
        target = jQuery('ul.triggers li.active').index();
        target === lastElem ? target = 0 : target = target + 1;
        sliderResponse(target);
        if (jQuery('#videoplayer').length > 0) {
            jQuery('#videoplayer')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
        } else {
            iP001.pause();
        }
        //stop_video();
    });
    jQuery('.prev').click(function () {
        target = jQuery('ul.triggers li.active').index();
        lastElem = triggers.length - 1;
        target === 0 ? target = lastElem : target = target - 1;
        sliderResponse(target);
        if (jQuery('#videoplayer').length > 0) {
            jQuery('#videoplayer')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
        } else {
            iP001.pause();
        }
        //stop_video();
    });
    /* gallery slider */

    /* hover text position */
    jQuery('ul.news_list li').mouseenter(function () {
        jQuery(this).children('div').slideDown(300);
    });
    
     /* NEW: hover homepage mobile text position */
    jQuery('#section_hp').mouseenter(function () {
        jQuery(this).children('div').slideDown(300);
    });
    
    
    /* hover text position */

    jQuery('span.search').click(function () {
        jQuery('.shadow,.search_form').fadeIn('fast');
    }), jQuery('.shadow,.search_form input#submit').click(function () {
        jQuery('.shadow,.search_form').fadeOut('slow');
    });

    jQuery('span.login, #popup-nl, .banner_email_signup').click(function (e) {
		e.preventDefault();
        jQuery('.shadow,.login_form').fadeIn('fast');
    }), jQuery('.shadow,.login_form input#submit').click(function () {
        jQuery('.shadow,.login_form').fadeOut('slow');
    });
	
	function isValidEmailAddress(emailAddress) {
		var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		return pattern.test(emailAddress);
    }
	
function cntctfrm_contact_form(e) {
	

		var form_email = jQuery('#emailNewsletter').val();

		if(form_email.length > 3)
		   {
		   if(isValidEmailAddress(form_email))
			  { jQuery('#emailNewsletter').css({ 'border' : '1px solid #7CC200' }); f_form_email = 1; }
			  else
			  { jQuery('#emailNewsletter').css({ 'border' : '1px solid #ff0000' }); f_form_email = 0; }
		   } else {
				jQuery('#emailNewsletter').css({ 'border' : '1px solid #ff0000' }); f_form_email = 0;
			}
			

		if(f_form_email == 1)
			{ jQuery('.login_form .input.submit input').removeAttr('disabled'); }
			else
			{
				e.preventDefault();
				jQuery('.login_form .input.submit input').attr('disabled', 'disabled');
			};

}
	
	jQuery('#emailNewsletter').keyup(cntctfrm_contact_form);
	jQuery('.login_form .input.submit input').click(cntctfrm_contact_form);
	
	jQuery('.fb-gallery,.tw-gallery,.gp-gallery,.weibo-gallery').click(function(e) {
			e.preventDefault();

			var make_a_tweet = jQuery(this);
			var tweet_url = make_a_tweet.attr('href');
			var topPosition = jQuery(this).offset().left;
			var leftPosition = jQuery(this).offset().top;
			
			window.open(tweet_url, "Window2", "status=no,height=300,width=500,resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no");
			return false;
	});
	
	/* news
		jQuery('ul.news_list li.first-image').css({ 'height' : jQuery('ul.news_list li + li').height() -1 + 'px' });
		jQuery('ul.news_list li.first-image img').css({ 'height' : jQuery('ul.news_list li + li img').height() + 'px' });
	*/
	/* news */
		
		//shadow fixed
		jQuery('.mobile_menu .mobile_menu_wrap .mobile_list > li.menu-item-has-children').append( '<div class="sh_shadow"></div>' );
		//shadow fix
	
/* home page scroll effect */
var grid_list = jQuery('section[role="main"].images-container.home div.grid div');
function first_post() {
    setTimeout(function(){
		grid_list.first().addClass('active');
	}, 2000);
}

if(grid_list.length > 0) {
	first_post();
}

if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
 var ieversion=new Number(RegExp.$1)
}

});

var mobileHp= {
	new_home: null,
	new_homeWrapper: null,
	header: null,
	loadGroupOf: 3,
	loadednew_home: 0,
	totalnew_home: -1,
	currentElement:0,
	lockScroll:false,
	currentWH:0,
	init: function(){
		var $this = this;
		$this.new_homeWrapper=jQuery('#section_hp');
		$this.new_home=jQuery('#section_hp .single_banner_hp');
		$this.header=jQuery('#monclerTopHead');
		$this.downArrow=jQuery('#goDownArrow');
		$this.totalnew_home=$this.new_home.length;
		$this.downArrow.hide();
		
		// DELETE ALL IMG
		if(isMobileDev){
			$this.log('delete IMG!');
			$this.deleteAllImg();			
		} 
		
		$box = jQuery('#section_hp ul.six_bock'); 
		if(typeof $box!='undefined' && $box.find('div')){	
			if(isMobileDev){
				 jQuery('#section_hp ul.six_bock div').addClass('big_box_mobile');
			} else {
				jQuery('#section_hp ul.six_bock li').addClass('big_box_desktop');
			}
		} 
		
		//center all the titles
		$this.centerTitles();
		jQuery(window).resize(function(){$this.centerTitles();});
		
		
		if(isSmartPhone){
			$this.log('smartphone OK!');

			//$this.downArrow.fadeIn(600);
			$this.resetBoxHeight();
			jQuery(window).resize(function(){$this.resetBoxHeight();});
			//$this.downArrow.on('click',function(){$this._scroll();});
			jQuery(window).scroll(
				function(){$this.log('current element: '+$this.currentElement);}	
			);
		} 
		
		if($this.new_home.length>$this.loadGroupOf){
			//news are more than loadGroupOf, start load first "loadGroupOf" images
			$this.log('load first '+$this.loadGroupOf+' images!');
			for(var i=0;i<$this.loadGroupOf;i++){
				var $new_home = jQuery($this.new_home[i]);
				if($new_home.attr('data-state')=='loading'){
					$new_home.attr('data-state','loaded');
					if(isSmartPhone) $new_home.css('background-image','url("'+$new_home.attr('data-home-bg')+'")');
					$new_home.waitForImages({
						waitForAll: true,
						finished: function(){jQuery(this).removeClass('loading');}
					});
					$this.loadednew_home++;
				}
			}
			$this.new_home.bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
				var $new_home = jQuery(this);
				if(isSmartPhone&&visiblePartY=="top"){
					$this.currentElement=parseInt(jQuery(this).attr('data-order'));
				}
				if($new_home.attr('data-state')=='loading'&&(visiblePartY == 'top'||visiblePartY == 'bottom')){
					$new_home.attr('data-state','loaded');
					if(isSmartPhone) $new_home.css('background-image','url("'+$new_home.attr('data-home-bg')+'")');
					$new_home.waitForImages({
						waitForAll: true,
						finished: function(){jQuery(this).removeClass('loading');}
					});
					$this.loadednew_home++;
				}
			});
		
		} else{
			//news are less than loadGroupOf, load all
			jQuery.each( $this.new_home,function(i,new_home){
				var $new_home = jQuery($this.new_home[i]);
				if(isSmartPhone) $new_home.css('background-image','url("'+$new_home.attr('data-home-bg')+'")');
				$new_home.waitForImages({
					waitForAll: true,
  					finished: function(){jQuery(this).removeClass('loading');}
				});
				$this.loadednew_home++;
			});
		}
	},
	loadMore: function(){ //NOT USED
		var $this=this;
		if($this.loadednew_home<=$this.totalnew_home){
			//we have images to load yet
			$this.log('we have images to load yet');
			if($this.loadednew_home+$this.loadGroupOf<=$this.totalnew_home){
				//we have at least "a cycle" of images to load, load "a cycle"
				$this.log('we have at least "a cycle" of images to load, load "a cycle"');
				var limit = $this.loadednew_home+$this.loadGroupOf;
				for(var i=$this.loadednew_home;i<limit;i++){
					var $new_home = jQuery($this.new_home[i]);
					$new_home.attr('data-WFI_loading','true');
					if(isSmartPhone) $new_home.css('background-image','url("'+$new_home.attr('data-home-bg')+'")');
					$new_home.waitForImages({
						waitForAll: true,
						finished: function(){jQuery(this).removeClass('loading');}
					});
					$this.loadednew_home++;
				}
			}else{
				//we have less than "a cycle" of images to load, load the remaining images
				$this.log('we have less than "a cycle" of images to load, load the remaining images');
				for(var i=$this.loadednew_home;i<$this.totalnew_home;i++){
					var $new_home = jQuery($this.new_home[i]);
					if(isSmartPhone) $new_home.css('background-image','url("'+$new_home.attr('data-home-bg')+'")');
					$new_home.waitForImages({
						waitForAll: true,
						finished: function(){jQuery(this).removeClass('loading');}
					});
					$this.loadednew_home++;
				}
			}
		}else{
			//we have load all images
		}
	},
	deleteAllImg: function(){
		var $this=this;
		jQuery.each($this.new_home,function(i,el){
			var $img=jQuery(el).find('img.banner_img_hp');
			if($img!=undefined&&$img.length>0){
				$img.remove();
			}
		});
	},
	centerTitles: function(){
		var $this=this;
		jQuery.each($this.new_home,function(i,el){
			var $title=jQuery(el).find('a > div');
			if($title!=undefined&&$title.length>0){
				var mt=-1*($title.height())/2;
				$title.css('margin-top',mt);
				if (jQuery(el).hasClass('active')){
					$this.log('active');
				}
			}
		});

	},
	resetBoxHeight: function(){
		var $this=this;
		$this.currentScrollDelta=jQuery(window).innerHeight() - $this.header.height();
		$this.new_home.height($this.currentScrollDelta);
	},
	_scroll: function(){
		var $this=this;
		if(!$this.lockScroll){
			$this.lockScroll=true;
			if($this.currentElement==0){$this.currentElement++;}
			jQuery.scrollTo('#'+$this.new_home[$this.currentElement].id, 800,
			{
				axis:'y',
				offset: {top:-$this.header.height(), left:0},
				onAfter:function(){$this.currentElement++;$this.lockScroll=false;}	
			}
			);
		}
	},
	log: function(data){
		//console.log(data);
	}
	
}


var newsLanding = {
	news: null,
	newsWrapper: null,
	header: null,
	loadGroupOf: 3,
	loadedNews: 0,
	totalNews: -1,
	currentElement:0,
	lockScroll:false,
	currentWH:0,
	init: function(){
		var $this = this;
		$this.newsWrapper=jQuery('#news_list ul.news_list');
		$this.news=jQuery('#news_list ul.news_list li');
		$this.header=jQuery('#monclerTopHead');
		$this.downArrow=jQuery('#goDownArrow');
		$this.totalNews=$this.news.length;
		$this.downArrow.hide();
		
		//center all the titles
		$this.centerTitles();
		jQuery(window).resize(function(){$this.centerTitles();});
		
		if(isSmartPhone){
			//$this.downArrow.fadeIn(600);
			$this.resetBoxHeight();
			jQuery(window).resize(function(){$this.resetBoxHeight();});
			//$this.downArrow.on('click',function(){$this._scroll();});
			jQuery(window).scroll(
				function(){$this.log($this.currentElement);}	
			);
		}
		
		if($this.news.length>$this.loadGroupOf){
			//news are more than loadGroupOf, start load first "loadGroupOf" images
			$this.log('load first '+$this.loadGroupOf+' images!');
			for(var i=0;i<$this.loadGroupOf;i++){
				var $news = jQuery($this.news[i]);
				if($news.attr('data-state')=='loading'){
					$news.attr('data-state','loaded');
					$news.css('background-image','url("'+$news.attr('data-bg')+'")');
					$news.waitForImages({
						waitForAll: true,
						finished: function(){jQuery(this).removeClass('loading');}
					});
					$this.loadedNews++;
				}
			}
			$this.news.bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
				var $news = jQuery(this);
				if(isSmartPhone&&visiblePartY=="top"){
					$this.currentElement=parseInt(jQuery(this).attr('data-order'));
				}
				if($news.attr('data-state')=='loading'&&(visiblePartY == 'top'||visiblePartY == 'bottom')){
					$news.attr('data-state','loaded');
					$news.css('background-image','url("'+$news.attr('data-bg')+'")');
					$news.waitForImages({
						waitForAll: true,
						finished: function(){jQuery(this).removeClass('loading');}
					});
					$this.loadedNews++;
				}
			});
		
		} else{
			//news are less than loadGroupOf, load all
			jQuery.each( $this.news,function(i,news){
				var $news = jQuery($this.news[i]);
				$news.css('background-image','url("'+$news.attr('data-bg')+'")');
				$news.waitForImages({
					waitForAll: true,
  					finished: function(){jQuery(this).removeClass('loading');}
				});
				$this.loadedNews++;
			});
		}
	},
	loadMore: function(){ //NOT USED
		var $this=this;
		if($this.loadedNews<=$this.totalNews){
			//we have images to load yet
			$this.log('we have images to load yet');
			if($this.loadedNews+$this.loadGroupOf<=$this.totalNews){
				//we have at least "a cycle" of images to load, load "a cycle"
				$this.log('we have at least "a cycle" of images to load, load "a cycle"');
				var limit = $this.loadedNews+$this.loadGroupOf;
				for(var i=$this.loadedNews;i<limit;i++){
					var $news = jQuery($this.news[i]);
					$news.attr('data-WFI_loading','true');
					$news.css('background-image','url("'+$news.attr('data-bg')+'")');
					$news.waitForImages({
						waitForAll: true,
						finished: function(){jQuery(this).removeClass('loading');}
					});
					$this.loadedNews++;
				}
			}else{
				//we have less than "a cycle" of images to load, load the remaining images
				$this.log('we have less than "a cycle" of images to load, load the remaining images');
				for(var i=$this.loadedNews;i<$this.totalNews;i++){
					var $news = jQuery($this.news[i]);
					$news.css('background-image','url("'+$news.attr('data-bg')+'")');
					$news.waitForImages({
						waitForAll: true,
						finished: function(){jQuery(this).removeClass('loading');}
					});
					$this.loadedNews++;
				}
			}
		}else{
			//we have load all images
		}
	},
	centerTitles: function(){
		var $this=this;
		jQuery.each($this.news,function(i,el){
			var $title=jQuery(el).find('a > div');
			if($title!=undefined&&$title.length>0){
				var mt=-1*($title.height())/2;
				$title.css('margin-top',mt);
			}
		});
	},
	resetBoxHeight: function(){
		var $this=this;
		$this.currentScrollDelta=jQuery(window).innerHeight() - $this.header.height();
		$this.news.height($this.currentScrollDelta);
	},
	_scroll: function(){
		var $this=this;
		if(!$this.lockScroll){
			$this.lockScroll=true;
			if($this.currentElement==0){$this.currentElement++;}
			jQuery.scrollTo('#'+$this.news[$this.currentElement].id, 800,
							{
								axis:'y',
								offset: {top:-$this.header.height(), left:0},
								onAfter:function(){$this.currentElement++;$this.lockScroll=false;}	
							}
			);
		}
	},
	log: function(data){
		//console.log(data);
	}
	
}

var newsPage = {
	header: null,
	heroTop: null,
	heroTitle: null,
	heroTopBg: null,
	percent: 70, //all the space
	percent_mob:100, //all the space
	video_prop_w4h:658/1170,
	video_prop_h4w:1170/658,
	newsArticle: null,
	videoBg:null,
	videoPlayer:null,
	init: function(){
		if(jQuery('article#newsPage').length>0){
			var $this = this;
			if(typeof sliderConfig!=='undefined'){
				$this.log('INIT NEWS PAGE');
				$this.percent=sliderConfig.top_banner_size;
				$this.percent_mob=sliderConfig.top_banner_size_mobile;				
				$this.header=jQuery('#monclerTopHead');
				$this.heroTop=jQuery('#heroTop');
				$this.heroTopBg=jQuery('#heroTopBg');
				$this.heroTitle = jQuery('#heroTop .title');
				$this.newsArticle = jQuery('article#newsPage .article');
				if(isMobileDev){
					jQuery('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />');
				}
				if(isSmartPhone){$this.percent=$this.percent_mob;}
				$this.heroTop.addClass('loading');
				
				//if mode is single image...init single
				if($this.heroTop.hasClass('singleImage')){$this.initSingle();}
				//if slider mode...init slider		
				if($this.heroTop.hasClass('slider')){$this.initSlider();}
				//if video bg mode...init videobg		
				if($this.heroTop.hasClass('video-bg')){$this.initVideoBg();}
				//if videoplayer mode...init videoplayer
				if($this.heroTop.hasClass('video-player')){$this.initVideoPlayer();}
			}
		}else{
			$this.log('sliderConfig is undefined');
		}
	},
	initSingle: function(){
		var $this = this;
		$this.heroTopBg.waitForImages({
			waitForAll: true,
			finished: function(){$this.heroTop.removeClass('loading');}
		});
		$this.resetHeroSize();
		jQuery(window).resize(function(){
			$this.resetHeroSize();
		});
	},
	initVideoBg: function(){
		var $this = this;
		$this.log('initVideoBg');
		if(sliderConfig.settings.videotype=='yt'){
			$this.log('YouTube Video');
			var autoplay=1;//1
			var controls=0;
			if(isSmartPhone||isTablet){ 
				autoplay=0;
				controls=1;
				$this.heroTop=jQuery('#heroTop').find('.heroTopBgOverLayer').hide();
			}
			$this.heroTopBg.html('<iframe id="the_bg_video" src="http://www.youtube.com/embed/'+sliderConfig.settings.videourl_yt+'?&amp;autohide=1&amp;rel=0&amp;autoplay='+autoplay+'&amp;controls='+controls+'&amp;color=white&amp;showinfo=0&amp;modestbranding=0&amp;wmode=opaque&amp;loop=1&amp;playlist='+sliderConfig.settings.videourl_yt+'&amp;vq=hd720&amp;theme=light&amp;origin='+window.location.host+'" frameborder="0" allowfullscreen="" wmode="transparent"></iframe>');
			$this.videoBg = $this.heroTopBg.find('iframe');
			if(isSmartPhone||isTablet){
				$this._mob_resetVideoSize();
				jQuery(window).resize(function(){
					$this._mob_resetVideoSize();
				});
			} else {
				$this.resetVideoSize();
				jQuery(window).resize(function(){
					$this.resetVideoSize();
				});
			}
		}else if(sliderConfig.settings.videotype=='self'){
			$this.log('Self-Hosted Video');
			var canPlayVideo=false;
			if (Modernizr.video) {
				//browser supports video tag
				var v = document.createElement("video");
				if(v.canPlayType('video/mp4')!=""||v.canPlayType('video/ogg')!=""||v.canPlayType('video/webm')!=""){
					//browser can play a video type
					canPlayVideo=true;
				}
			}
			//canPlayVideo=false;
		
			if(canPlayVideo){
				//browser can play video, use video tag
				$this.log('browser can play video & supports video tag');					
				var sources = '';
				var foundSource=false;
				if(sliderConfig.settings.videourl_mp4!=null&&sliderConfig.settings.videourl_mp4!=''){
					foundSource=true;
					sources+='<source src="'+sliderConfig.settings.videourl_mp4+'" type="video/mp4"></source>';
				}
				if(sliderConfig.settings.videourl_ogg!=null&&sliderConfig.settings.videourl_ogg!=''){
					foundSource=true;
					sources+='<source src="'+sliderConfig.settings.videourl_ogg+'" type="video/ogg"></source>';
				}
				if(sliderConfig.settings.videourl_webm!=null&&sliderConfig.settings.videourl_webm!=''){
					foundSource=true;
					sources+='<source src="'+sliderConfig.settings.videourl_webm+'" type="video/webm"></source>';
				}
				if(foundSource){
					var autoplay="true";
					var controls="false";
					var poster='';
					if(isSmartPhone||isTablet){ 
						autoplay="false";
						controls="true";
						poster+='poster="'+sliderConfig.settings.poster_image.url+'"';
						$this.heroTop=jQuery('#heroTop').find('.heroTopBgOverLayer').hide();
					}

					var video='<video id="the_bg_video" class="" controls="'+controls+'" autoplay="'+autoplay+'" loop="true" preload="auto" '+poster+'>'+sources;
					video+='</video>';
					$this.heroTopBg.html(video);
					$this.videoBg = $this.heroTopBg.find('video#the_bg_video');
					if(isSmartPhone||isTablet){
						$this._mob_resetVideoSize();
						jQuery(window).resize(function(){
							$this._mob_resetVideoSize();
						});
					} else {
						$this.resetVideoSize();
						jQuery(window).resize(function(){
							$this.resetVideoSize();
						});
					}
				}
			}else{
				//browser can't play video, use the image
				$this.log('browser can\'t play video, use the alt image');
				var altImageSource='<img id="fall_back_image" src="'+sliderConfig.settings.fall_back_image.url+'" />';
				$this.heroTop=jQuery('#heroTop').find('.heroTopBgOverLayer').fadeOut();
				$this.heroTopBg.html(altImageSource);
				$this.videoBg = $this.heroTopBg.find('img');
				$this.resetVideoSize();
				jQuery(window).resize(function(){
					$this.resetVideoSize();
				});
			}
		}
		$this.heroTop.removeClass('loading');
	},
	initVideoPlayer: function(){
		var $this = this;
		$this.log('initVideoPlayer');
		$this.heroTop.find('.heroTopBgOverLayer').fadeOut(600);
		var foundSource=false;
		var poster = '';
		_options={
				'id': 'the_video_player',
				'width': "100%",
				'height': "100%",
				'autostart': false,
				'controls': true,
				'repeat': false,
				'controlbar': 'over',
				//'primary': 'flash',
				'fallback': false,
				'stretching': 'fill',
				'screencolor': 'FFFFFF',
				'wmode' : 'transparent',
				'skin': themeBasepath+"js/jwplayer/skin/moncler/moncler.xml",
				'flashplayer': themeBasepath+"js/jwplayer/jwplayer.flash.swf",
				'html5player': themeBasepath+"js/jwplayer/jwplayer.html5.js"
		}
		
		if(isMobileDev){
			_options['fallback']=true;
			if(typeof sliderConfig.settings.poster_image_mobile!=='undefined' && 
				sliderConfig.settings.poster_image_mobile!=null &&
				sliderConfig.settings.poster_image_mobile!=false)
			{
				poster=sliderConfig.settings.poster_image_mobile.url;
			}
		
		}else if(
			typeof sliderConfig.settings.poster_image!=='undefined' && 
			sliderConfig.settings.poster_image!=null &&
			sliderConfig.settings.poster_image!=false
		){
			poster=sliderConfig.settings.poster_image.url;
		}
		if(poster!=''){ _options['image']=poster; }
		if(isMobileDev){
			var $newsbody=$this.newsArticle.parent();
			var title = $this.heroTitle.html();
			$this.heroTitle.remove();
			$newsbody.prepend('<div class="heroTitle">'+title+'</div>');
		}
		if(sliderConfig.settings.videotype=='yt'){
			//YouTube Video
			$this.log('YouTube Video');
			if(sliderConfig.settings.videourl_yt!=null&&sliderConfig.settings.videourl_yt!=''){
				foundSource=true;
				_options['file']="http://www.youtube.com/watch?v="+sliderConfig.settings.videourl_yt+"?rel=0&showinfo=0&modestbranding=0&wmode=opaque";
			}
		}else if(sliderConfig.settings.videotype=='self'){
			//Self-Hosted Video
			$this.log('Self-Hosted Video');
			_options['levels']=new Array();
			if(sliderConfig.settings.videourl_mp4!=null&&sliderConfig.settings.videourl_mp4!=''){
				foundSource=true;
				_options.levels.push({file:sliderConfig.settings.videourl_mp4});
			}
			if(sliderConfig.settings.videourl_webm!=null&&sliderConfig.settings.videourl_webm!=''){
				foundSource=true;
				_options.levels.push({file:sliderConfig.settings.videourl_webm});
			}
		}
		if(foundSource){
			if(!isMobileDev){$this.resetHeroSize();}
			$this.videoPlayer = jwplayer("heroTopBg").setup(_options);
			$this.videoPlayer.onReady(function(){
				$this.log('Player Ready');
				$this.videoBg=jQuery('#'+$this.videoPlayer.container.id);
				if(!isMobileDev){
					$this.resetPlayerSize();
					jQuery(window).resize(function(){$this.resetPlayerSize();});
				}else{
					$this._mob_resetPlayerSize();
					jQuery(window).resize(function(){$this._mob_resetPlayerSize();});
				}
				$this.heroTop.removeClass('loading');
			});
			$this.videoPlayer.onPlay(function(){
				if(!isMobileDev){$this.heroTitle.fadeOut(800);$this.resetPlayerSize();}
				else{$this._mob_resetPlayerSize();}
			});
			$this.videoPlayer.onComplete(function(){
				if(!isMobileDev){$this.resetPlayerSize();$this.heroTitle.fadeIn(800);}
				else{$this._mob_resetPlayerSize();}
			});
			if(isMobileDev){
				$this._mob_resetPlayerSize();
				jQuery(window).resize(function(){$this._mob_resetPlayerSize();});
			}
		}
	},
	initSlider: function(){
		var $this = this;
		$this.log('Slider');
		var $slides = sliderConfig.slides;
		if(isSmartPhone&&sliderConfig.mob_slides[0]!=""&&sliderConfig.mob_slides[0]!=undefined){
			$slides = sliderConfig.mob_slides;
		}
		$this.heroTopBg.html('').css('opacity',0);
		jQuery.each($slides , function(i,el){
			if(el.img!=''&&el.img!=null&&el.img!=undefined){
				$this.heroTopBg.append('<div class="m-slide"><img class="m-slide-image" src="'+el.img.url+'" /><div class="heroTopBgOverLayer"></div><div class="title"><h1>'+el.title+'</h1><p>'+el.subtitle+'<p></div></div>');
			}
		});
		$this.heroTitle = jQuery('#heroTop .title');
	    $this.heroTopBg.maximage({
	        cycleOptions: {
	            fx:'fade',
	            speed: sliderConfig.settings.speed,
	            timeout: sliderConfig.settings.interval,
				pauseOnPagerHover: false,
				after:function(currSlideElement, nextSlideElement, options, forwardFlag){
					jQuery(currSlideElement).find('.title').css('opacity',0);
					var $el=jQuery(nextSlideElement).find('.title');
					$el.css('opacity',0).promise().done(function(){
						$el.css('margin-top',-1*($el.height())/2).promise().done(function(){
							$el.css('opacity',1);
						});
					});
				}
	        },
	        onFirstImageLoaded: function(){
	            $this.heroTopBg.css({'opacity':1,'z-index':1});
				$this.heroTitle=jQuery('#heroTop .title');
				$this.heroTop.removeClass('loading');
	        }
	    });
		$this.heroTitle=jQuery('#heroTop .title');
		$this.resetHeroSize();
		jQuery(window).resize(function(){
			$this.resetHeroSize();
		});
	},
	resetVideoSize: function(){
		var $this = this;
		//(658 / 1170)
		$this.resetHeroSize();
		var wh = ((jQuery(window).innerHeight() - $this.header.height())* $this.percent)/100;
		var w = $this.heroTopBg.width();
		var h = w*$this.video_prop_w4h;
		var mt = 0;
		var mr = 0;
		if(wh<=h){
			mt= -1*(h-wh)/2;
		}else{
			h=wh;
			var w_wrap=w;
			w=h*$this.video_prop_h4w;
			mr= -1*(w-w_wrap)/2
		}
		$this.videoBg.css({'width':w,'height':h,'margin-top':mt,'margin-right':mr});
	},
	resetPlayerSize: function(){
		var $this = this;
		$this.resetHeroSize();
		var mt = 0;
		if($this.videoPlayer.getState()=='IDLE'){
			$this.videoBg.css({'width':'100%','height':'100%','margin-top':mt});
		}else{
			var wh = ((jQuery(window).innerHeight() - $this.header.height())* $this.percent)/100;
			var w = $this.heroTop.width();
			var h = w*$this.video_prop_w4h;
			if(h<=wh){
				mt=(wh-h)/2;
			}else{
				h=wh;
				w=h*$this.video_prop_h4w;
			}
			$this.videoBg.css({'width':w,'height':h,'margin-top':mt});
		}
	},
	resetHeroSize: function(){
		var $this = this;
		var h = ((jQuery(window).innerHeight() - $this.header.height())* $this.percent)/100;
		jQuery.each($this.heroTitle,function(i,el){
			var $el = jQuery(el);
			$el.css('margin-top',-1*($el.height())/2);
		});
		$this.heroTop.height(h);
		return;
	},
	_mob_resetVideoSize: function(){
		var $this = this;
		var w = jQuery(window).width();
		var h = w*$this.video_prop_w4h;
		$this.videoBg.css({'width':w,'height':h,'margin-top':0,'margin-right':0});
	},
	_mob_resetPlayerSize: function(){
		var $this = this;
		var w = jQuery(window).width();
		var h = w*$this.video_prop_w4h;
		$this.heroTop.css({'width':w,'height':h,'margin-top':0,'margin-right':0});
	},
	log: function(data){
		//console.log(data);
	}
	
}
	

/* home page scroll effect */


var gridRow = {
	rows:null,
	lazyBlocks:null,
	videoPlayers:null,
	loadGroupOf:2,
	collectionLogo:null,
	players:new Object(),
	footer:null,
	init: function(){
		var $this=this;
		$this.rows=jQuery('div.grid_row');
		$this.footer=jQuery('#siteFooter');
		$this.lazyBlocks=jQuery('div.grid_row .lazy_block');
		$this.collectionLogo=jQuery('#collection-logo');
		$this.collectionLogo.waitForImages({
			waitForAll: true,
			finished: function(){
				$this.centerLogo();
				$this.collectionLogo.animate({opacity: 1}, 800);
			}
		});
		jQuery(window).resize(function(){$this.centerLogo();});
		//if we have video
		if(jQuery('div.grid_row.video').length>0){
			$this.videoPlayers=jQuery('div.grid_row.video .row_video_block');
		}
		$this.log('ROWS:');
		$this.log($this.rows);
		$this.log('LAZY BLOCKS:');
		$this.log($this.lazyBlocks);
		$this.log('PLAYERS:');
		$this.log($this.videoPlayers);
		//start loading rows
		if($this.rows.length>$this.loadGroupOf){
			//rows are more than [loadGroupOf], start load first [loadGroupOf] rows
			$this.log('load first '+$this.loadGroupOf+' rows!');
			for(var i=0;i<$this.loadGroupOf;i++){
				$row=jQuery($this.rows[i]);
				if($row.attr('data-state')=='loading'){
					$row.attr('data-state','loaded');
					jQuery.each($row.find('.lazy_block') , function(i,el){
						var $lazyBlock=jQuery(el);
						$lazyBlock.find('.imageWrapper').html('<img src="'+$lazyBlock.attr('data-image')+'"/>');
						$lazyBlock.waitForImages({
							waitForAll: true,
							finished: function(){jQuery(this).removeClass('loading');}
						});
					});
				}
			}
			$this.rows.bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
				var $row = jQuery(this);
				if($row.attr('data-state')=='loading'&&(visiblePartY == 'top'||visiblePartY == 'bottom')){
					$row.attr('data-state','loaded');
					jQuery.each($row.find('.lazy_block') , function(i,el){
						var $lazyBlock=jQuery(el);
						$lazyBlock.find('.imageWrapper').html('<img src="'+$lazyBlock.attr('data-image')+'"/>');
						$lazyBlock.waitForImages({
							waitForAll: true,
							finished: function(){jQuery(this).removeClass('loading');}
						});
					});
				}
			});
		} else{
			//rows are less than loadGroupOf, load all images
			$this.rows.attr('data-state','loaded');
			jQuery.each($this.lazyBlocks , function(i,el){
				var $lazyBlock=jQuery(el);
				$lazyBlock.find('.imageWrapper').html('<img src="'+$lazyBlock.attr('data-image')+'"/>');
				$lazyBlock.waitForImages({
					waitForAll: true,
					finished: function(){jQuery(this).removeClass('loading');}
				});
			});
		}
		$this.initPlayers();
		
	},
	initPlayers : function(){
		var $this = this;
		$this.log('initVideoPlayers');

		jQuery.each( $this.videoPlayers ,function(i,el){
			var $playerWrapper=jQuery(el);
			var settings=jQuery.parseJSON($playerWrapper.attr('data-video'));
			if(typeof settings != 'undefined' && settings!=null){
				//we can start
				_options={
						'id':'the_video_player','width':"100%",'height':"100%",'autostart':true,
						'controls':true,'repeat':false,'controlbar':'over',//'primary':'flash',
						'fallback':false,'stretching':'fill','screencolor':'FFFFFF','wmode':'transparent',
						'skin':themeBasepath+"js/jwplayer/skin/moncler/moncler.xml",
						'flashplayer':themeBasepath+"js/jwplayer/jwplayer.flash.swf",
						'html5player':themeBasepath+"js/jwplayer/jwplayer.html5.js"
				}
				var foundSource=false;
				var poster = '';
				if(isMobileDev){ 
					_options['fallback']=true;
					_options['autostart']=false;
				}
				if(
					typeof settings.cover!=='undefined' && 
					settings.cover!=null &&
					settings.cover!=false
				){
					poster=settings.cover;
				}
				if(poster!=''){ _options['image']=poster; }
				
				//Code for Self-Hosted video
				$this.log('Self-Hosted Video');
				_options['levels']=new Array();
				if(settings.mp4!=null&&settings.mp4!=''){
					foundSource=true;
					_options.levels.push({file:settings.mp4});
				}
				if(settings.webm!=null&&settings.webm!=''){
					foundSource=true;
					_options.levels.push({file:settings.webm});
				}
					
				if(foundSource){
					//we have a source to play
					var $player = jwplayer(settings.playerID).setup(_options);
					$player.onReady(function(){
						$this.log('Player Ready: '+settings.playerID);
						$this.resetPlayersSize();
						jQuery(window).resize(function(){$this.resetPlayersSize();});
					});
					$player.onPlay(function(){});
					$player.onComplete(function(){});
					$this.players[settings.playerID]=$player;
				}
			}
		});
	},
	resetPlayersSize : function(){
		var $this=this;
		jQuery.each($this.videoPlayers, function(i,el){
			var $wrap=jQuery(el);
			var $spacekeeper=$wrap.find('img.spacekeeper');
			$wrap.height($spacekeeper.height());
		});
	},
	centerLogo: function(){
		$this=this;
		var margin=-1*($this.collectionLogo.width()/2);
		$this.collectionLogo.css('margin-left',margin);
	},
	log: function(data){
		//console.log(data);
	}
}




var coverPage = {
	type:'',
	wrapper:null,
	contentWrapper:null,
	player:null,
	image:null,
	collectionLogo:null,
	header:null,
	footer:null,
	init: function(){
		var $this=this;
		$this.header=jQuery('div#monclerTopHead');
		$this.footer=jQuery('footer#siteFooter');
		$this.wrapper=jQuery('div#cover-content');
		$this.collectionLogo=jQuery('#collection-logo');
		
		if($this.wrapper.hasClass('cover_type_video')){
			//if we have video load video
			$this.type='video';
			$this.contentWrapper=jQuery('div#cover-content div#cover-videoplayer');
			$this.initPlayer();
		}else{
			//if we have no video, load default (image)
			$this.type='image';
			$this.contentWrapper=jQuery('div#cover-content div#cover-image');
			$this.initImage();
		}
	},
	initImage : function(){
		var $this = this;
		$this.log('init Image');
		var settings=jQuery.parseJSON($this.contentWrapper.attr('data-image'));
		if(typeof settings!='undefined'&&settings!=null){
			var imageURL=settings.cover;
			if(isSmartPhone){
				imageURL=settings.covermob;
				$this.contentWrapper.html('<img src="'+imageURL+'"/>');
			}else{
				$this.contentWrapper.css({'background-image':'url(\''+imageURL+'\')'});
			}
			$this.resize();
			jQuery(window).resize( function(){$this.resize();});
			$this.collectionLogo.waitForImages({
				waitForAll: true,
				finished: function(){
					$this.resize();
					$this.collectionLogo.animate({opacity: 1}, 800);
				}
			});
			$this.contentWrapper.waitForImages({
				waitForAll: true,
				finished: function(){$this.wrapper.removeClass('loading');}
			});
		} else {
			//$this.log('error');
		}
	},
	initPlayer : function(){
		var $this = this;
		$this.log('initVideoPlayer');
		var settings=jQuery.parseJSON($this.contentWrapper.attr('data-video'));
		$this.log(settings);
		if(typeof settings != 'undefined' && settings!=null){
			if(isMobileDev){
				//use an image
				var imageURL=settings.cover;
				if(isSmartPhone){ 
					imageURL=settings.cover_mobile;
					$this.contentWrapper.html('<img src="'+imageURL+'"/>');
				}else{
					//tablet
					$this.contentWrapper.css({'background-image':'url(\''+imageURL+'\')'});
				}
				
				$this.resize();
				jQuery(window).resize( function(){$this.resize();});
				$this.collectionLogo.waitForImages({
					waitForAll: true,
					finished: function(){
						$this.resize();
						$this.collectionLogo.animate({opacity: 1}, 800);
					}
				});
				$this.contentWrapper.waitForImages({
					waitForAll: true,
					finished: function(){$this.wrapper.removeClass('loading');}
				});
			}else{
				//we can start
				_options={
					'id':'the_video_player','width':"100%",'height':"100%",'autostart':true,
					'controls':false,'repeat':true,'controlbar':'over',//'primary':'flash',
					'fallback':false,'stretching':'fill','screencolor':'FFFFFF','wmode':'transparent',
					'skin':themeBasepath+"js/jwplayer/skin/moncler/moncler.xml",
					'flashplayer':themeBasepath+"js/jwplayer/jwplayer.flash.swf",
					'html5player':themeBasepath+"js/jwplayer/jwplayer.html5.js"
				}
				var foundSource=false;
				//Code for Self-Hosted video
				$this.log('Self-Hosted Video');
				_options['levels']=new Array();
				if(settings.mp4!=null&&settings.mp4!=''){
					foundSource=true;
					_options.levels.push({file:settings.mp4});
				}
				if(settings.webm!=null&&settings.webm!=''){
					foundSource=true;
					_options.levels.push({file:settings.webm});
				}
					
				if(foundSource){
					if(MobileEsp.isMSIE(9)){
						_options['primary']='flash';
					}
					//we have a source to play
					$this.player = jwplayer(settings.playerID).setup(_options);
					$this.collectionLogo.waitForImages({
						waitForAll: true,
						finished: function(){
							$this.resize();
							$this.collectionLogo.animate({opacity: 1}, 800);
						}
					});
					$this.player.onReady(function(){
						$this.log('Player Ready: '+settings.playerID);
						$this.wrapper.removeClass('loading');
						$this.resize();
						$this.resetPlayersSize();
						jQuery(window).resize(function(){$this.resize();$this.resetPlayersSize();});
					});
					$this.player.onPlay(function(){});
					$this.player.onComplete(function(){});
				}
			}
		} else {
			$this.log('error');
		}
	},
	resetPlayersSize: function(){
		var $this=this;
	},
	resize: function(){
		var $this=this;
		var logo_ml=-1*($this.collectionLogo.width()/2);
		var logo_mt=-1*($this.collectionLogo.height()/2);
		$this.collectionLogo.css({'margin-left':logo_ml,'margin-top':logo_mt});
		if(!isSmartPhone){
			var wh=jQuery(window).height();
			var space=wh-$this.header.height();
			$this.contentWrapper.height(space);
		}
	},
	log: function(data){
		//console.log(data);
	}
}

var popups = {
		
	init:function(){
		var $this=this;
		
		jQuery('span.search').click(function () {
			jQuery('body > div.shadow,.search_form').fadeIn('fast');
		}), jQuery('body > div.shadow,.search_form input#submit').click(function () {
			jQuery('body > div.shadow,.search_form').fadeOut('slow');
		});
		
		jQuery('span.login, #popup-nl, .banner_email_signup').click(function (e) {
			e.preventDefault();
			jQuery("#show_my_msg").html('');
			jQuery('body > div.shadow,.login_form').fadeIn('fast');
		});
		jQuery('body > div.shadow,.login_form input#submit').click(function () {
			jQuery('body > div.shadow,.login_form').fadeOut('slow');
		});
			
		jQuery('#emailNewsletter').keyup($this.cntctfrm_contact_form);
		jQuery('.login_form .input.submit input').click($this.cntctfrm_contact_form);
		
		jQuery("#signup-form #formSubmit").on('click',function() {
		
			var emailNewsletter = jQuery("#emailNewsletter").val();
			var tskay=jQuery("#tskay").val();
			var go=jQuery("#go").val();
			var layer=jQuery("#layer").val();
			var gender=jQuery('input.radioBtn:radio[name=gender]:checked').val();
		
			jQuery.ajax({
				type: 'POST',
				data: {"gender":gender,"mail":emailNewsletter,"tskay":tskay,"go":go,"layer":layer},
				url: 'http://'+window.location.host+"/yoox-singup.php",
				dataType : 'html',
				beforeSend: function(){},
				success: function(data) {
				  jQuery("#show_my_msg").html(data);
				}
			}); 
			return false;
		});		
	},
	cntctfrm_contact_form: function(e) {

		var form_email = jQuery('#emailNewsletter').val();

		if(form_email.length > 3)
		   {
		   if(isValidEmailAddress(form_email))
			  { jQuery('#emailNewsletter').css({ 'border' : '1px solid #7CC200' }); f_form_email = 1; }
			  else
			  { jQuery('#emailNewsletter').css({ 'border' : '1px solid #ff0000' }); f_form_email = 0; }
		   } else {
				jQuery('#emailNewsletter').css({ 'border' : '1px solid #ff0000' }); f_form_email = 0;
			}
			

		if(f_form_email == 1)
			{ jQuery('.login_form .input.submit input').removeAttr('disabled'); }
			else
			{
				e.preventDefault();
				jQuery('.login_form .input.submit input').attr('disabled', 'disabled');
			};

	}
}

/* home page scroll effect */
var hpScroll={
	grid_list:null,
	init:function(){
		var $this=this;
		$this.grid_list=jQuery('section[role="main"].images-container.home div.grid div');
		//if($this.grid_list.length > 0) { $this.first_post(); }

		if(!isMobileDev) {
			if(ieversion>0&&ieversion<=8) {
				$this.grid_list.each( function(i){
					jQuery(this).addClass('active');
					jQuery(this).css({ 'margin-top' : -jQuery(this).height() / 2 });
				});
			} else {
				$this.grid_list.each( function(i){
					jQuery(this).addClass('active');
					jQuery(this).css({ 'margin-top' : -jQuery(this).find('div').height() / 2 });
				}); 
	
				jQuery(window).scroll( function(){ return; //disable scrolling events
					/*scroll*/
					jQuery('section[role="main"].images-container.home div.grid').each( function(i){
						var $bgobj = jQuery(this);
						var bottom_of_object = jQuery(this).offset().top + jQuery(this).outerHeight();
						var bottom_of_window = jQuery(window).scrollTop() + jQuery(window).height();
						var scrollPos = jQuery(document).scrollTop();
						if($bgobj.position().top<=scrollPos+jQuery('nav[role="navigation"].main-menu').height()-10) {
							jQuery(this).find('div').addClass('active');
						} else {
							jQuery(this).find('div').removeClass('active');
						}
						jQuery(this).find('div').css({ 'margin-top' : -jQuery(this).find('div').height() / 2 });
					}); 
					/*scroll*/
				});
			}
		} else {
			
			/* NOT MARGIN TOP IN HOMEPAGE MOBILE */
			$this.grid_list.each( function(i){
				jQuery(this).addClass('active');
				//jQuery(this).css({ 'margin-top' : -jQuery(this).height() / 2 });
			});
		}
	},
	first_post:function() {
		var $this=this;
		setTimeout(function(){ $this.grid_list.first().addClass('active'); }, 2000);
	}
}
/* season landing pages */
var seasonLanding={
	logos:null,
	loaded:0,
	blocks:null,
	init:function(){
		var $this=this;
		$this.logos=jQuery('section.season_landing.images-container.home a.overlay-link div.overlay-logo-wrapper');
		$this.logos.each(function(index, element) {
			jQuery(element).waitForImages({
				waitForAll: true,
				finished: function(){
					$this.loaded++;
					if($this.loaded>=$this.logos.length){$this.centerLogo();}
				}
        	});
        });
		jQuery(window).resize(function(){$this.centerLogo();});
		if(isMobileDev){
			$this.bloks=jQuery('section.season_landing.images-container.home div.grid,section.season_landing.images-container.home div.wrap_six ul > div');
			$this.bloks.addClass('visibility_all');

			$this.bloks.bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
				var $block = jQuery(this);
				if (isInView){
					//$block.addClass('visibility_all');
					$block.find('.shadow').animate({opacity:1},600);
				}else{
					//$block.removeClass('visibility_all');
					$block.find('.shadow').animate({opacity:0},600);
				}
			});
		}
	},
	centerLogo:function(){
		var $this=this;
		$this.logos.each(function(i,logo) {
            var $logo=jQuery(logo);
			$logo.css('margin-top',-1*$logo.height()/2);
        });
	}
}

jQuery(window).resize(function() {

	var window_height = jQuery(window).height() / 2;	
	var window_top_margin = window_height / 2;

	jQuery('.videoplayer_wrap').css({ 'height' : window_height + 'px', 'margin-top' : window_top_margin + 'px' });

	/* news
		jQuery('ul.news_list li.first-image').css({ 'height' : jQuery('ul.news_list li + li').height() -1 + 'px' });
		jQuery('ul.news_list li.first-image img').css({ 'height' : jQuery('ul.news_list li + li img').height() + 'px' });
	*/
	
});

jQuery( window ).load(function() {

	if(isMobileDev) {

		/* NOT MARGIN TOP IN HOMEPAGE MOBILE */
		jQuery('section[role="main"].images-container.home div.grid div, section[role="main"].images-container.home li.grid div').each( function(i){
			jQuery(this).addClass('active');
		//	jQuery(this).css({ 'margin-top' : -jQuery(this).height() / 2});
		}); 

	}

	/* home page scroll effect */
	jQuery(window).scroll();
	/* home page scroll effect */

	/* news 
		jQuery('ul.news_list li.first-image').css({ 'height' : jQuery('ul.news_list li + li').height() -1 + 'px' });
		jQuery('ul.news_list li.first-image img').css({ 'height' : jQuery('ul.news_list li + li img').height() + 'px' });
	*/
	/* news */
	
}).trigger('resize');

jQuery(document).ready(function() {

	if(isMobileDev) { jQuery('html').addClass('mobileDev'); }
	if(isSmartPhone){ jQuery('html').addClass('smartPhoneDev'); }
	else if(isTablet){ jQuery('html').addClass('tabletDev'); }
	jwplayer.key="4sC1dWe6nX6MXRNKK2Xv/kgl3RhtQdkwVfeFKg==";
	jQuery.waitForImages.hasImgProperties = ['backgroundImage'];

	//popups.init();
	if(jQuery('body.home').length>0){ hpScroll.init();}
	if(jQuery('section.season_landing').length>0){seasonLanding.init();}
	
	//onYouTubeIframeAPIReady() function call newsPage.init() if video is a YT video
	//else we call newsPage.init() on document ready
	if(
		jQuery('#heroTop.video-player.type-self').length>0 ||
		jQuery('#heroTop.video-bg.type-self').length>0 ||
		jQuery('#heroTop.slider').length>0 ||
		jQuery('#heroTop.singleImage').length>0
	){
		newsPage.init();
	}
	if(jQuery('section#news_list').length>0){ newsLanding.init(); }
	
	/* NEW: homepage mobile */
	if(jQuery('section#section_hp').length>0 && isSmartPhone){ mobileHp.init(); }
	else{
		jQuery('section#section_hp .grid').attr('data-state','loaded');
	}
	
	if(jQuery('section#collection_grid_row').length>0){ gridRow.init(); }
	if(jQuery('section#collection_cover_page').length>0){ coverPage.init(); }
	
	if(jQuery('#gallery_MC_slider.main-block').length>0){
		if(typeof json_gallery!=='undefined'){
			picSlider.init(json_gallery,isSmartPhone,isTablet);
		}
	}
	
});

function pushUrl (reference , title) {
	if(history.pushState!=undefined && History.pushState!=undefined){
		if(title != '' && title != 'undefined'){
			History.pushState({state:1}, title, reference);
		} else {
			history.pushState({section:1}, "" , reference );
		}
	}
}

