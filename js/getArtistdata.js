function getArtistByDecade(year)
{
	year= +year;
	var endYear = year + 10;
	var getArtistByDecAdeartistNames = [];
	var getArtistByDecadeArtistId = [];

	var url = "http://developer.echonest.com/api/v4/artist/search?api_key=ZVJ0VUVPOV3DDMWA2&format=json&artist_start_year_before="+endYear+"&artist_end_year_after="+(year)+"&fuzzy_match=true&results=100&sort=familiarity-desc";
	$.ajax({
	url : url,
	async: false,
	success:function(data)
		{
			//The artist data for a particular decade
			var result = data.response.artists;
			for(i=0;i<result.length;i++)
			{
				getArtistByDecAdeartistNames.push(result[i].name);
				getArtistByDecadeArtistId.push(result[i].id);
			}
			//Call the auto search function
			console.log(getArtistByDecAdeartistNames);
		}
	});
}


function getArtistByGenre(genre)
{
	var getArtistByGenreNames = [];
	var getArtistByGenreId= [];
	var url = "http://developer.echonest.com/api/v4/artist/search?api_key=ZVJ0VUVPOV3DDMWA2&format=json&genre="+genre+"&results=100&sort=familiarity-desc";
	$.ajax({
	url : url,
	async: false,
	success:function(data)
		{
			//The artist data for a particular genre
			var result = data.response.artists;
			for(i=0;i<result.length;i++)
			{
				getArtistByGenreNames.push(result[i].name);
				getArtistByGenreId.push(result[i].id);
			}
			//Call the auto search function
			console.log(getArtistByGenreNames);
		}
	});	
}
