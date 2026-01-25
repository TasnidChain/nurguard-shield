export default function TrustQuotes() {
  const quotes = [
    {
      text: "Finally something built for Muslims, not just another filter.",
      author: "Early User",
    },
    {
      text: "This removes doubt. Clear, simple, and intentional.",
      author: "Community Beta Tester",
    },
    {
      text: "I installed it in minutes and felt relief immediately.",
      author: "Parent",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Users Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quotes.map((quote, index) => (
            <div
              key={index}
              className="p-6 border border-gray-800 rounded-lg hover:border-emerald-500/50 transition bg-gray-950/50"
            >
              <p className="text-gray-300 mb-4 italic">"{quote.text}"</p>
              <p className="text-emerald-500 font-semibold">— {quote.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
