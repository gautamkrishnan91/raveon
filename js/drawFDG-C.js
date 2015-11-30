drawFDG();
// get the data
function drawFDG(){
  // get the data
  d3.select("#fg").selectAll("*").remove();
  d3.csv("data/force.csv", function(error, links) {
  var color = d3.scale.category10();
  var nodes = {};
  console.log(links);
  // Compute the distinct nodes from the links.
  links.forEach(function(link) {
      link.gv = +link.gv;
      link.source = nodes[link.source] || 
          (nodes[link.source] = {name: link.source,genre: link.genre,imageurl: link.imageurl,id: link.id});
      link.target = nodes[link.target] || 
          (nodes[link.target] = {name: link.target,genre: link.genre});
  });    
  console.log(nodes);
  var width = $('#fg').width();
      console.log(width);
     var height = $('#fg').height();
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
      .attr("class", "node")
      .call(force.drag);
  //images
      node.append("image")
        .attr("xlink:href",function(d){
          console.log(d.imageurl);
          if(d.imageurl)
          {
          var ur="artist_images/"+d.imageurl+"";
          return ur;
          }
          else
              return "";
        })
      .attr("id",function(d){
          if(d.id)
          {
          var ur=d.id;
          return ur;
          }
          else
              return "gen";
        })
        .attr("x", -8)
        .attr("y", -8)
        .attr("width", 40)
        .attr("height", 40);    
  //appending the name
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
  });
}