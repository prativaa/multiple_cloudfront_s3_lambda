'use strict';
 
// Configure authentication
const authUser = 'whitelabel';
const authPass = 'password';
     
exports.handler = (event, context, callback) => {
    // Get request and request headers
    const request = event.Records[0].cf.request;
    const headers = request.headers;
 
    // Construct the Basic Auth string
    const authString = 'Basic ' + new Buffer(authUser + ':' + authPass).toString('base64');
 
    // Require Basic authentication
    if (typeof headers.authorization == 'undefined' || headers.authorization[0].value != authString) {
        const body = 'Unauthorized';
        const response = {
            status: '401',
            statusDescription: 'Unauthorized',
            body: body,
            headers: {
                'www-authenticate': [{key: 'WWW-Authenticate', value:'Basic'}]
            },
        };
        callback(null, response);
    }
 
    // Continue request processing if authentication passed
    var currentUrlPath = request.uri;
    if(currentUrlPath == '/') {
        if (typeof headers['accept-language'] !== 'undefined') {
            const supportedLanguages = headers['accept-language'][0].value;
            console.log('Supported languages:', supportedLanguages);
            if(supportedLanguages.startsWith('en')) {
                callback(null, redirect('/en/'));
            } else if(supportedLanguages.startsWith('ja')) {
                callback(null, redirect('/ja/'));
            } else if(supportedLanguages.startsWith('zh-CN') || supportedLanguages.startsWith('zh')) {
                callback(null, redirect('/cn/'));
            } else if(supportedLanguages.startsWith('zh-TW')) {
                callback(null, redirect('/tw/'));
            } else {
                callback(null, redirect('/ja/'));
            }
        } else {
            callback(null, redirect('/ja/'));
        }
    } else if (currentUrlPath == '/sitemap.xml') {
        callback(null, request);
    } else if ((currentUrlPath.lastIndexOf('/ja/')) == 0) {
        callback(null, request);
    } else if ((currentUrlPath.lastIndexOf('/cn/')) == 0) {
        callback(null, request);
    } else if ((currentUrlPath.lastIndexOf('/tw/')) == 0) {
        callback(null, request);
    } else if ((currentUrlPath.lastIndexOf('/en/')) == 0) {
        callback(null, request);
    } else if ((currentUrlPath.lastIndexOf('/images/')) == 0) {
        callback(null, request);
    } else if ((currentUrlPath.lastIndexOf('/styles/')) == 0) {
        callback(null, request);
    } else if ((currentUrlPath.lastIndexOf('/js/')) == 0) {
        callback(null, request);
    } else {
        var pathToRedirect = "/ja" + currentUrlPath;
        callback(null, redirect(pathToRedirect));
    }
};

function redirect (to) {
    return {
    status: '301',
        statusDescription: 'redirect to browser language',
        headers: {
            location: [{ key: 'Location', value: to }]
        }
    };
}

