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
	var el_count = el.length;

	el.each(function(index, elemento) {
		var elem = $(this);
		if(elem.hasClass('w-condition-invisible')){
			p++;
		}
	});

	if (p == el_count) {
		el.closest(parent_el).css('display', 'none');
	}

	console.log(p);
	console.log(el_count);
}

function getParameterFromUrlByName( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return false;
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function traducoes(){
	$('.post-data-txt.date-lang-pt').each(function(){
	  var mapObj = {
	     Jan:"Jan",
	     Feb:"Fev",
	     Mar:"Mar",
	     Apr:"Abr",
	     May:"Mai",
	     Jun:"Jun",
	     Jul:"Jul",
	     Aug:"Ago",
	     Sep:"Set",
	     Oct:"Out",
	     Nov:"Nov",
	     Dec:"Dez"

	  };
	  newText = $(this).text().replace(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/i, function(matched){
	    return mapObj[matched];
	  });

	  $(this).text(newText);
	});

	$('.data-mob.date-lang-pt').each(function(){
	  var mapObj = {
	     January:"Janeiro",
	     February:"Fevereiro",
	     March:"Março",
	     April:"Abril",
	     May:"Maio",
	     June:"Junho",
	     July:"Julho",
	     August:"Agosto",
	     September:"Setembro",
	     October:"Outubro",
	     November:"Novembro",
	     December:"Dezembro"

	  };
	  newText = $(this).text().replace(/January|February|March|April|May|June|July|August|September|October|November|December/i, function(matched){
	    return mapObj[matched];
	  });

	  $(this).text(newText);
	});
}

function generos(classe){

	$(classe).each(function(){
	  var mapObj = {
	     "Sócio":"Sócia",
	     "Associado":"Associada",
	     "Consultor":"Consultora"
	  };
	  newText = $(this).text().replace(/Sócio|Associado|Consultora/i, function(matched){
	    return mapObj[matched];
	  });

	  $(this).text(newText);
	});
}
