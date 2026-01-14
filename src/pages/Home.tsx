import React, { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonButtons, IonMenuButton, IonRefresher, IonRefresherContent,
  useIonViewWillEnter
} from '@ionic/react';
import Tema from '../components/Tema'
import Historial from '../components/Historial'
import { CourseData } from '../components/ResumenDeClasesStructures';
import "./Home.css";

const Home: React.FC = () => {
  // Datos de ejemplo que normalmente vendrían de tu lógica de grabación o selección de curso
  const [reloadKey, setReloadKey] = useState(0);

  const handleRefresh = (event: CustomEvent) => {
    // Lógica para recargar si fuera necesario
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  // Al volver a esta vista, forzamos un remount ligero del historial
  useIonViewWillEnter(() => {
    setReloadKey((k) => k + 1);
  });

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
        <Tema/>
        {/* Historial de resúmenes generados */}
        <Historial key={reloadKey} />
        
      </IonContent>
    </IonPage>
  );
};

export default Home;