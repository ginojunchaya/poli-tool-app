import React, {} from "react";
import {Button} from "react-bootstrap";
import styles from "./Course.module.css";

const Course = ({course, remove}) => {

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
                <Button className={styles.delete} onClick={(e) => {remove(course);}}></Button>
                <div className={styles.box}>
                    <span>{course.seccion.codigo}</span>
                </div>
            </div>
        </div>
    );
    
}

export default Course;