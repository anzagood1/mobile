import React from 'react';
import { 
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, 
  IonCardContent, IonSkeletonText, IonIcon, IonContent, IonRadioGroup, IonRadio
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
    const [answers, setAnswers] = useState<Record<number, Answer>>({});
    const handleAnswer = (questionIndex: number, selectedText: string) => {
        const question = quiz![questionIndex];
        const selected = [question.answer1, question.answer2, question.answer3]
        .find(a => a.answer === selectedText)!;
        setAnswers((prev) => ({
            ...prev,
            [questionIndex]: selected,
        }));
    };

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
            const selected = answers[i];
            
            return (
                <IonCard key={i} className="ion-margin-bottom">
                <IonCardHeader>
                    <IonCardSubtitle>
                    <IonIcon icon={helpCircleOutline}/> {question.question}
                    </IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                    <IonRadioGroup
                    value={answers[i].answer}
                    onIonChange={(e) => handleAnswer(i, e.detail.value)}
                    >
                    <IonRadio value={question.answer1.answer} labelPlacement="end">
                        {question.answer1.answer}
                    </IonRadio>
                    <br />

                    <IonRadio value={question.answer2.answer} labelPlacement="end">
                        {question.answer2.answer}
                    </IonRadio>
                    <br />

                    <IonRadio value={question.answer3.answer} labelPlacement="end">
                        {question.answer3.answer}
                    </IonRadio>
                    </IonRadioGroup>
                    {selected && (
                        <p
                            style={{
                            marginTop: '8px',
                            color: selected.isCorrect ? 'green' : 'red',
                            fontWeight: 500,
                            }}
                        >
                            {selected.isCorrect
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

