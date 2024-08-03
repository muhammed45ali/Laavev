self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activating.');
});

self.addEventListener('fetch', (event) => {
    // Customize fetch events here if needed
});

async function capturePhoto() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement('video');
    video.srcObject = stream;
    await video.play();

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    stream.getTracks().forEach(track => track.stop());

    return canvas.toDataURL('image/png');
}

self.addEventListener('message', async (event) => {
    if (event.data.action === 'capturePhoto') {
        const photoDataUrl = await capturePhoto();
        event.ports[0].postMessage({ photo: photoDataUrl });
    }
});
