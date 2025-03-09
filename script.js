// Handle Dark Mode
document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("darkModeToggle");
    const darkMode = localStorage.getItem("darkMode");

    if (darkMode === "enabled") {
        document.body.classList.add("dark");
        toggle.checked = true;
    }

    toggle.addEventListener("change", function () {
        if (toggle.checked) {
            document.body.classList.add("dark");
            localStorage.setItem("darkMode", "enabled");
        } else {
            document.body.classList.remove("dark");
            localStorage.setItem("darkMode", "disabled");
        }
    });
});

// Generate UPI Link
async function generateLink() {
    let upi = document.getElementById("upiId").value;
    let amount = document.getElementById("amount").value;
    if (!upi) return alert("Please enter a UPI ID.");

    let darkMode = localStorage.getItem("darkMode") === "enabled" ? "1" : "0";

    let link = `https://toxiclikith.github.io/upi-payment-app/pay.html?upi=${encodeURIComponent(upi)}&amount=${amount}&dark=${darkMode}`;

    // Show message
    document.getElementById("message").innerText = amount 
        ? `Generating link for ₹${amount} to ${upi}`
        : `Generating link for ${upi}`;

    // Shorten URL using Bitly API
    let shortLink = await shortenURL(link);
    document.getElementById("generatedLink").innerHTML = `<a href="${shortLink}" target="_blank">${shortLink}</a>`;
    document.getElementById("copyButton").style.display = "block";
}

// Shorten URL via Bitly
async function shortenURL(longUrl) {
    let BITLY_ACCESS_TOKEN = "YOUR_BITLY_ACCESS_TOKEN"; // Get from Bitly Developer Console
    let response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${BITLY_ACCESS_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ long_url: longUrl })
    });
    let data = await response.json();
    return data.link;
}

// Copy Link
function copyLink() {
    navigator.clipboard.writeText(document.getElementById("generatedLink").innerText);
    alert("Link copied!");
}
