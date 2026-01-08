import React from 'react';
import { 
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, 
  IonCardContent, IonSkeletonText, IonIcon, IonContent, IonRadioGroup, IonRadio,
} from '@ionic/react';
import {helpCircleOutline} from 'ionicons/icons';

// Importación de módulos externos
import { useState } from 'react';
import { Question, Answer} from './ResumenDeClasesStructures';

interface CuestionarioProps {
    isLoading: boolean;
    quiz?: Question[];
}

const Cuestionario: React.FC<CuestionarioProps> = ({ isLoading, quiz }) => {
    const [seleccionadas, setSeleccionadas] = useState<Record<number, number>>({});

    if(isLoading){
        return(
            <IonCard>
                <IonCardContent>
                    <IonSkeletonText animated style={{ width: '90%', height: '16px' }} />
                    <IonSkeletonText animated style={{ width: '100%', height: '14px' }} />
                    <IonSkeletonText animated style={{ width: '95%', height: '14px' }} />
                </IonCardContent>
            </IonCard>
        );
    }

    return(
        <>
        {quiz?.map((question, i) => {
            const answers = [
                question.answer1,
                question.answer2,
                question.answer3
            ];
            return (
                <IonCard key={i} className="ion-margin-bottom">
                <IonCardHeader>
                    <IonCardSubtitle>
                    <IonIcon icon={helpCircleOutline}/> {question.question}
                    </IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                    <IonRadioGroup
                        value={seleccionadas[i]}
                            onIonChange={(e) => {
                                const selectedIndex = e.detail.value as number;
                                setSeleccionadas(prev => ({
                                ...prev,
                                [i]: selectedIndex
                                }));
                        }}
                    >
                    {[question.answer1, question.answer2, question.answer3].map(
                        (answer, index) => (
                        <div key={index}>
                            <IonRadio
                            value={index}
                            labelPlacement="end"
                            >
                            {answer.answer}
                            </IonRadio>
                            <br />
                        </div>
                        )
                    )}
                    </IonRadioGroup>
                    {seleccionadas[i] !== undefined && (
                        <p style={{ color: answers[seleccionadas[i]].isCorrect === "true" ? 'green' : 'red' }}>
                            {answers[seleccionadas[i]].isCorrect === "true"
                            ? 'Respuesta correcta'
                            : 'Respuesta incorrecta'}
                        </p>
                        )}
                        
                        
                </IonCardContent>
                </IonCard>
            );
        })}
        </>
    );
};
export default Cuestionario;

