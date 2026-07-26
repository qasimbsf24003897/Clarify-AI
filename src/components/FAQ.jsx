import React, { useState } from "react";

function FAQ() {

  const faqs = [

    {
      question: "Is Clarify AI free to use?",
      answer: "Yes. You can analyze your important decisions without any cost."
    },

    {
      question: "Does Clarify AI replace human advice?",
      answer: "No. It provides AI-powered guidance to help you make better decisions."
    },

    {
      question: "Can I save my previous decisions?",
      answer: "Yes. Your decision history is automatically saved in your browser."
    },

    {
      question: "How does the AI generate recommendations?",
      answer: "It analyzes your decision, compares possible outcomes, evaluates risks, and suggests the best path."
    }

  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {

    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }

  };

  return (

    <section className="faq">

      <h2>❓ Frequently Asked Questions</h2>
      <div className="faq-container">

        {faqs.map((faq, index) => (

          <div
            className="faq-item"
            key={index}
          >

            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >

              {faq.question}

              <span>

                {openIndex === index ? "−" : "+"}

              </span>

            </button>

            {openIndex === index && (

              <div className="faq-answer">

                <p>{faq.answer}</p>

              </div>

            )}

          </div>

        ))}

      </div>

    </section>

  );

}

export default FAQ;