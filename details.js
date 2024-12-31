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
            <div id="qr-container" style="display: none; text-align: center; margin-top: 20px;">
                <h3>Scan the QR Code to Pay</h3>
                <img id="qr-code" alt="QR Code" />
                <p>UPI ID: 9079078718@pthdfc</p>
            </div>
        `;
        detailsContainer.innerHTML = html;

        document.getElementById('buy-now-button').addEventListener('click', () => {
            const price = row[5];
            const upiId = '9079078718@pthdfc';
            const upiString = `upi://pay?pa=${upiId}&pn=Krish Gaming&am=${price}&cu=INR`;
            const qrCodeImage = document.getElementById('qr-code');

            qrCodeImage.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(upiString)}&size=200x200`;

            document.getElementById('qr-container').style.display = 'block';
        });
    })
    .catch(error => {
        loader.style.display = 'none';
        console.error('Error fetching data:', error);
    });
