function Experience({ experience = [] }) {
  return (
    <div>
      <h3 className="headingStyle">Experience</h3>

      {experience.map((exp, index) => (
        <div key={index} className="exp-block">
          
          <div className="exp-header">
            <h5>{exp.role}</h5>
            <span>{exp.duration}</span>
          </div>

          <p className="company">{exp.company}</p>
          <p className="description">{exp.description}</p>

        </div>
      ))}
    </div>
  );
}

export default Experience;