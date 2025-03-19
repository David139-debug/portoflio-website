import { forwardRef, useEffect, useState } from "react";
import styles from "./contact.module.css"
import axios from "axios";

const Contact = forwardRef<HTMLElement>((_, ref) => {

    const [animate, setAnimate] = useState<boolean>(false);
    const [animateText, setAnimateText] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        text: ""
    });

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 2757) {
                setAnimate(true);

                setTimeout(() => {
                    setAnimateText(true);
                }, 1000)
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { name, email, text } = formData;

        axios.post("http://localhost:5000/sendMail", { name, email, text } );
        alert("Email sent successfully! I will get back to you soon.");
        setFormData({
            name: "",
            email: "",
            text: "",
        })
    };

    return(
        <>
        <section ref={ref} className={styles.contact}>
        <hr className={`${styles.line} ${animate ? styles.animateLine : ""}`} />
            <h1 className={`${styles.topic} ${animate ? styles.animateTopic : ""}`}>Contact</h1>
            <p className={`${styles.para} ${animateText ? styles.animateTopic : ""}`}>Please, if you need anything, feel free to contact me here or via chat. Communication is key to everything!</p>
            <div className="col-12">
                <form onSubmit={handleSubmit} className={`${styles.form} ${animate ? styles.animateForm : ""}`}>
                    <input onChange={handleChange} name="name" value={formData.name} type="text" placeholder="Name" required />
                    <input onChange={handleChange} name="email" value={formData.email} type="email" placeholder="Email" required />
                    <textarea onChange={handleChange} name="text" value={formData.text} placeholder="Message" required></textarea>
                    <div className={styles.baloon}><button className={`${styles.button} ${animate ? styles.animateBtn : ""}`} type="submit">Send</button></div>
                </form>
            </div>
        </section>
        </>
    );
});

export default Contact