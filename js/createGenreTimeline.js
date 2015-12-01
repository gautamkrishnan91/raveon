var colorrange = [];
    
    
function cchart(csvpath,color) 
{
d3.select("#chart").selectAll("*").remove();
d3.select("#body").selectAll("p").remove();  
if (color == "blue") {
  colorrange = ["#045A8D", "#2B8CBE", "#74A9CF", "#A6BDDB", "#D0D1E6", "#F1EEF6"];
}
else if (color == "pink") {
  colorrange = ["#980043", "#DD1C77", "#DF65B0", "#C994C7", "#D4B9DA", "#F1EEF6"];
}
else if (color == "orange") {
  colorrange = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84", "#FDD49E", "#FEF0D9"];
}
strokecolor = colorrange[0];

var format = d3.time.format("%Y");

var margin = {top: 20, right: 40, bottom: 30, left: 30};
var width = 5464 - margin.left - margin.right;
var height = 1000 - margin.top - margin.bottom;

var tooltip = d3.select("#chart")
    .append("div")
    .attr("class", "remove")
    .style("position", "absolute")
    .style("z-index", "20")
    .style("padding", "15px")
    .style("font-size", "30px")
    .style("border", "1px solid #EEE")
    .style("border-radius", "5px")
    .style("visibility", "hidden")
    .style("top", "30px")
    .style("left", "55px");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height-10, 0]);

var z = d3.scale.ordinal()
    .range(colorrange);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(10);

var yAxis = d3.svg.axis()
    .scale(y);

var yAxisr = d3.svg.axis()
    .scale(y);

var stack = d3.layout.stack()
    .offset("silhouette")
    .values(function(d,i) { 
        //console.log(d.values[i]);
        return d.values;})
    .x(function(d) { return d.year; })
    .y(function(d) { return d.score; });

var nest = d3.nest()
    .key(function(d) { 
        //console.log(d.genre);
        return d.genre; });

var area = d3.svg.area()
    .interpolate("cardinal")
    .x(function(d) { return x(d.year); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
//console.log(csvpath);         
  csvpath.forEach(function(d) {
    d.year = format.parse(String(d.year));
    d.score = +d.score/6;
  });  
//console.log(csvpath);
  function sortByKey(array, key) {
return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
});
}

csvpath = sortByKey(csvpath, 'year');   
    //console.log(csvpath);
var layers = stack(nest.entries(csvpath));   
  //console.log(layers);
  x.domain(d3.extent(csvpath, function(d) { return d.year; }));
  y.domain([0, d3.max(csvpath, function(d) { return d.y0 + d.y; })]);

  svg.selectAll(".layer")
      .data(layers)
    .enter().append("path")
      .attr("class", "layer")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d, i) { return z(i); });


  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

//  svg.append("g")
//      .attr("class", "y axis")
//      .attr("transform", "translate(" + width + ", 0)")
//      .call(yAxis.orient("right"));
//
//  svg.append("g")
//      .attr("class", "y axis")
//      .call(yAxis.orient("left"));

  svg.selectAll(".layer")
    .attr("opacity", 1)
    .on("mouseover", function(d, i) {
      svg.selectAll(".layer").transition()
      .duration(250)
      .attr("opacity", function(d, j) {
        return j != i ? 0.6 : 1;
    })})

    .on("mousemove", function(d, i) {
      mousex = d3.mouse(this);
      mousex = mousex[0];

      d3.select(this)
      .classed("hover", true)
      .attr("stroke", strokecolor)
      .attr("stroke-width", "0.5px"), 
      tooltip.html( "<p>" + d.key + "</p>" ).style("visibility", "visible");
      
    })
    .on("mouseout", function(d, i) {
     svg.selectAll(".layer")
      .transition()
      .duration(250)
      .attr("opacity", "1");
      d3.select(this)
      .classed("hover", false)
      .attr("stroke-width", "0px"), tooltip.html( "<p>" + d.key + "</p>" ).style("visibility", "hidden");
  })
    
  var vertical = d3.select("#chart")
        .append("div")
        .attr("class", "remove")
        .style("position", "absolute")
        .style("z-index", "19")
        .style("width", "1px")
        .style("height", "380px")
        .style("top", "10px")
        .style("bottom", "30px")
        .style("left", "0px")
        .style("background", "#fff");

  d3.select("#chart")
      .on("mousemove", function(){  
         mousex = d3.mouse(this);
         mousex = mousex[0] + 5;
         vertical.style("left", mousex + "px" )})
      .on("mouseover", function(){  
         mousex = d3.mouse(this);
         mousex = mousex[0] + 5;
         vertical.style("left", mousex + "px")});
}

