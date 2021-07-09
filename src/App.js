import React, {useState, useEffect, useRef} from 'react';
import {Button} from "react-bootstrap";
import styles from "./App.module.css";
import InitialPage from "./pages/InitialPage";
import axios from "axios";
import ScheduleMaker from "./pages/ScheduleMaker";
import Schedule from "./pages/Schedule";
import { Icon, InlineIcon } from '@iconify/react';
import documentImport from '@iconify/icons-carbon/document-import';
import documentExport from '@iconify/icons-carbon/document-export';
import contentNew from '@iconify/icons-eos-icons/content-new';
import changeCatalog from '@iconify/icons-carbon/change-catalog';

const App = () => {

  const hiddenFileInput = useRef(undefined);
  const [file, setFile] = useState(undefined);
  const [importLoading, setImportLoading] = useState(false);

  const [schedule, setSchedule] = useState(undefined);
  const [database, setDatabase] = useState(undefined);

  useEffect(() => {
    setSchedule(localStorage.getItem("POLI_TOOL_SCHEDULE") != undefined ? JSON.parse(localStorage.getItem("POLI_TOOL_SCHEDULE")) : undefined);
    setDatabase(localStorage.getItem("POLI_TOOL_DATABASE") != undefined ? JSON.parse(localStorage.getItem("POLI_TOOL_DATABASE")) : undefined);
  }, []);

  const isInitialState = () => {
    return schedule == undefined && database == undefined;
  }

  const isMakerState = () => {
    return database != undefined && schedule == undefined;
  }

  const importFromExcel = event => {
    setImportLoading(true);
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    setFile(fileUploaded);
  }

  const prepareHeadersMultipart = () => {
    return {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Access-Control-Allow-Origin": "*",
            "type": "formData"
        }
    };
  }
  
  const confirmSchedule = (courses) => {
    setSchedule(courses);
    localStorage.setItem("POLI_TOOL_SCHEDULE", JSON.stringify(courses));
  }

  useEffect(() => {
    if(file !== undefined){

        //var data = new FormData();
        //var imagedata = document.querySelector('input[type="file"]').files[0];

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            const base64File = reader.result;
            console.log(base64File);

            var data = new FormData();

            console.log(file);

            data.append("file", file);

            axios.post("http://localhost:8080/schedulePlanning/parse", data, prepareHeadersMultipart())
            .then(res => {
                console.log(res);
                setImportLoading(false);
                //notify.show("Datos importados exitosamente", "success");
                setDatabase(res.data);
                setSchedule(undefined);
                localStorage.setItem("POLI_TOOL_DATABASE", JSON.stringify(res.data));
                localStorage.removeItem("POLI_TOOL_SCHEDULE");
            })
            .catch(error => {
                console.log(error);
                setImportLoading(false);
                console.log(error.response);
                //notify.show("Ha ocurrido un error al procesar el archivo excel: " + error.response.data, "error");
                //console.error(error.response.status);
            })                

        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
            //notify.show("Ha ocurrido un error al procesar el archivo excel", "error");
        };            
    }
  }, [file]);

  return (
    <div>

      <div className={styles.actions}>
        {
          schedule != undefined ? (
            <div className={styles.actionContainer}>
              <p>Exportar <br></br>horario</p>
              <Button className={styles.action}>
                <Icon icon={documentExport} width="30px"/>
              </Button>&nbsp;
            </div>
          ) : <></>
        }
        <div className={styles.actionContainer}>
          <p>Importar <br></br>horario</p>
          <Button className={styles.action}>
            <Icon icon={documentImport} width="30px"/>
          </Button>&nbsp;
        </div>
        {
          database != undefined ? (
            <div className={styles.actionContainer}>
              <p>Actualizar <br></br>base de datos</p>
              <Button onClick={importFromExcel} className={styles.action}>
                <Icon icon={changeCatalog} width="30px"/>
              </Button>&nbsp;
              <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{display: 'none'}} />
            </div>
          ) : 

          <div className={styles.actionContainer}>
            <p>Nuevo <br></br>horario</p>
            <Button onClick={importFromExcel} className={styles.action}>
              <Icon icon={contentNew} width="30px"/>
            </Button>&nbsp;
            <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{display: 'none'}} />
          </div>

        }
      </div>
      <div className={styles.content}>
        {
          isInitialState() ? <InitialPage /> : <></>
        }
        {
          isMakerState() 
          ? <ScheduleMaker confirm={confirmSchedule} carrers={database != undefined ? database.carreras : []} fileName=""/> 
          : <Schedule schedule={schedule} />
        }
      </div>

    </div>
  );

}

export default App;
