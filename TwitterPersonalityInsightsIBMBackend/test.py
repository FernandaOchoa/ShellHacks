import json
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_watson.natural_language_understanding_v1 import Features, CategoriesOptions

NLU_KEY = "7AGk8HyuLvEairikmsN1hkUwo9Xz7TzmB4ggaPxUOtvd"
NLU_URL = "https://gateway.watsonplatform.net/natural-language-understanding/api"
natural_language_understanding = NaturalLanguageUnderstandingV1(
    version='2018-11-16',
    iam_apikey=NLU_KEY,
    url=NLU_URL
)

response = natural_language_understanding.analyze(
    text="""
       Hola amigo, se que me necesitas""",
    language="es",
    features=Features(categories=CategoriesOptions(limit=5))
).get_result()


print(json.dumps(response, indent=2))


