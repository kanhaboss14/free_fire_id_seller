const images = [
    "https://i.ibb.co/NKRTVHm/img2.jpg",
    "https://i.ibb.co/ScvQp2c/img3.jpg",
    "https://i.ibb.co/s9FPFSw/img1.jpg"
];
let currentIndex = 0;

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    document.getElementById("phoneImage").src = images[currentIndex];
}
