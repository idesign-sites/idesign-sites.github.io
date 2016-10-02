    function initialize() {
        //получаем наш div куда будем карту добавлять
        var mapCanvas = document.getElementById('map_canvas');
        // задаем параметры карты
        var mapOptions = {
            //Это центр куда спозиционируется наша карта при загрузке
            center: new google.maps.LatLng(55.75393, 37.620795),
            //увеличение под которым будет карта, от 0 до 18
            // 0 - минимальное увеличение - карта мира
            // 18 - максимально детальный масштаб
            zoom: 15, 
            //Тип карты - обычная дорожная карта
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        //Инициализируем карту
        var map = new google.maps.Map(mapCanvas, mapOptions);
     
        //Объявляем массив с нашими местами и маркерами
        var markers = [],
            myPlaces = [];
        //Добавляем места в массив
        myPlaces.push(new Place('Киев', 55.75393,37.620795, 'Столица Украины'));
        
     
        //Теперь добавим маркеры для каждого места
        for (var i = 0, n = myPlaces.length; i < n; i++) {
            var marker = new google.maps.Marker({
                //расположение на карте
                position: new google.maps.LatLng(myPlaces[i].latitude, myPlaces[i].longitude),
                map: map,
                //То что мы увидим при наведении мышкой на маркер
                title: myPlaces[i].name
            });
            //Добавим попап, который будет появляться при клике на маркер
            var infowindow = new google.maps.InfoWindow({
                content: '<h1>' + myPlaces[i].name + '</h1><br/>' + myPlaces[i].description
            });
            //привязываем попап к маркеру на карте
            makeInfoWindowEvent(map, infowindow, marker);
            markers.push(marker);
        }
    }
    function makeInfoWindowEvent(map, infowindow, marker) {
        //Привязываем событие КЛИК к маркеру
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
    }
    //Это класс для удобного манипулирования местами
    function Place(name, latitude, longitude, description){
        this.name = name;  // название
        this.latitude = latitude;  // широта
        this.longitude = longitude;  // долгота
        this.description = description;  // описание места
    }
    //Когда документ загружен полностью - запускаем инициализацию карты.
    google.maps.event.addDomListener(window, 'load', initialize);
