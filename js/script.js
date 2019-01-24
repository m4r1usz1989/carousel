'use strict';
(function(){ 

// mustache

var slide = document.getElementById('slide').innerHTML;
var mainCarousel = document.querySelector('.main-carousel');
var slideItem = '';

Mustache.parse(slide);

for (var i = 0; i < data.length; i++) {
	slideItem += Mustache.render(slide, data[i]);
}

mainCarousel.insertAdjacentHTML('beforeend', slideItem);


var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true,
  pageDots: false,
  hash: true,
});

var progressBar = document.querySelector('.progress-bar')
flkty.on( 'scroll', function( progress ) {
  progress = Math.max( 0, Math.min( 1, progress ) );
  progressBar.style.width = progress * 100 + '%';
});

var restart = document.getElementById('restart');
restart.addEventListener('click', function (){
	flkty.select(0);
});


// google map
	window.initMap = function() {
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 6,
			center: data[0].coords
		});

		var markers = [];

		for (var i = 0; i < data.length; i++) {
			// dodawanie markera
			markers[i] = new google.maps.Marker({
				position: data[i].coords,
				map: map
			});
			// dodawanie klikacza
			markers[i].addListener('click', (function (i) {
    			return function () {
        			flkty.selectCell(i);
    			}
			})(i));
		}
		flkty.on('change', function(i){
			map.panTo(data[i].coords);
			map.setZoom(8);
		});
	}
})();