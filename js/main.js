(function($, doc) {
  'use strict';

  var app = (function() {
    var tbody = $('[data-js="table-car"]').get();

    return {
      init: function init() {
        this.companyInfo();
        this.initEvents();
      },

      companyInfo: function companyInfo() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'json/company.json');
        ajax.send();
        ajax.addEventListener('readystatechange', this.getCompanyInfo, true);
      },

      getCompanyInfo: function getCompanyInfo() {
        if(app.isReady.call(this)) {
          var data = JSON.parse(this.responseText);
          $('[data-js="company-name"]').get().textContent = data.name;
          $('[data-js="company-phone"]').get().textContent = data.phone;
        }
      },

      isReady: function isReady() {
        return this.readyState === 4 && this.status === 200;
      },

      initEvents: function initEvents() {
        $('[data-js="main-form"]').on('submit', this.handleSubmitForm);
      },

      handleSubmitForm: function handleSubmitForm(e) {
        event.preventDefault(e);
        var $tableCar = $('[data-js="table-car"]').get();
        $tableCar.appendChild(app.createNewCar());
      },

      createNewCar: function createNewCar() {
        var $fragment = doc.createDocumentFragment();
        var $tr = doc.createElement('tr');
        var $tdImagem = doc.createElement('td');
        var $imagem = doc.createElement('img');
        var $tdMarcaModelo = doc.createElement('td');
        var $tdAno = doc.createElement('td');
        var $tdCor = doc.createElement('td');
        var $tdPreco = doc.createElement('td');
        var $tdImgRemoverCarro = doc.createElement('td');
        var $imgRemoverCarro = doc.createElement('img');

        $imagem.setAttribute('src', $('[data-js="imagem"]').get().value);
        $tdImagem.appendChild($imagem);

        $imgRemoverCarro.setAttribute('car-id', this.totalCars());
        $imgRemoverCarro.setAttribute('src', 'imagens/botao-remover.png');
        $imgRemoverCarro.setAttribute('width', '50px');
        $imgRemoverCarro.addEventListener('click', this.removeCar, false);
        $tdImgRemoverCarro.appendChild($imgRemoverCarro);
        
        $tdMarcaModelo.textContent = $('[data-js="marca-modelo"]').get().value;
        $tdAno.textContent = $('[data-js="ano"]').get().value;
        $tdCor.textContent = $('[data-js="cor"]').get().value;
        $tdPreco.textContent = $('[data-js="preco"]').get().value;

        $tr.appendChild($tdImagem);
        $tr.appendChild($tdMarcaModelo);
        $tr.appendChild($tdAno);
        $tr.appendChild($tdCor);
        $tr.appendChild($tdPreco);
        $tr.appendChild($tdImgRemoverCarro);

        this.clearFormData();
        return $fragment.appendChild($tr);
      },
      
      removeCar: function removeCar(e) {
        var target = e.target;
        var removeTr = target.parentNode.parentNode;
        
        if(target.hasAttribute('car-id')) {
          tbody.removeChild(removeTr);
        }
      },

      totalCars: function totalCars() {
        return tbody.children.length;
      },

      clearFormData: function clearFormData() {
        $('[data-js="marca-modelo"]').get().value = '';
        $('[data-js="ano"]').get().value = '';
        $('[data-js="cor"]').get().value = '';
        $('[data-js="preco"]').get().value = '';
      }
    }
  })();

  app.init();
})(window.DOM, document);
