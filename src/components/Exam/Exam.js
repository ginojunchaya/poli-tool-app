import React, {} from "react";
import styles from "./Exam.module.css";

const Exam = ({course, exam}) => {

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
        <div>
            <div>
                <h1>{course.nombre}</h1>
                <h3>
                    {resolveSemester(course.semestre) + resolveTeachers(course.seccion.profesores)}
                </h3>
            </div>
            <div>
                <div>
                    <div className={styles.block}>    
                        <span>{exam.dia}, {exam.fecha}</span><br></br>
                        <span>{exam.hora}</span>
                    </div>
                    <div className={styles.block}>
                        <span>F17</span>
                    </div>                    
                </div>
            </div>
        </div>
    );
    
}

export default Exam;