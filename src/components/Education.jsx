function Education({ education }) {
  return (
    <div>
      <h3 className="headingStyle">Education</h3>
      {education.map((edu, index) => (
        <div key={index}>
          <p>{edu.institution} | {edu.degree} | {edu.year}</p>
        </div>
      ))}
    </div>
  );
}

export default Education;