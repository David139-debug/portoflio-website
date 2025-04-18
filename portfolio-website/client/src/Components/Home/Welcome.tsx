import styles from "./welcome.module.css"
import About from "../About/About";
import Chat from "../Chat/Chat";
import { useEffect, useState, useRef } from "react";

const Welcome = () => {

    const [showText, setShowText] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const aboutSectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setTimeout(() => {
            setShowText(true);
        }, 700);

        setTimeout(() => {
            setShowButton(true);
        }, 2000);
    }, []);

    const handleClick = () => {
        aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return(
        <section className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.container}>
                    <h1 className={`${styles.firstH1} ${showText ? styles.h1Loaded : ""}`}>Hi, I am <span className={styles.name}>David</span>.</h1>
                    <h1 className={`${styles.secondH1} ${showText ? styles.h1Loaded : ""}`}>Front-End & Full-Stack <span className={styles.name}>developer</span>.</h1>
                    <div className={`${styles.baloon} ${showButton ? styles.btnLoaded : ""}`}><button className={styles.btn} onClick={handleClick}>More about me</button></div>
                    <div className={`${styles.baloon} ${showButton ? styles.btnLoaded : ""}`}><button className={styles.btn} onClick={handleClick}>Contact me</button></div>
                    <Chat />
                </div>
            </div>
            <About ref={aboutSectionRef} />
        </section>
    );
};

export default Welcome