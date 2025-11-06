import { useRef, useState } from "react";
import { add } from "./stringCalculator";

const App = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLParagraphElement>(null);

  const handleCalculate = () => {
    try {
      setError(null);
      const calculated = add(input);
      setResult(calculated);
      // Focus the result content for screen readers (announce)
      setTimeout(() => {
        resultRef.current?.focus();
      }, 0);
    } catch (e: any) {
      setResult(null);
      setError(e.message);
      setTimeout(() => {
        resultRef.current?.focus();
      }, 0);
    }
  };

  return (
    // Use <main> for page main content landmark
    <main
      style={{
        padding: "20px",
        backgroundColor: "#fff",
        color: "#111", // Improved contrast from #aaa to #111 for better readability
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={600}
        height={400}
      />

      <h2>String Calculator</h2>

      <h1 style={{ fontSize: "20px" }}>Enter numbers</h1>

      <textarea
        style={{ margin: "10px 0", color: "#aaa" }}
        placeholder="Enter numbers"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div
        onClick={handleCalculate}
        style={{
          padding: "10px",
          backgroundColor: "#008cba",
          color: "#fff",
          border: "none",
        }}
      >
        Calculate
      </div>

      {/* 
        aria-live="assertive" to announce result changes to screen readers.
        Use tabIndex to allow focus on result for screen readers after calculation/error.
      */}
      <div
        aria-live="assertive"
        aria-atomic="true"
        style={{ margin: "16px 0 0 0", minHeight: 24 }}
      >
        {(result !== null || error) && (
          <p
            ref={resultRef}
            tabIndex={-1}
            style={{
              color: error ? "#c00" : "green",
              outline: "none",
              fontWeight: 500,
            }}
          >
            {error ? `Error: ${error}` : `Result: ${result}`}
          </p>
        )}
      </div>
    </main>
  );
};

export default App;
