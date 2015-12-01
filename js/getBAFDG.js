// get the data
function bafdg(links) 
{
d3.select("#fg").selectAll("*").remove();    
var color = d3.scale.category10();
var nodes = {};
console.log(links);
// Compute the distinct nodes from the links.
links.forEach(function(link) {
    link.source = nodes[link.source] || 
        (nodes[link.source] = {name: link.source,genre: link.genre,imagelink: link.linksource,user: link.usersource});
    link.target = nodes[link.target] || 
        (nodes[link.target] = {name: link.target,genre: link.genre,imagetarget: link.linktarget,user: link.usertarget});
});    
console.log(nodes);
var width = $('#fg').width();
    console.log(width)
   var height = $('#fg').height();
//get the data to force layout
var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .linkDistance(60)
    .charge(-700)
    .on("tick", tick)
    .start();

var svg = d3.select("#fg").append("svg")
    .attr("width", width)
    .attr("height", height);

// add the links and the arrows
var path = svg.append("svg:g").selectAll("path")
    .data(force.links())
  .enter().append("svg:path")
    .attr("class", "link")
    .attr("marker-end", "url(#end)");
    
// define the nodes
var node = svg.selectAll(".node")
    .data(force.nodes())
  .enter().append("g")
    .attr("class", function(d){
    if(d.user==1)
        return "node1";
    else
        return "node2";
    })
    .call(force.drag);

//images
    node.append("image")
      .attr("xlink:href",function(d){
        console.log(d.imagelink);
        if(d.imagelink != null)
            return String(d.imagelink);
        else
            return String(d.imagetarget);
      })
      .attr("x", -8)
      .attr("y", -8)
      .attr("width", 50)
      .attr("height", 50);    

// add the nodes
//node.append("circle")
//    .attr("r", 5)
//    .style("fill", function(d) { return color(d.genre);});
//console.log(links.genre);
// add the text 
node.append("text")
    .attr("x", 12)
    .attr("dy", ".35em")
    .text(function(d) { return d.name; });

// add the curvy lines
function tick() {
    path.attr("d", function(d) {
        var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = Math.sqrt(dx * dx + dy * dy);
        return "M" + 
            d.source.x + "," + 
            d.source.y + "A" + 
            dr + "," + dr + " 0 0,1 " + 
            d.target.x + "," + 
            d.target.y;
    });

    node
        .attr("transform", function(d) { 
            return "translate(" + d.x + "," + d.y + ")"; });
}
}
//call the function with the data    