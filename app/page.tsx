import GoalInput from "./components/GoalInput";

export default function Home() {
  return (
    <div className="flex text-center flex-col items-center justify-center h-auto min-h-[60vh] py-4 sm:py-8 px-2">
      <h1 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4">Welcome to Trainer AI</h1>
      <p className="text-base sm:text-lg mb-2 sm:mb-8">Start learning by entering a topic below.</p>
      <p className="text-base sm:text-lg mb-2 sm:mb-8">Example: Learn React</p>
      <p className="text-base sm:text-lg mb-2 sm:mb-8">It takes a while for the AI to generate your learning path. Please be patient.</p>
      <GoalInput />
    </div>
  );
}
