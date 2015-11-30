function getDataForPopup(artistName)
{
	var urlForPopup = "http://developer.echonest.com/api/v4/artist/search?api_key=ZVJ0VUVPOV3DDMWA2&format=json&name="+artistName+"&bucket=hotttnesss&bucket=genre&bucket=hotttnesss_rank&bucket=artist_location&bucket=urls&bucket=years_active&results=1";
	var urlForSong = "http://developer.echonest.com/api/v4/artist/songs?api_key=ZVJ0VUVPOV3DDMWA2&name="+artistName+"&format=json&start=0&results=100";
	$.ajax({
	url : urlForPopup,
	async: true,
	success:function(data)
		{
			var result = data.response.artists[0];
			
			//Basic artsit details fetch -  Name,ID,Hotttnesss,Familiarity
			if(result.name)
			{
				artistPopupName = result.name;	
			}
			artistPopupId = result.id;
			artistPopupHotttnesss = result.hotttnesss;
			//Active years fetch
			if (result.years_active[0])
			{
				artistPopupStartYear = result.years_active[0].start;
				if(result.years_active[0].end)
				{
					artistPopupEndYear = result.years_active[0].end;
				}
				else
				{
					artistPopupEndYear = "Present";
				}
			}	
			else
			{
				artistPopupStartYear = "NA";
				artistPopupEndYear = "NA";
			}
			
			//Location fetch
			if(!result.artist_location)
            {
	            artistPopupLocation = "Unknown";	
            }
            else
            {
            	artistPopupLocation = result.artist_location.location;
            }

            //Genre fetch
            var artistPopupGenre = [];
           	for(k=0;k<result.genres.length;k++)
           	{
           		$(".artist-genre").append("<li>"+result.genres[k].name+"</li>");
               	// artistPopupGenre.push(result.genres[k].name);
            }

            //Fetching image for pop up.
            var imageUrl = "https://api.spotify.com/v1/search?q="+artistName+"&limit=1&type=artist";
        	$.ajax({
				url : imageUrl,
				async: false,
				success:function(imagedataforpopup)
					{
						var imageResult = imagedataforpopup.artists.items[0];
						if(imageResult)
						{
							if (imageResult.images.length > 0)
							{
								// console.log(imageResult.images[0].url);
								artistPopupImage = imageResult.images[0].url;
							}
							else
							{	
								artistPopupImage = "http://icons.iconarchive.com/icons/icons8/windows-8/512/Music-Dj-icon.png";
							}
						}
						else
								artistPopupImage = "http://icons.iconarchive.com/icons/icons8/windows-8/512/Music-Dj-icon.png";

					},
				error: function(error)
					{
						alert(error);	
					} 
				});

        		//URL fetch
        		if(!result.urls)
	            {
	            	artistPopupUrl = "Unavailable";
	            }
	            else if (result.urls.official_url)
	            {
	            	artistPopupUrl = result.urls.official_url;
	            }
	            else if (result.urls.wikipedia_url)
	            {
	            	artistPopupUrl = (result.urls.wikipedia_url);    
	            }
	            else if (result.urls.myspace_url)
	            {
	            	artistPopupUrl = (result.urls.myspace_url);    
	            }
	            else if (result.urls.lastfm_url)
	            {
	            	artistPopupUrl = (result.urls.lastfm_url);    
	            }
	            else if (result.urls.mb_url)
	            {
	            	artistPopupUrl = (result.urls.mb_url);    
	            }
	            $(".artist-rating").html("");
	            $(".list-container").html("");
	            $(".artist-name").html(artistPopupName);
	            $(".artist-image img").attr("src",artistPopupImage);
	            $(".artist-popup img").attr("src",artistPopupImage);
	            $(".location").html(artistPopupLocation);
	            $(".year").html(artistPopupStartYear+" - "+artistPopupEndYear);
	            var rating = Math.round(artistPopupHotttnesss * 5);
	            for(var i=0; i<5; i++){
	            	if(rating>i){
	            		$(".artist-rating").append("<li class='starred'></li>");
	            	}
	            	else{
	            		$(".artist-rating").append("<li></li>");
	            	}
	            }
	            getTracks(artistPopupName);
		}


	})
}
$("#simArtists").click(function(){
	$(".list-container").html("");
	var value = $(".artist-name").html();
	getSimilarArtist(value);
});
$("#songList").click(function(){
	$(".list-container").html("");
	var value = $(".artist-name").html();
	getTracks(value);
});
$("#video").click(function(){
	var value = $(".artist-name").html();
	getVideoURL(value);
});
function getSimilarArtist(name)
{
    var result = [];
    var url = "http://developer.echonest.com/api/v4/artist/similar?api_key=ZVJ0VUVPOV3DDMWA2&name="+name+"&format=json&bucket=familiarity&bucket=genre&bucket=hotttnesss&bucket=years_active&start=0&results=20";
    $.ajax({
    url : url,
    async: false,
    success:function(data)
        {
            //The similar artists data
            for(i=0;i<data.response.artists.length;i++)
            {
            	$(".list-container").append("<li>"+data.response.artists[i].name+"</li>");
            	console.log(data.response.artists[i].name);
                result.push(data.response.artists[i].name);
            }
        }
    });
}
function getVideoURL(name){
	//Video Fetch
	$(".video-container").html("");
 	var videoUrl = "http://developer.echonest.com/api/v4/artist/video?api_key=ZVJ0VUVPOV3DDMWA2&name="+name+"&format=json&results=1&start=0";
    $.ajax({
    url : videoUrl,
    async: false,
    success:function(videoforartist)
        {
            if (videoforartist.response.total > 0 )
            {
            var resultVideo =  videoforartist.response.video;
            artistPopupVideoUrl = resultVideo[0].url;
            console.log(artistPopupVideoUrl);
            $(".video-container").append("<iframe frameborder='0' width='840' height='300' src='"+artistPopupVideoUrl+"' allowfullscreen></iframe>");
            }
            else
            {
                artistPopupVideoUrl = "Unknown";
            }
        }
    })    
}
function getTracks(name){               
    //Artist tracks.
    var tracksUrl = "http://developer.echonest.com/api/v4/artist/songs?api_key=ZVJ0VUVPOV3DDMWA2&name="+name+"&format=json&start=0&results=20";
    $.ajax({
    url : tracksUrl,
    async: false,
    success:function(songsforartist)
            {
                if (songsforartist.response.total > 0 )
                {
                var resultTrack =  songsforartist.response.songs;
                for(i=0;i<resultTrack.length ;i++)
                    {
                    	$(".list-container").append("<li>"+resultTrack[i].title+"</li>");
                        // artistTrackList.push(resultTrack[i].title);
                    }    
                }
                else
                {
                    // artistTrackList.push("Unknown");
                }
            }
        })
}