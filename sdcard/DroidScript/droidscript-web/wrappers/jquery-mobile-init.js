
$(document).bind('mobileinit',function()
{
	//Avoids Chrome error:- Uncaught SecurityError:
	$.mobile.changePage.defaults.changeHash = false;
	$.mobile.hashListeningEnabled = false;
	$.mobile.pushStateEnabled = false;
	
	$( window ).resize(function() 
	{
		for (var key in _map) 
		  if( _map[key] ) _map[key]._Redraw();
	
		//Force fixed height to panels so we can use 100% vals for child objects.
		setTimeout( function() { 
			var div = $('[class*="ui-panel-wrapper"]'); 
			div.css( "height", div.height() );
			}, 100 );
	});
});
