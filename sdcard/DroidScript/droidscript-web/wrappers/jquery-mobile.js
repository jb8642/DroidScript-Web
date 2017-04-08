/* Browser-based DroidScript implementation
 * Copyright 2017 droidscript.org
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _h = 0;
var _w = 0;
var _jqmId = 0;
var _transitionalAPI = false; // Detect use of incompatible API and switch to using it
var _files=[];
var _started = false;
var _menu="";
var _backPressed=0;

function _getGUIImpl()
{
	return new JQueryMoble();
}

function JQueryMoble()
{
	var isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent));
	var backColor = null;
	
	this.IsMobile = function() { return isMobile; };
	this.GetScreenWidth = function() { return $(window).width() };
 	this.GetScreenHeight = function() { return $(window).height() };
 	this.GetDisplayWidth = function() { return $(window).width() };
 	this.GetDisplayHeight = function() { return $(window).height() };
	this.GetOrientation = function() {
        if(_h > _w) { return "Portrait"; }
        return "Landscape";
    };
	
	this.CreateLayout = function( type, options ) { return new JQueryMobile_Lay(type, options);	};
	this.CreateScroller = function( width, height, options ) { return new JQueryMobile_Scr(width, height, options);	};
    this.CreateDownloader = function() { return new JQueryMobile_Dwn(); }
	this.CreateImage = function(file, width, height, options, w, h) { return new JQueryMobile_Img(file, width, height, options, w, h); };
	this.CreateButton = function(title, width, height, options) { return new JQueryMobile_Btn(title, width, height, options); };
	this.CreateText = function(text, width, height, options) { return new JQueryMobile_Txt(text, width, height, options); };
	this.CreateTextEdit = function(text, width, height, options) { return new JQueryMobile_Txe(text, width, height, options); };
	this.CreateCheckBox = function(text, width, height, options) { return new JQueryMobile_Chk(text, width, height, options); };
	this.CreateSpinner = function(list, width, height, options) { return new JQueryMobile_Spn(list, width, height, options); };
	this.CreateList = function(list, width, height, options) { return new JQueryMobile_Lst(list, width, height, options); };
	this.CreatePanel = function(options) 
	{ 
		var panel = new JQueryMobile_Pnl(options);
		if(panel !== null) { getPage().append(panel); }
		panel.panel();
		if( backColor ) getPanelWrapper().css("background-color", backColor);
	
		return panel;
	};
	this.CreateActionBar = function(title, buttons) 
	{ 
		var actionBar = new JQueryMobile_Bar(title, buttons);
		if(actionBar !== null) { getPage().prepend(actionBar); }
		actionBar.toolbar();

		// This seems to be required to make sure the page content
		// is resized properly once the header is made visible
		$(window).trigger('resize');
		
		return actionBar;
	};
	this.CreateDialog = function( title,options ) 
	{ 
		var dialog = new JQueryMobile_Dlg(title, options);
		if(dialog !== null)
		{ 
			getPage().append(dialog);
			dialog.popup();		
		}
		return dialog;
	};
	this.CreateYesNoDialog = function( msg ) 
	{ 
		var dialog = new JQueryMobile_Ynd(msg);
		if(dialog !== null) 
		{ 
			getPage().append(dialog);
			dialog.popup();
			dialog.popup("open");
		}
		return dialog;
	};
	this.CreateMap = function(url,width,height,options) { return new JQueryMobile_Map(url, width, height, options); };

	this.AddLayout = function( layout ) { 
		getPageContent().append(layout);
	};

	this.RemoveLayout = function( layout ) { 
		layout.detach();
	};

	this.DestroyLayout = function( layout ) { 
		layout.remove();
	};

	this.ShowPopup = function(msg, options) {
		var duration = 3500;

		options = options ? options.toLowerCase() : "";

		if(options.indexOf("short") > -1)
		{
			duration = 2000;
		}

		$("#showPopup p").text(msg);

		// Must initialise before opening
		$("#showPopup").popup();
		$("#showPopup").popup("open");

		setTimeout(function() {
			$("#showPopup").popup("close");
		}, duration);
	};
    
    this.ListFolder = function(path, filter, limit, options) {
        options = options ? options.toLowerCase() : "";
        
//        if(path[0] != '/') { path = _prefix+path; }
//         var results=[];
//         for(var xa=0; xa<localStorage.length; xa++) {
//             var key=localStorage.key(xa);
//             if(filter && key.lastIndexOf(filter) !== key.length-filter.length) { continue; }
//             if(key.indexOf(path+"/") == 0) { results.push(key); }
//         }
        while(path.length>1 && path[path.length-1] == '/') { path=path.substr(0,path.length-1); } // Trim trailing slashes
        var id="FILE:"+path;
        var file=_retrieveFile(path);
        console.log("file="+file+";type="+file.type);
        if(file.type !== "inode/directory") { return ""; }
        var data=JSON.parse(_blobToString(file));
        console.log('ListFolder('+path+')='+JSON.stringify(data));
        return data;
    };

    this.MakeFolder = function(path) {
        console.log("path="+path);
        if(this.FolderExists(path)) { return; }
        var prev=path.split('/').slice(0,-1).join('/');
        if(prev !== '') { this.MakeFolder(prev); } // Make parent folder(s)
        _createDirWithFilenames(path, []);
    };

    this.FolderExists = function(path) {
        return (_retrieveFile(path) !== null);
    };

    this.FileExists = function(path) {
        return (_retrieveFile(path) !== null);
    };

    this.GetPrivateFolder = function(name) { // NOTE: Creates the folder when called
        // e.g. /data/user/0/com/smartphoneremote.androidscriptfree/app_test
        var uid=0; // FIXME: Need different uid for each website visitor (use cookie/login)
        var path="/data/user/"+uid+"/com/smartphoneremote.androidscriptfree/app_"+name;
        this.MakeFolder(path);
        return path;
        // NOTE: Need: Sync files/folders TO server (if permissions allow)
        // NOTE: Private folder and its contents should generally be allowed (excepting bandwidth/resource limits exceeded)
        // NOTE: Constraints per IP and/or cookie / bandwidth usage should be checked first
    };

    this.StartApp = function( file, options, intent ) {
        console.log('StartApp: file='+file+',options='+options+',intent='+intent);
        if(intent) { intent=JSON.parse(intent); }
        else intent={}; 
        if(intent.action === 'android.intent.action.VIEW') {
            var url=file.replace("/sdcard/DroidScript/","/app/").replace(/[_\-a-zA-Z0-9][_\-a-zA-Z0-9]*.js/,'');
            document.location=url;
        }
    };

    this.SetMenu = function( list, iconPath ) {
        _menu=list;
        console.log("FIXME: SetMenu");
    };
    
    this.ShowMenu = function() {
        console.log("FIXME: ShowMenu");
        alert('menu:'+_menu);
    };
    
    this.EnableBackKey = function( enable ) {
        if(enable) {
            window.removeEventListener('popstate');
            console.log("FIXME: Does EnableBackKey really work?");
        }
        else {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);                
                if(typeof OnBack === 'function' && _backPressed > 1) { OnBack(); }
                _backPressed++;
            });
        }
    };
    
    this.LoadNumber = function( valueName, dft, shareId ) {
        var id='VAL'+valueName+(shareId ? (":"+shareId) : "");
        var ref=localStorage[id];
        if(!ref) { return dft; }
        ref=JSON.parse(ref);
        if(ref.type == 'number') { return ref.val; }
    };
    
    this.SaveNumber = function( valueName, val, shareId ) {
        var id='VAL'+valueName;
        localStorage[id]=JSON.stringify({type:'number', val:val, share:shareId});
    }

	this.SetBackColor = function( clr ) { backColor = clr; getPage().css("background-color", clr); getPanelWrapper().css("background-color", clr); };
	
	function getPanelWrapper() { return $("div .ui-panel-wrapper"); }
	function getPage() { return $("div[data-role='page']"); }
	function getPageContent() {	return $("div[data-role='page'] .ui-content"); }
	function getHeader() { return $("div[data-role='header']"); }
	

}

function JQueryMobile_Lay(type, options)
{
	var lay = $("<div>");
	lay.css( { display:"block", "text-align":"center", "white-space":"nowrap", "overflow":"hidden" } );
	_initObj(lay);

	options = options ? options.toLowerCase() : "";

	if(options.indexOf("fillxy") > -1)
	{
		lay.css( { width:"100%", height:"100%" } );
	}
	else if(options.indexOf("fillx") >-1)
	{
		lay.css( { width:"100%" } );
	}
	else if(options.indexOf("filly") >-1)
	{
		lay.css( { height:"100%" } );
	}
	if(options.indexOf("left") >-1)
	{
		lay.css( { "text-align": "left" } );
	}
	else if(options.indexOf("right") >-1)
	{
		lay.css( { "text-align": "right" } );
	}

	var orientation = "vertical";

    if(type) {
        type = type.toLowerCase();
        if(type=="horizontal" || type=="vertical") { _transitionalAPI=true; } // DroidScript API uses options for this
    }
	if(options.indexOf("horizontal") >-1 || 
        type && type.toLowerCase()=="horizontal") // Web-only API
	{
		orientation = "horizontal";
	}

	lay.AddChild = function( child ) 
	{ 
		if(orientation === "vertical")
		{
			child.removeClass("horizontal-child");
			child.addClass("vertical-child");
		}
		else
		{
			if( options.indexOf("vcenter") > -1 ) {
				child.removeClass("vertical-child");
				child.addClass("horizontal-child-vcenter");
			}
			else {
				child.removeClass("vertical-child");
				child.addClass("horizontal-child");
			}
		}

		lay.append( child );

		if(orientation === "vertical")
			lay.append("<br>");

		if(child.init)
			child.init();
	};

	return lay;
}

function JQueryMobile_Dwn() {
    var dwn={};
        
    dwn.SetOnComplete = function( callback ) { dwn.callback=callback; };
    
    dwn.Download = function(url, tgt) {
        //window.location=url;
        window.open(url, "_blank"); // Download tgt is ignored on this platform
    };
    
    return dwn;
//     obj.Download = function( url,dest ) { this.impl.Download(url, dest); }
//     obj.IsComplete = function() { return this.impl.IsComplete(); } 
//     obj.GetProgress = function() { return this.impl.GetProgress(); }  
//     obj.GetSize = function() { return this.impl.GetSize(); }  
//     obj.SetOnComplete = function( callback ) { this.impl.SetOnComplete(callback); }
//     obj.SetOnError = function( callback ) { this.impl.SetOnError(callback); }
}

function JQueryMobile_Scr(width, height, options)
{
	var scr = $("<div>");
	scr.css( { display:"block", "text-align":"center", "white-space":"nowrap", "overflow":"hidden", "background-color":"black" } );
	_initObj(scr);

	options = options ? options.toLowerCase() : "";

	if(options.indexOf("fillxy") > -1)
	{
		scr.css( { width:"100%", height:"100%" } );
	}
	else if(options.indexOf("fillx") >-1)
	{
		scr.css( { width:"100%" } );
	}
	else if(options.indexOf("filly") >-1)
	{
		scr.css( { height:"100%" } );
	}
	if(options.indexOf("left") >-1)
	{
		scr.css( { "text-align": "left" } );
	}
	else if(options.indexOf("right") >-1)
	{
		scr.css( { "text-align": "right" } );
	}

	scr.AddChild = function( child ) 
	{ 
        child.removeClass("horizontal-child");
        child.addClass("vertical-child");

		scr.append( child );

		scr.append("<br>");

		if(child.init)
			child.init();
	};
    
/*    // Remaining to implement:
    obj.RemoveChild = function( child ) { this.impl.RemoveChild(child.impl); } //prompt( obj.id, "Scr.RemoveChild(\f"+(child?child.id:null) ); }    
    obj.DestroyChild = function( child ) { this.impl.DestroyChild(child.impl); } //prompt( obj.id, "Scr.DestroyChild(\f"+(child?child.id:null) ); }  
    obj.ScrollTo = function( x,y ) { this.impl.ScrollTo(x,y); } //prompt( obj.id, "Scr.ScrollTo\f"+x+"\f"+y ); }
    obj.ScrollBy = function( x,y ) { this.impl.ScrollBy(x,y); } // prompt( obj.id, "Scr.ScrollBy\f"+x+"\f"+y ); }
    obj.GetScrollX = function() { return this.impl.GetScrollX(); } // parseFloat(prompt( obj.id, "Scr.GetScrollX(" )); }
    obj.GetScrollY = function() { return this.impl.GetScrollY(); } // (prompt( obj.id, "Scr.GetScrollY(" )); }
*/    
	return scr;
}

