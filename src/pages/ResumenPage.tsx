import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton
} from '@ionic/react';
import { useLocation } from 'react-router';
import ResumenDeClases from '../components/ResumenDeClases';
import { CourseData } from '../components/ResumenDeClasesStructures';
import "./ResumenPage.css";

const ResumenPage: React.FC = () => {
  const location = useLocation();
  const courseData = location.state as CourseData;

  if (!courseData) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          No hay datos para mostrar
          <IonButton className="ion-margin-top" expand="block" routerLink="/" color="medium">
            Ir a Home
          </IonButton>
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
        <IonButton className="ion-padding" expand="block" routerLink="/" color="medium">
          Ir a Home
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ResumenPage;
