function Interests({ interests }) {
  return (
    <div>
      <h3 className="headingStyle">Interests</h3>
      <ul>
        {interests.map((interest, index) => (
          <li key={index}>{interest}</li>
        ))}
      </ul>
    </div>
  );
}

export default Interests;