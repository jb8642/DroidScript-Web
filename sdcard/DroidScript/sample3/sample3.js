
//Called when application is started.
function OnStart()
{    
    OnConfig();
}

function OnConfig() {
    var scroll = app.CreateScroller( 1, 1 );
    //scroll.SetBackColor( "White" );
    
	var lay = app.CreateLayout( "Linear", "Vertical,Left" );
	lay.SetBackground( "Img/android.png", "repeat" );
	lay.SetPadding( 0.1,0,0.1,0.05 );

	var layHoriz = app.CreateLayout("Linear", "Horizontal" );
	lay.AddChild( layHoriz );
	
	var img = app.CreateImage( "Img/medal.png", 0.08 );
	img.SetMargins( 0.02, 0.02, 0.02, 0.02 );
	layHoriz.AddChild( img );
	
	var layVert = app.CreateLayout( "Linear", "Vertical");
	layHoriz.AddChild( layVert );
	
	var img = app.CreateImage( "Img/icon.png" );
	img.SetMargins( 0, 0.02, 0, 0 );
	layVert.AddChild( img );
	
	var s = "<b>DroidScript Coding Competition Winners</b><br><h3>2016</h3>"
	var txt = app.CreateText( s, 0.5, -1, "MultiLine,Html" );
	txt.SetMargins( 0.02, 0.02, 0.02, 0 );
	txt.SetTextSize( 26 );
	layVert.AddChild( txt );
	
	var img = app.CreateImage( "Img/medal.png", 0.08 );
	img.SetMargins( 0.02, 0.02, 0.02, 0.02 );
	layHoriz.AddChild( img );
	
	var txt = app.CreateText( "Games", -1,-1, "bold" );
	txt.SetMargins( 0.02, 0, 0.02, 0 );
	txt.SetTextColor( "green" );
	txt.SetTextSize( 26 );
	lay.AddChild( txt );
	
    var list = "The Walls:Todor Hryn::Img/The Walls.png,"
        + "Intergalactic Bar Billiards:Chris Miller:Img/IBB.png,"
        + "Xcar:Ben Weidl (mengistcool):Img/Xcar.png,"
        + "Pipe Tracker:AlexF (Symbroson):Img/Pipe Tracker.png";
    
    var dlgs1 =["The Walls|<b>Todor Hryn</b>"
        + "<br><br>An addictive game with a nice variety of graphics.<br><br>"
        + "Every time you move all cells swap state between empty and obstacle. "
        + "The game is over if you move to a cell that is currently surrounded "
        + "by empty cells because each of them will turn into an obstacle.<br><br>"
        + "Don't get trapped!",

        "IBB|<b>Chris Miller</b>"
        + "<br><br>A spaced out game of billiards inspired by the " 
        + "'Hitchhikers Guide to the Galaxy'.<br><br> Chris created the music "
        + "himself for this game and would like to acknowledge the coding wizardry "
        + "of Ben; his father Dirk; and AlexF who all helped to bring this game "
        + "to life. <br><br>Watch out for the black hole!",
        
        "Xcar|<b>Ben Weidl (mengistcool)</b>"
        +"<br><br>An exciting 3D driving game with awesome sound effects.<br><br>" 
        + "This game shows an impressive understanding of 3D graphics and matrix "
        + "mathematics.<br><br>"
        + "Keep your eyes on the road or you'll regret it!",
        
        "Pipe Tracker|<b>AlexF (Symbroson)</b>"
        + "<br><br>Another excellent game from our resident coding wizard.<br><br>" 
        + "This game is both clever and original and provides the full multi-level "
        + "game experience.<br><br>"
        + "Timing and concentration are essential or it's game over dude!"];
    
    lst = app.CreateList( list, 0.8, -1, "Menu,Expand,cards:2x3" );
	lst.SetOnTouch( function(title,body,type,index){ShowDialog(title,dlgs1[index])} );
    lay.AddChild( lst );
    
	var txt = app.CreateText( "Tools and Education", -1,-1, "bold" );
	txt.SetMargins( 0.02, 0.04, 0.02, 0 );
	txt.SetTextColor( "green" );
	txt.SetTextSize( 26 );
	lay.AddChild( txt );
		
	var list = "ExtUI:Alexandr Strashko:Img/ExtUI.png,"
		+ "PicSite:Nikhil Baby:Img/PicSite.png,"		
		+"CTF Time Tables:Mickael Bauer (BareK):Img/CTF Time Tables.png";
    
	var dlgs2 = ["ExtUI|<b>Alexandr Strashko</b>"
	    + "<br><br>This powerful DroidScript plugin will be an excellent addition "
	    + "to our official plugins list.<br><br>It provides a treasure trove of "
	    + "Android widgets and exposes a generic way of accessing the Android API's."
	    + "<br><br>This guy really knows his stuff!",
		
		"PicSite|<b>Nikhil Baby</b><br><br>This well crafted app shows a real flare"
		+ "for graphics and presentation.<br><br>The tutorial and docs are especially"
		+ "well implemented and it's a very professional job overall.<br><br>"
		+ "This could actually be a useful app too!",
		
		"CTF Time Tables|<b>Mickael Bauer (BareK)</b><br><br>An educational and "
		+ "fun app with an attractive user interface.<br><br>Demonstrating how to "
		+ "create good looking and entertaining educational apps; Mickael shows us "
		+ "how ClickTeam Fusion projects exported as HTML5 can easily be used in "
		+ "DroidScript.<br><br>Crunch those numbers as fast as you can!"];
    
    lst = app.CreateList( list, 0.8, -1, "Menu,Expand,cards:2x3" );
	lst.SetOnTouch( function(title,body,type,index,data){ShowDialog(title,dlgs2[index])} );
    lay.AddChild( lst );

	scroll.AddChild( lay );
	app.AddLayout( scroll );
}

