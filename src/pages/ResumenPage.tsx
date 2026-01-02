import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/react';
import { useLocation } from 'react-router';
import ResumenDeClases from '../components/ResumenDeClases';
import { CourseData } from '../components/ResumenDeClasesStructures';

const ResumenPage: React.FC = () => {
  const location = useLocation();
  const courseData = location.state as CourseData;

  if (!courseData) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          No hay datos para mostrar
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Resumen de la Clase</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <ResumenDeClases courseData={courseData} />
      </IonContent>
    </IonPage>
  );
};

export default ResumenPage;
