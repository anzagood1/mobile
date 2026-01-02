import React from 'react';
import { 
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, 
  IonCardContent, IonList, IonItem, IonLabel, IonThumbnail, 
  IonSkeletonText, IonBadge, IonNote, IonText, IonIcon, IonContent, IonRadioGroup, IonRadio
} from '@ionic/react';
import { bookOutline, schoolOutline, alertCircleOutline, helpCircleOutline} from 'ionicons/icons';
import { useQuery } from '@tanstack/react-query';

// Importación de módulos externos
import { CourseData } from './ResumenDeClasesStructures';
import { fetchClassSummary } from './ia.servicios';
import Cuestionario from './Cuestionario';

interface Props {
  courseData: CourseData;
}

const ResumenDeClases: React.FC<Props> = ({ courseData }) => {
  // Gestión de estado asíncrono con React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['classSummary', courseData.topic, courseData.transcription.length],
    queryFn: () => fetchClassSummary(courseData),
    retry: 1
  });

  if (isError) {
    return (
      <div className="ion-padding">
        <IonItem lines="none" color="light" style={{ borderRadius: '8px' }}>
          <IonIcon icon={alertCircleOutline} slot="start" color="danger" />
          <IonLabel>
            <IonNote color="danger">No se pudo generar el resumen.</IonNote>
          </IonLabel>
        </IonItem>
      </div>
    );
  }

  return (
    
    <div className="ion-padding">
      {/* Header Informativo */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <IonText>
          <h2 style={{ margin: 0, fontWeight: 'bold' }}>{courseData.topic}</h2>
        </IonText>
      </div>

      {/* Tarjetas de los puntos del resumen */}
      <h3 className="ion-margin-top" style={{ fontWeight: '600' }}>Conceptos Claves</h3>
      {isLoading ? (
        <IonCard>
          <IonCardContent>
            <IonSkeletonText animated style={{ width: '90%', height: '16px' }} />
            <IonSkeletonText animated style={{ width: '100%', height: '14px' }} />
            <IonSkeletonText animated style={{ width: '95%', height: '14px' }} />
          </IonCardContent>
        </IonCard>
      ) : (
        data?.summaryPoints.map((point, i) => (
          <IonCard key={i} className="ion-margin-bottom">
            <IonCardHeader>
              <IonCardSubtitle>
                <IonIcon icon={schoolOutline} /> {point.title}
              </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <IonText>
                {point.detail}
              </IonText>
            </IonCardContent>
          </IonCard>
        ))
      )}

      <h3 className="ion-margin-top" style={{ fontWeight: '600' }}>Cuestionario</h3>
      <Cuestionario
        isLoading={isLoading}
        quiz={data?.quiz}
      />

      {/* Listado de Libros */}
      <h3 className="ion-margin-top" style={{ fontWeight: '600' }}>Lecturas Sugeridas</h3>
      <IonList lines="full">
        {isLoading ? (
          [1, 2, 3].map((i) => (
            <IonItem key={i}>
              <IonThumbnail slot="start"><IonSkeletonText /></IonThumbnail>
              <IonLabel>
                <IonSkeletonText animated style={{ width: '50%' }} />
                <IonSkeletonText animated style={{ width: '80%' }} />
              </IonLabel>
            </IonItem>
          ))
        ) : (
          data?.recommendedBooks.map((book, i) => (
            <IonItem key={i}>
              <IonThumbnail slot="start" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ion-color-light)' }}>
                <IonIcon icon={bookOutline} color="primary" />
              </IonThumbnail>
              <IonLabel className="ion-text-wrap">
                <h2 style={{ fontWeight: 'bold' }}>{book.title}</h2>
                <p><strong>{book.author}</strong></p>
                <IonNote style={{ fontSize: '0.85rem' }}>{book.reason}</IonNote>
              </IonLabel>
            </IonItem>
          ))
        )}
      </IonList>
    </div>
  );
};
export default ResumenDeClases;