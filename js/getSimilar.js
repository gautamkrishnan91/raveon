function getSimilarArtistByArtist(artist)
{
	var result = [];
	console.log("For "+ artist);
	var url = "http://developer.echonest.com/api/v4/artist/similar?api_key=ZVJ0VUVPOV3DDMWA2&name="+artist+"&format=json&bucket=familiarity&bucket=genre&bucket=hotttnesss&bucket=years_active&start=0&results=20";
	$.ajax({
	url : url,
	async: false,
	success:function(data)
		{
			//The similar artists data
			for(i=0;i<data.response.artists.length;i++)
			{
		
				result.push(data.response.artists[i].name);
			}
		}
	});
	while(artistNames.length != 0)
	{
		console.log(result.pop());
	}
}
function getSimilarArtistByGenre(Genre)
{
	var artistNames = [];
	var url = "http://developer.echonest.com/api/v4/genre/artists?api_key=ZVJ0VUVPOV3DDMWA2&format=json&results=15&bucket=hotttnesss&name="+Genre;
	$.ajax({
	url : url,
	async: false,
	success:function(data)
		{
			var result = data.response.artists;
			for(i=0;i<result.length;i++)
			{
				artistNames.push(data.response.artists[i].name);
			}
		}
	})

	while(artistNames.length != 0)
	{
		$("#showingRelated .dd-results").append("<li class='related-results'>"+artistNames.pop()+"</li>");
		console.log(artistNames.pop());
	}
}

function getSimilarGenreByGenre(genre)
{

			var similarGenre =[];
			var similarity = [];
	var url = "http://developer.echonest.com/api/v4/genre/similar?api_key=ZVJ0VUVPOV3DDMWA2&name="+genre+"&results=5";
	$.ajax({
	url : url,
	async: false,
	success:function(data)
		{
			//The similar genres data
			console.log(data);
			var result = data.response.genres;
			for(i=0;i<result.length;i++)
			{
				similarGenre.push(result[i].name);
				if(result[i].similarity)
				{similarity.push(result[i].similarity);}
				else
				{
					similarity.push("Unknown");
				}
			}
		},
		error: function(error)
		{
			console.log(error);
		}
	});	
	while(similarGenre.length != 0)
	{
		console.log(similarGenre.pop());
	}
}

function getGenreByArtist(artist)
{
	var genreList = [];
	var url = "http://developer.echonest.com/api/v4/artist/search?api_key=ZVJ0VUVPOV3DDMWA2&format=json&name="+artist+"&bucket=genre&results=1";
	$.ajax({
	url : url,
	async: false,
	success:function(data)
			{
				var result = data.response.artists[0];
				
				for(i=0;i<result.genres.length;i++)
				{
					genreList.push(result.genres[i].name);
				}
			}
		})

	while(genreList.length != 0)
	{
		$("#showingRelated .dd-results").append("<li class='related-results'>"+genreList.pop()+"</li>");
		console.log(genreList.pop());
	}
}


