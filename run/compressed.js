!function(){function e(e){function n(){var t,n;if(null===g)n="···",t="·";else{var a=p(g,e);n=a.fractionalPart,t=a.integerPart}i.nodeValue=t,o.nodeValue=n}var a="AltitudePanel",i=y("0"),l=h(a+"-integerPart");l.appendChild(i);var o=y("000"),d=h(a+"-fractionalPart");d.appendChild(y(".")),d.appendChild(o);var r=y(e.distanceLabel),u=h(a+"-unit");u.appendChild(r);var c=h("BottomPanel-label");c.appendChild(y("ALTITUDE"));var s=c.classList,f=t(e),m=h("BottomPanel");m.appendChild(c),m.appendChild(l),m.appendChild(d),m.appendChild(u),m.appendChild(f.element);var v,C=m.classList,g=null,T=[],P="highlight";return{element:m,start:f.start,stop:f.stop,highlight:function(){C.add(P),s.add(P),clearTimeout(v),v=setTimeout(function(){C.remove(P),s.remove(P)},200)},setAltitude:function(e){if("number"==typeof e&&isFinite(e)){T.push(e),T.length>3&&T.shift();var t=0;T.forEach(function(e){t+=e}),t/=T.length,g=t,f.setAltitude(g)}else g=null,T.splice(0);n()},setUnit:function(t){e=t,r.nodeValue=e.distanceLabel,n(),f.setUnit(e)}}}function t(e){function t(t,n){var a=p(n,e);t.setValue(a.integerPart,a.fractionalPart)}function n(){null===u?u=c=r:(u=Math.min(u,r),c=Math.max(c,r),t(i,u),t(l,c))}var a="AltitudeStatsPanel",i=B("MIN"),l=B("MAX"),o=h(a);o.appendChild(i.element),o.appendChild(l.element);var d=!1,r=null,u=null,c=null;return{element:o,setAltitude:function(e){r=e,d&&n()},setUnit:function(t){e=t,n()},start:function(){d=!0,n()},stop:function(){d=!1}}}function n(e){return P("ALTITUDE","AltitudeTab",e)}function a(e){var t={latitude:0,longitude:0};return e.forEach(function(e){t.latitude+=e.coords.latitude,t.longitude+=e.coords.longitude}),t.latitude/=e.length,t.longitude/=e.length,{coords:t}}function i(e,t,n){function a(){var a,i=t.getTripTime();a=0==i?0:e.get()/(i/1e3),a=n.fix(18*a/5),a=Math.min(999.99,a),l.nodeValue=Math.floor(a),d.nodeValue=Math.floor(a%1*10)}var i="SpeedPanel",l=y("0"),o=h(i+"-integerPart");o.appendChild(l);var d=y("0"),r=h(i+"-fractionalPart");r.appendChild(y(".")),r.appendChild(d);var u=y(n.speedLabel),p=h(i+"-unit");p.appendChild(u);var c=h("BottomPanel-label");c.appendChild(y("AVERAGE SPEED"));var s=c.classList,f=h("BottomPanel");f.appendChild(c),f.appendChild(o),f.appendChild(r),f.appendChild(p);var m,v=f.classList,C="highlight";return{element:f,reset:a,update:a,highlight:function(){v.add(C),s.add(C),clearTimeout(m),m=setTimeout(function(){v.remove(C),s.remove(C)},200)},setUnit:function(e){n=e,u.nodeValue=n.speedLabel,a()}}}function l(e){return H("AVERAGE","SPEED","AverageSpeedTab",e)}function o(){var e="ClockPanel",t=y("00"),n=y("00"),a=y("00"),i=h(e+"-second");i.appendChild(y(":")),i.appendChild(a);var l=h(e+"-content BottomPanel-content");l.appendChild(t),l.appendChild(y(":")),l.appendChild(n),l.appendChild(i);var o=h("BottomPanel-label");o.appendChild(y("CLOCK"));var d=o.classList,r=h(e+" BottomPanel");r.appendChild(o),r.appendChild(l);var u,p=r.classList,c="highlight";return{element:r,highlight:function(){p.add(c),d.add(c),clearTimeout(u),u=setTimeout(function(){p.remove(c),d.remove(c)},200)},update:function(){var e=new Date;t.nodeValue=G(e.getHours()),n.nodeValue=G(e.getMinutes()),a.nodeValue=G(e.getSeconds())}}}function d(e){return P("CLOCK","ClockTab",e)}function r(){function e(){var e;if(e=null===l?0:l*Math.PI/180,i.clearRect(0,0,n,n),i.save(),i.translate(a,a),i.rotate(-e),null!==l){var t=.01*n;i.save(),i.lineWidth=t,i.beginPath(),i.moveTo(0,0),i.rotate(-Math.PI/2),i.arc(0,0,a-t,0,e),i.closePath(),i.fillStyle="#444",i.fill(),i.lineJoin="round",i.strokeStyle="#999",i.stroke(),i.restore()}i.save();for(var o=0;60>o;o++){if(i.beginPath(),o%5||null===l){var t=.01*n;i.lineWidth=t,i.moveTo(0,.98*a),i.lineTo(0,.95*a),i.strokeStyle="#999"}else i.lineWidth=.03*n,i.moveTo(0,.98*a),i.lineTo(0,.92*a),i.strokeStyle="#fff";i.stroke(),i.rotate(Math.PI/30)}if(i.restore(),null!==l){var d=.92*-a;i.save(),i.font="bold "+.25*n+"px FreeMono, monospace",i.textAlign="center",i.textBaseline="top",i.fillStyle="#f00",i.fillText("N",0,d),i.fillStyle="#999",i.rotate(Math.PI/2),i.fillText("E",0,d),i.rotate(Math.PI/2),i.fillText("S",0,d),i.rotate(Math.PI/2),i.fillText("W",0,d),i.restore()}i.restore()}var t=document.createElement("canvas");t.className="CompassPanel";var n,a,i=t.getContext("2d"),l=null;return{element:t,resize:function(i){n=116*i*devicePixelRatio,a=n/2,t.width=t.height=n,e()},setHeading:function(t){l=t,e()}}}function u(e,t){function n(e){return e*Math.PI/180}var a=e.coords,i=t.coords,l=n(a.latitude),o=n(a.longitude),d=n(i.latitude),r=n(i.longitude),u=6371e3,h=d-l,p=r-o,c=Math.sin(h/2),s=Math.sin(p/2),f=c*c+Math.cos(l)*Math.cos(d)*s*s,m=2*Math.atan2(Math.sqrt(f),Math.sqrt(1-f)),v=u*m;return v}function h(e){var t=document.createElement("div");return t.className=e,t}function p(e,t){var n=Math.floor(t.fix(e));n=Math.min(999999,Math.max(-99999,n));var a=String(Math.abs(n)%1e3);return 1==a.length?a="00"+a:2==a.length&&(a="0"+a),integerPart=Math.floor(Math.abs(n)/1e3),0>n&&(integerPart="-"+integerPart),{fractionalPart:a,integerPart:integerPart}}function c(){function e(){var e;e=null===f?"·":Math.round(f),a.nodeValue=e}var t="HeadingPanel",n=h(t+"-unit");n.appendChild(y("°"));var a=y("·"),i=h(t+"-value");i.appendChild(a),i.appendChild(n);var l=h("BottomPanel-label");l.appendChild(y("HEADING"));var o=l.classList,d=r(),u=h("BottomPanel");u.appendChild(l),u.appendChild(i),u.appendChild(d.element);var p,c=u.classList,s="highlight",f=null,m=null,v=[];return{element:u,resize:d.resize,highlight:function(){c.add(s),o.add(s),clearTimeout(p),p=setTimeout(function(){c.remove(s),o.remove(s)},200)},setHeading:function(t){if("number"==typeof t&&isFinite(t)){null!=m&&(t-m>180?t-=360:-180>t-m&&(t+=360)),m=t,v.push(t),v.length>3&&v.shift();var n=0;v.forEach(function(e){n+=e}),n/=v.length,f=(n%360+360)%360}else f=null,m=null,v.splice(0);d.setHeading(f),e()}}}function s(e){return P("HEADING","HeadingTab",e)}function f(){return{key:"imperial",distanceLabel:"MI",speedLabel:"MI/H",fix:function(e){return e/1.609344}}}function m(){function t(e){O.removeChild(O.firstChild),O.appendChild(e.element),e.highlight()}function n(e){C.setSpeed(e),u&&y.setSpeed(e)}function a(e){C.setUnit(e),M.setUnit(e),y.setUnit(e),R.setUnit(e),L.setUnit(e),F.unit=e.key,F.save()}function l(){var e=Date.now();r(function(){P.update(),B.update(),R.update(),setTimeout(l,Math.max(0,e+1e3-Date.now()))})}function d(e){u&&(p.add(e),M.update());var t=e.coords;n(t.speed);var a=t.accuracy;K.setStatus(8>a?"SIGNAL GOOD":16>a?"SIGNAL OK":"SIGNAL WEAK"),X(t.altitude),_(t.heading),K.hideError()}var r=window.requestAnimationFrame;r||(r=window.mozRequestAnimationFrame);var u=!1,p=N(),s=f(),m=g(),C=A(m),T=x(function(){t(P)},function(){t(M)},function(){t(B)},function(){t(y)},function(){t(R)},function(){t(G)},function(){t(L)},function(){t(I)}),P=U(),M=w(p,m),L=e(m),I=c(),B=o(),y=v(m),R=i(p,P,m),F=E(),G=S(F,function(){a(s)},function(){a(m)});a("imperial"==F.unit?s:m);var H="MainPanel",O=h(H+"-panel");O.appendChild(M.element);var k=b(function(){p.reset(),M.update(),P.reset(),y.reset(),R.reset()}),z=V(function(){u=!0,P.start(),p.start(),L.start()},function(){u=!1,P.stop(),L.stop()}),K=D(),W=h(H+"-content");W.appendChild(C.element),W.appendChild(O),W.appendChild(K.element),W.appendChild(T.element),W.appendChild(k),W.appendChild(z.element);var q=h(H);q.appendChild(W);var X=L.setAltitude,_=I.setHeading;return navigator.geolocation.watchPosition(d,function(e){var t=e.code;K.setStatus(t==e.PERMISSION_DENIED?"PERMISSION DENIED":t==e.POSITION_UNAVAILABLE?"POSITION UNAVAILABLE":"TIMEOUT, RETRYING"),n(null),X(null),_(null),K.showError()},{enableHighAccuracy:!0,maximumAge:3e4,timeout:3e4}),l(),{element:q,resize:function(e,t){var n=320,a=480;if(e>t){var i=n;n=a,a=i}W.style.width=n+"px",W.style.height=a+"px",W.style.top=-a/2+"px",W.style.left=-n/2+"px";var l=e/n;l*a>t&&(l=t/a),q.style.transform="scale("+l+")",I.resize(l)}}}function v(e){function t(e){v=e,n()}function n(){var t=e.fix(18*v/5);t=Math.min(999.99,t),i.nodeValue=Math.floor(t),o.nodeValue=Math.floor(t%1*10)}var a="SpeedPanel",i=y("0"),l=h(a+"-integerPart");l.appendChild(i);var o=y("0"),d=h(a+"-fractionalPart");d.appendChild(y(".")),d.appendChild(o);var r=y(e.speedLabel),u=h(a+"-unit");u.appendChild(r);var p=h("BottomPanel-label");p.appendChild(y("MAX SPEED"));var c=p.classList,s=h("BottomPanel");s.appendChild(p),s.appendChild(l),s.appendChild(d),s.appendChild(u);var f,m=s.classList,v=0,C="highlight";return{element:s,highlight:function(){m.add(C),c.add(C),clearTimeout(f),f=setTimeout(function(){m.remove(C),c.remove(C)},200)},reset:function(){t(0)},setSpeed:function(e){isFinite(e)||(e=0),e>v&&t(e)},setUnit:function(t){e=t,r.nodeValue=e.speedLabel,n()}}}function C(e){return H("MAX","SPEED","MaxSpeedTab",e)}function g(){return{key:"metric",distanceLabel:"KM",speedLabel:"KM/H",fix:function(e){return e}}}function T(e,t){function n(){i.add("active"),clearTimeout(a),a=setTimeout(function(){t(),a=setTimeout(function(){i.remove("active")},150)},100)}var a,i=e.classList,l=!1;e.addEventListener("mousedown",function(e){0===e.button&&(e.preventDefault(),l?l=!1:n())}),e.addEventListener("touchstart",function(e){e.preventDefault(),l=!0,n()})}function P(e,t,n){var a=h("Tab-highlight");a.appendChild(y(e));var i=a.classList,l=h(t+" OneLineTab Tab Button");l.appendChild(a),T(l,n);var o,d=l.classList,r=!1,u="selected",p="highlight";return{element:l,deselect:function(){r=!1,d.remove(u),i.remove(u)},highlight:function(){i.add(p),clearTimeout(o),o=setTimeout(function(){i.remove(p)},200)},select:function(){r=!0,d.add(u),i.add(u)}}}function M(e){return P("PAGE 1","Page1Tab",e)}function L(e){return P("PAGE 2","Page2Tab",e)}function b(e){var t=h("ResetButton Button");return t.appendChild(y("RESET")),T(t,e),t}function E(){var e;try{e=localStorage.unit}catch(t){}var n={unit:e,save:function(){try{localStorage.unit=n.unit}catch(e){}}};return n}function S(e,t,n){var a="SettingsPanel",i="selected",l=h(a+"-imperialButton "+a+"-button Button");l.appendChild(y("IMPERIAL")),T(l,function(){o.classList.remove(i),l.classList.add(i),t()});var o=h(a+"-metricButton "+a+"-button Button");o.appendChild(y("METRIC")),T(o,function(){l.classList.remove(i),o.classList.add(i),n()}),"imperial"==e.unit?l.classList.add(i):o.classList.add(i);var d=h(a+"-fieldLabel");d.appendChild(y("UNITS:"));var r=h("BottomPanel-label");r.appendChild(y("SETTINGS"));var u=r.classList,p=h("BottomPanel");p.appendChild(r),p.appendChild(d),p.appendChild(l),p.appendChild(o);var c,s=p.classList,f="highlight";return{element:p,highlight:function(){s.add(f),u.add(f),clearTimeout(c),c=setTimeout(function(){s.remove(f),u.remove(f)},200)}}}function I(e){return P("SETTINGS","SettingsTab",e)}function A(e){function t(){var t,n,i;if(null===v)i="",t="·",n="·";else{var o=e.fix(18*v/5);o=Math.min(999.99,o),t=Math.floor(o),n=Math.floor(o%1*10),i=T?g?"":"↑":g?"↓":""}a.nodeValue=t,l.nodeValue=n,p.nodeValue=i}var n="SpeedLabel",a=y("·"),i=h(n+"-integerPart");i.appendChild(a);var l=y("·"),o=h(n+"-fractionalPart");o.appendChild(y(".")),o.appendChild(l);var d=y(e.speedLabel),r=h(n+"-unit");r.appendChild(d);var u=h(n+"-label");u.appendChild(y("SPEED"));var p=y("↕"),c=h(n+"-arrow");c.appendChild(p);var s=h(n);s.appendChild(u),s.appendChild(c),s.appendChild(i),s.appendChild(o),s.appendChild(r);var f,m,v=null,C=null,g=!1,T=!1,P=.02,M=[];return{element:s,setSpeed:function(e){if("number"==typeof e&&isFinite(e)){M.push(e),M.length>3&&M.shift();var n=0;M.forEach(function(e){n+=e}),n/=M.length,null!==C&&(n>C+P?(T=!0,clearTimeout(m),m=setTimeout(function(){T=!1,t()},2500)):C-P>n&&(g=!0,clearTimeout(f),f=setTimeout(function(){g=!1,t()},2500))),C=v,v=n}else v=null,C=null,M.splice(0),g=T=!1,clearTimeout(f),clearTimeout(m);t()},setUnit:function(n){e=n,d.nodeValue=e.speedLabel,t()}}}function V(e,t){var n=!1,a=y("START"),i=h("StartStopButton Button");return i.appendChild(a),T(i,function(){n?(n=!1,a.nodeValue="START",t()):(n=!0,a.nodeValue="STOP",e())}),{element:i}}function B(e){var t="StatField",n=h(t+"-label");n.appendChild(y(e));var a=y("·"),i=h(t+"-integerPart");i.appendChild(a);var l=y("·"),o=h(t+"-fractionalPart");o.appendChild(y(".")),o.appendChild(l);var d=h(t+"-value");d.appendChild(i),d.appendChild(o);var r=h(t);return r.appendChild(n),r.appendChild(d),{element:r,setValue:function(e,t){a.nodeValue=e,l.nodeValue=t}}}function D(){function e(){d.add(p),clearTimeout(o),o=setTimeout(function(){d.remove(p)},200)}var t="StatusPanel",n=y("ACQUIRING"),a=h(t+"-value");a.appendChild(n);var i=a.classList,l=h(t);l.appendChild(y("GPS")),l.appendChild(a);var o,d=l.classList,r=!1,u="error",p="highlight";return{element:l,hideError:function(){r&&(r=!1,i.remove(u),e())},setStatus:function(e){n.nodeValue=e},showError:function(){r||(r=!0,i.add(u),e())}}}function x(e,t,a,i,o,r,u,p){function c(e){B.forEach(function(t){e!=t&&t.deselect()}),e.select()}var f=1,m=R(function(){c(m),t()}),v=F(function(){c(v),e()}),g=C(function(){c(g),i()}),T=l(function(){c(T),o()}),P=n(function(){c(P),u()}),b=s(function(){c(b),p()}),E=d(function(){c(E),a()}),S=I(function(){c(S),r()}),A=M(function(){1!=f&&(f=1,V.deselect(),x.removeChild(P.element),x.removeChild(b.element),x.removeChild(S.element),x.removeChild(E.element),x.appendChild(m.element),x.appendChild(v.element),x.appendChild(g.element),x.appendChild(T.element)),m.highlight(),v.highlight(),g.highlight(),T.highlight()}),V=L(function(){2!=f&&(f=2,A.deselect(),x.removeChild(m.element),x.removeChild(v.element),x.removeChild(g.element),x.removeChild(T.element),x.appendChild(P.element),x.appendChild(b.element),x.appendChild(S.element),x.appendChild(E.element)),P.highlight(),b.highlight(),S.highlight(),E.highlight()}),B=[m,v,g,T,P,b,E,S],D="Tabs",x=h(D);return x.appendChild(m.element),x.appendChild(v.element),x.appendChild(g.element),x.appendChild(T.element),x.appendChild(A.element),x.appendChild(V.element),{element:x}}function y(e){return document.createTextNode(e)}function N(){var e=0,t=[];return{add:function(n){var i;if(t.length&&(i=a(t)),t.push(n),t.length>3&&t.shift(),i){var l=a(t);e+=u(i,l)}},get:function(){return e},reset:function(){t.splice(0),e=0},start:function(){t.splice(0)}}}function w(e,t){function n(){var n=t.fix(e.get());n=Math.min(999999,Math.floor(n));var a=String(n%1e3);1==a.length?a="00"+a:2==a.length&&(a="0"+a),o.nodeValue=a,i.nodeValue=Math.floor(n/1e3)}var a="TripDistancePanel",i=y("0"),l=h(a+"-integerPart");l.appendChild(i);var o=y("000"),d=h(a+"-fractionalPart");d.appendChild(y(".")),d.appendChild(o);var r=y(t.distanceLabel),u=h(a+"-unit");u.appendChild(r);var p=h("BottomPanel-label");p.appendChild(y("TRIP DISTANCE"));var c=p.classList,s=h("BottomPanel");s.appendChild(p),s.appendChild(l),s.appendChild(d),s.appendChild(u);var f,m=s.classList,v="highlight";return{element:s,update:n,highlight:function(){m.add(v),c.add(v),clearTimeout(f),f=setTimeout(function(){m.remove(v),c.remove(v)},200)},setUnit:function(e){t=e,r.nodeValue=t.distanceLabel,n()}}}function R(e){var t=H("TRIP","DISTANCE","TripDistanceTab",e);return t.select(),t}function U(){var e="ClockPanel",t=y("00"),n=y("00"),a=y("00"),i=h(e+"-second");i.appendChild(y(":")),i.appendChild(a);var l=h("BottomPanel-label");l.appendChild(y("TRIP TIME"));var o=l.classList,d=h(e+"-content");d.appendChild(t),d.appendChild(y(":")),d.appendChild(n),d.appendChild(i);var r=h(e+" BottomPanel");r.appendChild(l),r.appendChild(d);var u,p=r.classList,c=0,s=null,f=359999e3,m="highlight";return{element:r,getTripTime:function(){return c},highlight:function(){p.add(m),o.add(m),clearTimeout(u),u=setTimeout(function(){p.remove(m),o.remove(m)},200)},reset:function(){c=0,null!==s&&(s=Date.now())},start:function(){s=Date.now()},stop:function(){c+=Date.now()-s,c=Math.min(c,f),s=null},update:function(){if(null!==s){var e=Date.now();c+=e-s,s=e}c=Math.min(c,f);var i=c/1e3;a.nodeValue=G(Math.floor(i%60));var l=i/60;n.nodeValue=G(Math.floor(l%60));var o=l/60;t.nodeValue=G(Math.floor(o))}}}function F(e){return H("TRIP","TIME","TripTimeTab",e)}function G(e){return e=String(e),1==e.length&&(e="0"+e),e}function H(e,t,n,a){var i="TwoLineTab "+n,l=h(i+"-content Tab-content");l.appendChild(y(e)),l.appendChild(document.createElement("br")),l.appendChild(y(t));var o=h("Tab-highlight");o.appendChild(h(i+"-aligner Tab-aligner")),o.appendChild(l);var d=o.classList,r=h(i+" Tab Button");r.appendChild(o),T(r,a);var u,p=r.classList,c=!1,s="selected",f="highlight";return{element:r,deselect:function(){c=!1,p.remove(s),d.remove(s)},highlight:function(){d.add(f),clearTimeout(u),u=setTimeout(function(){d.remove(f)},200)},select:function(){c=!0,p.add(s),d.add(s)}}}!function(){function e(){t.resize(innerWidth,innerHeight)}!function(){var e=document.createElement("style");e.innerHTML='@font-face {font-family: FreeMono;src: url(fonts/FreeMono.ttf);src: local("FreeMono"), url(fonts/FreeMono.ttf);font-weight: normal;}@font-face {font-family: FreeMono;src: url(fonts/FreeMonoBold.ttf);src: local("FreeMono Bold"), url(fonts/FreeMonoBold.ttf);font-weight: bold;}',document.head.appendChild(e)}();var t=m();document.body.appendChild(t.element),addEventListener("resize",e),e()}()}();