function initializeEnvironment() {
    //window.deviceInfo.brand: ios, android, microsoft, webos, blackberry
    
    var userAgent = window.navigator.userAgent.toLowerCase();
    window.deviceInfo = {};

    if ( /iphone|ipod|ipad/.test( userAgent ) ) {
        var safari = /safari/.test( userAgent );
        window.deviceInfo.brand = 'ios';
        if ( window.navigator.standalone ) {
            window.deviceInfo.mode = 'standalone';
        } else if ( safari ) {
            window.deviceInfo.mode = 'browser';
        } else if ( !safari ) {
            window.deviceInfo.mode = 'webview';
        };
    } else if ( /android/.test( userAgent ) ) {
        window.deviceInfo.brand = 'android';
        window.deviceInfo.mode = 'browser';
    } else {
        window.deviceInfo.brand = 'unknown';
        window.deviceInfo.mode = 'browser';
    };
};
