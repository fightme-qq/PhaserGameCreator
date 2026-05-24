(function(){const q=document.createElement("link").relList;if(q&&q.supports&&q.supports("modulepreload"))return;for(const v of document.querySelectorAll('link[rel="modulepreload"]'))E(v);new MutationObserver(v=>{for(const o of v)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&E(l)}).observe(document,{childList:!0,subtree:!0});function f(v){const o={};return v.integrity&&(o.integrity=v.integrity),v.referrerPolicy&&(o.referrerPolicy=v.referrerPolicy),v.crossOrigin==="use-credentials"?o.credentials="include":v.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function E(v){if(v.ep)return;v.ep=!0;const o=f(v);fetch(v.href,o)}})();var xe=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Le(B){return B&&B.__esModule&&Object.prototype.hasOwnProperty.call(B,"default")?B.default:B}function Se(B){throw new Error('Could not dynamically require "'+B+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Ce={exports:{}};/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/var De;function Me(){return De||(De=1,(function(B,q){(function(f){B.exports=f()})(function(){return(function f(E,v,o){function l(y,k){if(!v[y]){if(!E[y]){var m=typeof Se=="function"&&Se;if(!k&&m)return m(y,!0);if(r)return r(y,!0);var b=new Error("Cannot find module '"+y+"'");throw b.code="MODULE_NOT_FOUND",b}var a=v[y]={exports:{}};E[y][0].call(a.exports,function(u){var s=E[y][1][u];return l(s||u)},a,a.exports,f,E,v,o)}return v[y].exports}for(var r=typeof Se=="function"&&Se,d=0;d<o.length;d++)l(o[d]);return l})({1:[function(f,E,v){var o=f("./utils"),l=f("./support"),r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";v.encode=function(d){for(var y,k,m,b,a,u,s,c=[],n=0,p=d.length,w=p,S=o.getTypeOf(d)!=="string";n<d.length;)w=p-n,m=S?(y=d[n++],k=n<p?d[n++]:0,n<p?d[n++]:0):(y=d.charCodeAt(n++),k=n<p?d.charCodeAt(n++):0,n<p?d.charCodeAt(n++):0),b=y>>2,a=(3&y)<<4|k>>4,u=1<w?(15&k)<<2|m>>6:64,s=2<w?63&m:64,c.push(r.charAt(b)+r.charAt(a)+r.charAt(u)+r.charAt(s));return c.join("")},v.decode=function(d){var y,k,m,b,a,u,s=0,c=0,n="data:";if(d.substr(0,n.length)===n)throw new Error("Invalid base64 input, it looks like a data url.");var p,w=3*(d=d.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(d.charAt(d.length-1)===r.charAt(64)&&w--,d.charAt(d.length-2)===r.charAt(64)&&w--,w%1!=0)throw new Error("Invalid base64 input, bad content length.");for(p=l.uint8array?new Uint8Array(0|w):new Array(0|w);s<d.length;)y=r.indexOf(d.charAt(s++))<<2|(b=r.indexOf(d.charAt(s++)))>>4,k=(15&b)<<4|(a=r.indexOf(d.charAt(s++)))>>2,m=(3&a)<<6|(u=r.indexOf(d.charAt(s++))),p[c++]=y,a!==64&&(p[c++]=k),u!==64&&(p[c++]=m);return p}},{"./support":30,"./utils":32}],2:[function(f,E,v){var o=f("./external"),l=f("./stream/DataWorker"),r=f("./stream/Crc32Probe"),d=f("./stream/DataLengthProbe");function y(k,m,b,a,u){this.compressedSize=k,this.uncompressedSize=m,this.crc32=b,this.compression=a,this.compressedContent=u}y.prototype={getContentWorker:function(){var k=new l(o.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new d("data_length")),m=this;return k.on("end",function(){if(this.streamInfo.data_length!==m.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),k},getCompressedWorker:function(){return new l(o.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},y.createWorkerFrom=function(k,m,b){return k.pipe(new r).pipe(new d("uncompressedSize")).pipe(m.compressWorker(b)).pipe(new d("compressedSize")).withStreamInfo("compression",m)},E.exports=y},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(f,E,v){var o=f("./stream/GenericWorker");v.STORE={magic:"\0\0",compressWorker:function(){return new o("STORE compression")},uncompressWorker:function(){return new o("STORE decompression")}},v.DEFLATE=f("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(f,E,v){var o=f("./utils"),l=(function(){for(var r,d=[],y=0;y<256;y++){r=y;for(var k=0;k<8;k++)r=1&r?3988292384^r>>>1:r>>>1;d[y]=r}return d})();E.exports=function(r,d){return r!==void 0&&r.length?o.getTypeOf(r)!=="string"?(function(y,k,m,b){var a=l,u=b+m;y^=-1;for(var s=b;s<u;s++)y=y>>>8^a[255&(y^k[s])];return-1^y})(0|d,r,r.length,0):(function(y,k,m,b){var a=l,u=b+m;y^=-1;for(var s=b;s<u;s++)y=y>>>8^a[255&(y^k.charCodeAt(s))];return-1^y})(0|d,r,r.length,0):0}},{"./utils":32}],5:[function(f,E,v){v.base64=!1,v.binary=!1,v.dir=!1,v.createFolders=!0,v.date=null,v.compression=null,v.compressionOptions=null,v.comment=null,v.unixPermissions=null,v.dosPermissions=null},{}],6:[function(f,E,v){var o=null;o=typeof Promise<"u"?Promise:f("lie"),E.exports={Promise:o}},{lie:37}],7:[function(f,E,v){var o=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",l=f("pako"),r=f("./utils"),d=f("./stream/GenericWorker"),y=o?"uint8array":"array";function k(m,b){d.call(this,"FlateWorker/"+m),this._pako=null,this._pakoAction=m,this._pakoOptions=b,this.meta={}}v.magic="\b\0",r.inherits(k,d),k.prototype.processChunk=function(m){this.meta=m.meta,this._pako===null&&this._createPako(),this._pako.push(r.transformTo(y,m.data),!1)},k.prototype.flush=function(){d.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},k.prototype.cleanUp=function(){d.prototype.cleanUp.call(this),this._pako=null},k.prototype._createPako=function(){this._pako=new l[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var m=this;this._pako.onData=function(b){m.push({data:b,meta:m.meta})}},v.compressWorker=function(m){return new k("Deflate",m)},v.uncompressWorker=function(){return new k("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(f,E,v){function o(a,u){var s,c="";for(s=0;s<u;s++)c+=String.fromCharCode(255&a),a>>>=8;return c}function l(a,u,s,c,n,p){var w,S,x=a.file,O=a.compression,D=p!==y.utf8encode,N=r.transformTo("string",p(x.name)),z=r.transformTo("string",y.utf8encode(x.name)),K=x.comment,J=r.transformTo("string",p(K)),g=r.transformTo("string",y.utf8encode(K)),T=z.length!==x.name.length,t=g.length!==K.length,U="",ee="",F="",te=x.dir,L=x.date,X={crc32:0,compressedSize:0,uncompressedSize:0};u&&!s||(X.crc32=a.crc32,X.compressedSize=a.compressedSize,X.uncompressedSize=a.uncompressedSize);var I=0;u&&(I|=8),D||!T&&!t||(I|=2048);var A=0,$=0;te&&(A|=16),n==="UNIX"?($=798,A|=(function(Z,ie){var ce=Z;return Z||(ce=ie?16893:33204),(65535&ce)<<16})(x.unixPermissions,te)):($=20,A|=(function(Z){return 63&(Z||0)})(x.dosPermissions)),w=L.getUTCHours(),w<<=6,w|=L.getUTCMinutes(),w<<=5,w|=L.getUTCSeconds()/2,S=L.getUTCFullYear()-1980,S<<=4,S|=L.getUTCMonth()+1,S<<=5,S|=L.getUTCDate(),T&&(ee=o(1,1)+o(k(N),4)+z,U+="up"+o(ee.length,2)+ee),t&&(F=o(1,1)+o(k(J),4)+g,U+="uc"+o(F.length,2)+F);var Y="";return Y+=`
\0`,Y+=o(I,2),Y+=O.magic,Y+=o(w,2),Y+=o(S,2),Y+=o(X.crc32,4),Y+=o(X.compressedSize,4),Y+=o(X.uncompressedSize,4),Y+=o(N.length,2),Y+=o(U.length,2),{fileRecord:m.LOCAL_FILE_HEADER+Y+N+U,dirRecord:m.CENTRAL_FILE_HEADER+o($,2)+Y+o(J.length,2)+"\0\0\0\0"+o(A,4)+o(c,4)+N+U+J}}var r=f("../utils"),d=f("../stream/GenericWorker"),y=f("../utf8"),k=f("../crc32"),m=f("../signature");function b(a,u,s,c){d.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=u,this.zipPlatform=s,this.encodeFileName=c,this.streamFiles=a,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}r.inherits(b,d),b.prototype.push=function(a){var u=a.meta.percent||0,s=this.entriesCount,c=this._sources.length;this.accumulate?this.contentBuffer.push(a):(this.bytesWritten+=a.data.length,d.prototype.push.call(this,{data:a.data,meta:{currentFile:this.currentFile,percent:s?(u+100*(s-c-1))/s:100}}))},b.prototype.openedSource=function(a){this.currentSourceOffset=this.bytesWritten,this.currentFile=a.file.name;var u=this.streamFiles&&!a.file.dir;if(u){var s=l(a,u,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:s.fileRecord,meta:{percent:0}})}else this.accumulate=!0},b.prototype.closedSource=function(a){this.accumulate=!1;var u=this.streamFiles&&!a.file.dir,s=l(a,u,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(s.dirRecord),u)this.push({data:(function(c){return m.DATA_DESCRIPTOR+o(c.crc32,4)+o(c.compressedSize,4)+o(c.uncompressedSize,4)})(a),meta:{percent:100}});else for(this.push({data:s.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},b.prototype.flush=function(){for(var a=this.bytesWritten,u=0;u<this.dirRecords.length;u++)this.push({data:this.dirRecords[u],meta:{percent:100}});var s=this.bytesWritten-a,c=(function(n,p,w,S,x){var O=r.transformTo("string",x(S));return m.CENTRAL_DIRECTORY_END+"\0\0\0\0"+o(n,2)+o(n,2)+o(p,4)+o(w,4)+o(O.length,2)+O})(this.dirRecords.length,s,a,this.zipComment,this.encodeFileName);this.push({data:c,meta:{percent:100}})},b.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},b.prototype.registerPrevious=function(a){this._sources.push(a);var u=this;return a.on("data",function(s){u.processChunk(s)}),a.on("end",function(){u.closedSource(u.previous.streamInfo),u._sources.length?u.prepareNextSource():u.end()}),a.on("error",function(s){u.error(s)}),this},b.prototype.resume=function(){return!!d.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},b.prototype.error=function(a){var u=this._sources;if(!d.prototype.error.call(this,a))return!1;for(var s=0;s<u.length;s++)try{u[s].error(a)}catch{}return!0},b.prototype.lock=function(){d.prototype.lock.call(this);for(var a=this._sources,u=0;u<a.length;u++)a[u].lock()},E.exports=b},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(f,E,v){var o=f("../compressions"),l=f("./ZipFileWorker");v.generateWorker=function(r,d,y){var k=new l(d.streamFiles,y,d.platform,d.encodeFileName),m=0;try{r.forEach(function(b,a){m++;var u=(function(p,w){var S=p||w,x=o[S];if(!x)throw new Error(S+" is not a valid compression method !");return x})(a.options.compression,d.compression),s=a.options.compressionOptions||d.compressionOptions||{},c=a.dir,n=a.date;a._compressWorker(u,s).withStreamInfo("file",{name:b,dir:c,date:n,comment:a.comment||"",unixPermissions:a.unixPermissions,dosPermissions:a.dosPermissions}).pipe(k)}),k.entriesCount=m}catch(b){k.error(b)}return k}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(f,E,v){function o(){if(!(this instanceof o))return new o;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var l=new o;for(var r in this)typeof this[r]!="function"&&(l[r]=this[r]);return l}}(o.prototype=f("./object")).loadAsync=f("./load"),o.support=f("./support"),o.defaults=f("./defaults"),o.version="3.10.1",o.loadAsync=function(l,r){return new o().loadAsync(l,r)},o.external=f("./external"),E.exports=o},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(f,E,v){var o=f("./utils"),l=f("./external"),r=f("./utf8"),d=f("./zipEntries"),y=f("./stream/Crc32Probe"),k=f("./nodejsUtils");function m(b){return new l.Promise(function(a,u){var s=b.decompressed.getContentWorker().pipe(new y);s.on("error",function(c){u(c)}).on("end",function(){s.streamInfo.crc32!==b.decompressed.crc32?u(new Error("Corrupted zip : CRC32 mismatch")):a()}).resume()})}E.exports=function(b,a){var u=this;return a=o.extend(a||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:r.utf8decode}),k.isNode&&k.isStream(b)?l.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):o.prepareContent("the loaded zip file",b,!0,a.optimizedBinaryString,a.base64).then(function(s){var c=new d(a);return c.load(s),c}).then(function(s){var c=[l.Promise.resolve(s)],n=s.files;if(a.checkCRC32)for(var p=0;p<n.length;p++)c.push(m(n[p]));return l.Promise.all(c)}).then(function(s){for(var c=s.shift(),n=c.files,p=0;p<n.length;p++){var w=n[p],S=w.fileNameStr,x=o.resolve(w.fileNameStr);u.file(x,w.decompressed,{binary:!0,optimizedBinaryString:!0,date:w.date,dir:w.dir,comment:w.fileCommentStr.length?w.fileCommentStr:null,unixPermissions:w.unixPermissions,dosPermissions:w.dosPermissions,createFolders:a.createFolders}),w.dir||(u.file(x).unsafeOriginalName=S)}return c.zipComment.length&&(u.comment=c.zipComment),u})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(f,E,v){var o=f("../utils"),l=f("../stream/GenericWorker");function r(d,y){l.call(this,"Nodejs stream input adapter for "+d),this._upstreamEnded=!1,this._bindStream(y)}o.inherits(r,l),r.prototype._bindStream=function(d){var y=this;(this._stream=d).pause(),d.on("data",function(k){y.push({data:k,meta:{percent:0}})}).on("error",function(k){y.isPaused?this.generatedError=k:y.error(k)}).on("end",function(){y.isPaused?y._upstreamEnded=!0:y.end()})},r.prototype.pause=function(){return!!l.prototype.pause.call(this)&&(this._stream.pause(),!0)},r.prototype.resume=function(){return!!l.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},E.exports=r},{"../stream/GenericWorker":28,"../utils":32}],13:[function(f,E,v){var o=f("readable-stream").Readable;function l(r,d,y){o.call(this,d),this._helper=r;var k=this;r.on("data",function(m,b){k.push(m)||k._helper.pause(),y&&y(b)}).on("error",function(m){k.emit("error",m)}).on("end",function(){k.push(null)})}f("../utils").inherits(l,o),l.prototype._read=function(){this._helper.resume()},E.exports=l},{"../utils":32,"readable-stream":16}],14:[function(f,E,v){E.exports={isNode:typeof Buffer<"u",newBufferFrom:function(o,l){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(o,l);if(typeof o=="number")throw new Error('The "data" argument must not be a number');return new Buffer(o,l)},allocBuffer:function(o){if(Buffer.alloc)return Buffer.alloc(o);var l=new Buffer(o);return l.fill(0),l},isBuffer:function(o){return Buffer.isBuffer(o)},isStream:function(o){return o&&typeof o.on=="function"&&typeof o.pause=="function"&&typeof o.resume=="function"}}},{}],15:[function(f,E,v){function o(x,O,D){var N,z=r.getTypeOf(O),K=r.extend(D||{},k);K.date=K.date||new Date,K.compression!==null&&(K.compression=K.compression.toUpperCase()),typeof K.unixPermissions=="string"&&(K.unixPermissions=parseInt(K.unixPermissions,8)),K.unixPermissions&&16384&K.unixPermissions&&(K.dir=!0),K.dosPermissions&&16&K.dosPermissions&&(K.dir=!0),K.dir&&(x=n(x)),K.createFolders&&(N=c(x))&&p.call(this,N,!0);var J=z==="string"&&K.binary===!1&&K.base64===!1;D&&D.binary!==void 0||(K.binary=!J),(O instanceof m&&O.uncompressedSize===0||K.dir||!O||O.length===0)&&(K.base64=!1,K.binary=!0,O="",K.compression="STORE",z="string");var g=null;g=O instanceof m||O instanceof d?O:u.isNode&&u.isStream(O)?new s(x,O):r.prepareContent(x,O,K.binary,K.optimizedBinaryString,K.base64);var T=new b(x,g,K);this.files[x]=T}var l=f("./utf8"),r=f("./utils"),d=f("./stream/GenericWorker"),y=f("./stream/StreamHelper"),k=f("./defaults"),m=f("./compressedObject"),b=f("./zipObject"),a=f("./generate"),u=f("./nodejsUtils"),s=f("./nodejs/NodejsStreamInputAdapter"),c=function(x){x.slice(-1)==="/"&&(x=x.substring(0,x.length-1));var O=x.lastIndexOf("/");return 0<O?x.substring(0,O):""},n=function(x){return x.slice(-1)!=="/"&&(x+="/"),x},p=function(x,O){return O=O!==void 0?O:k.createFolders,x=n(x),this.files[x]||o.call(this,x,null,{dir:!0,createFolders:O}),this.files[x]};function w(x){return Object.prototype.toString.call(x)==="[object RegExp]"}var S={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(x){var O,D,N;for(O in this.files)N=this.files[O],(D=O.slice(this.root.length,O.length))&&O.slice(0,this.root.length)===this.root&&x(D,N)},filter:function(x){var O=[];return this.forEach(function(D,N){x(D,N)&&O.push(N)}),O},file:function(x,O,D){if(arguments.length!==1)return x=this.root+x,o.call(this,x,O,D),this;if(w(x)){var N=x;return this.filter(function(K,J){return!J.dir&&N.test(K)})}var z=this.files[this.root+x];return z&&!z.dir?z:null},folder:function(x){if(!x)return this;if(w(x))return this.filter(function(z,K){return K.dir&&x.test(z)});var O=this.root+x,D=p.call(this,O),N=this.clone();return N.root=D.name,N},remove:function(x){x=this.root+x;var O=this.files[x];if(O||(x.slice(-1)!=="/"&&(x+="/"),O=this.files[x]),O&&!O.dir)delete this.files[x];else for(var D=this.filter(function(z,K){return K.name.slice(0,x.length)===x}),N=0;N<D.length;N++)delete this.files[D[N].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(x){var O,D={};try{if((D=r.extend(x||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:l.utf8encode})).type=D.type.toLowerCase(),D.compression=D.compression.toUpperCase(),D.type==="binarystring"&&(D.type="string"),!D.type)throw new Error("No output type specified.");r.checkSupport(D.type),D.platform!=="darwin"&&D.platform!=="freebsd"&&D.platform!=="linux"&&D.platform!=="sunos"||(D.platform="UNIX"),D.platform==="win32"&&(D.platform="DOS");var N=D.comment||this.comment||"";O=a.generateWorker(this,D,N)}catch(z){(O=new d("error")).error(z)}return new y(O,D.type||"string",D.mimeType)},generateAsync:function(x,O){return this.generateInternalStream(x).accumulate(O)},generateNodeStream:function(x,O){return(x=x||{}).type||(x.type="nodebuffer"),this.generateInternalStream(x).toNodejsStream(O)}};E.exports=S},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(f,E,v){E.exports=f("stream")},{stream:void 0}],17:[function(f,E,v){var o=f("./DataReader");function l(r){o.call(this,r);for(var d=0;d<this.data.length;d++)r[d]=255&r[d]}f("../utils").inherits(l,o),l.prototype.byteAt=function(r){return this.data[this.zero+r]},l.prototype.lastIndexOfSignature=function(r){for(var d=r.charCodeAt(0),y=r.charCodeAt(1),k=r.charCodeAt(2),m=r.charCodeAt(3),b=this.length-4;0<=b;--b)if(this.data[b]===d&&this.data[b+1]===y&&this.data[b+2]===k&&this.data[b+3]===m)return b-this.zero;return-1},l.prototype.readAndCheckSignature=function(r){var d=r.charCodeAt(0),y=r.charCodeAt(1),k=r.charCodeAt(2),m=r.charCodeAt(3),b=this.readData(4);return d===b[0]&&y===b[1]&&k===b[2]&&m===b[3]},l.prototype.readData=function(r){if(this.checkOffset(r),r===0)return[];var d=this.data.slice(this.zero+this.index,this.zero+this.index+r);return this.index+=r,d},E.exports=l},{"../utils":32,"./DataReader":18}],18:[function(f,E,v){var o=f("../utils");function l(r){this.data=r,this.length=r.length,this.index=0,this.zero=0}l.prototype={checkOffset:function(r){this.checkIndex(this.index+r)},checkIndex:function(r){if(this.length<this.zero+r||r<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+r+"). Corrupted zip ?")},setIndex:function(r){this.checkIndex(r),this.index=r},skip:function(r){this.setIndex(this.index+r)},byteAt:function(){},readInt:function(r){var d,y=0;for(this.checkOffset(r),d=this.index+r-1;d>=this.index;d--)y=(y<<8)+this.byteAt(d);return this.index+=r,y},readString:function(r){return o.transformTo("string",this.readData(r))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var r=this.readInt(4);return new Date(Date.UTC(1980+(r>>25&127),(r>>21&15)-1,r>>16&31,r>>11&31,r>>5&63,(31&r)<<1))}},E.exports=l},{"../utils":32}],19:[function(f,E,v){var o=f("./Uint8ArrayReader");function l(r){o.call(this,r)}f("../utils").inherits(l,o),l.prototype.readData=function(r){this.checkOffset(r);var d=this.data.slice(this.zero+this.index,this.zero+this.index+r);return this.index+=r,d},E.exports=l},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(f,E,v){var o=f("./DataReader");function l(r){o.call(this,r)}f("../utils").inherits(l,o),l.prototype.byteAt=function(r){return this.data.charCodeAt(this.zero+r)},l.prototype.lastIndexOfSignature=function(r){return this.data.lastIndexOf(r)-this.zero},l.prototype.readAndCheckSignature=function(r){return r===this.readData(4)},l.prototype.readData=function(r){this.checkOffset(r);var d=this.data.slice(this.zero+this.index,this.zero+this.index+r);return this.index+=r,d},E.exports=l},{"../utils":32,"./DataReader":18}],21:[function(f,E,v){var o=f("./ArrayReader");function l(r){o.call(this,r)}f("../utils").inherits(l,o),l.prototype.readData=function(r){if(this.checkOffset(r),r===0)return new Uint8Array(0);var d=this.data.subarray(this.zero+this.index,this.zero+this.index+r);return this.index+=r,d},E.exports=l},{"../utils":32,"./ArrayReader":17}],22:[function(f,E,v){var o=f("../utils"),l=f("../support"),r=f("./ArrayReader"),d=f("./StringReader"),y=f("./NodeBufferReader"),k=f("./Uint8ArrayReader");E.exports=function(m){var b=o.getTypeOf(m);return o.checkSupport(b),b!=="string"||l.uint8array?b==="nodebuffer"?new y(m):l.uint8array?new k(o.transformTo("uint8array",m)):new r(o.transformTo("array",m)):new d(m)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(f,E,v){v.LOCAL_FILE_HEADER="PK",v.CENTRAL_FILE_HEADER="PK",v.CENTRAL_DIRECTORY_END="PK",v.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",v.ZIP64_CENTRAL_DIRECTORY_END="PK",v.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(f,E,v){var o=f("./GenericWorker"),l=f("../utils");function r(d){o.call(this,"ConvertWorker to "+d),this.destType=d}l.inherits(r,o),r.prototype.processChunk=function(d){this.push({data:l.transformTo(this.destType,d.data),meta:d.meta})},E.exports=r},{"../utils":32,"./GenericWorker":28}],25:[function(f,E,v){var o=f("./GenericWorker"),l=f("../crc32");function r(){o.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}f("../utils").inherits(r,o),r.prototype.processChunk=function(d){this.streamInfo.crc32=l(d.data,this.streamInfo.crc32||0),this.push(d)},E.exports=r},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(f,E,v){var o=f("../utils"),l=f("./GenericWorker");function r(d){l.call(this,"DataLengthProbe for "+d),this.propName=d,this.withStreamInfo(d,0)}o.inherits(r,l),r.prototype.processChunk=function(d){if(d){var y=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=y+d.data.length}l.prototype.processChunk.call(this,d)},E.exports=r},{"../utils":32,"./GenericWorker":28}],27:[function(f,E,v){var o=f("../utils"),l=f("./GenericWorker");function r(d){l.call(this,"DataWorker");var y=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,d.then(function(k){y.dataIsReady=!0,y.data=k,y.max=k&&k.length||0,y.type=o.getTypeOf(k),y.isPaused||y._tickAndRepeat()},function(k){y.error(k)})}o.inherits(r,l),r.prototype.cleanUp=function(){l.prototype.cleanUp.call(this),this.data=null},r.prototype.resume=function(){return!!l.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,o.delay(this._tickAndRepeat,[],this)),!0)},r.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(o.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},r.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var d=null,y=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":d=this.data.substring(this.index,y);break;case"uint8array":d=this.data.subarray(this.index,y);break;case"array":case"nodebuffer":d=this.data.slice(this.index,y)}return this.index=y,this.push({data:d,meta:{percent:this.max?this.index/this.max*100:0}})},E.exports=r},{"../utils":32,"./GenericWorker":28}],28:[function(f,E,v){function o(l){this.name=l||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}o.prototype={push:function(l){this.emit("data",l)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(l){this.emit("error",l)}return!0},error:function(l){return!this.isFinished&&(this.isPaused?this.generatedError=l:(this.isFinished=!0,this.emit("error",l),this.previous&&this.previous.error(l),this.cleanUp()),!0)},on:function(l,r){return this._listeners[l].push(r),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(l,r){if(this._listeners[l])for(var d=0;d<this._listeners[l].length;d++)this._listeners[l][d].call(this,r)},pipe:function(l){return l.registerPrevious(this)},registerPrevious:function(l){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=l.streamInfo,this.mergeStreamInfo(),this.previous=l;var r=this;return l.on("data",function(d){r.processChunk(d)}),l.on("end",function(){r.end()}),l.on("error",function(d){r.error(d)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var l=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),l=!0),this.previous&&this.previous.resume(),!l},flush:function(){},processChunk:function(l){this.push(l)},withStreamInfo:function(l,r){return this.extraStreamInfo[l]=r,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var l in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,l)&&(this.streamInfo[l]=this.extraStreamInfo[l])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var l="Worker "+this.name;return this.previous?this.previous+" -> "+l:l}},E.exports=o},{}],29:[function(f,E,v){var o=f("../utils"),l=f("./ConvertWorker"),r=f("./GenericWorker"),d=f("../base64"),y=f("../support"),k=f("../external"),m=null;if(y.nodestream)try{m=f("../nodejs/NodejsStreamOutputAdapter")}catch{}function b(u,s){return new k.Promise(function(c,n){var p=[],w=u._internalType,S=u._outputType,x=u._mimeType;u.on("data",function(O,D){p.push(O),s&&s(D)}).on("error",function(O){p=[],n(O)}).on("end",function(){try{var O=(function(D,N,z){switch(D){case"blob":return o.newBlob(o.transformTo("arraybuffer",N),z);case"base64":return d.encode(N);default:return o.transformTo(D,N)}})(S,(function(D,N){var z,K=0,J=null,g=0;for(z=0;z<N.length;z++)g+=N[z].length;switch(D){case"string":return N.join("");case"array":return Array.prototype.concat.apply([],N);case"uint8array":for(J=new Uint8Array(g),z=0;z<N.length;z++)J.set(N[z],K),K+=N[z].length;return J;case"nodebuffer":return Buffer.concat(N);default:throw new Error("concat : unsupported type '"+D+"'")}})(w,p),x);c(O)}catch(D){n(D)}p=[]}).resume()})}function a(u,s,c){var n=s;switch(s){case"blob":case"arraybuffer":n="uint8array";break;case"base64":n="string"}try{this._internalType=n,this._outputType=s,this._mimeType=c,o.checkSupport(n),this._worker=u.pipe(new l(n)),u.lock()}catch(p){this._worker=new r("error"),this._worker.error(p)}}a.prototype={accumulate:function(u){return b(this,u)},on:function(u,s){var c=this;return u==="data"?this._worker.on(u,function(n){s.call(c,n.data,n.meta)}):this._worker.on(u,function(){o.delay(s,arguments,c)}),this},resume:function(){return o.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(u){if(o.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new m(this,{objectMode:this._outputType!=="nodebuffer"},u)}},E.exports=a},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(f,E,v){if(v.base64=!0,v.array=!0,v.string=!0,v.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",v.nodebuffer=typeof Buffer<"u",v.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")v.blob=!1;else{var o=new ArrayBuffer(0);try{v.blob=new Blob([o],{type:"application/zip"}).size===0}catch{try{var l=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);l.append(o),v.blob=l.getBlob("application/zip").size===0}catch{v.blob=!1}}}try{v.nodestream=!!f("readable-stream").Readable}catch{v.nodestream=!1}},{"readable-stream":16}],31:[function(f,E,v){for(var o=f("./utils"),l=f("./support"),r=f("./nodejsUtils"),d=f("./stream/GenericWorker"),y=new Array(256),k=0;k<256;k++)y[k]=252<=k?6:248<=k?5:240<=k?4:224<=k?3:192<=k?2:1;y[254]=y[254]=1;function m(){d.call(this,"utf-8 decode"),this.leftOver=null}function b(){d.call(this,"utf-8 encode")}v.utf8encode=function(a){return l.nodebuffer?r.newBufferFrom(a,"utf-8"):(function(u){var s,c,n,p,w,S=u.length,x=0;for(p=0;p<S;p++)(64512&(c=u.charCodeAt(p)))==55296&&p+1<S&&(64512&(n=u.charCodeAt(p+1)))==56320&&(c=65536+(c-55296<<10)+(n-56320),p++),x+=c<128?1:c<2048?2:c<65536?3:4;for(s=l.uint8array?new Uint8Array(x):new Array(x),p=w=0;w<x;p++)(64512&(c=u.charCodeAt(p)))==55296&&p+1<S&&(64512&(n=u.charCodeAt(p+1)))==56320&&(c=65536+(c-55296<<10)+(n-56320),p++),c<128?s[w++]=c:(c<2048?s[w++]=192|c>>>6:(c<65536?s[w++]=224|c>>>12:(s[w++]=240|c>>>18,s[w++]=128|c>>>12&63),s[w++]=128|c>>>6&63),s[w++]=128|63&c);return s})(a)},v.utf8decode=function(a){return l.nodebuffer?o.transformTo("nodebuffer",a).toString("utf-8"):(function(u){var s,c,n,p,w=u.length,S=new Array(2*w);for(s=c=0;s<w;)if((n=u[s++])<128)S[c++]=n;else if(4<(p=y[n]))S[c++]=65533,s+=p-1;else{for(n&=p===2?31:p===3?15:7;1<p&&s<w;)n=n<<6|63&u[s++],p--;1<p?S[c++]=65533:n<65536?S[c++]=n:(n-=65536,S[c++]=55296|n>>10&1023,S[c++]=56320|1023&n)}return S.length!==c&&(S.subarray?S=S.subarray(0,c):S.length=c),o.applyFromCharCode(S)})(a=o.transformTo(l.uint8array?"uint8array":"array",a))},o.inherits(m,d),m.prototype.processChunk=function(a){var u=o.transformTo(l.uint8array?"uint8array":"array",a.data);if(this.leftOver&&this.leftOver.length){if(l.uint8array){var s=u;(u=new Uint8Array(s.length+this.leftOver.length)).set(this.leftOver,0),u.set(s,this.leftOver.length)}else u=this.leftOver.concat(u);this.leftOver=null}var c=(function(p,w){var S;for((w=w||p.length)>p.length&&(w=p.length),S=w-1;0<=S&&(192&p[S])==128;)S--;return S<0||S===0?w:S+y[p[S]]>w?S:w})(u),n=u;c!==u.length&&(l.uint8array?(n=u.subarray(0,c),this.leftOver=u.subarray(c,u.length)):(n=u.slice(0,c),this.leftOver=u.slice(c,u.length))),this.push({data:v.utf8decode(n),meta:a.meta})},m.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:v.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},v.Utf8DecodeWorker=m,o.inherits(b,d),b.prototype.processChunk=function(a){this.push({data:v.utf8encode(a.data),meta:a.meta})},v.Utf8EncodeWorker=b},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(f,E,v){var o=f("./support"),l=f("./base64"),r=f("./nodejsUtils"),d=f("./external");function y(s){return s}function k(s,c){for(var n=0;n<s.length;++n)c[n]=255&s.charCodeAt(n);return c}f("setimmediate"),v.newBlob=function(s,c){v.checkSupport("blob");try{return new Blob([s],{type:c})}catch{try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return n.append(s),n.getBlob(c)}catch{throw new Error("Bug : can't construct the Blob.")}}};var m={stringifyByChunk:function(s,c,n){var p=[],w=0,S=s.length;if(S<=n)return String.fromCharCode.apply(null,s);for(;w<S;)c==="array"||c==="nodebuffer"?p.push(String.fromCharCode.apply(null,s.slice(w,Math.min(w+n,S)))):p.push(String.fromCharCode.apply(null,s.subarray(w,Math.min(w+n,S)))),w+=n;return p.join("")},stringifyByChar:function(s){for(var c="",n=0;n<s.length;n++)c+=String.fromCharCode(s[n]);return c},applyCanBeUsed:{uint8array:(function(){try{return o.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}})(),nodebuffer:(function(){try{return o.nodebuffer&&String.fromCharCode.apply(null,r.allocBuffer(1)).length===1}catch{return!1}})()}};function b(s){var c=65536,n=v.getTypeOf(s),p=!0;if(n==="uint8array"?p=m.applyCanBeUsed.uint8array:n==="nodebuffer"&&(p=m.applyCanBeUsed.nodebuffer),p)for(;1<c;)try{return m.stringifyByChunk(s,n,c)}catch{c=Math.floor(c/2)}return m.stringifyByChar(s)}function a(s,c){for(var n=0;n<s.length;n++)c[n]=s[n];return c}v.applyFromCharCode=b;var u={};u.string={string:y,array:function(s){return k(s,new Array(s.length))},arraybuffer:function(s){return u.string.uint8array(s).buffer},uint8array:function(s){return k(s,new Uint8Array(s.length))},nodebuffer:function(s){return k(s,r.allocBuffer(s.length))}},u.array={string:b,array:y,arraybuffer:function(s){return new Uint8Array(s).buffer},uint8array:function(s){return new Uint8Array(s)},nodebuffer:function(s){return r.newBufferFrom(s)}},u.arraybuffer={string:function(s){return b(new Uint8Array(s))},array:function(s){return a(new Uint8Array(s),new Array(s.byteLength))},arraybuffer:y,uint8array:function(s){return new Uint8Array(s)},nodebuffer:function(s){return r.newBufferFrom(new Uint8Array(s))}},u.uint8array={string:b,array:function(s){return a(s,new Array(s.length))},arraybuffer:function(s){return s.buffer},uint8array:y,nodebuffer:function(s){return r.newBufferFrom(s)}},u.nodebuffer={string:b,array:function(s){return a(s,new Array(s.length))},arraybuffer:function(s){return u.nodebuffer.uint8array(s).buffer},uint8array:function(s){return a(s,new Uint8Array(s.length))},nodebuffer:y},v.transformTo=function(s,c){if(c=c||"",!s)return c;v.checkSupport(s);var n=v.getTypeOf(c);return u[n][s](c)},v.resolve=function(s){for(var c=s.split("/"),n=[],p=0;p<c.length;p++){var w=c[p];w==="."||w===""&&p!==0&&p!==c.length-1||(w===".."?n.pop():n.push(w))}return n.join("/")},v.getTypeOf=function(s){return typeof s=="string"?"string":Object.prototype.toString.call(s)==="[object Array]"?"array":o.nodebuffer&&r.isBuffer(s)?"nodebuffer":o.uint8array&&s instanceof Uint8Array?"uint8array":o.arraybuffer&&s instanceof ArrayBuffer?"arraybuffer":void 0},v.checkSupport=function(s){if(!o[s.toLowerCase()])throw new Error(s+" is not supported by this platform")},v.MAX_VALUE_16BITS=65535,v.MAX_VALUE_32BITS=-1,v.pretty=function(s){var c,n,p="";for(n=0;n<(s||"").length;n++)p+="\\x"+((c=s.charCodeAt(n))<16?"0":"")+c.toString(16).toUpperCase();return p},v.delay=function(s,c,n){setImmediate(function(){s.apply(n||null,c||[])})},v.inherits=function(s,c){function n(){}n.prototype=c.prototype,s.prototype=new n},v.extend=function(){var s,c,n={};for(s=0;s<arguments.length;s++)for(c in arguments[s])Object.prototype.hasOwnProperty.call(arguments[s],c)&&n[c]===void 0&&(n[c]=arguments[s][c]);return n},v.prepareContent=function(s,c,n,p,w){return d.Promise.resolve(c).then(function(S){return o.blob&&(S instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(S))!==-1)&&typeof FileReader<"u"?new d.Promise(function(x,O){var D=new FileReader;D.onload=function(N){x(N.target.result)},D.onerror=function(N){O(N.target.error)},D.readAsArrayBuffer(S)}):S}).then(function(S){var x=v.getTypeOf(S);return x?(x==="arraybuffer"?S=v.transformTo("uint8array",S):x==="string"&&(w?S=l.decode(S):n&&p!==!0&&(S=(function(O){return k(O,o.uint8array?new Uint8Array(O.length):new Array(O.length))})(S))),S):d.Promise.reject(new Error("Can't read the data of '"+s+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(f,E,v){var o=f("./reader/readerFor"),l=f("./utils"),r=f("./signature"),d=f("./zipEntry"),y=f("./support");function k(m){this.files=[],this.loadOptions=m}k.prototype={checkSignature:function(m){if(!this.reader.readAndCheckSignature(m)){this.reader.index-=4;var b=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+l.pretty(b)+", expected "+l.pretty(m)+")")}},isSignature:function(m,b){var a=this.reader.index;this.reader.setIndex(m);var u=this.reader.readString(4)===b;return this.reader.setIndex(a),u},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var m=this.reader.readData(this.zipCommentLength),b=y.uint8array?"uint8array":"array",a=l.transformTo(b,m);this.zipComment=this.loadOptions.decodeFileName(a)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var m,b,a,u=this.zip64EndOfCentralSize-44;0<u;)m=this.reader.readInt(2),b=this.reader.readInt(4),a=this.reader.readData(b),this.zip64ExtensibleData[m]={id:m,length:b,value:a}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var m,b;for(m=0;m<this.files.length;m++)b=this.files[m],this.reader.setIndex(b.localHeaderOffset),this.checkSignature(r.LOCAL_FILE_HEADER),b.readLocalPart(this.reader),b.handleUTF8(),b.processAttributes()},readCentralDir:function(){var m;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(r.CENTRAL_FILE_HEADER);)(m=new d({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(m);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var m=this.reader.lastIndexOfSignature(r.CENTRAL_DIRECTORY_END);if(m<0)throw this.isSignature(0,r.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(m);var b=m;if(this.checkSignature(r.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===l.MAX_VALUE_16BITS||this.diskWithCentralDirStart===l.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===l.MAX_VALUE_16BITS||this.centralDirRecords===l.MAX_VALUE_16BITS||this.centralDirSize===l.MAX_VALUE_32BITS||this.centralDirOffset===l.MAX_VALUE_32BITS){if(this.zip64=!0,(m=this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(m),this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,r.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var a=this.centralDirOffset+this.centralDirSize;this.zip64&&(a+=20,a+=12+this.zip64EndOfCentralSize);var u=b-a;if(0<u)this.isSignature(b,r.CENTRAL_FILE_HEADER)||(this.reader.zero=u);else if(u<0)throw new Error("Corrupted zip: missing "+Math.abs(u)+" bytes.")},prepareReader:function(m){this.reader=o(m)},load:function(m){this.prepareReader(m),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},E.exports=k},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(f,E,v){var o=f("./reader/readerFor"),l=f("./utils"),r=f("./compressedObject"),d=f("./crc32"),y=f("./utf8"),k=f("./compressions"),m=f("./support");function b(a,u){this.options=a,this.loadOptions=u}b.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(a){var u,s;if(a.skip(22),this.fileNameLength=a.readInt(2),s=a.readInt(2),this.fileName=a.readData(this.fileNameLength),a.skip(s),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((u=(function(c){for(var n in k)if(Object.prototype.hasOwnProperty.call(k,n)&&k[n].magic===c)return k[n];return null})(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+l.pretty(this.compressionMethod)+" unknown (inner file : "+l.transformTo("string",this.fileName)+")");this.decompressed=new r(this.compressedSize,this.uncompressedSize,this.crc32,u,a.readData(this.compressedSize))},readCentralPart:function(a){this.versionMadeBy=a.readInt(2),a.skip(2),this.bitFlag=a.readInt(2),this.compressionMethod=a.readString(2),this.date=a.readDate(),this.crc32=a.readInt(4),this.compressedSize=a.readInt(4),this.uncompressedSize=a.readInt(4);var u=a.readInt(2);if(this.extraFieldsLength=a.readInt(2),this.fileCommentLength=a.readInt(2),this.diskNumberStart=a.readInt(2),this.internalFileAttributes=a.readInt(2),this.externalFileAttributes=a.readInt(4),this.localHeaderOffset=a.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");a.skip(u),this.readExtraFields(a),this.parseZIP64ExtraField(a),this.fileComment=a.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var a=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),a==0&&(this.dosPermissions=63&this.externalFileAttributes),a==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var a=o(this.extraFields[1].value);this.uncompressedSize===l.MAX_VALUE_32BITS&&(this.uncompressedSize=a.readInt(8)),this.compressedSize===l.MAX_VALUE_32BITS&&(this.compressedSize=a.readInt(8)),this.localHeaderOffset===l.MAX_VALUE_32BITS&&(this.localHeaderOffset=a.readInt(8)),this.diskNumberStart===l.MAX_VALUE_32BITS&&(this.diskNumberStart=a.readInt(4))}},readExtraFields:function(a){var u,s,c,n=a.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});a.index+4<n;)u=a.readInt(2),s=a.readInt(2),c=a.readData(s),this.extraFields[u]={id:u,length:s,value:c};a.setIndex(n)},handleUTF8:function(){var a=m.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=y.utf8decode(this.fileName),this.fileCommentStr=y.utf8decode(this.fileComment);else{var u=this.findExtraFieldUnicodePath();if(u!==null)this.fileNameStr=u;else{var s=l.transformTo(a,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(s)}var c=this.findExtraFieldUnicodeComment();if(c!==null)this.fileCommentStr=c;else{var n=l.transformTo(a,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(n)}}},findExtraFieldUnicodePath:function(){var a=this.extraFields[28789];if(a){var u=o(a.value);return u.readInt(1)!==1||d(this.fileName)!==u.readInt(4)?null:y.utf8decode(u.readData(a.length-5))}return null},findExtraFieldUnicodeComment:function(){var a=this.extraFields[25461];if(a){var u=o(a.value);return u.readInt(1)!==1||d(this.fileComment)!==u.readInt(4)?null:y.utf8decode(u.readData(a.length-5))}return null}},E.exports=b},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(f,E,v){function o(u,s,c){this.name=u,this.dir=c.dir,this.date=c.date,this.comment=c.comment,this.unixPermissions=c.unixPermissions,this.dosPermissions=c.dosPermissions,this._data=s,this._dataBinary=c.binary,this.options={compression:c.compression,compressionOptions:c.compressionOptions}}var l=f("./stream/StreamHelper"),r=f("./stream/DataWorker"),d=f("./utf8"),y=f("./compressedObject"),k=f("./stream/GenericWorker");o.prototype={internalStream:function(u){var s=null,c="string";try{if(!u)throw new Error("No output type specified.");var n=(c=u.toLowerCase())==="string"||c==="text";c!=="binarystring"&&c!=="text"||(c="string"),s=this._decompressWorker();var p=!this._dataBinary;p&&!n&&(s=s.pipe(new d.Utf8EncodeWorker)),!p&&n&&(s=s.pipe(new d.Utf8DecodeWorker))}catch(w){(s=new k("error")).error(w)}return new l(s,c,"")},async:function(u,s){return this.internalStream(u).accumulate(s)},nodeStream:function(u,s){return this.internalStream(u||"nodebuffer").toNodejsStream(s)},_compressWorker:function(u,s){if(this._data instanceof y&&this._data.compression.magic===u.magic)return this._data.getCompressedWorker();var c=this._decompressWorker();return this._dataBinary||(c=c.pipe(new d.Utf8EncodeWorker)),y.createWorkerFrom(c,u,s)},_decompressWorker:function(){return this._data instanceof y?this._data.getContentWorker():this._data instanceof k?this._data:new r(this._data)}};for(var m=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],b=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},a=0;a<m.length;a++)o.prototype[m[a]]=b;E.exports=o},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(f,E,v){(function(o){var l,r,d=o.MutationObserver||o.WebKitMutationObserver;if(d){var y=0,k=new d(u),m=o.document.createTextNode("");k.observe(m,{characterData:!0}),l=function(){m.data=y=++y%2}}else if(o.setImmediate||o.MessageChannel===void 0)l="document"in o&&"onreadystatechange"in o.document.createElement("script")?function(){var s=o.document.createElement("script");s.onreadystatechange=function(){u(),s.onreadystatechange=null,s.parentNode.removeChild(s),s=null},o.document.documentElement.appendChild(s)}:function(){setTimeout(u,0)};else{var b=new o.MessageChannel;b.port1.onmessage=u,l=function(){b.port2.postMessage(0)}}var a=[];function u(){var s,c;r=!0;for(var n=a.length;n;){for(c=a,a=[],s=-1;++s<n;)c[s]();n=a.length}r=!1}E.exports=function(s){a.push(s)!==1||r||l()}}).call(this,typeof xe<"u"?xe:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(f,E,v){var o=f("immediate");function l(){}var r={},d=["REJECTED"],y=["FULFILLED"],k=["PENDING"];function m(n){if(typeof n!="function")throw new TypeError("resolver must be a function");this.state=k,this.queue=[],this.outcome=void 0,n!==l&&s(this,n)}function b(n,p,w){this.promise=n,typeof p=="function"&&(this.onFulfilled=p,this.callFulfilled=this.otherCallFulfilled),typeof w=="function"&&(this.onRejected=w,this.callRejected=this.otherCallRejected)}function a(n,p,w){o(function(){var S;try{S=p(w)}catch(x){return r.reject(n,x)}S===n?r.reject(n,new TypeError("Cannot resolve promise with itself")):r.resolve(n,S)})}function u(n){var p=n&&n.then;if(n&&(typeof n=="object"||typeof n=="function")&&typeof p=="function")return function(){p.apply(n,arguments)}}function s(n,p){var w=!1;function S(D){w||(w=!0,r.reject(n,D))}function x(D){w||(w=!0,r.resolve(n,D))}var O=c(function(){p(x,S)});O.status==="error"&&S(O.value)}function c(n,p){var w={};try{w.value=n(p),w.status="success"}catch(S){w.status="error",w.value=S}return w}(E.exports=m).prototype.finally=function(n){if(typeof n!="function")return this;var p=this.constructor;return this.then(function(w){return p.resolve(n()).then(function(){return w})},function(w){return p.resolve(n()).then(function(){throw w})})},m.prototype.catch=function(n){return this.then(null,n)},m.prototype.then=function(n,p){if(typeof n!="function"&&this.state===y||typeof p!="function"&&this.state===d)return this;var w=new this.constructor(l);return this.state!==k?a(w,this.state===y?n:p,this.outcome):this.queue.push(new b(w,n,p)),w},b.prototype.callFulfilled=function(n){r.resolve(this.promise,n)},b.prototype.otherCallFulfilled=function(n){a(this.promise,this.onFulfilled,n)},b.prototype.callRejected=function(n){r.reject(this.promise,n)},b.prototype.otherCallRejected=function(n){a(this.promise,this.onRejected,n)},r.resolve=function(n,p){var w=c(u,p);if(w.status==="error")return r.reject(n,w.value);var S=w.value;if(S)s(n,S);else{n.state=y,n.outcome=p;for(var x=-1,O=n.queue.length;++x<O;)n.queue[x].callFulfilled(p)}return n},r.reject=function(n,p){n.state=d,n.outcome=p;for(var w=-1,S=n.queue.length;++w<S;)n.queue[w].callRejected(p);return n},m.resolve=function(n){return n instanceof this?n:r.resolve(new this(l),n)},m.reject=function(n){var p=new this(l);return r.reject(p,n)},m.all=function(n){var p=this;if(Object.prototype.toString.call(n)!=="[object Array]")return this.reject(new TypeError("must be an array"));var w=n.length,S=!1;if(!w)return this.resolve([]);for(var x=new Array(w),O=0,D=-1,N=new this(l);++D<w;)z(n[D],D);return N;function z(K,J){p.resolve(K).then(function(g){x[J]=g,++O!==w||S||(S=!0,r.resolve(N,x))},function(g){S||(S=!0,r.reject(N,g))})}},m.race=function(n){var p=this;if(Object.prototype.toString.call(n)!=="[object Array]")return this.reject(new TypeError("must be an array"));var w=n.length,S=!1;if(!w)return this.resolve([]);for(var x=-1,O=new this(l);++x<w;)D=n[x],p.resolve(D).then(function(N){S||(S=!0,r.resolve(O,N))},function(N){S||(S=!0,r.reject(O,N))});var D;return O}},{immediate:36}],38:[function(f,E,v){var o={};(0,f("./lib/utils/common").assign)(o,f("./lib/deflate"),f("./lib/inflate"),f("./lib/zlib/constants")),E.exports=o},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(f,E,v){var o=f("./zlib/deflate"),l=f("./utils/common"),r=f("./utils/strings"),d=f("./zlib/messages"),y=f("./zlib/zstream"),k=Object.prototype.toString,m=0,b=-1,a=0,u=8;function s(n){if(!(this instanceof s))return new s(n);this.options=l.assign({level:b,method:u,chunkSize:16384,windowBits:15,memLevel:8,strategy:a,to:""},n||{});var p=this.options;p.raw&&0<p.windowBits?p.windowBits=-p.windowBits:p.gzip&&0<p.windowBits&&p.windowBits<16&&(p.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new y,this.strm.avail_out=0;var w=o.deflateInit2(this.strm,p.level,p.method,p.windowBits,p.memLevel,p.strategy);if(w!==m)throw new Error(d[w]);if(p.header&&o.deflateSetHeader(this.strm,p.header),p.dictionary){var S;if(S=typeof p.dictionary=="string"?r.string2buf(p.dictionary):k.call(p.dictionary)==="[object ArrayBuffer]"?new Uint8Array(p.dictionary):p.dictionary,(w=o.deflateSetDictionary(this.strm,S))!==m)throw new Error(d[w]);this._dict_set=!0}}function c(n,p){var w=new s(p);if(w.push(n,!0),w.err)throw w.msg||d[w.err];return w.result}s.prototype.push=function(n,p){var w,S,x=this.strm,O=this.options.chunkSize;if(this.ended)return!1;S=p===~~p?p:p===!0?4:0,typeof n=="string"?x.input=r.string2buf(n):k.call(n)==="[object ArrayBuffer]"?x.input=new Uint8Array(n):x.input=n,x.next_in=0,x.avail_in=x.input.length;do{if(x.avail_out===0&&(x.output=new l.Buf8(O),x.next_out=0,x.avail_out=O),(w=o.deflate(x,S))!==1&&w!==m)return this.onEnd(w),!(this.ended=!0);x.avail_out!==0&&(x.avail_in!==0||S!==4&&S!==2)||(this.options.to==="string"?this.onData(r.buf2binstring(l.shrinkBuf(x.output,x.next_out))):this.onData(l.shrinkBuf(x.output,x.next_out)))}while((0<x.avail_in||x.avail_out===0)&&w!==1);return S===4?(w=o.deflateEnd(this.strm),this.onEnd(w),this.ended=!0,w===m):S!==2||(this.onEnd(m),!(x.avail_out=0))},s.prototype.onData=function(n){this.chunks.push(n)},s.prototype.onEnd=function(n){n===m&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=l.flattenChunks(this.chunks)),this.chunks=[],this.err=n,this.msg=this.strm.msg},v.Deflate=s,v.deflate=c,v.deflateRaw=function(n,p){return(p=p||{}).raw=!0,c(n,p)},v.gzip=function(n,p){return(p=p||{}).gzip=!0,c(n,p)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(f,E,v){var o=f("./zlib/inflate"),l=f("./utils/common"),r=f("./utils/strings"),d=f("./zlib/constants"),y=f("./zlib/messages"),k=f("./zlib/zstream"),m=f("./zlib/gzheader"),b=Object.prototype.toString;function a(s){if(!(this instanceof a))return new a(s);this.options=l.assign({chunkSize:16384,windowBits:0,to:""},s||{});var c=this.options;c.raw&&0<=c.windowBits&&c.windowBits<16&&(c.windowBits=-c.windowBits,c.windowBits===0&&(c.windowBits=-15)),!(0<=c.windowBits&&c.windowBits<16)||s&&s.windowBits||(c.windowBits+=32),15<c.windowBits&&c.windowBits<48&&(15&c.windowBits)==0&&(c.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new k,this.strm.avail_out=0;var n=o.inflateInit2(this.strm,c.windowBits);if(n!==d.Z_OK)throw new Error(y[n]);this.header=new m,o.inflateGetHeader(this.strm,this.header)}function u(s,c){var n=new a(c);if(n.push(s,!0),n.err)throw n.msg||y[n.err];return n.result}a.prototype.push=function(s,c){var n,p,w,S,x,O,D=this.strm,N=this.options.chunkSize,z=this.options.dictionary,K=!1;if(this.ended)return!1;p=c===~~c?c:c===!0?d.Z_FINISH:d.Z_NO_FLUSH,typeof s=="string"?D.input=r.binstring2buf(s):b.call(s)==="[object ArrayBuffer]"?D.input=new Uint8Array(s):D.input=s,D.next_in=0,D.avail_in=D.input.length;do{if(D.avail_out===0&&(D.output=new l.Buf8(N),D.next_out=0,D.avail_out=N),(n=o.inflate(D,d.Z_NO_FLUSH))===d.Z_NEED_DICT&&z&&(O=typeof z=="string"?r.string2buf(z):b.call(z)==="[object ArrayBuffer]"?new Uint8Array(z):z,n=o.inflateSetDictionary(this.strm,O)),n===d.Z_BUF_ERROR&&K===!0&&(n=d.Z_OK,K=!1),n!==d.Z_STREAM_END&&n!==d.Z_OK)return this.onEnd(n),!(this.ended=!0);D.next_out&&(D.avail_out!==0&&n!==d.Z_STREAM_END&&(D.avail_in!==0||p!==d.Z_FINISH&&p!==d.Z_SYNC_FLUSH)||(this.options.to==="string"?(w=r.utf8border(D.output,D.next_out),S=D.next_out-w,x=r.buf2string(D.output,w),D.next_out=S,D.avail_out=N-S,S&&l.arraySet(D.output,D.output,w,S,0),this.onData(x)):this.onData(l.shrinkBuf(D.output,D.next_out)))),D.avail_in===0&&D.avail_out===0&&(K=!0)}while((0<D.avail_in||D.avail_out===0)&&n!==d.Z_STREAM_END);return n===d.Z_STREAM_END&&(p=d.Z_FINISH),p===d.Z_FINISH?(n=o.inflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===d.Z_OK):p!==d.Z_SYNC_FLUSH||(this.onEnd(d.Z_OK),!(D.avail_out=0))},a.prototype.onData=function(s){this.chunks.push(s)},a.prototype.onEnd=function(s){s===d.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=l.flattenChunks(this.chunks)),this.chunks=[],this.err=s,this.msg=this.strm.msg},v.Inflate=a,v.inflate=u,v.inflateRaw=function(s,c){return(c=c||{}).raw=!0,u(s,c)},v.ungzip=u},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(f,E,v){var o=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";v.assign=function(d){for(var y=Array.prototype.slice.call(arguments,1);y.length;){var k=y.shift();if(k){if(typeof k!="object")throw new TypeError(k+"must be non-object");for(var m in k)k.hasOwnProperty(m)&&(d[m]=k[m])}}return d},v.shrinkBuf=function(d,y){return d.length===y?d:d.subarray?d.subarray(0,y):(d.length=y,d)};var l={arraySet:function(d,y,k,m,b){if(y.subarray&&d.subarray)d.set(y.subarray(k,k+m),b);else for(var a=0;a<m;a++)d[b+a]=y[k+a]},flattenChunks:function(d){var y,k,m,b,a,u;for(y=m=0,k=d.length;y<k;y++)m+=d[y].length;for(u=new Uint8Array(m),y=b=0,k=d.length;y<k;y++)a=d[y],u.set(a,b),b+=a.length;return u}},r={arraySet:function(d,y,k,m,b){for(var a=0;a<m;a++)d[b+a]=y[k+a]},flattenChunks:function(d){return[].concat.apply([],d)}};v.setTyped=function(d){d?(v.Buf8=Uint8Array,v.Buf16=Uint16Array,v.Buf32=Int32Array,v.assign(v,l)):(v.Buf8=Array,v.Buf16=Array,v.Buf32=Array,v.assign(v,r))},v.setTyped(o)},{}],42:[function(f,E,v){var o=f("./common"),l=!0,r=!0;try{String.fromCharCode.apply(null,[0])}catch{l=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{r=!1}for(var d=new o.Buf8(256),y=0;y<256;y++)d[y]=252<=y?6:248<=y?5:240<=y?4:224<=y?3:192<=y?2:1;function k(m,b){if(b<65537&&(m.subarray&&r||!m.subarray&&l))return String.fromCharCode.apply(null,o.shrinkBuf(m,b));for(var a="",u=0;u<b;u++)a+=String.fromCharCode(m[u]);return a}d[254]=d[254]=1,v.string2buf=function(m){var b,a,u,s,c,n=m.length,p=0;for(s=0;s<n;s++)(64512&(a=m.charCodeAt(s)))==55296&&s+1<n&&(64512&(u=m.charCodeAt(s+1)))==56320&&(a=65536+(a-55296<<10)+(u-56320),s++),p+=a<128?1:a<2048?2:a<65536?3:4;for(b=new o.Buf8(p),s=c=0;c<p;s++)(64512&(a=m.charCodeAt(s)))==55296&&s+1<n&&(64512&(u=m.charCodeAt(s+1)))==56320&&(a=65536+(a-55296<<10)+(u-56320),s++),a<128?b[c++]=a:(a<2048?b[c++]=192|a>>>6:(a<65536?b[c++]=224|a>>>12:(b[c++]=240|a>>>18,b[c++]=128|a>>>12&63),b[c++]=128|a>>>6&63),b[c++]=128|63&a);return b},v.buf2binstring=function(m){return k(m,m.length)},v.binstring2buf=function(m){for(var b=new o.Buf8(m.length),a=0,u=b.length;a<u;a++)b[a]=m.charCodeAt(a);return b},v.buf2string=function(m,b){var a,u,s,c,n=b||m.length,p=new Array(2*n);for(a=u=0;a<n;)if((s=m[a++])<128)p[u++]=s;else if(4<(c=d[s]))p[u++]=65533,a+=c-1;else{for(s&=c===2?31:c===3?15:7;1<c&&a<n;)s=s<<6|63&m[a++],c--;1<c?p[u++]=65533:s<65536?p[u++]=s:(s-=65536,p[u++]=55296|s>>10&1023,p[u++]=56320|1023&s)}return k(p,u)},v.utf8border=function(m,b){var a;for((b=b||m.length)>m.length&&(b=m.length),a=b-1;0<=a&&(192&m[a])==128;)a--;return a<0||a===0?b:a+d[m[a]]>b?a:b}},{"./common":41}],43:[function(f,E,v){E.exports=function(o,l,r,d){for(var y=65535&o|0,k=o>>>16&65535|0,m=0;r!==0;){for(r-=m=2e3<r?2e3:r;k=k+(y=y+l[d++]|0)|0,--m;);y%=65521,k%=65521}return y|k<<16|0}},{}],44:[function(f,E,v){E.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(f,E,v){var o=(function(){for(var l,r=[],d=0;d<256;d++){l=d;for(var y=0;y<8;y++)l=1&l?3988292384^l>>>1:l>>>1;r[d]=l}return r})();E.exports=function(l,r,d,y){var k=o,m=y+d;l^=-1;for(var b=y;b<m;b++)l=l>>>8^k[255&(l^r[b])];return-1^l}},{}],46:[function(f,E,v){var o,l=f("../utils/common"),r=f("./trees"),d=f("./adler32"),y=f("./crc32"),k=f("./messages"),m=0,b=4,a=0,u=-2,s=-1,c=4,n=2,p=8,w=9,S=286,x=30,O=19,D=2*S+1,N=15,z=3,K=258,J=K+z+1,g=42,T=113,t=1,U=2,ee=3,F=4;function te(e,R){return e.msg=k[R],R}function L(e){return(e<<1)-(4<e?9:0)}function X(e){for(var R=e.length;0<=--R;)e[R]=0}function I(e){var R=e.state,C=R.pending;C>e.avail_out&&(C=e.avail_out),C!==0&&(l.arraySet(e.output,R.pending_buf,R.pending_out,C,e.next_out),e.next_out+=C,R.pending_out+=C,e.total_out+=C,e.avail_out-=C,R.pending-=C,R.pending===0&&(R.pending_out=0))}function A(e,R){r._tr_flush_block(e,0<=e.block_start?e.block_start:-1,e.strstart-e.block_start,R),e.block_start=e.strstart,I(e.strm)}function $(e,R){e.pending_buf[e.pending++]=R}function Y(e,R){e.pending_buf[e.pending++]=R>>>8&255,e.pending_buf[e.pending++]=255&R}function Z(e,R){var C,h,i=e.max_chain_length,_=e.strstart,j=e.prev_length,G=e.nice_match,P=e.strstart>e.w_size-J?e.strstart-(e.w_size-J):0,M=e.window,H=e.w_mask,W=e.prev,V=e.strstart+K,ne=M[_+j-1],re=M[_+j];e.prev_length>=e.good_match&&(i>>=2),G>e.lookahead&&(G=e.lookahead);do if(M[(C=R)+j]===re&&M[C+j-1]===ne&&M[C]===M[_]&&M[++C]===M[_+1]){_+=2,C++;do;while(M[++_]===M[++C]&&M[++_]===M[++C]&&M[++_]===M[++C]&&M[++_]===M[++C]&&M[++_]===M[++C]&&M[++_]===M[++C]&&M[++_]===M[++C]&&M[++_]===M[++C]&&_<V);if(h=K-(V-_),_=V-K,j<h){if(e.match_start=R,G<=(j=h))break;ne=M[_+j-1],re=M[_+j]}}while((R=W[R&H])>P&&--i!=0);return j<=e.lookahead?j:e.lookahead}function ie(e){var R,C,h,i,_,j,G,P,M,H,W=e.w_size;do{if(i=e.window_size-e.lookahead-e.strstart,e.strstart>=W+(W-J)){for(l.arraySet(e.window,e.window,W,W,0),e.match_start-=W,e.strstart-=W,e.block_start-=W,R=C=e.hash_size;h=e.head[--R],e.head[R]=W<=h?h-W:0,--C;);for(R=C=W;h=e.prev[--R],e.prev[R]=W<=h?h-W:0,--C;);i+=W}if(e.strm.avail_in===0)break;if(j=e.strm,G=e.window,P=e.strstart+e.lookahead,M=i,H=void 0,H=j.avail_in,M<H&&(H=M),C=H===0?0:(j.avail_in-=H,l.arraySet(G,j.input,j.next_in,H,P),j.state.wrap===1?j.adler=d(j.adler,G,H,P):j.state.wrap===2&&(j.adler=y(j.adler,G,H,P)),j.next_in+=H,j.total_in+=H,H),e.lookahead+=C,e.lookahead+e.insert>=z)for(_=e.strstart-e.insert,e.ins_h=e.window[_],e.ins_h=(e.ins_h<<e.hash_shift^e.window[_+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[_+z-1])&e.hash_mask,e.prev[_&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=_,_++,e.insert--,!(e.lookahead+e.insert<z)););}while(e.lookahead<J&&e.strm.avail_in!==0)}function ce(e,R){for(var C,h;;){if(e.lookahead<J){if(ie(e),e.lookahead<J&&R===m)return t;if(e.lookahead===0)break}if(C=0,e.lookahead>=z&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+z-1])&e.hash_mask,C=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),C!==0&&e.strstart-C<=e.w_size-J&&(e.match_length=Z(e,C)),e.match_length>=z)if(h=r._tr_tally(e,e.strstart-e.match_start,e.match_length-z),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=z){for(e.match_length--;e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+z-1])&e.hash_mask,C=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart,--e.match_length!=0;);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask;else h=r._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(h&&(A(e,!1),e.strm.avail_out===0))return t}return e.insert=e.strstart<z-1?e.strstart:z-1,R===b?(A(e,!0),e.strm.avail_out===0?ee:F):e.last_lit&&(A(e,!1),e.strm.avail_out===0)?t:U}function se(e,R){for(var C,h,i;;){if(e.lookahead<J){if(ie(e),e.lookahead<J&&R===m)return t;if(e.lookahead===0)break}if(C=0,e.lookahead>=z&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+z-1])&e.hash_mask,C=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=z-1,C!==0&&e.prev_length<e.max_lazy_match&&e.strstart-C<=e.w_size-J&&(e.match_length=Z(e,C),e.match_length<=5&&(e.strategy===1||e.match_length===z&&4096<e.strstart-e.match_start)&&(e.match_length=z-1)),e.prev_length>=z&&e.match_length<=e.prev_length){for(i=e.strstart+e.lookahead-z,h=r._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-z),e.lookahead-=e.prev_length-1,e.prev_length-=2;++e.strstart<=i&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+z-1])&e.hash_mask,C=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),--e.prev_length!=0;);if(e.match_available=0,e.match_length=z-1,e.strstart++,h&&(A(e,!1),e.strm.avail_out===0))return t}else if(e.match_available){if((h=r._tr_tally(e,0,e.window[e.strstart-1]))&&A(e,!1),e.strstart++,e.lookahead--,e.strm.avail_out===0)return t}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&(h=r._tr_tally(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<z-1?e.strstart:z-1,R===b?(A(e,!0),e.strm.avail_out===0?ee:F):e.last_lit&&(A(e,!1),e.strm.avail_out===0)?t:U}function ae(e,R,C,h,i){this.good_length=e,this.max_lazy=R,this.nice_length=C,this.max_chain=h,this.func=i}function de(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=p,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new l.Buf16(2*D),this.dyn_dtree=new l.Buf16(2*(2*x+1)),this.bl_tree=new l.Buf16(2*(2*O+1)),X(this.dyn_ltree),X(this.dyn_dtree),X(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new l.Buf16(N+1),this.heap=new l.Buf16(2*S+1),X(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new l.Buf16(2*S+1),X(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function oe(e){var R;return e&&e.state?(e.total_in=e.total_out=0,e.data_type=n,(R=e.state).pending=0,R.pending_out=0,R.wrap<0&&(R.wrap=-R.wrap),R.status=R.wrap?g:T,e.adler=R.wrap===2?0:1,R.last_flush=m,r._tr_init(R),a):te(e,u)}function fe(e){var R=oe(e);return R===a&&(function(C){C.window_size=2*C.w_size,X(C.head),C.max_lazy_match=o[C.level].max_lazy,C.good_match=o[C.level].good_length,C.nice_match=o[C.level].nice_length,C.max_chain_length=o[C.level].max_chain,C.strstart=0,C.block_start=0,C.lookahead=0,C.insert=0,C.match_length=C.prev_length=z-1,C.match_available=0,C.ins_h=0})(e.state),R}function ue(e,R,C,h,i,_){if(!e)return u;var j=1;if(R===s&&(R=6),h<0?(j=0,h=-h):15<h&&(j=2,h-=16),i<1||w<i||C!==p||h<8||15<h||R<0||9<R||_<0||c<_)return te(e,u);h===8&&(h=9);var G=new de;return(e.state=G).strm=e,G.wrap=j,G.gzhead=null,G.w_bits=h,G.w_size=1<<G.w_bits,G.w_mask=G.w_size-1,G.hash_bits=i+7,G.hash_size=1<<G.hash_bits,G.hash_mask=G.hash_size-1,G.hash_shift=~~((G.hash_bits+z-1)/z),G.window=new l.Buf8(2*G.w_size),G.head=new l.Buf16(G.hash_size),G.prev=new l.Buf16(G.w_size),G.lit_bufsize=1<<i+6,G.pending_buf_size=4*G.lit_bufsize,G.pending_buf=new l.Buf8(G.pending_buf_size),G.d_buf=1*G.lit_bufsize,G.l_buf=3*G.lit_bufsize,G.level=R,G.strategy=_,G.method=C,fe(e)}o=[new ae(0,0,0,0,function(e,R){var C=65535;for(C>e.pending_buf_size-5&&(C=e.pending_buf_size-5);;){if(e.lookahead<=1){if(ie(e),e.lookahead===0&&R===m)return t;if(e.lookahead===0)break}e.strstart+=e.lookahead,e.lookahead=0;var h=e.block_start+C;if((e.strstart===0||e.strstart>=h)&&(e.lookahead=e.strstart-h,e.strstart=h,A(e,!1),e.strm.avail_out===0)||e.strstart-e.block_start>=e.w_size-J&&(A(e,!1),e.strm.avail_out===0))return t}return e.insert=0,R===b?(A(e,!0),e.strm.avail_out===0?ee:F):(e.strstart>e.block_start&&(A(e,!1),e.strm.avail_out),t)}),new ae(4,4,8,4,ce),new ae(4,5,16,8,ce),new ae(4,6,32,32,ce),new ae(4,4,16,16,se),new ae(8,16,32,32,se),new ae(8,16,128,128,se),new ae(8,32,128,256,se),new ae(32,128,258,1024,se),new ae(32,258,258,4096,se)],v.deflateInit=function(e,R){return ue(e,R,p,15,8,0)},v.deflateInit2=ue,v.deflateReset=fe,v.deflateResetKeep=oe,v.deflateSetHeader=function(e,R){return e&&e.state?e.state.wrap!==2?u:(e.state.gzhead=R,a):u},v.deflate=function(e,R){var C,h,i,_;if(!e||!e.state||5<R||R<0)return e?te(e,u):u;if(h=e.state,!e.output||!e.input&&e.avail_in!==0||h.status===666&&R!==b)return te(e,e.avail_out===0?-5:u);if(h.strm=e,C=h.last_flush,h.last_flush=R,h.status===g)if(h.wrap===2)e.adler=0,$(h,31),$(h,139),$(h,8),h.gzhead?($(h,(h.gzhead.text?1:0)+(h.gzhead.hcrc?2:0)+(h.gzhead.extra?4:0)+(h.gzhead.name?8:0)+(h.gzhead.comment?16:0)),$(h,255&h.gzhead.time),$(h,h.gzhead.time>>8&255),$(h,h.gzhead.time>>16&255),$(h,h.gzhead.time>>24&255),$(h,h.level===9?2:2<=h.strategy||h.level<2?4:0),$(h,255&h.gzhead.os),h.gzhead.extra&&h.gzhead.extra.length&&($(h,255&h.gzhead.extra.length),$(h,h.gzhead.extra.length>>8&255)),h.gzhead.hcrc&&(e.adler=y(e.adler,h.pending_buf,h.pending,0)),h.gzindex=0,h.status=69):($(h,0),$(h,0),$(h,0),$(h,0),$(h,0),$(h,h.level===9?2:2<=h.strategy||h.level<2?4:0),$(h,3),h.status=T);else{var j=p+(h.w_bits-8<<4)<<8;j|=(2<=h.strategy||h.level<2?0:h.level<6?1:h.level===6?2:3)<<6,h.strstart!==0&&(j|=32),j+=31-j%31,h.status=T,Y(h,j),h.strstart!==0&&(Y(h,e.adler>>>16),Y(h,65535&e.adler)),e.adler=1}if(h.status===69)if(h.gzhead.extra){for(i=h.pending;h.gzindex<(65535&h.gzhead.extra.length)&&(h.pending!==h.pending_buf_size||(h.gzhead.hcrc&&h.pending>i&&(e.adler=y(e.adler,h.pending_buf,h.pending-i,i)),I(e),i=h.pending,h.pending!==h.pending_buf_size));)$(h,255&h.gzhead.extra[h.gzindex]),h.gzindex++;h.gzhead.hcrc&&h.pending>i&&(e.adler=y(e.adler,h.pending_buf,h.pending-i,i)),h.gzindex===h.gzhead.extra.length&&(h.gzindex=0,h.status=73)}else h.status=73;if(h.status===73)if(h.gzhead.name){i=h.pending;do{if(h.pending===h.pending_buf_size&&(h.gzhead.hcrc&&h.pending>i&&(e.adler=y(e.adler,h.pending_buf,h.pending-i,i)),I(e),i=h.pending,h.pending===h.pending_buf_size)){_=1;break}_=h.gzindex<h.gzhead.name.length?255&h.gzhead.name.charCodeAt(h.gzindex++):0,$(h,_)}while(_!==0);h.gzhead.hcrc&&h.pending>i&&(e.adler=y(e.adler,h.pending_buf,h.pending-i,i)),_===0&&(h.gzindex=0,h.status=91)}else h.status=91;if(h.status===91)if(h.gzhead.comment){i=h.pending;do{if(h.pending===h.pending_buf_size&&(h.gzhead.hcrc&&h.pending>i&&(e.adler=y(e.adler,h.pending_buf,h.pending-i,i)),I(e),i=h.pending,h.pending===h.pending_buf_size)){_=1;break}_=h.gzindex<h.gzhead.comment.length?255&h.gzhead.comment.charCodeAt(h.gzindex++):0,$(h,_)}while(_!==0);h.gzhead.hcrc&&h.pending>i&&(e.adler=y(e.adler,h.pending_buf,h.pending-i,i)),_===0&&(h.status=103)}else h.status=103;if(h.status===103&&(h.gzhead.hcrc?(h.pending+2>h.pending_buf_size&&I(e),h.pending+2<=h.pending_buf_size&&($(h,255&e.adler),$(h,e.adler>>8&255),e.adler=0,h.status=T)):h.status=T),h.pending!==0){if(I(e),e.avail_out===0)return h.last_flush=-1,a}else if(e.avail_in===0&&L(R)<=L(C)&&R!==b)return te(e,-5);if(h.status===666&&e.avail_in!==0)return te(e,-5);if(e.avail_in!==0||h.lookahead!==0||R!==m&&h.status!==666){var G=h.strategy===2?(function(P,M){for(var H;;){if(P.lookahead===0&&(ie(P),P.lookahead===0)){if(M===m)return t;break}if(P.match_length=0,H=r._tr_tally(P,0,P.window[P.strstart]),P.lookahead--,P.strstart++,H&&(A(P,!1),P.strm.avail_out===0))return t}return P.insert=0,M===b?(A(P,!0),P.strm.avail_out===0?ee:F):P.last_lit&&(A(P,!1),P.strm.avail_out===0)?t:U})(h,R):h.strategy===3?(function(P,M){for(var H,W,V,ne,re=P.window;;){if(P.lookahead<=K){if(ie(P),P.lookahead<=K&&M===m)return t;if(P.lookahead===0)break}if(P.match_length=0,P.lookahead>=z&&0<P.strstart&&(W=re[V=P.strstart-1])===re[++V]&&W===re[++V]&&W===re[++V]){ne=P.strstart+K;do;while(W===re[++V]&&W===re[++V]&&W===re[++V]&&W===re[++V]&&W===re[++V]&&W===re[++V]&&W===re[++V]&&W===re[++V]&&V<ne);P.match_length=K-(ne-V),P.match_length>P.lookahead&&(P.match_length=P.lookahead)}if(P.match_length>=z?(H=r._tr_tally(P,1,P.match_length-z),P.lookahead-=P.match_length,P.strstart+=P.match_length,P.match_length=0):(H=r._tr_tally(P,0,P.window[P.strstart]),P.lookahead--,P.strstart++),H&&(A(P,!1),P.strm.avail_out===0))return t}return P.insert=0,M===b?(A(P,!0),P.strm.avail_out===0?ee:F):P.last_lit&&(A(P,!1),P.strm.avail_out===0)?t:U})(h,R):o[h.level].func(h,R);if(G!==ee&&G!==F||(h.status=666),G===t||G===ee)return e.avail_out===0&&(h.last_flush=-1),a;if(G===U&&(R===1?r._tr_align(h):R!==5&&(r._tr_stored_block(h,0,0,!1),R===3&&(X(h.head),h.lookahead===0&&(h.strstart=0,h.block_start=0,h.insert=0))),I(e),e.avail_out===0))return h.last_flush=-1,a}return R!==b?a:h.wrap<=0?1:(h.wrap===2?($(h,255&e.adler),$(h,e.adler>>8&255),$(h,e.adler>>16&255),$(h,e.adler>>24&255),$(h,255&e.total_in),$(h,e.total_in>>8&255),$(h,e.total_in>>16&255),$(h,e.total_in>>24&255)):(Y(h,e.adler>>>16),Y(h,65535&e.adler)),I(e),0<h.wrap&&(h.wrap=-h.wrap),h.pending!==0?a:1)},v.deflateEnd=function(e){var R;return e&&e.state?(R=e.state.status)!==g&&R!==69&&R!==73&&R!==91&&R!==103&&R!==T&&R!==666?te(e,u):(e.state=null,R===T?te(e,-3):a):u},v.deflateSetDictionary=function(e,R){var C,h,i,_,j,G,P,M,H=R.length;if(!e||!e.state||(_=(C=e.state).wrap)===2||_===1&&C.status!==g||C.lookahead)return u;for(_===1&&(e.adler=d(e.adler,R,H,0)),C.wrap=0,H>=C.w_size&&(_===0&&(X(C.head),C.strstart=0,C.block_start=0,C.insert=0),M=new l.Buf8(C.w_size),l.arraySet(M,R,H-C.w_size,C.w_size,0),R=M,H=C.w_size),j=e.avail_in,G=e.next_in,P=e.input,e.avail_in=H,e.next_in=0,e.input=R,ie(C);C.lookahead>=z;){for(h=C.strstart,i=C.lookahead-(z-1);C.ins_h=(C.ins_h<<C.hash_shift^C.window[h+z-1])&C.hash_mask,C.prev[h&C.w_mask]=C.head[C.ins_h],C.head[C.ins_h]=h,h++,--i;);C.strstart=h,C.lookahead=z-1,ie(C)}return C.strstart+=C.lookahead,C.block_start=C.strstart,C.insert=C.lookahead,C.lookahead=0,C.match_length=C.prev_length=z-1,C.match_available=0,e.next_in=G,e.input=P,e.avail_in=j,C.wrap=_,a},v.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(f,E,v){E.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(f,E,v){E.exports=function(o,l){var r,d,y,k,m,b,a,u,s,c,n,p,w,S,x,O,D,N,z,K,J,g,T,t,U;r=o.state,d=o.next_in,t=o.input,y=d+(o.avail_in-5),k=o.next_out,U=o.output,m=k-(l-o.avail_out),b=k+(o.avail_out-257),a=r.dmax,u=r.wsize,s=r.whave,c=r.wnext,n=r.window,p=r.hold,w=r.bits,S=r.lencode,x=r.distcode,O=(1<<r.lenbits)-1,D=(1<<r.distbits)-1;e:do{w<15&&(p+=t[d++]<<w,w+=8,p+=t[d++]<<w,w+=8),N=S[p&O];t:for(;;){if(p>>>=z=N>>>24,w-=z,(z=N>>>16&255)===0)U[k++]=65535&N;else{if(!(16&z)){if((64&z)==0){N=S[(65535&N)+(p&(1<<z)-1)];continue t}if(32&z){r.mode=12;break e}o.msg="invalid literal/length code",r.mode=30;break e}K=65535&N,(z&=15)&&(w<z&&(p+=t[d++]<<w,w+=8),K+=p&(1<<z)-1,p>>>=z,w-=z),w<15&&(p+=t[d++]<<w,w+=8,p+=t[d++]<<w,w+=8),N=x[p&D];s:for(;;){if(p>>>=z=N>>>24,w-=z,!(16&(z=N>>>16&255))){if((64&z)==0){N=x[(65535&N)+(p&(1<<z)-1)];continue s}o.msg="invalid distance code",r.mode=30;break e}if(J=65535&N,w<(z&=15)&&(p+=t[d++]<<w,(w+=8)<z&&(p+=t[d++]<<w,w+=8)),a<(J+=p&(1<<z)-1)){o.msg="invalid distance too far back",r.mode=30;break e}if(p>>>=z,w-=z,(z=k-m)<J){if(s<(z=J-z)&&r.sane){o.msg="invalid distance too far back",r.mode=30;break e}if(T=n,(g=0)===c){if(g+=u-z,z<K){for(K-=z;U[k++]=n[g++],--z;);g=k-J,T=U}}else if(c<z){if(g+=u+c-z,(z-=c)<K){for(K-=z;U[k++]=n[g++],--z;);if(g=0,c<K){for(K-=z=c;U[k++]=n[g++],--z;);g=k-J,T=U}}}else if(g+=c-z,z<K){for(K-=z;U[k++]=n[g++],--z;);g=k-J,T=U}for(;2<K;)U[k++]=T[g++],U[k++]=T[g++],U[k++]=T[g++],K-=3;K&&(U[k++]=T[g++],1<K&&(U[k++]=T[g++]))}else{for(g=k-J;U[k++]=U[g++],U[k++]=U[g++],U[k++]=U[g++],2<(K-=3););K&&(U[k++]=U[g++],1<K&&(U[k++]=U[g++]))}break}}break}}while(d<y&&k<b);d-=K=w>>3,p&=(1<<(w-=K<<3))-1,o.next_in=d,o.next_out=k,o.avail_in=d<y?y-d+5:5-(d-y),o.avail_out=k<b?b-k+257:257-(k-b),r.hold=p,r.bits=w}},{}],49:[function(f,E,v){var o=f("../utils/common"),l=f("./adler32"),r=f("./crc32"),d=f("./inffast"),y=f("./inftrees"),k=1,m=2,b=0,a=-2,u=1,s=852,c=592;function n(g){return(g>>>24&255)+(g>>>8&65280)+((65280&g)<<8)+((255&g)<<24)}function p(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new o.Buf16(320),this.work=new o.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function w(g){var T;return g&&g.state?(T=g.state,g.total_in=g.total_out=T.total=0,g.msg="",T.wrap&&(g.adler=1&T.wrap),T.mode=u,T.last=0,T.havedict=0,T.dmax=32768,T.head=null,T.hold=0,T.bits=0,T.lencode=T.lendyn=new o.Buf32(s),T.distcode=T.distdyn=new o.Buf32(c),T.sane=1,T.back=-1,b):a}function S(g){var T;return g&&g.state?((T=g.state).wsize=0,T.whave=0,T.wnext=0,w(g)):a}function x(g,T){var t,U;return g&&g.state?(U=g.state,T<0?(t=0,T=-T):(t=1+(T>>4),T<48&&(T&=15)),T&&(T<8||15<T)?a:(U.window!==null&&U.wbits!==T&&(U.window=null),U.wrap=t,U.wbits=T,S(g))):a}function O(g,T){var t,U;return g?(U=new p,(g.state=U).window=null,(t=x(g,T))!==b&&(g.state=null),t):a}var D,N,z=!0;function K(g){if(z){var T;for(D=new o.Buf32(512),N=new o.Buf32(32),T=0;T<144;)g.lens[T++]=8;for(;T<256;)g.lens[T++]=9;for(;T<280;)g.lens[T++]=7;for(;T<288;)g.lens[T++]=8;for(y(k,g.lens,0,288,D,0,g.work,{bits:9}),T=0;T<32;)g.lens[T++]=5;y(m,g.lens,0,32,N,0,g.work,{bits:5}),z=!1}g.lencode=D,g.lenbits=9,g.distcode=N,g.distbits=5}function J(g,T,t,U){var ee,F=g.state;return F.window===null&&(F.wsize=1<<F.wbits,F.wnext=0,F.whave=0,F.window=new o.Buf8(F.wsize)),U>=F.wsize?(o.arraySet(F.window,T,t-F.wsize,F.wsize,0),F.wnext=0,F.whave=F.wsize):(U<(ee=F.wsize-F.wnext)&&(ee=U),o.arraySet(F.window,T,t-U,ee,F.wnext),(U-=ee)?(o.arraySet(F.window,T,t-U,U,0),F.wnext=U,F.whave=F.wsize):(F.wnext+=ee,F.wnext===F.wsize&&(F.wnext=0),F.whave<F.wsize&&(F.whave+=ee))),0}v.inflateReset=S,v.inflateReset2=x,v.inflateResetKeep=w,v.inflateInit=function(g){return O(g,15)},v.inflateInit2=O,v.inflate=function(g,T){var t,U,ee,F,te,L,X,I,A,$,Y,Z,ie,ce,se,ae,de,oe,fe,ue,e,R,C,h,i=0,_=new o.Buf8(4),j=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!g||!g.state||!g.output||!g.input&&g.avail_in!==0)return a;(t=g.state).mode===12&&(t.mode=13),te=g.next_out,ee=g.output,X=g.avail_out,F=g.next_in,U=g.input,L=g.avail_in,I=t.hold,A=t.bits,$=L,Y=X,R=b;e:for(;;)switch(t.mode){case u:if(t.wrap===0){t.mode=13;break}for(;A<16;){if(L===0)break e;L--,I+=U[F++]<<A,A+=8}if(2&t.wrap&&I===35615){_[t.check=0]=255&I,_[1]=I>>>8&255,t.check=r(t.check,_,2,0),A=I=0,t.mode=2;break}if(t.flags=0,t.head&&(t.head.done=!1),!(1&t.wrap)||(((255&I)<<8)+(I>>8))%31){g.msg="incorrect header check",t.mode=30;break}if((15&I)!=8){g.msg="unknown compression method",t.mode=30;break}if(A-=4,e=8+(15&(I>>>=4)),t.wbits===0)t.wbits=e;else if(e>t.wbits){g.msg="invalid window size",t.mode=30;break}t.dmax=1<<e,g.adler=t.check=1,t.mode=512&I?10:12,A=I=0;break;case 2:for(;A<16;){if(L===0)break e;L--,I+=U[F++]<<A,A+=8}if(t.flags=I,(255&t.flags)!=8){g.msg="unknown compression method",t.mode=30;break}if(57344&t.flags){g.msg="unknown header flags set",t.mode=30;break}t.head&&(t.head.text=I>>8&1),512&t.flags&&(_[0]=255&I,_[1]=I>>>8&255,t.check=r(t.check,_,2,0)),A=I=0,t.mode=3;case 3:for(;A<32;){if(L===0)break e;L--,I+=U[F++]<<A,A+=8}t.head&&(t.head.time=I),512&t.flags&&(_[0]=255&I,_[1]=I>>>8&255,_[2]=I>>>16&255,_[3]=I>>>24&255,t.check=r(t.check,_,4,0)),A=I=0,t.mode=4;case 4:for(;A<16;){if(L===0)break e;L--,I+=U[F++]<<A,A+=8}t.head&&(t.head.xflags=255&I,t.head.os=I>>8),512&t.flags&&(_[0]=255&I,_[1]=I>>>8&255,t.check=r(t.check,_,2,0)),A=I=0,t.mode=5;case 5:if(1024&t.flags){for(;A<16;){if(L===0)break e;L--,I+=U[F++]<<A,A+=8}t.length=I,t.head&&(t.head.extra_len=I),512&t.flags&&(_[0]=255&I,_[1]=I>>>8&255,t.check=r(t.check,_,2,0)),A=I=0}else t.head&&(t.head.extra=null);t.mode=6;case 6:if(1024&t.flags&&(L<(Z=t.length)&&(Z=L),Z&&(t.head&&(e=t.head.extra_len-t.length,t.head.extra||(t.head.extra=new Array(t.head.extra_len)),o.arraySet(t.head.extra,U,F,Z,e)),512&t.flags&&(t.check=r(t.check,U,Z,F)),L-=Z,F+=Z,t.length-=Z),t.length))break e;t.length=0,t.mode=7;case 7:if(2048&t.flags){if(L===0)break e;for(Z=0;e=U[F+Z++],t.head&&e&&t.length<65536&&(t.head.name+=String.fromCharCode(e)),e&&Z<L;);if(512&t.flags&&(t.check=r(t.check,U,Z,F)),L-=Z,F+=Z,e)break e}else t.head&&(t.head.name=null);t.length=0,t.mode=8;case 8:if(4096&t.flags){if(L===0)break e;for(Z=0;e=U[F+Z++],t.head&&e&&t.length<65536&&(t.head.comment+=String.fromCharCode(e)),e&&Z<L;);if(512&t.flags&&(t.check=r(t.check,U,Z,F)),L-=Z,F+=Z,e)break e}else t.head&&(t.head.comment=null);t.mode=9;case 9:if(512&t.flags){for(;A<16;){if(L===0)break e;L--,I+=U[F++]<<A,A+=8}if(I!==(65535&t.check)){g.msg="header crc mismatch",t.mode=30;break}A=I=0}t.head&&(t.head.hcrc=t.flags>>9&1,t.head.done=!0),g.adler=t.check=0,t.mode=12;break;case 10:for(;A<32;){if(L===0)break e;L--,I+=U[F++]<<A,A+=8}g.adler=t.check=n(I),A=I=0,t.mode=11;case 11:if(t.havedict===0)return g.next_out=te,g.avail_out=X,g.next_in=F,g.avail_in=L,t.hold=I,t.bits=A,2;g.adler=t.check=1,t.mode=12;case 12:if(T===5||T===6)break e;case 13:if(t.last){I>>>=7&A,A-=7&A,t.mode=27;break}for(;A<3;){if(L===0)break e;L--,I+=U[F++]<<A,A+=8}switch(t.last=1&I,A-=1,3&(I>>>=1)){case 0:t.mode=14;break;case 1:if(K(t),t.mode=20,T!==6)break;I>>>=2,A-=2;break e;case 2:t.mode=17;break;case 3:g.msg="invalid block type",t.mode=30}I>>>=2,A-=2;break;case 14:for(I>>>=7&A,A-=7&A;A<32;){if(L===0)break e;L--,I+=U[F++]<<A,A+=8}if((65535&I)!=(I>>>16^65535)){g.msg="invalid stored block lengths",t.mode=30;break}if(t.length=65535&I,A=I=0,t.mode=15,T===6)break e;case 15:t.mode=16;case 16:if(Z=t.length){if(L<Z&&(Z=L),X<Z&&(Z=X),Z===0)break e;o.arraySet(ee,U,F,Z,te),L-=Z,F+=Z,X-=Z,te+=Z,t.length-=Z;break}t.mode=12;break;case 17:for(;A<14;){if(L===0)break e;L--,I+=U[F++]<<A,A+=8}if(t.nlen=257+(31&I),I>>>=5,A-=5,t.ndist=1+(31&I),I>>>=5,A-=5,t.ncode=4+(15&I),I>>>=4,A-=4,286<t.nlen||30<t.ndist){g.msg="too many length or distance symbols",t.mode=30;break}t.have=0,t.mode=18;case 18:for(;t.have<t.ncode;){for(;A<3;){if(L===0)break e;L--,I+=U[F++]<<A,A+=8}t.lens[j[t.have++]]=7&I,I>>>=3,A-=3}for(;t.have<19;)t.lens[j[t.have++]]=0;if(t.lencode=t.lendyn,t.lenbits=7,C={bits:t.lenbits},R=y(0,t.lens,0,19,t.lencode,0,t.work,C),t.lenbits=C.bits,R){g.msg="invalid code lengths set",t.mode=30;break}t.have=0,t.mode=19;case 19:for(;t.have<t.nlen+t.ndist;){for(;ae=(i=t.lencode[I&(1<<t.lenbits)-1])>>>16&255,de=65535&i,!((se=i>>>24)<=A);){if(L===0)break e;L--,I+=U[F++]<<A,A+=8}if(de<16)I>>>=se,A-=se,t.lens[t.have++]=de;else{if(de===16){for(h=se+2;A<h;){if(L===0)break e;L--,I+=U[F++]<<A,A+=8}if(I>>>=se,A-=se,t.have===0){g.msg="invalid bit length repeat",t.mode=30;break}e=t.lens[t.have-1],Z=3+(3&I),I>>>=2,A-=2}else if(de===17){for(h=se+3;A<h;){if(L===0)break e;L--,I+=U[F++]<<A,A+=8}A-=se,e=0,Z=3+(7&(I>>>=se)),I>>>=3,A-=3}else{for(h=se+7;A<h;){if(L===0)break e;L--,I+=U[F++]<<A,A+=8}A-=se,e=0,Z=11+(127&(I>>>=se)),I>>>=7,A-=7}if(t.have+Z>t.nlen+t.ndist){g.msg="invalid bit length repeat",t.mode=30;break}for(;Z--;)t.lens[t.have++]=e}}if(t.mode===30)break;if(t.lens[256]===0){g.msg="invalid code -- missing end-of-block",t.mode=30;break}if(t.lenbits=9,C={bits:t.lenbits},R=y(k,t.lens,0,t.nlen,t.lencode,0,t.work,C),t.lenbits=C.bits,R){g.msg="invalid literal/lengths set",t.mode=30;break}if(t.distbits=6,t.distcode=t.distdyn,C={bits:t.distbits},R=y(m,t.lens,t.nlen,t.ndist,t.distcode,0,t.work,C),t.distbits=C.bits,R){g.msg="invalid distances set",t.mode=30;break}if(t.mode=20,T===6)break e;case 20:t.mode=21;case 21:if(6<=L&&258<=X){g.next_out=te,g.avail_out=X,g.next_in=F,g.avail_in=L,t.hold=I,t.bits=A,d(g,Y),te=g.next_out,ee=g.output,X=g.avail_out,F=g.next_in,U=g.input,L=g.avail_in,I=t.hold,A=t.bits,t.mode===12&&(t.back=-1);break}for(t.back=0;ae=(i=t.lencode[I&(1<<t.lenbits)-1])>>>16&255,de=65535&i,!((se=i>>>24)<=A);){if(L===0)break e;L--,I+=U[F++]<<A,A+=8}if(ae&&(240&ae)==0){for(oe=se,fe=ae,ue=de;ae=(i=t.lencode[ue+((I&(1<<oe+fe)-1)>>oe)])>>>16&255,de=65535&i,!(oe+(se=i>>>24)<=A);){if(L===0)break e;L--,I+=U[F++]<<A,A+=8}I>>>=oe,A-=oe,t.back+=oe}if(I>>>=se,A-=se,t.back+=se,t.length=de,ae===0){t.mode=26;break}if(32&ae){t.back=-1,t.mode=12;break}if(64&ae){g.msg="invalid literal/length code",t.mode=30;break}t.extra=15&ae,t.mode=22;case 22:if(t.extra){for(h=t.extra;A<h;){if(L===0)break e;L--,I+=U[F++]<<A,A+=8}t.length+=I&(1<<t.extra)-1,I>>>=t.extra,A-=t.extra,t.back+=t.extra}t.was=t.length,t.mode=23;case 23:for(;ae=(i=t.distcode[I&(1<<t.distbits)-1])>>>16&255,de=65535&i,!((se=i>>>24)<=A);){if(L===0)break e;L--,I+=U[F++]<<A,A+=8}if((240&ae)==0){for(oe=se,fe=ae,ue=de;ae=(i=t.distcode[ue+((I&(1<<oe+fe)-1)>>oe)])>>>16&255,de=65535&i,!(oe+(se=i>>>24)<=A);){if(L===0)break e;L--,I+=U[F++]<<A,A+=8}I>>>=oe,A-=oe,t.back+=oe}if(I>>>=se,A-=se,t.back+=se,64&ae){g.msg="invalid distance code",t.mode=30;break}t.offset=de,t.extra=15&ae,t.mode=24;case 24:if(t.extra){for(h=t.extra;A<h;){if(L===0)break e;L--,I+=U[F++]<<A,A+=8}t.offset+=I&(1<<t.extra)-1,I>>>=t.extra,A-=t.extra,t.back+=t.extra}if(t.offset>t.dmax){g.msg="invalid distance too far back",t.mode=30;break}t.mode=25;case 25:if(X===0)break e;if(Z=Y-X,t.offset>Z){if((Z=t.offset-Z)>t.whave&&t.sane){g.msg="invalid distance too far back",t.mode=30;break}ie=Z>t.wnext?(Z-=t.wnext,t.wsize-Z):t.wnext-Z,Z>t.length&&(Z=t.length),ce=t.window}else ce=ee,ie=te-t.offset,Z=t.length;for(X<Z&&(Z=X),X-=Z,t.length-=Z;ee[te++]=ce[ie++],--Z;);t.length===0&&(t.mode=21);break;case 26:if(X===0)break e;ee[te++]=t.length,X--,t.mode=21;break;case 27:if(t.wrap){for(;A<32;){if(L===0)break e;L--,I|=U[F++]<<A,A+=8}if(Y-=X,g.total_out+=Y,t.total+=Y,Y&&(g.adler=t.check=t.flags?r(t.check,ee,Y,te-Y):l(t.check,ee,Y,te-Y)),Y=X,(t.flags?I:n(I))!==t.check){g.msg="incorrect data check",t.mode=30;break}A=I=0}t.mode=28;case 28:if(t.wrap&&t.flags){for(;A<32;){if(L===0)break e;L--,I+=U[F++]<<A,A+=8}if(I!==(4294967295&t.total)){g.msg="incorrect length check",t.mode=30;break}A=I=0}t.mode=29;case 29:R=1;break e;case 30:R=-3;break e;case 31:return-4;case 32:default:return a}return g.next_out=te,g.avail_out=X,g.next_in=F,g.avail_in=L,t.hold=I,t.bits=A,(t.wsize||Y!==g.avail_out&&t.mode<30&&(t.mode<27||T!==4))&&J(g,g.output,g.next_out,Y-g.avail_out)?(t.mode=31,-4):($-=g.avail_in,Y-=g.avail_out,g.total_in+=$,g.total_out+=Y,t.total+=Y,t.wrap&&Y&&(g.adler=t.check=t.flags?r(t.check,ee,Y,g.next_out-Y):l(t.check,ee,Y,g.next_out-Y)),g.data_type=t.bits+(t.last?64:0)+(t.mode===12?128:0)+(t.mode===20||t.mode===15?256:0),($==0&&Y===0||T===4)&&R===b&&(R=-5),R)},v.inflateEnd=function(g){if(!g||!g.state)return a;var T=g.state;return T.window&&(T.window=null),g.state=null,b},v.inflateGetHeader=function(g,T){var t;return g&&g.state?(2&(t=g.state).wrap)==0?a:((t.head=T).done=!1,b):a},v.inflateSetDictionary=function(g,T){var t,U=T.length;return g&&g.state?(t=g.state).wrap!==0&&t.mode!==11?a:t.mode===11&&l(1,T,U,0)!==t.check?-3:J(g,T,U,U)?(t.mode=31,-4):(t.havedict=1,b):a},v.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(f,E,v){var o=f("../utils/common"),l=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],r=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],d=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],y=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];E.exports=function(k,m,b,a,u,s,c,n){var p,w,S,x,O,D,N,z,K,J=n.bits,g=0,T=0,t=0,U=0,ee=0,F=0,te=0,L=0,X=0,I=0,A=null,$=0,Y=new o.Buf16(16),Z=new o.Buf16(16),ie=null,ce=0;for(g=0;g<=15;g++)Y[g]=0;for(T=0;T<a;T++)Y[m[b+T]]++;for(ee=J,U=15;1<=U&&Y[U]===0;U--);if(U<ee&&(ee=U),U===0)return u[s++]=20971520,u[s++]=20971520,n.bits=1,0;for(t=1;t<U&&Y[t]===0;t++);for(ee<t&&(ee=t),g=L=1;g<=15;g++)if(L<<=1,(L-=Y[g])<0)return-1;if(0<L&&(k===0||U!==1))return-1;for(Z[1]=0,g=1;g<15;g++)Z[g+1]=Z[g]+Y[g];for(T=0;T<a;T++)m[b+T]!==0&&(c[Z[m[b+T]]++]=T);if(D=k===0?(A=ie=c,19):k===1?(A=l,$-=257,ie=r,ce-=257,256):(A=d,ie=y,-1),g=t,O=s,te=T=I=0,S=-1,x=(X=1<<(F=ee))-1,k===1&&852<X||k===2&&592<X)return 1;for(;;){for(N=g-te,K=c[T]<D?(z=0,c[T]):c[T]>D?(z=ie[ce+c[T]],A[$+c[T]]):(z=96,0),p=1<<g-te,t=w=1<<F;u[O+(I>>te)+(w-=p)]=N<<24|z<<16|K|0,w!==0;);for(p=1<<g-1;I&p;)p>>=1;if(p!==0?(I&=p-1,I+=p):I=0,T++,--Y[g]==0){if(g===U)break;g=m[b+c[T]]}if(ee<g&&(I&x)!==S){for(te===0&&(te=ee),O+=t,L=1<<(F=g-te);F+te<U&&!((L-=Y[F+te])<=0);)F++,L<<=1;if(X+=1<<F,k===1&&852<X||k===2&&592<X)return 1;u[S=I&x]=ee<<24|F<<16|O-s|0}}return I!==0&&(u[O+I]=g-te<<24|64<<16|0),n.bits=ee,0}},{"../utils/common":41}],51:[function(f,E,v){E.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(f,E,v){var o=f("../utils/common"),l=0,r=1;function d(i){for(var _=i.length;0<=--_;)i[_]=0}var y=0,k=29,m=256,b=m+1+k,a=30,u=19,s=2*b+1,c=15,n=16,p=7,w=256,S=16,x=17,O=18,D=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],N=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],z=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],K=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],J=new Array(2*(b+2));d(J);var g=new Array(2*a);d(g);var T=new Array(512);d(T);var t=new Array(256);d(t);var U=new Array(k);d(U);var ee,F,te,L=new Array(a);function X(i,_,j,G,P){this.static_tree=i,this.extra_bits=_,this.extra_base=j,this.elems=G,this.max_length=P,this.has_stree=i&&i.length}function I(i,_){this.dyn_tree=i,this.max_code=0,this.stat_desc=_}function A(i){return i<256?T[i]:T[256+(i>>>7)]}function $(i,_){i.pending_buf[i.pending++]=255&_,i.pending_buf[i.pending++]=_>>>8&255}function Y(i,_,j){i.bi_valid>n-j?(i.bi_buf|=_<<i.bi_valid&65535,$(i,i.bi_buf),i.bi_buf=_>>n-i.bi_valid,i.bi_valid+=j-n):(i.bi_buf|=_<<i.bi_valid&65535,i.bi_valid+=j)}function Z(i,_,j){Y(i,j[2*_],j[2*_+1])}function ie(i,_){for(var j=0;j|=1&i,i>>>=1,j<<=1,0<--_;);return j>>>1}function ce(i,_,j){var G,P,M=new Array(c+1),H=0;for(G=1;G<=c;G++)M[G]=H=H+j[G-1]<<1;for(P=0;P<=_;P++){var W=i[2*P+1];W!==0&&(i[2*P]=ie(M[W]++,W))}}function se(i){var _;for(_=0;_<b;_++)i.dyn_ltree[2*_]=0;for(_=0;_<a;_++)i.dyn_dtree[2*_]=0;for(_=0;_<u;_++)i.bl_tree[2*_]=0;i.dyn_ltree[2*w]=1,i.opt_len=i.static_len=0,i.last_lit=i.matches=0}function ae(i){8<i.bi_valid?$(i,i.bi_buf):0<i.bi_valid&&(i.pending_buf[i.pending++]=i.bi_buf),i.bi_buf=0,i.bi_valid=0}function de(i,_,j,G){var P=2*_,M=2*j;return i[P]<i[M]||i[P]===i[M]&&G[_]<=G[j]}function oe(i,_,j){for(var G=i.heap[j],P=j<<1;P<=i.heap_len&&(P<i.heap_len&&de(_,i.heap[P+1],i.heap[P],i.depth)&&P++,!de(_,G,i.heap[P],i.depth));)i.heap[j]=i.heap[P],j=P,P<<=1;i.heap[j]=G}function fe(i,_,j){var G,P,M,H,W=0;if(i.last_lit!==0)for(;G=i.pending_buf[i.d_buf+2*W]<<8|i.pending_buf[i.d_buf+2*W+1],P=i.pending_buf[i.l_buf+W],W++,G===0?Z(i,P,_):(Z(i,(M=t[P])+m+1,_),(H=D[M])!==0&&Y(i,P-=U[M],H),Z(i,M=A(--G),j),(H=N[M])!==0&&Y(i,G-=L[M],H)),W<i.last_lit;);Z(i,w,_)}function ue(i,_){var j,G,P,M=_.dyn_tree,H=_.stat_desc.static_tree,W=_.stat_desc.has_stree,V=_.stat_desc.elems,ne=-1;for(i.heap_len=0,i.heap_max=s,j=0;j<V;j++)M[2*j]!==0?(i.heap[++i.heap_len]=ne=j,i.depth[j]=0):M[2*j+1]=0;for(;i.heap_len<2;)M[2*(P=i.heap[++i.heap_len]=ne<2?++ne:0)]=1,i.depth[P]=0,i.opt_len--,W&&(i.static_len-=H[2*P+1]);for(_.max_code=ne,j=i.heap_len>>1;1<=j;j--)oe(i,M,j);for(P=V;j=i.heap[1],i.heap[1]=i.heap[i.heap_len--],oe(i,M,1),G=i.heap[1],i.heap[--i.heap_max]=j,i.heap[--i.heap_max]=G,M[2*P]=M[2*j]+M[2*G],i.depth[P]=(i.depth[j]>=i.depth[G]?i.depth[j]:i.depth[G])+1,M[2*j+1]=M[2*G+1]=P,i.heap[1]=P++,oe(i,M,1),2<=i.heap_len;);i.heap[--i.heap_max]=i.heap[1],(function(re,he){var ye,me,be,le,ke,Ie,ge=he.dyn_tree,Ee=he.max_code,Ge=he.stat_desc.static_tree,Fe=he.stat_desc.has_stree,Ne=he.stat_desc.extra_bits,ze=he.stat_desc.extra_base,ve=he.stat_desc.max_length,_e=0;for(le=0;le<=c;le++)re.bl_count[le]=0;for(ge[2*re.heap[re.heap_max]+1]=0,ye=re.heap_max+1;ye<s;ye++)ve<(le=ge[2*ge[2*(me=re.heap[ye])+1]+1]+1)&&(le=ve,_e++),ge[2*me+1]=le,Ee<me||(re.bl_count[le]++,ke=0,ze<=me&&(ke=Ne[me-ze]),Ie=ge[2*me],re.opt_len+=Ie*(le+ke),Fe&&(re.static_len+=Ie*(Ge[2*me+1]+ke)));if(_e!==0){do{for(le=ve-1;re.bl_count[le]===0;)le--;re.bl_count[le]--,re.bl_count[le+1]+=2,re.bl_count[ve]--,_e-=2}while(0<_e);for(le=ve;le!==0;le--)for(me=re.bl_count[le];me!==0;)Ee<(be=re.heap[--ye])||(ge[2*be+1]!==le&&(re.opt_len+=(le-ge[2*be+1])*ge[2*be],ge[2*be+1]=le),me--)}})(i,_),ce(M,ne,i.bl_count)}function e(i,_,j){var G,P,M=-1,H=_[1],W=0,V=7,ne=4;for(H===0&&(V=138,ne=3),_[2*(j+1)+1]=65535,G=0;G<=j;G++)P=H,H=_[2*(G+1)+1],++W<V&&P===H||(W<ne?i.bl_tree[2*P]+=W:P!==0?(P!==M&&i.bl_tree[2*P]++,i.bl_tree[2*S]++):W<=10?i.bl_tree[2*x]++:i.bl_tree[2*O]++,M=P,ne=(W=0)===H?(V=138,3):P===H?(V=6,3):(V=7,4))}function R(i,_,j){var G,P,M=-1,H=_[1],W=0,V=7,ne=4;for(H===0&&(V=138,ne=3),G=0;G<=j;G++)if(P=H,H=_[2*(G+1)+1],!(++W<V&&P===H)){if(W<ne)for(;Z(i,P,i.bl_tree),--W!=0;);else P!==0?(P!==M&&(Z(i,P,i.bl_tree),W--),Z(i,S,i.bl_tree),Y(i,W-3,2)):W<=10?(Z(i,x,i.bl_tree),Y(i,W-3,3)):(Z(i,O,i.bl_tree),Y(i,W-11,7));M=P,ne=(W=0)===H?(V=138,3):P===H?(V=6,3):(V=7,4)}}d(L);var C=!1;function h(i,_,j,G){Y(i,(y<<1)+(G?1:0),3),(function(P,M,H,W){ae(P),$(P,H),$(P,~H),o.arraySet(P.pending_buf,P.window,M,H,P.pending),P.pending+=H})(i,_,j)}v._tr_init=function(i){C||((function(){var _,j,G,P,M,H=new Array(c+1);for(P=G=0;P<k-1;P++)for(U[P]=G,_=0;_<1<<D[P];_++)t[G++]=P;for(t[G-1]=P,P=M=0;P<16;P++)for(L[P]=M,_=0;_<1<<N[P];_++)T[M++]=P;for(M>>=7;P<a;P++)for(L[P]=M<<7,_=0;_<1<<N[P]-7;_++)T[256+M++]=P;for(j=0;j<=c;j++)H[j]=0;for(_=0;_<=143;)J[2*_+1]=8,_++,H[8]++;for(;_<=255;)J[2*_+1]=9,_++,H[9]++;for(;_<=279;)J[2*_+1]=7,_++,H[7]++;for(;_<=287;)J[2*_+1]=8,_++,H[8]++;for(ce(J,b+1,H),_=0;_<a;_++)g[2*_+1]=5,g[2*_]=ie(_,5);ee=new X(J,D,m+1,b,c),F=new X(g,N,0,a,c),te=new X(new Array(0),z,0,u,p)})(),C=!0),i.l_desc=new I(i.dyn_ltree,ee),i.d_desc=new I(i.dyn_dtree,F),i.bl_desc=new I(i.bl_tree,te),i.bi_buf=0,i.bi_valid=0,se(i)},v._tr_stored_block=h,v._tr_flush_block=function(i,_,j,G){var P,M,H=0;0<i.level?(i.strm.data_type===2&&(i.strm.data_type=(function(W){var V,ne=4093624447;for(V=0;V<=31;V++,ne>>>=1)if(1&ne&&W.dyn_ltree[2*V]!==0)return l;if(W.dyn_ltree[18]!==0||W.dyn_ltree[20]!==0||W.dyn_ltree[26]!==0)return r;for(V=32;V<m;V++)if(W.dyn_ltree[2*V]!==0)return r;return l})(i)),ue(i,i.l_desc),ue(i,i.d_desc),H=(function(W){var V;for(e(W,W.dyn_ltree,W.l_desc.max_code),e(W,W.dyn_dtree,W.d_desc.max_code),ue(W,W.bl_desc),V=u-1;3<=V&&W.bl_tree[2*K[V]+1]===0;V--);return W.opt_len+=3*(V+1)+5+5+4,V})(i),P=i.opt_len+3+7>>>3,(M=i.static_len+3+7>>>3)<=P&&(P=M)):P=M=j+5,j+4<=P&&_!==-1?h(i,_,j,G):i.strategy===4||M===P?(Y(i,2+(G?1:0),3),fe(i,J,g)):(Y(i,4+(G?1:0),3),(function(W,V,ne,re){var he;for(Y(W,V-257,5),Y(W,ne-1,5),Y(W,re-4,4),he=0;he<re;he++)Y(W,W.bl_tree[2*K[he]+1],3);R(W,W.dyn_ltree,V-1),R(W,W.dyn_dtree,ne-1)})(i,i.l_desc.max_code+1,i.d_desc.max_code+1,H+1),fe(i,i.dyn_ltree,i.dyn_dtree)),se(i),G&&ae(i)},v._tr_tally=function(i,_,j){return i.pending_buf[i.d_buf+2*i.last_lit]=_>>>8&255,i.pending_buf[i.d_buf+2*i.last_lit+1]=255&_,i.pending_buf[i.l_buf+i.last_lit]=255&j,i.last_lit++,_===0?i.dyn_ltree[2*j]++:(i.matches++,_--,i.dyn_ltree[2*(t[j]+m+1)]++,i.dyn_dtree[2*A(_)]++),i.last_lit===i.lit_bufsize-1},v._tr_align=function(i){Y(i,2,3),Z(i,w,J),(function(_){_.bi_valid===16?($(_,_.bi_buf),_.bi_buf=0,_.bi_valid=0):8<=_.bi_valid&&(_.pending_buf[_.pending++]=255&_.bi_buf,_.bi_buf>>=8,_.bi_valid-=8)})(i)}},{"../utils/common":41}],53:[function(f,E,v){E.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(f,E,v){(function(o){(function(l,r){if(!l.setImmediate){var d,y,k,m,b=1,a={},u=!1,s=l.document,c=Object.getPrototypeOf&&Object.getPrototypeOf(l);c=c&&c.setTimeout?c:l,d={}.toString.call(l.process)==="[object process]"?function(S){process.nextTick(function(){p(S)})}:(function(){if(l.postMessage&&!l.importScripts){var S=!0,x=l.onmessage;return l.onmessage=function(){S=!1},l.postMessage("","*"),l.onmessage=x,S}})()?(m="setImmediate$"+Math.random()+"$",l.addEventListener?l.addEventListener("message",w,!1):l.attachEvent("onmessage",w),function(S){l.postMessage(m+S,"*")}):l.MessageChannel?((k=new MessageChannel).port1.onmessage=function(S){p(S.data)},function(S){k.port2.postMessage(S)}):s&&"onreadystatechange"in s.createElement("script")?(y=s.documentElement,function(S){var x=s.createElement("script");x.onreadystatechange=function(){p(S),x.onreadystatechange=null,y.removeChild(x),x=null},y.appendChild(x)}):function(S){setTimeout(p,0,S)},c.setImmediate=function(S){typeof S!="function"&&(S=new Function(""+S));for(var x=new Array(arguments.length-1),O=0;O<x.length;O++)x[O]=arguments[O+1];var D={callback:S,args:x};return a[b]=D,d(b),b++},c.clearImmediate=n}function n(S){delete a[S]}function p(S){if(u)setTimeout(p,0,S);else{var x=a[S];if(x){u=!0;try{(function(O){var D=O.callback,N=O.args;switch(N.length){case 0:D();break;case 1:D(N[0]);break;case 2:D(N[0],N[1]);break;case 3:D(N[0],N[1],N[2]);break;default:D.apply(r,N)}})(x)}finally{n(S),u=!1}}}}function w(S){S.source===l&&typeof S.data=="string"&&S.data.indexOf(m)===0&&p(+S.data.slice(m.length))}})(typeof self>"u"?o===void 0?this:o:self)}).call(this,typeof xe<"u"?xe:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})})(Ce)),Ce.exports}var Ke=Me();const We=Le(Ke),Te=["phaser-project-architect","phaser-scene-workflow","phaser-assets-pipeline","phaser-input-mobile-desktop","phaser-responsive-layout","phaser-game-systems","phaser-ui-hud","phaser-gamefeel","phaser-testing","phaser-skill-pack-maintainer"];function Re(B){return B.includeYandexGames?[...Te,"yandex-publish"]:Te}function Ue(B){return[...Ye(B),...Ze(B),...He(B),...qe(B),...Ve(B),...$e(B)]}function Ze(B){return[{path:"docs/game-creator-guide.md",content:`# Game Creator Guide

This repository is a foundation for a Phaser game, not a finished game.

The first screen is a template guide. Replace it after the first playable loop is designed.

## What To Do First

1. Describe the game idea in plain language.
2. Ask the agent to use \`phaser-project-architect\`.
3. Ask for a first playable loop.
4. Let the agent replace \`TemplateGuideScene\` with real menu/gameplay scenes.

## Useful First Prompts

\`\`\`text
Use phaser-project-architect. My game idea is: [describe idea]. Turn it into a first playable loop and project architecture.
\`\`\`

\`\`\`text
Use phaser-scene-workflow and phaser-game-systems. Replace the template guide with the first real gameplay scene.
\`\`\`

\`\`\`text
Use phaser-input-mobile-desktop and phaser-responsive-layout. Design controls for ${B.target==="mobile"?"a mobile-first":"a desktop-first"} version of this game.
\`\`\`

## Do Not Start With

- A large content system.
- Multiplayer.
- Backend.
- Complex editor integration.
- A full economy.
- Many scenes.

Start with one action, one goal, one feedback moment, and one way to restart or continue.
`},{path:"docs/first-playable-loop.md",content:`# First Playable Loop

A first playable loop is the smallest version of the game that proves the idea.

It should include:

- one player action;
- one goal;
- one state change;
- one feedback moment;
- one restart/continue path;
- one verification path.

## Examples

Arcade:

- Action: move and dodge.
- Goal: survive 30 seconds.
- Feedback: hit flash and camera shake.
- State: score/time.

Puzzle:

- Action: select/swap/drag.
- Goal: solve one board.
- Feedback: match/clear animation.
- State: moves remaining.

Card/collection:

- Action: choose/play/open.
- Goal: resolve one turn or open one pack.
- Feedback: reveal animation.
- State: hand/collection/save.

Platformer:

- Action: move and jump.
- Goal: reach one marker.
- Feedback: landing/jump effects.
- State: checkpoint/restart.
`},{path:"docs/idea-to-architecture.md",content:`# Idea To Architecture

Use this guide to translate a game idea into modules. These are not hard presets; they are starting hints.

## Top-Down Movement

- \`entities/player\`
- \`input/PlayerInput\`
- \`systems/movement\`
- optional \`physics-arcade\`
- camera follow if world is larger than screen

## Platformer

- Arcade physics
- player jump/movement actions
- collision layers or platforms
- restart/checkpoint state

## Puzzle

- board/grid system
- pure rules under \`systems/\`
- UI feedback under \`ui/\`
- save progress if level-based

## Card Or Collection Game

- card data under \`content/\`
- deck/hand/collection systems
- save collection state
- UI card components
- reveal/gamefeel animations

## Idle Or Clicker

- economy system
- timers
- save upgrades/progress
- offline progress if desired
- readable HUD

## Tilemap Adventure

- tilemap asset pipeline
- map/object layer conventions
- grid or free movement
- collision/object systems

## When Unsure

Ask the agent to propose three possible first playable loops, then choose the smallest one.
`},{path:"docs/agent-start-prompts.md",content:`# Agent Start Prompts

Use these prompts when you want the agent to begin real game work.

## Architecture

\`\`\`text
Use phaser-project-architect. My idea is: [describe game]. Propose the smallest first playable loop, the scene plan, and the modules needed.
\`\`\`

## Replace Template Guide

\`\`\`text
Use phaser-scene-workflow. Replace TemplateGuideScene with the first real menu/gameplay flow for this idea: [describe game].
\`\`\`

## Controls

\`\`\`text
Use phaser-input-mobile-desktop. Design controls for this game on mobile and desktop: [describe action].
\`\`\`

## Layout

\`\`\`text
Use phaser-responsive-layout. Make the first playable scene work on phone and desktop viewports.
\`\`\`

## Feel

\`\`\`text
Use phaser-gamefeel. Add feedback to the core action without overbuilding the game.
\`\`\`
`}]}function Ye(B){const q=Re(B);return[{path:"START_HERE.md",content:`# Start Here

You opened a generated Phaser game repository.

If you are a human:

1. Open this folder in Codex, Claude Code, Gemini CLI, or another coding agent.
2. Tell the agent your game idea.
3. Run:

\`\`\`bash
npm install
npm run dev
\`\`\`

4. Open the local URL printed by Vite.

If you are an AI coding agent:

1. Read \`AGENTS.md\` first.
2. Read \`docs/game-creator-guide.md\` and \`docs/first-playable-loop.md\`.
3. Read \`skills/README.md\`.
4. Pick the right skill from \`skills/_meta/task-map.md\`.
5. Before changing code, explain which skill you are using and why.
6. Keep this repo Phaser-focused. Do not convert it into a generic web app.

## What This Project Is

- Game title: ${B.title}
- Engine: Phaser
- Language: TypeScript
- Build tool: Vite
- Primary target: ${B.target==="mobile"?"mobile-first browser game":"desktop-first browser game"}
- Yandex Games publish pack: ${B.includeYandexGames?"included":"not included"}
- Generated skills: ${q.length}

## First Useful Agent Prompts

\`\`\`text
Use phaser-project-architect. My game idea is: [describe game]. Turn it into a first playable loop.
\`\`\`

\`\`\`text
Use phaser-scene-workflow. Replace the template guide with real gameplay for this idea: [describe game].
\`\`\`

\`\`\`text
Use the phaser-input-mobile-desktop and phaser-responsive-layout skills to make this work well on phone and desktop.
\`\`\`
`},{path:"README.md",content:`# ${B.title}

Generated with Phaser Game Creator.

This repo is built to be opened by a coding agent. The agent should read \`AGENTS.md\`, then use the project-local skills in \`skills/\`.

## Run

\`\`\`bash
npm install
npm run dev
\`\`\`

## Build

\`\`\`bash
npm run build
\`\`\`

## Project Shape

\`\`\`text
src/game/
  config/     Phaser configuration and constants
  scenes/     Boot, Preload, Menu, Game, UI scenes
  systems/    Gameplay systems with explicit boundaries
  entities/   Game objects and entity factories
  input/      Mobile/desktop input abstraction
  ui/         HUD and menu helpers
  state/      Runtime state and events
  assets/     Asset manifest and loader helpers
  save/       Local save/load helpers
  utils/      Small shared utilities
skills/       Project-local AI skills
\`\`\`

## Agent Entry Points

- \`AGENTS.md\`: operating instructions for AI agents.
- \`CLAUDE.md\`: Claude Code entry instructions.
- \`GEMINI.md\`: Gemini CLI entry instructions.
- \`.github/copilot-instructions.md\`: GitHub Copilot instructions.
- \`.cursor/rules/phaser-game-creator.mdc\`: Cursor auto-applied rule.
- \`.ai/agent-entry.md\`: generic AI agent entry instructions.
- \`.ai/skill-manifest.json\`: machine-readable skill map.
- \`skills/README.md\`: what skills exist and when to use them.
- \`skills/_meta/task-map.md\`: task-to-skill routing table.
- \`skills/_meta/update-skills.md\`: how to keep skills current.
- \`docs/game-creator-guide.md\`: how to turn an idea into the first playable.
- \`docs/first-playable-loop.md\`: what "first playable" means.
- \`docs/idea-to-architecture.md\`: idea-to-module hints.
`}]}function He(B){const q=Re(B);return[{path:"AGENTS.md",content:`# Agent Instructions For ${B.title}

This repository is a Phaser mobile/desktop game project. Treat Phaser game development as the primary domain.

## First Read Order

1. \`START_HERE.md\`
2. \`docs/game-creator-guide.md\`
3. \`docs/first-playable-loop.md\`
4. \`skills/README.md\`
5. \`skills/_meta/task-map.md\`
6. The specific \`skills/<skill-name>/SKILL.md\` for the task
7. Relevant source files under \`src/game/\`

## Core Rule

Use the project-local skills before making architecture, scene, input, layout, UI, asset, gamefeel, or testing changes.

When starting a task, say which skill you are using:

\`\`\`text
Using phaser-scene-workflow because this changes scene lifecycle and transitions.
\`\`\`

## Skill Routing

- Architecture or folder boundaries: \`phaser-project-architect\`
- Boot/preload/menu/gameplay/UI scenes: \`phaser-scene-workflow\`
- Asset keys, loaders, manifests, atlases, audio: \`phaser-assets-pipeline\`
- Touch, pointer, keyboard, mouse, gamepad: \`phaser-input-mobile-desktop\`
- Mobile/desktop scaling, safe areas, orientation: \`phaser-responsive-layout\`
- Systems/entities/state/events/save: \`phaser-game-systems\`
- HUD, menu, dialogs, overlays: \`phaser-ui-hud\`
- Tweens, camera, particles, juice, audio feedback: \`phaser-gamefeel\`
  - Vite, Playwright, canvas smoke tests, Vitest: \`phaser-testing\`
  - Updating or adding skills: \`phaser-skill-pack-maintainer\`
${B.includeYandexGames?"- Yandex Games SDK, moderation, ads, localization, build ZIP: `yandex-publish`":""}
- Turning a new idea into the first playable: start with \`docs/game-creator-guide.md\`, then \`phaser-project-architect\`

## Project Boundaries

- Keep Phaser runtime code under \`src/game/\`.
- Keep pure game rules independent from Phaser when practical, so they can be unit-tested.
- Use pointer input as the cross-platform baseline.
- ${B.target==="mobile"?"Prioritize touch ergonomics, safe areas, and phone viewport checks.":"Prioritize keyboard/mouse ergonomics, readable wide layouts, and desktop viewport checks."}
- Add keyboard shortcuts for desktop ergonomics.
- Keep mobile layout readable and touch targets large enough.
- Do not add backend, multiplayer, React, Electron, Capacitor, or ECS unless the human explicitly asks.
${B.includeYandexGames?"- Keep Yandex Games requirements in mind before any release build: no external CDN, SDK `/sdk.js`, LoadingAPI.ready, GameplayAPI pause/resume, localized text, and Python ZIP packaging.":""}

## Change Workflow

1. Identify the task category.
2. Read the matching skill.
3. Inspect existing files before editing.
4. Make the smallest coherent change.
5. Run the most relevant verification:
   - \`npm run build\`
   - \`npm run dev\`
   - \`npm run test:smoke\` if Playwright is enabled
6. Report what changed and what was verified.

## Skill Maintenance

Use \`skills/_meta/update-skills.md\` before editing skills. Skills should stay concise, task-triggered, and Phaser-specific.
`},{path:"CLAUDE.md",content:we("Claude Code",B,q)},{path:"GEMINI.md",content:we("Gemini CLI",B,q)},{path:".github/copilot-instructions.md",content:we("GitHub Copilot",B,q)},{path:".cursor/rules/phaser-game-creator.mdc",content:`---
description: Use project-local Phaser skills before changing this game.
globs:
  - "**/*"
alwaysApply: true
---

${we("Cursor",B,q)}
`},{path:".ai/agent-entry.md",content:we("Any AI coding agent",B,q)},{path:".ai/skill-manifest.json",content:JSON.stringify({projectType:"phaser-mobile-desktop-game",generatedBy:"Phaser Game Creator",primaryTarget:B.target,yandexGames:B.includeYandexGames,firstRead:["AGENTS.md","docs/game-creator-guide.md","docs/first-playable-loop.md","skills/README.md","skills/_meta/task-map.md","skills/_meta/source-registry.md"],skills:q.map(f=>({name:f,path:`skills/${f}/SKILL.md`})),routing:{architecture:"phaser-project-architect",scenes:"phaser-scene-workflow",assets:"phaser-assets-pipeline",input:"phaser-input-mobile-desktop",responsiveLayout:"phaser-responsive-layout",systems:"phaser-game-systems",ui:"phaser-ui-hud",gamefeel:"phaser-gamefeel",testing:"phaser-testing",skillMaintenance:"phaser-skill-pack-maintainer",...B.includeYandexGames?{yandexPublishing:"yandex-publish"}:{}}},null,2)},{path:"skills/README.md",content:`# Project Skills

These skills are local operating instructions for AI agents working on this Phaser game.

Agents should not treat these as passive docs. Pick a skill before changing code.

## Core Skills

${q.map(f=>`- \`${f}\`: see \`skills/${f}/SKILL.md\``).join(`
`)}

## How To Use

1. Read \`skills/_meta/task-map.md\`.
2. Open the matching \`SKILL.md\`.
3. Follow its workflow.
4. If a skill is missing or stale, use \`phaser-skill-pack-maintainer\`.

## Human Shortcut

Ask your agent:

\`\`\`text
Read AGENTS.md and skills/README.md. Then tell me which skill you would use for the next task.
\`\`\`
`},{path:"skills/_meta/task-map.md",content:`# Task Map

Use this map to choose the correct skill.

| Task | Skill |
| --- | --- |
| Plan project architecture, folders, boundaries | \`phaser-project-architect\` |
| Add or refactor scenes | \`phaser-scene-workflow\` |
| Load images, spritesheets, atlases, audio, fonts, tilemaps | \`phaser-assets-pipeline\` |
| Add touch, mouse, keyboard, pointer, gamepad controls | \`phaser-input-mobile-desktop\` |
| Fix mobile/desktop canvas size, safe area, orientation | \`phaser-responsive-layout\` |
| Add gameplay systems, entities, state, save, events | \`phaser-game-systems\` |
| Build HUD, menus, dialogs, overlays | \`phaser-ui-hud\` |
| Improve feel with tweens, camera, particles, audio feedback | \`phaser-gamefeel\` |
| Add tests, smoke checks, build validation | \`phaser-testing\` |
| Update, add, or validate skills | \`phaser-skill-pack-maintainer\` |
${B.includeYandexGames?"| Publish to Yandex Games, SDK, moderation, submission ZIP | `yandex-publish` |\n":""}

If multiple skills apply, start with architecture, then scene/input/layout, then implementation details.
`},{path:"skills/_meta/update-skills.md",content:`# Updating Skills

Skills are part of the repo's agent operating system. Keep them small, current, and Phaser-specific.

## Update Rules

- Keep \`SKILL.md\` concise.
- Put detailed notes in \`references/\` when a skill grows too large.
- Write descriptions so agents know exactly when to trigger the skill.
- Do not add generic web-app guidance unless it directly supports the Phaser game.
- Add examples only when they prevent repeated mistakes.

## Suggested Upstream Checks

- Phaser official skills: https://github.com/phaserjs/phaser/tree/master/skills
- Anthropic skill creator: https://github.com/anthropics/skills/tree/main/skills/skill-creator
- Agent Skills spec: https://agentskills.io/specification.md

## Skill Edit Checklist

1. Does the skill still describe a Phaser game task?
2. Is the frontmatter description trigger-focused?
3. Are instructions actionable for a coding agent?
4. Did you update \`skills/README.md\` or \`skills/_meta/task-map.md\` if routing changed?
5. Can a new agent understand what to do without conversation history?
`},{path:"skills/_meta/source-registry.md",content:`# Source Registry For Agents

Use these sources when a task needs current Phaser or Agent Skills knowledge.

## Primary Sources

- Phaser official skills: https://github.com/phaserjs/phaser/tree/master/skills
- Phaser docs: https://docs.phaser.io/
- Phaser examples: https://github.com/phaserjs/examples
- Phaser Vite TypeScript template: https://github.com/phaserjs/template-vite-ts
- Agent Skills spec: https://agentskills.io/specification.md
- Anthropic skill creator: https://github.com/anthropics/skills/tree/main/skills/skill-creator
${B.includeYandexGames?`- Yandex Games SDK docs: https://yandex.com/dev/games/doc/en/sdk/sdk-about
- Yandex Games requirements: https://yandex.ru/dev/games/doc/ru/concepts/requirements`:""}

## Update Policy

- Use official Phaser sources first for Phaser APIs.
- Use project-local skills first for repository workflow.
- When official sources disagree with local skills, update the local skill and explain why.
- Keep this project focused on Phaser mobile/desktop games.
- Do not introduce unrelated framework guidance into core skills.

## Version Notes

This generated project starts with Phaser 3 because the Phaser 3 ecosystem has broad examples and plugin support. If upgrading to Phaser 4, use the official Phaser migration skills/docs before changing APIs.
`},{path:"skills/_meta/agent-prompts.md",content:`# Agent Prompts

Use these prompts when opening this repo in Codex, Claude, Gemini, or another coding agent.

## First Session

\`\`\`text
Read START_HERE.md, AGENTS.md, skills/README.md, and skills/_meta/task-map.md. Then explain how this Phaser project is organized and which skills you will use for future work.
\`\`\`

## Build First Playable

\`\`\`text
Use phaser-project-architect, phaser-scene-workflow, phaser-input-mobile-desktop, and phaser-responsive-layout. Propose and implement the smallest playable loop for this game.
\`\`\`

## Improve Mobile/Desktop Feel

\`\`\`text
Use phaser-input-mobile-desktop, phaser-responsive-layout, and phaser-gamefeel. Improve the controls and feedback for both phone and desktop.
\`\`\`

## Add Assets

\`\`\`text
Use phaser-assets-pipeline. Add the requested assets through the manifest and update preload usage without scattering asset keys.
\`\`\`

## Update Skills

\`\`\`text
Use phaser-skill-pack-maintainer. Check skills/_meta/source-registry.md and update the local skill pack while keeping it Phaser mobile/desktop focused.
\`\`\`
`}]}function we(B,q,f){return`# ${B} Instructions

This repository is a generated Phaser mobile/desktop game project. It includes a local skill pack. Use those skills before changing code.

## Immediate Startup

When opening this repository, assume these files are relevant even if the user did not mention them:

1. \`AGENTS.md\`
2. \`skills/README.md\`
3. \`skills/_meta/task-map.md\`
4. \`.ai/skill-manifest.json\`

## Project Facts

- Engine: Phaser
- Language: TypeScript
- Build tool: Vite
- Primary target: ${q.target==="mobile"?"mobile-first browser game":"desktop-first browser game"}
- Yandex Games pack: ${q.includeYandexGames?"enabled":"disabled"}

## Skill Rule

Before architecture, scene, input, layout, assets, UI, gamefeel, testing, publishing, or skill-maintenance work:

1. Choose the matching skill from \`skills/_meta/task-map.md\`.
2. Read \`skills/<skill-name>/SKILL.md\`.
3. State which skill you are using.
4. Follow that skill's workflow.

## Available Skills

${f.map(E=>`- \`${E}\` at \`skills/${E}/SKILL.md\``).join(`
`)}

## Default Routing

- Architecture: \`phaser-project-architect\`
- Scenes: \`phaser-scene-workflow\`
- Assets: \`phaser-assets-pipeline\`
- Input: \`phaser-input-mobile-desktop\`
- Responsive layout: \`phaser-responsive-layout\`
- Systems/state/save/events: \`phaser-game-systems\`
- HUD/menus/overlays: \`phaser-ui-hud\`
- Game feel: \`phaser-gamefeel\`
- Tests/build validation: \`phaser-testing\`
- Skills/docs updates: \`phaser-skill-pack-maintainer\`
${q.includeYandexGames?"- Yandex Games publishing: `yandex-publish`":""}

Keep the project Phaser-focused. Do not add unrelated frameworks, backend services, wrappers, or publishing SDKs unless the user asks.
`}function qe(B){const q={dev:"vite --host 0.0.0.0",build:"tsc && vite build",preview:"vite preview --host 0.0.0.0"},f={typescript:"^5.7.3",vite:"^6.3.5"};return B.includePlaywright&&(q["test:smoke"]="playwright test",f["@playwright/test"]="^1.52.0"),B.includeYandexGames&&(q["build:yandex"]="npm run build && python scripts/make-yandex-zip.py",q["validate:yandex"]="npm run build && python scripts/validate-yandex-build.py"),[{path:"package.json",content:JSON.stringify({name:B.slug,version:"0.1.0",private:!0,type:"module",scripts:q,dependencies:{phaser:"^3.90.0"},devDependencies:f},null,2)},{path:"index.html",content:`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>${B.title}</title>
    ${B.includeYandexGames?'<script src="/sdk.js"><\/script>':""}
    ${B.includePwa?'<link rel="manifest" href="/manifest.webmanifest" />':""}
  </head>
  <body>
    <div id="game-root"></div>
    <script type="module" src="/src/main.ts"><\/script>
  </body>
</html>
`},{path:"tsconfig.json",content:`{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["src"]
}
`},{path:"vite.config.ts",content:`import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  ${B.includeYandexGames?`esbuild: {
    drop: ['console', 'debugger'],
  },`:""}
});
`},{path:"src/style.css",content:`html,
body,
#game-root {
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  background: #10131a;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  touch-action: none;
}

canvas {
  display: block;
}

${B.includeYandexGames?`* {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  user-select: none;
}

html,
body,
#game-root {
  position: fixed;
  overscroll-behavior: none;
}
`:""}
`},...B.includePlaywright?[{path:"playwright.config.ts",content:`import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  webServer: {
    command: 'npm run dev -- --port 4177',
    url: 'http://127.0.0.1:4177',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
});
`},{path:"tests/smoke.spec.ts",content:`import { expect, test } from '@playwright/test';

test('game canvas renders', async ({ page }) => {
  await page.goto('/');
  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();
  const size = await canvas.evaluate((node) => ({
    width: (node as HTMLCanvasElement).width,
    height: (node as HTMLCanvasElement).height,
  }));
  expect(size.width).toBeGreaterThan(0);
  expect(size.height).toBeGreaterThan(0);
  await page.waitForTimeout(500);
});
`}]:[],...B.includeYandexGames?[{path:"scripts/make-yandex-zip.py",content:`import os
import zipfile

dist_dir = "dist"
output_zip = "yandex-game.zip"

with zipfile.ZipFile(output_zip, "w", zipfile.ZIP_DEFLATED) as zf:
    for root, _dirs, files in os.walk(dist_dir):
        for file in files:
            abs_path = os.path.join(root, file)
            rel_path = os.path.relpath(abs_path, dist_dir).replace(os.sep, "/")
            zf.write(abs_path, rel_path)

print(f"Created {output_zip}")
`},{path:"scripts/validate-yandex-build.py",content:`from pathlib import Path

dist = Path("dist")
html = dist / "index.html"
text = html.read_text(encoding="utf-8") if html.exists() else ""

checks = [
    ("index.html exists", html.exists()),
    ("SDK path /sdk.js present", 'src="/sdk.js"' in text),
    ("No CDN references", not any(x in text for x in ["googleapis", "cdnjs", "unpkg", "jsdelivr"])),
    ("No 100vh in index", "100vh" not in text),
]

failed = False
for label, ok in checks:
    print(("[PASS] " if ok else "[FAIL] ") + label)
    failed = failed or not ok

if failed:
    raise SystemExit(1)
`},{path:"docs/yandex-games.md",content:'# Yandex Games Publishing Notes\n\nThis project was generated with the optional Yandex Games pack.\n\n## Commands\n\n```bash\nnpm run validate:yandex\nnpm run build:yandex\n```\n\n## Blocking Rules\n\n- Load the SDK with `<script src="/sdk.js"><\/script>`.\n- Vite may warn that `/sdk.js` cannot be bundled because it is not `type="module"`; this is expected for the Yandex synchronous SDK script.\n- Call `LoadingAPI.ready()` only after SDK init and Phaser boot are both done.\n- Call `GameplayAPI.start()` when gameplay starts and `GameplayAPI.stop()` when gameplay pauses or ends.\n- Handle `game_api_pause` and `game_api_resume`.\n- Do not use external CDN links or remote fonts.\n- Strip `console` and `debugger` from production builds.\n- Use Python to create the ZIP on Windows so archive paths use forward slashes.\n- Keep all visible text localized before submission.\n'}]:[],...B.includePwa?[{path:"public/manifest.webmanifest",content:JSON.stringify({name:B.title,short_name:B.title.slice(0,12),start_url:"/",display:"fullscreen",background_color:"#10131a",theme_color:"#10131a",orientation:"any",icons:[]},null,2)},{path:"docs/pwa-notes.md",content:`# PWA Notes

This project includes a starter \`public/manifest.webmanifest\`.

Before shipping:

- Add real icons.
- Decide whether offline caching is needed.
- Test install behavior on mobile and desktop.
- Keep orientation flexible unless the game design requires portrait or landscape.
`}]:[]]}function Ve(B){return[{path:"src/main.ts",content:`import Phaser from 'phaser';
import './style.css';
import { gameConfig } from './game/config/gameConfig';
${B.includeYandexGames?"import { initYandexGames, registerPhaserGame } from './game/platform/yandexGames';":""}

${B.includeYandexGames?`void initYandexGames();
const game = new Phaser.Game(gameConfig);
registerPhaserGame(game);`:"new Phaser.Game(gameConfig);"}
`},...B.includeYandexGames?[{path:"src/game/platform/yandexGames.ts",content:`import Phaser from 'phaser';

type YandexSDK = {
  features?: {
    LoadingAPI?: { ready(): void };
    GameplayAPI?: { start(): void; stop(): void };
  };
  environment?: { i18n?: { lang?: string } };
  on?(event: string, callback: () => void): void;
};

declare global {
  interface Window {
    YaGames?: { init(): Promise<YandexSDK> };
    ysdk?: YandexSDK;
    __sdkDone?: boolean;
    __bootDone?: boolean;
    __phaserGame?: Phaser.Game;
    __trySignalReady?: () => void;
  }
}

window.__sdkDone = false;
window.__bootDone = false;

export function registerPhaserGame(game: Phaser.Game): void {
  window.__phaserGame = game;
}

export function signalPhaserBootReady(): void {
  window.__bootDone = true;
  window.__trySignalReady?.();
}

export function gameplayStart(): void {
  window.ysdk?.features?.GameplayAPI?.start();
}

export function gameplayStop(): void {
  window.ysdk?.features?.GameplayAPI?.stop();
}

export async function initYandexGames(): Promise<void> {
  window.__trySignalReady = () => {
    if (window.__sdkDone && window.__bootDone) {
      window.ysdk?.features?.LoadingAPI?.ready();
    }
  };

  window.setTimeout(() => {
    if (!window.__sdkDone) {
      window.__sdkDone = true;
      window.__trySignalReady?.();
    }
  }, 5000);

  try {
    if (window.YaGames) {
      const ysdk = await window.YaGames.init();
      window.ysdk = ysdk;
      void ysdk.environment?.i18n?.lang;

      ysdk.on?.('game_api_pause', () => {
        window.__phaserGame?.loop.sleep();
        gameplayStop();
      });

      ysdk.on?.('game_api_resume', () => {
        window.__phaserGame?.loop.wake();
        gameplayStart();
      });
    }
  } catch {
    // Local dev or SDK unavailable. Continue without blocking the game.
  } finally {
    window.__sdkDone = true;
    window.__trySignalReady?.();
  }
}
`}]:[],{path:"src/game/config/gameConfig.ts",content:`import Phaser from 'phaser';
import { BootScene } from '../scenes/BootScene';
import { PreloadScene } from '../scenes/PreloadScene';
import { TemplateGuideScene } from '../scenes/TemplateGuideScene';
import { GameScene } from '../scenes/GameScene';
import { UIScene } from '../scenes/UIScene';
import { SceneKeys } from './sceneKeys';

export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-root',
  backgroundColor: '#10131a',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  pixelArt: false,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  },
  ${B.includeArcadePhysics?`physics: {
    default: 'arcade',
    arcade: { debug: false },
  },`:""}
  scene: [BootScene, PreloadScene, TemplateGuideScene, GameScene, UIScene],
};
`},{path:"src/game/config/sceneKeys.ts",content:`export const SceneKeys = {
  Boot: 'BootScene',
  Preload: 'PreloadScene',
  TemplateGuide: 'TemplateGuideScene',
  Game: 'GameScene',
  UI: 'UIScene',
} as const;

export type SceneKey = (typeof SceneKeys)[keyof typeof SceneKeys];
`},{path:"src/game/config/gameEvents.ts",content:`export const GameEvents = {
  ScoreChanged: 'score-changed',
  BestScoreChanged: 'best-score-changed',
  GameplayStarted: 'gameplay-started',
  GameplayStopped: 'gameplay-stopped',
} as const;

export type GameEvent = (typeof GameEvents)[keyof typeof GameEvents];
`},{path:"src/game/assets/assetManifest.ts",content:`import Phaser from 'phaser';

export const AssetKeys = {
  // Add stable asset keys here.
} as const;

export type ImageAsset = {
  key: string;
  url: string;
};

export const imageAssets: ImageAsset[] = [];

export function loadImageManifest(scene: Phaser.Scene): void {
  for (const asset of imageAssets) {
    scene.load.image(asset.key, asset.url);
  }
}
`},{path:"src/game/scenes/BootScene.ts",content:`import Phaser from 'phaser';
import { SceneKeys } from '../config/sceneKeys';
${B.includeYandexGames?"import { signalPhaserBootReady } from '../platform/yandexGames';":""}

export class BootScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Boot);
  }

  create(): void {
    ${B.includeYandexGames?"signalPhaserBootReady();":""}
    this.scene.start(SceneKeys.Preload);
  }
}
`},{path:"src/game/scenes/PreloadScene.ts",content:`import Phaser from 'phaser';
import { loadImageManifest } from '../assets/assetManifest';
import { SceneKeys } from '../config/sceneKeys';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preload);
  }

  preload(): void {
    loadImageManifest(this);
  }

  create(): void {
    this.scene.start(SceneKeys.Game);
  }
}
`},{path:"src/game/scenes/TemplateGuideScene.ts",content:`import Phaser from 'phaser';
import { SceneKeys } from '../config/sceneKeys';
import { createTitleText } from '../ui/textStyles';

const ideaPrompts = [
  'Make a one-button arcade game about dodging falling stars.',
  'Make a cozy card collection game with satisfying pack openings.',
  'Make a top-down arena game where the player survives for 60 seconds.',
  'Make a puzzle game about connecting energy nodes on a grid.',
  'Make an idle clicker where tiny machines build a strange factory.',
  'Make a tilemap adventure with one room, one key, and one locked door.',
];

export class TemplateGuideScene extends Phaser.Scene {
  private currentPrompt = 0;
  private promptText!: Phaser.GameObjects.Text;
  private spinHint!: Phaser.GameObjects.Text;

  constructor() {
    super(SceneKeys.TemplateGuide);
  }

  create(): void {
    const { width, height } = this.scale;
    createTitleText(this, width / 2, height * 0.16, '${B.title}');

    this.add
      .text(width / 2, height * 0.27, 'Pick a prompt, open this repo with an agent, and build the first playable loop.', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '24px',
        color: '#b9c7e6',
        align: 'center',
      })
      .setOrigin(0.5);

    this.add.rectangle(width / 2, height * 0.5, width * 0.72, height * 0.26, 0x151b26, 0.96);
    this.add.rectangle(width / 2, height * 0.5, width * 0.72, height * 0.26).setStrokeStyle(2, 0x33435f);

    this.promptText = this.add
      .text(width / 2, height * 0.47, ideaPrompts[this.currentPrompt], {
        fontFamily: 'Arial, sans-serif',
        fontSize: '28px',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: width * 0.6 },
      })
      .setOrigin(0.5);

    this.spinHint = this.add
      .text(width / 2, height * 0.62, 'Click / tap / Space to spin ideas', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '20px',
        color: '#7ee7c8',
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: this.spinHint,
      alpha: 0.5,
      yoyo: true,
      repeat: -1,
      duration: 850,
    });

    this.add
      .text(width / 2, height * 0.78, 'Press Enter to open the sandbox scene', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px',
        color: '#7d8aa5',
      })
      .setOrigin(0.5);

    this.input.on('pointerdown', () => this.spinPrompt());
    this.input.keyboard?.on('keydown-SPACE', () => this.spinPrompt());
    this.input.keyboard?.once('keydown-ENTER', () => this.scene.start(SceneKeys.Game));
  }

  private spinPrompt(): void {
    this.currentPrompt = (this.currentPrompt + 1) % ideaPrompts.length;
    this.promptText.setText(ideaPrompts[this.currentPrompt]);

    this.tweens.add({
      targets: this.promptText,
      scale: { from: 0.96, to: 1 },
      alpha: { from: 0.55, to: 1 },
      duration: 160,
      ease: 'Sine.easeOut',
    });
  }
}
`},{path:"src/game/scenes/GameScene.ts",content:`import Phaser from 'phaser';
import { SceneKeys } from '../config/sceneKeys';
import { createTitleText } from '../ui/textStyles';
${B.includeYandexGames?"import { gameplayStart, gameplayStop } from '../platform/yandexGames';":""}

const ideaPrompts = [
  'Make a one-button arcade game about dodging falling stars.',
  'Make a cozy card collection game with satisfying pack openings.',
  'Make a top-down arena game where the player survives for 60 seconds.',
  'Make a puzzle game about connecting energy nodes on a grid.',
  'Make an idle clicker where tiny machines build a strange factory.',
  'Make a tilemap adventure with one room, one key, and one locked door.',
];

export class GameScene extends Phaser.Scene {
  private currentPrompt = 0;
  private promptText!: Phaser.GameObjects.Text;
  private promptCard!: Phaser.GameObjects.Rectangle;

  constructor() {
    super(SceneKeys.Game);
  }

  create(): void {
    const { width, height } = this.scale;

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.shutdown());

    this.drawBackground(width, height);

    this.add
      .text(72, 64, 'Phaser Game Creator', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px',
        color: '#7ee7c8',
      })
      .setOrigin(0, 0.5);

    createTitleText(this, 72, height * 0.24, '${B.title}').setOrigin(0, 0.5);

    this.add
      .text(74, height * 0.34, 'Agent-ready Phaser template for turning any idea into a first playable loop.', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '24px',
        color: '#b8c6e6',
        wordWrap: { width: width * 0.42 },
      })
      .setOrigin(0, 0.5);

    const steps = [
      'Pick a prompt or write your own idea',
      'Ask the agent for the first playable loop',
      'The agent replaces this sandbox with real gameplay',
    ];

    const stepY = height * 0.48;
    steps.forEach((step, index) => {
      const y = stepY + index * 52;
      this.add.circle(84, y, 15, 0x26334a);
      this.add.text(84, y, String(index + 1), {
        fontFamily: 'Arial, sans-serif',
        fontSize: '15px',
        color: '#ffffff',
      }).setOrigin(0.5);

      this.add.text(116, y, step, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '20px',
        color: '#e4ebf8',
      }).setOrigin(0, 0.5);
    });

    const cardX = width * 0.69;
    const cardY = height * 0.43;
    const cardW = width * 0.42;
    const cardH = height * 0.48;
    this.promptCard = this.add.rectangle(cardX, cardY, cardW, cardH, 0x151b26, 0.97);
    this.promptCard.setStrokeStyle(2, 0x33435f);

    this.add
      .text(cardX - cardW / 2 + 34, cardY - cardH / 2 + 34, 'Prompt wheel', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px',
        color: '#7ee7c8',
      })
      .setOrigin(0, 0.5);

    this.promptText = this.add
      .text(cardX, cardY - 6, ideaPrompts[this.currentPrompt], {
        fontFamily: 'Arial, sans-serif',
        fontSize: '30px',
        color: '#ffffff',
        align: 'left',
        wordWrap: { width: cardW - 72 },
      })
      .setOrigin(0.5);

    const spinHint = this.add
      .text(cardX, cardY + cardH / 2 - 46, 'Click / tap / Space to spin prompt ideas', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '20px',
        color: '#7ee7c8',
      })
      .setOrigin(0.5);

    this.add
      .text(74, height - 62, 'Included: AGENTS.md  /  skills  /  docs  /  Playwright smoke test', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '17px',
        color: '#7d8aa5',
      })
      .setOrigin(0, 0.5);

    this.tweens.add({
      targets: spinHint,
      alpha: 0.5,
      yoyo: true,
      repeat: -1,
      duration: 850,
    });

    this.input.on('pointerdown', () => this.spinPrompt());
    this.input.keyboard?.on('keydown-SPACE', () => this.spinPrompt());

    ${B.includeYandexGames?"gameplayStart();":""}
  }

  shutdown(): void {
    ${B.includeYandexGames?"gameplayStop();":""}
  }

  update(): void {}

  private drawBackground(width: number, height: number): void {
    this.add.rectangle(width / 2, height / 2, width, height, 0x10131a);

    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0x1a2231, 0.55);

    for (let x = 0; x <= width; x += 64) {
      graphics.lineBetween(x, 0, x, height);
    }

    for (let y = 0; y <= height; y += 64) {
      graphics.lineBetween(0, y, width, y);
    }

    graphics.lineStyle(2, 0x26334a, 0.8);
    graphics.lineBetween(width * 0.53, 72, width * 0.53, height - 72);
  }

  private spinPrompt(): void {
    this.currentPrompt = (this.currentPrompt + 1) % ideaPrompts.length;
    this.promptText.setText(ideaPrompts[this.currentPrompt]);

    this.tweens.add({
      targets: this.promptText,
      scale: { from: 0.96, to: 1 },
      alpha: { from: 0.55, to: 1 },
      duration: 160,
      ease: 'Sine.easeOut',
    });
  }
}
`},{path:"src/game/scenes/UIScene.ts",content:`import Phaser from 'phaser';
import { SceneKeys } from '../config/sceneKeys';

type UIData = {
  title: string;
  status: string;
};

export class UIScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.UI);
  }

  create(data: UIData): void {
    this.add
      .text(24, 20, data.title, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '22px',
        color: '#ffffff',
      })
      .setScrollFactor(0);

    this.add
      .text(24, 50, data.status, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        color: '#9fb2d8',
      })
      .setScrollFactor(0);
  }
}
`},{path:"src/game/input/PlayerInput.ts",content:`import Phaser from 'phaser';

export class PlayerInput {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  private wasd: Record<string, Phaser.Input.Keyboard.Key> | undefined;
  private pointerTarget = new Phaser.Math.Vector2(0, 0);
  private pointerActive = false;

  constructor(private readonly scene: Phaser.Scene) {
    this.cursors = scene.input.keyboard?.createCursorKeys();
    this.wasd = scene.input.keyboard?.addKeys('W,A,S,D') as
      | Record<string, Phaser.Input.Keyboard.Key>
      | undefined;

    scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.pointerActive = true;
      this.pointerTarget.set(pointer.x, pointer.y);
    });

    scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (pointer.isDown) {
        this.pointerActive = true;
        this.pointerTarget.set(pointer.x, pointer.y);
      }
    });

    scene.input.on('pointerup', () => {
      this.pointerActive = false;
    });
  }

  getMovementVector(): Phaser.Math.Vector2 {
    const vector = new Phaser.Math.Vector2(0, 0);

    if (this.cursors?.left.isDown || this.wasd?.A.isDown) vector.x -= 1;
    if (this.cursors?.right.isDown || this.wasd?.D.isDown) vector.x += 1;
    if (this.cursors?.up.isDown || this.wasd?.W.isDown) vector.y -= 1;
    if (this.cursors?.down.isDown || this.wasd?.S.isDown) vector.y += 1;

    if (vector.lengthSq() > 0) {
      return vector.normalize();
    }

    if (!this.pointerActive) {
      return vector;
    }

    const camera = this.scene.cameras.main;
    const center = new Phaser.Math.Vector2(camera.centerX, camera.centerY);
    return this.pointerTarget.clone().subtract(center).normalize();
  }
}
`},{path:"src/game/save/SaveSystem.ts",content:`export type SaveData = {
  version: number;
  bestScore: number;
};

const defaultSave: SaveData = {
  version: 1,
  bestScore: 0,
};

export class SaveSystem {
  constructor(private readonly namespace: string) {}

  load(): SaveData {
    const raw = localStorage.getItem(this.key);
    if (!raw) return defaultSave;

    try {
      const parsed = JSON.parse(raw) as Partial<SaveData>;
      return { ...defaultSave, ...parsed, version: defaultSave.version };
    } catch {
      return defaultSave;
    }
  }

  save(data: SaveData): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  private get key(): string {
    return \`\${this.namespace}:save\`;
  }
}
`},{path:"src/game/ui/textStyles.ts",content:`import Phaser from 'phaser';

export function createTitleText(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string,
): Phaser.GameObjects.Text {
  return scene.add
    .text(x, y, text, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '56px',
      color: '#ffffff',
      stroke: '#273043',
      strokeThickness: 8,
    })
    .setOrigin(0.5);
}
`},{path:"src/game/systems/.gitkeep",content:""},{path:"src/game/entities/.gitkeep",content:""},{path:"src/game/state/.gitkeep",content:""},{path:"src/game/utils/.gitkeep",content:""},{path:"public/assets/.gitkeep",content:""},...B.includeTilemaps?[{path:"public/assets/tilemaps/.gitkeep",content:""},{path:"public/assets/tilesets/.gitkeep",content:""},{path:"src/game/tilemaps/tilemapPipeline.md",content:"# Tilemap Pipeline\n\nUse this folder when the game needs Tiled/Phaser tilemaps.\n\nSuggested convention:\n\n- Export maps to `public/assets/tilemaps/`.\n- Store tilesets under `public/assets/tilesets/`.\n- Load maps from `PreloadScene`.\n- Keep layer names stable: `ground`, `collision`, `objects`.\n- Document collision/object layer rules near the map data.\n\nWhen changing tilemaps, use the `phaser-assets-pipeline` and `phaser-responsive-layout` skills.\n"}]:[]]}function $e(B){const q=[];return q.push(pe("phaser-project-architect","Use when planning or changing the architecture of a Phaser mobile/desktop game project: folders, scene boundaries, systems, entities, state, assets, save, UI, testing, optional modules, or Phaser version strategy.","# Phaser Project Architect\n\n## Workflow\n\n1. Confirm the game remains Phaser-first and mobile/desktop browser-targeted.\n2. Read `references/folder-architecture.md` before adding new top-level folders.\n3. Read `references/scene-system-boundaries.md` before moving behavior between scenes, systems, entities, state, or save.\n4. Read `references/phaser-version-strategy.md` before changing Phaser version or using Phaser 4-only APIs.\n5. Read `references/module-selection.md` before adding ECS, rexUI, editor compatibility, publishing packs, wrappers, or plugins.\n6. Keep scenes thin when possible; put reusable behavior in systems, entities, input, state, save, or UI helpers.\n7. Update `AGENTS.md`, `.ai/skill-manifest.json`, or `skills/_meta/task-map.md` if architecture routing changes.\n\n## Default Boundaries\n\n- `scenes/`: Phaser lifecycle, scene transitions, orchestration.\n- `systems/`: gameplay rules that are not tied to one display object.\n- `entities/`: factories/classes for player, enemies, items, projectiles.\n- `input/`: touch, pointer, keyboard, mouse, gamepad abstraction.\n- `ui/`: HUD, menus, dialogs, reusable display helpers.\n- `state/`: runtime data and cross-scene state.\n- `save/`: local persistence and migrations.\n- `assets/`: manifests, asset keys, loader helpers.\n"),Q("phaser-project-architect","folder-architecture.md",`# Folder Architecture

Default generated layout:

\`\`\`text
src/game/
  config/     Phaser config, scene keys, game constants
  scenes/     Boot, preload, menu, gameplay, UI, pause, game over
  systems/    Reusable gameplay rules and services
  entities/   Display object factories/classes and entity composition
  input/      Pointer/keyboard/touch/gamepad abstraction
  ui/         HUD, menu, dialog, text, button helpers
  state/      Runtime state, score, progression, cross-scene data
  save/       Local persistence and save migrations
  assets/     Asset keys, manifests, loader helpers
  platform/   Optional platform adapters like Yandex Games
  utils/      Small pure helpers
\`\`\`

Rules:

- Add new folders only when a repeated responsibility appears.
- Keep Phaser runtime code under \`src/game/\`.
- Keep reusable pure logic separate from Phaser objects when practical.
- Do not add generic app folders like \`components/\`, \`pages/\`, or \`routes/\` unless a DOM UI framework is explicitly selected.
- Put generated or editor-owned files under a clearly named folder and document ownership.
`),Q("phaser-project-architect","scene-system-boundaries.md",`# Scene/System Boundaries

Scenes should:

- own Phaser lifecycle methods: \`preload\`, \`create\`, \`update\`;
- orchestrate scene transitions;
- create cameras, input models, display layers, and systems;
- connect systems to Phaser events.

Systems should:

- hold reusable rules that can outlive one scene;
- update gameplay behavior that is not just a single display object;
- expose explicit methods like \`start\`, \`stop\`, \`update\`, \`reset\`.

Entities should:

- build player/enemy/item/projectile display objects;
- hide repetitive sprite/body setup;
- avoid becoming global state containers.

State should:

- store runtime values shared across scenes;
- avoid direct Phaser dependencies when possible.

Save should:

- version persisted data;
- handle malformed saves;
- save after meaningful player actions.
`),Q("phaser-project-architect","phaser-version-strategy.md",`# Phaser Version Strategy

Default stance:

- Use Phaser 3 for generated projects until the user asks for Phaser 4.
- Reason: Phaser 3 has broad examples, plugins, templates, and community support.
- Keep awareness of Phaser 4 because official skills and npm package skills may include Phaser 4 patterns.

Before upgrading:

1. Check official Phaser skills: https://github.com/phaserjs/phaser/tree/master/skills
2. Check pinned npm package skills, for example: https://app.unpkg.com/phaser@4.1.0/files/skills/
3. Check current Phaser docs: https://docs.phaser.io/
4. Verify plugin compatibility, especially rex plugins, virtual joystick, editor workflows, and publishing SDK integration.

Rules:

- Do not mix Phaser 4-only APIs into a Phaser 3 project.
- Document version assumptions in \`README.md\` or a local reference if changed.
- Prefer source-compatible TypeScript patterns over relying on undocumented internals.
`),Q("phaser-project-architect","module-selection.md",`# Module Selection

Core modules are always present:

- scenes
- assets
- input
- responsive layout
- systems/entities/state/save
- UI/HUD
- gamefeel
- testing

Optional modules should be added only when the game needs them:

- Yandex Games: when publishing to Yandex.
- rexUI: when vanilla Phaser UI becomes too costly for menus/dialogs/lists.
- virtual controls: when mobile continuous movement needs joystick/buttons.
- tilemaps: when using Tiled or tile-based worlds.
- Phaser Editor compatibility: when using visual scene/asset workflows.
- ECS: only for entity-heavy or query-heavy simulations.
- PWA/wrappers: only for install/distribution needs.

Avoid by default:

- React/Svelte app shells.
- Backend or multiplayer stacks.
- Electron/Capacitor/Tauri.
- Generic web-app architecture.
`)),q.push(pe("phaser-scene-workflow","Use when creating, refactoring, debugging, or connecting Phaser scenes: boot, preload, menu, gameplay, UI overlay, pause, transitions, scene lifecycle, or scene communication.","# Phaser Scene Workflow\n\n## Workflow\n\n1. Read `references/scene-lifecycle.md` before changing lifecycle methods.\n2. Read `references/default-scene-stack.md` before adding or removing scenes.\n3. Read `references/scene-communication.md` before passing data/events across scenes.\n4. Keep loading in `PreloadScene` or asset helpers.\n5. Keep persistent HUD/overlay UI in a separate scene when it must survive gameplay restarts.\n6. Use explicit scene keys and central constants when the project grows.\n\n## Default Scene Stack\n\n- `BootScene`: quick startup decisions.\n- `PreloadScene`: asset loading.\n- `TemplateGuideScene`: explains how to turn the template into a real game.\n- `GameScene`: sandbox placeholder for the first playable loop.\n- `UIScene`: HUD/overlay.\n"),Q("phaser-scene-workflow","scene-lifecycle.md","# Scene Lifecycle\n\nCommon Phaser scene hooks:\n\n- `constructor`: set scene key only.\n- `init(data)`: receive scene data.\n- `preload`: load assets only.\n- `create`: create objects, systems, input, events.\n- `update(time, delta)`: frame updates; keep it short.\n- `shutdown`/events: clean up listeners and platform state.\n\nRules:\n\n- Avoid asset loading in gameplay scenes unless streaming is intentional.\n- Avoid creating keyboard/pointer listeners repeatedly without cleanup.\n- Avoid long logic directly inside `update`; delegate to systems.\n- Use `scene.start` for replacing a scene and `scene.launch` for overlays.\n"),Q("phaser-scene-workflow","default-scene-stack.md","# Default Scene Stack\n\nRecommended base:\n\n- `BootScene`: platform boot, early flags, redirects to preload.\n- `PreloadScene`: asset loading and loader progress UI.\n- `TemplateGuideScene`: generated onboarding scene; replace with real menu/gameplay once the first loop exists.\n- `GameScene`: first playable or sandbox scene.\n- `UIScene`: HUD overlay.\n\nOptional:\n\n- `PauseScene`: pause overlay.\n- `MenuScene`: real game menu after the first playable is designed.\n- `GameOverScene`: post-run summary.\n- `SettingsScene`: controls/audio/language.\n- `LevelSelectScene`: progression games.\n\nKeep scene names stable because agent routing and tests often refer to them.\n"),Q("phaser-scene-workflow","scene-communication.md",`# Scene Communication

Preferred options:

1. Pass simple data through \`scene.start(key, data)\` or \`scene.launch(key, data)\`.
2. Use Phaser events for short-lived notifications.
3. Use a small state module for cross-scene state.
4. Use save modules only for persisted data.

Avoid:

- Reading random properties from another scene.
- Global mutable objects without ownership.
- Circular scene dependencies.
- UI scene directly mutating gameplay internals.

For platform integrations like Yandex, use \`platform/\` adapters instead of scattering SDK calls across scenes.
`)),q.push(pe("phaser-assets-pipeline","Use when adding or changing Phaser assets: image keys, spritesheets, atlases, audio, fonts, tilemaps, preload order, asset manifests, no-CDN rules, or missing asset debugging.","# Phaser Assets Pipeline\n\n## Workflow\n\n1. Read `references/asset-manifest.md` before adding keys.\n2. Read `references/loader-patterns.md` before changing preload behavior.\n3. Read `references/texture-atlas.md` before adding atlases/spritesheets.\n4. Read `references/tilemaps.md` before adding Tiled maps.\n5. Read `references/no-cdn-self-hosting.md` before adding fonts or external assets.\n6. Add assets under `public/assets/`.\n7. Reference assets by constants or manifest keys, not scattered strings.\n\n## Rules\n\n- Use predictable folders: `images/`, `sprites/`, `audio/`, `fonts/`, `tilemaps/`, `atlases/`.\n- Keep asset names lowercase and hyphenated.\n- Do not load large assets inside gameplay scenes unless there is a deliberate streaming strategy.\n"),Q("phaser-assets-pipeline","asset-manifest.md",`# Asset Manifest

Use a manifest so asset keys are discoverable:

\`\`\`ts
export const ImageKeys = {
  player: 'player',
} as const;

export const imageAssets = [
  { key: ImageKeys.player, url: '/assets/images/player.png' },
];
\`\`\`

Rules:

- Keep keys stable.
- Do not duplicate string keys across scenes.
- Group by asset type: images, spritesheets, atlases, audio, fonts, tilemaps.
- Keep filenames lowercase and hyphenated.
- Add comments only for non-obvious export settings or ownership.
`),Q("phaser-assets-pipeline","loader-patterns.md",`# Loader Patterns

Load assets from \`PreloadScene\` by manifest helpers.

Use Phaser loader methods by type:

- \`load.image\`
- \`load.spritesheet\`
- \`load.atlas\`
- \`load.audio\`
- \`load.bitmapFont\`
- \`load.tilemapTiledJSON\`

Rules:

- Keep preload deterministic.
- Show progress only if it improves user experience.
- Avoid loading from remote URLs.
- If assets fail, check browser network tab, path, key, case sensitivity, and Vite public path.
`),Q("phaser-assets-pipeline","texture-atlas.md",`# Texture Atlases And Spritesheets

Use spritesheets for simple fixed-frame animation.
Use atlases for packed assets, UI pieces, and many sprites.

Suggested folders:

\`\`\`text
public/assets/sprites/
public/assets/atlases/
public/assets/images/
\`\`\`

Rules:

- Keep atlas JSON and image together.
- Keep frame names stable.
- Prefer TexturePacker/Aseprite export settings that are easy to reproduce.
- Document export settings if another tool must regenerate assets.
`),Q("phaser-assets-pipeline","tilemaps.md",`# Tilemaps

Use Tiled for map authoring when the game is tile/world based.

Suggested folders:

\`\`\`text
public/assets/tilemaps/
public/assets/tilesets/
\`\`\`

Rules:

- Keep layer names stable: \`ground\`, \`collision\`, \`objects\`, \`decor\`.
- Document collision and object-layer semantics.
- Load with \`load.tilemapTiledJSON\`.
- Keep tileset image paths compatible with Vite public assets.
`),Q("phaser-assets-pipeline","no-cdn-self-hosting.md",`# No CDN And Self-Hosting

For game portals, mobile browsers, and Yandex Games, avoid external dependencies at runtime.

Rules:

- Do not use Google Fonts links.
- Do not load libraries from CDN.
- Self-host fonts under \`public/assets/fonts/\` or \`public/fonts/\`.
- Use npm dependencies bundled by Vite instead of runtime CDN scripts.
- Yandex allows its own SDK path \`/sdk.js\`; do not treat that as a generic CDN exception.

This reduces blank-page failures, moderation issues, and regional network failures.
`)),q.push(pe("phaser-input-mobile-desktop","Use when implementing or debugging mobile and desktop controls in Phaser: pointer, touch, mouse, keyboard, drag, gestures, virtual buttons, virtual joystick, browser input gotchas, or gamepad support.","# Phaser Input Mobile/Desktop\n\n## Workflow\n\n1. Read `references/pointer-keyboard-touch.md` before changing base input.\n2. Read `references/mobile-controls.md` before adding touch UI.\n3. Read `references/virtual-joystick.md` before adding joystick controls.\n4. Read `references/browser-input-gotchas.md` before release or publishing.\n5. Keep input reading in `src/game/input/`; scenes should ask input models for intent.\n6. Test with mouse, touch viewport, and keyboard.\n\n## Rules\n\n- Do not scatter raw key checks across many scenes.\n- Prefer action names like `move`, `jump`, `confirm`, `cancel`.\n- Make touch targets large and reachable.\n"),Q("phaser-input-mobile-desktop","pointer-keyboard-touch.md",`# Pointer, Keyboard, Touch

Default stance:

- Pointer input is the shared mobile/desktop baseline.
- Keyboard improves desktop ergonomics.
- Touch UI is needed for mobile actions that cannot be inferred from pointer/tap.

Pattern:

- Map raw inputs to intent/actions.
- Scenes read actions, not raw keys.
- Keep key names and pointer behavior centralized.

Desktop:

- Support WASD or arrows where movement exists.
- Avoid browser/OS hotkey conflicts like Ctrl+W, F5, Alt+F4.

Mobile:

- Do not rely on keyboard-only actions.
- Keep tap targets large.
- Avoid long-press selection/context menu.
`),Q("phaser-input-mobile-desktop","mobile-controls.md",`# Mobile Controls

Use touch controls when:

- movement is continuous;
- actions are repeated quickly;
- the player needs two-thumb control;
- pointer-to-move is not enough.

Rules:

- Keep controls away from safe-area edges.
- Avoid covering critical gameplay.
- Make controls visually clear but not visually dominant.
- Support one-handed play when game design allows.
- Test portrait and landscape if both are supported.
`),Q("phaser-input-mobile-desktop","virtual-joystick.md",`# Virtual Joystick

Add virtual joystick only when the game needs analog or continuous movement.

Possible sources:

- rex virtual joystick ecosystem.
- Phaser virtual joystick plugins.
- Custom pointer delta if the game is simple.

Before adding a plugin:

- Check Phaser 3/4 compatibility.
- Prefer npm/local code over CDN.
- Ensure generated agent docs mention ownership and setup.

Avoid joystick for simple tap, drag, puzzle, card, or turn-based games unless playtests show it is needed.
`),Q("phaser-input-mobile-desktop","browser-input-gotchas.md",`# Browser Input Gotchas

For mobile/desktop web games:

- Disable unwanted text selection in game containers.
- Disable context menu on canvas/root.
- Avoid browser scroll and swipe-to-refresh.
- Initialize audio only after user interaction.
- Do not capture reserved browser shortcuts.
- Test mouse, touch emulation, real touch if available, and keyboard.

For Yandex Games:

- Entire game must be gesture-controllable on mobile.
- Desktop should support keyboard/mouse by default.
- Long-tap must not trigger selection.
- Interaction must not trigger browser context menu.
`)),q.push(pe("phaser-responsive-layout","Use when changing Phaser scale, canvas sizing, orientation, fullscreen, safe areas, UI placement, FIT vs RESIZE, or mobile/desktop viewport behavior.",`# Phaser Responsive Layout

## Workflow

1. Read \`references/scale-manager.md\` before editing Phaser scale config.
2. Read \`references/fit-vs-resize.md\` before choosing scale mode.
3. Read \`references/safe-area-orientation.md\` before changing mobile layout.
4. Read \`references/mobile-desktop-checklist.md\` before finalizing layout.
5. Position UI relative to viewport/logical dimensions, not magic pixels.
6. Test phone, tablet, desktop, narrow laptop, and wide desktop viewports.

## Rules

- Default to \`Phaser.Scale.FIT\` and centered canvas for simple games.
- Use safe margins for mobile HUD.
- Keep text readable on desktop and mobile.
`),Q("phaser-responsive-layout","scale-manager.md","# Phaser Scale Manager\n\nCommon scale modes:\n\n- `FIT`: preserve logical size and aspect ratio; can letterbox.\n- `RESIZE`: canvas follows viewport size; requires responsive world/UI logic.\n- `ENVELOP`: fills but may crop.\n- `NONE`: manual sizing.\n\nDefault generated projects use `FIT` because it is simpler for first playable loops.\n\nRules:\n\n- Centralize scale config in `src/game/config/gameConfig.ts`.\n- Avoid reading `window.innerWidth` everywhere.\n- Use `this.scale.width` and `this.scale.height` in scenes.\n- Listen for resize only in a dedicated layout helper/system when needed.\n"),Q("phaser-responsive-layout","fit-vs-resize.md",`# FIT vs RESIZE

Use \`FIT\` when:

- fixed logical resolution is acceptable;
- the game is early prototype/MVP;
- letterboxing is acceptable.

Use \`RESIZE\` when:

- publishing rules require edge-to-edge play area;
- UI must use all available space;
- the game targets many aspect ratios.

If switching to \`RESIZE\`:

- Separate world camera and UI layout.
- Anchor HUD from real viewport size.
- Preserve sprite aspect ratio; do not stretch gameplay art.
- Test ultrawide, narrow laptop, phone portrait, phone landscape.

Yandex note:

- Yandex desktop moderation can dislike letterboxing. For Yandex builds, consider \`RESIZE\` plus camera/layout compensation.
`),Q("phaser-responsive-layout","safe-area-orientation.md",`# Safe Area And Orientation

Mobile rules:

- Leave margins for notches and browser UI.
- Avoid controls too close to screen edges.
- Use CSS \`viewport-fit=cover\` only when layout handles safe areas.
- Keep portrait/landscape decision explicit.

Suggested approach:

- Start orientation-flexible during development.
- Lock or recommend orientation only when gameplay requires it.
- Keep HUD anchors relative to viewport edges.
- Recompute layout on resize/orientation change.
`),Q("phaser-responsive-layout","mobile-desktop-checklist.md",`# Mobile/Desktop Layout Checklist

Before finishing layout changes:

- Canvas visible and not blank on desktop.
- Canvas visible and not blank on phone viewport.
- No browser scrollbars.
- No clipped HUD.
- Text fits inside UI elements.
- Touch controls do not cover critical gameplay.
- Desktop layout uses width well without stretching sprites.
- Mobile layout remains readable.
- Resize does not leave stale UI positions.
`)),q.push(pe("phaser-game-systems","Use when adding gameplay systems, entities, state, events, save data, progression, scoring, economy, ECS decisions, or cross-scene data flow in a Phaser game.",`# Phaser Game Systems

## Workflow

1. Read \`references/entities-systems-state.md\` before adding gameplay architecture.
2. Read \`references/events.md\` before adding cross-module events.
3. Read \`references/save-system.md\` before changing persistence.
4. Read \`references/when-to-use-ecs.md\` before adding ECS libraries.
5. Keep pure game rules independent from Phaser when practical.
6. Prefer simple events and explicit method calls before global state.

## Defaults

- Runtime-only data: \`state/\`.
- Persistent data: \`save/\`.
- Reusable gameplay behavior: \`systems/\`.
- Display object construction: \`entities/\`.
`),Q("phaser-game-systems","entities-systems-state.md",`# Entities, Systems, State

Use entities for:

- constructing sprites/containers/bodies;
- grouping display object setup;
- reusable actor factories.

Use systems for:

- collision consequences;
- spawning rules;
- scoring;
- timers/progression;
- enemy behavior orchestration;
- economy/balance logic.

Use state for:

- score, lives, level, selected character;
- runtime flags shared between scenes;
- data that should be testable.

Keep the scene responsible for wiring, not owning all logic.
`),Q("phaser-game-systems","events.md",`# Events

Use events when:

- UI needs to react to gameplay changes;
- systems should be decoupled;
- scene communication would otherwise become direct references.

Rules:

- Prefer named constants for event names as the project grows.
- Clean up listeners on scene shutdown.
- Do not use events for everything; direct method calls are clearer for close collaborators.
- Document event payload shape near the event constants.
`),Q("phaser-game-systems","save-system.md",`# Save System

Save data should:

- include a version number when it becomes nontrivial;
- handle missing/malformed localStorage data;
- save after meaningful player actions;
- avoid storing live Phaser objects;
- support migration if structure changes.

Good persisted data:

- best score;
- unlocked levels;
- settings;
- collected items;
- progress flags.

Bad persisted data:

- sprites, scenes, cameras, raw input objects;
- huge cached assets;
- transient animation state.
`),Q("phaser-game-systems","when-to-use-ecs.md",`# When To Use ECS

Do not default to ECS.

Consider ECS only when:

- there are many similar entities;
- systems query entities by component combinations;
- performance/data layout matters;
- class inheritance is becoming painful.

Optional sources:

- bitECS for data-oriented ECS.
- Miniplex for lighter TypeScript entity queries.

For most small Phaser games, simple systems plus entity factories are easier for agents and humans.
`)),q.push(pe("phaser-ui-hud","Use when building or changing in-game UI in Phaser: HUD, menus, dialogs, overlays, buttons, pause screen, responsive UI, text readability, or optional rexUI integration.",`# Phaser UI HUD

## Workflow

1. Read \`references/ui-scene.md\` before adding persistent HUD or overlays.
2. Read \`references/hud-layout.md\` before positioning UI.
3. Read \`references/rex-ui-optional.md\` before adding rexUI/plugins.
4. Decide whether UI belongs in gameplay scene or a separate overlay scene.
5. Keep buttons and touch targets large enough for mobile.
6. Keep UI state synchronized through explicit data/events.

## Rules

- Do not build DOM UI unless there is a specific reason.
- Prefer a dedicated \`UIScene\` for persistent HUD.
- Avoid text that overlaps gameplay-critical areas on mobile.
`),Q("phaser-ui-hud","ui-scene.md",`# UI Scene

Use a separate \`UIScene\` when:

- HUD should persist while gameplay restarts;
- overlays should not be affected by world camera movement;
- UI needs its own input priority;
- gameplay and UI logic are getting tangled.

Keep UI scenes:

- anchored to screen coordinates;
- updated from events/state;
- independent from direct gameplay object mutation when possible.
`),Q("phaser-ui-hud","hud-layout.md",`# HUD Layout

Rules:

- Anchor from viewport edges or center.
- Use safe margins on mobile.
- Keep text readable on dark and bright backgrounds.
- Keep touch buttons large and spaced.
- Avoid placing UI over core gameplay unless the game design expects it.
- Recompute positions on resize if using \`RESIZE\`.

HUD should show only useful state. Avoid debug labels in production.
`),Q("phaser-ui-hud","rex-ui-optional.md",`# rexUI Optional

rexUI is useful when vanilla Phaser UI becomes too expensive:

- dialogs;
- menus;
- tabs;
- scrollable lists;
- sliders;
- layout/sizer systems;
- grid tables.

Before adding:

- Check Phaser version compatibility.
- Prefer npm/local bundled code over CDN.
- Keep plugin setup documented.
- Avoid adding rexUI for a single simple button.
`)),q.push(pe("phaser-gamefeel","Use when improving Phaser game feel: camera shake, tweens, particles, hit stop, screen flash, sound cues, animation timing, impact feedback, reward moments, or procedural audio.",`# Phaser Gamefeel

## Workflow

1. Read \`references/tweens-camera-particles.md\` before adding visual feedback.
2. Read \`references/audio-feedback.md\` before adding sounds.
3. Read \`references/impact-patterns.md\` before tuning hit/reward moments.
4. Identify the player action or game event that needs feedback.
5. Layer feedback: motion, sound, visual effect, timing, camera.
6. Test feel on mobile and desktop, because input rhythm differs.

## Common Tools

- Tweens for motion and emphasis.
- Camera shake/flash for impact.
- Particles for reward and destruction.
- Short audio cues for confirmation.
- Brief pause or slow motion for major hits only.
`),Q("phaser-gamefeel","tweens-camera-particles.md",`# Tweens, Camera, Particles

Use tweens for:

- button press/release;
- item pickup;
- damage feedback;
- reward emphasis;
- menu transitions.

Use camera effects for:

- impact;
- major transitions;
- danger;
- success/failure.

Use particles for:

- collection;
- destruction;
- celebration;
- environmental motion.

Keep effects brief and readable. Too much feedback becomes noise.
`),Q("phaser-gamefeel","audio-feedback.md",`# Audio Feedback

Audio rules:

- Initialize audio after user interaction.
- Provide mute/volume if game has substantial audio.
- Use short cues for UI confirm, pickup, hit, fail, reward.
- Avoid long overlapping sounds for repeated actions.
- Mute/pause audio during platform pause and ads when publishing.

Procedural audio can reduce asset size for small games.
`),Q("phaser-gamefeel","impact-patterns.md",`# Impact Patterns

Small action:

- short tween;
- soft sound;
- tiny particle or color flash.

Damage/hit:

- brief sprite flash;
- small camera shake;
- knockback or squash;
- hit sound.

Major reward:

- stronger tween;
- particles;
- pitch/rhythm change;
- short pause before reward reveal.

Do not apply all effects everywhere. Pick a consistent feedback language.
`)),q.push(pe("phaser-testing","Use when adding or fixing tests for a Phaser Vite game: build validation, dev server checks, Playwright canvas smoke tests, mobile/desktop viewport checks, Vitest pure logic tests, or generated project validation.",`# Phaser Testing

## Workflow

1. Read \`references/vite-build.md\` before changing build config.
2. Read \`references/playwright-canvas-smoke.md\` before changing browser smoke tests.
3. Read \`references/mobile-desktop-viewports.md\` before validating layout/input.
4. Run \`npm run build\` after TypeScript or Vite changes.
5. Use Playwright smoke tests to verify the canvas renders.
6. Report what was verified and what was not.

## Smoke Test Goals

- Dev server starts.
- Canvas exists.
- Canvas is visible.
- Main scene reaches an interactive state.
- Mobile viewport does not break layout.
`),Q("phaser-testing","vite-build.md",`# Vite Build

Use:

\`\`\`bash
npm run build
npm run preview
\`\`\`

Check:

- TypeScript passes.
- Vite produces \`dist/\`.
- Public assets resolve.
- No unexpected external runtime URLs.

For publishing targets, platform packs may add stricter build validation.
`),Q("phaser-testing","playwright-canvas-smoke.md",`# Playwright Canvas Smoke

Minimum browser smoke test:

- Start dev server.
- Visit root route.
- Locate \`canvas\`.
- Assert canvas is visible.
- Assert width/height > 0.
- Wait briefly for scene creation.

Better tests:

- Check a visible menu/start text.
- Click/tap to enter gameplay.
- Verify the UI scene appears.
- Run desktop and mobile projects.
`),Q("phaser-testing","mobile-desktop-viewports.md",`# Mobile/Desktop Viewports

Test at least:

- Desktop Chrome.
- Pixel/Android-like phone.
- Narrow laptop viewport.
- Optional tablet viewport.

When input/layout changes:

- Verify pointer/touch path.
- Verify keyboard path.
- Verify text fits.
- Verify HUD does not clip.
- Verify canvas is not blank.
`)),q.push(pe("phaser-skill-pack-maintainer","Use when adding, editing, validating, syncing, or reorganizing this project-local Phaser skill pack, AGENTS.md, task maps, source registry, manifests, or agent onboarding docs.",`# Phaser Skill Pack Maintainer

## Workflow

1. Read \`references/skill-quality-rules.md\`.
2. Read \`references/source-sync.md\` before updating from upstream.
3. Read \`references/phaser-skill-sources.md\` before changing Phaser knowledge.
4. Keep every skill Phaser mobile/desktop focused.
5. Make descriptions trigger-focused.
6. Update \`skills/README.md\`, \`skills/_meta/task-map.md\`, \`.ai/skill-manifest.json\`, and agent entry files when routing changes.

## Rules

- Do not create giant skills.
- Move detailed API notes into \`references/\`.
- Prefer action-oriented instructions over background essays.
- A new agent must be able to understand the project without chat history.
`),Q("phaser-skill-pack-maintainer","skill-quality-rules.md",`# Skill Quality Rules

Good skills:

- have trigger-focused frontmatter descriptions;
- keep \`SKILL.md\` short and procedural;
- put detailed knowledge in \`references/\`;
- tell agents exactly when to open each reference;
- include validation steps;
- avoid generic advice.

Bad skills:

- repeat common model knowledge without project-specific value;
- become huge essays;
- omit routing updates;
- mention optional modules as if they are always installed.
`),Q("phaser-skill-pack-maintainer","source-sync.md",`# Source Sync

Primary upstreams:

- Phaser official skills: https://github.com/phaserjs/phaser/tree/master/skills
- Phaser npm/unpkg skills for pinned versions.
- Phaser docs: https://docs.phaser.io/
- Anthropic skill-creator: https://github.com/anthropics/skills/tree/main/skills/skill-creator
- Agent Skills spec: https://agentskills.io/specification.md

When syncing:

- Record source and date in a reference or changelog-like note.
- Do not blindly overwrite local project rules.
- Preserve Phaser mobile/desktop focus.
- Update manifests and task maps.
`),Q("phaser-skill-pack-maintainer","phaser-skill-sources.md",`# Phaser Skill Sources

Use official Phaser sources first:

- GitHub skills directory.
- Phaser docs.
- Phaser examples.
- Phaser templates.
- npm/unpkg package skill files for pinned versions.

Optional audited sources:

- Phaser Editor docs.
- rexUI docs.
- publishing platform docs.
- community agent skills, only after manual review.

Keep community sources lower trust than official Phaser and platform documentation.
`)),B.includeYandexGames&&q.push(pe("yandex-publish","Prepare and validate a Phaser HTML5 game for Yandex Games publishing. Use when integrating the Yandex Games SDK, fixing moderation issues, adding ads/localization, validating requirements, creating promo materials, or building a Yandex submission ZIP.","# Yandex Games Publish\n\n## Workflow\n\n1. Read `docs/yandex-games.md`.\n2. Read `references/sdk-startup.md` before touching SDK initialization.\n3. Read `references/loading-gameplay-api.md` before changing loading, scene boot, pause/resume, or gameplay state.\n4. Read `references/no-cdn-production.md` before adding fonts/scripts/assets.\n5. Read `references/ads.md` before adding interstitial, rewarded, or banner ads.\n6. Read `references/localization.md` before adding visible text.\n7. Read `references/layout-input-requirements.md` before changing canvas, CSS, input, or scaling.\n8. Read `references/promo-materials.md` before preparing store media.\n9. Read `references/pre-submission-checklist.md` before packaging.\n10. Read `references/windows-zip.md` before creating ZIP on Windows.\n11. Before upload, run:\n\n```bash\nnpm run validate:yandex\nnpm run build:yandex\n```\n\n## Moderation Rules To Remember\n\n- No browser scrollbars or swipe-to-refresh.\n- No text selection, context menu, or long-tap selection during play.\n- No `console` or `debugger` in production bundle.\n- All SDK promises should have `.catch()` handlers.\n- All visible text should be localized for selected languages.\n- Rewarded ad buttons must clearly say the user watches an ad and what reward is given.\n- On Windows, create ZIP with Python, not PowerShell, so ZIP entries use forward slashes.\n\n## Files In This Project\n\n- `src/game/platform/yandexGames.ts`: SDK init, pause/resume, LoadingAPI bridge.\n- `docs/yandex-games.md`: release checklist.\n- `scripts/make-yandex-zip.py`: upload ZIP creator.\n- `scripts/validate-yandex-build.py`: starter validation checks.\n"),Q("yandex-publish","sdk-startup.md",`# SDK Startup

Required:

- Load SDK synchronously in \`index.html\` with \`<script src="/sdk.js"><\/script>\`.
- Initialize with \`YaGames.init()\`.
- Store the SDK object on \`window.ysdk\`.
- Use a fallback path for local dev or SDK init failure.
- Do not block the game forever if SDK is unavailable.

Phaser startup pattern:

1. Start Phaser immediately.
2. Track \`__sdkDone\`.
3. Track \`__bootDone\`.
4. Call \`LoadingAPI.ready()\` only when both are true.

The generated file \`src/game/platform/yandexGames.ts\` contains the starter version of this bridge.
`),Q("yandex-publish","loading-gameplay-api.md",`# LoadingAPI And GameplayAPI

LoadingAPI:

- Call \`ysdk.features.LoadingAPI?.ready()\` when the game is loaded and ready.
- Must be called in success and fallback/error paths.
- Do not let Yandex loading overlay remain forever.

GameplayAPI:

- Call \`GameplayAPI.start()\` when active gameplay begins.
- Call \`GameplayAPI.stop()\` when gameplay pauses, ends, ads open, or blocking overlays appear.

Pause/resume:

- Subscribe to \`game_api_pause\`.
- Subscribe to \`game_api_resume\`.
- Actually pause/resume the Phaser loop.
- Mute/unmute audio if audio exists.

Verification:

- Use Yandex debug panel if available.
- Pause button must visibly freeze gameplay.
`),Q("yandex-publish","ads.md",`# Ads

Interstitial ads:

- Show only at logical pauses: between levels, restart, after game over acknowledgment.
- Never show during active gameplay.
- Pause gameplay and audio on ad open.
- Resume only after close/error handling.

Rewarded ads:

- Must be user-initiated.
- Button must clearly say the user watches an ad.
- Button must show the expected reward.
- Grant reward in the rewarded callback, not merely on close.
- Reward cannot be required for core progression.

Sticky banners:

- Use only through Yandex SDK.
- Check availability.
- Avoid covering gameplay or HUD.

All SDK promise chains should have \`.catch()\` handlers to avoid moderation-visible unhandled errors.
`),Q("yandex-publish","localization.md",`# Localization

Yandex requirements:

- Minimum English and Russian if those languages are selected.
- All visible text must be localized.
- Use \`ysdk.environment.i18n.lang\` for language detection.
- Read \`i18n.lang\` from the SDK object after \`YaGames.init()\`.
- Do not rely only on \`navigator.language\`.

Common missed text:

- HUD labels.
- Buttons.
- Tooltips.
- Floating combat text.
- Error messages.
- Upgrade names.
- Rewarded ad buttons.
- Promo/screenshot text.

Keep the game name consistent across game UI and draft materials.
`),Q("yandex-publish","layout-input-requirements.md",`# Layout And Input Requirements

Mobile:

- Fullscreen gameplay.
- Gesture controls; no keyboard-only actions.
- No long-tap selection.
- No browser scrollbars or swipe-to-refresh.
- Elements must not distort or overlap on resize.

Desktop:

- Keyboard/mouse control by default.
- Active game field should stretch appropriately.
- Avoid browser/OS hotkey conflicts.
- No context menu or text selection during game interaction.

CSS requirements:

- \`overflow: hidden\`.
- \`overscroll-behavior: none\`.
- \`touch-action: none\` for the game surface.
- \`user-select: none\`.
- Avoid \`100vh\` containers when browser chrome can cause overflow.
`),Q("yandex-publish","no-cdn-production.md",`# No CDN Production

Critical:

- Do not use Google Fonts CDN.
- Do not use cdnjs, unpkg, jsdelivr, cloudflare CDN scripts.
- Self-host fonts and assets.
- Bundle libraries with Vite.
- The allowed SDK script for Yandex is \`/sdk.js\`.

Why:

- External resources may be slow or blocked.
- Moderators can see blank loading if render-blocking resources fail.
- Yandex can reject games that fail to load reliably.
`),Q("yandex-publish","promo-materials.md",`# Promo Materials

Common materials:

- Cover image.
- Icon.
- Desktop screenshots.
- Mobile screenshots.
- Localized text materials.

Rules:

- Screenshots should show active gameplay, not loading/menu/game-over.
- No system UI, phone frame, browser chrome, or Yandex badges.
- EN screenshots should show English only.
- RU screenshots should show Russian only.
- Icons/covers should be polished branded art, not raw screenshots.
- Keep game name consistent across draft, in-game title, cover, and materials.
`),Q("yandex-publish","pre-submission-checklist.md","# Pre-Submission Checklist\n\nBefore packaging:\n\n- `npm run build` passes.\n- `npm run validate:yandex` passes.\n- No external CDN links.\n- SDK path `/sdk.js` is present.\n- `LoadingAPI.ready()` is reachable in all startup paths.\n- `GameplayAPI.start/stop` are used.\n- `game_api_pause/resume` handlers exist.\n- No production `console` or `debugger`.\n- No browser scrollbars.\n- Context menu and text selection disabled.\n- All visible text localized.\n- Save/progress works after refresh if game has progression.\n- Archive uncompressed size is within Yandex limits.\n- ZIP contains `index.html` at root.\n"),Q("yandex-publish","windows-zip.md",`# Windows ZIP

Do not use PowerShell \`Compress-Archive\` for Yandex upload ZIPs.

Reason:

- It can create entries with backslash paths like \`assets\\index.js\`.
- Yandex hosts on Linux-like systems expecting forward slashes.
- This can cause JS/assets 404 after upload.

Use:

\`\`\`bash
npm run build:yandex
\`\`\`

The generated Python script writes ZIP paths with forward slashes.

Verify:

\`\`\`bash
python -c "import zipfile; print(zipfile.ZipFile('yandex-game.zip').namelist()[:5])"
\`\`\`
`)),q}function pe(B,q,f){return{path:`skills/${B}/SKILL.md`,content:`---
name: ${B}
description: ${q}
---

${f}
`}}function Q(B,q,f){return{path:`skills/${B}/references/${q}`,content:f}}function Je(B){return B.trim().toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").replace(/-{2,}/g,"-")||"my-phaser-game"}function Xe(B){return B.trim().replace(/\s+/g," ")||"My Phaser Game"}function Qe(B,q){const f=URL.createObjectURL(B),E=document.createElement("a");E.href=f,E.download=q,document.body.appendChild(E),E.click(),E.remove(),URL.revokeObjectURL(f)}const Oe=document.querySelector("#app");if(!Oe)throw new Error("App root not found");Oe.innerHTML=`
  <section class="page">
    <header class="nav">
      <div class="brand">
        <span></span>
        <strong>Phaser Game Creator</strong>
      </div>
      <div class="nav-pill">Static ZIP generator</div>
    </header>

    <section class="stage">
      <div class="statement">
        <p class="eyebrow">Agent-ready game repository</p>
        <h1>Best skills for Phaser games.</h1>
        <p class="lead">
          Generate a complete Phaser starter repo with AGENTS.md, local AI skills, source maps,
          validation notes, and a project structure that Codex, Claude, or Gemini can understand immediately.
        </p>

        <div class="skill-wall" aria-label="Included sources and systems">
          <span>Anthropic Skill Creator</span>
          <span>Phaser Official Skills</span>
          <span>Agent Skills Spec</span>
          <span>Phaser + TypeScript</span>
          <span>Vite Template</span>
          <span>Playwright Smoke Tests</span>
          <span>Mobile/Desktop Input</span>
          <span>Responsive Layout</span>
          <span id="yandex-badge">Yandex Games optional</span>
        </div>
      </div>

      <form class="console" id="creator-form">
        <div class="console-head">
          <span>New archive</span>
          <strong id="preview-title">my-phaser-game.zip</strong>
        </div>

        <label class="field">
          <span>Game name</span>
          <input id="project-name" name="projectName" type="text" value="My Phaser Game" maxlength="64" autocomplete="off" />
        </label>

        <fieldset class="target-field">
          <legend>Primary target</legend>
          <div class="segments" role="radiogroup" aria-label="Primary target">
            <label class="segment">
              <input type="radio" name="target" value="mobile" checked />
              <span>
                <strong>Mobile</strong>
                <small>Touch, safe areas, phone checks</small>
              </span>
            </label>
            <label class="segment">
              <input type="radio" name="target" value="desktop" />
              <span>
                <strong>Desktop</strong>
                <small>Keyboard, mouse, wide checks</small>
              </span>
            </label>
          </div>
        </fieldset>

        <label class="publish-toggle">
          <input id="yandex-games" type="checkbox" />
          <span>
            <strong>Add Yandex Games publish pack</strong>
            <small>SDK startup, moderation checklist, local skill, deploy ZIP script</small>
          </span>
        </label>

        <button class="primary" type="submit">Download ZIP</button>
      </form>
    </section>

    <section class="flow">
      <article>
        <span>Open</span>
        <strong>Drop the archive into an agent workspace.</strong>
        <p>The repo tells the agent where to start and which local skills to use.</p>
      </article>
      <article>
        <span>Build</span>
        <strong>Work through Phaser-specific skills.</strong>
        <p>Architecture, scenes, assets, input, layout, UI, gamefeel, and tests are routed explicitly.</p>
      </article>
      <article>
        <span>Ship</span>
        <strong>Add Yandex publishing when needed.</strong>
        <p>The optional pack adds SDK and moderation knowledge without cluttering every project.</p>
      </article>
    </section>

    <section class="payload">
      <div class="payload-head">
        <div>
          <p class="eyebrow">Archive contents</p>
          <h2>Agent operating system + Phaser starter</h2>
        </div>
        <span id="file-count">0 files</span>
      </div>
      <div class="tree" id="file-tree"></div>
    </section>
  </section>
`;const et=document.querySelector("#creator-form"),Pe=document.querySelector("#project-name"),je=document.querySelector("#yandex-games"),tt=document.querySelector("#preview-title"),st=document.querySelector("#file-count"),rt=document.querySelector("#file-tree"),at=document.querySelector("#yandex-badge");function Be(){var q;const B=Xe(Pe.value);return{projectName:Pe.value,slug:Je(Pe.value),title:B,target:((q=document.querySelector('input[name="target"]:checked'))==null?void 0:q.value)==="desktop"?"desktop":"mobile",includeYandexGames:je.checked,includePwa:!1,includeArcadePhysics:!0,includeTilemaps:!1,includePlaywright:!0}}function Ae(){const B=Be(),q=Ue(B);tt.textContent=`${B.slug}.zip`,st.textContent=`${q.length} files`,at.classList.toggle("active",B.includeYandexGames);const f=q.map(E=>E.path).filter(E=>E==="START_HERE.md"||E==="AGENTS.md"||E==="CLAUDE.md"||E==="GEMINI.md"||E.startsWith(".ai/")||E.startsWith(".cursor/")||E.startsWith(".github/")||E.startsWith("skills/")||E.startsWith("docs/yandex")||E.startsWith("scripts/")||E.startsWith("src/game/platform/")||E.startsWith("src/game/scenes/")||E.startsWith("src/game/input/")||E==="package.json").slice(0,42);rt.innerHTML=f.map(E=>`<div>${it(E)}</div>`).join("")}async function nt(B){const q=new We,f=q.folder(B.slug);if(!f)throw new Error("Could not create ZIP root folder");for(const E of Ue(B))f.file(E.path,E.content);return q.generateAsync({type:"blob"})}function it(B){return B.replace(/[&<>"']/g,q=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[q])}et.addEventListener("submit",async B=>{B.preventDefault();const q=Be(),f=await nt(q);Qe(f,`${q.slug}.zip`)});for(const B of[Pe,...document.querySelectorAll('input[name="target"]')])B.addEventListener("input",Ae),B.addEventListener("change",Ae);je.addEventListener("change",Ae);Ae();