function JQueryMobile_Img(file, width, height, options, w, h)
{
	var w = width, h = height;
	var img = $("<img id='img' src=\"" + file + "\">");
	_initObj(img);
	_setSize(img, width, height, options);

	options = options ? options.toLowerCase() : "";

	img.Clear = function() { console.log("Clear not implemented"); } 
    img.Update = function() { console.log("Update not implemented"); }
    img.SetAutoUpdate = function( onoff ) { console.log("SetAutoUpdate not implemented"); }
    img.SetName = function( name ) { console.log("SetName not implemented"); }
    img.GetName = function() { console.log("GetName not implemented"); return ""; }
    img.SetImage = function( image,width,height,options ) {
    	img.attr("src", image);
    	_setSize(img, width?width:w, height?height:h, options);
	}
	img.GetImage = function() { return img.attr("src"); }
	img.GetPixelData = function( format,left,top,width,height ) { console.log("GetPixelData not implemented"); return null; }
    img.SetSize = function( width,height ) { _setSize(img); }
    img.GetHeight = function() { console.log("GetHeight not implemented"); return 0; }
    img.GetWidth = function() { console.log("GetWidth not implemented"); return 0; }
    img.GetAbsHeight = function() { console.log("GetAbsHeight not implemented"); return 0; }
    img.GetAbsWidth = function() { console.log("GetAbsWidth not implemented"); return 0; } 
    //img.SetOnTouch = function( callback ) { this.impl.SetOnTouch(callback); } 
    //img.SetOnTouchUp = function( callback ) { this.impl.SetOnTouchUp(callback); }  
    //img.SetOnTouchMove = function( callback ) { this.impl.SetOnTouchMove(callback); }
    //img.SetOnTouchDown = function( callback ) { this.impl.SetOnTouchDown(callback); }
    img.SetOnTouch = function( callback ) { 
    	img.mouseup(function() { callback("Up"); }); 
    	//img.mousedown(function() { callback("Down"); }); 
    	//img.mousemove(function() { callback("Move"); });
		img.css("cursor", (callback?"pointer":"auto") );
    } 
    img.SetOnTouchUp = function( callback ) { img.mouseup(callback); img.css("cursor",(callback?"pointer":"auto"));  }  
    img.SetOnTouchMove = function( callback ) { img.mousemove(callback); img.css("cursor",(callback?"pointer":"auto")); }
    img.SetOnTouchDown = function( callback ) { img.mouseup(callback); img.css("cursor",(callback?"pointer":"auto")); } 
    img.SetOnLongTouch = function( callback ) { console.log("SetOnLongTouch not implemented"); img.css("cursor",(callback?"pointer":"auto")); }   
    img.SetTouchable = function( touchable ) { console.log("SetTouchable not implemented"); }
 //    img.SetOnLoad = function( callback ) { this.impl.SetOnLoad(callback); }
 //    img.SetMaxRate = function( ms ) { this.impl.SetMaxRate(ms); }
 //    img.DrawImage = function( image,x,y,w,h,angle,mode ) { 
	// 	if( obj._auto ) this.impl.DrawImage((image?image.impl:null), x, y, w, h, angle, mode); 
	// 	else this.Draw( "i", (image?image.id:null), x,y,(w?w:-1),(h?h:-1),angle,mode ); }
	// obj.DrawImageMtx = function( image,matrix ) { 
	// 	if( obj._auto ) this.impl.DrawImageMtx((image?image.impl:null), matrix); 
	// 	else this.Draw( "m", (image?image.id:null), matrix ); }
 //    obj.DrawPoint = function( x,y ) { 
	// 	if( obj._auto ) this.impl.DrawPoint(x, y); else this.Draw( "p", null, x,y ); }
 //    obj.DrawCircle = function( x,y,radius ) { 
	// 	if( obj._auto ) this.impl.DrawCircle(x, y, radius);
	// 	else this.Draw( "e", null, x,y,radius ); }
 //    obj.DrawArc = function( x1,y1,x2,y2,start,sweep ) { 
	// 	if( obj._auto ) this.impl.DrawArc(x1, y1, x2, y2, start, sweep);
	// 	else this.Draw( "a", null, x1,y1,x2,y2,start,sweep ); }
 //    obj.DrawLine = function( x1,y1,x2,y2 ) { 
	// 	if( obj._auto ) this.impl.DrawLine(x1, y1, x2, y2); 
	// 	else this.Draw( "l", null, x1,y1,x2,y2 ); }
 //    obj.DrawRectangle = function( x1,y1,x2,y2 ) { 
	// 	if( obj._auto ) this.impl.DrawRect(x1, y1, x2, y2);
	// 	else this.Draw( "r", null, x1,y1,x2,y2 ); }
 //    obj.DrawText = function( txt,x,y ) { 
	// 	if( obj._auto ) this.impl.DrawText(txt, x, y); 
	// 	else this.Draw( "t", txt, x, y, 0,0,0 ); }
	// obj.SetAlpha = function( alpha ) { if( obj._auto ) this.impl.SetAlpha(alpha); else this.Draw( "k",null,alpha ); }
 //    obj.SetColor = function( clr ) { if( obj._auto ) this.impl.SetColor(clr); else this.Draw( "o", clr ); }
 //    obj.SetTextSize = function( size ) { if( obj._auto ) this.impl.SetTextSize(size); else this.Draw( "x",null,size ); }
 //    obj.SetFontFile = function( file ) { if( obj._auto ) this.impl.SetFontFile(file); else this.Draw( "f",file ); }  
 //    obj.SetLineWidth = function( width ) { if( obj._auto ) this.impl.SetLineWidth(width); else this.Draw( "w",null,width ); }
 //    obj.SetPaintColor = function( clr ) { if( obj._auto ) this.impl.SetPaintColor(clr); else this.Draw( "n",clr ); }
 //    obj.SetPaintStyle = function( style ) { if( obj._auto ) this.impl.SetPaintStyle(style); else this.Draw( "s",style ); } 
 //    obj.Rotate = function( angle,pivX,pivY ) { this.impl.Rotate(angle, pivX, pivY); }
 //    obj.Move = function( x,y ) { this.impl.Move(x, y); }
 //    obj.Scale = function( x,y ) { this.impl.Scale(x, y); }
 //    obj.Skew = function( x,y ) { this.impl.Skew(x, y); }
 //    obj.Transform = function( matrix ) { this.impl.Transform(matrix); }
 //    obj.Reset = function() { this.impl.Reset(); }
 //    obj.Save = function( fileName,quality ) { this.impl.Save(fileName, quality); }
 //    obj.Draw = function( func, p1, p2, p3, p4, p5, p6, p7 ) {
	// 	if( obj._gfb.length > 2 ) obj._gfb += "\f";
	// 	obj._gfb += func + "¬" + p1 + "¬" + p2 + "¬" + p3 + "¬" + p4 + "¬" + p5 + "¬" + p6 + "¬" + p7;
	// }

	return img;
}