function ShowDialog( title, data )
{
	var spk = data.split("|")[0];
	var notes = data.split("|")[1];
	
    var portrait=(app.GetOrientation() == "Portrait");
	var dlg = app.CreateDialog( title, "AutoCancel" );

	var layDlg = app.CreateLayout( "Linear", portrait?"Vertical":"Horizontal" );
	layDlg.SetMargins( 0.02, 0.02, 0.02, 0.02 );
	dlg.AddLayout(layDlg);
	
	var layVert = app.CreateLayout("Linear", "Vertical");
	layVert.SetMargins( 0.02, 0.02, 0.02, 0.02 );
	layDlg.AddChild(layVert);
	
	var img = app.CreateImage( "Img/"+spk+".png", portrait?0.2:0.15 );
	layVert.AddChild( img );
	
	var path = "http://androidscript.org/Home/demos/";
    
	var url=encodeURI(path+spk)+".spk";
	var fn=null;
	var s = "<a href='"+url+"' target='_blank' download>Download SPK</a>";
	if( spk=="ExtUI" ) {
	    fn=function() { alert("Coming soon!"); }
	    s = "<a href='#' onclick='"+fn.toString()+"'>Download Plugin</a>";
	}
	var txt = app.CreateText( s, -1,-1, "html" );
    txt.touched=0;
	txt.SetOnTouch(function() {
        if(fn) { fn(); }
        else {
            // Debounce touch with 1 sec delay
            var now=new Date().getTime();
            if(now - txt.touched < 1000) { return; }
            txt.touched=now;

            var tgt="/sdcard/Download";
            dload = app.CreateDownloader(); 
            dload.SetOnComplete( function(evt) {
                    alert("Downloaded to "+tgt+" "+url);
                }); 
            dload.Download( url, tgt ); 
        }
    });
    
	txt.SetMargins( portrait?0.02:0, 0.02, 0, 0 );
	layVert.AddChild( txt );
	
	var txt = app.CreateText( notes, portrait?0.7:0.2,-1, "Left,MultiLine,HTML" );
	txt.SetMargins( portrait?0.02:0, portrait?0:0.02, 0.02, 0.02 );
	layDlg.AddChild( txt );
	
	dlg.Show();
}
