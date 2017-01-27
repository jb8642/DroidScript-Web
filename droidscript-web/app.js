/*
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
 
// _dbg = true; _map = []; _scripts = [];
// _cbMap = []; _cbId=0; _docs = false; _busy = false;
// _btl = null; _lvw = null; _ldg = null; 
_ynd = null;
// _nxt = null; _smw = null;
// _inf = null; _rec = null; _pst = null;
// _sms = null; _eml = null; 
// _crp = null; _spr = null;
var _map = [];
var _nextId = 1;


function App(impl) 
{			
	this.impl = impl;

	this.GetType = function() { return "App"; }
 	this.GetObjects = function() { return _map; }
// 	this.Exit = function( kill ) { prompt( "#", "App.Exit("+kill ); }
// 	this.ToBack = function() { prompt( "#", "App.ToBack(" ); }
// 	this.Execute = function( js ) { prompt( "#", "App.Execute("+js ); } 
// 	this.StartApp = function( file,options,intent ) { prompt( "#", "App.StartApp(\f"+file+"\f"+options+"\f"+intent ); }
// 	this.StopApp = function( name ) { prompt( "#", "App.StopApp("+name ); }
// 	this.SetScreenMode = function( mode ) { prompt( "#", "App.SetScreenMode(\f"+mode ); }
// 	this.SetOptions = function( options ) { prompt( "#", "App.SetOptions(\f"+options ); }
// 	this.SetPosition = function( left,top,width,height,options ) { prompt( "#", "App.SetPosition(\f"+left+"\f"+top+"\f"+width+"\f"+height+"\f"+options ); }
 	this.SetBackColor = function( clr ) { this.impl.SetBackColor(clr); }
// 	this.StartService = function( packageName,className ) { prompt( "#", "App.StartService(\f"+packageName+"\f"+className ); }
// 	this.StopService = function() { prompt( "#", "App.StopService(" ); }
// 	this.StartDebugServer = function() { prompt( "#", "App.StartDebugServer(" ); }
// 	this.SendIntent = function( packageName,className,action,category,data,type,extras,options ) { prompt( "#", "App.SendIntent(\f"+packageName+"\f"+className+"\f"+action+"\f"+category+"\f"+data+"\f"+type+"\f"+extras+"\f"+options ); }
// 	this.BroadcastIntent = function( action,category,data,type,extras ) { prompt( "#", "App.BroadcastIntent(\f"+action+"\f"+category+"\f"+data+"\f"+type+"\f"+extras ); }
// 	this.SendMessage = function( msg ) { prompt( "#", "App.SendMessage(\f"+msg ); }
// 	this.LoadScript = function( url, callback ) { _LoadScript( url, callback ); }
// 	this.LoadPlugin = function( url ) { _LoadPlugin( url ); }
// 	this.Try = function( p1,p2,p3 ) { return prompt( "#", "App.Try(\f"+p1+"\f"+p2+"\f"+p3 ); } 
// 	this.SysExec = function( cmd,options ) { return prompt( "#", "App.SysExec(\f"+cmd+"\f"+options ); } 
// 	this.Odroid = function( p1,p2,p3 ) { return prompt( "#", "App.Odroid(\f"+p1+"\f"+p2+"\f"+p3 ); }
// 	this.GetName = function() { return prompt( "#", "App.GetName(" ); }
// 	this.GetPath = function() { return prompt( "#", "App.GetPath(" ); }
// 	this.GetAppName = function() { return prompt( "#", "App.GetAppName(" ); }
// 	this.GetAppPath = function() { return prompt( "#", "App.GetAppPath(" ); }
// 	this.GetVersion = function() { return parseFloat(prompt( "#", "App.GetVersion(" )); }
// 	this.GetDSVersion = function() { return parseFloat(prompt( "#", "App.GetDSVersion(" )); }	
// 	this.IsNewVersion = function() { return prompt( "#", "App.IsNewVersion(" )=="true"; }
// 	this.IsAPK = function() { return prompt( "#", "App.IsAPK(" )=="true"; }	
 	this.IsMobile = function() { return this.impl.IsMobile(); }
// 	this.GetPackageName = function() { return prompt( "#", "App.GetPackageName(" ); }
// 	this.CheckLicense = function( key ) { prompt( "#", "App.CheckLicense(\f"+key ); }
// 	this.GetAccounts = function() { return prompt( "#", "App.GetAccounts(" ); }
// 	this.GetUser = function() { return prompt( "#", "App.GetUser(" ); }
// 	this.GetDeviceId = function() { return prompt( "#", "App.GetDeviceId(" ); }
// 	this.GetCountryCode = function() { return prompt( "#", "App.GetCountryCode(" ); }
// 	this.GetLanguageCode = function() { return prompt( "#", "App.GetLanguageCode(" ); }
// 	this.GetCountry = function() { return prompt( "#", "App.GetCountry(" ); }
// 	this.GetLanguage = function() { return prompt( "#", "App.GetLanguage(" ); }
// 	this.GetOptions = function() { return prompt( "#", "App.GetOptions(" ); }	
// 	this.GetSharedText = function( index ) { return prompt( "#", "App.GetSharedText("+index ); }
// 	this.GetSharedFiles = function() { var s = prompt( "#", "App.GetSharedFiles(" ); if(s.length) return s.split(","); else return null; }
// 	this.GetRunningApps = function() { return eval(prompt( "#", "App.GetRunningApps(\f" )); }
// 	this.GetRunningServices = function() { return eval(prompt( "#", "App.GetRunningServices(\f" )); }
// 	this.GetIntent = function() { var s = prompt( "#", "App.GetIntent(" ); if(s.length) return JSON.parse(s); else return null; }
// 	this.GetNotifyId = function() { return prompt( "#", "App.GetNotifyId(" ); }
// 	this.SetSharedApp = function( name ) { prompt( "#", "App.SetSharedApp("+name ); }
// 	this.GetMediaFile = function( appName,ext ) { return prompt( "#", "App.GetMediaFile(\f"+appName+"\f"+ext ); }
// 	this.KillApp = function( procId ) { prompt( "#", "App.KillApp("+procId ); }
// 	this.CreateShortcut = function( name,iconFile,file ) { prompt( "#", "App.CreateShortcut("+name+"\f"+iconFile+"\f"+file ); }
// 	this.GetBuildNum = function() { return parseInt( prompt( "#", "App.GetBuildNum(" )); }	
// 	this.GetOSVersion = function() { return parseInt( prompt( "#", "App.GetBuildNum(" )); }	
// 	this.GetModel = function() { return prompt( "#", "App.GetModel(" ); }	
// 	this.IsTablet = function() { return prompt( "#", "App.IsTablet(" )=="true"; }	
// 	this.IsChrome = function() { return prompt( "#", "App.IsChrome(" )=="true"; }	
// 	this.SetOnError = function( callback ) { prompt( "#", "App.SetOnError("+callback.name ); }
// 	this.SetOnKey = function( callback ) { prompt( "#", "App.SetOnKey(\f"+(callback?callback.name:null) ); }
// 	this.SetOnShowKeyboard = function( callback ) { prompt( "#", "App.SetOnShowKeyboard(\f"+(callback?callback.name:null) ); }
// 	this.DisableKeys = function( keyList ) { prompt( "#", "App.DisableKeys(\f"+keyList ); }
// 	this.GetIPAddress = function() { return prompt( "#", "App.GetIPAddress(" ); }
// 	this.GetMacAddress = function() { return prompt( "#", "App.GetMacAddress(" ); }
// 	this.GetSSID = function() { return prompt( "#", "App.GetSSID(" ); }
// 	this.Broadcast = function( type,msg ) { prompt( "#", "App.Broadcast("+type+"\f"+msg ); }
// 	this.SetOnBroadcast = function( callback ) { prompt( "#", "App.SetOnBroadcast("+callback.name ); }
// 	this.SetData = function( name,value ) { prompt( "#", "App.SetData(\f"+name+"\f"+value ); }
// 	this.GetData = function( name ) { return prompt( "#", "App.GetData(\f"+name ); }	
// 	this.SetClipboardText = function( txt ) { prompt( "#", "App.SetClipboardText("+txt ); }
// 	this.GetClipboardText = function() { return prompt( "#", "App.GetClipboardText(" ); }
// 	this.EnableBackKey = function( enable ) { prompt( "#", "App.EnableBackKey("+enable ); }		
// 	this.Wait = function( secs ) { prompt( "#", "App.Wait("+secs ); }
// 	this.Alert = function( msg,title ) { prompt( "#", "App.Alert("+msg+"\f"+(title?title:"") ); }
// 	this.HideKeyboard = function( hide ) { prompt( "#", "App.HideKeyboard("+hide ); }
// 	this.ShowKeyboard = function( obj ) { return prompt( "#", "App.ShowKeyboard(\f"+obj.id )=="true"; }
// 	this.IsKeyboardShown = function() { return prompt( "#", "App.IsKeyboardShown(" )=="true"; }
// 	this.GetKeyboardHeight = function() { return prompt( "#", "App.GetKeyboardHeight(" ); }
// 	this.TextToSpeech = function( text,pitch,rate,callback,stream ) { prompt( "#", "App.TextToSpeech(\f"+text+"\f"+pitch+"\f"+rate+"\f"+(callback?callback.name:null)+"\f"+stream ); }
 	this.Debug = function( msg ) { this.impl.Debug(msg); }
// 	this.SetDebugEnabled = function( enable ) { prompt( "#", "App.SetDebugEnabled("+enable ); _dbg=enable; }
// 	this.CreateDebug = function() { prompt( "#", "App.CreateDebug(" ); }
// 	this.ShowDebug = function( show ) { prompt( "#", "App.ShowDebug("+show ); }
// 	this.SendMail = function( address,subject,body,attach ) { prompt( "#", "App.SendMail("+address+"\f"+subject+"\f"+body+"\f"+attach ); }		
// 	this.SendFile = function( file,subject,text ) { prompt( "#", "App.SendFile(\f"+file+"\f"+subject+"\f"+text ); }		
// 	this._Extract = function( p1 ) { prompt( "#", "App._Extract("+p1 ); }
// 	this.ExtractAssets = function( src,dest,overwrite ) { prompt( "#", "App.ExtractAssets(\f"+src+"\f"+dest+"\f"+overwrite ); }
// 	this.GetResourceId = function( name,options ) { return parseInt(prompt( "#", "App.GetResourceId(\f"+name+"\f"+options )); }	
// 	this.Vibrate = function( pattern ) { prompt( "#", "App.Vibrate("+pattern ); }
 	this.ShowPopup = function( msg,options ) { this.impl.ShowPopup(msg, options); }
// 	this.ShowProgress = function( msg,options,clr ) { prompt( "#", "App.ShowProgress(\f"+msg+"\f"+options+"\f"+clr ); }	
// 	this.HideProgress = function() { prompt( "#", "App.HideProgress(" ); }	
// 	this.ShowProgressBar = function( title,percent ) { prompt( "#", "App.ShowProgressBar(\f"+title+"\f"+percent ); }	
// 	this.UpdateProgressBar = function( percent ) { prompt( "#", "App.UpdateProgressBar(\f"+percent ); }	
// 	this.HideProgressBar = function() { prompt( "#", "App.HideProgressBar(" ); }	
// 	this.LoadText = function( name,dflt,file ) { return prompt( "#", "App.LoadText("+name+"\f"+dflt+"\f"+file ); }
// 	this.LoadNumber = function( name,dflt,file ) { return parseFloat(prompt( "#", "App.LoadNumber("+name+"\f"+dflt+"\f"+file )); }	
// 	this.LoadBoolean = function( name,dflt,file ) { return (prompt( "#", "App.LoadBoolean("+name+"\f"+dflt+"\f"+file )=="true"); }
// 	this.SaveText = function( name,value,file ) { prompt( "#", "App.SaveText("+name+"\f"+value+"\f"+file ); }
// 	this.SaveNumber = function( name,value,file ) { prompt( "#", "App.SaveNumber("+name+"\f"+value+"\f"+file ); }	
// 	this.SaveBoolean = function( name,value,file ) { prompt( "#", "App.SaveBoolean("+name+"\f"+value+"\f"+file ); }	
// 	this.ClearData = function( file ) { prompt( "#", "App.ClearData(\f"+file ); }
// 	this.GetTop = function() { return parseFloat(prompt( "#", "App.GetTop(" )); }
 	this.GetScreenWidth = function() { return this.impl.GetScreenWidth() }
 	this.GetScreenHeight = function() { return this.impl.GetScreenHeight() }
// 	this.GetScreenDensity = function() { return parseFloat(prompt( "#", "App.GetScreenDensity(" )); }
 	this.GetDisplayWidth = function() { return this.impl.GetDisplayWidth() }
 	this.GetDisplayHeight = function() { return this.impl.GetDisplayHeight() }
// 	this.GetDefaultOrientation = function() { return prompt( "#", "App.GetDefaultOrientation(" ); }	
// 	this.GetOrientation = function() { return prompt( "#", "App.GetOrientation(" ); }	
// 	this.SetOrientation = function( orient,callback ) { prompt( "#", "App.SetOrientation(\f"+orient+"\f"+(callback?callback.name:null) ); }	
// 	this.GetRotation = function() { return parseInt(prompt( "#", "App.GetRotation(" )); }	
// 	this.GetBatteryLevel = function() { return parseFloat(prompt( "#", "App.GetBatteryLevel(\f" )); }
// 	this.PreventScreenLock = function( mode ) { prompt( "#", "App.PreventScreenLock("+mode ); }	
// 	this.PreventWifiSleep = function() { prompt( "#", "App.PreventWifiSleep(" ); }
// 	this.SetWifiEnabled = function( enable ) { prompt( "#", "App.SetWifiEnabled(\f"+enable ); }
// 	this.IsWifiEnabled = function() { return prompt( "#", "App.IsWifiEnabled(" )=="true"; }
// 	this.SetBluetoothEnabled = function( enable ) { prompt( "#", "App.SetBluetoothEnabled(\f"+enable ); }
// 	this.IsBluetoothEnabled = function() { return prompt( "#", "App.IsBluetoothEnabled(" )=="true"; }
// 	this.SetRingerMode = function( mode ) { prompt( "#", "App.SetRingerMode(\f"+mode ); }
// 	this.GetRingerMode = function() { return prompt( "#", "App.GetRingerMode(" ); }
// 	this.SetVolume = function( stream,level ) { prompt( "#", "App.SetVolume(\f"+stream+"\f"+level ); }
// 	this.GetVolume = function( stream ) { return parseFloat(prompt( "#", "App.GetVolume(\f"+stream )); }
// 	this.SetTitle = function( title ) { prompt( "#", "App.SetTitle("+title ); }	
// 	this.SetMenu = function( list,iconPath ) { prompt( "#", "App.SetMenu("+list+"\f"+iconPath ); }
// 	this.ShowMenu = function() { prompt( "#", "App.ShowMenu(" ); }		
 	this.AddLayout = function( layout ) { this.impl.AddLayout(layout.impl); }	
 	this.RemoveLayout = function( layout ) { this.impl.RemoveLayout(layout.impl); }
 	this.DestroyLayout = function( layout ) { this.impl.DestroyLayout(layout.impl); }	
// 	this.MakeFolder = function( fldr ) { prompt( "#", "App.MakeFolder("+fldr ); }	
// 	this.GetPrivateFolder = function( name ) { return prompt( "#", "App.GetPrivateFolder(\f"+name ); }	
// 	this.GetDatabaseFolder = function() { return prompt( "#", "App.GetDatabaseFolder(" ); }
// 	this.DeleteDatabase = function( name ) { prompt( "#", "App.DeleteDatabase(\f"+name); }
// 	this.FolderExists = function( fldr ) { return prompt( "#", "App.FolderExists("+fldr )=="true"; }
// 	this.FileExists = function( file ) { return prompt( "#", "App.FileExists("+file )=="true"; }
// 	this.IsFolder = function( fldr ) { return prompt( "#", "App.IsFolder("+fldr )=="true"; }
// 	this.ListFolder = function( path,filter,limit,options ) { return eval(prompt( "#", "App.ListFolder(\f"+path+"\f"+filter+"\f"+limit+"\f"+options )); }
// 	this.GetExternalFolder = function() { return prompt( "#", "App.GetExternalFolder(" ); }
// 	this.GetInternalFolder = function() { return prompt( "#", "App.GetInternalFolder(" ); }
// 	this.GetSpecialFolder = function( name ) { return prompt( "#", "App.GetSpecialFolder(\f"+name ); }
// 	this.GetEnv = function( name ) { return prompt( "#", "App.GetEnv(\f"+name ); }
// 	this.ReadFile = function( file,encoding ) { return prompt( "#", "App.ReadFile(\f"+file+"\f"+encoding ); }
// 	this.WriteFile = function( file,text,mode,encoding ) { prompt( "#", "App.WriteFile(\f"+file+"\f"+text+"\f"+mode+"\f"+encoding ); }	
// 	this.OpenFile = function( file,type,choose ) { prompt( "#", "App.OpenFile(\f"+file+"\f"+type+"\f"+choose ); }	
// 	this.OpenUrl = function( url ) { prompt( "#", "App.OpenUrl("+url); }
// 	this.DeleteFile = function( file ) { prompt( "#", "App.DeleteFile("+file); }
// 	this.CopyFile = function( src,dest ) { prompt( "#", "App.CopyFile("+src+"\f"+dest); }
// 	this.CopyFolder = function( src,dest,overwrite,filter ) { prompt( "#", "App.CopyFolder(\f"+src+"\f"+dest+"\f"+overwrite+"\f"+filter); }
// 	this.DeleteFolder = function( fldr ) { prompt( "#", "App.DeleteFolder("+fldr); }
// 	this.RenameFile = function( src,dest ) { prompt( "#", "App.RenameFile("+src+"\f"+dest); }
// 	this.RenameFolder = function( src,dest ) { prompt( "#", "App.RenameFile("+src+"\f"+dest); }
// 	this.GetFreeSpace = function( mode ) { return parseFloat(prompt( "#", "App.GetFreeSpace(\f"+mode)); }
// 	this.GetFileDate = function( file ) { var d = parseInt(prompt( "#", "App.GetFileDate(\f"+file)); if( d ) return new Date(d); else return null; }
// 	this.GetFileSize = function( file ) { return parseInt(prompt( "#", "App.GetFileSize(\f"+file)); }
// 	this.GetLastButton = function() { var ret = prompt( "#", "App.GetLastButton(" ); if( ret ) return (_map[ret]); else return null; }
// 	this.GetLastToggle = function() { var ret = prompt( "#", "App.GetLastToggle(" ); if( ret ) return (_map[ret]); else return null; }
// 	this.GetLastCheckBox = function() { var ret = prompt( "#", "App.GetLastCheckBox(" ); if( ret ) return (_map[ret]); else return null; }
// 	this.GetLastImage = function() { var ret = prompt( "#", "App.GetLastImage(" ); if( ret ) return (_map[ret]); else return null; }
// 	this.IsBluetoothOn = function() { return prompt( "#", "App.IsBluetoothOn(" )=="true"; }
// 	this.IsScreenOn = function() { return prompt( "#", "App.IsScreenOn(" )=="true"; }
// 	this.GoToSleep = function() { prompt( "#", "App.GoToSleep(" ); }	
// 	this.SetScreenBrightness = function( level ) { prompt( "#", "App.SetScreenBrightness(\f"+level); }
// 	this.GetMetadata = function( file,keys ) { return prompt( "#", "App.GetMetadata(\f"+file+"\f"+keys); }
// 	this.SetAlarm = function( type,id,callback,time,interval ) { return prompt( "#", "App.SetAlarm(\f"+type+"\f"+id+"\f"+(callback?callback.name:null)+"\f"+time+"\f"+interval); }
// 	this.Call = function( number ) { prompt( "#", "App.Call(\f"+number ); }
// 	this.SimulateTouch = function( obj,x,y,dir ) { prompt( "#", "App.SimulateTouch(\f"+obj.id+"\f"+x+"\f"+y+"\f"+dir ); }
// 	this.SimulateKey = function( obj,keyName,modifiers,pause ) { prompt( "#", "App.SimulateKey(\f"+obj.id+"\f"+keyName+"\f"+modifiers+"\f"+pause ); }
// 	this.GetJoystickState = function( id,key ) { return parseFloat(prompt( "#", "App.GetJoyState(\f"+id+"\f"+key)); }
// 	this.GetJoystickName = function( id ) { return prompt( "#", "App.GetJoyName(\f"+id); }
// 	this.SetJoystickOptions = function( options ) { prompt( "#", "App.SetJoystickOptions(\f"+options ); }
// 	this.SetAutoBoot = function( auto ) { prompt( "#", "App.SetAutoBoot(\f"+auto); }
// 	this.SetAutoWifi = function( auto ) { prompt( "#", "App.SetAutoWifi(\f"+auto); }
// 	this.SetAutoStart = function( appName ) { prompt( "#", "App.SetAutoStart(\f"+appName); }
// 	this.HttpRequest = function( type,baseUrl,path,params,callback,headers ) { prompt( "#", "App.HttpRequest(\f"+type+"\f"+baseUrl+"\f"+path+"\f"+params+"\f"+(callback?callback.name:null)+"\f"+headers); }
// 	this.SaveCookies = function() { prompt( "#", "App.SaveCookies(" ); }	
// 	this.ClearCookies = function( session ) { prompt( "#", "App.ClearCookies(\f"+session ); }

	
	//These objects auto-release when layout is destroyed.		
	this.CreateLayout = function( type,options ) { var ret = this.impl.CreateLayout(type, options); if( ret ) return new Lay(ret); else return null; }
	this.CreateImage = function( file,width,height,options,w,h ) { var ret = this.impl.CreateImage(file, width, height, options, w, h);  if( ret ) return new Img(ret); else return null; }	
	this.CreateButton = function( text,width,height,options ) { var ret = this.impl.CreateButton(text, width, height, options); if( ret ) return new Btn(ret); else return null;  }		
	this.CreateToggle = function( text,width,height,options ) { var ret = this.impl.CreateToggle(text, width, height, options); if( ret ) return new Tgl(ret); else return null;  }		
	this.CreateCheckBox = function( text,width,height,options ) { var ret = this.impl.CreateCheckBox(text, width, height, options); if( ret ) return new Chk(ret); else return null;  }		
	this.CreateSpinner = function( list,width,height,options ) { var ret = this.impl.CreateSpinner(list, width, height, options); if( ret ) return new Spn(ret); else return null; }		
	this.CreateSeekBar = function( width,height,options ) { var ret = this.impl.CreateSeekBar(width, height, options); if( ret ) return new Skb(ret); else return null; }		
	this.CreateText = function( text,width,height,options ) { var ret = this.impl.CreateText(text, width, height, options); if( ret ) return new Txt(ret); else return null; }		
	this.CreateTextEdit = function( text,width,height,options ) { var ret = this.impl.CreateTextEdit(text, width, height, options); if( ret ) return new Txe(ret); else return null; }		
	this.CreateList = function( list,width,height,options ) { var ret = this.impl.CreateList(list, width, height, options); if( ret ) return new Lst(ret); else return null; }	
	this.CreateWebView = function( width,height,options,zoom ) { var ret = this.impl.CreateWeb(width, height, options, zoom); if( ret ) return new Web(ret); else return null; }	
	this.CreateScroller = function( width,height,options ) { var ret = this.impl.CreateScroller(width, height, options); if( ret ) return new Scr(ret); else return null; }	
	this.CreateCameraView = function( width,height,options ) { var ret = this.impl.CreateCameraView(width, height, options);  if( ret ) return new Cam(ret); else return null; }	
	this.CreateVideoView = function( width,height,options ) { var ret = this.impl.CreateVideoView(width, height, options);  if( ret ) return new Vid(ret); else return null; }	
	this.CreateWebGLView = function( width,height,options ) { var ret = this.impl.CreateWebGLView(width, height, options);  if( ret ) return new WGL(ret); else return null; }	
	this.CreateCodeEdit = function( text,width,height,options ) { var ret = this.impl.CreateCodeEdit(text, width, height, options); if( ret ) return new Cde(ret); else return null; }
	this.CreatePanel = function(options) { var ret = this.impl.CreatePanel(options); if( ret ) return new Pnl(ret); else return null; }
	this.CreateActionBar = function(title, buttons) { var ret = this.impl.CreateActionBar(title, buttons); if( ret ) return new Bar(ret); else return null; }
	this.CreateMap = function(url, width, height, options) { var ret = this.impl.CreateMap(url, width, height, options); if( ret ) return new Map(ret); else return null; }
	
	//These objects auto-release (ie. single instance)
	this.CreateYesNoDialog = function( msg ) { if( _ynd ) _ynd.Release(); var ret = this.impl.CreateYesNoDialog(msg); if( ret ) _ynd = new Ynd(ret); else _ynd = null; return _ynd; }		
	// this.CreateListDialog = function( title,list,options ) { if( _ldg ) _ldg.Release(); var ret = prompt( "#", "App.CreateListDialog("+title+"\f"+list+"\f"+options ); if( ret ) _ldg = new Ldg(ret); else _ldg = null; return _ldg; }	
	// this.CreateListView = function( list,title,options ) { if( _lvw ) _lvw.Release(); var ret = prompt( "#", "App.CreateListView(\f"+list+"\f"+title+"\f"+options ); if( ret ) _lvw = new Lvw(ret); else _lvw = null; return _lvw; }	
	// this.CreateBluetoothList = function( filter ) { if( _btl ) _btl.Release(); var ret = prompt( "#", "App.CreateBluetoothList("+filter ); if( ret) _btl = new Btl(ret); else _btl = null; return _btl; }	
	// this.CreateAudioRecorder = function() { if( _rec ) _rec.Release(); var ret = prompt( "#", "App.CreateAudioRecorder(" ); if( ret) _rec = new Rec(ret); else _rec = null; return _rec; }
	// this.CreateSMS = function() { if( _sms ) _sms.Release(); var ret = prompt( "#", "App.CreateSMS(" ); if( ret) _sms = new SMS(ret); else _sms = null; return _sms; }
	// this.CreateEmail = function( account,password ) { if( _eml ) _eml.Release(); var ret = prompt( "#", "App.CreateEmail("+account+"\f"+password ); if( ret) _eml = new EMAIL(ret); else _eml = null; return _eml; }
	// this.CreateSmartWatch = function( type ) { if( _smw ) _smw.Release(); var ret = prompt( "#", "App.CreateSmartWatch(\f"+type ); if( ret) _smw = new SMW(ret); else _smw = null; return _smw; }
	// this.CreateCrypt = function( options ) { if( _crp ) _crp.Release(); var ret = prompt( "#", "App.CreateCrypt(\f"+options ); if( ret) _crp = new Crp(ret); else _crp = null; return _crp; }
	// this.CreateSpeechRec = function( options ) { if( _spr ) _spr.Release(); var ret = prompt( "#", "App.CreateSpeechRec(\f"+options ); if( ret) _spr = new Spr(ret); else _spr = null; return _spr; }
	// this.CreatePhoneState = function( types ) { if( _pst ) _pst.Release(); var ret = prompt( "#", "App.CreatePhoneState(\f"+types ); if( ret) _pst = new Pst(ret); else _pst = null; return _pst; }
	
	//These objects need releasing manually.
	this.CreateDialog = function( title,options ) { var ret = this.impl.CreateDialog(title, options); if( ret ) return new Dlg(ret); else return null; }		
	// this.CreateMediaPlayer = function() { var ret = prompt( "#", "App.CreateMediaPlayer(" ); if( ret ) return new Aud(ret); else return null; }
	// this.CreateSensor = function( type,options ) { var ret = prompt( "#", "App.CreateSensor("+type+"\f"+options ); if( ret ) return new Sns(ret); else return null; }		
	// this.CreateLocator = function( type,options ) { var ret = prompt( "#", "App.CreateLocator("+type+"\f"+options ); if( ret ) return new Loc(ret); else return null; }		
	// this.CreateNetClient = function( type ) { var ret = prompt( "#", "App.CreateNetClient("+type ); if( ret ) return new Net(ret); else return null; }
	// this.CreateNxtRemote = function() { var ret = prompt( "#", "App.CreateNxtRemote(" ); if( ret ) return new Nxt(ret,null); else return null; }	
	// this.CreateWebServer = function( port,options ) { var ret = prompt( "#", "App.CreateWebServer("+port+"\f"+options ); if( ret ) return new Wbs(ret); else return null; }	
	// this.CreateUSBSerial = function( baudRate,dataBits,stopBits,parity,device ) { var ret = prompt( "#", "App.CreateUSBSerial(\f"+baudRate+"\f"+dataBits+"\f"+stopBits+"\f"+parity+"\f"+device ); if( ret ) return new Usb(ret); else return null; }	
	// this.CreateSysProc = function( cmd ) { var ret = prompt( "#", "App.CreateSysProc(\f"+cmd ); if( ret ) return new Sys(ret); else return null; }	
	// this.CreateService = function( packageName,className,callback,options ) { var ret = prompt( "#", "App.CreateService(\f"+packageName+"\f"+className+"\f"+options+"\f"+(callback?callback.name:null) ); if( ret ) return new Svc(ret); else return null; }	
	// this.CreateObject = function( name ) { try { return eval( "new "+name+"()" ); } catch(e) { return null; } }	
	// this.CreateSynth = function( type ) { var ret = prompt( "#", "App.CreateSynth("+type ); if( ret ) return new Syn(ret); else return null; }	
	// this.CreateBluetoothSerial = function( mode ) { var ret = prompt( "#", "App.CreateBluetoothSerial(\f"+mode ); if( ret ) return new Bts(ret); else return null; }	
	// this.CreateZipUtil = function( mode ) { var ret = prompt( "#", "App.CreateZipUtil(\f"+mode ); if( ret ) return new Zip(ret); else return null; }	
	// this.CreateDownloader = function( options ) { var ret = prompt( "#", "App.CreateDownloader(\f"+options ); if( ret ) return new Dwn(ret); else return null; }	
	// this.CreateMediaStore = function() { var ret = prompt( "#", "App.CreateMediaStore(" ); if( ret ) return new Med(ret); else return null; }	
	// this.CreatePlayStore = function() { var ret = prompt( "#", "App.CreatePlayStore(" ); if( ret ) return new Ply(ret); else return null; }	
	// this.CreateNotification = function( options ) { var ret = prompt( "#", "App.CreateNotification(\f"+options ); if( ret ) return new Not(ret); else return null; }	
	// this.CreateFile = function( file,mode ) { var ret = prompt( "#", "App.CreateFile(\f"+file+"\f"+mode ); if( ret ) return new Fil(ret); else return null; }	
	
	//Special methods.
	// this.Start = function() { if(typeof OnStart=='function') { OnStart(); prompt("#","_Start"); } }
	
	// //Helper classes.
	// this.CreateNxt = function() { var nxtHelp = new _NxtHelp(); return nxtHelp.nxt_CreateNxt(); }
	// this.CreateTabs = function( list,width,height,options ) { return new _Tabs( list,width,height,options ); }
	
	// //Hybrid objects.
	// this.CreateGLView = function( width,height,options ) 
	// {
	//     var glv = null;
	//     if( options.toLowerCase().indexOf("fast2d") > -1 )
	//     {
	// 		_LoadScriptSync( "/Sys/cp.js" );
 //    		_LoadScriptSync( "/Sys/gl.js" );
 //    		glv = new GLV( prompt( "#", "App.CreateGLView(\f"+width+"\f"+height+"\f"+options ));
 //    		glv.canvas = FastCanvas.create(); 
 //    		glv.ctx = glv.canvas.getContext("2d");
 //    		glv.width = Math.round(this.GetDisplayWidth()*width);
 //    		glv.height = Math.round(this.GetDisplayHeight()*height);
 //    		glv.aspect = glv.width / glv.height;
 //    		glv.GetType = function() { return "GlView"; }
	//     }
	// 	return glv;
	// }
	
	// this.OpenDatabase = function( name ) 
	// {
	// 	_LoadScriptSync( "/Sys/cp.js" );
	// 	_LoadScriptSync( "/Sys/sql.js" );
	// 	_CreateCP( "sqliteplugin" );
		
	// 	var db = sqlitePlugin.openDatabase( name );
	// 	db.name = name;
	    
	//     db.GetType = function() { return "Database"; }
	//     db.GetName = function() { return db.name; }
	// 	db.ExecuteSql = function( sql, params, success, error ) 
	// 	{
	// 		if( !success || !success.name ) success = null;
	// 		if( !error || !error.name ) error = _Err;
	      
	// 		db.transaction( function(tx) { 
	// 			tx.executeSql( sql, params, 
	// 				function(tx,res) { if(success) success.apply(db,[res]) }, 
	// 				function(t,e) { error.apply(db,[e.message]); } 
	// 			); }, error
	// 		);
	// 	}
	// 	db.Close = function() { db.close( _Log, _Err ); }
	// 	db.Delete = function() { sqlitePlugin.deleteDatabase(db.name,_Log,_Err); }
	// 	return db;
	// }
}

function SObj( impl )
{
	this.id = _nextId++;
	_map[this.id] = this;
	this.impl = impl;
	this._Redraw = function() { }
	this.Destroy = function() { this.impl.Release(); _map[this.id] = null; } 
    this.Release = function() { this.impl.Release(); _map[this.id] = null; }        
}

function Obj( impl )
{
	this.id = _nextId++;
	_map[this.id] = this;
	this.impl = impl;
	this._Redraw = function() { this.impl._Redraw( this ); }
	this.Destroy = function() { this.impl.Release(); _map[this.id] = null; } 
    this.Release = function() { this.impl.Release(); _map[this.id] = null; }        
    this.SetVisibility = function( mode ) { this.impl.SetVisibility(mode); }    
    this.GetVisibility = function() { return this.impl.GetVisibility(); }   
    this.SetPadding = function( left,top,right,bottom ) { this.impl.SetPadding(left, top, right, bottom); }
    this.SetMargins = function( left,top,right,bottom ) { this.impl.SetMargins(left, top, right, bottom); }
    this.SetBackground = function( file,options ) { this.impl.SetBackground(file, options); }
    this.SetBackColor = function( clr ) { this.impl.SetBackColor(clr); }  
    this.SetBackGradient = function( colour1,colour2,colour3,options ) { this.impl.SetBackGradient("Linear", colour1, colour2, colour3, options, null, null, null); }  
    this.SetBackGradientRadial = function( x,y,radius,colour1,colour2,colour3,options ) { this.impl.SetBackGradient("Radial", x, y, radius, colour1, colour2, colour3, options); }  
    this.SetPosition = function( left,top,width,height,options ) { this.impl.SetPosition(left, top, width, height, options); }
    this.SetSize = function( width,height,options ) { this.impl.SetSize(width, height, options); }
    this.GetWidth = function( options ) { return this.impl.GetWidth(options); }  
    this.GetHeight = function( options ) { return this.impl.GetHeight(options); }   
    this.GetAbsWidth = function() { return this.impl.GetAbsWidth(); }  
    this.GetAbsHeight = function() { return this.impl.GetAbsHeight(); }   
    this.GetLeft = function( options ) { return this.impl.GetLeft(options); }  
    this.GetTop = function( options ) { return this.impl.GetTop(options); }   
    this.GetPosition = function( options ) { return eval(this.impl.GetPosition(options)); } 
    this.SetScale = function( x,y ) { this.impl.SetScale(x, y); }
    this.Focus = function() { this.impl.Focus(); }
}

function Lay( impl )
{
	var obj = new Obj( impl );
	obj.GetType = function() { return "Layout"; }
    obj.SetOrientation = function( orient ) { this.impl.SetOrientation(orient); }    
    obj.AddChild = function( child,order ) { this.impl.AddChild((child?child.impl:null), order); }
    obj.RemoveChild = function( child ) { this.impl.RemoveChild((child?child.impl:null)); }    
    obj.DestroyChild = function( child ) { this.impl.DestroyChild((child?child.impl:null)); }    
    obj.ChildToFront = function( child ) { this.impl.ChildToFront((child?child.impl:null)); }
    obj.GetChildOrder = function( child ) { return parseInt(this.impl.GetChildOrder((child?child.impl:null))); }  
    obj.Animate = function( type,callback ) { this.impl.Animate(type, callback); }
    obj.SetTouchable = function( touchable ) { this.impl.SetTouchable(touchable); }
    return obj;
}

function Img( impl )
{
    var obj = new Obj( impl ); 
    obj._auto = true; obj._gfb = "";
    obj.GetType = function() { return "Image"; }
    obj.Clear = function() { if( obj._auto ) this.impl.Clear(); else { this.Draw("c"); } } 
    obj.Update = function() { if( obj._auto ) this.impl.Update(); else { this.impl.Batch(obj._gfb); obj._gfb = ""; } }
    obj.SetAutoUpdate = function( onoff ) { obj._auto=onoff; this.impl.SetAutoUpdate(onoff); }
    //obj.SetName = function( name ) { this.impl.SetName(name); }
    //obj.GetName = function() { return this.impl.GetName(); }
    obj.SetImage = function( image,width,height,options ) { 
		if( typeof image=="string" ) this.impl.SetImage(image, width, height, options); 
		else if( image ) this.impl.SetImage(image.attr("src"), width, height, options);
	}
	obj.GetImage = function() { return this.impl.GetImage(); }
	obj.GetPixelData = function( format,left,top,width,height ) { return this.impl.GetPixelData(format, left, top, width, height); }
    obj.SetSize = function( width,height ) { this.impl.SetSize(width, height); }
    obj.GetHeight = function() { return this.impl.GetHeight(); }
    obj.GetWidth = function() { return this.impl.GetWidth(); }
    obj.GetAbsHeight = function() { return this.impl.GetAbsHeight(); }
    obj.GetAbsWidth = function() { return this.impl.GetAbsWidth(); }
    obj.SetOnTouch = function( callback ) { this.impl.SetOnTouch(callback); } 
    obj.SetOnTouchUp = function( callback ) { this.impl.SetOnTouchUp(callback); }  
    obj.SetOnTouchMove = function( callback ) { this.impl.SetOnTouchMove(callback); }
    obj.SetOnTouchDown = function( callback ) { this.impl.SetOnTouchDown(callback); } 
    obj.SetOnLongTouch = function( callback ) { this.impl.SetOnLongTouch(callback); } 
    obj.SetOnLoad = function( callback ) { this.impl.SetOnLoad(callback); }   
    obj.SetTouchable = function( touchable ) { this.impl.SetTouchable(touchable); }
    obj.SetMaxRate = function( ms ) { this.impl.SetMaxRate(ms); }
    obj.DrawImage = function( image,x,y,w,h,angle,mode ) { 
		if( obj._auto ) this.impl.DrawImage((image?image.impl:null), x, y, w, h, angle, mode); 
		else this.Draw( "i", (image?image.id:null), x,y,(w?w:-1),(h?h:-1),angle,mode ); }
	obj.DrawImageMtx = function( image,matrix ) { 
		if( obj._auto ) this.impl.DrawImageMtx((image?image.impl:null), matrix); 
		else this.Draw( "m", (image?image.id:null), matrix ); }
    obj.DrawPoint = function( x,y ) { 
		if( obj._auto ) this.impl.DrawPoint(x, y); else this.Draw( "p", null, x,y ); }
    obj.DrawCircle = function( x,y,radius ) { 
		if( obj._auto ) this.impl.DrawCircle(x, y, radius);
		else this.Draw( "e", null, x,y,radius ); }
    obj.DrawArc = function( x1,y1,x2,y2,start,sweep ) { 
		if( obj._auto ) this.impl.DrawArc(x1, y1, x2, y2, start, sweep);
		else this.Draw( "a", null, x1,y1,x2,y2,start,sweep ); }
    obj.DrawLine = function( x1,y1,x2,y2 ) { 
		if( obj._auto ) this.impl.DrawLine(x1, y1, x2, y2); 
		else this.Draw( "l", null, x1,y1,x2,y2 ); }
    obj.DrawRectangle = function( x1,y1,x2,y2 ) { 
		if( obj._auto ) this.impl.DrawRect(x1, y1, x2, y2);
		else this.Draw( "r", null, x1,y1,x2,y2 ); }
    obj.DrawText = function( txt,x,y ) { 
		if( obj._auto ) this.impl.DrawText(txt, x, y); 
		else this.Draw( "t", txt, x, y, 0,0,0 ); }
	obj.SetAlpha = function( alpha ) { if( obj._auto ) this.impl.SetAlpha(alpha); else this.Draw( "k",null,alpha ); }
    obj.SetColor = function( clr ) { if( obj._auto ) this.impl.SetColor(clr); else this.Draw( "o", clr ); }
    obj.SetTextSize = function( size ) { if( obj._auto ) this.impl.SetTextSize(size); else this.Draw( "x",null,size ); }
    obj.SetFontFile = function( file ) { if( obj._auto ) this.impl.SetFontFile(file); else this.Draw( "f",file ); }  
    obj.SetLineWidth = function( width ) { if( obj._auto ) this.impl.SetLineWidth(width); else this.Draw( "w",null,width ); }
    obj.SetPaintColor = function( clr ) { if( obj._auto ) this.impl.SetPaintColor(clr); else this.Draw( "n",clr ); }
    obj.SetPaintStyle = function( style ) { if( obj._auto ) this.impl.SetPaintStyle(style); else this.Draw( "s",style ); } 
    obj.Rotate = function( angle,pivX,pivY ) { this.impl.Rotate(angle, pivX, pivY); }
    obj.Move = function( x,y ) { this.impl.Move(x, y); }
    obj.Scale = function( x,y ) { this.impl.Scale(x, y); }
    obj.Skew = function( x,y ) { this.impl.Skew(x, y); }
    obj.Transform = function( matrix ) { this.impl.Transform(matrix); }
    obj.Reset = function() { this.impl.Reset(); }
    obj.Save = function( fileName,quality ) { this.impl.Save(fileName, quality); }
    obj.Draw = function( func, p1, p2, p3, p4, p5, p6, p7 ) {
		if( obj._gfb.length > 2 ) obj._gfb += "\f";
		obj._gfb += func + "¬" + p1 + "¬" + p2 + "¬" + p3 + "¬" + p4 + "¬" + p5 + "¬" + p6 + "¬" + p7;
	}
    return obj;
}

function Btn( impl )
{
    var obj = new Obj( impl ); 
    obj.GetType = function() { return "Button"; }
    obj.SetOnTouch = function( callback ) { this.impl.SetOnClick(callback); }
    obj.SetText = function( text ) { this.impl.SetText(text); }   
    obj.SetHtml = function( html ) { this.impl.SetHtml(html); }  
    obj.GetText = function() { return this.impl.GetText(); }  
    obj.SetTextColor = function( clr ) { this.impl.SetTextColor(clr); }    
    obj.SetFontFile = function( file ) { this.impl.SetFontFile(file); }  
    obj.SetTextShadow = function( radius,dx,dy,color ) { this.impl.SetTextShadow(radius, dx, dy, color); } 
    obj.SetTextSize = function( size,mode ) { this.impl.SetTextSize(size, mode); }   
    obj.GetTextSize = function( mode ) { return this.impl.GetTextSize(mode); } 
    obj.SetBackColor = function( clr ) { this.impl.SetBackColor(clr); } 
    obj.SetStyle = function( clr1,clr2,radius,strokeClr,strokeWidth,shadow ) { this.impl.SetStyle(clr1, clr2, radius, strokeClr, strokeWidth, shadow); }     
	return obj;
}

// function Tgl( id )
// {
//     var obj = new Obj( id );
//     obj.GetType = function() { return "Toggle"; }
//     obj.SetOnTouch = function( callback ) { prompt( obj.id, "Tgl.SetOnClick("+callback.name ); }
//     obj.SetText = function( text ) { prompt( obj.id, "Tgl.SetText("+text ); }
//     obj.GetText = function() { return prompt( obj.id, "Tgl.GetText(" ); }  
//     obj.SetTextColor = function( clr ) { prompt( obj.id, "Tgl.SetTextColor("+clr ); }    
//     obj.SetTextSize = function( size,mode ) { prompt( obj.id, "Tgl.SetTextSize(\f"+size+"\f"+mode ); }   
//     obj.GetTextSize = function( mode ) { return parseFloat(prompt( obj.id, "Tgl.GetTextSize(\f"+mode )); }  
//     obj.SetChecked = function( checked ) { prompt( obj.id, "Tgl.SetChecked("+checked ); }   
//     obj.GetChecked = function() { return prompt( obj.id, "Tgl.GetChecked(" )=="true"; }    
//     return obj;      
// }

function Chk( impl )
{
    var obj = new Obj( impl );
    obj.GetType = function() { return "CheckBox"; }
    obj.SetOnTouch = function( callback ) { this.impl.SetOnClick(callback); }
    obj.SetText = function( text ) { this.impl.SetText(text); }    
    obj.GetText = function() { return this.impl.GetText(); }   
    obj.SetTextColor = function( clr ) { this.impl.SetTextColor(clr); }    
    obj.SetTextSize = function( size,mode ) { this.impl.SetTextSize(size, mode); }   
    obj.GetTextSize = function( mode ) { return this.impl.GetTextSize(mode); }  
    obj.SetChecked = function( checked ) { this.impl.SetChecked(checked); }   
    obj.GetChecked = function() { return this.impl.GetChecked(); }    
    return obj;      
}

function Spn( impl )
{
    var obj = new Obj( impl );   
    obj.GetType = function() { return "Spinner"; }
    obj.SetOnTouch = function( callback ) { this.impl.SetOnChange(callback); }
    obj.SetOnChange = function( callback ) { this.impl.SetOnChange(callback); }
    obj.SetText = function( txt ) { this.impl.SetText(txt); }   
    obj.SelectItem = function( item ) { this.impl.SetText(item); }   
    obj.GetText = function() { return this.impl.GetText(); } 
    obj.SetTextColor = function( clr ) { this.impl.SetTextColor(clr); }    
    obj.SetTextSize = function( size,mode ) { this.impl.SetTextSize(size, mode); }   
    obj.GetTextSize = function( mode ) { return this.impl.GetTextSize(mode); }  
    obj.SetList = function( list,delim ) { this.impl.SetList(list, delim); }
    return obj;
}

// function Skb( id )
// {
//     var obj = new Obj( id );   
//     obj.GetType = function() { return "SeekBar"; }
//     obj.SetOnTouch = function( callback ) { prompt( obj.id, "Skb.SetOnClick("+callback.name ); }
//     obj.GetValue = function() { return parseFloat(prompt( obj.id, "Skb.GetValue(" )); }  
//     obj.SetValue = function( val ) { prompt( obj.id, "Skb.SetValue("+val ); }
//     obj.SetRange = function( range ) { prompt( obj.id, "Skb.SetRange("+range ); }
//     obj.SetMaxRate = function( rate ) { prompt( obj.id, "Skb.SetMaxRate("+rate ); }
//     return obj;
// }

// function Ibn( id )
// {
//     var obj = new Obj( id ); 
//     obj.GetType = function() { return "ImageButton"; }
//     obj.SetOnTouch = function( callback ) { prompt( obj.id, "Ibn.SetOnClick("+callback.name ); }
//     obj.SetText = function( text ) { prompt( obj.id, "Ibn.SetText("+text ); }    
//     obj.SetTextColor = function( clr ) { prompt( obj.id, "Ibn.SetTextColor("+clr ); }    
//     obj.SetTextSize = function( size,mode ) { prompt( obj.id, "Ibn.SetTextSize(\f"+size+"\f"+mode ); }   
//     obj.GetTextSize = function( mode ) { return parseFloat(prompt( obj.id, "Ibn.GetTextSize(\f"+mode )); }  
//     return obj;           
// }

function Txt( impl )
{
    var obj = new Obj( impl );  
    obj.GetType = function() { return "Text"; }
    obj.SetText = function( text ) { this.impl.SetText(text); }  
    obj.SetHtml = function( html ) { this.impl.SetHtml(html); } 
    obj.Log = function( msg,options ) { this.impl.Log(msg, options); } 
    obj.SetLog = function( maxLines ) { this.impl.SetLog(maxLines); } 
    obj.SetTextSize = function( size,mode ) { this.impl.SetTextSize(size, mode); }   
    obj.GetTextSize = function( mode ) { return this.impl.GetTextSize(mode); }  
    obj.GetText = function() { return this.impl.GetText(); }  
    obj.SetTextColor = function( color ) { this.impl.SetTextColor(color); }    
    obj.SetFontFile = function( file ) { this.impl.SetFontFile(file); }   
    obj.GetLineCount = function() { return this.impl.GetLineCount(); }   
    obj.GetMaxLines = function() { return this.impl.GetMaxLines(); }   
    obj.GetLineTop = function( line ) { return this.impl.GetLineTop(line); }   
    obj.GetLineStart = function( line ) { return this.impl.GetLineStart(line); }  
    obj.SetEllipsize = function( mode ) { this.impl.SetEllipsize(mode); } 
    obj.SetTextShadow = function( radius,dx,dy,color ) { this.impl.SetTextShadow(radius, dx, dy, color); }   
    obj.SetOnTouch = function( callback ) { this.impl.SetOnTouch(callback); } 
    obj.SetOnTouchUp = function( callback ) { this.impl.SetOnTouchUp(callback); }  
    obj.SetOnTouchMove = function( callback ) { this.impl.SetOnTouchMove(callback); }
    obj.SetOnTouchDown = function( callback ) { this.impl.SetOnTouchDown(callback); } 
    obj.SetOnLongTouch = function( callback ) { this.impl.SetOnLongTouch(callback); }   
    obj.SetTouchable = function( touchable ) { this.impl.SetTouchable(touchable); }
    return obj;
}

function Txe( impl )
{
    var obj = new Obj( impl ); 
    obj.GetType = function() { return "TextEdit"; } 
    obj.SetText = function( txt ) { this.impl.SetText(txt); } 
    obj.SetHtml = function( html ) { this.impl.SetHtml(html); }    
    obj.GetHtml = function() { return this.impl.GetHtml(); } 
    obj.SetHint = function( text ) { this.impl.SetHint(text); } 
    obj.InsertText = function( text,start,end ) { this.impl.InsertText(text, start); }  
    obj.ReplaceText = function( text,start,end ) { this.impl.ReplaceText(text, start, end); }  
    obj.GetText = function() { return this.impl.GetText(); }
    obj.SetOnChange = function( callback ) { this.impl.SetOnChange(callback); }  
    obj.SetOnTouch = function( callback ) { this.impl.SetOnTouch(callback); }   
    obj.SetTextColor = function( color ) { this.impl.SetTextColor(color); }    
    obj.SetTextSize = function( size,mode ) { this.impl.SetTextSize(size, mode); }   
    obj.GetTextSize = function( mode ) { return this.impl.GetTextSize(mode); }   
    obj.GetLineCount = function() { return this.impl.GetLineCount(); } 
    obj.GetMaxLines = function() { return this.impl.GetMaxLines(); }  
    obj.GetLineTop = function( line ) { return this.impl.GetLineTop(line); }   
    obj.GetLineStart = function( line ) { return this.impl.GetLineStart(line); } 
    obj.SetCursorPos = function( pos ) { this.impl.SetCursorPos(pos); }  
    obj.GetCursorPos = function() { return this.impl.GetCursorPos(); }   
    obj.GetCursorLine = function() { return this.impl.GetCursorLine(); }  
    obj.SetSelection = function( start,stop ) { this.impl.SetSelection(start, stop); } 
    obj.GetSelectedText = function() { return this.impl.GetSelectedText(); }  
    obj.GetSelectionStart = function() { return this.impl.GetSelectionStart(); }  
    obj.GetSelectionEnd = function() { return this.impl.GetSelectionEnd(); }   
    obj.Undo = function() { this.impl.Undo(); }   
    obj.Redo = function() { this.impl.Redo(); }  
    obj.ClearHistory = function() { this.impl.ClearHistory(); }  
    return obj;
}

// function Cde( id )
// {
//     var obj = new Obj( id ); 
//     obj.GetType = function() { return "CodeEdit"; }  
//     obj.GetText = function() { return prompt( obj.id, "Cde.GetText(" ); } 
//     obj.SetText = function( txt ) { prompt( obj.id, "Cde.SetText(\f"+txt ); } 
//     obj.SetHtml = function( html ) { prompt( obj.id, "Cde.SetText(\f"+html ); }   
//     obj.Undo = function() { prompt( obj.id, "Cde.Undo("); }   
//     obj.Redo = function() { prompt( obj.id, "Cde.Redo("); } 
//     obj.Copy = function() { prompt( obj.id, "Cde.Copy(" ); } 
//     obj.Cut = function() { prompt( obj.id, "Cde.Cut(" ); } 
//     obj.Paste = function() { prompt( obj.id, "Cde.Paste(" ); } 
//     obj.SetSelectMode = function( onOff ) { prompt( obj.id, "Cde.SetSelectMode(\f"+onOff ); }
//     obj.GetSelectMode = function() { return prompt( obj.id, "Cde.GetSelectMode(" )=="true"; }
//     obj.SelectAll = function() { prompt( obj.id, "Cde.SelectAll(" ); }
//     obj.Search = function( text,dir,matchCase,wholeWord ) { prompt( obj.id, "Cde.Search(\f"+text+"\f"+dir+"\f"+matchCase+"\f"+wholeWord ); } 
//     obj.Replace = function( text ) { prompt( obj.id, "Cde.Replace(\f"+text ); } 
//     obj.ReplaceAll = function( text,newText,matchCase,wholeWord ) { prompt( obj.id, "Cde.ReplaceAll(\f"+text+"\f"+newText+"\f"+matchCase+"\f"+wholeWord ); } 
//     obj.SetUseKeyboard = function( onOff ) { prompt( obj.id, "Cde.SetUseKeyboard(\f"+onOff ); }
//     obj.SetNavigationMethod = function( method ) { prompt( obj.id, "Cde.SetNavigationMethod(\f"+method); }  
//     obj.ClearHistory = function() { prompt( obj.id, "Cde.ClearHistory("); }  
//     obj.SetTextSize = function( size,mode ) { prompt( obj.id, "Cde.SetTextSize(\f"+size+"\f"+mode ); }  
//     obj.SetTextColor = function( color ) { prompt( obj.id, "Cde.SetTextColor(\f"+color ); }  
//     obj.GetCursorLine = function() { return parseInt(prompt( obj.id, "Cde.GetCursorLine(")); } 
//     obj.GetLineStart = function( line ) { return parseInt(prompt( obj.id, "Cde.GetLineStart("+line )); } 
//     obj.HighlightLine = function( line ) { prompt( obj.id, "Cde.HighlightLine(\f"+line ); } 
//     obj.SetOnChange = function( callback ) { prompt( obj.id, "Cde.SetOnChange(\f"+callback.name ); }  
//     obj.SetOnDoubleTap = function( callback ) { prompt( obj.id, "Cde.SetOnDoubleTap(\f"+callback.name ); } 
//     obj.SetCursorPos = function( pos ) { prompt( obj.id, "Cde.SetCursorPos("+pos ); }  
//     obj.GetCursorPos = function() { return parseInt(prompt( obj.id, "Cde.GetCursorPos(")); }   
//     obj.InsertText = function( text,start,end ) { prompt( obj.id, "Cde.InsertText(\f"+text+"\f"+start ); }  
//     obj.ReplaceText = function( text,start,end ) { prompt( obj.id, "Cde.ReplaceText(\f"+text+"\f"+start+"\f"+end ); } 
//     obj.SetSelection = function( start,stop ) { prompt( obj.id, "Cde.SetSelection(\f"+start+"\f"+stop ); } 
//     return obj;
// }

function Lst( impl )
{
    var obj = new Obj( impl );  
    obj.GetType = function() { return "List"; }
    obj.SetPadding = function( left,top,right,bottom ) { this.impl.SetPadding(left, top, right, bottom); }
    obj.SetList = function( list,delim ) { this.impl.SetList(list, delim); }
    obj.GetList = function( delim ) { return eval(this.impl.GetList(delim)); }
    obj.AddItem = function( title,body,image ) { this.impl.AddItem(title, body, image); }
    obj.InsertItem = function( index,title,body,image ) { this.impl.InsertItem(index, title, body, image); }
    obj.SetItem = function( title,newTitle,newBody,newImage ) { this.impl.SetItem(title, newTitle, newBody, newImage); }
    obj.SetItemByIndex = function( index,newTitle,newBody,newImage ) { this.impl.SetItemByIndex(index, newTitle, newBody, newImage); }
    obj.RemoveItem = function( title ) { this.impl.RemoveItem(title); }
    obj.RemoveItemByIndex = function( index ) { this.impl.RemoveItemByIndex(index); }
    obj.RemoveAll = function() { this.impl.RemoveAll(); }
    obj.SelectItem = function( title,body,scroll ) { this.impl.SelectItem(title, body, scroll); }
    obj.SelectItemByIndex = function( index,scroll ) { this.impl.SelectItemByIndex(index, scroll); }
    obj.GetItem = function( title ) { return this.impl.GetItem(title); }
    obj.GetItemByIndex = function( index ) { return this.impl.GetItemByIndex(index); }
    obj.GetLength = function() { return parseInt(this.impl.GetLength()); }
    obj.ScrollToItem = function( title,body ) { this.impl.ScrollToItem(title, body); }
    obj.ScrollToItemByIndex = function( index ) { this.impl.ScrollToItemByIndex(index); }
    obj.SetOnTouch = function( callback ) { this.impl.SetOnTouch(callback); }    
    obj.SetOnLongTouch = function( callback ) { this.impl.SetOnLongTouch(callback); }    
    obj.SetTextColor = function( clr ) { this.impl.SetTextColor1(clr); } 
    obj.SetTextColor1 = function( clr ) { this.impl.SetTextColor1(clr); } 
    obj.SetTextColor2 = function( clr ) { this.impl.SetTextColor2(clr); }
    obj.SetHiTextColor1 = function( clr ) { this.impl.SetHiTextColor1(clr); }
    obj.SetHiTextColor2 = function( clr ) { this.impl.SetHiTextColor2(clr); } 
    obj.SetTextSize = function( size,mode ) { this.impl.SetTextSize1(size, mode); }  
    obj.SetTextSize1 = function( size,mode ) { this.impl.SetTextSize1(size, mode); }  
    obj.SetTextSize2 = function( size,mode ) { this.impl.SetTextSize2(size, mode); }   
    obj.GetTextSize = function( mode ) { return parseFloat(this.impl.GetTextSize(+mode)); }   
    obj.SetTextMargins = function( left,top,right,bottom ) { this.impl.SetTextMargins(left, top, right, bottom); }
    obj.SetEllipsize = function( mode ) { this.impl.SetEllipsize1(mode); } 
    obj.SetEllipsize1 = function( mode ) { this.impl.SetEllipsize1(mode); }
    obj.SetEllipsize2 = function( mode ) { this.impl.SetEllipsize2(mode); }
    obj.SetTextShadow = function( radius,dx,dy,color ) { this.impl.SetTextShadow1(radius, dx, dy, color); }
    obj.SetTextShadow1 = function( radius,dx,dy,color ) { this.impl.SetTextShadow1(radius, dx, dy, color); }
    obj.SetTextShadow2 = function( radius,dx,dy,color ) { this.impl.SetTextShadow2(radius, dx, dy, color); }
    obj.SetDivider = function( height,color ) { this.impl.SetDivider(height, color); }
    obj.SetFontFile = function( file ) { this.impl.SetFontFile(file); }  
	obj.SetIconSize = function( size,mode ) { this.impl.SetIconSize(size,mode); }  
    return obj;
}

// function Web( id )
// {
//     var obj = new Obj( id );  
//     obj.GetType = function() { return "WebView"; }
//     obj.SetOnProgress = function( callback ) { prompt( obj.id, "Web.SetOnProgress("+callback.name ); }  
//     obj.LoadHtml = function( html,base,options ) { prompt(obj.id,"Web.LoadHtml(\f"+html+"\f"+base+"\f"+options); }
//     obj.LoadUrl = function( url,options ) { prompt(obj.id,"Web.LoadUrl(\f"+url+"\f"+options); }
//     obj.Back = function() { prompt(obj.id,"Web.Back(" ); }
//     obj.Forward = function() { prompt(obj.id,"Web.Forward(" ); }
//     obj.CanGoBack = function() { return prompt( obj.id, "Web.CanGoBack(" )=="true"; } 
//     obj.CanGoForward = function() { return prompt( obj.id, "Web.CanGoForward(" )=="true"; } 
//     obj.Execute = function( code ) { prompt( obj.id, "Web.Execute("+code ); } 
//     obj.ClearHistory = function() { prompt(obj.id,"Web.ClearHistory(" ); }
//     obj.GetUrl = function() { return prompt(obj.id,"Web.GetUrl(" ); }
//     obj.Capture = function( file ) { prompt( obj.id, "Web.Capture(\f"+file ); } 
//     obj.Print = function() { prompt( obj.id, "Web.Print(\f" ); }
//     return obj;
// }

// function Scr( id )
// {
//     var obj = new Obj( id );  
//     obj.GetType = function() { return "Scroller"; }
//     obj.AddChild = function( child ) { prompt( obj.id, "Scr.AddChild(\f"+(child?child.id:null) ); }
//     obj.RemoveChild = function( child ) { prompt( obj.id, "Scr.RemoveChild(\f"+(child?child.id:null) ); }    
//     obj.DestroyChild = function( child ) { prompt( obj.id, "Scr.DestroyChild(\f"+(child?child.id:null) ); }  
//     obj.ScrollTo = function( x,y ) { prompt( obj.id, "Scr.ScrollTo\f"+x+"\f"+y ); }
//     obj.ScrollBy = function( x,y ) { prompt( obj.id, "Scr.ScrollBy\f"+x+"\f"+y ); }
//     obj.GetScrollX = function() { return parseFloat(prompt( obj.id, "Scr.GetScrollX(" )); }
//     obj.GetScrollY = function() { return parseFloat(prompt( obj.id, "Scr.GetScrollY(" )); }
//     return obj;
// }

function Dlg( impl )
{
    var obj = new Obj( impl );   
    obj.GetType = function() { return "Dialog"; }
    obj.SetOnTouch = function( callback ) { this.impl.SetOnClick(callback); }
    obj.AddLayout = function( layout ) { this.impl.AddLayout(layout.impl); }	
	obj.RemoveLayout = function( layout ) { this.impl.RemoveLayout(layout.impl); }	
	obj.Show = function() { this.impl.Show(); }
	obj.Hide = function() { this.impl.Hide(); }
	obj.Dismiss = function() { this.impl.Dismiss(); }
	obj.SetTitle = function( title ) { this.impl.SetTitle(title); }
	obj.SetBackColor = function( clr ) { this.impl.SetBackColor(clr); } 
	obj.SetSize = function( width,height,options ) { this.impl.SetSize(width, height, options); }
	obj.SetOnCancel = function( callback ) { this.impl.SetOnCancel(callback); }
	return obj;
}

function Ynd( impl )
{
    var obj = new SObj( impl );    
    obj.GetType = function() { return "YesNoDialog"; }
    obj.SetOnTouch = function( callback ) { this.impl.SetOnTouch(callback); }
	obj.SetBackColor = function( clr ) { this.impl.SetBackColor(clr); } 
	obj.SetSize = function( width,height,options ) { this.impl.SetSize(width, height, options); }
    return obj;
}

// function Lvw( id )
// {
//     var obj = new Obj( id );   
//     obj.GetType = function() { return "ListView"; }
//     obj.SetOnTouch = function( callback ) { prompt( obj.id, "Lvw.SetOnClick("+callback.name ); }   
//     return obj; 
// }

// function Ldg( id )
// {
//     var obj = new SObj( id );  
//     obj.GetType = function() { return "ListDialog"; } 
//     obj.SetOnTouch = function( callback ) { prompt( obj.id, "Ldg.SetOnClick("+callback.name ); }
//     obj.SetTitle = function( title ) { prompt( obj.id, "Ldg.SetTitle(\f"+ title ); }
//     obj.SetTitleHeight = function( height,options ) { prompt( obj.id, "Ldg.SetTitleHeight(\f"+height+"\f"+options ); }
// 	obj.SetBackColor = function( clr ) { prompt( obj.id, "Ldg.SetBackColor(\f"+clr ); } 
// 	obj.SetSize = function( width,height,options ) { prompt( obj.id, "Ldg.SetSize(\f"+width+"\f"+height+"\f"+options ); }
//     return obj;    
// }

// function Btl( id )
// {
//     var obj = new Obj( id );   
//     obj.GetType = function() { return "BluetoothList"; }
//     obj.SetOnTouch = function( callback ) { prompt( obj.id, "Btl.SetOnClick("+callback.name ); }
//     obj.SetOnTouchEx = function( callback ) { prompt( obj.id, "Btl.SetOnClick("+callback ); }
//     return obj;    
// }

// function Net( id )
// {
//     var obj = new SObj( id );    
//     obj.GetType = function() { return "NetClient"; }
//     obj.Connect = function( address,port ) { return prompt( obj.id, "Net.Connect("+address+"\f"+port )=="true"; }
//     obj.SetOnConnect = function( callback ) { prompt( obj.id, "Net.SetOnConnect("+callback.name ); }
//     obj.Disconnect = function() { prompt( obj.id, "Net.Disconnect(" ); }
// 	obj.IsEnabled = function() { return prompt( obj.id, "Net.IsEnabled(" )=="true"; } 
//     obj.IsConnected = function() { return prompt( obj.id, "Net.IsConnected(" )=="true"; }   
//     obj.SetTimeout = function( secs ) { prompt( obj.id, "Net.SetTimeout("+secs ); } 
//     obj.SendText = function( text,mode ) { prompt( obj.id, "Net.SendText("+text+"\f"+mode ); }
//     obj.SendBytes = function( data,mode ) { prompt( obj.id, "Net.SendBytes(\f"+data+"\f"+mode ); }
//     obj.ReceiveText = function( mode ) { return prompt( obj.id, "Net.ReceiveText("+mode ); }     
//     obj.ReceiveBytes = function( mode ) { return eval(prompt( obj.id, "Net.ReceiveBytes(\f"+mode )); }   
//     obj.ReceiveFile = function( file,wait ) { return prompt( obj.id, "Net.ReceiveFile("+file+"\f"+wait ); }        
//     obj.DownloadFile = function( file ) { return prompt( obj.id, "Net.DownloadFile("+file ); } 
//     obj.SetOnDownload = function( callback ) { prompt( obj.id, "Net.SetOnDownload("+callback.name ); }    
//     obj.GetBroadcastAddress = function() { return prompt( obj.id, "Net.GetBroadcastAddress(" ); } 
//     obj.SendDatagram = function( data,mode,address,port,options ) { prompt( obj.id, "Net.SendDatagram(\f"+data+"\f"+mode+"\f"+address+"\f"+port+"\f"+options ); }
//     obj.ReceiveDatagram = function( mode,port,timeout ) { return prompt( obj.id, "Net.ReceiveDatagram("+mode+"\f"+port+"\f"+timeout ); }
//     obj.ReceiveDatagrams = function( port,mode ) { prompt( obj.id, "Net.ReceiveDatagrams(\f"+port+"\f"+mode ); }  
//     obj.SetOnReceive = function( callback ) { prompt( obj.id, "Net.SetOnReceive("+callback.name ); }           
//     obj.AutoReceive = function( server,port,mode ) { return prompt( obj.id, "Net.AutoReceive("+server+"\f"+port+"\f"+mode ); } 
//     return obj;   
// }

// function Aud( id )
// {
//     var obj = new SObj( id );    
//     obj.GetType = function() { return "MediaPlayer"; }
//     obj.SetFile = function( file ) { prompt( obj.id, "Aud.SetFile("+file ); } 
//     obj.SetLooping = function( loop ) { prompt( obj.id, "Aud.SetLooping(\f"+loop ); } 
//     obj.Close = function() { prompt( obj.id, "Aud.Close(" ); }
//     obj.Release = function() { prompt( obj.id, "Aud.Release(" ); _map[obj.id] = null; }
//     obj.Destroy = function() { prompt( obj.id, "Aud.Release(" ); _map[obj.id] = null; }
//     obj.Play = function() { prompt( obj.id, "Aud.Play(" ); }
//     obj.Pause = function() { prompt( obj.id, "Aud.Pause(" ); }
//     obj.Stop = function() { prompt( obj.id, "Aud.Stop(" ); }    
//     obj.IsReady = function() { return prompt( obj.id, "Aud.IsReady(" )=="true"; } 
// 	obj.IsPlaying = function() { return prompt( obj.id, "Aud.IsPlaying(" )=="true"; } 
//     obj.IsLooping = function() { return prompt( obj.id, "Aud.IsLooping(" )=="true"; }    
//     obj.SeekTo = function( time ) { prompt( obj.id, "Aud.SeekTo("+time ); }
//     obj.GetPosition = function() { return parseFloat(prompt( obj.id, "Aud.GetPosition(" )); }  
//     obj.GetDuration = function() { return parseFloat(prompt( obj.id, "Aud.GetDuration(" )); }  
//     obj.SetVolume = function( left,right ) { prompt( obj.id, "Aud.SetVolume("+left+"\f"+right ); }
//     obj.SetOnReady = function( callback ) { prompt( obj.id, "Aud.SetOnReady("+callback.name ); } 
//     obj.SetOnComplete = function( callback ) { prompt( obj.id, "Aud.SetOnComplete("+callback.name ); }    
//     obj.SetOnSeekDone = function( callback ) { prompt( obj.id, "Aud.SetOnSeekDone("+callback.name ); }  
//     return obj;  
// }

// function Dwn( id )
// {
//     var obj = new SObj( id );    
//     obj.GetType = function() { return "Downloader"; }
//     obj.Download = function( url,dest ) { prompt( obj.id, "Dwn.Download(\f"+url+"\f"+dest ); }
//     obj.IsComplete = function() { return prompt( obj.id, "Dwn.IsComplete(" )=="true"; } 
//     obj.GetProgress = function() { return parseFloat(prompt( obj.id, "Dwn.GetProgress(" )); }  
//     obj.GetSize = function() { return parseFloat(prompt( obj.id, "Dwn.GetSize(" )); }  
//     obj.SetOnComplete = function( callback ) { prompt( obj.id, "Dwn.SetOnComplete(\f"+callback.name ); }  
//     obj.SetOnError = function( callback ) { prompt( obj.id, "Dwn.SetOnError(\f"+callback.name ); }    
//     return obj;  
// }

// function Med( id )
// {
//     var obj = new SObj( id );  
//     obj.GetType = function() { return "MediaStore"; } 
//     obj.QueryMedia = function( filter,sort,options ) { prompt( obj.id, "Med.QueryMedia(\f"+filter+"\f"+sort+"\f"+options ); }
//     obj.SetOnMediaResult = function( callback ) { prompt( obj.id, "Med.SetOnMediaResult(\f"+callback.name ); } 
//     obj.QueryArtists = function( filter,sort,options ) { prompt( obj.id, "Med.QueryArtists(\f"+filter+"\f"+sort+"\f"+options ); }
//     obj.SetOnArtistsResult = function( callback ) { prompt( obj.id, "Med.SetOnArtistsResult(\f"+callback.name ); } 
//     obj.QueryAlbums = function( filter,sort,options ) { prompt( obj.id, "Med.QueryAlbums(\f"+filter+"\f"+sort+"\f"+options ); }
//     obj.SetOnAlbumsResult = function( callback ) { prompt( obj.id, "Med.SetOnAlbumsResult(\f"+callback.name ); } 
//     obj.GetAlbumArt = function( img,id,options ) { return prompt( obj.id, "Med.GetAlbumArt(\f"+(img?img.id:null)+"\f"+id+"\f"+options )=="true"; }
//     obj.GetSongArt = function( img,id,options ) { return prompt( obj.id, "Med.GetSongArt(\f"+(img?img.id:null)+"\f"+id+"\f"+options )=="true"; }
//     return obj;  
// }

// function Ply( id )
// {
//     var obj = new SObj( id );    
//     obj.GetType = function() { return "PlayStore"; }
//     obj.GetBillingInfo = function( prodIDs,callback,options ) { ret = prompt( obj.id, "Ply.GetBillingInfo(\f"+prodIDs+"\f"+callback.name+"\f"+options ); }
//     obj.Purchase = function( prodID,token,callback,options ) { ret = prompt( obj.id, "Ply.Purchase(\f"+prodID+"\f"+token+"\f"+callback.name+"\f"+options ); }
//     obj.GetPurchases = function( callback,options ) { ret = prompt( obj.id, "Ply.GetPurchases(\f"+callback.name+"\f"+options ); }
//     return obj;  
// }

// function Rec( id )
// {
//     var obj = new SObj( id );
//     obj.GetType = function() { return "AudioRecorder"; }
//     obj.SetFile = function( file ) { prompt( obj.id, "Rec.SetFile("+file ); }        
//     obj.Start = function() { prompt( obj.id, "Rec.Start(" ); }  
//     obj.Stop = function() { prompt( obj.id, "Rec.Stop(" ); }  
//     obj.Pause = function() { prompt( obj.id, "Rec.Pause(" ); }
//     obj.GetRMS = function() { return parseFloat(prompt( obj.id, "Rec.GetRMS(" )); }
//     obj.GetPeak = function() { return parseFloat(prompt( obj.id, "Rec.GetPeak(" )); }
//     return obj;      
// }

// function Sns( id )
// {
//     var obj = new SObj( id );    
//     obj.GetType = function() { return "Sensor"; }
//     obj.SetOnChange = function( callback ) { prompt( obj.id, "Sns.SetOnChange("+callback.name ); } 
//     obj.SetMinChange = function( min ) { prompt( obj.id, "Sns.SetMinChange("+min ); } 
//     obj.SetMaxRate = function( rate ) { prompt( obj.id, "Sns.SetMaxRate(\f"+rate ); } 
//     obj.GetNames = function() { return prompt( obj.id, "Sns.GetNames(" ); }
//     obj.Start = function() { prompt( obj.id, "Sns.Start(" ); }
//     obj.Stop = function() { prompt( obj.id, "Sns.Stop(" ); }
//     obj.GetAzimuth = function() { return parseFloat(prompt( obj.id, "Sns.GetAzimuth(" )); }  
//     obj.GetPitch = function() { return parseFloat(prompt( obj.id, "Sns.GetPitch(" )); }
//     obj.GetRoll = function() { return parseFloat(prompt( obj.id, "Sns.GetRoll(" )); }
//     obj.GetValues = function() { return eval(prompt( obj.id, "Sns.GetValues(" )); }
//     return obj;
// }

// function Loc( id )
// {
//     var obj = new SObj( id );    
//     obj.GetType = function() { return "Locator"; }
//     obj.SetOnChange = function( callback ) { prompt( obj.id, "Loc.SetOnChange("+callback.name ); } 
//     obj.Start = function() { prompt( obj.id, "Loc.Start(" ); }
//     obj.Stop = function() { prompt( obj.id, "Loc.Stop(" ); }
//     obj.SetRate = function( rate ) { prompt( obj.id, "Loc.SetRate("+rate ); } 
//     obj.GetDistanceTo = function( lat,lng ) { return parseFloat(prompt( obj.id, "Loc.GetDistanceTo("+lat+"\f"+lng )); }
//     obj.GetBearingTo = function( lat,lng ) { return parseFloat(prompt( obj.id, "Loc.GetBearingTo("+lat+"\f"+lng )); }
//     return obj;
// }

// function Pst( id )
// {
//     var obj = new SObj( id );    
//     obj.GetType = function() { return "PhoneState"; }
//     obj.SetOnChange = function( callback ) { prompt( obj.id, "Pst.SetOnChange("+callback.name ); } 
//     obj.Start = function() { prompt( obj.id, "Pst.Start(" ); }
//     obj.Stop = function() { prompt( obj.id, "Pst.Stop(" ); }
//     return obj;
// }

// function Cam( id )
// {
//     var obj = new Obj( id );  
//     obj.GetType = function() { return "CameraView"; }
//     obj.StartPreview = function() { prompt( obj.id, "Cam.StartPreview(" ); }   
//     obj.StopPreview = function() { prompt( obj.id, "Cam.StopPreview(" ); } 
//     obj.Focus = function() { prompt( obj.id, "Cam.Focus(" ); }
//     obj.SetFocusMode = function( mode ) { prompt( obj.id, "Cam.SetFocusMode(\f"+mode ); } 
//     obj.SetZoom = function( level ) { prompt( obj.id, "Cam.SetZoom(\f"+level ); }  
//     obj.GetZoom = function() { return parseInt(prompt( obj.id, "Cam.GetZoom(" )); }
//     obj.GetMaxZoom = function() { return parseInt(prompt( obj.id, "Cam.GetMaxZoom(" )); }  
//     obj.SetPictureSize = function( width,height ) { prompt( obj.id, "Cam.SetPictureSize("+width+"\f"+height ); } 
//     obj.GetPictureSizes = function() { return prompt( obj.id, "Cam.GetPictureSizes(" ); }  
//     obj.SetColorEffect = function( effect ) { prompt( obj.id, "Cam.SetColorEffect(\f"+effect ); } 
//     obj.GetColorEffects = function() { return prompt( obj.id, "Cam.GetColorEffects(" ); }  
//     obj.TakePicture = function( file ) { prompt( obj.id, "Cam.TakePicture("+file ); } 
//     obj.Record = function( file,seconds ) { prompt( obj.id, "Cam.Record(\f"+file+"\f"+seconds ); } 
//     obj.IsRecording = function() { return prompt( obj.id, "Cam.IsRecording(" )=="true"; }  
//     obj.Stop = function() { prompt( obj.id, "Cam.Stop(" ); } 
//     obj.Stream = function( ip,port,quality,fps,mtu ) { prompt( obj.id, "Cam.Stream("+ip+"\f"+port+"\f"+quality+"\f"+fps+"\f"+mtu ); }
//     obj.HasFlash = function() { return prompt( obj.id, "Cam.HasFlash(" )=="true"; }
//     obj.SetFlash = function( onoff ) { prompt( obj.id, "Cam.SetFlash("+onoff ); } 
//     obj.SetSound = function( onoff ) { prompt( obj.id, "Cam.SetSound("+onoff ); } 
//     obj.GetImageWidth = function() { return parseInt(prompt( obj.id, "Cam.GetImageWidth(" )); }  
//     obj.GetImageHeight = function() { return parseInt(prompt( obj.id, "Cam.GetImageHeight(" )); }  
//     obj.GetCameraCount = function() { return parseInt(prompt( obj.id, "Cam.GetCameraCount(" )); } 
//     obj.SetPreviewImage = function( img ) { prompt( obj.id, "Cam.SetPreviewImage("+(img?img.id:null) ); } 
//     obj.SetDuplicateImage = function( img1,img2 ) { prompt( obj.id, "Cam.SetDuplicateImage(\f"+(img1?img1.id:null)+"\f"+(img2?img2.id:null) ); } 
//     obj.MotionMosaic = function( xtiles,ytiles,sensitivity,minPeriod,img ) { prompt( obj.id, "Cam.MotionMosaic("+xtiles+"\f"+ytiles+"\f"+sensitivity+"\f"+minPeriod+"\f"+(img?img.id:null) ); }
//     obj.ReportColors = function( list,callback,sampSize,maxRate ) { prompt( obj.id, "Cam.ReportColors(\f"+list+"\f"+(callback?callback.name:null)+"\f"+sampSize+"\f"+maxRate ); } 
//     obj.AutoCapture = function( path,file,maxCount ) { prompt( obj.id, "Cam.AutoCapture("+path+"\f"+file+"\f"+maxCount ); } 
//     obj.SetOnReady = function( callback ) { prompt( obj.id, "Cam.SetOnReady("+callback.name ); }
//     obj.SetOnMotion = function( callback ) { prompt( obj.id, "Cam.SetOnMotion("+callback.name ); }
//     obj.SetOnPicture = function( callback ) { prompt( obj.id, "Cam.SetOnPicture\f"+callback.name ); }
//     obj.SetOnFocus = function( callback ) { prompt( obj.id, "Cam.SetOnFocus\f"+callback.name ); } 
//     obj.GetPixelData = function( format,left,top,width,height ) { return prompt( obj.id, "Cam.GetPixelData(\f"+format+"\f"+left+"\f"+top+"\f"+width+"\f"+height ); } 
//     obj.FindFaces = function( max ) { return eval(prompt( obj.id, "Cam.FindFaces(\f"+max )); }
//     obj.GetParameters = function() { return prompt( obj.id, "Cam.GetParams(\f" ); }
//     obj.SetParameter = function( name,value ) { if( typeof value=="string" ) prompt( obj.id, "Cam.SetParam(\f"+name+"\f"+value ); else prompt( obj.id, "Cam.SetParamNum(\f"+name+"\f"+value ); }
//     return obj;   
// }

// function Vid( id )
// {
//     var obj = new Obj( id );  
//     obj.GetType = function() { return "VideoView"; }
//     obj.SetFile = function( file ) { prompt( obj.id, "Vid.SetFile("+file ); }    
//     obj.Play = function() { prompt( obj.id, "Vid.Play(" ); }
//     obj.Pause = function() { prompt( obj.id, "Vid.Pause(" ); }
//     obj.Stop = function() { prompt( obj.id, "Vid.Stop(" ); }   
//     obj.IsReady = function() { return prompt( obj.id, "Vid.IsReady(" )=="true"; }  
// 	obj.IsPlaying = function() { return prompt( obj.id, "Vid.IsPlaying(" )=="true"; } 
//     obj.SeekTo = function( secs ) { prompt( obj.id, "Vid.SeekTo("+secs ); }
//     obj.GetPosition = function() { return parseFloat(prompt( obj.id, "Vid.GetPosition(" )); }  
//     obj.GetDuration = function() { return parseFloat(prompt( obj.id, "Vid.GetDuration(" )); }  
//     obj.SetVolume = function( left,right ) { prompt( obj.id, "Vid.SetVolume(\f"+left+"\f"+right ); }
//     obj.SetOnReady = function( callback ) { prompt( obj.id, "Vid.SetOnReady("+callback.name ); } 
//     obj.SetOnComplete = function( callback ) { prompt( obj.id, "Vid.SetOnComplete("+callback.name ); }    
//     obj.SetOnError = function( callback ) { prompt( obj.id, "Vid.SetOnError("+callback.name ); }
//     return obj;   
// }

// function GLV( id )
// {
//     var obj = new Obj( id );  
//     obj.GetType = function() { return "GLView"; }
//     obj.Release = function() { prompt( obj.id, "GLV.Release(" ); _map[obj.id] = null; }
//     obj.Destroy = function() { prompt( obj.id, "GLV.Release(" ); _map[obj.id] = null; }
//     obj.Execute = function( p1,p2,p3,p4 ) { prompt( obj.id, "GLV.Execute(\f"+p1+"\f"+p2+"\f"+p3+"\f"+p4 ); } 
//     obj.Exec = function( p1,p2,p3,p4 ) { _gfx.Exec( p1,p2,p3,p4 ); }
//     obj.SetOnTouch = function( callback ) { prompt( obj.id, "GLV.SetOnTouch(\f"+callback.name ); } 
//     obj.SetOnTouchUp = function( callback ) { prompt( obj.id, "GLV.SetOnTouchUp(\f"+callback.name ); }  
//     obj.SetOnTouchMove = function( callback ) { prompt( obj.id, "GLV.SetOnTouchMove(\f"+callback.name ); }
//     obj.SetOnTouchDown = function( callback ) { prompt( obj.id, "GLV.SetOnTouchDown(\f"+callback.name ); } 
//     obj.SetTouchable = function( touchable ) { prompt( obj.id, "GLV.SetTouchable(\f"+touchable ); }
//     return obj;   
// }

// function WGL( id )
// {
//     var obj = new Obj( id );  
//     obj.GetType = function() { return "WebGLView"; }
//     obj.Release = function() { prompt( obj.id, "WGL.Release(" ); _map[obj.id] = null; }
//     obj.Destroy = function() { prompt( obj.id, "WGL.Release(" ); _map[obj.id] = null; }
//     obj.Execute = function( p1,p2,p3,p4 ) { prompt( obj.id, "WGL.Execute(\f"+p1+"\f"+p2+"\f"+p3+"\f"+p4 ); } 
//     obj.Exec = function( p1,p2,p3,p4 ) { _gfx.Exec( p1,p2,p3,p4 ); }
//     obj.SetOnTouch = function( callback ) { prompt( obj.id, "WGL.SetOnTouch(\f"+callback.name ); } 
//     obj.SetOnTouchUp = function( callback ) { prompt( obj.id, "WGL.SetOnTouchUp(\f"+callback.name ); }  
//     obj.SetOnTouchMove = function( callback ) { prompt( obj.id, "WGL.SetOnTouchMove(\f"+callback.name ); }
//     obj.SetOnTouchDown = function( callback ) { prompt( obj.id, "WGL.SetOnTouchDown(\f"+callback.name ); } 
//     obj.SetTouchable = function( touchable ) { prompt( obj.id, "WGL.SetTouchable(\f"+touchable ); }
//     return obj;   
// }

// function Nxt( id, nxtHelper )
// {
//     var obj = new SObj( id );  
//     var nxtHelp = nxtHelper;
//     obj.GetType = function() { return "NxtRemote"; }
//     obj.Connect = function( name ) { return prompt( obj.id, "Nxt.Connect("+name )=="true"; }
//     obj.SetOnConnect = function( callback ) { prompt( obj.id, "Nxt.SetOnConnect("+callback.name ); }
//     obj.SetOnConnectEx = function( callback ) { prompt( obj.id, "Nxt.SetOnConnect("+callback ); }
//     obj.Disconnect = function() { prompt( obj.id, "Nxt.Disconnect(" ); }
// 	obj.IsEnabled = function() { return prompt( obj.id, "Nxt.IsEnabled(" )=="true"; } 
// 	obj.IsBluetoothEnabled = function() { return prompt( obj.id, "Nxt.IsEnabled(" )=="true"; } 
// 	obj.RequestEnable = function() { prompt( obj.id, "Nxt.RequestEnable(" ); }
// 	obj.IsPaired = function( name ) { return prompt( obj.id, "Nxt.IsPaired("+name )=="true"; } 
//     obj.IsConnected = function() { return prompt( obj.id, "Nxt.IsConnected(" )=="true"; }  
//     obj.IsMotorIdle = function( motor ) { return prompt( obj.id, "Nxt.IsMotorIdle("+motor )=="true"; } 
//     obj.GetRotationCount = function( motor ) { return parseFloat(prompt( obj.id, "Nxt.GetRotationCount(\f"+motor )); } 
// 	obj.Beep = function( freq,dur ) { prompt( obj.id, "Nxt.Beep("+freq+"\f"+dur ); }
// 	obj.SetInvert = function( invert ) { prompt( obj.id, "Nxt.SetInvert("+invert ); }
// 	obj.Drive = function( motors,power,rotations,options ) { prompt( obj.id, "Nxt.Drive("+motors+"\f"+power+"\f"+rotations+"\f"+options ); }		
// 	obj.Brake = function( motors ) { prompt( obj.id, "Nxt.Brake("+motors ); }
// 	obj.Stop = function( motors ) { prompt( obj.id, "Nxt.Stop("+motors ); }
// 	obj.Reset = function( motors ) { prompt( obj.id, "Nxt.Reset(\f"+motors ); }
// 	obj.SendMail = function( mailbox,type,msg ) { prompt( obj.id, "Nxt.SendMail("+mailbox+"\f"+type+"\f"+msg ); }
// 	obj.ReadMail = function( mailbox,type,remove ) { var ret = prompt( obj.id, "Nxt.ReadMail("+mailbox+"\f"+type+"\f"+remove );  
// 		if(type.toLowerCase()=="number") return parseFloat(ret); else if(type.toLowerCase()=="logic") return (ret=="true"); else return ret; }
// 	obj.SetLampColor = function( input,clr ) { prompt( obj.id, "Nxt.SetLampColor("+input+"\f"+clr ); }	
// 	obj.PlaySoundFile = function( file,repeat ) { prompt( obj.id, "Nxt.PlaySoundFile("+file+"\f"+repeat ); }
// 	obj.ReadSoundSensor = function( input,mode ) { return parseInt(prompt( obj.id, "Nxt.ReadSoundSensor("+input+"\f"+mode )); }
// 	obj.ReadColorSensor = function( input,mode ) { return parseInt(prompt( obj.id, "Nxt.ReadColorSensor("+input+"\f"+mode )); }
// 	obj.ToColorName = function( val ) { return prompt( obj.id, "Nxt.ToColorName("+val ); } 	
// 	obj.ReadLightSensor = function( input,active ) { return parseInt(prompt( obj.id, "Nxt.ReadLightSensor("+input+"\f"+active )); }	
// 	obj.ReadTouchSensor = function( input ) { return prompt( obj.id, "Nxt.ReadTouchSensor("+input )=="1"; }		
// 	obj.ReadDistanceSensor = function( input ) { return parseInt(prompt( obj.id, "Nxt.ReadDistanceSensor("+input )); }			
// 	obj.GetCurrentProgram = function() { return prompt( obj.id, "Nxt.GetCurrentProgram(" ); }
// 	obj.StartProgram = function( name ) { prompt( obj.id, "Nxt.StartProgram("+name ); }
// 	obj.StopProgram = function() { prompt( obj.id, "Nxt.StopProgram(" ); }
// 	obj.FileFindFirst = function( pattern ) { if( _inf ) _inf.Release(); var ret = prompt( obj.id, "Nxt.FileFindFirst("+pattern ); if( ret ) _inf = new Inf(ret); else _inf = null; return _inf; }
// 	obj.FileFindNext = function( handle ) { if( _inf ) _inf.Release(); var ret = prompt( obj.id, "Nxt.FileFindNext("+handle ); if( ret ) _inf = new Inf(ret); else _inf = null; return _inf; }
	
// 	//Helper functions.
// 	obj.ShowDevices = function() { nxtHelp.nxt_ShowDevices(); }
// 	obj.CheckConnection = function() { return nxtHelp.nxt_CheckConnection(); }
// 	obj.SetOnConnected = function( callback ) { nxtHelp.nxt_OnConnected = callback; }
// 	obj.GetBtName = function() { return nxtHelp.nxtName; }
// 	obj.GetBtAddress = function() { return nxtHelp.nxtAddress; }
// 	return obj;
// }

// function Bts( id )
// {
//     var obj = new SObj( id ); 
//     obj.GetType = function() { return "BluetoothSerial"; } 
//     obj.Connect = function( name,channel ) { return prompt( obj.id, "Bts.Connect("+name+"\f"+channel )=="true"; }
//     obj.SetOnConnect = function( callback ) { prompt( obj.id, "Bts.SetOnConnect("+callback.name ); }
//     obj.Disconnect = function() { prompt( obj.id, "Bts.Disconnect(" ); }
// 	obj.IsBluetoothEnabled = function() { return prompt( obj.id, "Bts.IsEnabled(" )=="true"; } 
// 	obj.RequestEnable = function() { prompt( obj.id, "Bts.RequestEnable(" ); }
// 	obj.IsPaired = function( name ) { return prompt( obj.id, "Bts.IsPaired("+name )=="true"; } 
//     obj.IsConnected = function() { return prompt( obj.id, "Bts.IsConnected(" )=="true"; }  
//     obj.Write = function( data ) { prompt( obj.id, "Bts.Write("+data ); }
//     obj.SetOnReceive = function( callback ) { prompt( obj.id, "Bts.SetOnReceive("+callback.name ); }   
//     obj.SetSplitMode = function( mode,p2,p3 ) { prompt( obj.id, "Bts.SetSplitMode("+mode+"\f"+p2+"\f"+p3 ); } 
//     obj.SetTimeout = function( ms ) { prompt( obj.id, "Bts.SetTimeout("+ms ); } 
//     obj.Clear = function() { prompt( obj.id, "Bts.Clear("); }
// 	return obj;
// }

// function Zip( id )
// {
//     var obj = new SObj( id );  
//     obj.GetType = function() { return "ZipUtil"; }
//     obj.Open = function( file ) { prompt( obj.id, "Zip.Open(\f"+file ); }   
//     obj.Create = function( file ) { prompt( obj.id, "Zip.Create(\f"+file ); } 
//     obj.Close = function() { prompt( obj.id, "Zip.Close(" ); } 
//     obj.List = function( path ) { return prompt( obj.id, "Zip.List(\f"+path ); }  
//     obj.Extract = function( name,file ) { prompt( obj.id, "Zip.Extract(\f"+name+"\f"+file ); } 
//     obj.AddFile = function( name,file ) { prompt( obj.id, "Zip.AddFile(\f"+name+"\f"+file ); }  
//     obj.AddText = function( name,text ) { prompt( obj.id, "Zip.AddText(\f"+name+"\f"+text ); } 
//     obj.CreateKey = function( file,pass,name,org ) { prompt( obj.id, "Zip.CreateKey(\f"+file+"\f"+pass+"\f"+name+"\f"+org ); }
//     obj.CreateDebugKey = function( file ) { prompt( obj.id, "Zip.CreateDebugKey(\f"+file ); }
//     obj.Sign = function( fileIn,fileOut,keyStore,pass ) { return prompt( obj.id, "Zip.Sign(\f"+fileIn+"\f"+fileOut+"\f"+keyStore+"\f"+pass )=="true"; } 
//     obj.UpdateManifest = function( fileIn, fileOut, packageName, appName, permissions, options ) { prompt( obj.id, "Zip.UpdateManifest(\f"+fileIn+"\f"+fileOut+"\f"+packageName+"\f"+appName+"\f"+permissions+"\f"+options ); } 
// 	return obj;
// }

// function Not( id )
// {
//     var obj = new SObj( id );  
//     obj.GetType = function() { return "Notification"; }
//     obj.SetMessage = function( ticker,title,text ) { prompt( obj.id, "Not.SetMessage(\f"+ticker+"\f"+title+"\f"+text ); }
//     obj.Notify = function( id ) { prompt( obj.id, "Not.Notify(\f"+id ); }   
//     obj.Cancel = function( id ) { prompt( obj.id, "Not.Cancel(\f"+id ); }  
//     obj.SetLargeImage = function( image ) { if( image.id ) prompt( obj.id, "Not.SetLargeImage(\f"+(image?image.id:null) ); 
// 		else prompt( obj.id, "Not.SetLargeImageFile(\f"+image ); }  
//     obj.SetLights = function( color,onMs,offMs ) { prompt( obj.id, "Not.SetLights(\f"+color+"\f"+onMs+"\f"+offMs ); } 
//     return obj;
// }

// function Crp( id )
// {
//     var obj = new SObj( id );  
//     obj.GetType = function() { return "Crypt"; }
//     obj.Hash = function( text,mode,options ) { return prompt( obj.id, "Crp.Hash\f"+text+"\f"+mode+"\f"+options ); }
//     obj.Encrypt = function( text,password ) { return prompt( obj.id, "Crp.Encrypt\f"+text+"\f"+password ); }   
//     obj.Decrypt = function( text,password ) { return prompt( obj.id, "Crp.Decrypt\f"+text+"\f"+password ); } 
//    	return obj;
// }

// function Spr( id )
// {
//     var obj = new SObj( id );  
//     obj.GetType = function() { return "SpeechRec"; }
//     obj.Recognize = function() { return prompt( obj.id, "Spr.Recognize(" ); }
//     obj.Stop = function() { prompt( obj.id, "Spr.Stop(" ); }
//     obj.Cancel = function() { prompt( obj.id, "Spr.Cancel(" ); }
//     obj.GetRMS = function() { return parseFloat(prompt( obj.id, "Spr.GetRMS(" )); }
//     obj.IsListening = function() { return prompt( obj.id, "Spr.IsListening(")=="true"; }
//     obj.SetOnReady = function( callback ) { prompt( obj.id, "Spr.SetOnReady(\f"+callback.name ); } 
//     obj.SetOnResult = function( callback ) { prompt( obj.id, "Spr.SetOnResult(\f"+callback.name ); } 
//     obj.SetOnError = function( callback ) { prompt( obj.id, "Spr.SetOnError(\f"+callback.name ); } 
//    	return obj;
// }

// function Inf( id )
// {
// 	var obj = new SObj( id ); 
// 	obj.GetType = function() { return "NxtInfo"; }
// 	obj.GetName = function() { return prompt( obj.id, "Inf.GetName(" ); }
// 	obj.GetHandle = function() { return parseInt( prompt( obj.id, "Inf.GetHandle(" )); }
// 	obj.GetSize = function() { return parseInt( prompt( obj.id, "Inf.GetSize(" )); }
// 	return obj;
// }

// function SMS( id )
// {
//     var obj = new SObj( id ); 
//     obj.GetType = function() { return "SMS"; }
// 	obj.Send = function( number,msg,options ) { prompt( obj.id, "SMS.Send(\f"+number+"\f"+msg+"\f"+options ); }	
// 	obj.SetOnStatus = function( callback ) { prompt( obj.id, "SMS.SetOnStatus("+callback.name ); }
// 	obj.SetOnMessage = function( callback ) { prompt( obj.id, "SMS.SetOnMessage("+callback.name ); }
// 	return obj;
// }

// function EMAIL( id )
// {
//     var obj = new SObj( id ); 
//     obj.GetType = function() { return "Email"; }
//     obj.SetSMTP = function( server,port ) { prompt( obj.id, "EML.SetSMTP("+server+"\f"+port ); }
//     obj.SetIMAP = function( server,port ) { prompt( obj.id, "EML.SetIMAP("+server+"\f"+port ); }
// 	obj.Send = function( subject,body,sender,recipients,attach ) { prompt( obj.id, "EML.Send(\f"+subject+"\f"+body+"\f"+sender+"\f"+recipients+"\f"+attach ); }
// 	obj.Receive = function( folder,maxCount,filter ) { prompt( obj.id, "EML.Receive("+folder+"\f"+maxCount+"\f"+filter ); }	
// 	obj.SetOnStatus = function( callback ) { prompt( obj.id, "EML.SetOnStatus("+callback.name ); }
// 	obj.SetOnMessage = function( callback ) { prompt( obj.id, "EML.SetOnMessage("+callback.name ); }
// 	return obj;
// }

// function Wbs( id )
// {
// 	var obj = new SObj( id );
// 	obj.GetType = function() { return "WebServer"; }
// 	obj.SetFolder = function( folder ) { prompt( obj.id, "Wbs.SetFolder(\f"+folder ); }
// 	obj.SetUploadFolder = function( folder ) { prompt( obj.id, "Wbs.SetUploadFolder(\f"+folder ); }
//     obj.Start = function() { prompt( obj.id, "Wbs.Start(" ); }
//     obj.SetResponse = function( text ) { prompt( obj.id, "Wbs.SetResponse("+text ); }
//     obj.AddRedirect = function( pattern,location ) { prompt( obj.id, "Wbs.AddRedirect(\f"+pattern+"\f"+location ); }
//     obj.AddServlet = function( path,callback ) { prompt( obj.id, "Wbs.AddServlet("+path+"\f"+callback.name ); }
//     obj.SendText = function( txt, ip ) { prompt( obj.id, "Wbs.SendText(\f"+txt+"\f"+ip ); }
//     obj.GetWebSockClients = function() { return eval(prompt( obj.id, "Wbs.GetWebSockClients(" )); }
//     obj.SetOnReceive = function( callback ) { prompt( obj.id, "Wbs.SetOnReceive(\f"+callback.name ); }  
//     return obj;
// }

// function Usb( id )
// {
// 	var obj = new SObj( id );
// 	obj.GetType = function() { return "USBSerial"; }
//     obj.Start = function() { prompt( obj.id, "Usb.Start(" ); }
//     obj.Stop = function() { prompt( obj.id, "Usb.Stop(" ); }
//     obj.Write = function( txt,mode ) { prompt( obj.id, "Usb.Write(\f"+txt+"\f"+mode ); }
//     obj.SetOnReceive = function( callback ) { prompt( obj.id, "Usb.SetOnReceive("+callback.name ); }  
//     obj.SetDTR = function( onOff ) { prompt( obj.id, "Usb.SetDTR(\f"+onOff ); } 
//     obj.SetRTS = function( onOff ) { prompt( obj.id, "Usb.SetRTS(\f"+onOff ); }   
//     obj.SetMaxRead = function( bytes ) { prompt( obj.id, "Usb.SetMaxRead(\f"+bytes ); }   
//     obj.SetTimeout = function( ms ) { prompt( obj.id, "Usb.SetTimeout(\f"+ms ); }   
//     obj.IsConnected = function() { return prompt( obj.id, "Usb.IsConnected(" )=="true"; }      
//     return obj;
// }

// function Sys( id )
// {
// 	var obj = new SObj( id );
// 	obj.GetType = function() { return "SysProc"; }
//     obj.Out = function( cmd ) { prompt( obj.id, "Sys.Out(\f"+cmd ); }
//     obj.ReadFileAsByte = function( file ) { return parseInt(prompt( obj.id, "Sys.ReadFileAsByte(\f"+file )); }
//     obj.WriteToFile = function( file,data ) { prompt( obj.id, "Sys.WriteToFile(\f"+file+"\f"+data ); }
//     return obj;
// }

// function Fil( id )
// {
// 	var obj = new SObj( id ); 
// 	obj.GetType = function() { return "File"; }
//     obj.Close = function() { prompt( obj.id, "Fil.Close(" ); }
//     obj.ReadText = function( type ) { return prompt( obj.id, "Fil.ReadText(\f"+type ); }
//     obj.WriteText = function( data,type ) { prompt( obj.id, "Fil.WriteText(\f"+data+"\f"+type ); }
//     obj.ReadNumber = function( type ) { return parseFloat(prompt( obj.id, "Fil.ReadNumber(\f"+type )); }
//     obj.WriteNumber = function( data,type ) { prompt( obj.id, "Fil.WriteNumber(\f"+data+"\f"+type ); }
//     obj.ReadData = function( len,mode ) { return eval(prompt( obj.id, "Fil.ReadData(\f"+len+"\f"+mode )); }
//     obj.WriteData = function( data,mode ) { prompt( obj.id, "Fil.WriteData(\f"+data+"\f"+mode ); }
//     obj.Seek = function( offset ) { prompt( obj.id, "Fil.Seek(\f"+offset ); }
//     obj.Skip = function( bytes ) { prompt( obj.id, "Fil.Skip(\f"+bytes ); }
//     obj.GetPointer = function() { return parseInt(prompt( obj.id, "Fil.GetPointer(" )); }
//     obj.GetLength = function() { return parseInt(prompt( obj.id, "Fil.GetLength(" )); }
//     obj.SetLength = function( len ) { prompt( obj.id, "Fil.SetLength(\f"+len ); }
// 	return obj;
// }

// function Plg( id )
// {
// 	var obj = new SObj( id );
// 	obj.GetType = function() { return "Plugin"; }
//     obj.Send = function( cmd,p1,p2,p3,p4,p5,p6,p7,p8 ) {
// 		return prompt( obj.id, "Plg.Send\f"+cmd+"\f"+typeof p1+"\f"+p1+"\f"+typeof p2+"\f"+p2+"\f"+typeof p3+"\f"+p3+"\f"+typeof p4+"\f"+p4+"\f"+typeof p5+"\f"+p5+"\f"+typeof p6+"\f"+p6+"\f"+typeof p7+"\f"+p7+"\f"+typeof p8+"\f"+p8 ); 
// 	}
// 	obj.SendObj = function( cmd,ob,p1,p2,p3,p4,p5,p6,p7,p8 ) { 
// 		return prompt( obj.id, "Plg.SendObj\f"+cmd+"\f"+(ob?ob.id:null)+"\f"+typeof p1+"\f"+p1+"\f"+typeof p2+"\f"+p2+"\f"+typeof p3+"\f"+p3+"\f"+typeof p4+"\f"+p4+"\f"+typeof p5+"\f"+p5+"\f"+typeof p6+"\f"+p6+"\f"+typeof p7+"\f"+p7+"\f"+typeof p8+"\f"+p8 ); 
// 	}
// 	obj.CreateObj = function( type,p1,p2,p3,p4,p5,p6,p7,p8 ) {
// 		return prompt( obj.id, "Plg.CreateObj\f"+type+"\f"+typeof p1+"\f"+p1+"\f"+typeof p2+"\f"+p2+"\f"+typeof p3+"\f"+p3+"\f"+typeof p4+"\f"+p4+"\f"+typeof p5+"\f"+p5+"\f"+typeof p6+"\f"+p6+"\f"+typeof p7+"\f"+p7+"\f"+typeof p8+"\f"+p8 ); 
// 	}
// 	obj.SendImg = function( cmd,img,width,height ) { return prompt( obj.id, "Plg.SendImg\f"+cmd+"\f"+(img?img.id:null)+"\f"+width+"\f"+height ); }
//     obj.SendCam = function( cmd,cam ) { return prompt(obj.id, "Plg.SendCam\f"+cmd+"\f"+(cam?cam.id:null) ); }
//     return obj;
// }

// function Svc( id )
// {
// 	var obj = new SObj( id );
// 	obj.GetType = function() { return "Service"; }
// 	obj.Stop = function() { prompt( obj.id, "Svc.Stop(" ); }
//     obj.Send = function( cmd,p1,p2,p3,p4,p5,p6,p7 ) { 
// 		prompt( obj.id, "Svc.Send(\f"+cmd+"\f"+typeof p1+"\f"+p1+"\f"+typeof p2+"\f"+p2+"\f"+typeof p3+"\f"+p3+"\f"+typeof p4+"\f"+p4+"\f"+typeof p5+"\f"+p5+"\f"+typeof p6+"\f"+p6+"\f"+typeof p7+"\f"+p7 ); 
// 	}
// 	obj.SendImg = function( cmd,img ) { prompt( obj.id, "Svc.SendImg(\f"+cmd+"\f"+(img?img.id:null) ); }
// 	obj.SendMessage = function( msg ) { prompt( obj.id, "Svc.SendMsg(\f"+msg ); }
// 	obj.SetOnMessage = function( callback ) { prompt( obj.id, "Svc.SetOnMessage(\f"+callback.name ); }
//     return obj;
// }

// function Syn( id )
// {
// 	var obj = new SObj( id );
// 	obj.GetType = function() { return "Synth"; }
//     obj.Start = function() { prompt( this.id, "Syn.Start(" ); }
//     obj.Stop = function() { prompt( this.id, "Syn.Stop(" ); }
//     obj.PlayTone = function( freq,dur) { prompt( this.id, "Syn.PlayTone("+freq+"\f"+dur ); }
//     obj.PlayNote = function( note ) { prompt( this.id, "Syn.PlayNote("+note ); }
//     obj.PlayMidiTune = function( tune ) { prompt( this.id, "Syn.PlayMidiTune("+tune ); }
//     obj.SetFrequency = function( freq ) { prompt( this.id, "Syn.SetFrequency("+freq ); }
//     obj.SetWaveShape = function( shape ) { prompt( this.id, "Syn.SetWaveShape("+shape ); }
//     obj.SetVolume = function( left,right ) { prompt( this.id, "Syn.SetVolume("+left+"\f"+right ); }
//     obj.SetNoteLength = function( dur ) { prompt( this.id, "Syn.SetNoteLength("+dur ); }
    
//     obj.SetVca = function( attack,decay,sustain,release ) { prompt( this.id, "Syn.SetVca\f"+attack+"\f"+decay+"\f"+sustain+"\f"+release ); }
//     obj.SetVcaAttack = function( attack ) { prompt( this.id, "Syn.SetVcaAttack("+attack ); }
//     obj.SetVcaDecay = function( decay ) { prompt( this.id, "Syn.SetVcaDecay("+decay ); }
//     obj.SetVcaSustain = function( sustain ) { prompt( this.id, "Syn.SetVcaSustain("+sustain ); }
//     obj.SetVcaRelease = function( release ) { prompt( this.id, "Syn.SetVcaRelease("+release ); }
//     obj.SetVcaEnabled = function( enable ) { prompt( this.id, "Syn.SetVcaEnabled("+enable ); }
    
//     obj.SetVcf = function( attack,decay,sustain,release,cuttoff,resonance,depth ) { prompt( this.id, "Syn.SetVcf\f"+attack+"\f"+decay+"\f"+sustain+"\f"+release+"\f"+cuttoff+"\f"+resonance+"\f"+depth ); }
//     obj.SetVcfAttack = function( attack ) { prompt( this.id, "Syn.SetVcfAttack("+attack ); }
//     obj.SetVcfDecay = function( decay ) { prompt( this.id, "Syn.SetVcfDecay("+decay ); }
//     obj.SetVcfSustain = function( sustain ) { prompt( this.id, "Syn.SetVcfSustain("+sustain ); }
//     obj.SetVcfRelease = function( release ) { prompt( this.id, "Syn.SetVcfRelease("+release ); }
//     obj.SetVcfCutoff = function( cuttoff ) { prompt( this.id, "Syn.SetVcfCutoff("+cuttoff ); }
//     obj.SetVcfResonance = function( resonance ) { prompt( this.id, "Syn.SetVcfResonance("+resonance ); }
//     obj.SetVcfDepth = function( depth ) { prompt( this.id, "Syn.SetVcfDepth("+depth ); }
//     obj.SetVcfEnabled = function( enable ) { prompt( this.id, "Syn.SetVcfEnabled("+enable ); }
    
//     obj.SetPhaser = function( drywet,rate,range,feedback ) { prompt( this.id, "Syn.SetPhaser\f"+drywet+"\f"+rate+"\f"+range+"\f"+feedback ); }
//     obj.SetPhaserDryWet = function( drywet ) { prompt( this.id, "Syn.SetPhaserDryWet("+drywet ); }
//     obj.SetPhaserRate = function( rate ) { prompt( this.id, "Syn.SetPhaserRate("+rate ); }
//     obj.SetPhaserRange = function( range ) { prompt( this.id, "Syn.SetPhaserRange("+range ); }
//     obj.SetPhaserFeedback = function( feedback ) { prompt( this.id, "Syn.SetPhaserFeedback("+feedback ); }
//     obj.SetPhaserEnabled = function( enable ) { prompt( this.id, "Syn.SetPhaserEnabled("+enable ); }
    
//     obj.SetDelay = function( ms ) { prompt( this.id, "Syn.SetDelay("+ms ); }
//     obj.SetFeedback = function( feedback ) { prompt( this.id, "Syn.SetFeedback("+feedback ); }
//     obj.SetDelayEnabled = function( enable ) { prompt( this.id, "Syn.SetDelayEnabled("+enable ); }
//     return obj;
// }

function Pnl( impl )
{
	var obj = new SObj( impl );
	obj.GetType = function() { return "Panel"; }
    obj.Show = function(animate) { this.impl.Show(animate); }
    obj.Hide = function(animate) { this.impl.Hide(animate); }
    obj.Toggle = function(animate) { this.impl.Toggle(animate); }
    obj.GetLayout = function() { 
    	if(!this.lay)
    	{
    		this.lay = app.CreateLayout("Vertical", "FillXY");
    		this.impl.AddLayout(this.lay.impl);
    	}
    	return this.lay; 
    }
	obj.SetBackColor = function( clr ) { this.impl.SetBackColor(clr); }  
    return obj;
}

function Bar( impl )
{
	var obj = new SObj( impl );
	obj.GetType = function() { return "ActionBar"; }
    obj.Show = function() { this.impl.Show(); }
    obj.Hide = function() { this.impl.Hide(); }
    obj.SetOnTouch = function(callback) { this.impl.SetOnTouch(callback); }
	obj.SetTitle = function( title ) { this.impl.SetTitle(title); }
	obj.ShowButton = function( id, callback, tip, options, state ) { this.impl.ShowButton( id, callback, tip, options, state ); }
	obj.HideButton = function( id ) { this.impl.HideButton( id ); }
	obj.ShowSearch = function( callback ) { this.impl.ShowSearch(callback); }
	obj.HideSearch = function() { this.impl.HideSearch(); }
	obj.ShowFlags = function( callback ) { this.impl.ShowFlags(callback); }
	obj.HideFlags = function() { this.impl.HideFlags(); }
    return obj;
}

function Map( impl )
{
	var obj = new Obj( impl );
	obj.GetType = function() { return "Map"; }
	obj.SetCenter = function(latitude, longitude) { this.impl.SetCenter(latitude, longitude); }
	obj.GetUserLocation = function( callback ) { return this.impl.GetUserLocation( callback ); }
	obj.SetZoom = function(zoom) { this.impl.SetZoom(zoom); }
	obj.AddMarker = function(title, id, latitude, longitude, options) { this.impl.AddMarker(title, id, latitude, longitude, options); }
	obj.SetOnTouchMarker = function(callback) { this.impl.SetOnTouchMarker(callback); }
	obj.SetSearchTextEdit = function(txe) { this.impl.SetSearchTextEdit(txe.impl); }
	obj.DrawPoly = function( points, strokeColor, fillColor, strokeOpacity, fillOpacity, strokeWeight ) { this.impl.DrawPoly(points, strokeColor, fillColor, strokeOpacity, fillOpacity, strokeWeight); }
	obj.IsLocationVisible = function( lat, lng ) { return this.impl.IsLocationVisible( lat, lng ); }
	
    return obj;
}

// function _Call( id, func, params ) { 
// 	func.apply( _map[id], params );
// }

// function _Cb( obj, func ) {
//     return new _ObjCb(obj, func);
// }

// function _ObjCb( obj, func ) {
//     _cbMap[++_cbId] = obj; 
//     this.name = "_cbMap['"+_cbId+"']."+func;
// }

// function _CreateCP( service ) { 
// 	return prompt( "#", "_CreateCP(\f"+service ); 
// }

// function _ExecCP( callbackId,service,action,argsJson ) { 
// 	return prompt( "#", "_ExecCP(\f"+callbackId+"\f"+service+"\f"+action+"\f"+argsJson ); 
// }

// function _LoadScript( url, callback )
// {
//     if( _scripts[url] ) { 
// 		if( callback ) callback(); return; 
// 	}
//     var head = document.getElementsByTagName('head')[0];
//     var script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src = url;
//     script.onload = callback;
//     head.appendChild(script);
//     _scripts[url] = true;
// }

// function _LoadScriptSync( url )
// {
//     if( _scripts[url] ) return; 
//     var head = document.getElementsByTagName('head')[0];
//     var script = document.createElement('script');
//     script.type = 'text/javascript';
//     app.SetDebugEnabled( false );
//     script.text = app.ReadFile( url ); 
//     app.SetDebugEnabled( true );
//     head.appendChild(script);
//     _scripts[url] = true;
// }

// function _LoadPlugin( name )
// {
//     if( !name ) return;
//     //name = name.substr( name.lastIndexOf("/")+1 );
//     //_LoadScript( "../Plugins/"+name+"/"+name+".inc" );
//     var privDir = app.GetPrivateFolder( "Plugins" );
//     _LoadScriptSync( privDir+"/"+name.toLowerCase()+"/"+name+".inc" );
// }

// function _CreatePlugin( name, options ) 
// { 
// 	var ret = prompt( "#", "App.CreatePlugin("+name+"\f"+options ); 
// 	if( ret ) return new Plg(ret); 
// 	else throw "Failed to create plugin:" + name; 
// }	

// function _Run(s) 
// { 
//     if( _busy ) { setTimeout( function(){_Run(s)},0); return; }
// 	_busy = true; eval( s ); _busy = false;
// }

// function _SafeRun(s)
// {
// 	if( _busy ) { setTimeout( function(){_SafeRun(s)},0); return; }
// 	try { _busy = true; eval( s ); _busy = false; }
// 	catch(e) {}
// }

// function OnCreate(extract,debug) 
// {       
// 	if( typeof _CheckFolderName=='function' ) _CheckFolderName();
// 	if( extract ) app._Extract( true );
// 	else if(typeof OnStart=='function') { OnStart(); prompt("#","_Start"); }
// 	if( debug ) app.CreateDebug();
// }

// app = new App();

// function _Log( msg ) { app.Debug( msg ); }
// function _Err( msg ) { app.Debug( "ERROR: " + msg ); }
// function _AddPermissions() {}
// function _RemovePermissions() {}
// function _AddOptions() {}
    
// if( !_docs ) prompt( "#", "_Init" );


// Initialise the App instance
// _getGUIImpl() should be implemented in the JQueryMobile/JQueryUI/Etc library
var app = new App( _getGUIImpl() );