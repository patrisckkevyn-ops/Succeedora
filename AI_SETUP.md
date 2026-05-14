# Succeedora AI Setup

Add these environment variables in Vercel under Project Settings > Environment Variables:

```env
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5.1-mini
```

Keep `OPENAI_API_KEY` only in Vercel or a local `.env` file. Do not paste it into `app.js`, HTML, CSS, or any frontend file.

The frontend calls `/api/ai/generate`; that serverless endpoint reads the key from `process.env.OPENAI_API_KEY` and calls OpenAI from the backend.
