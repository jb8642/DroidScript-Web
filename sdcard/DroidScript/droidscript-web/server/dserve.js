#!/usr/bin/env node
/* dserve: DroidScript-web http server
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


const _MAXAGE=1; // (in seconds).  Set small when testing //3600*24*7; // 7 days: 604800; // If-modified-since may be used if older than this
const _ALLOWGZIP=true;
const _ALLOWDEFL=true;

exports.httpserv = httpserv;

//const colorsafe = require('colors/safe');
//const crypto = require('crypto'); // sha256 (sessions)
//const Fiber = require('fibers'); // Threading
//const ffs = require('./fiberfill'); // Replacements for fs blocking functions, using Fibers
const fsp = require('path'); // path join
const fs = require('fs'); // createReadStream
const qs = require('querystring');
const zlib = require('zlib');
const os = require('os');

const _blacklist=["/dstart","/LICENSE","/README.md","/updev.sh","/todo.txt","/sdcard/DroidScript/droidscript-web"]; // Ban app write access and don't list in directory
const _CPU0=os.cpus()[0]
// _SERVER e.g. 'DroidScript-Web on 700Mhz ARMv6-compatible processor rev 7 (v6l)'
const _SERVER='DroidScript-Web on '+_CPU0.speed+'Mhz '+_CPU0.model;

var AppRoot=fsp.dirname(fsp.dirname(fsp.dirname(fsp.dirname(fsp.dirname(process.argv[1])))));
var DSub=fsp.join("sdcard", "DroidScript");
var WebRoot=fsp.join(AppRoot, DSub, "droidscript-web", "html");
var LocalNet='',LocalIP='';
var options={
    port:8081,
    sport:8444,
    username:{admin:'admin'},
    password:{admin:'changeme'}, // FIXME: Usernames/passwords should be stored in a separate database, or better yet, rely on Google/OAuth
    realm:{admin:'WiFi Administration'}
};

httpserv(options);

function httpserv(options) {
    process.on('message', handleMessage);
    const server = require('http').createServer(httpHandler);
    var ips=getIPAddresses();
    for(var xa=0; xa<ips.length; xa++) {
        if(ips[xa].indexOf('192.') === 0 || ips[xa].indexOf('10.') === 0) {
            LocalIP=ips[xa];
            var xx=LocalIP.lastIndexOf('.');
            LocalNet=LocalIP.substr(0,xx+1);
            break;
        }
    }
    var serr=null;
    try {
        // options.passphrase = '';
        options.key  = fs.readFileSync('ssl/cert.key');
        options.cert = fs.readFileSync('ssl/cert.pem');
        options.ca   = fs.readFileSync('ssl/ca.pem');
        const httpsServer = require('https').createServer(options, httpsHandler);
        httpsServer.listen(options.sport);
    }
    catch(e) {
        options.key=options.cert=options.ca=null;
        serr=e.message;
    }
    server.listen(options.port, function() {
        console.info("DroidScript server is listening on "+ips.join(";")+" port "+options.port+ 
            (!serr ? " and HTTPS port "+options.sport : ".  HTTPS disabled ("+serr+")")); 
        console.info("AppRoot: "+AppRoot);
    });
    wsserv(server);
}

function handleMessage(msg) {
    if (msg === 'shutdown') { // initiate graceful close of any connections to server
	process.exit();
    }
    console.out('handleMessage',msg);
}

function getIPAddresses() {
    const ifaces = require('os').networkInterfaces();
    var addrs=[];
    Object.keys(ifaces).forEach(function (ifname) {
	ifaces[ifname].forEach(function (iface) {
	    // skip internal (i.e. 127.0.0.1) and non-ipv4 addresses
	    if ('IPv4' !== iface.family || iface.internal !== false) { return; }
	    addrs.push(iface.address);
	});
    });
    return addrs;
}

function serveTemplateFile(filePath, request, response, cookies, code, t /*emplate*/) {
    if(!code) { code=200; }
    fs.stat(filePath, (err, stats) => {
        var isFile=err ? false : stats.isFile();
        if(!isFile && stats && stats.isDirectory()) { filePath = fsp.join(filePath, "index.html"); isFile=true; }
        if(err || !isFile) {
            var webPath=filePath.substr(AppRoot.length);
            out(request, '=> 404 to '+adr(request)+'\n                    '+err);
            dologs(request);
            return respond(1,response, cookies, 404, null, null, "<html><head><title>Not found: "+webPath+"</title></head>"+
                '<body><a href="/" style="background:white; color:black; display:;" id="indexLink">&lt;Index</a>'+
                "<h1>Not found: "+webPath+"</h1></body></html>");
        }
        try {
            //fs.accessSync(filePath, fs.R_OK); 
            response.on('error', function(err) { response.end(); });
            var stat = fs.statSync(filePath);
            var ctype=getContentType(filePath);
            var clen=t ? 0 : stat.size;
            var lastModified=(t ? 0 : Math.max(stat.mtime.getTime(), stat.ctime.getTime()));
            var ifMod=request.headers['if-modified-since'];
            if(ifMod) {
                ifMod=new Date(ifMod).getTime();
                lastModified=parseInt(lastModified/1000)*1000; // Discard millisecond resolution to match
                if(lastModified <= ifMod) { code=304; clen=0; } // Not modified since browser fetched
                else { console.log("LMOD "+new Date(lastModified)+" "+lastModified+" > "+ifMod+" "+request.headers['if-modified-since']+" FOR "+filePath); }
            }
            var acceptEncoding = request.headers['accept-encoding'];

            // function respond(at,response, cookies, code, contentType, contentLen, content, redirect, acceptEncoding)
            var heads=respond(2,response, cookies, code, ctype, clen, null, // content 
                             (code === 301 || code === 302) && t && t.url ? t.url : null, // redirect
                             lastModified, acceptEncoding); // lastModified for caching (zero means no cache)

            if(code === 304 || request.method === 'HEAD') {
                outln(request, "("+ctype+") => "+code+" to "+adr(request));
                dologs(request);
                response.end();
                return true;
            }
            
            var rs=fs.createReadStream(filePath);
            if(t) {
                const Transform = require('stream').Transform;
                var parser = new Transform();
                parser._transform = function(data, encoding, done) {
                    try {
                        this.push(TemplateEngine(data, t));
                        done();
                    }
                    catch(e) { console.error('ERR in: '+filePath+"; e="+e.stack+" to "+adr(request)); }
                };
                out(request, "("+ctype+") => "+code+" To "+adr(request));
                pipeCompress(heads, rs.pipe(parser), request, response); // End automatically
            }
            else { 
                out(request, "("+ctype+") => "+code+" tO "+adr(request));
                pipeCompress(heads, rs, request, response);  // End automatically
            }
        }
        catch(e) { console.error('ERR in: '+filePath+"; e="+e.stack+" to "+adr(request)); }
        return;
    });
}

