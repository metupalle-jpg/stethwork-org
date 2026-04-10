import { NextRequest, NextResponse } from 'next/server';

const JOBS_URL = process.env.STETHWORK_JOBS_URL || 'https://stethwork-jobs-24631288959.me-central1.run.app';

const HIDE_SOCIAL_CSS = `
<style id="hide-social">
  /* Hide Facebook and LinkedIn buttons by matching text content via JS below */
</style>
<script>
  function hideSocial() {
    document.querySelectorAll('button, a').forEach(function(el) {
      var t = (el.textContent || '').trim().toLowerCase();
      if (t === 'continue with facebook' || t === 'continue with linkedin' ||
          t === 'sign in with facebook' || t === 'sign in with linkedin') {
        el.style.display = 'none';
      }
    });
  }
  // Run on load and observe DOM changes
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideSocial);
  } else {
    hideSocial();
  }
  var observer = new MutationObserver(hideSocial);
  observer.observe(document.body || document.documentElement, { childList: true, subtree: true });
  setTimeout(function() { observer.disconnect(); }, 15000);
  [100, 500, 1000, 2000, 3000, 5000].forEach(function(ms) { setTimeout(hideSocial, ms); });
</script>
`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || 'jobseeker-login';
  
  try {
    const res = await fetch(`${JOBS_URL}/${page}`, {
      headers: { 'Accept': 'text/html' },
    });
    let html = await res.text();
    
    // Inject our CSS/JS right before </head> or at end of <body>
    if (html.includes('</head>')) {
      html = html.replace('</head>', HIDE_SOCIAL_CSS + '</head>');
    } else if (html.includes('</body>')) {
      html = html.replace('</body>', HIDE_SOCIAL_CSS + '</body>');
    } else {
      html = html + HIDE_SOCIAL_CSS;
    }
    
    // Fix relative URLs to point back to our proxy
    // The SPA loads /static/stethwork/*, /base.css, /style.css, /app.js
    // These are already proxied via next.config.js rewrites
    
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Frame-Options': 'SAMEORIGIN',
      },
    });
  } catch (e) {
    return new NextResponse('Portal unavailable', { status: 502 });
  }
}
