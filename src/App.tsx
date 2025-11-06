import { useState, useRef } from "react";
import { add } from "./stringCalculator";

// Inline style objects for consistent visual styling and readability
const styles = {
  main: {
    padding: "20px",
    backgroundColor: "#fff",
    color: "#111", // Improved contrast for readability
    minHeight: "100vh",
  },
  image: {
    display: "block",
    maxWidth: "100%",
  },
  form: {
    maxWidth: 600,
  },
  label: {
    display: "block",
    marginTop: 16,
    color: "#555",
    fontWeight: 600,
  },
  textarea: {
    margin: "10px 0",
    color: "#222", // Better contrast for entered text
    width: "100%",
    minHeight: 60,
    fontSize: "16px",
  },
  button: {
    padding: "10px 24px",
    backgroundColor: "#006994", // Darker blue for higher contrast
    color: "#fff",
    border: "none",
    borderRadius: 4,
    fontSize: "16px",
    cursor: "pointer",
    marginTop: 8,
  },
  resultText: (isError: boolean) => ({
    color: isError ? "#c00" : "green", // Red for error, green for success
    outline: "none",
    fontWeight: 500,
  }),
  info: {
    color: "#222",
    fontSize: 15,
  },
};

const App = () => {
  // Application state: user input, calculation result, and possible error
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Ref for focusing on result after calculation — helps with screen readers
  const resultRef = useRef<HTMLParagraphElement>(null);

  // Helper to focus on result area after each update
  const focusResult = () => {
    setTimeout(() => resultRef.current?.focus(), 0);
  };

  // Handles calculation with error handling for invalid/negative inputs
  const handleCalculate = () => {
    try {
      setError(null);
      const calculated = add(input);
      setResult(calculated);
      focusResult();
    } catch (e: any) {
      setResult(null);
      setError(e.message);
      focusResult();
    }
  };

  // Prevents form submission from refreshing the page, calls calculator logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCalculate();
  };

  return (
    // Use <main> to mark the primary content region for screen readers
    <main style={styles.main}>
      {/* 
        Decorative image with descriptive alt text for accessibility.
        Using block display ensures it adapts well in layout.
      */}
      <img
        src="https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop"
        width={600}
        height={400}
        alt="Calculator with numbers in soft pastel colors"
        style={styles.image}
      />

      {/* Single <h1> for page title (important for screen reader hierarchy) */}
      <h1>String Calculator</h1>

      {/* 
        Use <form> for semantic grouping and keyboard accessibility.
        Allows 'Enter' key submission natively.
      */}
      <form
        onSubmit={handleSubmit}
        aria-labelledby="calculator-title"
        style={styles.form}
      >
        <h2 id="calculator-title" style={{ fontSize: "20px" }}>
          Enter numbers
        </h2>

        {/* 
          <label> with htmlFor ties label to the textarea for screen readers.
          Improves usability and click/focus behavior.
        */}
        <label htmlFor="numbersInput" style={styles.label}>
          Numbers (comma, newline, or custom delimiter):
        </label>

        {/* Textarea input field with improved contrast and required aria attributes */}
        <textarea
          id="numbersInput"
          style={styles.textarea}
          placeholder="Enter numbers"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-required="true"
          aria-describedby="input-desc"
        />

        {/* 
          Use <button> instead of clickable <div> for semantic correctness.
          Supports keyboard users (Enter/Space) and screen readers.
        */}
        <button
          type="submit"
          style={styles.button}
          aria-label="Calculate total from numbers input"
          // Visual focus outline for keyboard navigation
          onFocus={(e) => (e.currentTarget.style.outline = "2px solid #222")}
          onBlur={(e) => (e.currentTarget.style.outline = "none")}
        >
          Calculate
        </button>
      </form>

      {/* 
        Dynamic output area:
        - aria-live="assertive" notifies screen readers immediately on change.
        - tabIndex=-1 allows programmatic focus for accessibility feedback.
      */}
      <div
        aria-live="assertive"
        aria-atomic="true"
        style={{ marginTop: 16, minHeight: 24 }}
      >
        {(result !== null || error) && (
          <p ref={resultRef} tabIndex={-1} style={styles.resultText(!!error)}>
            {error ? `Error: ${error}` : `Result: ${result}`}
          </p>
        )}
      </div>

      {/* 
        Non-critical informational message.
        role="status" with aria-live="polite" announces updates calmly.
      */}
      <div role="status" aria-live="polite" style={{ marginTop: 20 }}>
        <p style={styles.info}>Make sure you enter numbers correctly!</p>
      </div>
    </main>
  );
};

export default App;
