function orderSelect($element) {
    var options   = $element.find('option').not(':eq(0)'),
        n_options = options.length,
        temp = [],
        parts,
        i;

    for(i = n_options; i --;) {
        temp[i] = options[i].text + "<<<>>>" + options[i].value ; 
    }

    temp.sort();

    for(i = n_options; i --;) {
        parts = temp[i].split('<<<>>>');

        options[i].text  = parts[0];
        options[i].value = parts[1]; 
    }
}

function pega_campos_select(id_select, url){
    console.log("ajax 1");
    var id = id_select.attr('id');

    $.ajax({
        url: url,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        type: 'GET',
        cache: true,
        beforeSend: function() {},
        success: function(data, textStatus) {
            if(data.length > 0){
                window.sessionStorage.setItem(id, JSON.stringify(data));
            }
        },
        error: function(xhr, er) {
            console.log('Error ' + xhr.status + ' - ' + xhr.statusText + ' - Tipo de erro: ' + er);
        },
        complete: function() {
            popula_options(id_select);
        }
    });
}

function cria_classes(url, tipo){
    console.log("ajax 2");
    $.ajax({
        url: url,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        type: 'GET',
        cache: true,
        beforeSend: function() {},
        success: function(data, textStatus) {
            if(data.length > 0){
                window.sessionStorage.setItem('data_equipe', JSON.stringify(data));
            }
        },
        error: function(xhr, er) {
            console.log('Error ' + xhr.status + ' - ' + xhr.statusText + ' - Tipo de erro: ' + er);
        },
        complete: function() {
            add_classe_bios(tipo);
        }
    });
}

function trata_json(el, slug){
    var data_equipe = JSON.parse(window.sessionStorage.getItem('data_equipe'));

    var atuacoes = [];
    var escritorios = [];
    var cargo = [];

    for (var i = 0; i < data_equipe.length; i++) {
        if(data_equipe[i].slug == slug){

            if (data_equipe[i]["areas-de-atuacao-2"]) {
                atuacoes = data_equipe[i]["areas-de-atuacao-2"];
            }

            if (data_equipe[i].escritorios) {
                escritorios = data_equipe[i].escritorios;
            }

            if (data_equipe[i].posicao) {
                cargo = data_equipe[i].posicao;
            }

            el.addClass(data_equipe[i].slug);
            el.addClass(atuacoes.join(" "));
            el.addClass(escritorios.join(" "));
            el.addClass(cargo);
            break;
        }
    }
}

function trata_json_en(el, slug){
    var data_equipe = JSON.parse(window.sessionStorage.getItem('data_equipe'));

    var atuacoes = [];
    var escritorios = [];
    var cargo = [];

    for (var i = 0; i < data_equipe.length; i++) {
        if(data_equipe[i].slug == slug){

            if (data_equipe[i]["practice-areas"]) {
                atuacoes = data_equipe[i]["practice-areas"];
            }

            if (data_equipe[i].escritorios) {
                escritorios = data_equipe[i].escritorios;
            }

            if (data_equipe[i].position) {
                cargo = data_equipe[i].position;
            }

            el.addClass(data_equipe[i].slug);
            el.addClass(atuacoes.join(" "));
            el.addClass(escritorios.join(" "));
            el.addClass(cargo);
            break;
        }
    }
}

function popula_options(id_select){
    var id = id_select.attr('id');

    var data = JSON.parse(window.sessionStorage.getItem(id));

    for (var i = 0; i < data.length; i++) {
        if (data[i]._archived || data[i]._draft) {continue;}
        id_select.append('<option value="' + data[i]._id + '">' + data[i].name + '</option>');
    }

    orderSelect(id_select);
}


function add_classe_bios(tipo){
    $(".slug-bio").closest('.bios-in-practice').each(function(index, el) {
        var elemento_posicao = $(this).find('.posicao-single');
        
        switch (tipo) {
          case 'pt':
            trata_json($(this), $(this).find(".slug-bio").text());
            break;
          default:
            trata_json_en($(this), $(this).find(".slug-bio").text());
        }
    });
}

var qsRegex;
var filterValue_filtro_por_cidade;
var filterValue_filtro_por_atuacao;
var filterValue_filtro_por_posicao;

var $isotope_el = $(".flex-bios").isotope({
  itemSelector: ".bios-in-practice",
  layoutMode: "fitRows",
  percentPosition: true,
  getSortData: {
    posicao_profissional: function( itemElem ) {
      var posicao = $( itemElem ).find('.data-posicao-int:not(.w-condition-invisible)').text();
      console.log(posicao);
      return parseFloat( posicao );
    },
    nome_profissional: '.titulo-bio-card'
  },
  sortBy: [ 'posicao_profissional', 'nome_profissional' ],
  filter: function() {
    var $this = $(this);
    var searchResult = qsRegex ? $this.text().match(qsRegex) : true;
    var selectResultCidade = filterValue_filtro_por_cidade ? $this.is("."+filterValue_filtro_por_cidade) : true;
    var selectResultAtuacao = filterValue_filtro_por_atuacao ? $this.is("."+filterValue_filtro_por_atuacao) : true;
    var selectResultPosicao = filterValue_filtro_por_posicao ? $this.is("."+filterValue_filtro_por_posicao) : true;
    return searchResult && selectResultCidade && selectResultAtuacao && selectResultPosicao;
  }
});
