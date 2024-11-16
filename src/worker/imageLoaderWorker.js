self.addEventListener('message', function(e) {
    const { url, index } = e.data;
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            self.postMessage({ index });
        }).catch(error => {
            console.error('Error loading image:', error);
        });
});