import { useState } from "react";

const App = ()=> {

    const [a, setA] = useState("");
    const [b, setB] = useState("");
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState("");

    const handleCalculate = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        setResult(null);
        setError("");

        try {
            const response = await fetch("http://127.0.0.1:8080/api/sum", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    a,
                    b,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            setResult(data.sum);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        }
    };

  return (
      <main className="min-h-screen bg-[#f7f7f8] flex items-center justify-center px-4">
          <section className="w-full max-w-[520px] rounded-xl bg-white px-9 py-10 border border-gray-100">
              <h1 className="mb-7 text-[28px] font-bold text-gray-950">
                  Calculator
              </h1>

              <form onSubmit={handleCalculate} className="space-y-5">
                  <input
                      type="text"
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                      placeholder="Enter A"
                      className="h-12 w-full rounded-lg border border-gray-300 px-5 text-base text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <input
                      type="text"
                      value={b}
                      onChange={(e) => setB(e.target.value)}
                      placeholder="Enter B"
                      className="h-12 w-full rounded-lg border border-gray-300 px-5 text-base text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <button
                      type="submit"
                      className="h-12 w-full rounded-lg bg-blue-600 text-base font-semibold text-white transition hover:bg-blue-700"
                  >
                      Calculate
                  </button>
              </form>

              {result !== null && (
                  <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-5 py-3 font-semibold text-green-700">
                      Result: {result}
                  </div>
              )}

              {error && (
                  <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-5 py-3 font-semibold text-red-700">
                      {error}
                  </div>
              )}
          </section>
      </main>
  )
}

export default App
