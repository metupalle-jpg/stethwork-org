import { redirect } from 'next/navigation';

export default function JobSeekerLoginPage() {
  const jobsLoginUrl =
    process.env.NEXT_PUBLIC_STETHWORK_JOBS_URL ||
    process.env.STETHWORK_JOBS_URL ||
    'https://stethwork-jobs-24631288959.me-central1.run.app';

  redirect(`${jobsLoginUrl}/jobseeker-login#/stethwork/jobseeker`);
}
