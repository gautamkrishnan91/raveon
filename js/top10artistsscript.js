// var map = L.map('map').setView([38.8833,-97.0167], 8);
// var hdat=null;
// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
// zoom:18,
// // center: [30.8833, -97.0167],
// id: 'mapbox.dark',
// continuousWorld: 'false',
// noWrap: 'false',
// color: 'Green',
// fillColor: '#009900'
// }).addTo(map);

markerLayerTop10=L.layerGroup([]);
var markerListTop10 = [];
var top10ArtistOnMap = [];
          

//To plot a particular artist on the map     
function plotArtistOnMap(lat,lng,imageURL,artistName,artistURL,artistGenre,artistHotttnesss,artistID)
{
    imageURL="./artist_images/"+imageURL;
        var myIcon = L.divIcon({
        iconUrl: imageURL,      
        iconSize: [50, 50],
        iconAnchor: [19, 37],
        html : "<span id="+artistID+"> <img src = '"+imageURL+"' width = '50' height = '50'></span>"
        });
        
        var marker = L.marker([0, 0],{icon: myIcon}); 
        // console.log(artistHotttnesss);
        var markerprev = L.latLng(lng,lat);
        var markerL = marker.setLatLng(markerprev);
        markerListTop10.push(markerL);
        top10ArtistOnMap.push(artistName);
        
        marker.addTo(markerLayerTop10);
        markerLayerTop10.addTo(map);
        
        var popupContent = '<img src="' + imageURL + '" width="100" height="60"/>' +'<a target="_blank" class="popup" href="'+artistURL+'"></br> Artist Page' +                           
                                            '</a>'+'<p><b>'+'<br/>Artist: '+artistName +'<br/>Genre: '+artistGenre+'<br/>Location : '+artistURL+
                                             '<br/>Hotttnesss: ' + artistHotttnesss;

        // var popupContent =  '<a target="_blank" class="popup" href="'+artistURL+'"></br> Artist Page' +                           
        //                 '</a>'+'<p><b>'+'<br/>Artist: '+artistName+'<br/>Genre(s): '+artistGenre+'</b></p>';
        
        marker.bindPopup(popupContent,
        {
        closeButton: true,
        minWidth: 320
        });
}

//To highlight a particular artist on the map
function highlightTop10(artistToHighlight)
{
    for(i=0;i<top10ArtistOnMap.length;i++)
    {
        if(artistToHighlight == top10ArtistOnMap[i])
        {
            markerListTop10[i].openPopup();
            break;
        }
    }
}

//Get data about the artist
function getArtistData()
{
    d3.csv("./data/AllTop10.csv",type,function(error,data)
            {
                if (error)
                {
                    console.log("An error boss!");
                    console.log(error);
                }
                else
                {
                    d3.csv("./data/AllTop10.csv",function(dataset)
                        {
                            dataset.forEach(function(d,i)
                            {
                                 d['lng'] = +d['lng'];
                                 d['lat'] = +d['lat'];
                                 d['Hotttnesss']=+d['Hotttnesss'];
                                 
                                genre = (d['Primary_Genre']+","+d['Genre2']+","+d['Genre3']);
                                plotArtistOnMap(d['lat'],d['lng'],d['ImageUrl'],d['Name'],d['Url'],genre,d['Hotttnesss'],d['ID']);
                                
                            })
                            console.log(markerListTop10);
                            console.log(markerLayerTop10);
                        })
                }
            }
    )
}

// $(document).ready(function(){
//    getArtistData();
//     });

function type(d)
{
    d.lng = + d.lng;
    d.lat = + d.lat;
    d.Hotttnesss=+d.Hotttnesss;
}               