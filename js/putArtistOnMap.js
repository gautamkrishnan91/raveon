
var map = L.map('map').setView([40.8833,-10], 4);  
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
            maxZoom: 18,
            id: 'mapbox.light',
           continuousWorld: 'true',
           noWrap: 'true',
           color: 'Green',
    fillColor: '#009900'
        }).addTo(map);

    	 markerLayer=L.layerGroup([]);

	var artistOnMapName;
	var artistOnMapId;
	var artistOnMapGenre;
	var artistOnMapHotttnesss;
	var artistOnMapFamiliarity;
	var artistOnMapLocation;
	var artistOnMapStartYear;
	var artistOnMapEndYear;
	var artistOnMapImage;
	var artistListOnMap = [];
	var markerList = [];

function putArtistOnMap(artistName, user)
{	var url = "http://developer.echonest.com/api/v4/artist/search?api_key=ZVJ0VUVPOV3DDMWA2&format=json&name="+artistName+"&bucket=hotttnesss&bucket=images&bucket=genre&bucket=urls&bucket=familiarity&bucket=artist_location&bucket=years_active&results=1";
	$.ajax({
	url : url,
	async: true,
	success:function(data)
		{
			var result = data.response.artists[0];
			console.log(data);
			//Basic artsit details fetch -  Name,ID,Hotttnesss,Familiarity
			if(result.name)
			{
				artistOnMapName = result.name;	
			}
			artistOnMapId = result.id;
			//getSimilarArtist(artistOnMapId);
			artistOnMapHotttnesss = result.hotttnesss;
			artistOnMapFamiliarity = result.familiarity;
			
			//Active years fetch
			if (result.years_active[0])
			{
				artistOnMapStartYear = result.years_active[0].start;
				if(result.years_active[0].end)
				{
					artistOnMapEndYear = result.years_active[0].end;
				}
				else
				{
					artistOnMapEndYear = "-";
				}
			}	
			else
			{
				artistOnMapStartYear = "NA";
				artistOnMapEndYear = "-";
			}

			//Location fetch
			if(!result.artist_location)
            {
	            artistOnMapLocation = "Unknown";	
            }
            else
            {
            	artistOnMapLocation = result.artist_location.location;
            }
            console.log(artistOnMapLocation);

            //Genre fetch
            var dummygenre;
            for(k=0;k<result.genres.length;k++)
            {
            	if(k==0)
	            {
	            	dummygenre = (result.genres[k].name);
	            }
	            else
	            	dummygenre+=(","+result.genres[k].name);
	        }
            artistOnMapGenre = dummygenre;

            //Image fetch
        	//Using spotify
        	var imageUrl = "https://api.spotify.com/v1/search?q="+artistName+"&limit=1&type=artist";
        	$.ajax({
				url : imageUrl,
				async: false,
				success:function(imagedata)
					{
						var imageResult = imagedata.artists.items[0];
						if(imageResult)
						{
							if (imageResult.images.length > 0)
							{
								if (imageResult.images[0])
								artistOnMapImage = imageResult.images[0].url;
								else
								artistOnMapImage = "http://icons.iconarchive.com/icons/icons8/windows-8/512/Music-Dj-icon.png";	
							}
							else
							{	
								artistOnMapImage = "http://icons.iconarchive.com/icons/icons8/windows-8/512/Music-Dj-icon.png";
							}
						}
						else
								artistOnMapImage = "http://icons.iconarchive.com/icons/icons8/windows-8/512/Music-Dj-icon.png";
					},
				error: function(error)
					{
						alert(error);	
					} 
				});


        	//URL fetch
        	if(!result.urls)
            {
            	artistOnMapUrl = "Unavailable";
            }
            else if (result.urls.official_url)
            {
            	artistOnMapUrl = result.urls.official_url;
            }
            else if (result.urls.wikipedia_url)
            {
            	artistOnMapUrl = (result.urls.wikipedia_url);    
            }
            else if (result.urls.myspace_url)
            {
            	artistOnMapUrl = (result.urls.myspace_url);    
            }
            else if (result.urls.lastfm_url)
            {
            	artistOnMapUrl = (result.urls.lastfm_url);    
            }
            else if (result.urls.mb_url)
            {
            	artistOnMapUrl = (result.urls.mb_url);    
            }

	     	var locationurl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+artistOnMapLocation+'.json?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ';
		 	$.ajax({
		        url : locationurl,  
	             async: false,
	             success : function(data) 
	            		{
	            			locationOnMap = data.features[0].center;
							//Divicon is used to enable dynamic styling to the icons in case of highlighting.
							var markerClass;
							if(user==1){
								markerClass = "mapmarker1";
							}
							else if(user==2){
								markerClass = "mapmarker2";
							}
							var myIcon = L.divIcon({
        						iconSize: [40,40],
						        iconAnchor: [19, 37],
						       //Styling needed here.
						        html : "<span id="+artistOnMapId+" name = "+artistOnMapName+"> <img src = '"+artistOnMapImage+"' width = '40' height = '40' class='"+markerClass+"'style='border-radius: 50%'></span>"
						         });
							console.log(myIcon);
							if (artistOnMapLocation == "Unknown")
							{
								locationOnMap = ["0.0000","-60.0000"];
							}

							//Marker is created. 
					      	var marker = L.marker([0, 0],{icon: myIcon}); 
							var lng=+locationOnMap[0]
							var lat=+locationOnMap[1];
							var mapMarker = L.latLng(lat,lng);
							var markerL = marker.setLatLng(mapMarker);
							
							//This is done to maintain a list of markers on the map to enable removing individually.
							markerList.push(markerL);
							artistListOnMap.push(artistName);
							
							marker.addTo(markerLayer);
							markerLayer.addTo(map);
							map.setView(mapMarker);
							if (artistOnMapEndYear == "-")
							{
								if (artistOnMapStartYear == "NA")
								{
								var popupContent = '<img src="' + artistOnMapImage + '" width="100" height="60"/>' +'<a target="_blank" class="popup" href="'+artistOnMapUrl+'"></br> Artist Page' +                           
					                        '</a>'+'<p><b>'+'<br/>Artist: '+artistOnMapName +'<br/>Genre: '+artistOnMapGenre+'<br/>Location : '+artistOnMapLocation+
					                         '<br/>Hotttnesss: ' + artistOnMapHotttnesss + '<br/>Familiarity: ' + artistOnMapFamiliarity;		
								}
								else
								{
								var popupContent = '<img src="' + artistOnMapImage + '" width="100" height="60"/>' +'<a target="_blank" class="popup" href="'+artistOnMapUrl+'"></br> Artist Page' +                           
					                        '</a>'+'<p><b>'+'<br/>Artist: '+artistOnMapName +'<br/>Genre: '+artistOnMapGenre+'<br/>Location : '+artistOnMapLocation+'<br/>Career started in : '+artistOnMapStartYear+
					                         '<br/>Hotttnesss: ' + artistOnMapHotttnesss + '<br/>Familiarity: ' + artistOnMapFamiliarity;			
					            }
					        }
					        
					        else
					        {
					        	var popupContent = '<img src="' + artistOnMapImage + '" width="100" height="60"/>' +'<a target="_blank" class="popup" href="'+artistOnMapUrl+'"></br> Artist Page' +                           
					                        '</a>'+'<p><b>'+'<br/>Artist: '+artistOnMapName +'<br/>Genre: '+artistOnMapGenre+'<br/>Location : '+artistOnMapLocation+'<br/>Career span from : '+artistOnMapStartYear+' to '+ artistOnMapEndYear +
					                         '<br/>Hotttnesss: ' + artistOnMapHotttnesss + '<br/>Familiarity: ' + artistOnMapFamiliarity;			
					        }
						    marker.bindPopup(popupContent,{
						        closeButton: true,
						        minWidth: 320
						    });

						    console.log(markerList);
						    console.log(artistListOnMap);
						}
				});
									 if(markerList.length == 2)
									 			zoomToArtist("Pitbull");	
		},
		error:function(error)
		{
			alert("Please check the artist's name");
		}
	});
}

