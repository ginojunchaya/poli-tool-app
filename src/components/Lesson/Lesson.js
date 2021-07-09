import React, {} from "react";
import styles from "./Lesson.module.css";

const Lesson = ({course, lesson}) => {

    const resolveSemester = (semester) => {
        if(semester == undefined){
            return "";
        }
        return semester + " semestre, ";
    }

    const resolveTeachers = (teachers) => {
        if(teachers == undefined || teachers.length == 0){
            return "";
        }
        var teachersAux = [];
        for(var i = 0; i < teachers.length; i++){
            teachersAux.push(teachers[i].titulo + " " + teachers[i].nombre + " " + teachers[i].apellido);
        }
        return teachersAux.join();
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <h1>{course.nombre}</h1>
                <h3>
                    {resolveSemester(course.semestre) + resolveTeachers(course.seccion.profesores)}
                </h3>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.box}>
                    <span >
                        {course.seccion.codigo}
                    </span>
                </div>&nbsp;
                <div className={styles.box}>    
                    <p style={{fontSize: "10px", fontWeight: "normal"}}>
                        {lesson.hora_inicio}
                        <br></br>
                        {lesson.hora_fin}
                    </p>
                </div>&nbsp;
                <div className={styles.box}>    
                    <span>F17</span>
                </div>                    
            </div>
        </div>
    );
    
}

export default Lesson;