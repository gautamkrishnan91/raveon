function getArtistDataForTimeline(artistName,user)
{
	var objToPass = [];
	artistTimelineUrl = "http://developer.echonest.com/api/v4/artist/search?api_key=ZVJ0VUVPOV3DDMWA2&format=json&name="+artistName+"&bucket=hotttnesss&bucket=years_active&bucket=hotttnesss_rank&results=1";
	$.ajax({
			url : artistTimelineUrl,
			async: false,
			success:function(artistData)
				{
					var result = artistData.response.artists[0];
					
					console.log(artistData);
					var temp = {};
					temp.name = artistName;
					if(result.years_active[0])
					{
						if(result.years_active[0].start)
							temp.start_year = result.years_active[0].start;
						else
							temp.start_year = 1900;
						
						if (result.years_active[0].end)
						{
							temp.end_year = result.years_active[0].end;
						}
						else
						{
						temp.end_year = 2020;	
						}
					}

					temp.hotttnesss = result.hotttnesss;
                    temp.id = result.id;
                    temp.user=user;
					objToPass.push(temp);
				}
			})
	console.log(objToPass);
    artinit(objToPass,"blue");
}