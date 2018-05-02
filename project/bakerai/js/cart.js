$(window).load(function(){
	var numOrdersDOM = $('.quantity-orders-item'); // циферка в значке заказов
	var numOrders = 0;
	var orders = {};
	var qntyDOM = $('#qnty');
	var sumDOM = $('#sum');
	var priceDOM = $('#price');
	var ordersTableDOM = $('#orders');
	var totalDOM = $('#total');
	var total_w_discountDOM = $('#total-w-discount');
	var item = $('#item').val();
	var pic = $('#pic img').attr('src');
	var title = $('#title').text();
	var storageKey = 'bakerai_orders';

	// Кол-во заказов 
	var updateNumOrders = function(){   // работа с значком отображения кол-ва заказов
		var orderKeys = [];  // будущий массив заказов
		var orders = JSON.parse(window.localStorage.getItem(storageKey));
		if(orders === null){                 // ничего не было заказано
			orders = {};                     // 
			window.localStorage.setItem(storageKey, JSON.stringify({}));  	// преобразует строку JS в сторку JSON
			numOrders = 0;													//
		}
		else {                               // если ордер есть
			orderKeys = Object.keys(orders); // то ordersKeys получает массив из заказаного товара
			numOrders = orderKeys.length;    // записываем кол-во заказаных товаров 
		}
		if(numOrders > 0)
			numOrdersDOM.text(numOrders).parent().show();  // показываем и скрываем кол-во заказов
		else
			numOrdersDOM.parent().hide();
	}


	var updateTable = function(){
		var orderKeys = []; // будущий массив заказов
		var orders = JSON.parse(window.localStorage.getItem(storageKey));
		if(orders === null) // ничего не было заказано
			orders = {};
			orderKeys = Object.keys(orders);

		if(ordersTableDOM.length > 0){
			if(orderKeys.length > 0){
				ordersTableDOM.html('');
				orderKeys.forEach(function(key){
					var strTr = '<tr id="' + key + '" class="cart-product">' +
								'  <td><img src="' + orders[key].pic + '" alt="" class="img-responsive"></td>' +
								'  <td data-label="Код"><span>#389</span></td>' +
								'  <td data-label="Наименование"><span>' + orders[key].title + '</span></td>' +
								'  <td data-label="Кол-во">' +
								'    <input type="text" placeholder="Введите кол-во" class="t-bg-input qnty" value="' + orders[key].qnty + '">' +
								'  </td>' +
								'  <td data-label="Цена"><span class="price">' + orders[key].price + ' руб</span></td>' +
								'  <td data-label="Итог"> ' +
								'    <div class="rezult t-bg-input">' + (orders[key].price * orders[key].qnty) + ' руб</div>' +
								'  </td>' +
								'  <td><span class="remove-order hidden-xs"></span>' +
								'    <div class="btn-fram btn-fram-red visible-xs">' +
								'      <a href="/" title="" class="btn-bb btn-red icon-close-table remove-order">' +
								'          Удалить' +
								'      </a>' +
								'    </div>' +
								'  </td>' +
								'</tr>';
					ordersTableDOM.append(strTr);
					updateTotal();
				});
			}
			else {
				ordersTableDOM.html('<tr><td colspan="6">Корзина пуста</td></tr>');
			}
		}
	}

	var updateTotal = function(){
		if(totalDOM.length > 0 && total_w_discountDOM.length > 0){
			var productSums = ordersTableDOM.find('.cart-product .rezult');
			var total = 0;
			productSums.each(function(i, e){
				total += parseFloat(/\d+/.exec($(e).text())[0]);
			});
			totalDOM.text(total + 'Р');
			if(total > 5000)
				total_w_discountDOM.text(total*0.95 + 'Р');
			else
				total_w_discountDOM.text(total + 'Р');
		}
	}
	var displayMessage = function(msg){
		var content = $('<div class="box-modal" id="exampleModal"><div class="box-modal_close arcticmodal-close">закрыть</div>' + msg + '</div>');
		$.arcticmodal({
			type: 'html',
			content: content
		});
	}

	if(storageAvailable('localStorage')){
		updateNumOrders();
		updateTable();
		updateTotal();
	}
	else {

	}

	$(qntyDOM).on('input', function(){
		var sum = parseFloat(qntyDOM.val()) * parseFloat(priceDOM.text());
		if(isNaN(sum))
			sum = 0;
		sumDOM.text(sum + ' руб');
	});


	// записываем в localStorage данные о заказаных товарах
	$('#cart_add').click(function(e){
		var orders = JSON.parse(window.localStorage.getItem(storageKey));
		if(orders == null)
			orders = {};
		e.preventDefault();
		if(qntyDOM.val() > 0){
			if(storageAvailable('localStorage')){
				if(orders[item] !== undefined){
					orders[item].qnty += parseInt(qntyDOM.val());
				}
				else {
					orders[item] = {};
					orders[item].qnty = parseInt(qntyDOM.val());
					orders[item].price = parseFloat(priceDOM.text());
					orders[item].pic = pic;
					orders[item].title = title;
					numOrdersDOM.show().text(parseInt(numOrdersDOM.text()) + 1);
				}
				window.localStorage.setItem(storageKey, JSON.stringify(orders));
				updateNumOrders();
			}
			displayMessage('<div class="alert alert-success">Товар успешно добавлен в корзину. Количество: ' + orders[item].qnty + '.</div>');
		}
		else {
			displayMessage('<div class="alert alert-danger">Вы не указали количество товара!</div>');
		}
	});

	ordersTableDOM.on('input', '.qnty', function(){
		var $this = $(this);
		var product = $this.parents('.cart-product');
		var key = product.attr('id');
		var qnty = parseInt($this.val());
		var result = product.find('.rezult');
		var orders = JSON.parse(window.localStorage.getItem(storageKey));
		if(orders == null)
			orders = {};
		if(isNaN(qnty))
			qnty = 0;
		result.text((qnty * orders[key].price) + ' руб');
		orders[key].qnty = qnty;
		window.localStorage.setItem(storageKey, JSON.stringify(orders));
		updateTotal();
	});

   // Удаление товара
	ordersTableDOM.on('click', '.remove-order', function(e){
		e.preventDefault();
		var product = $(this).parents('.cart-product');
		var key = product.attr('id');
		var orders = JSON.parse(window.localStorage.getItem(storageKey));
		if(orders == null)
			orders = {};
		delete orders[key];
		if(Object.keys(orders).length == 0){
			numOrdersDOM.parent().hide();
			ordersTableDOM.html('<tr><td colspan="6">Корзина пуста</td></tr>');
		}
		else
			numOrdersDOM.text(Object.keys(orders).length);
		window.localStorage.setItem(storageKey, JSON.stringify(orders));
		product.remove();
		updateTotal();
	});

	window.addEventListener('storage', function(e) {
		var numOrders = 0;
		if(e.key == storageKey){
			numOrders = Object.keys(JSON.parse(e.newValue)).length;
			numOrdersDOM.text(numOrders);
			if(numOrders == 0)
				numOrdersDOM.parent().hide();
			else
				numOrdersDOM.parent().show();
			updateTable();
			updateTotal();
		}
	});

	$('#order').click(function(e){
		e.preventDefault();
		var data = {};
		var orders = JSON.parse(window.localStorage.getItem(storageKey));
		data.orders = orders;
		data.firstname = $('input[name=firstname]').val();
		data.lastname = $('input[name=lastname]').val();
		data.tel = $('input[name=tel]').val();
		data.email = $('input[name=email]').val();
		data.code = $('input[name=code]').val();
		data.ajax = 'Y';
		$.ajax({
			method: 'POST',
			url: document.location.href,
			dataType: 'json',
			data: data,
			success: function(response){
				if(response.status == 'ok'){
					displayMessage('<div class="alert alert-success">' + response.msg + '</div>');
					window.localStorage.setItem(storageKey, '{}');
					updateNumOrders();
					updateTable();
					updateTotal();
					$('input[name=firstname]').val('');
					$('input[name=lastname]').val('');
					$('input[name=tel]').val('');
					$('input[name=email]').val('');
					$('input[name=code]').val('');
				}
				else {
					displayMessage('<div class="alert alert-danger">' + response.errorMsg + '</div>');
				}
			}
		});
	});

	function storageAvailable(type) {
		try {
			var storage = window[type],
				x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		}
		catch(e) {
			return false;
		}
	}
});