function JQueryMobile_Btn(title, width, height, options)
{
	options = options ? options.toLowerCase() : "";
	var button,fileInput,btn,onUpload;
	
	var filestack = (options.indexOf("filestack") > -1 );
	if( false && filestack ) {
		button = $("<div>");
		fileInput = $("<input type=\"filepicker\" data-fp-apikey=\"A1KC38flRmucYlZyZRVLLz\" data-fp-mimetypes=\"image/*\" data-fp-container=\"modal\" data-fp-maxsize=\"300000\" data-fp-services=\"COMPUTER,DROPBOX,FACEBOOK,GOOGLE_DRIVE,INSTAGRAM,IMAGE_SEARCH,WEBCAM\" onchange=\"alert(event.fpfile.url)\">");
		button.append( fileInput );
	}
	else button = $("<a href=\"#\" class=\"ui-btn ui-shadow ui-btn-inline ui-corner-all no-mXargin\">" + title + "</a>");
	_initObj(button);

	_setSize(button, width, height, options);
	if(options.indexOf("mini") >= 0) button.addClass("ui-mini");
	
	button.pick = function()
	{
		var mode = options.indexOf("window")>-1 ? 'window' : 'modal';
		filepicker.setKey( "A1KC38flRmucYlZyZRVLLz" );
		filepicker.pick( {
			services: ['CONVERT','COMPUTER','DROPBOX','FACEBOOK','GOOGLE_DRIVE','INSTAGRAM','IMAGE_SEARCH','WEBCAM'],
			conversions: ['crop', 'rotate', 'filter'], mimetype: 'image/*', container: mode,
			ximageDim: [800,600], xcropDim: [800,600], cropRatio: [8/6], cropForce: false
		 },
		 function( blob ) {
			console.log(JSON.stringify(blob))
			if( onUpload ) onUpload( blob.url );
		 },
		 function(FPError){ console.log(FPError.toString()); }
		);
	}

	button.SetOnClick = function(callback) { if( filestack ) { onUpload=callback; button.click(function(){button.pick();});} else button.click(callback); }
    button.SetText = function( text ) { button.text(text); }   
    button.SetHtml = function( html ) { button.html(html); }  
    button.GetText = function() { return button.text(); }  
    button.SetTextColor = function( clr ) { button.css("color", clr); }    
    button.SetFontFile = function( file ) { console.log("SetFontFile not implemented"); }  
    button.SetTextShadow = function( radius,dx,dy,color ) { console.log("SetTextShadow not implemented"); } 
    button.SetTextSize = function( size,mode ) { button.css("font-size", size); }   
    button.GetTextSize = function( mode ) { return button.css("font-size"); }
    button.SetStyle = function( clr1,clr2,radius,strokeClr,strokeWidth,shadow ) { console.log("SetStyle not implemented"); } 

	return button;
}

function JQueryMobile_Chk(text, width, height, options)
{
	var checkbox = $("<label>");
	checkbox.append("<input type=\"checkbox\">" + text);
	checkbox.css("margin", 0);
	_initObj(checkbox);

	_setSize(checkbox, width, height, options);

	options = options ? options.toLowerCase() : "";

	checkbox.SetOnTouch = function( callback ) { checkbox.click(callback); }
    checkbox.SetText = function( text ) { checkbox.text(text); }    
    checkbox.GetText = function() { return checkbox.text(); }   
    checkbox.SetTextColor = function( clr ) { checkbox.css("color", clr); }    
    checkbox.SetTextSize = function( size,mode ) { checkbox.css("font-size", size); }   
    checkbox.GetTextSize = function( mode ) { return checkbox.css("font-size"); }  
    checkbox.SetChecked = function( checked ) { checkbox.prop("checked", checked).checkboxradio("refresh"); }   
    checkbox.GetChecked = function() { return checkbox.prop("checked"); }

    checkbox.checkboxradio();

	return checkbox;
}

function JQueryMobile_Txt(text, width, height, options)
{
	options = options ? options.toLowerCase() : "";
	
	var txt = $("<div></div>");
	_initObj(txt);
	_setSize(txt, width, height, options);

		
	if(options.indexOf("html") >= 0) txt.html( text );
	else txt.text( text );

	if(options.indexOf("left") > -1) txt.css("text-align", "left");
	else if(options.indexOf("right") > -1) txt.css("text-align", "right");
	
	//txt.css( "word-wrap", "break-word" );
	if( options.indexOf("multiline") > -1) txt.css( "white-space", "normal" );
	if( options.indexOf("bold") > -1 ) txt.css( "font-weight", "600" );

	txt.SetText = function( text ) { txt.text(text); }  
    txt.SetHtml = function( html ) { txt.html(html); } 
    txt.Log = function( msg,options ) { console.log("Log not implemented"); } 
    txt.SetLog = function( maxLines ) { console.log("SetLog not implemented"); } 
    txt.SetTextSize = function( size,mode ) { txt.css("font-size", size); }   
    txt.GetTextSize = function( mode ) { return txt.css("font-size"); }  
    txt.GetText = function() { return txt.text(); }  
    txt.SetTextColor = function( color ) { txt.css("color", color); }    
    txt.SetFontFile = function( file ) { console.log("SetFontFile not implemented"); }   
    txt.GetLineCount = function() { console.log("GetLineCount not implemented"); return 0; }   
    txt.GetMaxLines = function() { console.log("GetMaxLines not implemented"); return 0; }   
    txt.GetLineTop = function( line ) { console.log("GetLineTop not implemented"); return 0; }   
    txt.GetLineStart = function( line ) { console.log("GetLineStart not implemented"); return 0; }  
    txt.SetEllipsize = function( mode ) { console.log("SetEllipsize not implemented"); return 0; } 
    txt.SetTextShadow = function( radius,dx,dy,color ) { console.log("SetTextShadow not implemented"); return 0; }   
    txt.SetOnTouch = function( callback ) { 
        txt[0].onclick=function() { callback(); return false; }; // Needed to prevent default link action.  Apparently using mouseup doesn't return callback value.
    	//txt.mouseup(callback); 
    	//txt.mousedown(function() { callback("Down"); }); 
    	//txt.mousemove(function() { callback("Move"); });
    } 
    txt.SetOnTouchUp = function( callback ) { txt.mouseup(callback); }  
    txt.SetOnTouchMove = function( callback ) { txt.mousemove(callback); }
    txt.SetOnTouchDown = function( callback ) { txt.mousedown(callback); } 
    txt.SetOnLongTouch = function( callback ) { console.log("SetOnLongTouch not implemented"); }   
    txt.SetTouchable = function( touchable ) { console.log("SetTouchable not implemented"); }

	return txt;
}

