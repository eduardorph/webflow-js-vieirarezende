function remove_slide(Webflow){
	$(".home-banner-mask").find(".home-banner-slide.w-slide").each(function(index, el) {
		var slide = $(this);
		if ( slide.find(".w-dyn-empty").length ) {
			slide.remove();
			$(".slider-nav.w-slider-nav").find(".w-slider-dot").last().remove();
		}
	});

	// Recarrega o slide com a nova configuração
	Webflow.require('slider').redraw();
}
