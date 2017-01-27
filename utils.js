var Utils = {

	// Create TextEdit controls with language label - and add to parentLayout
	CreateLanguageTextEdits : function(languages, parentLayout, width, height, options) {

		var txes = {};

		width = width ? width : -1;
		height = height ? height : -1;

		for(var i = 0; i < languages.length; ++i)
		{
			var lang = languages[i];

			var layLang = app.CreateLayout("Horizontal", "Left");
			{
				var txt = app.CreateText(lang.toUpperCase());
				txt.SetMargins(0, 0.01, 0.01, 0);
				txt.SetTextSize(18);
				layLang.AddChild(txt);

				txes[lang] = app.CreateTextEdit("", width, height, options);
				txes[lang].SetHint(lang.toUpperCase());
				layLang.AddChild(txes[lang]);
			}
			parentLayout.AddChild(layLang);
		}

		return txes;
	},
	
	GetUserLocation : function( callback )
	{
		var getPosition = function( position ) {
			console.log( "Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude ); 
			callback( position );
		}
		
		var getError = function () {
			function showError(error) {
				switch(error.code) 
				{
					case error.PERMISSION_DENIED: alert( "User denied the request for Geolocation." ); break;
					case error.POSITION_UNAVAILABLE: alert(  "Location information is unavailable." ); break;
					case error.TIMEOUT: alert( "The request to get user location timed out." ); break;
					case error.UNKNOWN_ERROR: alert(  "An unknown error occurred getting location information." ); break;
				}
			}
		}
		
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition( getPosition, getError );
		} else {
			alert( "Geolocation is not supported by this browser." );
		}
	},
	
	Ellipsize : function( str, maxLen )
	{
		//return str;
		if( str.length > maxLen ) str = str.substring(0,maxLen)+"...";
		return str;
	},
	
	ListEscape : function( str )
	{
		return str.replace(/:/g, "^c^");
	}
}
