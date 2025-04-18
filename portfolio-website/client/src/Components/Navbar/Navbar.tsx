import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./navbar.module.css"
import { faListUl, faHouse, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface NavbarProps {
    projectRef: React.RefObject<HTMLElement | null>;
    skillsRef: React.RefObject<HTMLElement | null>;
    contactRef: React.RefObject<HTMLElement | null>;
}

const Navbar = ({ projectRef, skillsRef, contactRef }: NavbarProps) => {

    const [dropdown, setDropdown] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    const handleHover = () => {
        setDropdown(true);
        setTimeout(() => {
            setIsMounted(true);
        }, 10);
    };

    const handleUnhover = () => {
        setIsMounted(false);
        setTimeout(() => {
            setDropdown(false);
        }, 500);
    };

    const handleClick = () => {
        projectRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSkills = () => {
        skillsRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleContact = () => {
        contactRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return(
        <>
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <h1>David</h1>
            </div>
            <div className={styles.right}>
                <li><a href="#" onClick={handleSkills}>Skills</a></li>
                <li onMouseEnter={handleHover}><a href="#">Projects <FontAwesomeIcon icon={faAngleDown}/></a>
                </li>
                <li><a href="#" onClick={handleContact}>Contact</a></li>
            </div>   
        </nav>
        {dropdown &&
                    <nav className={`${styles.dropdown} ${isMounted ? styles.animated : ""}`} onMouseLeave={handleUnhover}>
                        <div className={styles.projects}>
                            <div className={styles.content} onClick={handleClick}>
                                <FontAwesomeIcon icon={faListUl} className={styles.icon} />
                                <h1>To-Do-Application</h1>
                                <p>Interactive To-Do application that can be used for completing important tasks with many functionalities!</p>
                            </div>

                            <div className={styles.content} onClick={handleClick}>
                                <FontAwesomeIcon icon={faHouse} className={styles.icon} />
                                <h1>Real-estate agency</h1>
                                <p>Real estate agency website where users can look for estates on sale and decided what is best for them!</p>
                            </div>
                        </div>
                    </nav>
        }
        <div>
        </div>
        </>
    );
};

export default Navbar