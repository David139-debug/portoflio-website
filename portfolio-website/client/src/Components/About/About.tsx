import styles from "./about.module.css"
import { forwardRef, useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdBadge } from "@fortawesome/free-solid-svg-icons";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { faPersonBiking } from "@fortawesome/free-solid-svg-icons";
import { faSchool } from "@fortawesome/free-solid-svg-icons";

const About = forwardRef<HTMLElement | null>((_, ref) => {

    const [animateLine, setAnimateLine] = useState<boolean>(false);
    const [animateTopic, setAnimateTopic] = useState<boolean>(false);
    const [animateMainTopic, setAnimateMainTopic] = useState<boolean>(false);
    const [animateParagraph, setAnimateParagraph] = useState<boolean>(false);
    const [animateButton, setAnimateButton] = useState<boolean>(false);
    const [animateMeIcon, setAnimateMeIcon] = useState<boolean>(false);
    const [animatePcIcon, setAnimatePcIcon] = useState<boolean>(false);
    const [animateBikeIcon, setAnimateBikeIcon] = useState<boolean>(false);
    const [animateSchoolIcon, setAnimateSchoolIcon] = useState<boolean>(false);

    const whoRef = useRef<HTMLHeadingElement>(null);
    const doRef = useRef<HTMLHeadingElement>(null);
    const aboutRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 648) {
                setAnimateLine(true);
                setAnimateMainTopic(true);
                setAnimateTopic(true);
                setAnimateMeIcon(true);
    
                setTimeout(() => {
                    setAnimateParagraph(true);
                    setAnimateButton(true);
                }, 1000)
    
                setTimeout(() => {
                    setAnimatePcIcon(true);
                }, 500)
                    
                setTimeout(() => {
                    setAnimateBikeIcon(true);
                }, 1500)
    
                setTimeout(() => {
                    setAnimateSchoolIcon(true);
                }, 2000)
            }
        };

    window.addEventListener("scroll", handleScroll);

    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
    }, [])

    const handleUserHover = () => {
        if (whoRef.current) {
            whoRef.current.style.transform = "scale(1.3)";
        }
    };

    const handleCodeHover = () => {
        if (doRef.current) {
            doRef.current.style.transform = "scale(1.3)";
        }
    };

    const handleBikeHover = () => {
        if (aboutRef.current) {
            aboutRef.current.style.transform = "scale(1.3)";
        }
    };

    const handleLeave = () => {
        if (whoRef.current) {
            whoRef.current.style.transform = "scale(1)";
        }
        if (doRef.current) {
            doRef.current.style.transform = "scale(1)";
        }
        if (aboutRef.current) {
            aboutRef.current.style.transform = "scale(1)";
        }
    };
    
    return(
    <section ref={ref} className={styles.about}>
    <hr className={`${styles.line} ${animateLine ? styles.animateLine : ""}`} />
    <h1 className={`${styles.topic} ${animateMainTopic ? styles.animateMainTopic : ""}`}>About</h1>
        <div className="container p-5">
            <div className="row">
                <div className={`col-12 col-md-6 d-flex  pr-5 ${styles.hideOnPhones}`}>
                    <div className="row">
                        <div className={`col-6 d-flex justify-content-center align-items-center ${styles.blockOnTablet}`}>
                            <FontAwesomeIcon 
                                icon={faIdBadge} 
                                className={`${styles.icon} ${styles.iconLeft} ${animateMeIcon ? styles.animateIcons : ""}`} 
                                onMouseEnter={handleUserHover} 
                                onMouseLeave={handleLeave}
                            />
                        </div>
                        <div className={`col-6 d-flex justify-content-center align-items-center ${styles.blockOnTablet}`}>
                            <FontAwesomeIcon
                                icon={faDesktop}
                                className={`${styles.icon} ${styles.iconRight} ${animatePcIcon ? styles.animateIcons : ""}`}
                                onMouseEnter={handleCodeHover}
                                onMouseLeave={handleLeave}
                            />
                        </div>
                        <div className={`col-6 d-flex justify-content-center ${styles.blockOnTablet}`}>
                            <FontAwesomeIcon 
                                icon={faPersonBiking} 
                                className={`${styles.icon} ${styles.iconLeft} ${animateBikeIcon ? styles.animateIcons : ""}`} 
                                onMouseEnter={handleBikeHover}
                                onMouseLeave={handleLeave}
                            />
                        </div>
                        <div className={`col-6 d-flex justify-content-center ${styles.blockOnTablet}`}>
                            <FontAwesomeIcon 
                                icon={faSchool} 
                                className={`${styles.icon} ${styles.iconRight} ${animateSchoolIcon ? styles.animateIcons : ""}`} 
                                onMouseEnter={handleCodeHover}
                                onMouseLeave={handleLeave}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 pl-5">
                    <div ref={whoRef} className={styles.contentDivs}>
                        <h3 className={`${styles.about_sec_topic} ${animateTopic ? styles.animateTopic : ""}`}>Who am I?</h3>
                        <p className={`${styles.me} ${animateParagraph ? styles.animateContent : ""}`}>
                            I am David Malešević from Croatia, a country in Southeast Europe.
                            I am a 20-year-old front-end and full-stack developer specializing in modern web applications and websites.
                        </p><br />
                    </div>

                    <div ref={doRef} className={styles.contentDivs}>
                        <h3 className={`${styles.about_sec_topic} ${animateTopic ? styles.animateTopic : ""}`}>What do I do?</h3>
                        <p className={`${styles.me} ${animateParagraph ? styles.animateContent : ""}`}>
                            I started developing websites at 15 and have been passionate about building web applications ever since.
                            My focus is on designing modern, functional, and visually appealing web solutions.
                        </p><br />
                    </div>

                    <div ref={aboutRef} className={styles.contentDivs}>
                        <h3 className={`${styles.about_sec_topic} ${animateTopic ? styles.animateTopic : ""}`}>More About Me.</h3>
                        <p className={`${styles.me} ${animateParagraph ? styles.animateContent : ""}`}>
                            When I'm not coding, I'm a competitive cyclist. I always push myself to achieve more—whether in sports or development.
                        </p><br />
                    </div>

                    <div className={`${styles.baloon} ${animateButton ? styles.animatedBtn : ""}`}>
                        <a target="_blank" href="https://drive.google.com/file/d/1b19BNAzC8lRF9x_0lQd85EYnp8tPOhMH/view?usp=sharing">
                            <button className={`${styles.btn}`}>CV resume</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
</section>

    );
});

export default About