import { forwardRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import styles from "./projects.module.css"

const Projects = forwardRef<HTMLElement>((_, ref) => {

    const [playerSize, setPlayerSize] = useState({ width: "600px", height: "338px" });
    const [animate, setAnimate] = useState<boolean>(false);

    useEffect(() => {
        const updateSize = () => {
            if (window.innerWidth <= 1024) {
                setPlayerSize({ width: "500px", height: "281px" });
            }
        };

        window.addEventListener("resize", updateSize);
        updateSize();

        return () => window.removeEventListener("resize", updateSize);
    }, []);

    useEffect(() => {
        const handleAnimations = () => {
            if (window.scrollY >= 2033) {
                setAnimate(true);
            }
        };

        window.addEventListener("scroll", handleAnimations);

        return () => window.removeEventListener("scroll", handleAnimations);
    }, [])

    return(
        <>
        <section ref={ref} className={styles.projects}>
        <hr className={`${styles.line} ${animate ? styles.animateLine : ""}`}/>
            <h1 className={`${styles.topic} ${animate ? styles.animateTopic : ""}`}>Projects</h1>
            <article className={`${styles.project} ${animate ? styles.animate : ""}`}>
                <div className={styles.info}>
                    <h2 className={styles.projectName}>Real Estate Agency</h2>
                    <div className={styles.techStack}>
                        <span>React</span>
                        <span>Node.js</span>
                        <span>Express.js</span>
                        <span>MongoDB</span>
                        <span>Rest API</span>
                        <span>TypeScript</span>
                    </div>
                    <div className={styles.functions}>
                        <p><span>Functions: </span> JWT authorization, Filtering, Showing Details, Adding Properties, Editing Profile, Roles.</p>
                    </div>
                    <div className={styles.about}>
                        <p>
                            This project is all about find perfect property that suits You and that You can buy.
                            You can contact Agent, see details about property and also if You are agent, you can 
                            add new property.
                        </p>
                    </div>
                    <div className={styles.buttons}>
                    <div className={styles.baloon}>
                        <a href="https://real-estate-agency-frontend.onrender.com/" target="_blank"><button className={styles.button}>Live project</button></a>
                    </div>
                    <div className={styles.baloon}>
                        <a href="https://github.com/David139-debug/Real-Estate-Agency-Project" target="_blank"><button className={styles.button}>Source code</button></a>
                    </div>
                </div>
                </div>
                <div className={styles.demo}>
                    <ReactPlayer className={styles.video} width={playerSize.width} height={playerSize.height} url="https://youtu.be/g-zqNy3FWYs" controls />
                </div>
            </article>

            <article className={`${styles.project} ${animate ? styles.animate : ""}`}>
                <div className={styles.info}>
                    <h2 className={styles.projectName}>Advanced To-Do-App</h2>
                    <div className={styles.techStack}>
                        <span>React</span>
                        <span>Node.js</span>
                        <span>Express.js</span>
                        <span>MongoDB</span>
                        <span>Rest API</span>
                    </div>
                    <div className={styles.functions}>
                        <p><span>Functions: </span> JWT authorization, CRUD operations, Filtering, Marking prioritys.</p>
                    </div>
                    <div className={styles.about}>
                        <p>This is my first bigger project ever made.
                       It is application that is used to make tasks that can be filtered and marked as priority.
                       Every user must make his account so that everything is visible only to him.</p>
                    </div>
                    <div className={styles.buttons}>
                    <div className={styles.baloon}>
                        <a href="https://todo-app-project-ds0f.onrender.com" target="_blank"><button className={styles.button}>Live project</button></a>
                    </div>
                    <div className={styles.baloon}>
                        <a href="https://github.com/David139-debug/Todo-App-Project" target="_blank"><button className={styles.button}>Source code</button></a>
                    </div>
                </div>
                </div>
                <div className={styles.demo}>
                    <ReactPlayer className={styles.video} width={playerSize.width} height={playerSize.height} url="https://www.youtube.com/watch?v=hcIaF-nNgQw" controls />
                </div>
            </article>
        </section></>
    );
});

export default Projects