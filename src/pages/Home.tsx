import React, { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonButtons, IonMenuButton, IonRefresher, IonRefresherContent 
} from '@ionic/react';
import ResumenDeClases from '../components/ResumenDeClases/ResumenDeClases';
import { CourseData } from '../components/ResumenDeClases/ResumenDeClases.types';

const Home: React.FC = () => {
  // Datos de ejemplo que normalmente vendrían de tu lógica de grabación o selección de curso
  const [courseInfo] = useState<CourseData>({
    topic: 'Arquitectura de Microservicios',
    transcription: 'En esta clase hablamos sobre patrones de diseño, comunicación asíncrona mediante colas de mensajes como RabbitMQ y la importancia de la consistencia eventual en sistemas distribuidos.'
  });

  const handleRefresh = (event: CustomEvent) => {
    // Lógica para recargar si fuera necesario
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Mi Tutor IA</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Header colapsable estilo iOS */}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mi Tutor IA</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Pull to Refresh: Gesto nativo móvil para re-ejecutar la IA */}
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        {/* Inyección del componente ClassSummarizer */}
        <ResumenDeClases courseData={courseInfo} />
        
      </IonContent>
    </IonPage>
  );
};

export default Home;