function JQueryMobile_Txe(text, width, height, options)
{
	options = options ? options.toLowerCase() : "";
	var multiline = (options.indexOf("multiline")>-1);
	var date = (options.indexOf("date")>-1);
	
	var txe,txeInput;
	if( !multiline ) 
	{
		txe = $("<div class=\"ui-input-text ui-body-inherit ui-corner-all ui-shXadow-inset no-margin\">");
		if( date ) { txeInput = $("<input class=\"date-input-css\" value=\""+text+"\">"); txeInput.datepicker(); }
		else txeInput = $("<input value=\""+text+"\">");
		txe.append(txeInput);
	}
	else {
		txe = txeInput = $("<textarea class=\"ui-input-text ui-body-c ui-corner-all ui-shXadow-inset\">"+text+"</textarea>");
	}
	_initObj(txe);
	_setSize(txe, width, height, options);

	if(options.indexOf("password") > -1)
		txeInput.attr("type", "password");
	else
		txeInput.attr("type", "text");

	txe.keyup(function() {
		if(txe.onChangeCallback)
			txe.onChangeCallback();
	})

	txe.SetText = function( text ) { txeInput.val(text); }  
    txe.SetHtml = function( html ) { console.log("SetHtml not implemented"); } 
    txe.SetTextSize = function( size,mode ) { txe.css("font-size", size); }   
    txe.GetTextSize = function( mode ) { return txe.css("font-size"); }  
    txe.GetText = function() { return txeInput.val(); }
    txe.GetHtml = function() { console.log("GetHtml not implemented"); return txe.val(); } 
    txe.SetHint = function( text ) { txeInput.attr("placeholder", text); } 
    txe.SetTextColor = function( color ) { text.css("color", color); } 
    txe.GetLineCount = function() { console.log("GetLineCount not implemented"); return 0; }   
    txe.GetMaxLines = function() { console.log("GetMaxLines not implemented"); return 0; }   
    txe.GetLineTop = function( line ) { console.log("GetLineTop not implemented"); return 0; }   
    txe.GetLineStart = function( line ) { console.log("GetLineStart not implemented"); return 0; }  
    txe.SetOnTouch = function( callback ) { 
    	txe.mouseup(function() { callback("Up"); }); 
    	txe.mousedown(function() { callback("Down"); }); 
    	txe.mousemove(function() { callback("Move"); });
    };  
    txe.InsertText = function( text,start,end ) { console.log("InsertText not implemented"); }  
    txe.ReplaceText = function( text,start,end ) { console.log("ReplaceText not implemented"); }  
    txe.SetOnChange = function( callback ) { txe.onChangeCallback = callback; }  
    txe.SetCursorPos = function( pos ) { console.log("SetCursorPos not implemented"); }  
    txe.GetCursorPos = function() { console.log("GetCursorPos not implemented"); return 0; }   
    txe.GetCursorLine = function() { console.log("GetCursorLine not implemented"); return 0; }  
    txe.SetSelection = function( start,stop ) { console.log("SetSelection not implemented"); } 
    txe.GetSelectedText = function() { console.log("GetSelectedText not implemented"); return 0; }  
    txe.GetSelectionStart = function() { console.log("GetSelectionStart not implemented"); return 0; }  
    txe.GetSelectionEnd = function() { console.log("GetSelectionEnd not implemented"); return 0; }   
    txe.Undo = function() { console.log("Undo not implemented"); }   
    txe.Redo = function() { console.log("Redo not implemented"); }  
    txe.ClearHistory = function() { console.log("ClearHistory not implemented"); }

	return txe;
}

function JQueryMobile_Spn(list, width, height, options)
{
	var spn = $("<div class=\"ui-field-contain no-margin\">");
	var spnSelect = $("<select>");
	spn.append(spnSelect);
	_initObj(spn);
	_setSize(spn, width, height, options);

	function setList(list, delim)
	{
		spnSelect.empty();

		var items = list.split(delim);
		for(var i = 0; i < items.length; ++i)
		{
			var item = $("<option value=\"" + items[i] + "\">" + items[i] + "</option>");
			spnSelect.append(item);
		}

		spnSelect.val(items[0]).selectmenu('refresh');
	}

	spnSelect.selectmenu();
	setList(list, ",");

	spnSelect.change(function () {
		if(spn.onChangeCallback)
		{
	    	spn.onChangeCallback($(this).val());
	    }
	});

	spn.init = function() {
		spnSelect.selectmenu();
	}

	spn.SetOnTouch = function( callback ) { console.log("SetOnTouch not implemented"); }
    spn.SetOnChange = function( callback ) { spn.onChangeCallback = callback; }
    spn.SetText = function( txt ) { spnSelect.val(txt).selectmenu('refresh'); }   
    spn.SelectItem = function( item ) { spnSelect.val(txt).selectmenu('refresh'); }   
    spn.GetText = function() { return spnSelect.val(); } 
    spn.SetTextColor = function( clr ) { console.log("SetTextColor not implemented"); }    
    spn.SetTextSize = function( size,mode ) { console.log("SetTextSize not implemented"); }   
    spn.GetTextSize = function( mode ) { console.log("GetTextSize not implemented"); return 0; }  
    spn.SetList = function( list,delim ) { setList(list, delim ? delim : ","); }

	return spn;
}

function JQueryMobile_Lst(list, width, height, options)
{
	//Get options.
	options = options ? options.toLowerCase() : "";
	
	//Deal with cards.
	var useCards = options.indexOf("cards")>-1;
	var cards2 = options.indexOf("cards2")>-1;
	var cards2x3 = options.indexOf("cards:2x3")>-1;
	var horiz = options.indexOf("horiz")>-1;
	var w=250, h=187;
	if( cards2 ) { w=350; h=262; } else if( cards2x3 ) { w=200; h=300; } 
	
	//Set theme.
	var theme = ""; var backCol = null;
	if( options.indexOf("theme") > -1) theme = (options.indexOf("theme-a")>-1 ? "data-theme=a" : "data-theme=b" );
	var lst = $("<ul data-role=\"listview\" "+theme+" data-inset=\"false\" class='scrollable'>");
	
	//Init base object and set size.
	_initObj(lst);
	_setSize(lst, width, height, options);
	
	var listItems = [];
	
	function setList(list, delim)
	{
		lst.list = list;
		lst.empty();

		var items = Array.isArray(list) ? list : list.split(delim);
		for(var i = 0; i < items.length; ++i)
		{
			var itemData = { title: "", body: "", icon: "", data: null };

			var components = items[i].split(":");
			itemData.title = components[0].replace( /\^c\^/g, ":");
            
            
			if(components.length > 3 && components[3].indexOf('|') > -1 ) // Transitional API
			{
                _transitionalAPI=true;
				itemData.body = components[1].replace(/\^c\^/g, ":");
				itemData.icon = (components[2] !== "null") ? components[2] : "";
				itemData.data = components[3].replace(/\^c\^/g, ":");
			}
			else if(components.length > 3 )
			{
				itemData.body = (components[1]+'<br />\n'+components[2]).replace(/\^c\^/g, ":"); // Two-line list items
				itemData.icon = (components[3] !== "null") ? components[3] : "";
            }            
			else if(components.length === 3)
			{
				itemData.body = components[1].replace(/\^c\^/g, ":"); // Single-line list items
				itemData.icon = (components[2] !== "null") ? components[2] : "";
			}
			else if(components.length === 2)
			{
				itemData.icon = (components[1] !== "null") ? components[1] : "";
			}
			
			var item, itemContent, itemIcon;
			item = $("<li data-icon=\"false\" "+(useCards?"style='float:left;background-color:rgba(0,0,0,0)'":"")+">");
			listItems.push( item );

			if(itemData.icon !== "") 
			{
				if( options.indexOf("cards")>-1 )
				{
					itemContent = $("<div href=\"#\" class=\"card"+(cards2?"2":"")+" horizontal-child\">");
					var imgCard = $("<div class=\"card-image\">" );
					itemContent.append( imgCard );
					//imgCard.append( "<img src=\"./Img/image.jpg\"/>" );
					
					imgCard.append( "<img src=\""+ itemData.icon.replace(/\|/g,":") +"\" width='"+w+"px' height='"+h+"px'/>" );
					if( cards2 ) imgCard.append( "<h2>"+itemData.title+"</h2>" );
				}
				else
				{
					//itemContent = $("<a href=\"#\" class=\"ui-btn ui-btn-icon-left ui-icon-" + itemData.icon + "\">");
					itemContent = $("<a href=\"#\" class=\"ui-btn\">");
					itemIcon = $("<i class='lst-icon fa "+itemData.icon+"'></i>");
					itemIcon.css( "text-shadow", "0px 0.1px 1px black" );
					itemContent.append( itemIcon );
					//itemContent = $("<a href=\"#\" class=\"ui-btn\"> <i class='xxx' style='display:inline-block; width:80px; height:80px; background-size: 80px 60px;'></i>");
					//itemContent = $("<a href=\"#\" class=\"ui-btn\"> <i class='fa fa-book'></i>");
				}
			}
			else
				itemContent = $("<a href=\"#\" xclass=\"ui-nodisc-icon\">");

			item.append(itemContent);
			
			if( options.indexOf("cards")>-1 ) {
				if( !cards2 ) itemContent.append("<h1 style='width:"+(w-20)+"px'>" + itemData.title + "</h1>");
			}
			else { 
				var title = $("<h2 class='horizontal-child-vcenter'>" + itemData.title + "</h2>");
				title.css( "text-shadow", "0px 0px 0px black" );
				itemContent.append( title );
			}
			
			if(itemData.body !== "" && !cards2 ) {
				var content =  $( (horiz?"<font>":"<p>") + itemData.body + (horiz?"</font>":"</p>") );
				content.css( "text-shadow", "0px 0px 0px black" );
				content.css( "margin", "0em 0em 0em 1em" );
				content.addClass( "horizontal-child-vcenter" );
				itemContent.append( content );
			}

			item.data("itemData", itemData);
			item.click(function() 
			{ 
				//if( backCol==null ) backCol = lst.find("a").css( "background-color" );
				//lst.find("a").css( "background-color", backCol );
				//$(this).find("a").css( "background-color", "#f4f4f4" );
				selectItem( $(this) );
				
				if(lst.onTouchCallback) 
				{ 
					var itemData = $(this).data("itemData");
                    if(_transitionalAPI) {
                        lst.onTouchCallback( itemData.title, itemData.body, $(this).index(), itemData.data ); 
                    }
                    else {
                        lst.onTouchCallback( itemData.title, itemData.body, itemData.icon, $(this).index(), itemData.data ); 
                    }
				} 
			});

			// Long Touch
			item.bind("taphold", function() { 
				if(lst.onLongTouchCallback) 
				{ 
					var itemData = $(this).data("itemData");
                    if(_transitionalAPI) {
                        lst.onLongTouchCallback(itemData.title, itemData.body, $(this).index()); 
                    }
                    else {
                        lst.onLongTouchCallback(itemData.title, itemData.body, itemData.icon, $(this).index()); 
                    }
				}
			});

			lst.append(item);
		}

		lst.listview( "refresh" );
	}

	lst.listview();

	setList(list, ",");

	function selectItem( item )
	{
		if( backCol==null ) backCol = lst.find("a").css( "background-color" );
		lst.find("a").css( "background-color", backCol );
		item.find("a").css( "background-color", "#f4f4f4" );
	}
	
	lst.SetList = function( list,delim ) { setList(list, delim ? delim : ","); }
    lst.GetList = function( delim ) { return lst.list.split(delim); }
    lst.AddItem = function( title,body,image ) { console.log("AddItem not implemented"); }
    lst.InsertItem = function( index,title,body,image ) { console.log("InsertItem not implemented"); }
    lst.SetItem = function( title,newTitle,newBody,newImage ) { console.log("SetItem not implemented"); }
    lst.SetItemByIndex = function( index,newTitle,newBody,newImage ) { console.log("SetItemByIndex not implemented"); }
    lst.RemoveItem = function( title ) { console.log("RemoveItem not implemented"); }
    lst.RemoveItemByIndex = function( index ) { console.log("RemoveItemByIndex not implemented"); }
    lst.RemoveAll = function() { console.log("RemoveAll not implemented"); }
    lst.SelectItem = function( title,body,scroll ) { console.log("SelectItem not implemented");  }
    lst.SelectItemByIndex = function( index,scroll ) { selectItem( listItems[index] ); }
    lst.GetItem = function( title ) {console.log("GetItem not implemented"); return null; }
    lst.GetItemByIndex = function( index ) { console.log("GetItemByIndex not implemented"); return null; }
    lst.GetLength = function() { console.log("GetLength not implemented"); return 0; }
    lst.ScrollToItem = function( title,body ) { console.log("ScrollToItem not implemented"); }
    lst.ScrollToItemByIndex = function( index ) { console.log("ScrollToItemByIndex not implemented"); }
    lst.SetOnTouch = function( callback ) { this.onTouchCallback = callback; }    
    lst.SetOnLongTouch = function( callback ) { this.onLongTouchCallback = callback; }    
	lst.SetBackColor = function( clr ) { backCol = clr; if( useCards ) lst.css( "background-color", clr ); else lst.children().children().css( "background-color", clr );} 
    lst.SetTextColor1 = function( clr ) { lst.children().children().children().css( "color", clr ); } 
    lst.SetTextColor2 = function( clr ) { lst.find("i").css( "color", clr ); } 
    lst.SetHiTextColor1 = function( clr ) { console.log("SetHiTextColor1 not implemented"); }
    lst.SetHiTextColor2 = function( clr ) { console.log("SetHiTextColor2 not implemented"); } 
    lst.SetTextSize1 = function( size,mode )  { lst.children().children().css( "font-size", size+mode ); } 
    lst.SetTextSize2 = function( size,mode ) { console.log("SetTextSize2 not implemented"); }   
    lst.GetTextSize = function( mode ) { console.log("GetTextSize not implemented"); return 0; }   
    lst.SetTextMargins = function( left,top,right,bottom ) { console.log("SetTextMargins not implemented"); }
    lst.SetEllipsize1 = function( mode ) { console.log("SetEllipsize1 not implemented"); }
    lst.SetEllipsize2 = function( mode ) { console.log("SetEllipsize2 not implemented"); }
    lst.SetTextShadow1 = function( radius,dx,dy,color ) { lst.children().children().children().css( "text-shadow", dx+"px "+dy+"px "+radius+"px "+color ); } 
    lst.SetTextShadow2 = function( radius,dx,dy,color ) { console.log("SetTextShadow2 not implemented"); }
    lst.SetDivider = function( height,clr ) { lst.children().children().css( "border-color", clr ); }
    lst.SetFontFile = function( file ) { console.log("SetFontFile not implemented"); }  
	lst.SetIconSize = function( size,mode ) { lst.find("i").css( "font-size", size+(mode?mode:"") ); } 

	return lst;
}

