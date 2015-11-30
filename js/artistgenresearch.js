var radio_selection='./data/genres.json';

 	$('#my-input').click(function()
 	{
 		console.log("why not");
 		
 	});

 	$('div').on('change','span',function()
 	{
 		console.log("why not dd");
 		
 	});


	$( "#genre_class" ).click(function()
	 {
		  radio_selection='./data/genres.json';
		  console.log("Genres");
		  $("#my-input").value="";
		  $('#scrollable-dropdown-menu .typeahead').typeahead('destroy');
		  localStorage.clear();
	      $('#scrollable-dropdown-menu .typeahead').typeahead({
	        name: 'Genres',

	        // data source
	        
	        prefetch: radio_selection,

	        // max item numbers list in the dropdown
	        limit: 100
	      });
	});



	$( "#artist_class" ).click(function() 
	{
		  	radio_selection='./data/artists.json';
		  	$('#scrollable-dropdown-menu .typeahead').typeahead('destroy');
		  	localStorage.clear();
		  	$("#my-input").value="";
	        $('#scrollable-dropdown-menu .typeahead').typeahead({
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

      $('#scrollable-dropdown-menu .typeahead').typeahead({
        name: 'Load_Data',

        // data source
        
        prefetch: radio_selection,

        // max item numbers list in the dropdown
        limit: 500
      });
  });