//To remove a particular artist from the map
function removeArtistFromMap(artistNameToRemove)
{
	// alert(artistNameToRemove);
    for(w=0;w<artistListOnMap.length;w++)
	{
		if(artistListOnMap[w] == artistNameToRemove)
		{
			
						if( w == (artistListOnMap.length -1))
			{
			console.log(artistNameToRemove,artistListOnMap[w],w,artistListOnMap.length-1);	
				markerLayer.removeLayer(markerList[w]);
					artistListOnMap.pop();	
				markerList.pop();
				break;
			}
			else
			{	
			markerLayer.removeLayer(markerList[w]);
			var tempArtist = artistListOnMap[artistListOnMap.length-1];
			artistListOnMap[artistListOnMap.length-1]=artistListOnMap[w];
			artistListOnMap[w]=tempArtist;
			artistListOnMap.pop();
			var tempMarker = markerList[markerList.length-1];
			markerList[markerList.length-1]=markerList[w];
			markerList[w]=tempMarker;
			markerList.pop();
			console.log(markerList);
			console.log(artistListOnMap);
			break;
			}
		}
	}
}

//Zoom into the given artist.
function zoomToArtist(artistToZoom)
{
	// alert("To highlight "+artistToZoom);
	for(i=0;i<artistListOnMap.length;i++)
	{
		if(artistListOnMap[i] == artistToZoom)
		{
			if(markerList[i]._latlng)
			{
				map.setView(markerList[i]._latlng);
				markerList[i].openPopup();
			}
		}
	}
}

//To highlight some artist individually.
function highlightArtistOnMap(artistToHighlight)
{
	alert(artistToHighlight);
    $('span').removeClass('selectedMarker');
    $("#"+artistToHighlight).addClass('selectedMarker');
}