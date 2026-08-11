console.clear();
console.log("Collectors Loaded Test");

console.log(typeof collectCookies);
console.log(typeof collectStorage);
console.log(typeof collectScripts);
console.log(typeof collectTrackers);
console.log(typeof collectPermissions);
console.log(typeof collectFingerprint);
console.log(typeof collectRequests);
console.log(typeof collectHeaders);
console.log(typeof collectNetwork);
console.log("========== PriviLens Detector ==========");

// ======================================
// WEBSITE INFORMATION
// ======================================

const signal = {

    url: window.location.href,

    domain: window.location.hostname,

    title: document.title,

    referrer: document.referrer,

    https: window.location.protocol === "https:",

    cookies: document.cookie
        ? document.cookie.split(";").length
        : 0,

    localStorage: localStorage.length,

    sessionStorage: sessionStorage.length,

    scripts: document.scripts.length,

    trackers: [],

    // NEW
    cookieNames: [],

    networkDomains: [],

    permissions: []

};


// ======================================
// COOKIE NAMES
// ======================================

if (document.cookie) {

    document.cookie.split(";").forEach(cookie => {

        const name = cookie.split("=")[0].trim();

        signal.cookieNames.push(name);

    });

}


// ======================================
// BROWSER FINGERPRINT
// ======================================

signal.browser = navigator.userAgent;

signal.platform = navigator.platform;

signal.language = navigator.language;

signal.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

signal.screenWidth = screen.width;

signal.screenHeight = screen.height;

signal.colorDepth = screen.colorDepth;

signal.cpuCores = navigator.hardwareConcurrency || "Unknown";

signal.deviceMemory = navigator.deviceMemory || "Unknown";


// ======================================
// TRACKER DETECTION
// ======================================

const knownTrackers = {

    "google-analytics": "Google Analytics",

    "googletagmanager": "Google Tag Manager",

    "doubleclick": "Google Ads",

    "facebook": "Meta Pixel",

    "hotjar": "Hotjar",

    "mixpanel": "Mixpanel",

    "segment": "Segment",

    "clarity": "Microsoft Clarity"

};

document.querySelectorAll("script").forEach(script => {

    const src = script.src.toLowerCase();

    Object.keys(knownTrackers).forEach(key => {

        if (src.includes(key)) {

            if (!signal.trackers.includes(knownTrackers[key])) {

                signal.trackers.push(

                    knownTrackers[key]

                );

            }

        }

    });

});


// ======================================
// NETWORK DOMAINS
// ======================================

document.querySelectorAll("script").forEach(script => {

    if (script.src) {

        try {

            const url = new URL(script.src);

            if (!signal.networkDomains.includes(url.hostname)) {

                signal.networkDomains.push(

                    url.hostname

                );

            }

        }

        catch (e) {}

    }

});


// ======================================
// PERMISSIONS
// ======================================

if (navigator.permissions) {

    const permissionList = [

        "camera",

        "microphone",

        "geolocation",

        "notifications"

    ];

    permissionList.forEach(async permission => {

        try {

            const result = await navigator.permissions.query({

                name: permission

            });

            signal.permissions.push({

                permission: permission,

                state: result.state

            });

        }

        catch (e) {}

    });

}


// ======================================
// CONSOLE OUTPUT
// ======================================

console.log("Website:", signal.domain);

console.log("Title:", signal.title);

console.log("Referrer:", signal.referrer);

console.log("HTTPS:", signal.https);

console.log("Cookies:", signal.cookies);

console.log("Cookie Names:", signal.cookieNames);

console.log("Local Storage:", signal.localStorage);

console.log("Session Storage:", signal.sessionStorage);

console.log("Scripts:", signal.scripts);

console.log("Trackers:", signal.trackers);

console.log("Network Domains:", signal.networkDomains);

console.log("Permissions:", signal.permissions);

console.log("");

console.log("========== Browser Fingerprint ==========");

console.log("Browser:", signal.browser);

console.log("Platform:", signal.platform);

console.log("Language:", signal.language);

console.log("Timezone:", signal.timezone);

console.log("Resolution:", signal.screenWidth + " x " + signal.screenHeight);

console.log("CPU Cores:", signal.cpuCores);

console.log("Device Memory:", signal.deviceMemory);

console.log("Color Depth:", signal.colorDepth);


// ======================================
// SEND TO BACKEND
// ======================================

console.log("");

console.log("========== Sending Signal ==========");

chrome.runtime.sendMessage(

    {

        type: "ANALYZE",

        data: signal

    },

    function(response) {

        console.log("");

        console.log("========== BACKEND RESPONSE ==========");

        console.log(response);

    }

);