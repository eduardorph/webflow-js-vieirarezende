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

function esconder_vazio_cms(parent_el){
	var el = $(parent_el);

	if ( el.find(".w-dyn-empty").length ) {
		el.find(".w-dyn-empty").closest(parent_el).hide();
	}
}

function esconder_vazio(parent_el){
	var par_el = $(parent_el);
	var el = par_el.children().not(':eq(0)');
	var p = 0;

	el.each(function(index, elemento) {
		var elem = $(this);
		if(elem.hasClass('w-condition-invisible')){
			p++;
		}
	});

	if (p !== 0) {
		el.closest(parent_el).css('display', 'none');
	}
}
