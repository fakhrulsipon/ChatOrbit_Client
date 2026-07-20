import React from 'react';

const FAQSection = () => {
  const faqs = [
    {
      question: "How do I create an account on ChatOrbit?",
      answer: "Click the \"Sign Up\" button at the top-right corner, fill in your details (or log in via Google), and verify your email to create a new profile instantly.",
    },
    {
      question: "How can I submit a new post?",
      answer: "After logging in, click on \"Add Post\" from your user dashboard. Provide a descriptive title, choose tags, add your content, and submit to publish it to the community feed.",
    },
    {
      question: "How do I edit or delete my post?",
      answer: "Navigate to the \"My Posts\" tab in your dashboard. You can review all discussions you created and use the edit or delete actions directly from the post listings.",
    },
    {
      question: "How can I upvote or downvote a post?",
      answer: "Click on the thumbs up or thumbs down icon on any post details page or list item. Make sure you are logged in to ensure your feedback is recorded.",
    },
    {
      question: "How do I search or filter by tags?",
      answer: "Use the banner search bar to search for tags directly, or click on any of the active tags shown in the tags cloud on the homepage to filter posts.",
    }
  ];

  return (
    <section className="py-20 lg:py-28 max-w-4xl mx-auto px-4 md:px-12 lg:px-8 xl:px-16 w-full">
      {/* Title & Description */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-[48px] heading-display font-bold mb-4 text-white tracking-tight leading-none">
          🙋 Getting Started with ChatOrbit
        </h2>
        <p className="text-[#CBD5E1] text-sm lg:text-base leading-relaxed max-w-xl mx-auto">
           Frequently asked questions about using ChatOrbit. Learn how to create an account, post, and engage with the community.
        </p>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="collapse collapse-arrow bg-[#1B2435] border border-slate-800/80 rounded-[20px] hover:border-slate-800 transition-all duration-300 shadow-lg"
          >
            <input type="radio" name="faq-accordion" defaultChecked={index === 0} className="peer" />
            <div className="collapse-title font-bold text-slate-200 text-sm md:text-base peer-checked:text-[#FF8A00] peer-checked:bg-[#FF8A00]/5 hover:text-[#FF8A00] transition-all duration-200 cursor-pointer heading-display">
              {faq.question}
            </div>
            <div className="collapse-content bg-[#0B1120]/30 text-[#CBD5E1] text-xs md:text-sm leading-relaxed border-t border-slate-800/60 px-6 pt-5 pb-5">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
