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
        `;
        detailsContainer.innerHTML = html;

        document.getElementById('buy-now-button').addEventListener('click', () => {
            const price = row[5];
            const upiId = '9079078718@pthdfc';
            const name = 'Krish Gaming';
            const transactionNote = 'Purchase from Krish Gaming';
            const currency = 'INR';
            const upiURL = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&mc=&tid=&tr=&tn=${encodeURIComponent(transactionNote)}&am=${encodeURIComponent(price)}&cu=${encodeURIComponent(currency)}`;
            window.location.href = upiURL;
        });
    })
    .catch(error => {
        loader.style.display = 'none';
        console.error('Error fetching data:', error);
    });
