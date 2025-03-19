import { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client";
import styles from "./chat.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET;

interface Message {
    content: string;
    sender: string | undefined;
    receiver: string;
    time: string;
};

const Chat = () => {    
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
    const [userId, setUserId] = useState<string>("");
    const socketRef = useRef<any>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const openBtnRef = useRef<HTMLButtonElement>(null);
    const [selectedUser, setSelectedUser] = useState<string>("");
    const [users, setUsers] = useState<string[]>([]);
    const [openChat, setOpenChat] = useState<boolean>(false);
    const [showChatIcon, setShowChatIcon] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setShowChatIcon(true);
        }, 3000)

        let storedUserId = localStorage.getItem("user");
    
        if (!storedUserId) {
            storedUserId = Math.random().toString(36).substr(2, 9);
            localStorage.setItem("user", storedUserId);
        }
    
        setUserId(storedUserId);

        socketRef.current = io("http://localhost:5000", { query: { userId: storedUserId } });

        const playNotificationSound = () => {
            const audio = new Audio("/notificationSound.mp3");
            audio.play().catch(err => console.error("Greška pri puštanju zvuka:", err));
        };

        socketRef.current.on("receiveMessage", (msg: Message) => {
            setMessages(prev => [...prev, msg]);
            playNotificationSound();
            setOpenChat(true);
            setShowChatIcon(false);
        });

        socketRef.current.on("updateUsers", (userList: string[]) => {
            setUsers(userList.filter((u) => u !== storedUserId));
        });
    
        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    useEffect(() => {
        if (userId) {
            const handleMsg = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/get/${userId}`);
                    const data: Message[] = response.data;
                    setMessages(data);
                } catch (err) {
                    console.error(err);
                }
            };
            handleMsg();
        }
    }, [userId]);

    useEffect(() => {
        if (selectedUser) {
            setFilteredMessages(messages.filter(msg => 
                (msg.sender === selectedUser && msg.receiver === userId) ||
                (msg.sender === userId && msg.receiver === selectedUser)
            ));
        }
    }, [messages, selectedUser]);

    useEffect(() => {
        setTimeout(() => {
            chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        }, 0);
    }, [messages]);

    const sendMessage = async () => {
        if (!message.trim()) return;
    
        const newMsg: Message = {
            content: message.charAt(0).toUpperCase() + message.slice(1),
            sender: userId,
            receiver: userId === ADMIN_SECRET ? selectedUser : ADMIN_SECRET,
            time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
        };
    
        try {
            await axios.post("http://localhost:5000/send", newMsg);
            socketRef.current.emit("sendMessage", newMsg);
            setMessages(prev => [...prev, newMsg]);
    
        } catch (error) {
            console.error("Error: ", error);
        }
        setMessage(""); 
    };

    const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        setSelectedUser(selected);
    };

    const handleClosingChat = () => {
        setOpenChat(false);
            setShowChatIcon(true);
            if (openBtnRef.current) {
                openBtnRef.current.style.visibility = "visible";
                openBtnRef.current.style.background = "white";
            }
    };

    const handleOpeningChat = () => {
        let welcomeMsg = localStorage.getItem(`welcomeSent_${userId}`);
        if (openBtnRef.current) {
            openBtnRef.current.style.background = "#0A2540";
        
        setTimeout(() => {
            setOpenChat(true);
            if (!welcomeMsg) {
                const welcomeMsg: Message = {
                    content: "Warm greetings and welcome to my website! I hope you find everything you're looking for. Feel free to reach out to me here anytime—I usually respond very quickly :).",
                    sender: ADMIN_SECRET,
                    receiver: userId,
                    time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
                };
                socketRef.current.emit("sendMessage", welcomeMsg);
                localStorage.setItem(`welcomeSent_${userId}`, "true")
            }
            setShowChatIcon(false);
            if (openBtnRef.current) {
                openBtnRef.current.style.visibility = "hidden";
            }
        }, 650)
        }
    };
    
    return (
        <>
        <div ref={containerRef} className={`${styles.container} ${openChat ? styles.openChatAnimation : ""}`}>
            <button onClick={handleClosingChat} className={styles.closeBtn}>X</button>
            <h2 className={styles.topic}>
                {userId === ADMIN_SECRET ?
                 <select onChange={handleUserChange} value={selectedUser}>
                    <option value="">Select user</option>
                    {users.map((user, index) => (
                        <option key={index} value={user}>User {index + 1}</option>
                    ))}
                 </select>
                 : "Chatbox"}
            </h2>
          <div className={styles.chat}>
                {(userId === ADMIN_SECRET ? filteredMessages : messages).map((msg, index) => (
                    <div key={index}
                       className={msg.sender === userId ? styles.myMessage : styles.otherMessage}>
                        <p className={styles.chatContent}>{msg.content}</p>
                        <span className={styles.msgTime}>{msg.time}</span>
                    </div>
                ))}
                <div ref={chatEndRef}></div>
          </div>
          <div className={styles.inputContainer}>
            <input type="text"
                   placeholder="Write a message" 
                   value={message}
                   disabled={userId === ADMIN_SECRET && !selectedUser} 
                   onChange={(e) => setMessage(e.target.value)}
                   onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage();
                }} />
            <button disabled={userId === ADMIN_SECRET && !selectedUser} onClick={sendMessage}><FontAwesomeIcon icon={faArrowCircleRight} /></button>
          </div>
        </div>
        <button ref={openBtnRef} onClick={handleOpeningChat} className={`${styles.openingChat} ${showChatIcon ? styles.showIcon : ""}`}>
            <FontAwesomeIcon icon={faComment} />
        </button>
        </>
      );
}

export default Chat