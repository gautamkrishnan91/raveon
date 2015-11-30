$(document).ready(function() {
	$("#top10").prop("checked", true);
	$("#searchArtists").prop("checked", true);
	getArtistData();
	$(".search-holder").hide();
	$(".mymix").hide();
	$(".searchFor").hide();
	$("#genre_class").attr('checked', true);
	$("#getRelatedGenre").hide();
	get10GenresListForDecade("all");
/* Initial filters */
});

/* Dropdown styles */
function DropDown(el) {
	this.dd = el;
	console.log(this.dd.selector);
	this.placeholder = this.dd.children('span');
	this.opts = this.dd.find('ul.dropdown > li');
	this.val = '';
	this.index = -1;
	this.initEvents();
}
DropDown.prototype = {
	initEvents : function() {
		var obj = this;
		obj.dd.on('click', function(event){
			$(this).toggleClass('active');
			return false;
		});
		obj.opts.on('click',function(){
			var opt = $(this);
			obj.val = opt.text();
			obj.index = opt.index();
			obj.placeholder.text(obj.val);
		});
	},
	getValue : function() {
		return this.val;
	},
	getIndex : function() {
		return this.index;
	}
}

// Colorpicker
$("#u1-colorpicker-dd li").click(function(){
	less.modifyVars({
	  '@primarycolor1': $(this).css("background-color")
	});
	$("#u1-colorpicker-dd").hide();
});
$("#u1-colorpicker").click(function(){
	$("#u1-colorpicker-dd").show();
});

// For decade search
// Showing and hiding decade options
$('#setDecade').change(function() {
    var value = $(this).val();
    if(value != "decade"){
    	$("#decadeExtension").addClass("open");
    	get10GenresListForDecade(value);
    }
    else{
    	$("#decadeExtension").removeClass("open");	
    }
});
$("#closeDecade").click(function(){
	$("#decadeExtension").removeClass("open");	
	$("#setDecade").val('1');
});
$("#topArtists").click(function(){
	$(".top-genres").hide();
	$(".top-artists").show();
	$(this).addClass("selected");
	$("#topGenres").removeClass("selected");
});
$("#topGenres").click(function(){
	$(".top-genres").show();
	$(".top-artists").hide();
	$(this).addClass("selected");
	$("#topArtists").removeClass("selected");
});

// Expanding 
$("#fdgexpand").click(function(){
	$(".timeline").addClass("shrunk");
	$(".map").addClass("shrunk");
	$(".fdg").addClass("expanded");
	drawFDG();
});
$("#mapexpand").click(function(){
	$(".timeline").addClass("shrunk");
	$(".map").addClass("expanded");
	$(".fdg").addClass("shrunk");
});

// Popup
// Click on overlay to dismiss
$(".overlay, #dismissPopup").click(function(){
	$(".artist-popup").hide();
	$(".overlay").hide();
});
// Tabs
$("#songList").click(function(){
	$(".list-container").show();
	$(".video-container").hide();
	$(this).addClass("selected");
	$("#simArtists").removeClass("selected");
	$("#video").removeClass("selected");
});
$("#simArtists").click(function(){
	$(".list-container").show();
	$(".video-container").hide();
	$(this).addClass("selected");
	$("#songList").removeClass("selected");
	$("#video").removeClass("selected");
});
$("#video").click(function(){
	$(".list-container").hide();
	$(".video-container").show();
	$(this).addClass("selected");
	$("#simArtists").removeClass("selected");
	$("#songList").removeClass("selected");
});

// Switching between C range and B/A
$("#top10").click(function(){
	console.log($('input[name="initialFilter"]:checked').val());
	$(".search-holder").hide();
	$(".mymix").hide();
	$(".searchFor").hide();
});
$("#mymix").click(function(){
	console.log($('input[name="initialFilter"]:checked').val());
	$(".search-holder").show();
	$(".mymix").show();
	$(".searchFor").show();
	map.removeLayer(markerLayerTop10);
	
});

