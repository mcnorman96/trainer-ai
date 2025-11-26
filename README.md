# Welcome to Trainer AI

Trainer AI is your personal learning assistant. It helps you set goals, get custom learning paths, and actually enjoy the process. No jargon, no clutter—just smart, simple tools to help you learn.

---

## What’s This All About?
Trainer AI uses AI to generate:
- Personalized learning roadmaps
- Modules and lessons
- Quizzes and explanations
All tailored to your goals. You set the destination, Trainer AI builds the journey.

---

## What Can It Do?
- Set a goal and get a full learning path
- AI-generated lessons, quizzes, and explanations
- Track your progress as you complete modules and lessons
- Take quizzes to test your knowledge
- See everything in clean markdown
- Switch to test mode for development (no API calls needed)
- Handles errors gracefully so you always get something useful

---

## Tech Under the Hood
- Next.js (React framework)
- Tailwind CSS (styling)
- TypeScript (type safety)
- Prisma (ORM)
- MySQL (database)
- OpenAI API (AI content)
- Docker (easy setup)

---

## Getting Started (with Docker)
1. Clone the repo:
   ```sh
   git clone https://github.com/yourusername/trainer-ai.git
   cd trainer-ai
   ```
2. Copy the example env file:
   ```sh
   cp .env.example .env
   # Add your OpenAI key and database info
   ```
3. Start everything up:
   ```sh
   docker-compose up --build
   ```
   This launches the app and MySQL together.
4. Run database migrations:
   ```sh
   docker-compose exec app npx prisma migrate deploy
   ```
5. Open your browser:
   Go to http://localhost:3000

---

## For Developers
- Uses pnpm (but npm/yarn work too)
- AI logic: /lib/ai/
- Test data: /test-data/ (set USE_TEST_DATA=true in .env)
- Prompts: /lib/ai/prompts/
- UI: /app/ and /components/
- Database: /prisma/schema.prisma

---

## Troubleshooting
- Check your OpenAI key and usage.
- Database issues? Make sure MySQL is running and .env is correct.
- Use test mode to skip OpenAI calls.

---