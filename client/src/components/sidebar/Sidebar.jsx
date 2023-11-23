import axios from "axios";
import { useEffect, useState } from "react";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="http://localhost:3000/pfp.jpeg"
          alt=""
        />
        <p style={{marginLeft: 30}}>
          My name is Wassim Al Haraki. I am a senior Computer Science student set to graduate in 2024.
        </p>
      </div>
    </div>
  );
}