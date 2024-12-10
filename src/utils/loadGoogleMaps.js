const loadGoogleMap = () => {
    return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
            resolve(window.google.maps);
            return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDRyKk67-vjFjtq8PGLKwF72RtSAvQnsYk&libraries=places&region=RW`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            if (window.google && window.google.maps) {
                resolve(window.google.maps);
            } else {
                reject(new Error('Google Maps API loaded but not available'));
            }
        };

        script.onerror = (error) => {
            reject(new Error('Failed to load Google Maps API'));
        };

        document.head.appendChild(script);
    });
};

export default loadGoogleMap;
