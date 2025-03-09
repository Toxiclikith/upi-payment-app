// Function to get URL parameters
function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get UPI ID and amount from URL or localStorage (persistent)
let upiID = getQueryParam("upi") || localStorage.getItem("lastUpiID");
let amount = getQueryParam("amount") || localStorage.getItem("lastAmount");

if (upiID) {
    localStorage.setItem("lastUpiID", upiID);
}
if (amount) {
    localStorage.setItem("lastAmount", amount);
}

// Display payment message
let paymentText = document.getElementById("paymentText");
paymentText.innerHTML = `Sending ${amount ? "₹" + amount : ""} to <strong>${upiID}</strong>`;

// Generate QR Code
let upiURL = `upi://pay?pa=${upiID}&pn=UPI%20Payment${amount ? "&am=" + amount : ""}&cu=INR`;
new QRCode(document.getElementById("qrcode"), {
    text: upiURL,
    width: 200,
    height: 200
});

// Redirect to UPI apps on button click
document.getElementById("payNow").addEventListener("click", function () {
    window.location.href = upiURL;
});