var colorrange2 = [];
var genretodraw=[];
//using a global object    
function chartinit(mainobj2,color)
{
    //console.log(genretodraw);
    for(i=0;i<12;i++)
    {
    var temp1 = {};
    temp1.year = mainobj2[i].year;
    temp1.genre = mainobj2[i].genre;
    temp1.user = mainobj2[i].user;
    temp1.score = mainobj2[i].score;        
    genretodraw.push(temp1);
    }
    var clonegenre=clone(genretodraw);
    chart(clonegenre,color);
}
    //cloning the object for reference
function clone(obj){
   if(obj == null || typeof(obj) != 'object')
       return obj;

   var temp = new obj.constructor(); 
   for(var key in obj)
       temp[key] = clone(obj[key]);

   return temp;
}
    //function to remove the genre from timeline
function toRemoveGenreFromTimeline(genre)
{
    var updatedList=[];
	for(i=0;i<genretodraw.length;i++)
	{
		if (genretodraw[i].genre != genre)
		{
            updatedList.push(genretodraw[i]);
            
//			var tempToReplace = genretodraw[genretodraw.length-1];
//			genretodraw[genretodraw.length-1] = genretodraw[i];
//			genretodraw[i] = tempToReplace;
        }
	}
    genretodraw=[];
    genretodraw=updatedList;
    var clonegenre=clone(genretodraw);
    chart(clonegenre,"blue");
    //console.log(genretodraw);
	
}    
 
///function to draw the chart    
function chart(csvpath,color) {
d3.select("#chart").selectAll("*").remove();    
// d3.select("#body").selectAll("p").remove();  
if (color == "blue") {
  colorrange2 = ["#045A8D", "#2B8CBE", "#74A9CF", "#A6BDDB", "#D0D1E6", "#F1EEF6"];
}
else if (color == "pink") {
  colorrange2 = ["#980043", "#DD1C77", "#DF65B0", "#C994C7", "#D4B9DA", "#F1EEF6"];
}
else if (color == "orange") {
  colorrange2 = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84", "#FDD49E", "#FEF0D9"];
}
strokecolor = colorrange[0];

var format = d3.time.format("%Y");

var margin = {top: 20, right: 40, bottom: 30, left: 30};
var width = 5464 - margin.left - margin.right;
var height = 1000 - margin.top - margin.bottom;

var tooltip = d3.select("#chart")
    .append("div")
    .attr("class", "remove")
    .style("position", "absolute")
    .style("z-index", "20")
    .style("visibility", "hidden")
    .style("top", "30px")
    .style("left", "55px");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height-10, 0]);

var z = d3.scale.ordinal()
    .range(colorrange);
//Axes initialization
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(10);

var yAxis = d3.svg.axis()
    .scale(y);

var yAxisr = d3.svg.axis()
    .scale(y);

var stack = d3.layout.stack()
    .offset("silhouette")
    .values(function(d) { 
        ////console.log(d.values);
        return d.values;})
    .x(function(d) { return d.year; })
    .y(function(d) { return d.score; });
//nesting the keys accordingly here gentres
var nest = d3.nest()
    .key(function(d) { return d.genre; });
//calculating the area
var area = d3.svg.area()
    .interpolate("cardinal")
    .x(function(d) { return x(d.year); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
//console.log(csvpath);         
  csvpath.forEach(function(d) {
    d.year = format.parse(String(d.year));
    d.score = +d.score/100;
  });  
//console.log(csvpath);
// function to sort by the keys- year    
  function sortByKey(array, key) {
return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
});
}
csvpath = sortByKey(csvpath, 'year'); 
// creating the layers    
var layers = stack(nest.entries(csvpath));   
  //console.log(layers);
  x.domain(d3.extent(csvpath, function(d) { return d.year; }));
  y.domain([0, d3.max(csvpath, function(d) { return d.y0 + d.y; })]);
