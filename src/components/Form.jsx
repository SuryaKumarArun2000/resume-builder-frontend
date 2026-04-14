import { useState, useEffect } from "react";

function Form({ data, setData, setShowResume }) {

  // Dynamic lists
  const [expList, setExpList] = useState([]);
  const [eduList, setEduList] = useState([]);
  const [resumeList, setResumeList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    fetchResumes();
  }, []);

  // ================= BASIC INFO =================
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  // ================= IMAGE UPLOAD =================
const handleImageUpload = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    setData({
      ...data,
      image: reader.result // ✅ base64 stored
    });
  };

  reader.readAsDataURL(file);
};

  // ================= EXPERIENCE =================
  const addExperience = () => {
    setExpList([
      ...expList,
      {
        id: Date.now(),
        role: "",
        company: "",
        duration: "",
        description: ""
      }
    ]);
  };

  const handleExpChange = (id, e) => {
    const updated = expList.map((exp) =>
      exp.id === id ? { ...exp, [e.target.name]: e.target.value } : exp
    );

    setExpList(updated);

    setData({
      ...data,
      experience: updated
    });
  };

  const deleteExperience = (id) => {
  const updated = expList.filter((exp) => exp.id !== id);

  setExpList(updated);

  setData({
    ...data,
    experience: updated
  });
};
  // ================= EDUCATION =================
  const addEducation = () => {
    setEduList([
      ...eduList,
      {
        id: Date.now(),
        degree: "",
        institution: "",
        year: ""
      }
    ]);
  };

  const handleEduChange = (id, e) => {
    const updated = eduList.map((edu) =>
      edu.id === id ? { ...edu, [e.target.name]: e.target.value } : edu
    );

    setEduList(updated);

    setData({
      ...data,
      education: updated
    });
  };
const deleteEducation = (id) => {
  const updated = eduList.filter((edu) => edu.id !== id);

  setEduList(updated);

  setData({
    ...data,
    education: updated
  });
};

// ================= SKILLS and INTERESTS =================
const [skillsList, setSkillsList] = useState([]);
const [interestList, setInterestList] = useState([]);

const addSkill = () => {
  setSkillsList([
    ...skillsList,
    { id: Date.now(), value: "" }
  ]);
};

const handleSkillChange = (id, e) => {
  const updated = skillsList.map((skill) =>
    skill.id === id ? { ...skill, value: e.target.value } : skill
  );

  setSkillsList(updated);

  setData({
    ...data,
    skills: updated.map(s => s.value)
  });
};

const deleteSkill = (id) => {
  const updated = skillsList.filter((skill) => skill.id !== id);

  setSkillsList(updated);

  setData({
    ...data,
    skills: updated.map(s => s.value)
  });
};

const addInterest = () => {
  setInterestList([
    ...interestList,
    { id: Date.now(), value: "" }
  ]);
};

const handleInterestChange = (id, e) => {
  const updated = interestList.map((item) =>
    item.id === id ? { ...item, value: e.target.value } : item
  );

  setInterestList(updated);

  setData({
    ...data,
    interests: updated.map(i => i.value)
  });
};

const deleteInterest = (id) => {
  const updated = interestList.filter((item) => item.id !== id);

  setInterestList(updated);

  setData({
    ...data,
    interests: updated.map(i => i.value)
  });
};

// ================= Get Resume ================= 

const loadResume = async (id) => {
  try {
    const res = await fetch(`https://resume-builder-backend-0ij6.onrender.com/getResume/${id}`);

    const savedData = await res.json();
    console.log("Loaded Data:", savedData);

    // ✅ Set main data
    setData(savedData);

    // ✅ Set experience blocks
    const expWithId = (savedData.experience || []).map((exp) => ({
      ...exp,
      id: Date.now() + Math.random()
    }));
    setExpList(expWithId);

    // ✅ Set education blocks
    const eduWithId = (savedData.education || []).map((edu) => ({
      ...edu,
      id: Date.now() + Math.random()
    }));
    setEduList(eduWithId);

    // ✅ Set skills
    const skillsWithId = (savedData.skills || []).map((s) => ({
      id: Date.now() + Math.random(),
      value: s
    }));
    setSkillsList(skillsWithId);

    // ✅ Set interests
    const interestsWithId = (savedData.interests || []).map((i) => ({
      id: Date.now() + Math.random(),
      value: i
    }));
    setInterestList(interestsWithId);

  } catch (err) {
    console.error("Error loading resume", err);
  }
};

