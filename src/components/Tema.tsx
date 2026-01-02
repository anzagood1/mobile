import React, { useState } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonButton, IonCheckbox, IonGrid, IonRow, IonCol, IonAlert
} from '@ionic/react';
import { fetchClassSummary } from './ia.servicios';
import { CourseData } from './ResumenDeClasesStructures';
import { useHistory } from 'react-router-dom';

const Tema: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [transcription, setTranscription] = useState('');
  const [resumenCompleto, setResumenCompleto] = useState(true);
  const [resumen, setResumen] = useState(false);
  const [lecturas, setLecturas] = useState(false);
  const [cuestionario, setCuestionario] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory();

  const generarResumen = () => {
    if (!topic || topic.trim() === '') {
      setShowAlert(true);
      return;
    }
    const courseData = { topic, transcription };

    history.push('/resumen', courseData);
  };

  return (
    <>
      <IonCard className="ion-bording">
        <IonCardHeader>
          <IonCardTitle>¿Qué tema revisaste hoy?</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <IonInput
            label="Tema: "
            placeholder="Escribe aquí el tema principal"
            value={topic}
            onIonChange={(e) => setTopic(e.detail.value ?? '')}
          />
          <IonInput
            label="Subtemas (opcional): "
            placeholder="Escribe aquí temas específicos del tema principal"
            value={transcription}
            onIonChange={(e) => setTranscription(e.detail.value ?? '')}
          />
        </IonCardContent>
      </IonCard>

      <IonButton 
      className="ion-padding" 
      onClick={generarResumen} 
      disabled={(!resumenCompleto && !resumen && !lecturas && !cuestionario)}
      >
        Generar resumen
      </IonButton>
      
      <IonGrid className="ion-padding">
        <IonRow>
          <IonCol>
            <IonCheckbox 
            disabled={resumen || lecturas || cuestionario} 
            checked={resumenCompleto} onIonChange={(e) => setResumenCompleto(e.detail.checked)}>
                Resumen, Lecturas Sugeridas, Cuestionario (Por Defecto)
            </IonCheckbox>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="4">
            <IonCheckbox 
            disabled={resumenCompleto} 
            checked={resumen} onIonChange={e => setResumen(e.detail.checked)}>
              Resumen
            </IonCheckbox>
          </IonCol>
          <IonCol size="4">
            <IonCheckbox 
            disabled={resumenCompleto} 
            checked={lecturas} onIonChange={e => setLecturas(e.detail.checked)}>
              Lecturas Sugeridas
            </IonCheckbox>
          </IonCol>
          <IonCol size="4">
            <IonCheckbox 
            disabled={resumenCompleto}
            checked={cuestionario} onIonChange={e => setCuestionario(e.detail.checked)}>
              Cuestionario
            </IonCheckbox>
          </IonCol>
        </IonRow>
      </IonGrid>

      <IonAlert
        isOpen={showAlert}
        header="Tema requerido"
        message="Debes escribir un tema antes de generar el resumen"
        buttons={['OK']}
        onDidDismiss={() => setShowAlert(false)}
      />
    </>

  );
};

export default Tema;
