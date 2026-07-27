import React from "react";

function FollowUpQuestions({
  answers,
  setAnswers,
  handleSubmit,
  loading,
}) {
  return (
    <section className="followup-section">

      <div className="followup-card">

        <h2>🧠 Before We Analyze</h2>

        <p>
          Answer these questions so Clarify AI can give a personalized recommendation.
        </p>

        <div className="question">

          <label>1. What is your current education?</label>

          <input
            type="text"
            placeholder="Example: BS Computer Science"
            value={answers.education}
            onChange={(e) =>
              setAnswers({
                ...answers,
                education: e.target.value,
              })
            }
          />

        </div>

        <div className="question">

         <label>2. Do you have any previous experience related to your goal?</label>

          <select
            value={answers.level}
            onChange={(e) =>
              setAnswers({
                ...answers,
                level: e.target.value,
              })
            }
          >
       <option value="">Select</option>
<option>No Experience</option>
<option>Basic Knowledge</option>
<option>Some Experience</option>
<option>Experienced</option>
          </select>

        </div>

        <div className="question">

          <label>3. How many hours can you study daily?</label>

          <input
            type="text"
            placeholder="Example: 3 Hours"
            value={answers.hours}
            onChange={(e) =>
              setAnswers({
                ...answers,
                hours: e.target.value,
              })
            }
          />

        </div>

        <div className="question">

          <label>4. What is your career goal?</label>

          <input
            type="text"
            placeholder="Example: Remote AI Job"
            value={answers.goal}
            onChange={(e) =>
              setAnswers({
                ...answers,
                goal: e.target.value,
              })
            }
          />

        </div>

        <div className="question">

          <label>5. Are you interested in Job or Freelancing?</label>

          <select
            value={answers.path}
            onChange={(e) =>
              setAnswers({
                ...answers,
                path: e.target.value,
              })
            }
          >
            <option value="">Select</option>
            <option>Job</option>
            <option>Freelancing</option>
            <option>Business</option>
            <option>Not Sure</option>
          </select>

        </div>

        <button
          className="analyze-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Continue Analysis"}
        </button>

      </div>

    </section>
  );
}

export default FollowUpQuestions;