//appending the layer
  svg.selectAll(".layer")
      .data(layers)
      .enter().append("path")
      .attr("class",function(d,i){//console.log(d.values[i].user);
      if(d.values[i].user==1)
                                    return "layer1";
                               else
                                   return "layer2";})
      .attr("id",function(d,i) { return d.values[i].user; })
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d, i) { return z(i); });
//appending the x axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
// functions to display the name when hovered     
  svg.selectAll(".layer")
    .attr("opacity", 1)
    .on("mouseover", function(d, i) {
      svg.selectAll(".layer").transition()
      .duration(250)
      .attr("opacity", function(d, j) {
        return j != i ? 0.6 : 1;
    })})

    .on("mousemove", function(d, i) {
      mousex = d3.mouse(this);
      mousex = mousex[0];

      d3.select(this)
      .classed("hover", true)
      .attr("stroke", strokecolor)
      .attr("stroke-width", "0.5px"), 
      tooltip.html( "<p>" + d.key + "</p>" ).style("visibility", "visible");
      
    })
    .on("mouseout", function(d, i) {
     svg.selectAll(".layer")
      .transition()
      .duration(250)
      .attr("opacity", "1");
      d3.select(this)
      .classed("hover", false)
      .attr("stroke-width", "0px"), tooltip.html( "<p>" + d.key + "</p>" ).style("visibility", "hidden");
  })
    
  var vertical = d3.select("#chart")
        .append("div")
        .attr("class", "remove")
        .style("position", "absolute")
        .style("z-index", "19")
        .style("width", "1px")
        .style("height", "380px")
        .style("top", "10px")
        .style("bottom", "30px")
        .style("left", "0px")
        .style("background", "#fff");

  d3.select("#chart")
      .on("mousemove", function(){  
         mousex = d3.mouse(this);
         mousex = mousex[0] + 5;
         vertical.style("left", mousex + "px" )})
      .on("mouseover", function(){  
         mousex = d3.mouse(this);
         mousex = mousex[0] + 5;
         vertical.style("left", mousex + "px")});
}

// artist timeline    
// initiate and clone the object
var artisttodraw=[];
var colorrange2 = [];    
function artinit(mainobj2,color)
{
    //console.log(mainobj2);
    //console.log(artisttodraw);
    //console.log(mainobj2[0].start_year);    
    var temp1 = {};
    temp1.start_year = mainobj2[0].start_year;
    temp1.end_year = mainobj2[0].end_year;
    temp1.user = mainobj2[0].user;
    temp1.score = mainobj2[0].hotttnesss;
    temp1.name= mainobj2[0].name; 
    temp1.id= mainobj2[0].id;
    artisttodraw.push(temp1);
    //console.log(artisttodraw);
    var cloneartist=clone2(artisttodraw);
    artchart(cloneartist,color);
}
// cloning the objects    
function clone2(obj){
   if(obj == null || typeof(obj) != 'object')
       return obj;

   var temp = new obj.constructor(); 
   for(var key in obj)
       temp[key] = clone(obj[key]);

   return temp;
}
// function to remove the timeline    
function toRemoveArtistFromTimeline(name2)
{
    var updatedList=[];
	for(i=0;i<artisttodraw.length;i++)
	{
		if (artisttodraw[i].name != name2)
		{
            updatedList.push(artisttodraw[i]);
            
//			var tempToReplace = genretodraw[genretodraw.length-1];
//			genretodraw[genretodraw.length-1] = genretodraw[i];
//			genretodraw[i] = tempToReplace;
        }
	}
    artisttodraw=[];
    artisttodraw=updatedList;
    var cloneartist=clone2(artisttodraw);
    artchart(cloneartist,"blue");
    ////console.log(genretodraw);
	
}    
//chart(genretodraw,"blue");    
function artchart(csvpath,color) {
d3.select("#chart2").selectAll("*").remove();    
d3.select("#body").selectAll("p").remove();  
if (color == "blue") {
  colorrange3 = ["#045A8D", "#2B8CBE", "#74A9CF", "#A6BDDB", "#D0D1E6", "#F1EEF6"];
}
else if (color == "pink") {
  colorrange3 = ["#980043", "#DD1C77", "#DF65B0", "#C994C7", "#D4B9DA", "#F1EEF6"];
}
else if (color == "orange") {
  colorrange3 = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84", "#FDD49E", "#FEF0D9"];
}
strokecolor = colorrange[0];

var format = d3.time.format("%Y");

var margin = {top: 20, right: 40, bottom: 30, left: 30};
var width = 5464 - margin.left - margin.right;
var height = 1000 - margin.top - margin.bottom;
//tooltip to show the artist name
var tooltip = d3.select("#chart2")
    .append("div")
    .attr("class", "remove")
    .style("position", "absolute")
    .style("z-index", "20")
    .style("visibility", "hidden")
    .style("top", "30px")
    .style("left", "55px");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height-10, 0]);

