# stethwork-org
stethwork.org - Healthcare Professional Network. WordPress site and pro.stethwork.org portal ecosystem.

## Cloud Run / Cloud Build deployment

This repository now includes:

- `Dockerfile` for containerized Node/Next.js + Payload deployment on Cloud Run
- `cloudbuild.yaml` to build, push, and deploy the container to Cloud Run

### Build prerequisites

Cloud Build expects a runnable Node app in the repository root:

- `package.json` (required)
- lockfile (`package-lock.json` recommended)
- build/start scripts (`npm run build`, `npm run start`)

The current `Dockerfile` fails fast with a clear error message when `package.json` is missing.

### Required runtime environment variables

Set these in your Cloud Run service before production traffic:

- `DATABASE_URI`
- `PAYLOAD_SECRET`
- any additional provider/API keys your app requires

Example deploy trigger command:

```bash
gcloud builds submit --config cloudbuild.yaml .
```

## GitHub Actions auto-deploy (main -> Cloud Run)

This repository includes `.github/workflows/deploy-cloud-run.yml` which runs on:

- push to `main`
- manual trigger (`workflow_dispatch`)

It authenticates to GCP via Workload Identity Federation and runs:

```bash
gcloud builds submit --config cloudbuild.yaml .
```

### Required GitHub repository variables

- `GCP_PROJECT_ID` (example: `my-gcp-project`)
- `GCP_REGION` (example: `us-central1`)
- `CLOUD_RUN_SERVICE` (example: `stethwork-org`)

### Required GitHub repository secrets

- `GCP_WORKLOAD_IDENTITY_PROVIDER`
  - full provider resource name, e.g.
  - `projects/123456789/locations/global/workloadIdentityPools/github/providers/my-provider`
- `GCP_SERVICE_ACCOUNT_EMAIL`
  - service account email used by GitHub Actions, e.g.
  - `github-deployer@my-gcp-project.iam.gserviceaccount.com`

### Required IAM roles

Grant the deployer service account permissions at least equivalent to:

- `roles/cloudbuild.builds.editor`
- `roles/run.admin`
- `roles/iam.serviceAccountUser`
- `roles/artifactregistry.writer`

Also ensure your Workload Identity provider trusts this GitHub repo/branch.
