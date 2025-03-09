document.getElementById("generate").addEventListener("click", async function () {
    let upi = document.getElementById("upi").value.trim();
    let amount = document.getElementById("amount").value.trim();

    if (!upi) {
        alert("Please enter a valid UPI ID!");
        return;
    }

    // Construct the payment page URL
    let paymentURL = `https://toxiclikith.github.io/pay.html?upi=${encodeURIComponent(upi)}&amount=${amount}`;

    try {
        // Shorten URL using Bitly
        let bitlyURL = await shortenURL(paymentURL);
        
        // Store in localStorage for persistence
        localStorage.setItem("lastPaymentLink", bitlyURL);

        // Display the shortened link
        document.getElementById("generatedLink").innerHTML = `Your Payment Link: <a href="${bitlyURL}" target="_blank">${bitlyURL}</a>`;

    } catch (error) {
        alert("Failed to shorten URL, using normal link instead.");
        document.getElementById("generatedLink").innerHTML = `Your Payment Link: <a href="${paymentURL}" target="_blank">${paymentURL}</a>`;
    }
});

// Function to shorten URL using Bitly API
async function shortenURL(longURL) {
    const bitlyToken = "91e7c00d3623e3e4c1408448ed9b1f64f5d02763"; // Replace with your Bitly access token
    const response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${bitlyToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ long_url: longURL })
    });

    const data = await response.json();
    return data.link; // Return shortened URL
}
