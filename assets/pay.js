function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

let upiID = getQueryParam("upi") || localStorage.getItem("lastUpiID");
let amount = getQueryParam("amount") || localStorage.getItem("lastAmount");

if (upiID) {
    localStorage.setItem("lastUpiID", upiID);
}
if (amount) {
    localStorage.setItem("lastAmount", amount);
}

let paymentText = document.getElementById("paymentText");
paymentText.innerHTML = `Pay <strong>${amount ? "₹" + amount : ""}</strong> to <strong>${upiID}</strong>`;

let upiURL = `upi://pay?pa=${upiID}&pn=UPI%20Payment${amount ? "&am=" + amount : ""}&cu=INR`;
new QRCode(document.getElementById("qrcode"), {
    text: upiURL,
    width: 200,
    height: 200
});

document.getElementById("payNow").addEventListener("click", function () {
    window.location.href = upiURL;
});
