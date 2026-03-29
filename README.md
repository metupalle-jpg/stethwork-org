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
