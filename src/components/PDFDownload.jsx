import React from "react";
import { jsPDF } from "jspdf";

function PDFDownload({ result }) {

  const downloadPDF = () => {

    if (!result) {
      alert("No analysis available.");
      return;
    }

    const pdf = new jsPDF();

    pdf.setFontSize(22);
    pdf.text("Clarify AI Report", 20, 20);

    pdf.setFontSize(12);

    let y = 40;

    pdf.text(
      "Confidence: " + result.confidence + "%",
      20,
      y
    );

    y += 10;

    pdf.text(
      "Recommendation:",
      20,
      y
    );

    y += 8;

    pdf.text(
      result.recommendation,
      20,
      y
    );

    y += 15;

    pdf.text(
      "Pros:",
      20,
      y
    );

    y += 8;

    result.pros.forEach((item) => {

      pdf.text(
        "- " + item,
        25,
        y
      );

      y += 8;

    });

    y += 5;

    pdf.text(
      "Cons:",
      20,
      y
    );

    y += 8;
    result.cons.forEach((item) => {

      pdf.text(
        "- " + item,
        25,
        y
      );

      y += 8;

    });

    y += 5;

    pdf.text(
      "Next Step:",
      20,
      y
    );

    y += 8;

    pdf.text(
      result.nextStep,
      20,
      y
    );

    y += 15;

    pdf.text(
      "Risk Score: " + result.riskScore + "%",
      20,
      y
    );

    y += 10;

    pdf.text(
      "Risk Level: " + result.riskLevel,
      20,
      y
    );

    y += 10;

    pdf.text(
      "Risk Reason:",
      20,
      y
    );

    y += 8;

    pdf.text(
      result.riskReason,
      20,
      y
    );

    pdf.save("Clarify-AI-Report.pdf");

  };

  return (

    <div
      style={{
        textAlign: "center",
        margin: "25px 0"
      }}
    >

      <button
        className="analyze-btn"
        onClick={downloadPDF}
      >
        📄 Download PDF Report
      </button>

    </div>

  );

}

export default PDFDownload;