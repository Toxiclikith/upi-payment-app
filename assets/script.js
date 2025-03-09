document.getElementById('generateBtn').addEventListener('click', function() {
    let upi = document.getElementById('upiId').value.trim();
    let amount = document.getElementById('amount').value.trim();

    if (!upi) {
        alert('Please enter a valid UPI ID');
        return;
    }

    // Reset the amount value if empty
    amount = amount ? `&amount=${amount}` : '';

    let paymentLink = `https://toxiclikith.github.io/upi-payment-app/pay.html?upi=${encodeURIComponent(upi)}${amount}`;

    document.getElementById('generatedLink').value = paymentLink;
    document.getElementById('copyBtn').style.display = 'inline-block';
    document.getElementById('generatedLinkContainer').style.display = 'block';
});

document.getElementById('copyBtn').addEventListener('click', function() {
    let linkField = document.getElementById('generatedLink');
    linkField.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
});

// Center QR Code on All Devices
window.onload = function() {
    let qrContainer = document.getElementById('qrcode');
    if (qrContainer) {
        qrContainer.style.display = 'flex';
        qrContainer.style.justifyContent = 'center';
        qrContainer.style.alignItems = 'center';
        qrContainer.style.margin = 'auto';
        qrContainer.style.width = '100%';
    }
};
