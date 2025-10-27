# IssueLens

IssueLens is an AI-powered debugging assistant designed to help developers quickly resolve Appwrite related errors. It uses Retrieval Augmented Generation (RAG) to search through 9K+ Appwrite GitHub issues and comments, returning structured explanations and actionable fixes in seconds.

## Live Demo
https://issuelens-frontend.appwrite.network/

---

## Features

- Smart error analysis and context-aware search through GitHub issues
- Markdown formatted explanations with code snippets
- Actionable, step-by-step fixes for Appwrite issues
- Developer focused UI with clean structure
- Daily usage limits (5 free analyses every 12 hours)
- Fully responsive and mobile friendly design

---

## How It Works

1. The user submits an Appwrite related error message
2. The backend embeds and queries relevant GitHub issues using OpenAI vector search
3. Results are ranked and summarized into:
   - What happened in Appwrite
   - Fix
   - What to do next
4. Response is returned as structured Markdown

This significantly reduces the need to manually search issue threads.

---

## Architecture

| Component | Technology |
|----------|------------|
| Frontend | Next.js 15, React 19, Tailwind CSS |
| Backend | Node.js + Express |
| Database | Appwrite Database |
| Vector Search | OpenAI Vector Store |
| AI Models | OpenAI Assistants API |
| Deployment | Appwrite Sites |

---

## Appwrite Integration

| Appwrite Feature | Usage |
|-----------------|------|
| Appwrite Sites | Hosting static frontend |
| Appwrite Database | Track quotas using hashed fingerprints |
| OpenAI Vector Store | Store and query embeddings of GitHub issues |
| Node Appwrite SDK | Secure communication with backend |

---

## Rate Limiting

IssueLens provides 5 free queries every 12 hours. Query limits are enforced via:

- Hashed client fingerprints (derived from IP + headers)
- Server-stored quota values in Appwrite Database
- Automatic quota reset after expiration

Local storage is only used for display purposes; the server is the source of truth.

---

## Development

### Prerequisites

- Node.js 18+
- Appwrite project with:
  - Database ID and Table configured
  - Vector store populated with GitHub issue embeddings
- `.env` file containing:
  - `OPENAI_API_KEY`
  - `APPWRITE_API_KEY`
  - `PROJECT_ID`
  - `DATABASE_ID`

### Setup

```sh
git clone https://github.com/MeethDavda/IssueLens-frontend.git
cd IssueLens-frontend
npm install
npm run dev
