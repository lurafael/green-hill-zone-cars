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
        var $tdImageCar = doc.createElement('td');
        var $imageCar = doc.createElement('img');
        var $brand = doc.createElement('td');
        var $tdYear = doc.createElement('td');
        var $tdColor = doc.createElement('td');
        var $tdPrice = doc.createElement('td');
        var $tdImgRemoveCar = doc.createElement('td');
        var $imgRemoveCar = doc.createElement('img');

        $imageCar.setAttribute('src', $('[data-js="imagem"]').get().value);
        $tdImageCar.appendChild($imageCar);

        $imgRemoveCar.setAttribute('src', 'imagens/botao-remover.png');
        $imgRemoveCar.setAttribute('width', '50px');
        $imgRemoveCar.addEventListener('click', this.removeCar, false);
        $tdImgRemoveCar.appendChild($imgRemoveCar);
        
        $brand.textContent = $('[data-js="marca-modelo"]').get().value;
        $tdYear.textContent = $('[data-js="ano"]').get().value;
        $tdColor.textContent = $('[data-js="cor"]').get().value;
        $tdPrice.textContent = $('[data-js="preco"]').get().value;

        $tr.appendChild($imageCar);
        $tr.appendChild($brand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdColor);
        $tr.appendChild($tdPrice);
        $tr.appendChild($tdImgRemoveCar);

        this.clearFormData();

        return $fragment.appendChild($tr);
      },
      
      removeCar: function removeCar(e) {
        e.target.parentNode.parentNode.remove();
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