function pipeCompress(heads, rs, request, response) {
    if (heads['content-encoding'] === 'deflate') {
        outln(request, " DEFL"); dologs(request); 
        rs.pipe(zlib.createDeflate()).pipe(response); 
    }
    else if (heads['content-encoding'] === 'gzip')    { 
        outln(request, " GZIP"); dologs(request); 
        rs.pipe(zlib.createGzip()).pipe(response);
    }
    else { 
        outln(response,""); dologs(request); 
        rs.pipe(response); 
    }
}

function serveRegularFile(filePath, request, response, cookies, code) {
    serveTemplateFile(filePath, request, response, cookies, code);
}

function TemplateEngine(html, options) { // NOTE: Below, replace newlines with <@NL@> to avoid it being interpreted during substitution
    html=html.toString().replace(/\\n/g,'<&NL&>'); // NOTE: Replace un-interpreted newlines so they don't get interpreted during substitution
	var re = /<%(.+?)%>/g, 
		reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g, 
		code = 'with(obj) { var r=[];\n', 
		cursor = 0, result,	match;
	var add = function(line, js) {
		js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
			(code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"').replace(/[\r\n]/g, '<@NL@>') + '");\n' : '');
		return add;
	}
	while(match = re.exec(html)) {
		add(html.slice(cursor, match.index))(match[1], true);
		cursor = match.index + match[0].length;
	}
	html=html.substr(cursor, html.length - cursor);
    //console.log("HTML: "+html);
	add(html);
	code = (code + 'return r.join(""); }'); //.replace(/[\r\n]/g, '\\n').replace(/[\t]/g, ' ') //.replace(/[\r\t\n]/g, ' ');
	try { result = new Function('obj', code).apply(options, [options]); }
	catch(err) { console.error("'" + err.message + "'", " in \n\nCode:\n", code, "\n"); }
	return result.replace(/<@NL@>/g,'\n').replace(/<&NL&>/g,'\\n');
}