function JQueryMobile_Pnl(options)
{
	var dataPosition = "left";
	var dataDisplay = "overlay";

	options = options ? options.toLowerCase() : "";

	if(options.indexOf("right") >= 0)
		dataPosition = "right";

	// Display options
	if(options.indexOf("reveal") >= 0)
		dataDisplay = "reveal";
	else if(options.indexOf("push") >= 0)
		dataDisplay = "push";

	var panel = $("<div data-role=\"panel\" class=\"ui-panel ui-panel-animate ui-panel-closed\" ></div>");
	_initSObj(panel);

	panel.attr("id", "panel" + (++_jqmId));
	panel.attr("data-position", dataPosition);
	panel.attr("data-display", dataDisplay);
	if( options.indexOf("theme")<0 ) { panel.attr("data-theme", "none"); panel.addClass("ds-ui-panel"); }

	var innerPanel = $("<div class=\"ui-panel-inner no-padding\" ></div>");
	panel.append(innerPanel);
	
	
	panel.Show = function(animate) {
		animate = (typeof animate !== 'undefined') ? animate : true;

		panel.panel("option", "animate", animate);
		panel.panel("open", { immediate: !animate });
		panel.panel("option", "animate", true);
		
		//Trigger redraw of child controls.
		setTimeout( function() { $(window).trigger('resize'); }, 500 );
	};

	panel.Hide = function(animate) {
		animate = (typeof animate !== 'undefined') ? animate : true;

		panel.panel("option", "animate", animate);
		panel.panel("close");
		panel.panel("option", "animate", true);
		
		//Trigger redraw of child controls.
		setTimeout( function() { $(window).trigger('resize'); }, 500 );
	};

	panel.Toggle = function(animate) {
		animate = (typeof animate !== 'undefined') ? animate : true;

		panel.panel("option", "animate", animate);
		panel.panel("toggle");
		panel.panel("option", "animate", true);
		
		//Trigger redraw of child controls.
		setTimeout( function() { $(window).trigger('resize'); }, 500 );
	};

	panel.AddLayout = function(lay) {
		innerPanel.append(lay);
		panel.trigger("updatelayout");
	};
	
	panel.SetBackColor = function( clr ) { panel.css("background-color", clr); }  

	return panel;
}

function JQueryMobile_Bar(title, buttons)
{
	var actionBar = $("<div data-role=\"header\" data-position=\"fixed\">");
	var mainTitle = $("<h1>" + title + "</h1>");
	//mainTitle.css( {width:"10%" });
	actionBar.append( mainTitle );
	
	//Add optional button.
	var btn1 = $("<a href='#' data-role='button' style='left:5em; font-size:17; visibility:hidden;'><i class='fa fa-globe'></i></a>");
	btn1._toggled = false;
	//btn1.button( "option", "disabled", true );
	actionBar.append( btn1 );
		
	var txeSearch = $('<div><input type="search" name="search-mini" id="search-mini" value="" data-mini="true"/></div>');
	txeSearch.hide();
	actionBar.append( txeSearch );
	
	//var cboFlags = $('<div class="ds-ui-flags"><select><option style="background-image:url(flags/us.png);">male</option><option style="background-image:url(flags/gb.png);">female</option></select></div>'); 
	//ok: var cboFlags = $('<div class="ds-ui-flags"><select id="flags" tabindex="1" data-role="none"><option value="AU" data-icon="flags/AU.png">AU</option><option value="UK" data-icon="flags/GB.png">UK</option></select></div>'); 
	var cboFlags = $('<div class="ds-ui-flags"><select id="flags" tabindex="1" data-role="none"></select></div>'); 
	cboFlags.hide();
	actionBar.append( cboFlags );
	cboFlags.find("select").append( $('<option value="GB" data-icon="flags/GB.png">UK</option>') ); 
	cboFlags.find("select").append( $('<option value="FR" data-icon="flags/FR.png">FR</option>') ); 
	cboFlags.find("select").append( $('<option value="IT" data-icon="flags/IT.png">IT</option>') ); 
	cboFlags.find("select").append( $('<option value="CH" data-icon="flags/CH.png">CH</option>') );
	
	
	var leftActionButtons = $("<div class=\"ui-btn-left\">");
	var rightActionButtons = $("<div class=\"ui-btn-right\">");

	var buttonList = buttons ? buttons.split(",") : [];
	for(var i = 0; i < buttonList.length; ++i)
	{
		var iconAndPosition = buttonList[i].split(":");

		var button = $("<a href=\"#\" class=\"ui-btn ui-btn-icon-notext ui-corner-all\"></a>");
		button.addClass("ui-icon-" + iconAndPosition[0].replace(/\[|\]|/gi, ""));

		button.data("itemData", iconAndPosition[0]);

		button.click(function() { 
			if(actionBar.callback) 
			{ 
				var itemData = $(this).data("itemData");
				actionBar.callback(itemData); 
			} 
		});

		var position = (iconAndPosition.length > 1) ? iconAndPosition[1].toLowerCase() : "l";

		if(position === "l")
		{
			leftActionButtons.append(button);
		}
		else
		{
			rightActionButtons.append(button);
		}
	}

	actionBar.append(leftActionButtons);
	actionBar.append(rightActionButtons);

	actionBar.Show = function() {
		actionBar.toolbar("show");

		// This seems to be required to make sure the page content
		// is resized properly once the header is made visible
		$(window).trigger('resize');
	};

	actionBar.Hide = function() {
		actionBar.toolbar("hide");
	};

	actionBar.SetOnTouch = function(callback) {
		actionBar.callback = callback;
	};
	
	actionBar.SetTitle = function( title ) {
		mainTitle.text( title );
	};
	
	actionBar.ShowButton = function( id, callback, tip, options, state ) 
	{
		options = options ? options.toLowerCase() : "";
		if( id==1 ) 
		{ 
			btn1.css( "visibility", "visible");
			//btn1.css( "visibility", show ? "visible" : "hidden" );
			btn1.attr( "title", tip );
			//btn1.addClass('ui-disabled');
			//if( options.indexOf("toggle") ) btn1.addClass('ds-ui-btn-toggled');
			//else btn1.removeClass('ds-ui-btn-toggled');
			if( state ) btn1._toggled = true;
			if( btn1._toggled ) btn1.addClass('ds-ui-btn-toggle-on'); 
			else btn1.addClass('ds-ui-btn-toggle-off'); 
				
			if( !btn1._clickBound ) btn1.click( function() {  
				btn1._clickBound = true;
				if( !btn1._toggled ) { btn1.removeClass('ds-ui-btn-toggle-off'); btn1.addClass('ds-ui-btn-toggle-on'); btn1._toggled=true; }
				else { btn1.removeClass('ds-ui-btn-toggle-on'); btn1.addClass('ds-ui-btn-toggle-off');  btn1._toggled=false; }
				if( callback ) callback( btn1._toggled ); 
			} );
		}
	};
	
	actionBar.HideButton = function( id ) 
	{
		btn1.css( "visibility", "hidden" );
	}
	
	actionBar.ShowSearch = function( callback ) 
	{
		txeSearch.find("input").val("");
		txeSearch.show();
		
		if( !txeSearch._changeBound ) txeSearch.change( function() {  
			txeSearch._changeBound = true;
			if( callback ) callback( txeSearch.find("input").val() ); 
		} );
	}

	actionBar.HideSearch = function() {
		txeSearch.hide();
	}
	
	actionBar.ShowFlags = function( callback ) 
	{
		//cboFlags.find("input").val("");
		cboFlags.show();
		
		if( !cboFlags._changeBound ) cboFlags.change( function() {  
			cboFlags._changeBound = true;
			if( callback ) callback( cboFlags.find("select").val() ); 
		} );
	}

	actionBar.HideFlags = function() {
		cboFlags.hide();
	}
	
	return actionBar;
}

