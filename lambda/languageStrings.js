/* *
 * We create a language strings object containing all of our strings.
 * The keys for each string will then be referenced in our code, e.g. handlerInput.t('WELCOME_MSG').
 * The localisation interceptor in index.js will automatically choose the strings
 * that match the request's locale.
 * */

module.exports = {
    es: {
        translation: {
            WELCOME_MSG_1: 'Hola! Vamos a jugar a ... ¿Cúal es la capital? ... Tendrás que responder \
                          diciendo qué capital corresponde con el pais al que hago referencia.',
            WELCOME_MSG_2:'... Vamos a empezar! ... \
                          ¿Que continente quieres Europa o Asia?',
            LAST_RESULT_1: '... En tu último intento tuviste ' ,
            LAST_RESULT_2: ' aciertos de ' ,
            LAST_RESULT_3: ' preguntas' ,
                          
            ID: 'es',
                          
            
                          
            CONTINENT_1: 'Has elegido ',
            CONTINENT_2: '... ¿Comenzamos?',
            
            RESPONSE_1:'Responde sí o no',
            RESPONSE_2:'Respuesta correcta! ... ',
            RESPONSE_3:'Respuesta incorrecta, la respuesta correcta es ',
            RESPONSE_4:' y tu has respondido ',
            
            CONTINUE:'   Continuamos? ',
            REPEAT: 'Repetimos! ...',
            
            NEXT_1:'Alcanzaste el máximo de preguntas pendientes de responder, vamos a por ella de nuevo. ... ',
            NEXT_2:'Guardamos esta pregunta para después, vamos con la siguiente! ... ',
            
            PENDING_1:'Hemos dejado esta pregunta sin responder, la guardamos para después ... ',
            PENDING_2:'No tienes preguntas pendientes! ... Quieres continuar con una nueva pregunta?',
            PENDING_3:'Vamos con la pregunta que teníamos pendiente! ... ',
            
            CLUE_1: 'Ahí va una pista! ... ',
            CLUE_2: '. ... Te vuelvo a repetir la pregunta. ... ',
            CLUE_3: 'Responde Sí o No.',
            
            CANCEL_1:'Has conseguido acertar ',
            CANCEL_2:' de ',
            CANCEL_3:' preguntas. ... Hasta luego!',
            
            GET_QUESTION_1:'Ya respondiste todas las preguntas! ... Has conseguido acertar ',
            GET_QUESTION_2:' de ',
            GET_QUESTION_3:' preguntas. ... Hasta luego!',
            GET_QUESTION_4:'Ya no te quedan más preguntas nuevas, pero sí te queda una pendiente, vamos con ella. ... ',
            
            
            
            FULLSTOP: '.',
            
            EU: 'europa',
            AS: 'asia',
            
            HELP_MESSAGE: 'El juego consiste en que te iré haciendo preguntas y tendrás que acertar la capital \
                            correcto, pero si no sabes la respuesta puedes decirme que pase a la \
                            siguiente y así tendrás tiempo de pensar la respuesta. Puedes tener hasta una pregunta pendiente de responder.',
                            
            
            FALLBACK_MESSAGE: 'Lo siento, no entiendo lo que me dices. Por favor inténtalo otra vez.',
            
            ERROR_MESSAGE: 'Lo siento, tuve problemas para hacer lo que me pediste. Inténtalo de nuevo.',
        }
    },
    en: {
        translation: {
            WELCOME_MSG_1: 'Hello! We are going to play to ... Which is the capital? ... You will have to answer  \
                          saying which capital refers to the country that we are asking for. ',
             WELCOME_MSG_2:'... Lets play! ... \
                          Which continent do you choose, Europe or Asia?',
                    
            ID: 'en',
            
            LAST_RESULT_1: '... In your last attempt you got right ' ,
            LAST_RESULT_2: ' of ' ,
            LAST_RESULT_3: ' questions' ,
            
            CONTINENT_1: 'You have chosen ',
            CONTINENT_2: '... Should we start?',
            
            RESPONSE_1:'Answer yes or no',
            RESPONSE_2:'Correct answer! ... ',
            RESPONSE_3:'Incorrect answer, the correct answer is ',
            RESPONSE_4:' and you have answered ',
            
            CONTINUE:'   Should we continue? ',
            REPEAT: 'Lets repeat! ...',
            
            NEXT_1:'You have reached the maximum amount of pending questions to answer, lets go again. ... ',
            NEXT_2:'We keep this question for later, lets go to the next one! ... ',
            
            PENDING_1:'We have left this question unanswered, we are keeping it for later... ',
            PENDING_2:'You have no pending questions! ... Do you want to continue with a new question?',
            PENDING_3:'Lets go with the question that we had pending! ... ',
            
            CLUE_1: 'Here is a clue! ... ',
            CLUE_2: '. ... I repeat the question again. ... ',
            CLUE_3: 'Answer Yes or No.',
            
            CANCEL_1:'You have answered correctly ',
            CANCEL_2:' of ',
            CANCEL_3:' questions. ... Bye!',
            
            GET_QUESTION_1:'You have already answered all the questions! ...You have answered correctly ',
            GET_QUESTION_2:' from ',
            GET_QUESTION_3:' questions. ... Bye!',
            GET_QUESTION_4:'You do not have any more new questions left, but if you do have one pending, lets go with it. ... ',
            
            FULLSTOP: '.',
            
            EU: 'Europe',
            AS: 'Asia',
            
            HELP_MESSAGE: 'The game consists of asking you questions and you will have to guess the capital \
                            correct, but if you dont know the answer you can tell me to go to the \
                            next and so you will have time to think about the answer. You can even have a question pending answer.',
                            
            
            FALLBACK_MESSAGE: 'Sorry, I do not understand what you are saying. Please try again.',
            
            ERROR_MESSAGE: 'Sorry, I had trouble doing what you asked. Try again.',
        }
        
    }
}