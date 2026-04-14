import { FaEnvelope, FaPhone, FaLinkedin } from "react-icons/fa";

function Header({ name, email, phone, linkedin, image }) {
  return (
    <div className="resume-header">

      {/* LEFT SECTION */}
      <div className="resume-left">
        <h1 className="resume-name">{name}</h1>

        <div className="resume-contact">
          <span>📧 {email}</span>
          <span>📱 {phone}</span>
          <span>🔗 {linkedin}</span>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="resume-right">
        {image && (
          <img src={image} alt="profile" className="resume-img" />
        )}
      </div>

    </div>
  );
}


export default Header;