function adr(request) {
    var proxyAdr=request.headers['x-forwarded-for'];
    return proxyAdr ? proxyAdr : request.connection.remoteAddress.replace(/::ffff:/,'');
}

function httpsHandler(request, response) {
    httpHandler(request, response, true); // Already HTTPS
}

function authenticateResponse(response, app) {
  response.writeHead(401, {'WWW-Authenticate' : 'Basic realm="' + options.realm[app] + '"'});
  var content='<h1>Authorization required</h1>';
  content += "This server could not verify that you are authorized to access the document requested. ";
  content += "Either you supplied the wrong credentials (e.g., bad password), or your browser doesn't ";
  content += "understand how to supply the credentials required.";
  dologs(request);
  response.end(content);
  return false;
}

function isAuthenticated(request, response, app) {
    if(!app) { return true; }
    var user=options.username[app];
    var pass=options.password[app];
    if(!user || !pass) { return true; }
        
    var auth, login;
    if(!request.headers.authorization) { return authenticateResponse(response, app); }
    auth = request.headers.authorization.replace(/^Basic /, '');
    auth = (new Buffer(auth, 'base64').toString('utf8'));
    login = auth.split(':');
    if(login[0] !== user || login[1] !== pass) {
        return authenticateResponse(response, app);
    }
    return true;
}

