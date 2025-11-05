// social-bar.js
(function() {
  'use strict';
  
  // Load social bar script
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '//pl16170729.effectivegatecpm.com/b3/45/84/b345842bfb07df1db75bfcf1a898e0da.js';
  script.async = true;
  
  script.onload = function() {
    console.log('Social bar loaded successfully');
  };
  
  script.onerror = function() {
    console.error('Failed to load social bar');
  };
  
  // Append to head or body
  (document.head || document.body).appendChild(script);
})();
