import flask
from flask import request, jsonify
from pylogflow.Pylogflow import IntentMap, Agent
# Use Cloudant to create a Cloudant client using account
from cloudant.client import Cloudant
from cloudant.error import CloudantException
from cloudant.result import Result, ResultByKey
# Tweepy import
import tweepy
# Natural Language understanding
import json
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_watson.natural_language_understanding_v1 import Features, CategoriesOptions

# Copy this file to .env and replace the credentials with
# your own before starting the app.

CLOUDANT_USERNAME="87a61610-7d39-4987-8aa7-5857c13e02b1-bluemix"
CLOUDANT_PASSWORD="2e36a4c5d2cac81aa643ccd2cc767aac8ff46b23fefea12d0c775c4f58c24575"
CLOUDANT_URL="https://87a61610-7d39-4987-8aa7-5857c13e02b1-bluemix:2e36a4c5d2cac81aa643ccd2cc767aac8ff46b23fefea12d0c775c4f58c24575@87a61610-7d39-4987-8aa7-5857c13e02b1-bluemix.cloudantnosqldb.appdomain.cloud"

## Un-comment and use either username+password or IAM apikey.
# NATURAL_LANGUAGE_UNDERSTANDING_USERNAME=<use natural language understanding username>
# NATURAL_LANGUAGE_UNDERSTANDING_PASSWORD=<use natural language understanding password>
NLU_KEY = "7AGk8HyuLvEairikmsN1hkUwo9Xz7TzmB4ggaPxUOtvd"
NLU_URL = "https://gateway.watsonplatform.net/natural-language-understanding/api"

## Un-comment and use either username+password or IAM apikey.
# TONE_ANALYZER_USERNAME=<use tone analyzer username>
# TONE_ANALYZER_PASSWORD=<use tone analyzer password>
TONE_ANALYZER_IAM_APIKEY="VLgifD_nXKGCh5i04m-ArF_6rp-Qo6MtExpwJrP-nvqB"
TONE_ANALYZER_URL="https://gateway.watsonplatform.net/tone-analyzer/api"

# Twitter
TWITTER_CONSUMER_KEY="el5QWXa9lWWx21oyAsFVuUIlc"
TWITTER_CONSUMER_SECRET="6BcL6RP42dV5DUD4TmMuBxlJ0zzWYNySNOkDoCUehCa8nihGq6"
TWITTER_ACCESS_TOKEN="1132681488661712897-NQfWmbC1QGbS01vqJng1gf5gYmT5P0"
TWITTER_ACCESS_SECRET="g8JxsKAnAILQPtXY7WPArt5WUpW4CLZMbBSW741uizrFg"

app = flask.Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

@app.route('/', methods=['POST'])
def home():
    # Send request as a json, result must be a dictionary
    result = intentMap.execute_intent(request.json)
    # Parse result into json format
    return jsonify(result)

# Intent prueba
def respuesta(req):
    # Set agent
    agent = Agent()
    agent.add_message("Respuesta basica")
    analizarPersona("imonsh")
    return agent.get_response()

# Metodo para analizar persona dado su twitter
def analizarPersona(twitter):
        print(analizarTexto(buscarTweets(twitter)))
        data = consultarCloudant()
        print(data)

def consultarCloudant():
    # Authenticate using an IAM API key
    client = Cloudant(CLOUDANT_USERNAME, CLOUDANT_PASSWORD, url=CLOUDANT_URL, connect=True)

    session = client.session()
    # print('Username: {0}'.format(session['userCtx']['name']))
    # print('Databases: {0}'.format(client.all_dbs()))

    result_collection = Result(client["prueba"].all_docs, include_docs=True)
    print("Retrieved minimal document:\n{0}\n".format(result_collection[0]))
    # Disconnect from the server
    client.disconnect()

    return result_collection

def buscarTweets(usuario):
    # OAuth process, using the keys and tokens
    auth = tweepy.OAuthHandler(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET)
    auth.set_access_token(TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET)

    # creation of the actual interface, using authentication
    api = tweepy.API(auth)

    user = api.get_user(usuario)

    # print('Name: ' + user.name)
    # print('Location: ' + user.location)
    # print('Friends: ' + str(user.friends_count))

    # user_friends = user.friends()
    # for friend in user_friends:
    #     print (friend.screen_name)
    stuff = api.user_timeline(screen_name = usuario, count = 30, include_rts = True)
    res = ""
    for item in stuff:
        res += item.text + "\n"
    print(res)
    return res

def analizarTexto(texto):
    if texto:
        natural_language_understanding = NaturalLanguageUnderstandingV1(
            version='2018-11-16',
            iam_apikey=NLU_KEY,
            url=NLU_URL
        )

        response = natural_language_understanding.analyze(
            text=texto,
            language="es",
            features=Features(categories=CategoriesOptions(limit=5))
        ).get_result()

        return json.dumps(response, indent=2)
    else:
        return {
            "error": "No se encontro texto"

        }


# Set up intent map
intentMap = IntentMap()
intentMap.add("Estancia", respuesta)

# Set up server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