// Changing search - Artists and Genres
$("#artist_class").click(function(){
	$("#my-input").attr("placeholder","Search for Artists");
	$("#getRelatedArtist").hide();
	$("#getRelatedGenre").show();
	$("#showingRelated").removeClass("open");
	$("#my-input").val("");
});
$("#genre_class").click(function(){
	$("#my-input").attr("placeholder","Search for Genres");
	$("#getRelatedGenre").hide();
	$("#getRelatedArtist").show();
	$("#showingRelated").removeClass("open");
	$("#my-input").val("");
});
$("#getRelatedGenre").click(function(){
	$("#showingRelated").addClass("open");
	$("#showingRelated .dd-results").html("");
	$("#showingRelated .tab_single").html("Genres of this artist");
	// Clear results and add
	$("#showingRelated .dd-results").html("");
	getGenreByArtist($("#my-input").val());
});
$("#getRelatedArtist").click(function(){
	$("#showingRelated").addClass("open");
	$("#showingRelated .dd-results").html("");
	$("#showingRelated .tab_single").html("Artists belonging to this genre");
	// Clear results and add
	$("#showingRelated .dd-results").html("");
	getSimilarArtistByGenre($("#my-input").val());
});

// Add to my mix
$(".add-button").click(function(){

	var value = $("#my-input").val();
	var type = $("input[name='searchFor']:checked").val();
	var returned = mymixappend(value,1,buildGlobalMyMix,type);
	if (returned == true){
		$(".mix-list").append("<li><input type='checkbox' class='checkbox' checked><a>"+value+"</a>&nbsp;<span>("+type+")</span><div class='delete'></div></li>");
		$("#my-input").val("");
		$("#my-input").focus();
	}
	else{
		alert("Item already exists in your mix or it is an invalid item");
		$("#my-input").val("");
		$("#my-input").focus();
	}
});
// Adding from related
$("#showingRelatedResults").on('click', 'li', function () {
    var value = $(this).html();
	if (value != ""){
		if($("input[name='searchFor']:checked").val()=="genre"){
			var type = "artist";
		}
		else{
			var type = "genre";
		}
		$(".mix-list").append("<li><input type='checkbox' class='checkbox' checked><a>"+value+"</a>&nbsp;<span>("+type+")</span><div class='delete'></div></li>");
		$("#my-input").val("");
	}
});
// Adding from decade list
$(".top-artists").on('click', 'li', function () {
    var value = $(this).html();
	if (value != ""){
		$(".mix-list").append("<li><input type='checkbox' class='checkbox' checked><a>"+value+"</a>&nbsp;<span>(artist)</span><div class='delete'></div></li>");
		$("#my-input").val("");
	}
});
$(".top-genres").on('click', 'li', function () {
    var value = $(this).html();
	if (value != ""){
		$(".mix-list").append("<li><input type='checkbox' class='checkbox' checked><a>"+value+"</a>&nbsp;<span>(genre)</span><div class='delete'></div></li>");
		$("#my-input").val("");
	}
});
// Close related artists
$("#closeRelated").click(function(){
	$("#showingRelated").removeClass("open");
});

// Clicking on my mix list
$(".mix-list").on('click', 'li', function () {
	if($(this).find("span").html()=="(artist)"){
		var value = $(this).find("a").html();
		$(".artist-genre").html("");
		getDataForPopup(value);
	}
});
$(".artist-bottom .artist-name").click(function(){
	$(".overlay").show();
	$(".artist-popup").show();
});
$(".mix-list").on('click', '.delete', function () {
	var val = $(this).siblings("a").html();
	myMixDelete(val);
	$(this).parent("li").remove();
});

// Timeline toggle
$("#artist-timeline").click(function(){
	$("#chart2").hide();
	$("#chart").show();
});
$("#genre-timeline").click(function(){
	$("#chart").hide();
	$("#chart2").show();
});