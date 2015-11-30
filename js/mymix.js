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
				if(data.response.genres.length==0)  				//This line returns false if there is no matching artist for the 
					booli= false;
				
			}
		});
		if(booli)
		{
			buildGlobalMyMix(null,mymix_name,user,mymixtype,status);
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
				console.log(data);	
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
			console.log(globalMyMix);

	//Plot the new entry in mymix on the map
	if(mymixtype=="artist")
	{
		var fdgArtist=[];
		var artist_user;
		putArtistOnMap(mymix_name);
		for(i=0;i<globalMyMix.lenght;i++)
		{
			if(globalMyMix[i].type="artist")
			{
				artist_user={"artist":globalMyMix[i].name,"user":globalMyMix[i].user};
				fdgArtist.push(artist_user);
			}
		}
		//getDataForFdg(fdgArtist);
		//getArtistDataForTimeline(mymix_name,user,artistID);
	}
	if(mymixtype=="genre")
	{
      pass(mymix_name,user)
	}

	//genreTimeLineData(mymix_name)





}

function myMixDelete(mymix_name)
{
	var fdgArtist=[];
	var artist_user;
	var removeAt;
	for(i=0;i<globalMyMix.length;i++)
	{
		if(globalMyMix[i].name==mymix_name)
		{
			if(globalMyMix[i].type=="artist")
			{
				removeArtistFromMap(mymix_name);
				removeAt=i;

			}
			if(globalMyMix[i].type=="genre")
			{
				removeAt=i;
			}
			
		}
			
	}
	globalMyMix.splice(removeAt,1);
	
}

// $(document).ready(function() { mymixobject={"name":"pop","type":"genre","user":1,"ID":null,"status":true}; console.log (mymixobject); globalMyMix.push(mymixobject); var booli=mymixappend("pop",1,buildGlobalMyMix,"genre"); console.log(booli); });

