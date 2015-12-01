var globalMyMix = [];

function mymixappend(mymix_name,user,callback,mymixtype)
{
		//Check if the newly added artist or genre is already present in My mix
	for(i=0;i<globalMyMix.length;i++)
	{
		console.log("here");
		if(mymix_name==globalMyMix[i].name && globalMyMix[i].user==user)
		{
			
			return false;
		}
			
	}
	var status=true;
	if(mymixtype=="genre")
	{
		var booli=true;
		$.ajax({
		url : "http://developer.echonest.com/api/v4/genre/profile?api_key=2MGFAVYKMM2OG33KF&name="+mymix_name+"&bucket=description",
		async: false,
		success:function(data)
			{
				console.log(data.response.genres.length);
				if(data.response.genres.length==0)  				//This line returns false if there is no matching genres for the given mymix_name
					booli= false;
				
			}
		});
	if(booli)
		{
			$.ajax({
			url : "http://developer.echonest.com/api/v4/genre/artists?api_key=2MGFAVYKMM2OG33KF&format=json&results=3&name="+mymix_name,
			async: true,
			success:function(data){addTopArtistFromGenre(data,user);}});

			buildGlobalMyMix(null,mymix_name,user,mymixtype,status);  // build Mymix global variable if the genre exists
			return true;

			
		}
		
		else
			return false;
	}
	
	
	
	if(mymixtype=="artist")
	{
		var artistID_URL="http://developer.echonest.com/api/v4/artist/search?api_key=2MGFAVYKMM2OG33KF&name="+mymix_name;
		var artistID ;
		var booli=false;

		$.ajax({
		url : artistID_URL,
		async: false,
		success:function(data)
			{
				
				if(data.response.artists.length!=0)  				//This line returns false if there is no matching artist for the 
				{
					booli=true;
					callback(data,mymix_name,user,mymixtype,status);
				}
			}
		});

		if(booli)
			return true;
		else
			return false;

	}
	
	//add_to_map(artist_name,artistID);
	

}

function addTopArtistFromGenre(artistsData,user)
{
	console.log(artistsData);
					for(i=0;i<artistsData.response.artists.length;i++)
					{
						
							

						    var valueuser = "user"+user;
						    var value = artistsData.response.artists[i].name;
						    var type = "artist";
						    
						   
						        $("#"+valueuser+" .mix-list").append("<li><input type='checkbox' class='checkbox' checked><a>"+value+"</a>&nbsp;<span>("+type+")</span><div class='delete'></div></li>");
						        $("#my-input").val("");
						        $("#my-input").focus();
						   
						   
						
					}
					

							mymixappend(artistsData.response.artists[0].name,user,buildGlobalMyMix,"artist");
							mymixappend(artistsData.response.artists[1].name,user,buildGlobalMyMix,"artist");
							mymixappend(artistsData.response.artists[2].name,user,buildGlobalMyMix,"artist");
					
				
}

function buildGlobalMyMix(artist_data,mymix_name,user,mymixtype,status)
{
	var artistID;
	var mymixobject;
	if(artist_data!=null)
	{
		for(i=0;i<artist_data.response.artists.length;i++)
			{
				//console.log(data.response.artists[i].name);
					if(artist_data.response.artists[i].name==mymix_name)
					{
						artistID=artist_data.response.artists[i].id;
						
					}
			}
	}

	else
	{
		artistID=null;
	}
	

			mymixobject={"name":mymix_name,"type":mymixtype,"user":user,"ID":artistID,"status":status};
			globalMyMix.push(mymixobject);
		

	//Plot the new entry in mymix on the map
	if(mymixtype=="artist")
	{
		var fdgArtist=[];
		var artist_user;
		putArtistOnMap(mymix_name,user);
		for(i=0;i<globalMyMix.length;i++)
		{
			console.log(globalMyMix);
			if(globalMyMix[i].type=="artist")
			{
				// artist_user.artist=globalMyMix[i].name;
				// artist_user.user=globalMyMix[i].user;
				 artist_user={"artist":globalMyMix[i].name,"user":globalMyMix[i].user};
				 fdgArtist.push(artist_user);
				 artist_user=null;
			}
		}
		console.log(fdgArtist);
		getDataForFdg(fdgArtist);
		getArtistDataForTimeline(mymix_name,user);
	}
	if(mymixtype=="genre")
	{
      pass(mymix_name,user)
	}
//genreTimeLineData(mymix_name)



}

function myMixDelete(mymix_name,user)
{
	var fdgArtist=[];
	var artist_user;
	var removeAt;
	console.log(globalMyMix);
	for(ij=0;ij<globalMyMix.length;ij++)
	{
		if(globalMyMix[ij].name==mymix_name)
		{
			if(globalMyMix[ij].type=="artist")
			{
				removeAt=ij;
				toRemoveArtistFromTimeline(mymix_name)
				removeArtistFromMap(mymix_name);
				

			}
			if(globalMyMix[ij].type=="genre")
			{
				removeAt=ij;
				toRemoveGenreFromTimeline(mymix_name);
				
			}
			
		}
			
	}
	console.log("Splice value= "+removeAt);
	globalMyMix.splice(removeAt,1);
	var fdgArtist=[];
		var artist_user;
		if (globalMyMix.length != 0)
		{
			for(ik=0;ik<globalMyMix.length;ik++)
			{
				console.log(globalMyMix);
				if(globalMyMix[ik].type=="artist")
				{
					// artist_user.artist=globalMyMix[i].name;
					// artist_user.user=globalMyMix[i].user;
					 artist_user={"artist":globalMyMix[ik].name,"user":globalMyMix[ik].user};
					 fdgArtist.push(artist_user);
					 artist_user=null;
				}
			}
			console.log(fdgArtist);
			if (fdgArtist.length > 0)
			{
				getDataForFdg(fdgArtist);
			}
		}
		else if (globalMyMix.length == 0)
		{
			;
		}
}

function myMixHighlight()
{
	

}

// $(document).ready(function() { mymixobject={"name":"pop","type":"genre","user":1,"ID":null,"status":true}; console.log (mymixobject); globalMyMix.push(mymixobject); var booli=mymixappend("pop",1,buildGlobalMyMix,"genre"); console.log(booli); });
