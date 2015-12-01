var radio_selection='./data/genres.json';

 	// $('#my-input').click(function()
 	// {
 	// 	console.log("why not");
 		
 	// });

 	// $('div').on('change','span',function()
 	// {
 	// 	console.log("why not dd");
 		
 	// });


	$( "#u1-genre_class" ).click(function()
	 {
		  radio_selection='./data/genres.json';
		  console.log("Genres");
		  $("#u1-my-input").value="";
		  $('#u1-scrollable-dropdown-menu .typeahead').typeahead('destroy');
		  localStorage.clear();
	      $('#u1-scrollable-dropdown-menu .typeahead').typeahead({
	        name: 'Genres',
	        // data source
	        prefetch: radio_selection,
	        // max item numbers list in the dropdown
	        limit: 100
	      });
	});
	$( "#u2-genre_class" ).click(function()
	 {
		  radio_selection='./data/genres.json';
		  console.log("Genres");
		  $("#u2-my-input").value="";
		  $('#u2-scrollable-dropdown-menu .typeahead').typeahead('destroy');
		  localStorage.clear();
	      $('#u2-scrollable-dropdown-menu .typeahead').typeahead({
	        name: 'Genres',
	        // data source
	        prefetch: radio_selection,
	        // max item numbers list in the dropdown
	        limit: 100
	      });
	});



	$( "#u1-artist_class" ).click(function() 
	{
		  	radio_selection='./data/artists.json';
		  	$('#u1-scrollable-dropdown-menu .typeahead').typeahead('destroy');
		  	localStorage.clear();
		  	$("#u1-my-input").value="";
	        $('#u1-scrollable-dropdown-menu .typeahead').typeahead({
	        name: 'Artist',
	        // data source
	        prefetch: radio_selection,
	        // max item numbers list in the dropdown
	        limit: 100
	      });	
 	 });
	$( "#u2-artist_class" ).click(function() 
	{
		  	radio_selection='./data/artists.json';
		  	$('#u2-scrollable-dropdown-menu .typeahead').typeahead('destroy');
		  	localStorage.clear();
		  	$("#u2-my-input").value="";
	        $('#u2-scrollable-dropdown-menu .typeahead').typeahead({
	        name: 'Artist',
	        // data source
	        prefetch: radio_selection,
	        // max item numbers list in the dropdown
	        limit: 100
	      });	
 	 });

	
    $(function(){
    	localStorage.clear();
    	console.log(radio_selection);

      // applied typeahead to the text input box

      $('#u1-scrollable-dropdown-menu .typeahead').typeahead({
        name: 'Load_Data',

        // data source
        
        prefetch: radio_selection,

        // max item numbers list in the dropdown
        limit: 500
      });
      $('#u2-scrollable-dropdown-menu .typeahead').typeahead({
        name: 'Load_Data',

        // data source
        
        prefetch: radio_selection,

        // max item numbers list in the dropdown
        limit: 500
      });
  });