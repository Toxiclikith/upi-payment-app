document.getElementById("generate").addEventListener("click", async function () {
    let upi = document.getElementById("upi").value.trim();
    let amount = document.getElementById("amount").value.trim();
    let resultDiv = document.getElementById("result");
    let generatedLinkElem = document.getElementById("generatedLink");
    
    if (!upi) {
        alert("Please enter a valid UPI ID!");
        return;
    }

    let paymentURL = `https://toxiclikith.github.io/upi-payment-app/pay.html?upi=${encodeURIComponent(upi)}&amount=${amount}`;
    
    try {
        let bitlyURL = await shortenURL(paymentURL);
        localStorage.setItem("lastPaymentLink", bitlyURL);
        generatedLinkElem.innerHTML = `<a href="${bitlyURL}" target="_blank">${bitlyURL}</a>`;
    } catch (error) {
        generatedLinkElem.innerHTML = `<a href="${paymentURL}" target="_blank">${paymentURL}</a>`;
    }

    resultDiv.classList.remove("hidden");
});

// Copy Link to Clipboard
document.getElementById("copyLink").addEventListener("click", function () {
    let linkText = document.getElementById("generatedLink").innerText;
    navigator.clipboard.writeText(linkText).then(() => {
        alert("Link copied to clipboard!");
    });
});

// Function to shorten URL using Bitly API
async function shortenURL(longURL) {
    const bitlyToken = "91e7c00d3623e3e4c1408448ed9b1f64f5d02763"; // Replace with Bitly Token
    const response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${bitlyToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ long_url: longURL })
    });

    const data = await response.json();
    return data.link;
}
