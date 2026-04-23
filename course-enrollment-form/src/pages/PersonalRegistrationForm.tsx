import {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export default function PersonalRegistrationForm(){
    const location = useLocation();
    console.log(location)
    const {course} = location.state;
    return (
        <div className="page">
            <div className="enrollment-header">
                <h2>course.title</h2>
            </div>
        </div>
    )
}