import React, { useEffect, useState } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonText
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { CourseData } from './ResumenDeClasesStructures';

type HistoryEntry = {
  id: string;
  date: string; // ISO string
  courseData: CourseData;
};

const STORAGE_KEY = 'resumenHistorial';

const Historial: React.FC = () => {
  const [items, setItems] = useState<HistoryEntry[]>([]);
  const history = useHistory();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as HistoryEntry[];
        setItems(parsed);
      }
    } catch (e) {
      // Si hay error en parseo, limpiamos para evitar loops
      localStorage.removeItem(STORAGE_KEY);
      setItems([]);
    }
  }, []);

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setItems([]);
  };

  const openResumen = (entry: HistoryEntry) => {
    history.push('/resumen', entry.courseData);
  };

  if (!items.length) {
    return (
      <IonCard className="ion-margin-top">
        <IonCardHeader>
          <IonCardTitle>Historial</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonText color="medium">Aún no hay resúmenes generados.</IonText>
        </IonCardContent>
      </IonCard>
    );
  }

  return (
    <IonCard className="ion-margin-top">
      <IonCardHeader>
        <IonCardTitle>Historial</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          {items
            .slice()
            .reverse()
            .map((entry) => (
              <IonItem key={entry.id} button onClick={() => openResumen(entry)}>
                <IonLabel>
                  <h2>{entry.courseData.topic || 'Sin título'}</h2>
                  <p>{new Date(entry.date).toLocaleString()}</p>
                </IonLabel>
              </IonItem>
            ))}
        </IonList>
        <IonButton className="ion-margin-top" color="medium" expand="block" onClick={handleClear}>
          Limpiar historial
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default Historial;
