(function($, doc) {
  'use strict';

  var app = (function() {
    return {
      init: function init() {
        this.companyInfo();
        this.getTableCars();
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
        var car = app.setCar();
        var $tableCar = $('[data-js="table-car"]').get();
        $tableCar.appendChild(app.createNewCar(car));
        app.insertCarOnServer();
        app.clearFormData();
      },

      insertCarOnServer: function insertCarOnServer() {
        var car = app.setCar();
        var ajax = new XMLHttpRequest();
        ajax.open('POST', 'http://localhost:3000/car', true);
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        ajax.send(
        'image=' + car.image +
        '&brandModel=' + car.brandModel +
        '&year=' + car.year +
        '&plate=' + car.plate +
        '&color=' + car.color
        );
      },

      getTableCars: function getTableCars() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'http://localhost:3000/car', true);
        ajax.send();
        ajax.addEventListener('readystatechange', this.updateTableCars, true);
      },

      updateTableCars: function updateTableCars() {
        if(app.isReady.call(this)) {
          var carList = JSON.parse(this.responseText);
          var $tableCar = $('[data-js="table-car"]').get();

          carList.forEach(function(car) {
              var $fragment = app.createNewCar(car);
              $tableCar.appendChild($fragment);
          });
        }
      },

      setCar: function setCars() {
        var car = {
          image: $('[data-js="image"]').get().value,
          brandModel: $('[data-js="brand-model"]').get().value,
          year: $('[data-js="year"]').get().value,
          plate: $('[data-js="plate"]').get().value,
          color: $('[data-js="color"]').get().value,
        };
        return car;
      },

      createNewCar: function createNewCar(car) {
        var $fragment = doc.createDocumentFragment();
        var $tr = doc.createElement('tr');
        var $tdImageCar = doc.createElement('td');
        var $imageCar = doc.createElement('img');
        var $brand = doc.createElement('td');
        var $tdYear = doc.createElement('td');
        var $tdPlate = doc.createElement('td');
        var $tdColor = doc.createElement('td');
        var $tdImgRemoveCar = doc.createElement('td');
        var $imgRemoveCar = doc.createElement('img');

        $imageCar.setAttribute('src', car.image);
        $tdImageCar.appendChild($imageCar);

        $imgRemoveCar.setAttribute('src', 'imagens/botao-remover.png');
        $imgRemoveCar.setAttribute('width', '50px');
        $imgRemoveCar.addEventListener('click', this.removeCar, false);
        $tdImgRemoveCar.appendChild($imgRemoveCar);

        $brand.textContent = car.brandModel;
        $tdYear.textContent = car.year;
        $tdPlate.textContent = car.plate;
        $tdColor.textContent = car.color;

        $tr.appendChild($imageCar);
        $tr.appendChild($brand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);
        $tr.appendChild($tdImgRemoveCar);

        return $fragment.appendChild($tr);
      },

      removeCar: function removeCar(e) {
        e.target.parentNode.parentNode.remove();
      },

      clearFormData: function clearFormData() {
        $('[data-js="imagem"]').get().value = ''
        $('[data-js="marca-modelo"]').get().value = '';
        $('[data-js="ano"]').get().value = '';
        $('[data-js="cor"]').get().value = '';
        $('[data-js="preco"]').get().value = '';
      }
    }
  })();

  app.init();
})(window.DOM, document);


//FALTA FAZER
//Arrumar duplicação na inserção.
//Arrumar o tamanho do botão remover pelo css