function JQueryMobile_Dlg(title, options)
{
	options = options ? options.toLowerCase() : "";
	var autoCancel = options.indexOf("autocancel")>-1;
	
	var dlg = $("<div data-role=\"popup\" data-overlay-theme=\"a\" data-theme=\"a\" data-dismissible="+(autoCancel?true:false)+">");
	dlg.append("<div data-role=\"header\" data-theme=\"a\" role=\"banner\" class=\"ui-header ui-bar-a\"><h1 class=\"ui-title no-margin\" role=\"heading\" aria-level=\"1\">" + title + "</h1>");

	var dlgContent = $("<div role=\"main\" class=\"ui-content no-padding\">");
	dlg.append(dlgContent);

	_initObj(dlg);

	dlg.css("min-width", "300px");

    dlg.SetOnTouch = function( callback ) { console.log("SetOnTouch not implemented"); }
    dlg.AddLayout = function( layout ) { dlgContent.append(layout); }	
	dlg.RemoveLayout = function( layout ) { layout.remove(); }	
	dlg.Show = function() { dlg.popup("open"); }
	dlg.Hide = function() { dlg.popup("close"); }
	dlg.Dismiss = function() { dlg.popup("destroy"); dlg.remove(); }
	dlg.SetTitle = function( title ) { dlg.find("div[data-role='header'] h1").text(title); }
	dlg.SetSize = function( width,height,options ) { console.log("SetSize not implemented"); }
	dlg.SetOnCancel = function( callback ) { 
		dlg.onCancel = callback;
		dlg.popup( { afterclose: function(event, ui) { dlg.onCancel(); } } );
	}

	return dlg;
}

function JQueryMobile_Ynd( msg )
{
	var dlg = $("<div data-role=\"popup\" data-overlay-theme=\"a\" data-theme=\"a\" data-dismissible=\"false\">");
	dlg.append("<div data-role=\"header\" data-theme=\"a\" role=\"banner\" class=\"ui-header ui-bar-a\"><h1 class=\"ui-title no-margin\" role=\"heading\" aria-level=\"1\">" + msg + "</h1>");

	var dlgContent = $("<div role=\"main\" class=\"ui-content no-padding\">");
	dlg.append(dlgContent);

	var btnLay = new JQueryMobile_Lay("Horizontal");

	var btnYes = new JQueryMobile_Btn("Yes", 0.02);
	btnYes.SetMargins(0.01, 0.01, 0.005, 0.01);
	btnYes.SetOnClick(function() { 
		if(dlg.callback) dlg.callback("Yes"); 
		dlg.popup("destroy"); 
		dlg.remove();
	});
	btnLay.AddChild(btnYes);

	var btnNo = new JQueryMobile_Btn("No", 0.02);
	btnNo.SetMargins(0.005, 0.01, 0.01, 0.01);
	btnNo.SetOnClick(function() { 
		if(dlg.callback) dlg.callback("No");
		dlg.popup("destroy"); 
		dlg.remove();
	});
	btnLay.AddChild(btnNo);

	dlgContent.append(btnLay);

	_initSObj(dlg);

	dlg.css("min-width", "250px");

    dlg.SetOnTouch = function( callback ) { dlg.callback = callback }
	dlg.SetBackColor = function( clr ) { console.log("SetBackColor not implemented"); } 
	dlg.SetSize = function( width,height,options ) { console.log("SetSize not implemented"); }
    
    return dlg;
}

function JQueryMobile_Map(key, width, height, options)
{
	options = options ? options.toLowerCase() : "";
	var id = "map" + (++_jqmId);

	var map = $("<div>");
	map.attr("id", id);
	_initObj(map);
	_setSize(map, width, height, options);

	// if(width && width !== -1)
	// {
	// 	map.css("width", (width * _w) + "px");
	// }

	// if(height && height !== -1)
	// {
	// 	map.css("height", (height * _h) + "px");
	// }

	var initMapFunc = "init"+id;

	window[initMapFunc] = function() 
	{
		gmap = new google.maps.Map(document.getElementById(id), gmapOptions);

		for(var i = 0; i < gmapMarkers.length; ++i)
		{
			var marker = new google.maps.Marker(gmapMarkers[i]);
			marker.setMap(gmap);
			marker.addListener("click", function() { onClickMarker(this); });
		}

		if(gmapSearchTxe)
		{
			map.SetSearchTextEdit(gmapSearchTxe);
		}
	}

	var gmap = null;
	var gmapMarkers = [];
	var gmapOptions = {
		center: { lat: -34.397, lng: 150.644 },
  		zoom: 8,
  		zoomControl: true,
  		mapTypeControl: false,
  		scaleControl: true,
  		streetViewControl: false,
  		rotateControl: false,
  		fullscreenControl: false
	};
	var gmapSearchTxe = null;

	var mapScript = $("<script src='https://maps.googleapis.com/maps/api/js?key=" + key + "&callback=" + initMapFunc + "&libraries=places,geometry' async defer></script>");
	$("head").append(mapScript);
	
	
	function onClickMarker(marker)
	{
		console.log(marker.title + ", " + marker.position.lat() + ", " + marker.position.lng());

		if(map.onTouchMarker)
		{
			map.onTouchMarker(marker.title, marker.id, marker.position.lat(), marker.position.lng());
		}
	}

	map.SetCenter = function(latitude, longitude) 
	{
		gmapOptions.center.lat = latitude;
		gmapOptions.center.lng = longitude;

		if(gmap)
		{
			gmap.setCenter(gmapOptions.center);
		}
	};

	map.GetUserLocation = function( callback )
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
	}
	
	map.SetZoom = function(zoom) 
	{
		gmapOptions.zoom = zoom;

		if(gmap)
		{
			gmap.setZoom(gmapOptions.zoom);
		}
	};

	map.AddMarker = function(title, id, latitude, longitude, options) 
	{
		var markerOptions = {
			position: { lat: latitude, lng: longitude },
			title: title, id : id,
			icon: { url: "http://www.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png", scaledSize: { width: 40, height: 40 } }
		};

		options = options ? options.toLowerCase() : "";

		if(options.indexOf("green") > -1)
		{
			markerOptions.icon.url = "http://www.google.com/intl/en_us/mapfiles/ms/micons/green-dot.png";
		}
		else if(options.indexOf("blue") > -1)
		{
			markerOptions.icon.url = "http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png";
		}
		else if(options.indexOf("yellow") > -1)
		{
			markerOptions.icon.url = "http://www.google.com/intl/en_us/mapfiles/ms/micons/yellow-dot.png";
		}

		if(gmap)
		{
			var marker = new google.maps.Marker(markerOptions);
			marker.setMap(gmap);
			marker.addListener("click", function() { onClickMarker(this); });
		}
		else
		{
			gmapMarkers.push(markerOptions);
		}
	};

	map.SetOnTouchMarker = function(callback) {
		map.onTouchMarker = callback;
	};

	map.DrawPoly = function( points, strokeColor, fillColor, strokeOpacity, fillOpacity, strokeWeight )
	{
        var poly = new google.maps.Polygon({
          paths: points,
          strokeColor: strokeColor,
          strokeOpacity: strokeOpacity,
          strokeWeight: strokeWeight,
          fillColor: fillColor,
          fillOpacity: fillOpacity
        });
        poly.setMap( gmap );
	}
	
	map.IsLocationVisible = function( lat, lng )
	{
		//console.log( "IsLocationVisible:" + lat + " " + lng  )
		
		var point = new google.maps.LatLng(parseFloat(lat),parseFloat(lng));
		//console.log( "point:" + point );
		var currentBounds = gmap.getBounds();
		//console.log( "currentBounds:" + currentBounds + " -> " + currentBounds.contains(point) );
		return currentBounds.contains(point);
		
	/*
		//Get map view port lat long.
		var lat0 = gmap.getBounds().getNorthEast().lat();
		var lng0 = gmap.getBounds().getNorthEast().lng();
		var lat1 = gmap.getBounds().getSouthWest().lat();
		var lng1 = gmap.getBounds().getSouthWest().lng();

		//Make polygon.
		var coords = [ {lat: lat0, lng: lng0}, {lat: lat0, lng: lng1},
		  {lat: lat1, lng: lng1}, {lat: lat1, lng: lng0}
        ];

		//Check point is in viewport.
		var point = new google.maps.LatLng( lat, lng );
        var poly = new google.maps.Polygon( {paths: coords} );
		var ret = google.maps.geometry.poly.containsLocation( point, poly );
		alert( ret );
		return ret;
		*/
	}
	
	map.SetSearchTextEdit = function(txe) 
	{
		if(gmap)
		{
			var input = txe.find("input");
        	var searchBox = new google.maps.places.SearchBox(input.get());
        	//gmap.controls[google.maps.ControlPosition.TOP_LEFT].push(input.get());
        }
        else
        {
        	gmapSearchTxe = txe;
        }
	};
	
	if( options.indexOf("locate")>-1 )
	{
		map.GetUserLocation( function( position ) { map.SetCenter( position.coords.latitude, position.coords.longitude ); } );
	}

	return map;
}