function httpHandler(request, response, isHttps) {
    try {
        response.request=request;
        //console.log("RCVHEADERS: "+JSON.stringify(request.headers));
        var cookies = parseCookies(request.headers.cookie);
        //out(request,fmtDate()+' REQ ' + request.url+"; cookies="+JSON.stringify(cookies)+': ');
        var hasCookies=(JSON.stringify(cookies) != "{}");
        var h=request.headers.host;
        var isHead=(request.method === 'HEAD');
        var c=request.headers['if-modified-since'] ? 
            (isHead ? ' HE? ' : ' RE? ') : (isHead ? ' HED ' : ' REQ ');
        out(request,fmtDate()+ c + h + request.url+(hasCookies?"; hasCookies ":" "));
        var url=decodeURI(request.url);

        // ********* HTTP SERVICE ********** //
        var isPortalOrIcon=false;
        var usplit=url.split('?');
        var file=usplit[0];
        var addr=request.connection.remoteAddress.replace(/::ffff:/,'');   
        // FIXME: Provide option for access control to deny internal (Local) access to an app
        // FIXME: e.g. if(addr.indexOf(LocalNet) !== 0) // Allow access to app, else redirect to another app or index
        if(file.indexOf("/app/") === 0) {
            var sub=file.substr(5);
            var paths=sub.split('/');
            var app=paths[0];
            if(!isAuthenticated(request, response, app)) { return; }
            if(paths.length > 1 && paths[1].length > 0) {
                if(paths[0] == ':*') { return sendDirFile(request, response, cookies, sub.substr(3)); }
                if(paths[paths.length-1] == ':*') {
                    var path=fsp.join("sdcard/DroidScript",sub.substr(0,sub.length-3));
                    return sendDirFile(request, response, cookies, path);
                }
                // FIXME: Check access before serving files not in same app
                return serveRegularFile(normalizePath(fsp.join(DSub, sub)), request, response, cookies);
            }
            else {
                if(paths[0] == ':*') { return sendDirFile(request, response, cookies, ""); }
                if(paths.length === 1 && app.length > 0) { // Needs slash completion: redirect
                    //console.log("alen="+app.length+";app="+app+"***");
                    return serveTemplateFile(fsp.join(WebRoot, 'redirect.html'), request, response, cookies, 301, {url:file+'/'});
                }
                if(app.length === 0) { 
                    return serveTemplateFile(fsp.join(WebRoot, 'redirect.html'), request, response, cookies, 301, {url:file+'_index/'});
                }
                //console.log("app="+app);
                var appPath=normalizePath(fsp.join(DSub, app, app+'.js'));
                fs.stat(appPath, (err, stats) => {
                    var isFile=err ? false : stats.isFile();
                    if(isFile) {
                        return serveTemplateFile(fsp.join(WebRoot, 'app.html'), request, response, cookies, null, {app:app});
                    }
                    else { // App not found error
                        console.log("Missing "+appPath);
                        return serveTemplateFile(fsp.join(WebRoot, '404.html'), request, response, cookies, 404, {app:app});
                    }
                });
                return;
            }
        }
        return serveTemplateFile(fsp.join(WebRoot, 'redirect.html'), request, response, cookies, 301, {url:'/app/_index/'});
/*        
        var content="<html><head><title>Invalid request</title>";
        content += '<meta http-equiv="refresh" content="5;URL=https://google.com" />';
        content += "</head><body><h1>Invalid request</h1>";
        content += "<!-- 3 -->";
        content += "</body></html>";
        dologs(request);
        return respond(9,response, cookies, 404, null, null, content);
*/        
    }
    catch(e) {
        console.error('ERR CRASH '+url+"; e="+e.stack+" to "+adr(request));
        return respond(10,response, cookies, 500, null, null,"<html><head><title>Server Error</title></head><body>"+
            "<h1>Server Error in "+url+": "+e.message+"</h1></body></html>");
    }
}

// Send Directory or File, checking authentication/permission to access given resource
function sendDirFile(request, response, cookies, sub) {
    var path=normalizePath(sub);
    for(var xa=0; xa<_blacklist.length; xa++) {
        var skip=fsp.join(AppRoot, _blacklist[xa]);
        if(skip === path || sub[0] == '.') { // Ignore blacklist and hidden files
            dologs(request);
            return respond(8.1,response, cookies, 403, "text/plain", null, "Forbidden");
        }
    }
    // FIXME: Implement whitelist of e.g. ["/sdcard/DroidScript/AppName"] apps the current user has access to (if authenticated)

    fs.readdir(path, (err, list) => {
        if(err) { return serveRegularFile(path, request, response, cookies); }
        list=JSON.stringify(list);
        console.log("dir="+list);
        dologs(request);
        return respond(8.3,response, cookies, 200, "inode/directory", null, list);
    });
    return true;
}

function normalizePath(fPath) { // PURPOSE: Eliminate root breakout attempts
    fPath=fPath.split("../").join("/").split("/").join(fsp.sep);
    return fsp.join(AppRoot, fPath); // Retrieve system resources
}

