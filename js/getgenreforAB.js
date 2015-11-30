
var mainobj = [];
var tscore = [];
var tyear = [];
var tgenre = [];
var genreSize = 0;
//get the genre to draw
function pass(genreToDraw,user)
{
    mainobj = [];
    //alert(genreToDraw);
		for(year=1900;year<2020;year+=10)
		{
			genreDataForTimeline(year,genreToDraw,user);
		}
}	
//fetching the genre data using api calls
function genreDataForTimeline(year,genreToDraw,user)
{
    
	var artist100g = [];
	var hotttnesss = [];
	
	if (year < 1940)
	{
	var key = "ZVJ0VUVPOV3DDMWA2";
	} 
	else if (year > 1930 && year < 1980)
	{                                              //using multiple keys to get more calls
	var key = "2MGFAVYKMM2OG33KF";	
	}
	else
	{
	var key = "PW9MOAITCDMK9DOPW";
	}
	genreurl = 'http://developer.echonest.com/api/v4/artist/search?api_key='+key+'&format=json&artist_start_year_before='+year+'&bucket=familiarity&genre='+genreToDraw+'&results=100&sort=familiarity-desc';
	$.ajax({
	url : genreurl,
	async: true,
	success:function(data)  //fetching data for each genre
		{
			for(i=0;i<data.response.artists.length;i++)
			{
				artist100g.push(data.response.artists[i].id);
				hotttnesss.push(data.response.artists[i].familiarity);
			}
			var artist100 = [];
			url = 'http://developer.echonest.com/api/v4/artist/search?api_key='+key+'&format=json&artist_start_year_before='+year+'&bucket=familiarity&results=100&sort=familiarity-desc';
			$.ajax({
			url : url,
			async : true,
			success: function(data1)
			{
				var result = data1.response.artists;
				for(i=0;i<result.length;i++)
				{
					artist100.push(result[i].id);
				}
				var score = 0;
				for(i=0;i<artist100g.length;i++)
				{
					if(i==0)
						{score=0;}
					for(j=0;j<artist100.length;j++)
					{
						if (artist100g[i] == artist100[j])
						{
							score += 10;
							break;
						}
						else if(j == artist100.length-1)
						{
							if(hotttnesss[i] > 0.6)
							{
								score+=2;
							}
						}
					}
				}
				timelineinit(genreToDraw,year,score,user);
			}
			});
            
		},
		error: function(error)
		{
			console.log(error);
		}
	});
}
function timelineinit(genre,year,score,user)
{
    
	console.log(genre);
	var temp = {};
	temp.year = year;
 	temp.genre = genre;
 	temp.score = score/10;
 	temp.user = user;
	mainobj.push(temp);
    
    if(mainobj.length == 12)
    {
        //console.log("Calling chartinit"+mainobj);
        //calling the function
        chartinit(mainobj,"blue");
    }
}

