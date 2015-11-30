
function get10GenresListForDecade(decade)
{
var mainGenreObj = [];	
	var top10GenreList = [];
	if (decade != "all")
	{
		d3.csv("data/genrelist.csv",function(dataset)
	                        {
	                        	dataset.forEach(function(d,i)
	                            {	
	                       			//For the given decade, pass the genre to fetch year by year score for the genre.
	    							var str =d['decade'];
	    							var res=str.split("-");
	    							if(res[0] == decade)
	    							{
	    								getScoreForGenre(d['genre']);
	    							}
	    						})
	                        })

		function getScoreForGenre(genre)
		{
		d3.csv("data/genrescore.csv",function(dataset1)
								{
									dataset1.forEach(function(d,i)
									{
										//If the genre matches, write into an object.
										if(d['genre'] == genre)
										{
											var temp = {};
											temp.year = d['year'];
										 	temp.genre = d['genre'];
										 	temp.score = d['score'];
											mainGenreObj.push(temp);

											//If the data for 10 genres is fetched, call the function to draw the timeline.
											if(mainGenreObj.length == 120)
											{
												//Call the function to draw the timeline
												console.log(mainGenreObj);
                                                cchart(mainGenreObj);
											}
										}
									})
								})
		}
	}
	else if (decade == "all")
	{
		d3.csv("data/genrescore.csv",function(dataset1)
							{
                                cchart(dataset1,"blue");
//								
                            });
    }	
	
}