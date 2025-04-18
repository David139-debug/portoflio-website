import styles from "./skills.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faGear, faServer } from "@fortawesome/free-solid-svg-icons";
import { Html5Original, Css3Original, JavascriptOriginal, TypescriptOriginal, ReactOriginal, ReduxOriginal } from 'devicons-react';
import { VisualstudioPlain, GithubOriginal, PostmanOriginal, NpmOriginalWordmark } from 'devicons-react';
import { SiRender } from "react-icons/si";
import { NodejsOriginal, ExpressOriginal, MongodbOriginal, MongooseOriginal } from 'devicons-react';
import { forwardRef, useEffect, useState } from "react";

const Skills = forwardRef<HTMLElement>((_, ref) => {

    const [rotateX, setRotateX] = useState<number>(0);
    const [rotateY, setRotateY] = useState<number>(0);

    const [animateCards, setAnimateCards] = useState<boolean>(false);
    const [animateLine, setAnimateLine] = useState<boolean>(false);
    const [animateTopic, setAnimateTopic] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 1332) {
                setAnimateCards(true);
                setAnimateLine(true);
                setAnimateTopic(true);
            }
        };

    window.addEventListener("scroll", handleScroll);

    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - card.left) / card.width - 0.5;
        const y = (e.clientY - card.top) / card.height - 0.5;

        setRotateX(x * 40);
        setRotateY(y * 40);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return(
        <>
        <section ref={ref} className={styles.skills}>
        <hr className={`${styles.line} ${animateLine ? styles.animateLine : ""}`}/>
            <h1 className={`${styles.topic} ${animateTopic ? styles.animateTopic : ""}`}>Skills</h1>
            <div className="row p-5 m-auto">
                <div className="col-md-4 p-5">
                    <div className={`card ${styles.card} ${animateCards ? styles.animationCards : ""}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
                     style={{
                        transform: `rotatex(${rotateX}deg) rotateY(${rotateY}deg)`,
                        transition: `transform 0.2s ease-out`,
                     }}>
                        <div className={`card-body ${styles.card_body}`}>
                            <div className={styles.topicAndIcon}>
                                <div className="card-title text-white font-weight-bold h3">Front-End</div>
                                <FontAwesomeIcon icon={faCode} className={styles.icon1} bounce/>
                            </div>
                                <div className={styles.languageIcons}>
                                    <div>
                                        <Html5Original size={35} />
                                        <p>HTML</p>
                                    </div>
                                    <div>
                                        <Css3Original   size={35} />
                                        <p>CSS</p>
                                    </div>
                                    <div>
                                        <JavascriptOriginal size={35} />
                                        <p>JavaScript</p>
                                    </div>
                                    <div>
                                        <TypescriptOriginal  size={35} />
                                        <p>TypeScript</p>
                                    </div>
                                    <div>
                                        <ReactOriginal size={35} />
                                        <p>React</p>
                                    </div>
                                    <div>
                                        <ReduxOriginal size={35} />
                                        <p>Redux</p>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 p-5">
                    <div className={`card ${styles.card} ${animateCards ? styles.animationCards : ""}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
                    style={{
                        transform: `rotatex(${rotateX}deg) rotateY(${rotateY}deg)`,
                        transition: `transform 0.2s ease-out`,
                     }}>
                        <div className={`card-body ${styles.card_body}`}>
                            <div className={styles.topicAndIcon}>
                                <div className="card-title text-white font-weight-bold h3">Tools</div>
                                <FontAwesomeIcon icon={faGear} className={styles.icon2} spin />
                            </div>
                                <div className={styles.languageIcons}>
                                    <div>
                                        <VisualstudioPlain size={35} />
                                        <p>Visual Studio Code</p>
                                    </div>

                                    <div>
                                        <GithubOriginal size={35} />
                                        <p>Git</p>
                                    </div>

                                    <div>
                                        <NpmOriginalWordmark size={35} />
                                        <p>NPM</p>
                                    </div>

                                    <div>
                                        <SiRender style={{ color: "white" }} size={35} />
                                        <p>Render</p>
                                    </div>

                                    <div>
                                        <PostmanOriginal size={35} />
                                        <p>Postman</p>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 p-5">
                    <div className={`card ${styles.card} ${animateCards ? styles.animationCards : ""}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
                     style={{
                        transform: `rotatex(${rotateX}deg) rotateY(${rotateY}deg)`,
                        transition: `transform 0.2s ease-out`,
                     }}>
                        <div className={`card-body ${styles.card_body}`}>
                            <div className={styles.topicAndIcon}>
                                <div className="card-title text-white font-weight-bold h3">Back-End</div>
                                <FontAwesomeIcon icon={faServer} className={styles.icon3} beat />
                            </div>
                            <div className={styles.languageIcons}>
                                <div>
                                    <NodejsOriginal size={35} />
                                    <p>NodeJS</p>
                                </div>
                                
                                <div>
                                    <ExpressOriginal size={35} />
                                    <p>ExpressJS</p>
                                </div>

                                <div>
                                    <MongodbOriginal size={35} />
                                    <p>MongoDB</p>
                                </div>

                                <div>
                                    <MongooseOriginal size={35} />
                                    <p>Mongoose</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section></>
    );
});

export default Skills