const fetchResumes = async () => {
  try {
    const res = await fetch("https://resume-builder-backend-0ij6.onrender.com/getResumes");
    const data = await res.json();
    setResumeList(data);
  } catch (err) {
    console.error("Error fetching resumes", err);
  }
};
  return (
    <div className="form-container">
      <h2>Enter Details</h2>

      <button onClick={() => setShowModal(true)}>
        Load Resume
      </button>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">

            <div className="modal-header">
              <h3>Select Resume</h3>
              <button onClick={() => setShowModal(false)}>✖</button>
            </div>

            <div className="modal-body">
              {resumeList.length === 0 ? (
                <p>No resumes found</p>
              ) : (
                resumeList.map((r) => (
                  <div key={r._id} className="modal-item">
                    <span>{r.name}</span>

                    <button
                      onClick={() => {
                        loadResume(r._id);
                        setShowModal(false); // close modal after load
                      }}
                    >
                      Load
                    </button>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}
      {/* ================= BASIC INFO ================= */}
      <div className="form-group">
        <label>Full Name</label>
        <input name="name" placeholder="Enter your name" value={data.name || ""} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input name="email" placeholder="Enter your email" value={data.email || ""} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input name="phone" placeholder="Enter phone number" value={data.phone || ""} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>LinkedIn</label>
        <input name="linkedin" placeholder="Enter LinkedIn URL" value={data.linkedin || ""} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Objective</label>
        <textarea
          name="objective"
          placeholder="Write your objective"
          value={data.objective || ""}
          onChange={handleChange}
        />
      </div>

      {/* ================= IMAGE ================= */}
      <div className="form-group">
        <label>Upload Profile Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      <hr />

      {/* ================= EXPERIENCE ================= */}
      <h3>Experience</h3>
      <button onClick={addExperience}>+ Add Experience</button>

      {expList.map((exp) => (
        <div key={exp.id} className="form-block">

        {/* DELETE BUTTON */}
        <div className="block-header">
        <h4>Experience</h4>
        <button
            className="delete-btn"
            onClick={() => deleteExperience(exp.id)}
        >
            Delete
        </button>
        </div>

          <div className="form-group">
            <label>Role</label>
            <input
              name="role"
              value={exp.role}
              onChange={(e) => handleExpChange(exp.id, e)}
            />
          </div>

          <div className="form-group">
            <label>Company</label>
            <input
              name="company"
              value={exp.company}
              onChange={(e) => handleExpChange(exp.id, e)}
            />
          </div>

          <div className="form-group">
            <label>Duration</label>
            <input
              name="duration"
              value={exp.duration}
              onChange={(e) => handleExpChange(exp.id, e)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={exp.description}
              onChange={(e) => handleExpChange(exp.id, e)}
            />
          </div>

        </div>
      ))}

      <hr />

      {/* ================= EDUCATION ================= */}
      <h3>Education</h3>
      <button onClick={addEducation}>+ Add Education</button>

      {eduList.map((edu) => (
        <div key={edu.id} className="form-block">

        {/* DELETE BUTTON */}
        <div className="block-header">
        <h4>Education</h4>
        <button
            className="delete-btn"
            onClick={() => deleteEducation(edu.id)}
        >
            Delete
        </button>
        </div>

          <div className="form-group">
            <label>Degree</label>
            <input
              name="degree"
              value={edu.degree}
              onChange={(e) => handleEduChange(edu.id, e)}
            />
          </div>

          <div className="form-group">
            <label>Institution</label>
            <input
              name="institution"
              value={edu.institution}
              onChange={(e) => handleEduChange(edu.id, e)}
            />
          </div>

          <div className="form-group">
            <label>Year</label>
            <input
              name="year"
              value={edu.year}
              onChange={(e) => handleEduChange(edu.id, e)}
            />
          </div>

        </div>
      ))}

      {/* ================= SKILLS ================= */}
    <h3>Skills</h3>
    <button onClick={addSkill}>+ Add Skill</button>

    {skillsList.map((skill) => (
    <div key={skill.id} className="form-block">

        <div className="block-header">
        <h4>Skill</h4>
        <button
            className="delete-btn"
            onClick={() => deleteSkill(skill.id)}
        >
            Delete
        </button>
        </div>

        <div className="form-group">
        <input
            placeholder="Enter skill (e.g. React, Java)"
            value={skill.value}
            onChange={(e) => handleSkillChange(skill.id, e)}
        />
        </div>

    </div>
    ))}

      {/* ================= INTERESTS ================= */}
    <h3>Interests</h3>
    <button onClick={addInterest}>+ Add Interest</button>

    {interestList.map((item) => (
    <div key={item.id} className="form-block">

        <div className="block-header">
        <h4>Interest</h4>
        <button
            className="delete-btn"
            onClick={() => deleteInterest(item.id)}
        >
            Delete
        </button>
        </div>

        <div className="form-group">
        <input
            placeholder="Enter interest (e.g. Reading, Gaming)"
            value={item.value}
            onChange={(e) => handleInterestChange(item.id, e)}
        />
        </div>

    </div>
    ))}
    {/* ================= Submit Button ================= */}
    <button
    className="submit-btn"
    onClick={() => setShowResume(true)}
    >
    Generate Resume
    </button>
    {/* ================= Get Resume ================= */}

    {/* <button onClick={loadResume}>Load Resume</button> */}

    </div>
  );
}

export default Form;