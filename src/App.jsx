import { useState } from "react";
import Header from "./components/Header";
import Objective from "./components/Objective";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Interests from "./components/Interests";
import profileImg from "./assets/passport.jpeg";
import samplePassport from "./assets/samplePassport.jpg";
import Form from "./components/Form";
import "./App.css";
import Resume from "./components/Resume";
function App() {
const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    image: "",
    objective: "",
    experience: [],
    education: [],
    interests: [],
    skills: []
    

  });
const [showResume, setShowResume] = useState(false);
console.log("Form data", data);
  return (
    <div>
      {!showResume ? (
        <Form data={data} setData={setData} setShowResume={setShowResume} />
      ) : (
        <Resume data={data} setShowResume={setShowResume} />
      )}
    </div>
  );
}

export default App;