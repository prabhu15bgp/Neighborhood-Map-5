var map;
var markersArray = [];

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3' +
      '&key=AIzaSyBYHmxuzSa3rXlAbc8aon40KtQxvrmVayE&callback=init';
  document.body.appendChild(script);
}
window.onload = loadScript;

//Initialize the map and its contents
function init() {  
    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(13.067439, 80.237617),
        mapTypeControl: false,
        disableDefaultUI: true
    };
    if($(window).width() <= 1080) {
        mapOptions.zoom = 13;
    }
    if ($(window).width() < 850 || $(window).height() < 595) {
        hideNav();
    }

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);  

    setMarkers(markers);

    setAllMap();

    //Reset map on click handler and
    //when window resize conditionals are met
    function resetMap() {
        var windowWidth = $(window).width();
        if(windowWidth <= 1080) {
            map.setZoom(13);
            map.setCenter(mapOptions.center);
        } else if(windowWidth > 1080) {
            map.setZoom(14);
            map.setCenter(mapOptions.center);   
        }
    }
    $("#reset").click(function() {
        resetMap();
    });
   $(window).resize(function() {
        resetMap();
    }); 
}

//Determines if markers should be visible.
//This function is passed in the knockout viewModel function.
function setAllMap() {
  for (var i = 0; i < markers.length; i++) {
    if(markers[i].boolTest === true) {
    markers[i].holdMarker.setMap(map);
    } else {
    markers[i].holdMarker.setMap(null);
    }
  }
}

//Information about the different locations
//Provides information for the markers
var markers = [
    {   
    title:"The Forum Vijaya Mall",
	lat:13.0497,
	lng:80.2095,
	img:"img/1.png",
    streetAddress: "183, Arcot Road, NSK Salai, Vadapalani,",
    cityAddress: "Chennai, Tamil Nadu - 600026",
    url: "http://forummalls.in/forum-vijaya/getting-here/",
    id: "nav0",
    visible: ko.observable(true),
    boolTest: true
    },
    {   
    title:"Abirami Mega Mall",
	lat:13.0860,
	lng:80.2481,
	img:"img/2.jpg",
    streetAddress: "152, Purasaiwakkam High Road,",
    cityAddress: "Chennai, Tamil Nadu 600010",
    url: "http://www.abirami.in/",
    id: "nav1",
    visible: ko.observable(true),
    boolTest: true
    },
    {   
    title:"Spenser Plaza",
	lat:13.0614,
	lng:80.2614,
	img:"img/3.jpg",
    streetAddress: "769 Mount Road, Anna Salai, Triplicane,",
    cityAddress: "Chennai, Tamil Nadu 600002",
    url: "http://spencerplaza.com/",
    id: "nav2",
    visible: ko.observable(true),
    boolTest: true
    },
    {   
    title:"Express Avenue",
	lat:13.0586,
	lng:80.2646,
	img:"img/4.jpg",
    streetAddress: "No. 2 , Club House Road,, Royapettah,",
    cityAddress: " Chennai, Tamil Nadu 600002",
    url: "http://expressavenue.in/",
    id: "nav3",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title:"Phoneix Market City",
	lat:12.9923,
	lng:80.2170,
	img:"img/5.jpg",
    streetAddress: "142, Velachery Main Road, Velachery,",
    cityAddress: "Chennai, Tamil Nadu 600042",
    url: "https://www.phoenixmarketcity.com/",
    id: "nav4",
    visible: ko.observable(true),
    boolTest: true
    }
];

//Get Google Street View Image for each inidividual marker
    //Passed lat and lng to get each image location
    //Had to pass title for whitehouse & different lat and lng to get images
    //for White House and Capitol
var headingImageView = [5, 235, 55, 170, 190, 240, -10, 10, 190];     
var streetViewImage;
var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=180x90&location=';

function determineImage() {
    if (i === 3) {
        streetViewImage = streetViewUrl + '13.067439, 80.237617&fov=75&heading=' + headingImageView[i] + '&pitch=10';                 
    } else if (i === 4) {
        streetViewImage = streetViewUrl +
                        markers[i].streetAddress + ',' + markers[i].cityAddress +
                        '&fov=75&heading=' + headingImageView[i] + '&pitch=10';
    } else {
       streetViewImage = streetViewUrl +
                        markers[i].lat + ',' + markers[i].lng +
                        '&fov=75&heading=' + headingImageView[i] + '&pitch=10'; 
                    }                   
}

	

//Sets the markers on the map within the initialize function
    //Sets the infoWindows to each individual marker
    //The markers are inidividually set using a for loop
