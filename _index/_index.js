var folder="/sdcard/DroidScript";

//Called when application is started.
function OnStart()
{    
    OnConfig();
}

function OnConfig() {
    var scroll = app.CreateScroller( 1, 1 );
    scroll.SetBackColor( "White" );
    
	var lay = app.CreateLayout( "Linear", "Vertical,Left" );
	lay.SetPadding( 0.1,0,0.1,0.05 );

	var layHoriz = app.CreateLayout("Linear", "Horizontal" );
	lay.AddChild( layHoriz );
	
	var layVert = app.CreateLayout( "Linear", "Vertical");
	layHoriz.AddChild( layVert );
	
	var s = "<h3>Applications</h3>"
	var txt = app.CreateText( s, 0.5, -1, "MultiLine,Html" );
	txt.SetMargins( 0.02, 0.02, 0.02, 0 );
	txt.SetTextSize( 26 );
	layVert.AddChild( txt );
	
    var list=app.ListFolder(folder);
    list=list.filter(function(item){
        return app.FileExists(folder+'/'+item+'/'+item+'.js');
    }).map(function(item){        
        var icon='../'+item+'/Img/'+item+'.png';
        if(!app.FileExists(icon)) { icon='Img/Pillar.png'; }
        return item+':'+icon;
    });
    
    lst = app.CreateList( list, 0.8, -1, "Menu,Expand"); //,cards:2x3" );
	lst.SetOnTouch( RunApp );
    lay.AddChild( lst );
    
	scroll.AddChild( lay );
	app.AddLayout( scroll );
}

function RunApp( title, body, type, index ) {
    var appName=folder+'/'+title+'/'+title+'.js';
    var data ={action:"android.intent.action.VIEW"}
    var intent= JSON.stringify(data)
    app.StartApp(appName,"",intent );
}
