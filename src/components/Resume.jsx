import Header from "./Header";
import Objective from "./Objective";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";
import Interests from "./Interests";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Resume = ({ data, setShowResume }) => {
  const resumeRef = useRef();

    const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: data.name.split(" ")[0]+"_"+data.phone
    });
    const handleDownload = async () => {
      try {
        await fetch("https://resume-builder-backend-0ij6.onrender.com/saveResume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        console.log("Data saved");

        // 🔥 THEN DOWNLOAD PDF
        handlePrint();

      } catch (err) {
        console.error("Error saving data", err);
      }
    };
  return (
    <div>

      {/* DOWNLOAD BUTTON */}
      <button className="download-btn" onClick={handleDownload}>
        Download PDF
      </button>

      {/* BACK BUTTON */}
      <button
        className="back-btn"
        onClick={() => setShowResume(false)}
      >
        ← Edit Resume
      </button>

      {/* 🔥 THIS IS THE FIX */}
      <div ref={resumeRef} className="resume-container">
        <Header {...data} />
        <Objective objective={data.objective} />
        <Experience experience={data.experience} />
        <Education education={data.education} />
        <Skills skills={data.skills} />
        <Interests interests={data.interests} />
      </div>

    </div>
  );
};

export default Resume;