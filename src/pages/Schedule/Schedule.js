import React, {useState, useEffect} from "react";
import styles from "./Schedule.module.css";
import Lesson from "../../components/Lesson";
import {Tab , Tabs} from "react-bootstrap";

const Schedule = ({schedule}) => {

    const DAYS_OF_WEEK = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const [key, setKey] = useState("lessons");
    const [keyDay, setKeyDay] = useState("Lunes");
    const [keyExam, setKeyExam] = useState("partials");    

    const retrieveLessonsByDay = (day) => {
        var lessons = [];
        for(var i = 0; i < schedule.length; i++){
            var course = schedule[i];
            var courseToDay = undefined;
            var lessonsFromCourse = [];
            for(var j = 0; j < course.seccion.horario.clases.length; j++){
                var clase = course.seccion.horario.clases[j];
                if(clase.dia == day){
                    courseToDay = course;
                    lessonsFromCourse.push(clase);
                }
            }
            if(courseToDay != undefined){
                for(var k = 0; k < lessonsFromCourse.length; k++){
                    lessons.push({
                        lesson: lessonsFromCourse[k],
                        course: courseToDay
                    });
                }
            }
        }
        return lessons;
    }

    const resolvePartials = () => {
        var partials = <></>;
        return partials;
    }

    const resolveFinals = () => {
        var partials = <></>;
        return partials;
    }    

    return (
        <>
            {
                schedule == undefined 
                ? <></> 
                : (
                    <Tabs className={styles.tabs}  style={{fontSize: "20px"}} variant="pills" defaultActiveKey="profile" activeKey={key} onSelect={(k) => setKey(k)}>
                        <Tab eventKey="lessons" title="Clases" className={styles.btnTab}>
                            <Tabs className={styles.tabs} variant="pills" defaultActiveKey="profile" activeKey={keyDay} onSelect={(k) => setKeyDay(k)} style={{marginTop: ".7em"}} >
                                {
                                    DAYS_OF_WEEK.map((i) => (
                                        <Tab eventKey={i} title={i} className={styles.btnTab} >  
                                            <div style={{marginTop: "2em"}}>
                                                {
                                                    retrieveLessonsByDay(i).map((j) => (
                                                        <Lesson lesson={j.lesson} course={j.course}/>
                                                    ))
                                                }
                                            </div>
                                        </Tab>
                                    ))   
                                }
                            </Tabs>
                        </Tab>
                        <Tab eventKey="exams" title="Exámenes" className={styles.btnTab}>
                            <Tabs className={styles.tabs} variant="pills" defaultActiveKey="profile"  activeKey={keyExam} onSelect={(k) => setKeyExam(k)} style={{marginTop: ".7em"}}>
                                <Tab eventKey="partials" title="Parciales" className={styles.btnTab}>
                                    {resolvePartials()}
                                </Tab>
                                <Tab eventKey="finals" title="Finales" className={styles.btnTab}>
                                    {resolveFinals()}
                                </Tab>
                            </Tabs>
                        </Tab>
                    </Tabs>
                )
            }
        </>
    );
    
}

export default Schedule;