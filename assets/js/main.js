/*
	Transitive by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight(),
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); $header.addClass('reveal'); }
				});

			}

		// Banner.

			if ($banner.length > 0) {

				// IE fix.
					if (skel.vars.IEVersion < 12) {

						$window.on('resize', function() {

							var wh = $window.height() * 0.60,
								bh = $banner.height();

							$banner.css('height', 'auto');

							window.setTimeout(function() {

								if (bh < wh)
									$banner.css('height', wh + 'px');

							}, 0);

						});

						$window.on('load', function() {
							$window.triggerHandler('resize');
						});

					}

				// Video check.
					var video = $banner.data('video');

					if (video)
						$window.on('load.banner', function() {

							// Disable banner load event (so it doesn't fire again).
								$window.off('load.banner');

							// Append video if supported.
								if (!skel.vars.mobile
								&&	!skel.breakpoint('large').active
								&&	skel.vars.IEVersion > 9)
									$banner.append('<video autoplay loop><source src="' + video + '.mp4" type="video/mp4" /><source src="' + video + '.webm" type="video/webm" /></video>');

						});

				// More button.
					$banner.find('.more')
						.addClass('scrolly');

			}

		// Scrolly.
			if ( $( ".scrolly" ).length ) {

				var $height = $('#header').height() * 0.95;

				$('.scrolly').scrolly({
					offset: $height
				});
			}

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right'
				});

	});

})(jQuery);
document.addEventListener('DOMContentLoaded', function() {
    var section = document.querySelector('#banner');
    var videoSrc = section.getAttribute('data-video');
    var videoFormats = ['mp4', 'webm'];

    videoFormats.forEach(function(format) {
        var video = document.createElement('video');
        video.src = videoSrc + '.' + format;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.style.position = 'absolute';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.zIndex = '-1';
        section.appendChild(video);
    });
});

/*sample*/
const gemstoneDropdown = document.getElementById('gemstone-dropdown');
    let previouslyHighlightedItem = null;

    gemstoneDropdown.addEventListener('change', function() {
        const selectedClass = this.value;
        
        // Remove highlight class from all items
        document.querySelectorAll('.gem-item').forEach(item => {
            item.classList.remove('pop-out');
            item.style.zIndex = ''; // Reset z-index
        });
        
        // Scroll to the selected item
        const targetElement = document.querySelector(`.${selectedClass}`);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            targetElement.classList.add('pop-out');
            targetElement.style.zIndex = '10'; // Ensure it appears above other items
            previouslyHighlightedItem = targetElement;
        }
    });

    document.querySelectorAll('.gem-item').forEach(item => {
        item.addEventListener('mouseover', function() {
            if (previouslyHighlightedItem && previouslyHighlightedItem !== this) {
                previouslyHighlightedItem.classList.remove('pop-out');
                previouslyHighlightedItem.style.zIndex = '';
            }
            this.classList.add('pop-out');
            this.style.zIndex = '10'; // Ensure it appears above other items
        });

        item.addEventListener('mouseout', function() {
            this.classList.remove('pop-out');
            this.style.zIndex = ''; // Reset z-index
        });
    });