function respond(at,response, cookies, code, contentType, contentLen, content, redirect, lastModified, acceptEncoding) {
    if(!code) { code=200; }
    if(!contentType) { contentType="text/html"; }
    if(content) { contentLen=content.length; }
    //log("SET-COOKIE: "+sendCookies(cookies));
    var headers={
        'Server': _SERVER,
        'Set-Cookie': sendCookies(cookies),
        'Content-Type': contentType
    };
    if(acceptEncoding && code === 200 && (_ALLOWGZIP || _ALLOWDEFL)) {
        // Note: this is not a conformant accept-encoding parser.
        // See http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3
        if      (_ALLOWDEFL && acceptEncoding.match(/\bdeflate\b/)) { headers['content-encoding'] = 'deflate'; }
        else if (_ALLOWGZIP && acceptEncoding.match(/\bgzip\b/))    { headers['content-encoding'] = 'gzip';    }
    }
    if(contentLen && !headers['content-encoding']) { headers['Content-Length']=contentLen; }
    if(redirect)   { headers['Location']=redirect; }
    if(lastModified) {
        var maxAge=_MAXAGE; // If-modified-since may be used if older than this many seconds
        headers['Cache-Control']="private, max-age="+maxAge;
        headers['Expires']=new Date(lastModified+maxAge).toUTCString();
        headers['Last-Modified']=new Date(lastModified).toUTCString();
    }
    response.writeHead(code, headers);
    //outln(request, "HEADERS=",headers);
    if(content && response.request.method !== 'HEAD') { response.write(content); response.end(); }
    return headers;
}

function out(request, msg) {        
    //process.stdout.write("MSG: "+msg+"; ro="+request.out);
    if(!request.out) { request.out=msg; }
    else { request.out += msg; }
}

function outln(request, msg) {
    out(request, msg+'\n');
}

function dologs(request) {
    console.log(request.out.trim());
}

function fmtDate(d) {
    if(!d) { d=new Date(); }
    var dt = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + " ";
    return dt + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
}

function getContentType(filePath) {
    var xa=filePath.lastIndexOf('.');
    var ctype="";
    var ext=(xa > -1) ? filePath.substr(xa+1).toLowerCase() : "";
    switch (ext) {
        case "js"   : ctype="application/javascript";        break;
        case "css"  : ctype="text/css";                      break;
        case "png"  : ctype="image/png";                     break;
        case "gif"  : ctype="image/gif";                     break;
        case "jpg"  : ctype="image/jpg";                     break;
        case "svg"  : ctype="image/svg+xml";                 break;
        case "ttf"  : ctype="font/ttf";                      break;
        case "otf"  : ctype="font/opentype";		         break;
        case "eot"  : ctype="application/vnd.ms-fontobject"; break;
        case "woff" : ctype="application/font-woff";         break;
        case "woff2": ctype="application/font-woff2";        break;
        case "txt"  : ctype="text/plain";                    break;
        default     : ctype="text/html";                     break;
    }
    return ctype;
}

/////////////// COOKIES //////////////////

function parseCookies(cookie) {
    if(!cookie) { return {}; }
    return cookie.split(';').reduce(
        function(prev, curr) {
            var m = / *([^=]+)=(.*)/.exec(curr);
            var key = m[1];
            var value = decodeURIComponent(m[2]);
            prev[key] = value;
            return prev;
        },
        { }
    );
}

function sendCookies(cookies) {
    var list = [ ];
    for (var key in cookies) {
        list.push(key + '=' + encodeURIComponent(cookies[key]) + '; expires=0; path=/;');
    }
    return list;
}

// *********************************************************************************

/*
 * Web Socket Initialization
 */
function wsserv(httpServer) {
    const WebSocketServer = require('websocket').server;
    var wsServer = new WebSocketServer({httpServer: httpServer, autoAcceptConnections: false});
    wsServer.on('request', wsHandler);
    
    return true;
}

function wsHandler(request) {
    // console.log("wsHandler");
	var proto=chooseProtocol(request.requestedProtocols);
	if (proto === null) {
        // Make sure we only accept requests from an allowed origin 
        request.reject();
        outln(request, fmtDate() + ' Connection using ' + request.requestedProtocols + ' rejected.');
        dologs(request);
        return;
	}
	if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin 
        request.reject();
        outln(request,fmtDate() + ' Connection from origin ' + request.origin + ' rejected.');
        dologs(request);
        return;
	}
	if(proto == 'droidscript-sync') { dsync(request); }
}

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed. 
  return true;
}

