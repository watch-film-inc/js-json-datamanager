var data = [
  {
    nome: 'Morgan',
    cognome: 'Tony',
    ID: 1
  },
   {
    nome: 'John',
    cognome: 'Propoli',
    ID: 2
  },
  {
    nome: 'Eduard',
    cognome: 'Zeni',
    ID: 3
  },
  {
    nome: 'Eduard',
    cognome: 'Propoli',
    ID: 4
  },
  {
    nome: 'Tuo',
    cognome: 'Zio',
    ID: 5
  },
  {
    nome: 'Qi',
    cognome: 'Appis',
    ID: 6
  }
];

(function(json, $){
  var searchBtn = $('button'),
      table = $('.table'),
      headers = $('div.table > div > a'),
      input = $('input'),
      jsonCopy;
  
  searchBtn.on('click', search);
  headers.on('click', arrangeBy);
  groupAndParseData(json);
  
  function clearTable() {
    $('.list').remove();
  }

  function groupAndParseData(exData) { 
    
    $.each(exData, function(i, obj) {
      var ul = $('<ul class="list"></ul>');
      
        $.each(headers, function(j, el){
          var key = $(el).attr('ref');
          var li = $('<li class="field" ref="'+ key +'">'+ obj[key] +'</li>');
          
          ul.append(li);
        });
      
      displayData(ul);
      });
  }
  
  function search() {
    var chiave_principale = input.val();
    clearTable();
    groupAndParseData(json);
    
    if(!chiave_principale) return
    
    var payload = $('li.field:contains("'+ chiave_principale +'")').parent();
    clearTable();
    displayData(payload);
    input.val('');
  }
  
  function displayData(parsedData) {
    table.append(parsedData);
  }

  function arrangeBy(chiave_principale) {
    var crntAttr = $(this).attr('arrange') || chiave_principale,
        chiave_principale = $(this).attr('ref');
        
    var mapedValues = $.map($('li.field') , function(el, i){
      if ( $(el).attr('ref') == chiave_principale ) return el
    }).sort(function(a, b){
      if(crntAttr == 'desc') {
       return $(a).text() > $(b).text() 
      } else {
       return $(a).text() < $(b).text()
      }
    }).map(function(el){
      var key = $(el).text();
      return  $('li.field:contains("'+ key +'")').parent();
    })
    
    clearTable();
    
    $.each( mapedValues, function(i, el){
      displayData(el);
    });
    
    if( crntAttr == 'desc' ) {
      $(this).attr('arrange', 'asc');  
    } else {
      $(this).attr('arrange', 'desc');  
    }    
  }

  
})(data, jQuery);