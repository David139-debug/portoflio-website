import Welcome from "./Components/Home/Welcome"
import Skills from "./Components/Skills/Skills"
import Projects from "./Components/Projects/Projects"
import Navbar from "./Components/Navbar/Navbar"
import Contact from "./Components/Contact/Contact"
import { useRef } from "react"

function App() {

  const projectRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  return (
    <>
      <Navbar projectRef={projectRef} skillsRef={skillsRef} contactRef={contactRef} />
      <Welcome />
      <Skills ref={skillsRef} />
      <Projects ref={projectRef} />
      <Contact ref={contactRef} />
    </>
  )
}

export default App
