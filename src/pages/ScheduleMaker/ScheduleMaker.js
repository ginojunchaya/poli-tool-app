import React, {useState, useEffect} from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./ScheduleMaker.module.css";
import Course from "../../components/Course";
import { Icon, InlineIcon } from '@iconify/react';
import checkmarkIcon from '@iconify/icons-carbon/checkmark';
import plusIcon from '@iconify/icons-entypo/plus';

const ScheduleMaker = ({confirm, carrers, fileName}) => {

    const [course, setCourse] = useState(undefined);
    const [carrer, setCarrer] = useState("X");
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if(carrer != "X"){
            setCourses(findCarrer(carrer).asignaturas);
        }
    }, [carrer]);

    const add = (e) => {
        var selectedCoursesAux = [];
        for(var i = 0; i < selectedCourses.length; i++){
            selectedCoursesAux.push(selectedCourses[i]);
        }
        selectedCoursesAux.push(course);
        setSelectedCourses(selectedCoursesAux);
    }

    const findCarrer = (carrer) => {
        for(var i = 0; i < carrers.length; i++){
            if(carrers[i].codigo == carrer){
                return carrers[i];
            }
        }
        return undefined;
    }

    const remove = (toDelete) => {
        var aux = [];
        for(var i = 0; i < selectedCourses.length; i++){
            if(selectedCourses[i] != toDelete){
                aux.push(selectedCourses[i]);
            }
        }
        setSelectedCourses(aux);
    }

    return (
        <>
            <div>
                <Form.Group>
                    <Form.Control as="select" value={carrer} onChange={(e) => {setCarrer(e.target.value);}}>
                        <option value={"X"} selected disabled>Seleccione su carrera</option>
                        {
                            carrers.map((i) => (
                                <option value={i.codigo}>{i.nombre} - {i.codigo}</option>
                            ))
                        }
                    </Form.Control>               
                </Form.Group>        
                <Form.Group>
                    <div style={{display:"flex"}}>
                        <Form.Control as="select" value={JSON.stringify(course)} onChange={(e) => {setCourse(JSON.parse(e.target.value));}}>
                            <option value={undefined} selected disabled>Seleccione una materia</option>
                            {
                                courses.map((i) => (
                                    <option value={JSON.stringify(i)}>{i.nombre} ({i.seccion.codigo})</option>
                                ))
                            }                        
                        </Form.Control>&nbsp;&nbsp;
                        <Button onClick={add} className={styles.actionAdd}>
                            <Icon icon={plusIcon} />
                        </Button>
                    </div>

                </Form.Group>
            </div>
            <div>
                {
                    selectedCourses.map((i) => (
                        <Course course={i} remove={remove}/>
                    ))
                }
            </div>
            <div style={{marginTop: "1em", textAlign: "right"}}>
                {
                    selectedCourses.length == 0 ? (
                        <p>No hay materias seleccionadas</p>
                    ) 
                    : (
                        <Button onClick={(e) => {confirm(selectedCourses)}} className={styles.action}>
                            <Icon icon={checkmarkIcon} width="30px"/>
                        </Button>
                    )
                }                
            </div>
        </>
    );
    
}

export default ScheduleMaker;