import GoalInput from "./components/GoalInput";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] py-2">
      <h1>Welcome to Trainer AI</h1>
      <p className="text-lg mb-8">Start learning by entering a topic below.</p>
      <p className="text-lg mb-8">Example: Learn React</p>
      <GoalInput />
    </div>
  );
}
