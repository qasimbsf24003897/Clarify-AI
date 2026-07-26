import React from "react";

function Testimonials() {

  const reviews = [

    {
      name: "Ali Khan",
      role: "Computer Science Student",
      text: "Clarify AI helped me choose Artificial Intelligence over other career paths with confidence."
    },

    {
      name: "Ayesha Malik",
      role: "Freelancer",
      text: "The AI analysis, risk score and roadmap made my decision much easier."
    },

    {
      name: "Ahmed Raza",
      role: "Software Engineer",
      text: "This feels like a real AI decision coach instead of a normal chatbot."
    }

  ];

  return (

    <section className="testimonials">

      <h2>💬 What Users Say</h2>

      <div className="testimonial-container">
        {reviews.map((review, index) => (

          <div
            className="testimonial-card"
            key={index}
          >

            <h3>{review.name}</h3>

            <span>{review.role}</span>

            <p>
              "{review.text}"
            </p>

          </div>

        ))}

      </div>

    </section>

  );

}

export default Testimonials;
      