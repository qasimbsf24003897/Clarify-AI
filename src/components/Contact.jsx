import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const form = useRef();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    emailjs
      .sendForm(
        "service_r6qyscp",
        "template_px32z2h",
        form.current,
        "bMAeCmbu6nDlqKi2H"
      )
      .then(() => {
        setLoading(false);
        setStatus("success");
        form.current.reset();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setStatus("error");
      });
  };

  return (
    <section className="contact" id="contact">
      <h2>Contact Us</h2>

      <p className="contact-subtitle">
        Have a question or feedback? We'd love to hear from you.
      </p>

      <form
        ref={form}
        onSubmit={sendEmail}
        className="contact-form"
      >
        <input
          type="text"
          name="from_name"
          placeholder="Your Name"
          required
        />

        <input
          type="email"
          name="from_email"
          placeholder="Your Email"
          required
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          required
        />

        <textarea
          name="message"
          rows="6"
          placeholder="Write your message..."
          required
        ></textarea>

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p className="success-message">
            ✅ Message sent successfully!
          </p>
        )}

        {status === "error" && (
          <p className="error-message">
            ❌ Failed to send message. Please try again.
          </p>
        )}
      </form>
    </section>
  );
}

export default Contact;