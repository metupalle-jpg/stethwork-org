/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  async rewrites() {
    const JOBS = process.env.STETHWORK_JOBS_URL || 'https://stethwork-jobs-lyFnz37wsa-ww.a.run.app';
    return [
      { source: '/jobseeker-login', destination: `${JOBS}/jobseeker-login` },
      { source: '/jobseeker-login/:path*', destination: `${JOBS}/jobseeker-login/:path*` },
      { source: '/jobseeker-registration', destination: `${JOBS}/jobseeker-registration` },
      { source: '/jobseeker-registration/:path*', destination: `${JOBS}/jobseeker-registration/:path*` },
      { source: '/employer', destination: `${JOBS}/employer` },
      { source: '/employer/:path*', destination: `${JOBS}/employer/:path*` },
      { source: '/static/stethwork/:path*', destination: `${JOBS}/static/stethwork/:path*` },
      { source: '/api/stethwork/:path*', destination: `${JOBS}/api/stethwork/:path*` },
      { source: '/base.css', destination: `${JOBS}/base.css` },
      { source: '/style.css', destination: `${JOBS}/style.css` },
      { source: '/app.js', destination: `${JOBS}/app.js` },
    ];
  },
};
module.exports = nextConfig;
