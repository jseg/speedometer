!function(){function e(e,n,t){function a(){var a,i=n.getTripTime();a=0==i?0:e.get()/(i/1e3),a=18*a/5,a=t.fix(a),a=Math.min(999.99,a),l.nodeValue=String(Math.floor(a)),r.nodeValue=Math.floor(a%1*10)}var i="AverageSpeedPanel",l=b("0"),o=d(i+"-integerPart");o.appendChild(l);var r=b("0"),c=d(i+"-fractionalPart");c.appendChild(b(".")),c.appendChild(r);var p=b(t.speedLabel),h=d(i+"-unit");h.appendChild(p);var u=d(i+" BottomPanel-content");u.appendChild(o),u.appendChild(c),u.appendChild(h);var s=d(i+"-label");s.appendChild(b("AVERAGE SPEED"));var f=s.classList,v=d("BottomPanel");v.appendChild(s),v.appendChild(u);var m,C=v.classList;return{element:v,reset:a,update:a,highlight:function(){clearTimeout(m),C.add("highlight"),f.add("highlight"),m=setTimeout(function(){C.remove("highlight"),f.remove("highlight")},200)},setUnit:function(e){t=e,p.nodeValue=t.speedLabel,a()}}}function n(e){var n="AverageSpeedTab",t=d(n+"-content Tab-content");t.appendChild(b("AVERAGE")),t.appendChild(document.createElement("br")),t.appendChild(b("SPEED"));var a=d(n+" Tab Button");a.appendChild(d(n+"-aligner Tab-aligner")),a.appendChild(t);var i=a.classList,l=h(a,function(){e(),i.add("selected")});return l.enable(),{element:a,deselect:function(){i.remove("selected")}}}function t(){var e="ClockPanel",n=b("00"),t=d(e+"-hour");t.appendChild(n);var a=b("00"),i=d(e+"-minute");i.appendChild(a);var l=b("00"),o=d(e+"-second");o.appendChild(b(":")),o.appendChild(l);var r=d(e+" BottomPanel-content");r.appendChild(t),r.appendChild(b(":")),r.appendChild(i),r.appendChild(o);var c=d(e+"-label");c.appendChild(b("CLOCK"));var p=c.classList,h=d("BottomPanel");h.appendChild(c),h.appendChild(r);var u,s=h.classList;return{element:h,highlight:function(){clearTimeout(u),s.add("highlight"),p.add("highlight"),u=setTimeout(function(){s.remove("highlight"),p.remove("highlight")},200)},update:function(){var e=new Date;n.nodeValue=I(e.getHours()),a.nodeValue=I(e.getMinutes()),l.nodeValue=I(e.getSeconds())}}}function a(e){var n=d("Tab ClockTab Button");n.appendChild(b("CLOCK"));var t=n.classList,a=h(n,function(){e(),t.add("selected")});return a.enable(),{element:n,deselect:function(){t.remove("selected")}}}function i(e,n){function t(e){return e*Math.PI/180}var a=e.coords,i=n.coords,d=t(a.latitude),l=t(a.longitude),o=t(i.latitude),r=t(i.longitude),c=6371e3,p=o-d,h=r-l,u=Math.sin(p/2),s=Math.sin(h/2),f=u*u+Math.cos(d)*Math.cos(o)*s*s,v=2*Math.atan2(Math.sqrt(f),Math.sqrt(1-f)),m=c*v;return m}function d(e){var n=document.createElement("div");return n.className=e,n}function l(){return{key:"imperial",distanceLabel:"M",speedLabel:"M/H",fix:function(e){return e}}}function o(){function n(e){E.setUnit(e),A.setUnit(e),w.setUnit(e),D.setUnit(e),N.unit=e.key,N.save()}function a(){o(function(){setTimeout(function(){A.update(),B.update(),V.update(),D.update(),a()},50)})}function i(e){h&&v.add(e);var n=e.coords,t=n.speed;E.setSpeed(t),h&&w.setSpeed(t);var a=n.accuracy;G.setStatus(6>a?"SIGNAL GOOD":12>a?"SIGNAL OK":"SIGNAL WEAK")}var o=window.requestAnimationFrame,c=window.cancelAnimationFrame;o||(o=window.mozRequestAnimationFrame,c=window.mozCancelAnimationFrame);var h=!1,v=L(),b=l(),S=p(),E=m(S),I=T(function(){O.removeChild(O.firstChild),O.appendChild(B.element),B.highlight()},function(){O.removeChild(O.firstChild),O.appendChild(A.element),A.highlight()},function(){O.removeChild(O.firstChild),O.appendChild(V.element),V.highlight()},function(){O.removeChild(O.firstChild),O.appendChild(w.element),w.highlight()},function(){O.removeChild(O.firstChild),O.appendChild(D.element),D.highlight()},function(){O.removeChild(O.firstChild),O.appendChild(R.element),R.highlight()}),B=P(),A=M(v,S),V=t(),w=r(S),D=e(v,B,S),N=s(),R=f(N,function(){n(b)},function(){n(S)});n("imperial"==N.unit?b:S);var F="MainPanel",O=d(F+"-panel");O.appendChild(A.element);var y=u(function(){v.reset(),B.reset(),A.reset(),w.reset(),D.reset()}),U=C(function(){h=!0,B.start(),v.start()},function(){h=!1,B.stop()}),G=g(),k=d(F+"-content");k.appendChild(E.element),k.appendChild(O),k.appendChild(I.element),k.appendChild(y),k.appendChild(U.element),k.appendChild(G.element);var x=d(F);return x.appendChild(k),navigator.geolocation.watchPosition(i,function(e){var n=e.code;G.setStatus(n==e.PERMISSION_DENIED?"PERMISSION DENIED":n==e.POSITION_UNAVAILABLE?"POSITION UNAVAILABLE":"TIMEOUT")},{enableHighAccuracy:!0}),a(),navigator.requestWakeLock&&navigator.requestWakeLock("screen"),{element:x,resize:function(e,n){var t=e/320;452*t>n&&(t=n/452),x.style.transform="scale("+t+")"}}}function r(e){function n(e){C=e,t()}function t(){speed=18*C/5,speed=e.fix(speed),speed=Math.min(999.99,speed),i.nodeValue=String(Math.floor(speed)),o.nodeValue=Math.floor(speed%1*10)}var a="MaxSpeedPanel",i=b("0"),l=d(a+"-integerPart");l.appendChild(i);var o=b("0"),r=d(a+"-fractionalPart");r.appendChild(b(".")),r.appendChild(o);var c=b(e.speedLabel),p=d(a+"-unit");p.appendChild(c);var h=d(a+" BottomPanel-content");h.appendChild(l),h.appendChild(r),h.appendChild(p);var u=d(a+"-label");u.appendChild(b("MAX SPEED"));var s=u.classList,f=d("BottomPanel");f.appendChild(u),f.appendChild(h);var v,m=f.classList,C=0;return{element:f,highlight:function(){clearTimeout(v),m.add("highlight"),s.add("highlight"),v=setTimeout(function(){m.remove("highlight"),s.remove("highlight")},200)},reset:function(){n(0)},setSpeed:function(e){isFinite(e)||(e=0),e>C&&n(e)},setUnit:function(n){e=n,c.nodeValue=e.speedLabel,t()}}}function c(e){var n="MaxSpeedTab",t=d(n+"-content Tab-content");t.appendChild(b("MAX")),t.appendChild(document.createElement("br")),t.appendChild(b("SPEED"));var a=d(n+" Tab Button");a.appendChild(d(n+"-aligner Tab-aligner")),a.appendChild(t);var i=a.classList,l=h(a,function(){e(),i.add("selected")});return l.enable(),{element:a,deselect:function(){i.remove("selected")}}}function p(){return{key:"metric",distanceLabel:"KM",speedLabel:"KM/H",fix:function(e){return 1.609344*e}}}function h(e,n){function t(){l.add("active"),clearTimeout(d),d=setTimeout(function(){n(),d=setTimeout(function(){l.remove("active")},150)},100)}function a(e){0===e.button&&(e.preventDefault(),o?o=!1:t())}function i(e){e.preventDefault(),o=!0,t()}var d,l=e.classList,o=!1;return{disable:function(){e.removeEventListener("touchstart",i),e.removeEventListener("mousedown",a)},enable:function(){e.addEventListener("mousedown",a),e.addEventListener("touchstart",i)}}}function u(e){var n=d("ResetButton Button");n.appendChild(b("RESET"));var t=h(n,e);return t.enable(),n}function s(){var e;try{e=localStorage.unit}catch(n){}var t={unit:e,save:function(){try{localStorage.unit=t.unit}catch(e){}}};return t}function f(e,n,t){var a="SettingsPanel",i=d(a+"-button Button");i.appendChild(b("IMPERIAL"));var l=h(i,function(){o.classList.remove("selected"),i.classList.add("selected"),n()});l.enable();var o=d(a+"-metricButton "+a+"-button Button");o.appendChild(b("METRIC"));var r=h(o,function(){i.classList.remove("selected"),o.classList.add("selected"),t()});r.enable(),"imperial"==e.unit?i.classList.add("selected"):o.classList.add("selected");var c=d(a+"-fieldLabel");c.appendChild(b("UNITS:"));var p=d(a+" BottomPanel-content");p.appendChild(c),p.appendChild(i),p.appendChild(o);var u=d(a+"-label");u.appendChild(b("SETTINGS"));var s=u.classList,f=d("BottomPanel");f.appendChild(u),f.appendChild(p);var v,m=f.classList;return{element:f,highlight:function(){clearTimeout(v),m.add("highlight"),s.add("highlight"),v=setTimeout(function(){m.remove("highlight"),s.remove("highlight")},200)}}}function v(e){var n=d("Tab SettingsTab Button");n.appendChild(b("SETTINGS"));var t=n.classList,a=h(n,function(){e(),t.add("selected")});return a.enable(),{element:n,deselect:function(){t.remove("selected")}}}function m(e){function n(){var n=e.fix(18*C/5);n=Math.min(999.99,n),a.nodeValue=Math.floor(n),l.nodeValue=Math.floor(n%1*10);var t="";t=L?T?"":"↑":T?"↓":"",u.nodeValue=t}var t="SpeedLabel",a=b("0"),i=d(t+"-integerPart");i.appendChild(a);var l=b("0"),o=d(t+"-fractionalPart");o.appendChild(b(".")),o.appendChild(l);var r=b(e.speedLabel),c=d(t+"-unit");c.appendChild(r);var p=d(t+"-label");p.appendChild(b("SPEED"));var h=d(t+"-content");h.appendChild(i),h.appendChild(o),h.appendChild(c);var u=b("↕"),s=d(t+"-arrow");s.appendChild(u);var f=d(t);f.appendChild(p),f.appendChild(s),f.appendChild(h);var v,m,C=0,g=0,T=0,L=0;return{element:f,setSpeed:function(e){isFinite(e)||(e=0),e>g?(L=!0,clearTimeout(v),m=setTimeout(function(){L=!1},3e3)):g>e&&(T=!0,clearTimeout(m),v=setTimeout(function(){T=!1},3e3)),g=C,C=e,n()},setUnit:function(t){e=t,r.nodeValue=e.speedLabel,n()}}}function C(e,n){var t=!1,a=b("START"),i=d("StartStopButton Button");i.appendChild(a);var l=h(i,function(){t?(t=!1,a.nodeValue="START",n()):(t=!0,a.nodeValue="STOP",e())});return l.enable(),{element:i}}function g(){var e=b("INITIALIZING"),n=d("StatusPanel");n.appendChild(b("GPS: ")),n.appendChild(e);var t,a=n.classList;return{element:n,setStatus:function(n){n!=e.nodeValue&&(e.nodeValue=n,clearTimeout(t),a.add("highlight"),t=setTimeout(function(){a.remove("highlight")},200))}}}function T(e,t,i,l,o,r){var p=S(function(){h.deselect(),u.deselect(),s.deselect(),f.deselect(),m.deselect(),t()}),h=E(function(){p.deselect(),u.deselect(),s.deselect(),f.deselect(),m.deselect(),e()}),u=a(function(){p.deselect(),h.deselect(),s.deselect(),f.deselect(),m.deselect(),i()}),s=c(function(){p.deselect(),h.deselect(),u.deselect(),f.deselect(),m.deselect(),l()}),f=n(function(){p.deselect(),h.deselect(),u.deselect(),s.deselect(),m.deselect(),o()}),m=v(function(){p.deselect(),h.deselect(),u.deselect(),s.deselect(),f.deselect(),r()}),C="Tabs",g=d(C+"-row1");g.appendChild(p.element),g.appendChild(h.element),g.appendChild(u.element);var T=d(C+"-row2");T.appendChild(s.element),T.appendChild(f.element),T.appendChild(m.element);var b=d(C);return b.appendChild(g),b.appendChild(T),{element:b}}function b(e){return document.createTextNode(e)}function L(){var e=null,n=0;return{add:function(t){e&&(n+=i(e,t)),e=t},get:function(){return n},reset:function(){e=null,n=0},start:function(){e=null}}}function M(e,n){function t(){var t=e.get();t=n.fix(t),t=Math.min(999999,Math.floor(t));var a=String(t%1e3);1==a.length?a="00"+a:2==a.length&&(a="0"+a),o.nodeValue=a,i.nodeValue=Math.floor(t/1e3)}var a="TripDistancePanel",i=b("0"),l=d(a+"-integerPart");l.appendChild(i);var o=b("000"),r=d(a+"-fractionalPart");r.appendChild(b(".")),r.appendChild(o);var c=b(n.distanceLabel),p=d(a+"-unit");p.appendChild(c);var h=d(a+" BottomPanel-content");h.appendChild(l),h.appendChild(r),h.appendChild(p);var u=d(a+"-label");u.appendChild(b("TRIP DISTANCE"));var s=u.classList,f=d("BottomPanel");f.appendChild(u),f.appendChild(h);var v,m=f.classList;return{element:f,reset:t,update:t,highlight:function(){clearTimeout(v),m.add("highlight"),s.add("highlight"),v=setTimeout(function(){m.remove("highlight"),s.remove("highlight")},200)},setUnit:function(e){n=e,c.nodeValue=n.distanceLabel,t()}}}function S(e){var n="TripDistanceTab",t=d(n+"-content Tab-content");t.appendChild(b("TRIP")),t.appendChild(document.createElement("br")),t.appendChild(b("DISTANCE"));var a=d(n+" Tab Button");a.appendChild(d(n+"-aligner Tab-aligner")),a.appendChild(t);var i=a.classList;i.add("selected");var l=h(a,function(){e(),i.add("selected")});return l.enable(),{element:a,deselect:function(){i.remove("selected")}}}function P(){var e="TripTimePanel",n=b("00"),t=d(e+"-hour");t.appendChild(n);var a=b("00"),i=d(e+"-minute");i.appendChild(a);var l=b("00"),o=d(e+"-second");o.appendChild(b(":")),o.appendChild(l);var r=d(e+" BottomPanel-content");r.appendChild(t),r.appendChild(b(":")),r.appendChild(i),r.appendChild(o);var c=d(e+"-label");c.appendChild(b("TRIP TIME"));var p=c.classList,h=d("BottomPanel");h.appendChild(c),h.appendChild(r);var u,s=h.classList,f=0,v=null,m=359999e3;return{element:h,getTripTime:function(){return f},highlight:function(){clearTimeout(u),s.add("highlight"),p.add("highlight"),u=setTimeout(function(){s.remove("highlight"),p.remove("highlight")},200)},reset:function(){f=0,null!==v&&(v=Date.now())},start:function(){v=Date.now()},stop:function(){f+=Date.now()-v,f=Math.min(f,m),v=null},update:function(){if(null!==v){var e=Date.now();f+=e-v,v=e}f=Math.min(f,m);var t=f/1e3;l.nodeValue=I(Math.floor(t%60));var i=t/60;a.nodeValue=I(Math.floor(i%60));var d=i/60;n.nodeValue=I(Math.floor(d))}}}function E(e){var n="TripTimeTab",t=d(n+"-content Tab-content");t.appendChild(b("TRIP")),t.appendChild(document.createElement("br")),t.appendChild(b("TIME"));var a=d(n+" Tab Button");a.appendChild(d(n+"-aligner Tab-aligner")),a.appendChild(t);var i=a.classList,l=h(a,function(){e(),i.add("selected")});return l.enable(),{element:a,deselect:function(){i.remove("selected")}}}function I(e){return e=String(e),1==e.length&&(e="0"+e),e}!function(){function e(){n.resize(innerWidth,innerHeight)}!function(){var e=document.createElement("style");e.innerHTML='@font-face {font-family: FreeMono;src: url(fonts/FreeMono.ttf);src: local("FreeMono"), url(fonts/FreeMono.ttf);font-weight: normal;}@font-face {font-family: FreeMono;src: url(fonts/FreeMonoBold.ttf);src: local("FreeMono Bold"), url(fonts/FreeMonoBold.ttf);font-weight: bold;}',document.head.appendChild(e)}();var n=o();document.body.appendChild(n.element),addEventListener("resize",e),e()}()}();