function _initObj(element)
{
	element.Destroy = function() { this.remove(); } 
    element.Release = function() { this.remove(); }        
    element.SetVisibility = function( mode ) { if(mode.toLowerCase().indexOf("show")>-1) this.show(); else this.hide(); }    
    element.GetVisibility = function() { return this.is(":visible"); }   
    element.SetPadding = function( left,top,right,bottom ) { this.css("padding", _toPixelHeight(top) + " " + _toPixelWidth(right) + " " + _toPixelHeight(bottom) + " " + _toPixelWidth(left)); }
    element.SetMargins = function( left,top,right,bottom ) { this.css("margin", _toPixelHeight(top) + " " + _toPixelWidth(right) + " " + _toPixelHeight(bottom) + " " + _toPixelWidth(left)); }
    element.SetBackground = function( file,options ) { 
		this.css("background-image", "url("+file+")"); 
		if(options.indexOf("repeat")==-1) this.css("background-size", "100% 100%" ); 
		else this.css("background-repeat","repeat"); 
	}
    element.SetBackColor = function( clr ) { this.css("background-color", clr); }  
    element.SetBackGradient = function( colour1,colour2,colour3,options ) { console.log( "SetBackGradient not implemented" ); }  
    element.SetBackGradientRadial = function( x,y,radius,colour1,colour2,colour3,options ) { console.log( "SetBackGradientRadial not implemented" ); }  
    element.SetPosition = function( left,top,width,height,options ) { console.log( "SetPosition not implemented" ); }
    element.SetSize = function( width,height,options ) { _setSize(this, width, height,options); }
    element.GetWidth = function( options ) { return this.width(); }  
    element.GetHeight = function( options ) { return this.height(); }   
    element.GetAbsWidth = function() { return this.width(); }  
    element.GetAbsHeight = function() { return this.height(); }   
    element.GetLeft = function( options ) { return this.position().left; }  
    element.GetTop = function( options ) { return this.position().top; }   
    element.GetPosition = function( options ) { return this.position(); } 
    element.SetScale = function( x,y ) { console.log( "SetScale not implemented" ); }
    element.Focus = function() { this.focus(); }
	
	element._Redraw = function() { _redraw( this ); } 
}

function _initSObj(element)
{
	element.Destroy = function() { this.remove(); } 
    element.Release = function() { this.remove(); }
}

function _toPixelWidth(fraction)
{
	var ret = Math.round(fraction * _w) + "px";
	//console.log( "_toPixelWidth fract=" + fraction + "  _w=" + _w + " _--> " + ret );
	return ret;
}

function _toPixelHeight(fraction)
{
	return Math.round(fraction * _h) + "px";
}

function _setSize(element, width, height, options)
{
	//console.log( "_setSize " + width + " " + height + " " + options );
	//console.log( "_id "+ element._id + " width: " + width );
	
	//Store settings for use in _resize func. 
	element._width = width ? width : -1;
	element._height = height ? height : -1;
	element._options = options;
	
	options = options ? options.toLowerCase() : "";
	
	element._flow = (options.indexOf("flow") > -1);
	if( element._flow ) element.css( "float", "left" );
	
	if( options.indexOf("fillx")>-1 || options.indexOf("fillxy")>-1 ) 
		element.css("width", "100%");
		//element.css("width", element.parent.width );
	
	if( options.indexOf("filly")>-1 || options.indexOf("fillxy")>-1 ) 
		element.css("height", "100%");
		//element.css("height", element.parent.height );
		
	if(width && width !== -1 ) {
		//console.log( "Setting "+ element._id + " width to: " + _toPixelWidth(width) );
		element.css("width", _toPixelWidth(width));
	}

	if(height && height !== -1 )
		element.css("height", _toPixelHeight(height));
}

function _redraw( element )
{
	//if( element.attr('id')=="img" )
	if( !element._flow ) 
	{
		//Reset max dimensions if using panel/drawer.
		if( $("#contentMain") ) 
		{
			var w = $("#contentMain").width();
			var h = $("#contentMain").height();
			_w = w ? w : _w;
			_h =  h ? h : _h;
		}
			
		 //console.log( "img element._width: " + element._width + " css" + element.css("width")  )
		//if( element._width ) console.log("_redraw " + element._width + " element.id : " + element.attr('id') );
		//if(  element._id == "fred" ) {
		//	 console.log( "img element._width: " + element._width )
			_setSize( element, element._width, element._height, element._options );
		//}
	}
}

function _onResize() {
    if(typeof $ === 'function') {
        _redraw(window);
//         _h = $(window).height();
//         _w = $(window).width();
        if(typeof OnConfig === 'function') { OnConfig(); }
    }
    else { console.log("UI not loaded yet.  Resize ignored."); }
}

function _initWebSock() {
    var host=window.location.hostname;
    var port=window.location.port;
    //host='192.168.201.1';
    //port=81;
    var wsurl='ws://'+host+':'+port+window.location.pathname;
    console.log('CON '+wsurl);
    var proto='droidscript-sync';
    client = null;
    
    try { client=new WebSocket(wsurl, proto); }
    catch(e) { return null; }

    client.onerror = function() {
        console.log('Connection Error');
    };
    
    client.onopen = function() {
        _loadProgress(97+': WebSocket Connected', 'Synchronizing...');
        if (client.readyState === client.OPEN) {
        }
    };
    
    client.onclose = function() {
        console.log('droidscript-sync Client Closed');
        //if(!otherSession) {
            setTimeout(function() { // Run in UI handler
                if(confirm('Connection to server lost.  Reconnect?')) {
                    setTimeout('_initWebSock();',5000);
                }
            },0);
        //}
    };
    /*  Example MessageEvent {
            currentTarget: WebSocket {
                binaryType: "blob",
                protocol: "droidscript-syn",
                readyState: 1,
                url: "ws://192.168.201.1:81/app/AppName/",
                ...
            },
            data: Blob {
                size: 26105,
                type: ""
            },
            origin: "ws://192.168.201.1:81", 
            srcElement: WebSocket,
            target: WebSocket,
            timeStamp: 26309.395,
            ...
        }     
    */
    
    client.onmessage = function(e) {
        //if(firstCall) { firstCall=false; init(); }
        //console.log('message received');
        if (typeof e.data === 'string') {
            //alert('data='+e.data);
            //console.log('data='+e.data);
            var msg=JSON.parse(e.data);
            if(msg.type == "sync") { _Sync(msg); }
            if(msg.type == "syncdone" || msg.type == "syncerr") { 
                if(msg.type == "syncerr") {
                    console.log("SERVER ERROR: "+msg.err); 
                    client.send(JSON.stringify({"type":"sync"})); // Continue sync from server
                }
                if(!_started) { _initApp(); }
            }
        }
        else {
            console.log('Received data of unknown type '+(typeof e.data)+'; length='+e.length+';elen='+e.data.length+';obj='+JSON.stringify(e.data));  
            window.teste=e;
        }
    };
}