function setMarkers(location) {
	
    
    for(i=0; i<location.length; i++) {
        location[i].holdMarker = new google.maps.Marker({
          position: new google.maps.LatLng(location[i].lat, location[i].lng),
          map: map,
          title: location[i].title,
          icon: {
            url: 'img/marker.png',
            size: new google.maps.Size(25, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(12.5, 40)
            },
          shape: {
            coords: [1,25,-40,-25,1],
            type: 'poly'
          }  
        });

        //function to place google street view images within info windows
        determineImage();

        //Binds infoWindow content to each marker
        location[i].contentString = '<img src="' + location[i].img + 
                                    '" alt="Street View Image of ' + location[i].title + '" class="img-pop" /><br><hr style="margin-bottom: 5px"><strong>' + 
                                    location[i].title + '</strong><br><p>' + 
                                    location[i].streetAddress + '<br>' + 
                                    location[i].cityAddress + '<br></p><a class="web-links" href="http://' + location[i].url + 
                                    '" target="_blank">' + location[i].url + '</a>';

        var infowindow = new google.maps.InfoWindow({
            content: markers[i].contentString
        });
		var y = location[i].contentString; 
		var z = location[i].picBoolTest;
		var mark = location[i].holdMarker;
        //Click marker to view infoWindow
            //zoom in and center location on click
        new google.maps.event.addListener(location[i].holdMarker, 'click', (function(marker, i) {
          return function() {
			console.log(marker);
			console.log(location[i].contentString);
			console.log(map);
			console.log(marker.getPosition());
			console.log(location[i].picBoolTest);
            infowindow.setContent(location[i].contentString);
            infowindow.open(map,this);
            var windowWidth = $(window).width();
            if(windowWidth <= 1080) {
                map.setZoom(14);
            } else if(windowWidth > 1080) {
                map.setZoom(16);  
            }
            map.setCenter(marker.getPosition());
            location[i].picBoolTest = true;
			console.log(location[i].picBoolTest);
          }; 
        })(location[i].holdMarker, i));
   
        //Click nav element to view infoWindow
            //zoom in and center location on click
        var searchNav = $('#nav' + i);
        searchNav.click((function(marker, i) {
          return function() {
			console.log(marker);
			console.log(location[i].contentString);
			console.log(map);
			console.log(marker.getPosition());
			console.log(location[i].picBoolTest);
            infowindow.setContent(location[i].contentString);
            infowindow.open(map,marker);
            map.setZoom(16);
            map.setCenter(marker.getPosition());
			console.log(marker.getPosition());
            location[i].picBoolTest = true;
          }; 
        })(location[i].holdMarker, i));
    }
	
	console.log(marker);
	
}

//Query through the different locations from nav bar with knockout.js
    //only display markers and nav elements that match query result
var viewModel = {
    query: ko.observable(''),
};

viewModel.markers = ko.dependentObservable(function() {
    var self = this;
    var search = self.query().toLowerCase();
    return ko.utils.arrayFilter(markers, function(marker) {
    if (marker.title.toLowerCase().indexOf(search) >= 0) {
            marker.boolTest = true;
            return marker.visible(true);
        } else {
            marker.boolTest = false;
            setAllMap();
            return marker.visible(false);
        }
    });       
}, viewModel);

ko.applyBindings(viewModel);

//show $ hide markers in sync with nav
$("#input").keyup(function() {
setAllMap();
});

//Hide and Show entire Nav/Search Bar on click
// Hide/Show Bound to the arrow button
//Nav is repsonsive to smaller screen sizes
var isNavVisible = true;
function noNav() {
    $("#search-nav").animate({
                height: 0, 
            }, 500);
            setTimeout(function() {
                $("#search-nav").hide();
            }, 500);    
            $("#arrow").attr("src", "img/down-arrow.gif");
            isNavVisible = false;
}
function yesNav() {
    $("#search-nav").show();
            var scrollerHeight = $("#scroller").height() + 55;
            if($(window).height() < 600) {
                $("#search-nav").animate({
                    height: scrollerHeight - 100,
                }, 500, function() {
                    $(this).css('height','auto').css("max-height", 439);
                });  
            } else {
            $("#search-nav").animate({
                height: scrollerHeight,
            }, 500, function() {
                $(this).css('height','auto').css("max-height", 549);
            });
            }
            $("#arrow").attr("src", "img/up-arrow.gif");
            isNavVisible = true;
}

function hideNav() {
    if(isNavVisible === true) {
            noNav();
            
    } else {
            yesNav();  
    }
}
$("#arrow").click(hideNav);

//Hide Nav if screen width is resized to < 850 or height < 595
//Show Nav if screen is resized to >= 850 or height is >= 595
    //Function is run when window is resized
$(window).resize(function() {
    var windowWidth = $(window).width();
    if ($(window).width() < 850 && isNavVisible === true) {
            noNav();
        } else if($(window).height() < 595 && isNavVisible === true) {
            noNav();
        }
    if ($(window).width() >= 850 && isNavVisible === false) {
            if($(window).height() > 595) {
                yesNav();
            }
        } else if($(window).height() >= 595 && isNavVisible === false) {
            if($(window).width() > 850) {
                yesNav();
            }     
        }    
});

//Expand .forecast div on click to see Weather Underground forecast
//and shrink back when additionally clicked
    //size is repsonsive to smaller screens
var weatherContainer = $("#weather-image-container");
var isWeatherVisible = false;
weatherContainer.click(function() {
    if(isWeatherVisible === false) {
        if($(window).width() < 670) {
            $(".forecast li").css("display", "block");
            weatherContainer.animate({
                width: "245"
            }, 500);
        } else {
            $(".forecast li").css("display", "inline-block");
            weatherContainer.animate({
                width: "380"
            }, 500);
        }
        isWeatherVisible = true;
    } else {
        weatherContainer.animate({
        width: "80"
    }, 500);
        isWeatherVisible = false;
    }
});
