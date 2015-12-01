$(document).ready(function() {
	$("#u1-top10").prop("checked", true);
	$("#u2-top10").prop("checked", true);
	$("#searchArtists").prop("checked", true);
	getArtistData();
	$(".search-holder").hide();
	$(".mymix").hide();
	$(".searchFor").hide();
	$("#u1-genre_class").attr('checked', true);
	$("#u2-genre_class").attr('checked', true);
	$("#u1-getRelatedGenre").hide();
	$("#u2-getRelatedGenre").hide();
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
$("#u2-colorpicker-dd li").click(function(){
	less.modifyVars({
	  '@primarycolor2': $(this).css("background-color")
	});
	$("#u2-colorpicker-dd").hide();
});
$("#u2-colorpicker").click(function(){
	$("#u2-colorpicker-dd").show();
});

// For decade search
// Showing and hiding decade options
$('#u1-setDecade').change(function() {
    var value = $(this).val();
    if(value != "decade"){
    	$("#u1-decadeExtension").addClass("open");
    	get10GenresListForDecade(value);
    }
    else{
    	$("#u1-decadeExtension").removeClass("open");	
    }
});
$('#u2-setDecade').change(function() {
    var value = $(this).val();
    if(value != "decade"){
    	$("#u2-decadeExtension").addClass("open");
    	get10GenresListForDecade(value);
    }
    else{
    	$("#u2-decadeExtension").removeClass("open");	
    }
});
$("#u1-closeDecade").click(function(){
	$("#u1-decadeExtension").removeClass("open");	
	$("#u1-setDecade").val('1');
});
$("#u2-closeDecade").click(function(){
	$("#u2-decadeExtension").removeClass("open");	
	$("#u2-setDecade").val('1');
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
$("#u1-top10").click(function(){
	// console.log($('input[name="initialFilter"]:checked').val());
	$(".search-holder").hide();
	$(".mymix").hide();
	$(".searchFor").hide();
});
$("#u1-mymix").click(function(){
	// console.log($('input[name="initialFilter"]:checked').val());
	$(".search-holder").show();
	$(".mymix").show();
	$(".searchFor").show();
	map.removeLayer(markerLayerTop10);
	
});
$("#u2-top10").click(function(){
	// console.log($('input[name="initialFilter"]:checked').val());
	$(".search-holder").hide();
	$(".mymix").hide();
	$(".searchFor").hide();
});
$("#u2-mymix").click(function(){
	// console.log($('input[name="initialFilter"]:checked').val());
	$(".search-holder").show();
	$(".mymix").show();
	$(".searchFor").show();
	map.removeLayer(markerLayerTop10);
	
});

// Changing search - Artists and Genres
$("#u1-artist_class").click(function(){
	$("#u1-my-input").attr("placeholder","Search for Artists");
	$("#u1-getRelatedArtist").hide();
	$("#u1-getRelatedGenre").show();
	$("#u1-showingRelated").removeClass("open");
	$("#u1-my-input").val("");
});
$("#u1-genre_class").click(function(){
	$("#u1-my-input").attr("placeholder","Search for Genres");
	$("#u1-getRelatedGenre").hide();
	$("#u1-getRelatedArtist").show();
	$("#u1-showingRelated").removeClass("open");
	$("#u1-my-input").val("");
});
$("#u2-artist_class").click(function(){
	$("#u2-my-input").attr("placeholder","Search for Artists");
	$("#u2-getRelatedArtist").hide();
	$("#u2-getRelatedGenre").show();
	$("#u2-showingRelated").removeClass("open");
	$("#u2-my-input").val("");
});
$("#u2-genre_class").click(function(){
	$("#u2-my-input").attr("placeholder","Search for Genres");
	$("#u2-getRelatedGenre").hide();
	$("#u2-getRelatedArtist").show();
	$("#u2-showingRelated").removeClass("open");
	$("#u2-my-input").val("");
});
$("#u1-getRelatedGenre").click(function(){
	$("#u1-showingRelated").addClass("open");
	$("#u1-showingRelated .dd-results").html("");
	$("#u1-showingRelated .tab_single").html("Genres of this artist");
	// Clear results and add
	$("#u1-showingRelated .dd-results").html("");
	getGenreByArtist($("#u1-my-input").val());
});
$("#u1-getRelatedArtist").click(function(){
	$("#u1-showingRelated").addClass("open");
	$("#u1-showingRelated .dd-results").html("");
	$("#u1-showingRelated .tab_single").html("Artists belonging to this genre");
	// Clear results and add
	$("#u1-showingRelated .dd-results").html("");
	getSimilarArtistByGenre($("#u1-my-input").val());
});
$("#u2-getRelatedGenre").click(function(){
	$("#u2-showingRelated").addClass("open");
	$("#u2-showingRelated .dd-results").html("");
	$("#u2-showingRelated .tab_single").html("Genres of this artist");
	// Clear results and add
	$("#u2-showingRelated .dd-results").html("");
	getGenreByArtist($("#u2-my-input").val());
});
$("#u2-getRelatedArtist").click(function(){
	$("#u2-showingRelated").addClass("open");
	$("#u2-showingRelated .dd-results").html("");
	$("#u2-showingRelated .tab_single").html("Artists belonging to this genre");
	// Clear results and add
	$("#u2-showingRelated .dd-results").html("");
	getSimilarArtistByGenre($("#u2-my-input").val());
});

// Add to my mix
$("#u1-add-button").click(function(){

	var value = $("#u1-my-input").val();
	var type = $("#user1 input[name='searchFor1']:checked").val();
	var returned = mymixappend(value,1,buildGlobalMyMix,type);
	if (returned == true){
		$("#user1 .mix-list").append("<li><input type='checkbox' class='checkbox' checked><a>"+value+"</a>&nbsp;<span>("+type+")</span><div class='delete'></div></li>");
		$("#u1-my-input").val("");
		$("#u1-my-input").focus();
	}
	else{
		alert("Item already exists in your mix or it is an invalid item");
		$("#u1-my-input").val("");
		$("#u1-my-input").focus();
	}
});
$("#u2-add-button").click(function(){

	var value = $("#u2-my-input").val();
	alert( $("#user2 input[name='searchFor2']:checked").val());
	var type = $("#user2 input[name='searchFor2']:checked").val();
	var returned = mymixappend(value,2,buildGlobalMyMix,type);
	if (returned == true){
		$("#user2 .mix-list").append("<li><input type='checkbox' class='checkbox' checked><a>"+value+"</a>&nbsp;<span>("+type+")</span><div class='delete'></div></li>");
		$("#u2-my-input").val("");
		$("#u2-my-input").focus();
	}
	else{
		alert("Item already exists in your mix or it is an invalid item");
		$("#u2-my-input").val("");
		$("#u2-my-input").focus();
	}
});
// Adding from related
$("#u1-showingRelatedResults").on('click', 'li', function () {
    var value = $(this).html();
	if (value != ""){
		if($("#user1 input[name='searchFor1']:checked").val()=="genre"){
			var type = "artist";
		}
		else{
			var type = "genre";
		}
	
	var returned = mymixappend(value,1,buildGlobalMyMix,type);
	if (returned == true){
		$("#user1 .mix-list").append("<li><input type='checkbox' class='checkbox' checked><a>"+value+"</a>&nbsp;<span>("+type+")</span><div class='delete'></div></li>");
		$("#u1-my-input").val("");
	}
}
});
$("#u2-showingRelatedResults").on('click', 'li', function () {
    var value = $(this).html();
	if (value != ""){
		if($("#user2 input[name='searchFor2']:checked").val()=="genre"){
			var type = "artist";
		}
		else{
			var type = "genre";
		}
		var returned = mymixappend(value,2,buildGlobalMyMix,type);
	if (returned == true){
		$("#user2 .mix-list").append("<li><input type='checkbox' class='checkbox' checked><a>"+value+"</a>&nbsp;<span>("+type+")</span><div class='delete'></div></li>");
		$("#u2-my-input").val("");
	}
}
});
// Adding from decade list
$("#user1 .top-artists").on('click', 'li', function () {
    var value = $(this).html();
   	var type = "artist";
	var returned = mymixappend(value,1,buildGlobalMyMix,type);
	if (returned == true){
	if (value != ""){
		$(".mix-list").append("<li><input type='checkbox' class='checkbox' checked><a>"+value+"</a>&nbsp;<span>(artist)</span><div class='delete'></div></li>");
		$("#u1-my-input").val("");
	}
}
});
$("#user1 .top-genres").on('click', 'li', function () {
    var value = $(this).html();    
	var type = "genre";
	var returned = mymixappend(value,1,buildGlobalMyMix,type);
	if (returned == true){
	if (value != ""){
		$("#user1 .mix-list").append("<li><input type='checkbox' class='checkbox' checked><a>"+value+"</a>&nbsp;<span>(genre)</span><div class='delete'></div></li>");
		$("#u1-my-input").val("");
		}
	}
});
$("#user2 .top-artists").on('click', 'li', function () {
    var value = $(this).html();
    var type = "artist";
	var returned = mymixappend(value,2,buildGlobalMyMix,type);
	if (returned == true){
	if (value != ""){
		$("#user2 .mix-list").append("<li><input type='checkbox' class='checkbox' checked><a>"+value+"</a>&nbsp;<span>(artist)</span><div class='delete'></div></li>");
		$("#u2-my-input").val("");
	}
}
});
$("#user2 .top-genres").on('click', 'li', function () {
    var value = $(this).html();
	if (value != ""){
		$("#user2 .mix-list").append("<li><input type='checkbox' class='checkbox' checked><a>"+value+"</a>&nbsp;<span>(genre)</span><div class='delete'></div></li>");
		$("#u2-my-input").val("");
	}
});
// Close related artists
$("#u1-closeRelated").click(function(){
	$("#u1-showingRelated").removeClass("open");
});
$("#u2-closeRelated").click(function(){
	$("#u2-showingRelated").removeClass("open");
});

// Clicking on my mix list
$("#user1 .mix-list").on('click', 'li', function () {
	if($(this).find("span").html()=="(artist)"){
		var value = $(this).find("a").html();
		$("#user1 .artist-genre").html("");
		zoomToArtist(value);
		getDataForPopup(value);
	}
});
$("#user2 .mix-list").on('click', 'li', function () {
	if($(this).find("span").html()=="(artist)"){
		var value = $(this).find("a").html();
		$("#user2 .artist-genre").html("");
		zoomToArtist(value);
		getDataForPopup(value);
	}
});
$(".artist-bottom .artist-name").click(function(){
	$(".overlay").show();
	$(".artist-popup").show();
});
$("#user2 .mix-list").on('click', '.delete', function () {
	var val = $(this).siblings("a").html();
	myMixDelete(val,2);
	$(this).parent("li").remove();
});
$("#user1 .mix-list").on('click', '.delete', function () {
	var val = $(this).siblings("a").html();
	myMixDelete(val,1);
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