var z = d3.scale.ordinal()
    .range(colorrange);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(10);

var yAxis = d3.svg.axis()
    .scale(y);

var yAxisr = d3.svg.axis()
    .scale(y);
// stacking the values
var stack = d3.layout.stack()
    .offset("silhouette")
    .values(function(d) { 
        ////console.log(d.values);
        return d.values;})
    .x(function(d) { return d.year; })
    .y(function(d) { return d.score; });
// nesting on artist name
var nest = d3.nest()
    .key(function(d) { return d.name; });

var area = d3.svg.area()
    .interpolate("cardinal")
    .x(function(d) { return x(d.year); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

var svg = d3.select("#chart2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
csvpath.forEach(function(d) {
    d.ey=+d.end_year;
    d.sy=+d.start_year;
    d.score=+d.score;  
    d.hotttnesss=+d.score;
    d.user=+d.user;
  });     
  var csvpath2 =[];
  csvpath.forEach(function(d) {
      for(i=1900;i<=2020;i++)
      {  
        var temp3={}; 
        temp3.name=d.name;   
        temp3.year=i;
        temp3.id=d.id; 
        temp3.user=d.user;  
        if(i>=d.sy && i<=d.ey)
            temp3.score=d.hotttnesss;
        else
            temp3.score= 0 ;
        ////console.log(temp);  
        csvpath2.push(temp3);  
      }
  });          
  csvpath2.forEach(function(d) {
    d.year = format.parse(String(d.year));
  });  
    
  function sortByKey(array, key) {
return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
});
}

csvpath2 = sortByKey(csvpath2, 'year');          
var layers = stack(nest.entries(csvpath2));   
  //console.log(layers);
  x.domain(d3.extent(csvpath2, function(d) { return d.year; }));
  y.domain([0, d3.max(csvpath2, function(d) { return d.y0 + d.y; })]);

  svg.selectAll(".layer")
      .data(layers)
      .enter().append("path")
      .attr("class",function(d,i){//console.log(d.values[i].user);
      if(d.values[i].user==1)
                                    return "layer1";
                               else
                                  return "layer2";})
      //.attr("class","layer")
      .attr("id",function(d,i) { return d.values[i].id; })
      .attr("d", function(d) { return area(d.values); })  
      .style("fill", function(d, i) { return z(i); })
      .append("title")
      .text(function(d) { return d.key; });
    
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    
  svg.selectAll(".layer")
    .attr("opacity", 1)
    .on("mouseover", function(d, i) {
      svg.selectAll(".layer").transition()
      .duration(250)
      .attr("opacity", function(d, j) {
        return j != i ? 0.6 : 1;
    })})

    .on("mousemove", function(d, i) {
      mousex = d3.mouse(this);
      mousex = mousex[0];

      d3.select(this)
      .classed("hover", true)
      .attr("stroke", strokecolor)
      .attr("stroke-width", "0.5px"), 
      tooltip.html( "<p>" + d.key + "</p>" ).style("visibility", "visible");
      
    })
    .on("mouseout", function(d, i) {
     svg.selectAll(".layer")
      .transition()
      .duration(250)
      .attr("opacity", "1");
      d3.select(this)
      .classed("hover", false)
      .attr("stroke-width", "0px"), tooltip.html( "<p>" + d.key + "</p>" ).style("visibility", "hidden");
  })
    
  var vertical = d3.select("#chart2")
        .append("div")
        .attr("class", "remove")
        .style("position", "absolute")
        .style("z-index", "19")
        .style("width", "1px")
        .style("height", "380px")
        .style("top", "10px")
        .style("bottom", "30px")
        .style("left", "0px")
        .style("background", "#fff");

  d3.select("#chart2")
      .on("mousemove", function(){  
         mousex = d3.mouse(this);
         mousex = mousex[0] + 5;
         vertical.style("left", mousex + "px" )})
      .on("mouseover", function(){  
         mousex = d3.mouse(this);
         mousex = mousex[0] + 5;
         vertical.style("left", mousex + "px")});
}