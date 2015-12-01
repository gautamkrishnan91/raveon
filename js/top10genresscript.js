var genersTop10=[];
           
function computeTopTen(top100)
{
    var genreObj=[];
    var placeHolder;
    var genresList=[];
    var genresIndex;
    for(i=0;i<top100.length;i++)
    {
        if(top100[i].genres)
        for(j=0;j<top100[i].genres.length;j++)
        {
            if(($.inArray(top100[i].genres[j].name, genresList)==-1))
            {
                genresList.push(top100[i].genres[j].name)
                placeHolder={genres:top100[i].genres[j].name,hitcount:1,familiarity:top100[i].familiarity,hotttnesss:top100[i].hotttnesss};
                genreObj.push(placeHolder);
                    //console.log("Has not : "+ top100[i].genres[j])
            }
            else
            {
                genresIndex=($.inArray(top100[i].genres[j].name,genresList));
                genreObj[genresIndex].hitcount++;
                genreObj[genresIndex].familiarity+=top100[i].familiarity;
                genreObj[genresIndex].hotttnesss+=top100[i].hotttnesss;

                //console.log(genresIndex);
            }
            
            
        }
        
    }
    genersTop10.push(genreObj);
    if(genersTop10.length==10)
    {
        findTop10();
    }

	
	
}

function findTop10()
{
     
    
    var genresList=[];
    var genresIndex;
    var hitcountarr=[];
    var hotttnesssarr = [];
    var familiarityarr = [];
    var genresarr=[];

    
    for(i=0;i<genersTop10.length;i++)
        for(j=0;j<genersTop10[i].length;j++)
        {
            if(($.inArray(genersTop10[i][j].genres, genresarr)==-1))
            {
                genresarr.push(genersTop10[i][j].genres);
                hitcountarr.push(genersTop10[i][j].hitcount);
                familiarityarr.push(genersTop10[i][j].familiarity);
                hotttnesssarr.push(genersTop10[i][j].hotttnesss);
                               
                    //console.log("Has not : "+ top100[i].genres[j])
            }
            else
            {
                genresIndex=($.inArray(genersTop10[i][j].genres,genresarr));
                hitcountarr[genresIndex]+=genersTop10[i][j].hitcount;
                familiarityarr[genresIndex]+=genersTop10[i][j].familiarity;
                hotttnesssarr[genresIndex]+=genersTop10[i][j].hotttnesss;
                //console.log(genresIndex);
            }
        }

        for(i=0;i<20;i++)
        {
            var max = Math.max.apply(Math,hitcountarr); 
            var index = $.inArray(max,hitcountarr);
            
            var tempgenere=genresarr[genresarr.length-1];
            var temphitcount=hitcountarr[hitcountarr.length-1];
            var tempfamiliarity = familiarityarr[familiarityarr.length-1];
            var temphotttnesss = hotttnesssarr[hotttnesssarr.length-1];

            hitcountarr[hitcountarr.length-1]=hitcountarr[index];
            genresarr[genresarr.length-1]=genresarr[index];
            hotttnesssarr[genresarr.length-1]=hotttnesssarr[index];
            familiarityarr[genresarr.length-1]=familiarityarr[index];
            
            hitcountarr[index]=temphitcount;
            genresarr[index]=tempgenere;
            familiarityarr[index]=tempfamiliarity;
            hotttnesssarr[index]=temphotttnesss;

            $(".top-genres").append("<li>"+genresarr.pop()+"</li>")
           
           // console.log("The genre is: "+genresarr.pop());
            hitcountarr.pop();
            hotttnesssarr.pop();
            familiarityarr.pop();

          //  (genresarr[$.inArray(max,hitcountarr)]);

        }

        $("#waitmessage").html("done");
    
}


function cb_fetchdata(parsed_json){

    var top100=[];
                    for(j=0;j<parsed_json.response.artists.length;j++)
                    {  
                            top100.push(parsed_json.response.artists[j]);
                    }

                    
        {
            computeTopTen(top100);
   
        }
                  

}


function fetchdata(startyear,callback)
{
	
console.log(startyear);

    for(i=startyear;i<startyear+10;i++)
    {
        
         var urlclient = "http://developer.echonest.com/api/v4/artist/search?api_key=ZVJ0VUVPOV3DDMWA2&format=json&results=100&bucket=familiarity&bucket=hotttnesss&bucket=genre&sort=hotttnesss-desc&artist_start_year_before="+i;
     
        $.ajax({url : urlclient,  
                async: true,
                success : function(data) {callback(data);}});
      
    }


         
          
}

function getall(val)
{
    // console.log(val);
    genersTop10 = [];
        fetchdata(+val,cb_fetchdata);
    
}
function getTop10ByDecade(decade)
{
    decade=+decade;
    var Fdecade = decade+"-"+(decade+10);
    var top10Artists = [];
    d3.csv("./data/AllTop10.csv",function(data)
         {
             data.forEach(function(d,i)
             {
                 if (d['Decade'] == Fdecade)
                 {
                     top10Artists.push(d['Name']);
                 }
             })
                 while(top10Artists.length != 0)
                 {
                    $(".top-artists").append("<li>"+top10Artists.pop()+"</li>")
                 }
         })
   
}

$('#u1-setDecade').change(function() {
    // console.log($(this).val());
    $(".u1-top-genres").html("");
    $(".u1-top-artists").html("");
    getall($(this).val());
    getTop10ByDecade($(this).val());
});
$('#u2-setDecade').change(function() {
    // console.log($(this).val());
    $(".u2-top-genres").html("");
    $(".u2-top-artists").html("");
    getall($(this).val());
    getTop10ByDecade($(this).val());
});