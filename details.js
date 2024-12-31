const loader = document.getElementById('loader');
const detailsContainer = document.getElementById('details-container');

loader.style.display = 'flex';

fetch('https://script.google.com/macros/s/AKfycbyjLyr0Nzk-Q2isy_m8draoHxhKZFWqkhHUdJv3rZK6ICQZz_OTAEhXETyktJEDj-SQ/exec', {
    method: 'POST'
})
    .then(response => response.json())
    .then(data => {
        loader.style.display = 'none';
        const currentIndex = localStorage.getItem('currentIndex');
        const row = data[currentIndex];
        const html = `
            <div class="frames">
                <iframe src="${row[2]}"></iframe>
                <img src="${row[3]}">
                <img src="${row[4]}">
            </div>
            <div class="text">
                <h2>${row[0]}</h2>
                <p class="des">${row[1]}</p>
                <p class="prince">Price: ₹${row[5]}</p>
                <button id="buy-now-button">Buy Now</button>
            </div>
            <div id="qr-container" style="display: none;">
                <h3>Scan QR to Level Up!</h3>
                <div id="qrcode"></div>
                <p class="upi-text">UPI ID: 9079078718@pthdfc</p>
                <button onclick="document.getElementById('qr-container').style.display='none';">Close</button>
            </div>
        `;
        detailsContainer.innerHTML = html;

        let qrcode = null;
        document.getElementById('buy-now-button').addEventListener('click', () => {
            const price = row[5];
            const upiId = '9079078718@pthdfc';
            const upiString = `upi://pay?pa=${upiId}&pn=Krish Gaming&am=${price}&cu=INR`;
            
            const qrContainer = document.getElementById('qr-container');
            const qrcodeDiv = document.getElementById('qrcode');
            qrcodeDiv.innerHTML = '';
            qrcode = new QRCode(qrcodeDiv, {
                text: upiString,
                width: 200,
                height: 200,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });

            qrContainer.style.display = 'block';
        });
    })
    .catch(error => {
        loader.style.display = 'none';
        console.error('Error fetching data:', error);
    });
