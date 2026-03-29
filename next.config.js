/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  output: 'standalone',
  async rewrites() {
    const jobsBase = process.env.STETHWORK_JOBS_URL || 'https://stethwork-jobs-389848866614.me-central1.run.app';
    return [
      { source: '/jobseeker-login', destination: `${jobsBase}/jobseeker-login` },
      { source: '/jobseeker-login/:path*', destination: `${jobsBase}/jobseeker-login/:path*` },
      { source: '/jobseeker-registration', destination: `${jobsBase}/jobseeker-registration` },
      { source: '/jobseeker-registration/:path*', destination: `${jobsBase}/jobseeker-registration/:path*` },
      { source: '/employer', destination: `${jobsBase}/employer` },
      { source: '/employer/:path*', destination: `${jobsBase}/employer/:path*` },
      { source: '/api/jobs/:path*', destination: `${jobsBase}/api/:path*` },
    ];
  },
};
module.exports = nextConfig;
