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
		console.log(mapOptions.center);
        var windowWidth = $(window).width();
        if(windowWidth <= 1080) {
            map.setZoom(13);
			console.log(mapOptions.center);
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
	console.log(i);
	markers[i].boolTest === true;
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

	

//Sets the markers on the map within the initialize function
    //Sets the infoWindows to each individual marker
    //The markers are inidividually set using a for loop
function setMarkers(location) {
	var myCenter = new google.maps.LatLng(13.067439, 80.237617);
	
	var mapProp= {
		center:myCenter,
		zoom:13,
		mapTypeControl: false,
		disableDefaultUI: true
	};
	var map=new google.maps.Map(document.getElementById("map-canvas"),mapProp);
	
	var infowindow = new google.maps.InfoWindow();
	
    for(i=0; i<location.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(location[i].lat, location[i].lng),
          map: map,
          title: location[i].title,
		  img:location[i].img,
		  streetAddress:location[i].streetAddress,
		  cityAddress:location[i].cityAddress,
		  url:location[i].url,
		  id:location[i].id,
		  boolTest:location[i].boolTest,
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
		markersArray.push(marker);
		console.log(markersArray);

		marker.setMap(map);
		marker.addListener('click',infoWindow);		

		var searchNav = $('#nav' + i);
		console.log(searchNav);
        searchNav.click(searchNavv);
		
    }
	
	
	
	function searchNavv(){
		console.log(this);
		console.log(this.id);
		console.log("Yenna Panrathu");
		var str = this.id;
		console.log(str.substring(3,4));
		var id = str.substring(3,4);
		console.log(location[id]);
		var marker = new google.maps.Marker({
          position: new google.maps.LatLng(location[id].lat, location[id].lng),
          map: map,
          title: location[id].title,
		  img:location[id].img,
		  streetAddress:location[id].streetAddress,
		  cityAddress:location[id].cityAddress,
		  url:location[id].url,
		  boolTest:location[id].boolTest,
		  id:location[id].id,
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
		marker.setMap(map);
		marker.addListener('click',infoWindow);
		var contentString= '<img src="' + location[id].img + 
                                    '" alt="Street View Image of ' + location[id].title + '" class="img-pop" /><br><hr style="margin-bottom: 5px"><strong>' + 
                                    location[id].title + '</strong><br><p>' + 
                                    location[id].streetAddress + '<br>' + 
                                    location[id].cityAddress + '<br></p><a class="web-links" href="' + location[id].url + 
                                    '" target="_blank">' + location[id].url + '</a>';
		infowindow.setContent(contentString);
		infowindow.open(map,marker);
		map.setCenter(marker.getPosition());
		location[id].boolTest = true;
		infowindow.addListener('closeclick',function(){
			infowindow.marker=null;
		});		
	}
	
	function infoWindow(){
		marker = this ;
		if(infowindow.marker !=marker){
			infowindow.marker=marker;
			var contentString= '<img src="' + marker.img + 
                                    '" alt="Street View Image of ' + marker.title + '" class="img-pop" /><br><hr style="margin-bottom: 5px"><strong>' + 
                                    marker.title + '</strong><br><p>' + 
                                    marker.streetAddress + '<br>' + 
                                    marker.cityAddress + '<br></p><a class="web-links" href="' + marker.url + 
                                    '" target="_blank">' + marker.url + '</a>';
			infowindow.setContent(contentString);
			infowindow.open(map,marker);
			marker.boolTest = true;
			infowindow.addListener('closeclick',function(){
				infowindow.marker=null;
			});
		}
	}
	
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
	console.log(marker);
    if (marker.title.toLowerCase().indexOf(search) >= 0) {
            marker.boolTest = true;
            return marker.visible(true);
        }else {
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
