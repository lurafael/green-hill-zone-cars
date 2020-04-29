(function($, doc) {
  'use strict';

  var app = (function() {
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

        $imagem.setAttribute('src', $('[data-js="imagem"]').get().value);
        $tdImagem.appendChild($imagem);

        $tdMarcaModelo.textContent = $('[data-js="marca-modelo"]').get().value;
        $tdAno.textContent = $('[data-js="ano"]').get().value;
        $tdCor.textContent = $('[data-js="cor"]').get().value;
        $tdPreco.textContent = $('[data-js="preco"]').get().value;

        $tr.appendChild($tdImagem);
        $tr.appendChild($tdMarcaModelo);
        $tr.appendChild($tdAno);
        $tr.appendChild($tdCor);
        $tr.appendChild($tdPreco);

        return $fragment.appendChild($tr);
      }
    }
  })();

  app.init();
})(window.DOM, document);
