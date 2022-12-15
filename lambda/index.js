/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const languageStrings = require('./languageStrings');
var persistenceAdapter = getPersistenceAdapter();

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        initData();
        idiom=Alexa.getLocale(handlerInput.requestEnvelope);
        currentStatus = 'Question';
        let speakOutput = handlerInput.t('WELCOME_MSG_1');
        const lastHits = sessionAttributes['hits'];
        const lastCount = sessionAttributes['count'];
        
        if(lastHits && lastCount) {
            speakOutput +=  handlerInput.t('LAST_RESULT_1') + lastHits +  handlerInput.t('LAST_RESULT_2') + lastCount +  handlerInput.t('LAST_RESULT_3'); 
        }
        
        speakOutput +=  handlerInput.t('WELCOME_MSG_2');
         
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const ContinentIntentHandler = {
    canHandle(handlerInput) {
          return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ContinentIntent';
    },
    
    handle(handlerInput) {
        const ContinentValue = handlerInput.requestEnvelope.request.intent.slots.continentSlot.value;
        let speakOutput = '';
        const ActualIdiom =  handlerInput.t('ID');
        
        if(ContinentValue === handlerInput.t('EU')) {
            if(ActualIdiom === 'en') {
                  questionsList = require('./question-list-eu-en');
            } else {
                questionsList = require('./question-list-eu');
            }
        } else if(ContinentValue === handlerInput.t('AS')){
            if(ActualIdiom === 'en') {
                  questionsList = require('./question-list-as-en');
            } else {
                questionsList = require('./question-list-as');
            }
        } else {
            questionsList = require('./question-list-eu');
        }
        
        
        speakOutput += handlerInput.t('CONTINENT_1') + ContinentValue + handlerInput.t('CONTINENT_2');
        currentStatus = 'Continue';
       
        return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        
    }
};


const AnswerIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AnswerIntent';
    },
    handle(handlerInput) {
        const AnswerValue = handlerInput.requestEnvelope.request.intent.slots.citySlot.value.toString().toLowerCase();
       
        let speakOutput = '';
        if (currentStatus === 'Continue') {
            speakOutput += handlerInput.t('RESPONSE_1');
        }
        else {
            if (AnswerValue === currentIndex.capital) {
                speakOutput += handlerInput.t('RESPONSE_2')  + currentIndex.answer + handlerInput.t('FULLSTOP');
                hits++;
            }
            else  {
                speakOutput += handlerInput.t('RESPONSE_3') +  currentIndex.capital+  handlerInput.t('RESPONSE_4')  + AnswerValue + handlerInput.t('FULLSTOP');
            }
        }
        currentIndex = null;
        speakOutput += handlerInput.t('CONTINUE');
        currentStatus = 'Continue';
        
        if (exit) {
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        } 
        else {
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
    }
};

const RepeatIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent';
    },
    handle(handlerInput) {
        let speakOutput = '';
        if (currentStatus === 'Question') {
            speakOutput += handlerInput.t('REPEAT') + getQuestion(false,handlerInput);
        }
        else if (currentStatus === 'Continue') {
            speakOutput += handlerInput.t('CONTINUE');
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const YesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent';
    },
    handle(handlerInput) {
        const speakOutput = getQuestion(true,handlerInput);
        currentStatus = 'Question';


        if (exit) {
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .withShouldEndSession(true)
                .getResponse();
        } 
        else {
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
    }
};


const NextIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NextIntent';
    },
    handle(handlerInput) {
        let speakOutput = '';
        if (pending !== null) {
            speakOutput = handlerInput.t('NEXT_1');
            const tmpIndex = currentIndex;
            currentIndex = pending;
            pending = tmpIndex;
            speakOutput += getQuestion(false,handlerInput);
        }
        else {
            speakOutput = handlerInput.t('NEXT_2');
            pending = currentIndex;
            speakOutput += getQuestion(true,handlerInput);
        }
        currentStatus = 'Question';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const PendingIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PendingIntent';
    },
    handle(handlerInput) {
        let speakOutput = '';
        if (pending === null) {
            if (currentIndex !== null && currentStatus === 'Question') {
                speakOutput += handlerInput.t('PENDING_1'); 
                pending = currentIndex;
            }
            speakOutput += handlerInput.t('PENDING_2');
            currentStatus = 'Continue';
        }
        else {
            if (currentIndex !== null && currentStatus === 'Question') {
                let tmpIndex = currentIndex;
                currentIndex = pending;
                pending = tmpIndex;
                speakOutput += handlerInput.t('PENDING_1'); 
            }
            else {
                currentIndex = pending;
                pending = null;
            }
            
            speakOutput += handlerInput.t('PENDING_3') + getQuestion(false,handlerInput);
            currentStatus = 'Question';
        }


        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const ClueIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ClueIntent';
    },
    handle(handlerInput) {
        let speakOutput = '';
        if (currentStatus === 'Question') {
            speakOutput += handlerInput.t('CLUE_1') + currentIndex.clue +  handlerInput.t('CLUE_2') + getQuestion(false,handlerInput);
        }
        else if (currentStatus === 'Continue') {
            speakOutput +=  handlerInput.t('CLUE_3');
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('HELP_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent');
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const speakOutput = handlerInput.t('CANCEL_1') + hits + handlerInput.t('CANCEL_2') + count + handlerInput.t('CANCEL_3') ;
        const sessionAttributes = attributesManager.getSessionAttributes();
        const lastHits = hits;
        const lastCount = count;
        sessionAttributes['hits'] = hits;
        sessionAttributes['count'] = count;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('FALLBACK_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = handlerInput.t('ERROR_MESSAGE');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};



let  currentIndex, count, hits, pending, currentStatus, exit,questionsList,idiom;
function initData() {
    
   
    
    currentIndex = null;
    count = 0;
    hits = 0;
    pending = null;
    currentStatus = null;
    exit = false;
}



function getRandomItem(obj) {
    if (Object.keys(obj).length === 0) {
        return null;
    }
    currentIndex =  obj[Object.keys(obj)[Math.floor(Math.random()*Object.keys(obj).length)]];
    return currentIndex;
}

function getQuestion(random = true, handlerInput) {
    let speechText = '';
 
    if (random) {
        speechText = getRandomItem(questionsList);
        if (currentIndex === null && pending === null) {
            const speakOutput = handlerInput.t('GET_QUESTION_1') + hits + handlerInput.t('GET_QUESTION_2') + count + handlerInput.t('GET_QUESTION_3');
            exit = true;
            return speakOutput;
        }
        else if (currentIndex === null && pending !== null) {
            currentIndex = pending
            pending = null;
            return handlerInput.t('GET_QUESTION_4') +  currentIndex.question;
        }
        if(currentIndex !== null) {
            delete questionsList[currentIndex.id];
        }
        count++;
    }
    else {
    speechText = currentIndex;
    }
   
   
    const speakOutput =  speechText.question;
    return speakOutput
}


const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    }
};


const LoggingResponseInterceptor = {
    process(handlerInput, response) {
        console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};


const LocalisationRequestInterceptor = {
    process(handlerInput) {
        i18n.init({
            lng: Alexa.getLocale(handlerInput.requestEnvelope),
            fallbackLng: 'es',
            resources: languageStrings
        }).then((t) => {
            handlerInput.t = (...args) => t(...args);
        });
    }
};

function getPersistenceAdapter() {
    // This function is an indirect way to detect if this is part of an Alexa-Hosted skill
    function isAlexaHosted() {
        return process.env.S3_PERSISTENCE_BUCKET ? true : false;
    }
    const tableName = 'happy_birthday_table';
    if(isAlexaHosted()) {
        const {S3PersistenceAdapter} = require('ask-sdk-s3-persistence-adapter');
        return new S3PersistenceAdapter({ 
            bucketName: process.env.S3_PERSISTENCE_BUCKET
        });
    } else {
        // IMPORTANT: don't forget to give DynamoDB access to the role you're to run this lambda (IAM)
        const {DynamoDbPersistenceAdapter} = require('ask-sdk-dynamodb-persistence-adapter');
        return new DynamoDbPersistenceAdapter({ 
            tableName: tableName,
            createTable: true
        });
    }
}

const LoadAttributesRequestInterceptor = {
    async process(handlerInput) {
        if(handlerInput.requestEnvelope.session['new']){ //is this a new session?
            const {attributesManager} = handlerInput;
            const persistentAttributes = await attributesManager.getPersistentAttributes() || {};
            //copy persistent attribute to session attributes
            handlerInput.attributesManager.setSessionAttributes(persistentAttributes);
        }
    }
};

const SaveAttributesResponseInterceptor = {
    async process(handlerInput, response) {
        const {attributesManager} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        const shouldEndSession = (typeof response.shouldEndSession === "undefined" ? true : response.shouldEndSession);//is this a session end?
        if(shouldEndSession || handlerInput.requestEnvelope.request.type === 'SessionEndedRequest') { // skill was stopped or timed out            
            attributesManager.setPersistentAttributes(sessionAttributes);
            await attributesManager.savePersistentAttributes();
        }
    }
};


/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        AnswerIntentHandler,
        RepeatIntentHandler,
        NextIntentHandler,
        ClueIntentHandler,
        HelpIntentHandler,
        YesIntentHandler,
        PendingIntentHandler,
        ContinentIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    
    .addErrorHandlers(
        ErrorHandler)
    
    .addRequestInterceptors(
        LocalisationRequestInterceptor,
        LoggingRequestInterceptor,
        LoadAttributesRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor,
        SaveAttributesResponseInterceptor)
        
    .withPersistenceAdapter(persistenceAdapter)
    .lambda();