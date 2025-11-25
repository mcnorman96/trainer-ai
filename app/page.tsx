import GoalInput from "./components/GoalInput";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Welcome to Trainer AI</h1>
      <p className="text-lg mb-8">Your personal AI-powered training assistant</p>
      <p className="text-lg mb-8">Start by creating a new training goal</p>
      <GoalInput />
    </div>
  );
}
