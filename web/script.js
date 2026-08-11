async function loadDashboard() {

    try {

        const response = await fetch("http://127.0.0.1:8000/dashboard/latest");

        const data = await response.json();

        // ==================================
        // Website
        // ==================================

        document.getElementById("website").innerText =
            data.website;

        // ==================================
        // Trust Score
        // ==================================

        document.getElementById("trustScore").innerText =
            data.trust_score + "/100";

        // ==================================
        // Risk Level
        // ==================================

        document.getElementById("riskLevel").innerText =
            data.risk_level;

        // ==================================
        // Referrer
        // ==================================

        if (data.referrer === "") {

            document.getElementById("referrer").innerText =
                "Direct Visit";

        } else {

            document.getElementById("referrer").innerText =
                data.referrer;

        }

        // ==================================
        // Privacy Signals
        // ==================================

        document.getElementById("cookies").innerText =
            data.cookies;

        document.getElementById("scripts").innerText =
            data.scripts;

        document.getElementById("trackers").innerText =
            data.trackers.length;

        document.getElementById("https").innerText =
            data.https ? "✅ Yes" : "❌ No";

        // ==================================
        // Browser Fingerprint
        // ==================================

        document.getElementById("browser").innerText =
            data.browser || "Unknown";

        document.getElementById("platform").innerText =
            data.platform || "Unknown";

        document.getElementById("language").innerText =
            data.language || "Unknown";

        document.getElementById("timezone").innerText =
            data.timezone || "Unknown";

        document.getElementById("resolution").innerText =
            data.screenWidth + " × " + data.screenHeight;

        document.getElementById("cpu").innerText =
            data.cpuCores;

        document.getElementById("memory").innerText =
            data.deviceMemory + " GB";

        document.getElementById("colorDepth").innerText =
            data.colorDepth + "-bit";

        document.getElementById("fingerprintScore").innerText =
            data.fingerprintScore;

        // ==================================
        // AI Recommendation
        // ==================================

        const list = document.getElementById("recommendation");

        list.innerHTML = "";

        data.recommendation.forEach(item => {

            const li = document.createElement("li");

            li.innerText = item;

            list.appendChild(li);

        });

    }

    catch (error) {

        console.log("Dashboard Error:", error);

    }

}

// Initial Load
loadDashboard();

// Refresh Every 2 Seconds
setInterval(loadDashboard, 2000);