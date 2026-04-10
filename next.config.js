/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  async rewrites() {
    const JOBS = process.env.STETHWORK_JOBS_URL || 'https://stethwork-jobs-24631288959.me-central1.run.app';
    return [
      // Portal proxy rewrites (used by iframes)
      { source: '/portal/jobseeker-login', destination: `${JOBS}/jobseeker-login` },
      { source: '/portal/jobseeker-login/:path*', destination: `${JOBS}/jobseeker-login/:path*` },
      { source: '/portal/jobseeker-registration', destination: `${JOBS}/jobseeker-registration` },
      { source: '/portal/jobseeker-registration/:path*', destination: `${JOBS}/jobseeker-registration/:path*` },
      // Employer pages (keep as-is)
      { source: '/employer', destination: `${JOBS}/employer` },
      { source: '/employer/:path*', destination: `${JOBS}/employer/:path*` },
      // Static/API assets for the SPA
      { source: '/static/stethwork/:path*', destination: `${JOBS}/static/stethwork/:path*` },
      { source: '/api/stethwork/:path*', destination: `${JOBS}/api/stethwork/:path*` },
      { source: '/base.css', destination: `${JOBS}/base.css` },
      { source: '/style.css', destination: `${JOBS}/style.css` },
      { source: '/app.js', destination: `${JOBS}/app.js` },
    ];
  },
};

module.exports = nextConfig;
