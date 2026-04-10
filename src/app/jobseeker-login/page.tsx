/* eslint-disable @next/next/no-img-element */
import TopNav from '@/components/TopNav';

export default function JobSeekerLoginPage() {
  const jobsLoginUrl =
    process.env.NEXT_PUBLIC_STETHWORK_JOBS_URL ||
    process.env.STETHWORK_JOBS_URL ||
    'https://stethwork-jobs-24631288959.me-central1.run.app';

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <TopNav showMarketingActions={false} />

      {/* IFRAME CONTENT */}
      <main className="flex-1 flex justify-center items-start py-8 px-4 md:px-8 lg:px-12 bg-gray-50">
        <iframe
          src={`${jobsLoginUrl}/jobseeker-login#/stethwork/jobseeker`}
          className="w-full max-w-5xl border-0 rounded-2xl shadow-lg bg-white"
          style={{ minHeight: '700px' }}
          title="Job Seeker Login"
          allow="popups; popups-to-escape-sandbox"
        />
      </main>

      {/* FOOTER */}
      <footer className="bg-steth-footer py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img
              src="https://steth.work/Images/logo/Logo-2-2.png"
              alt="Steth.work logo"
              className="h-12 md:h-14 w-auto object-contain"
            />
            <div>
              <p className="text-white font-bold text-xl">Steth.work</p>
              <p className="text-gray-400 text-sm">Healthcare Professional Network</p>
            </div>
          </div>
          <div className="text-gray-400 text-sm">&copy; Copyright 2025 <span className="text-brandTeal">Steth.work</span> All Rights Reserved.</div>
        </div>
      </footer>
    </div>
  );
}
