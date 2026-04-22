import React, {useEffect, useState} from "react";
import "../css/common.css";
import "../css/courses.css";

export default function Courses() {
    const [categories, setCategories] = useState(["전체", "디자인", "개발", "비즈니스", "마케팅"]);
    const [ctgImgs, setCtgImgs] = useState(["🌐", "🎨", "⚙️", "📊", "🎯"]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const res = await fetch("http://localhost:5174/courses");
            const data = await res.json();
            setCourses(data);
        }
        fetchCourses();
    }, []);

    return (
        <div className="page">
            <div className="categories">
                {categories.map((category, idx) => (
                    <div className="category" key={idx}>
                        <div className="category-img">{ctgImgs[idx]}</div>
                        <div className="category-txt">{category}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}