function _initApp() {
    _started=true; 
    if(typeof OnStart === 'function') { 
        _loadProgress(98);
        OnStart();
        _loadProgress(99);
    }
}

function _Sync(msg) { // Sync with null msg when client file changes (write/metadata)
    //console.log("path: "+tree.path+" lastModified="+tree.lastModified);
    var ref=_retrieveFile(msg.path);
    if(msg && (!ref || ref.lastModified < msg.lastModified || !ref.data)) { // FIXME: Check for EITHER localStorage data OR Chrome api
        //console.log("_Sync:!ref:"+(!ref)+";<:"+(ref.lastModified < msg.lastModified)+";ref.data:"+(!ref.data));
        var uri= "/app/:*"+msg.path; //msg.path.replace(base,"/app/:*"+base);
        _fetchBlob(uri, (data, blob) => { _storeFile(msg, data, blob); });
    }
    client.send(JSON.stringify({"type":"sync"})); // Continue sync from server
}

function _storeFile(obj, data, blob) { // Input 'data' must be as a data URI
    // FIXME: Set EITHER localStorage or Chrome data, not both
    var id='FILE:'+obj.path;
    // NOTE: Possibly need to update parent directory (if this was a newly created file)
    var spl=obj.path.split('/');
    var final=spl.slice(-1)[0];
    var ppath=spl.slice(0,-1).join('/');
    if(ppath === '' && obj.path[0] == '/' && obj.path.length > 1) { ppath='/'; } // Even root may need to be updated
    if(ppath !== '') {
        var file=_retrieveFile(ppath);
        if(file && file.type === "inode/directory") {
            var filenames=JSON.parse(_blobToString(file));
            if(!filenames.find( (el) => { return el === final; })) { // If directory doesn't have this file yet
                filenames.push(final);
                console.log("Added "+final+" to "+JSON.stringify(filenames));
                _createDirWithFilenames(ppath, filenames);
            }
        }
        else if(!file) { _createDirWithFilenames(ppath, []); } // Create missing parent(s)
        else { console.error("ERROR: Parent of '"+obj.path+"' is type '"+file.type+"'"); }
    }
console.log("STORING "+id);
    try { localStorage[id] = JSON.stringify({path:obj.path, lastModified:obj.lastModified, type:obj.ctype, length:blob.length, data:data}); }
    catch(e) { alert('Local Storage error: '+e.message); }
    var file = _blobToFile(blob, obj.path, obj.lastModified);
    file.data=data;
    _files[id] = file;
}

function _createDirWithFilenames(path, filenames) { // Input array of filenames
    var ctype="inode/directory";
    var blob=new Blob([JSON.stringify(filenames)],{type:ctype});
    var data=_blobToDataURL(blob);
    var msg={path:path, lastModified:Date.now(), type:blob.type, length:blob.length, data:data};
    _storeFile(msg, data, blob);
}

function _retrieveFile(path) {
    var id='FILE:'+path;
    var ref=_files[id];
    if(ref) { return ref; }
    
    ref=localStorage[id];
    if(!ref) { return null; }
    try {
        var obj=JSON.parse(ref);
        var blob=_dataURItoBlob(obj.data)
        var file=_blobToFile(blob, path, obj.lastModified);
        file.data=obj.data;
        _files[id]=file;
        return file;
    }
    catch(e) {
        console.log("ERROR: "+e.stack+"\nref="+ref);
        throw e;
    }
}

function _blobToFile(blob, name, lastModified) {
    if(!lastModified) { lastModified=Date.now(); }
    try { return new File([blob], name, {type:blob.type, lastModified:lastModified}); }
    catch(e) {
        var f=new Blob([blob], {type:blob.type});
        f.name=name;
        f.lastModified=lastModified;
        f.lastModifiedDate=new Date(f.lastModified);
        return f;
    }
}

function _fetchBlob(uri, done) { // Returns a blob as a data url (as well as original blob)
    var xhr = new XMLHttpRequest(); 
    xhr.open("GET", uri); 
    xhr.responseType = "blob"; // force the HTTP response, response-type header to be blob
    xhr.onload = () => {
        var blob = xhr.response;
        var reader = new FileReader();
        reader.onload = ( (self) => {
            return (e) => { done(e.target.result, blob); }
        })(this);
        reader.readAsDataURL(blob);
    }
    xhr.send()
}

function _dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

function _blobToDataURL(blob) {
    var u8a=_blobToUint8Array(blob)
    return 'data:'+blob.type+';base64,'+btoa(_Uint8ToString(u8a));
}

function _blobToUint8Array(b) {
    var uri = URL.createObjectURL(b),
        xhr = new XMLHttpRequest(),
        i,
        ui8;

    xhr.open('GET', uri, false);
    // The magic happens below, which overrides the MIME type, forcing the browser to treat it as plain text, 
    // using a user-defined character set. This tells the browser not to parse it, and to let the bytes pass through unprocessed.
    xhr.overrideMimeType('text\/plain; charset=x-user-defined'); // NOTE: Key #1
    xhr.send(null);

    URL.revokeObjectURL(uri); // Avoid resource leak
    if (xhr.status != 200) return [];

    ui8 = new Uint8Array(xhr.responseText.length); // NOTE: was response, not responseText.  Not sure if it matters.

    for (i = 0; i < xhr.responseText.length; ++i) {
        ui8[i] = xhr.responseText.charCodeAt(i) & 0xff; // NOTE: Key #2
    }

    return ui8;
}


function _load_binary_resource(url) {
  var req = new XMLHttpRequest();
  req.open('GET', url, false);
  //XHR binary charset opt by Marcus Granado 2006 [http://mgran.blogspot.com]
  req.overrideMimeType('text\/plain; charset=x-user-defined');
  req.send(null);
  if (req.status != 200) return '';
  return req.responseText; // NOTE: Use return: var abyte = _load_binary_resource(url).charCodeAt(x) & 0xff; // throw away high-order byte (f7)
}

// For short input, Decode base64 back to Uint8Array
//var u8_2 = new Uint8Array(atob(b64encoded).split("").map(function(c) {
//    return c.charCodeAt(0); }));
//    OR use below: var b64encoded = btoa(Uint8ToString(u8));
function _Uint8ToString(u8a) {
  var CHUNK_SZ = 0x8000;
  var c = [];
  for (var i=0; i < u8a.length; i+=CHUNK_SZ) {
    c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
  }
  return c.join("");
}

function _asyncBlobToDataURL(blob, callback) {
    var a = new FileReader();
    a.onload = function(e) {callback(e.target.result);}
    a.readAsDataURL(blob);
}

function _blobToString(b) {
    var u, x;
    u = URL.createObjectURL(b);
    x = new XMLHttpRequest();
    x.open('GET', u, false); // although sync, you're not fetching over internet
    x.send();
    URL.revokeObjectURL(u);
    return x.responseText;
}

function _asyncBlobToString(blob, done) {
    var reader = new FileReader();
    reader.onload = function() { done(reader.result); }
    reader.readAsText(blob);   
}

function _init(isDs) {
    _h = $(window).height();
    _w = $(window).width();
    
    if(isDs) { _initWebSock(); }
    else { _initApp(); }
//     if(dirTree && dirTree != '') {
//         alert('dirTree='+dirTree);
//         dirTree=JSON.parse(dirTree);
//     }
    
//    if(typeof OnStart === 'function') { OnStart(); }
}

/*

// function _asyncDataURItoBlob(dataURI, done) {
//     fetch(dataURI).then(res => res.blob()).then(blob => { // NOTE: fetch does not work in Safari or IE
//         // var fd = new FormData()
//         // fd.append('image', blob, 'filename')
//         done(blob);
//         // Upload
//         // fetch('upload', {method: 'POST', body: fd})
//     });
// }

function CreatePage(title)
{
	var pageData = { id:(++_ids) };

	var page = $("<div data-role=\"page\"></div>", pageData);
	page.attr("id", "page" + pageData.id);

	// Create page content container
	var pageContent = $("<div role=\"main\" class=\"ui-content\"></div>");
	page.append(pageContent);

	var header = CreateToolbar(title);
	header.attr("data-role", "header");
	header.attr("id", "header-page" + pageData.id);
	page.prepend( header );

	var footer = CreateToolbar("");
	footer.attr("data-role", "footer");
	footer.attr("id", "footer-page" + pageData.id);
	page.append( footer );

	page.GetHeader = function() {
		return header;
	};

	page.GetFooter = function() {
		return footer;
	};

	page.Show = function() {
		//navigate to the page
    	$.mobile.changePage("#page" + pageData.id, "pop", false, true);
	};

	return page;
}

function CreateToolbar(title)
{
	var toolbarData = { id:(++_ids) };

	var toolbar = $("<div><h1>" + title + "</h1></div>", toolbarData);

	toolbar.AddButton = function(button, options) {
		if(options && options.toLowerCase(options).indexOf("right") >= 0)
		{
			button.addClass("ui-btn-right ui-btn-inline");
		}
		else
		{
			button.addClass("ui-btn-inline");
		}

		this.append(button);
	}

	return toolbar;
}

*/