function chooseProtocol(protos) {
    for(var xa=0; xa<protos.length; xa++) {
        if(protos[xa] == 'droidscript-sync') { return protos[xa]; }
    }
    return null;
}

function dsync(request) {
    var conn=request.accept('droidscript-sync', request.origin);
    outln(request,fmtDate()+' CON '+conn.remoteAddress+' (origin '+request.origin+')');
    dologs(request);
    conn.on('message', handleWsMsg.bind(conn));
    conn.on('close', function(reasonCode, description) {
        out(request,fmtDate()+' DIS '+conn.remoteAddress);
        dologs(request);
    });
    conn.rootPath=AppRoot; // NOTE: Each connnection could potentially have a different root
    conn.q=["/"];
    // BLACKLIST: Skip items that are to be invisible to any app
    conn.skip=_blacklist;
    // WHITELIST: Only access specified folders (depending on permissions, 
    //            this may be empty (all access), or have one or more app dirs)
    // FIXME: Implement access control below
    //conn.only=["/sdcard/DroidScript/AppName"];
    sync(conn);
}

function sync(conn) {
    var elem=filterDQ(conn);
    if(!elem) {
        conn.sendUTF(JSON.stringify({"type":"syncdone"}));
        return;
    }

    outln(conn,fmtDate()+' SNC '+elem+' => '+conn.remoteAddress);
    var path=fsp.join(conn.rootPath, elem);
    fs.stat(path, function(err, stat) { // Check unknown path to see if file or directory
        if(err) {
            outln(conn,fmtDate()+' '+err+' => '+conn.remoteAddress);
            conn.sendUTF(JSON.stringify({"type":"syncerr",err:err.message}));
            dologs(conn); conn.out='';
            return;
        }
        var lastModified=Math.max(stat.mtime.getTime(), stat.ctime.getTime());
        if (stat.isDirectory()) {            
            fs.readdir(path, (err, list) => {
                list.forEach((v) => {
                    var sub=fsp.join(elem,v);
                    for(var xa=0; xa<_blacklist.length; xa++) {
                        var skip=_blacklist[xa];
                        if(skip === sub || sub.indexOf('/.') === 0) { return; } // Ignore blacklist and hidden files
                    }
                    conn.q.push(sub);
                }); // Queue files
                conn.sendUTF(JSON.stringify({"type":"sync", lastModified:lastModified, path:elem, data:null, ctype:"inode/directory"})); // Sync directory to client
            });
            dologs(conn); conn.out='';
            return;
        }
        var ctype=getContentType(path);
        conn.sendUTF(JSON.stringify({"type":"sync", lastModified:lastModified, path:elem, data:null, ctype:ctype})); // Sync file to client
        dologs(conn); conn.out='';
    });
}

// De-Queue next element from connection, filtering out elements matching skip or only arrays of conn.
function filterDQ(conn) {
    var elem=null;
    main:
    do {
        elem=conn.q.shift();
        if(!elem) { return elem; }
        if(conn.skip) for(var xa=0; xa<conn.skip.length; xa++) {
            if(elem === conn.skip[xa]) { continue main; }
        }
        if(conn.only) for(var xa=0; xa<conn.only.length; xa++) {
            var len=Math.min(elem.length, conn.only[xa].length);
            if(elem.substr(0,len) !== conn.only[xa].substr(0,len)) { continue; }
        }
        break;
    } while(elem);
    return elem;
}

function handleWsMsg(message) {
    if (message.type === 'utf8') {
        var obj=JSON.parse(message.utf8Data);
        //console.log('RCV ' + message.utf8Data);
        if(obj.type === "sync") {
            if(!obj.lastModified && !obj.data) { // Request from client to receive this file (data will not be sent here)
                sync(this);
            }
            else {
                console.log("SYNC from client not implemented");
            }
        }
        else { console.log("Unknown obj: "+message.utf8Data); }
    }
    else if (message.type === 'binary') {
        console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
        //this.sendBytes(message.binaryData);
    }
    else { console.log('Received message of unknown type '+message.type); }
}
