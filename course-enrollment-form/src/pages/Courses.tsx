import React, {useEffect, useState, useMemo} from "react";
import "../css/common.css";
import "../css/courses.css";

export default function Courses() {
    const [categories, setCategories] = useState(["전체", "디자인", "개발", "비즈니스", "마케팅"]);
    const [ctgImgs, setCtgImgs] = useState(["🌐", "🎨", "⚙️", "📊", "🎯"]);
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [courses, setCourses] = useState([]);
    const [courseMetrics, setCourseMetrics] = useState(new Map());

    useEffect(() => {
        const fetchCourses = async () => {
            const res = await fetch("http://localhost:5174/courses");
            const data = await res.json();

            setCourses(data);
        }
        fetchCourses();
    }, []);

    const filteredCourses = useMemo(() => {
        const map = new Map();

        for(let course of courses){
            if(map.has(course.category)){
                map.set(course.category, new )
            }
        }
        return selectedCategory === "전체"
            ? courses : 0
    }, [courses, selectedCategory])

    const clickCategory = (category) => {
        setSelectedCategory(category);
    }

    return (
        <div className="page">
            <div className="categories">
                {categories.map((category, idx) => (
                    <div 
                        className={`category ${selectedCategory === category ? "active" : ""}`}
                        key={idx}
                        onClick={() => clickCategory(category)}
                        >
                        <div className="category-img">{ctgImgs[idx]}</div>
                        <div className="category-txt">{category}</div>
                    </div>
                ))}
            </div>
            <div className="lectures">
                {}
            </div>
        </div>
    )
}