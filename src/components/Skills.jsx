function Skills({ skills }) {
  return (
    <div>
      <h3 className="headingStyle">Skills</h3>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}



export default Skills;