import React from "react";
import styles from "./InitialPage.module.css";

const InitialPage = () => {

    return (
        <div style={{marginTop: "3em"}}>
            <p className={styles.informationText}>
                Primera vez?, haz click en <b>Nuevo horario</b>, seleccioná el archivo de Planificación de 
                Exámenes proveídos por la FPUNA y armá tu horario!                
            </p>
            <p className={styles.informationText}>
                Ya creaste tu horario?, haz click en <b>Importar horario</b>, selecciona el archivo exportado 
                anteriormente y consulta tu horario!
            </p>
        </div>
    );
    
}

export default InitialPage;