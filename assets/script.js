document.getElementById("generate").addEventListener("click", function () {
    let upi = document.getElementById("upi").value.trim();
    let amount = document.getElementById("amount").value.trim();
    let resultDiv = document.getElementById("result");
    let generatedLinkElem = document.getElementById("generatedLink");
    
    if (!upi) {
        alert("Please enter a valid UPI ID!");
        return;
    }

    amount = amount ? `&amount=${amount}` : '';

    let paymentURL = `https://toxiclikith.github.io/upi-payment-app/pay.html?upi=${encodeURIComponent(upi)}&amount=${amount}`;
    localStorage.setItem("lastPaymentLink", paymentURL);

    generatedLinkElem.innerHTML = `<a href="${paymentURL}" target="_blank">${paymentURL}</a>`;

    resultDiv.classList.remove("hidden");
});

document.getElementById("copyLink").addEventListener("click", function () {
    let linkText = document.getElementById("generatedLink").innerText;
    navigator.clipboard.writeText(linkText).then(() => {
        alert("Link copied to clipboard!");
    });
});
