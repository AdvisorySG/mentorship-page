import os

from dotenv import load_dotenv
from elasticsearch import Elasticsearch, helpers
from sentence_transformers import SentenceTransformer
from tqdm import tqdm

load_dotenv()

ELASTIC_API_KEY = os.getenv("ELASTIC_API_KEY")
ELASTIC_CLOUD_ID = os.getenv("ELASTIC_CLOUD_ID")
ELASTIC_MENTORS_INDEX = "mentorship-page-current"
ELASTIC_SUGGESTIONS_INDEX = "query-suggestions"

SBERT_MODEL = "Xenova/paraphrase-MiniLM-L3-v2"

CURRENT_WAVE_ID = "2024"
HIT_FIELDS = ("full_bio", "course_of_study", "organisation", "industries")


def main():
    client = Elasticsearch(cloud_id=ELASTIC_CLOUD_ID, api_key=ELASTIC_API_KEY)
    client.delete_by_query(
        index=ELASTIC_SUGGESTIONS_INDEX,
        query={"match_all": {}}
    )

    with open("./suggestions.txt", "r") as f:
        lines = f.readlines()
        suggestions = [line.strip() for line in lines]

    model = SentenceTransformer(SBERT_MODEL, backend="onnx", model_kwargs={
        "file_name": "onnx/model_quantized.onnx",
    })

    def generate_docs():
        for suggestion in tqdm(suggestions):
            num_hits = client.count(
                index=ELASTIC_MENTORS_INDEX,
                body={
                    "query": {
                        "bool": {
                            "filter": [
                                {"term": {"wave_id": CURRENT_WAVE_ID}},
                            ],
                            "should": [
                                {"match_phrase": {field: suggestion}}
                                for field in HIT_FIELDS
                            ],
                            "minimum_should_match": 1,
                        }
                    }
                }
            )["count"]

            if num_hits == 0:
                continue

            yield {
                "_index": ELASTIC_SUGGESTIONS_INDEX,
                "suggestion": suggestion,
                "embedding": model.encode(suggestion).tolist(),
                "num_hits": num_hits,
            }
    
    helpers.bulk(client, generate_docs())

if __name__ == "__main__":
    main()
