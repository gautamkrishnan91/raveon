function getDataForFdg(preArtistListForFdg)
{
	var artistImagesFdg = [];
    console.log(preArtistListForFdg);
	for(i=0;i<preArtistListForFdg.length;i++)
	{
		var imageForFdgUrl = "https://api.spotify.com/v1/search?q="+preArtistListForFdg[i].artist+"&limit=1&type=artist";
		console.log(imageForFdgUrl);
    	$.ajax({
			url : imageForFdgUrl,
			async: false,
			success:function(imageForFdg)
				{

					var imageFdgResult = imageForFdg.artists.items[0];
					if(imageFdgResult)
					{
						if (imageFdgResult.images.length > 0)
						{if (imageFdgResult.images[3])
								artistImagesFdg.push(imageFdgResult.images[3].url);
								else
								artistImagesFdg.push("http://icons.iconarchive.com/icons/icons8/windows-8/512/Music-Dj-icon.png");
							
						}
						else
						{	
							artistImagesFdg.push("http://icons.iconarchive.com/icons/icons8/windows-8/512/Music-Dj-icon.png");
						}
					}
					else
							artistImagesFdg.push("http://icons.iconarchive.com/icons/icons8/windows-8/512/Music-Dj-icon.png");
				}
			})
	}
	console.log(artistImagesFdg);
	console.log(preArtistListForFdg[0].artist);
	var artistsForFdg = [];
	var genreOfArtist = [];
	for(i=0;i<preArtistListForFdg.length;i++)
	{
		//First get list of similar artists.
		fdgUrl = "http://developer.echonest.com/api/v4/artist/similar?api_key=ZVJ0VUVPOV3DDMWA2&name="+preArtistListForFdg[i].artist+"&format=json&results=20&start=0";
		$.ajax({
		url : fdgUrl,
		async: false,
		success:function(data)
			{
				var resultFdg = data.response.artists;
				//Fetch genre for each artist.
				genreUrlForFdg = "http://developer.echonest.com/api/v4/artist/search?api_key=ZVJ0VUVPOV3DDMWA2&format=json&name="+preArtistListForFdg[i].artist+"&results=1&bucket=genre";
				$.ajax({
						url : genreUrlForFdg,
						async: false,
						success :  function(genreData)
						{
							genreOfArtist.push(genreData.response.artists[0].genres[0].name);
						}
				})	
				
				//Compare the 20 similar artists for each artist in the list with the other artist.
				var counter = [];
				for(j=0;j<preArtistListForFdg.length;j++)
				{
					counter[i] = 0;
					
					for(k=0;k<resultFdg.length;k++)
					{
						//If there is a match, create a source,target,genre object for the FDG and push to the global array - artistsForFdg.
						if (preArtistListForFdg[j] == resultFdg[k].name)
						{
							var tempFdg = {};
							tempFdg.source = preArtistListForFdg[i].artist;
						 	tempFdg.target = preArtistListForFdg[j].artist;
						 	tempFdg.genre = genreOfArtist[i];
						 	tempFdg.linksource = artistImagesFdg[i];
						 	tempFdg.linktarget = artistImagesFdg[j];
							tempFdg.usersource = preArtistListForFdg[i].user;
                            tempFdg.usertarget = preArtistListForFdg[j].user;
                            artistsForFdg.push(tempFdg);
						    counter[i]++;
						}
					}
				}

				//Genre wise matching at the end. For each similar genre, create a link between the artists.
				if (i == preArtistListForFdg.length -1)
				{
					for(p=0;p<genreOfArtist.length;p++)
					{
						for(l=p;l<genreOfArtist.length;l++)
						{
							//In case of a match, create a source, target and genre ovject for the FDG and push to the global array - artistsForFdg.
							if (genreOfArtist[p] == genreOfArtist[l])
							{
								var tempFdg = {};
								tempFdg.source = preArtistListForFdg[p].artist;
							 	tempFdg.target = preArtistListForFdg[l].artist;
							 	tempFdg.genre = genreOfArtist[p];
							 	tempFdg.linksource = artistImagesFdg[p];
						 		tempFdg.linktarget = artistImagesFdg[l];
								tempFdg.usersource = preArtistListForFdg[p].user;
                                tempFdg.usertarget = preArtistListForFdg[l].user;
                                artistsForFdg.push(tempFdg);
							}
						}
					}
				}
			}
		})
	}
	
	//Call the function to draw the FDG here by passing the 'artistsForFdg' object.
	console.log(artistsForFdg);
    bafdg(artistsForFdg);
	//console.log(imageUrlForFdg);
}