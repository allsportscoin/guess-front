var browers = window.browers = {};
var ua = navigator.userAgent.toLowerCase();
var version;
browers.Android = ua.match(/android/);
browers.iOS = ua.match(/ipad|iphone|ios/);
browers.ie = ua.match(/iemobile/);
browers.isWifi = ua.match(/nettype\/wifi|technology\/wifi/);
browers.force_ssl = ua.match(/Android (5|6)/i);
browers.is_ios_6 = ua.match(/iOS 6/i);
browers.is_liveapp = ua.match(/LiveApp/i);
browers.appUA = ua.match(/newsapp\/([\d.]+)/i);

if (browers.appUA && browers.appUA.length && browers.appUA.length > 1) {
    var v = browers.appUA[1].replace(/\./ig, '');
    version = parseInt(v);
    browers.version = version;
}

module.exports = browers;
