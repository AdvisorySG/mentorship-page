import argparse
import os

from dotenv import load_dotenv
import elasticsearch
from elasticsearch import Elasticsearch, helpers
from sentence_transformers import SentenceTransformer
from tqdm import tqdm

load_dotenv()

ELASTIC_API_KEY = os.getenv("ELASTIC_API_KEY")
ELASTIC_CLOUD_ID = os.getenv("ELASTIC_CLOUD_ID")
ELASTIC_MENTORS_INDEX = "mentorship-page-current"
ELASTIC_SUGGESTIONS_INDEX = "query-suggestions"
ELASTIC_SYNONYM_SET = "suggestion-synonyms"

SBERT_MODEL = "Xenova/paraphrase-MiniLM-L6-v2"

CURRENT_WAVE_ID = "2025"
HIT_FIELDS = ("full_bio", "course_of_study", "organisation", "industries")


def main(filename: str):
    client = Elasticsearch(cloud_id=ELASTIC_CLOUD_ID, api_key=ELASTIC_API_KEY)
    client.delete_by_query(
        index=ELASTIC_SUGGESTIONS_INDEX,
        query={"match_all": {}}
    )

    with open(filename, "r") as f:
        lines = f.readlines()

    try:
        old_synonym_ids = [
            rule["id"]
            for rule in client.synonyms.get_synonym(id=ELASTIC_SYNONYM_SET)["synonyms_set"]
        ]
        print(f"Deleting all old synonyms from {ELASTIC_SYNONYM_SET}...")
        for synonym_id in old_synonym_ids:
            client.synonyms.delete_synonym_rule(set_id=ELASTIC_SYNONYM_SET, rule_id=synonym_id)
    except elasticsearch.NotFoundError:
        print(f"Synonym set {ELASTIC_SYNONYM_SET} not found.")
        pass

    synonyms = [{"synonyms": line.strip()} for line in lines]

    print(f"Indexing synonyms into {ELASTIC_SYNONYM_SET}...")
    client.synonyms.put_synonym(id=ELASTIC_SYNONYM_SET, synonyms_set=synonyms)
    
    suggestions = [
        line.split(" => ")[1].strip() if " => " in line else line.strip()
        for line in lines
    ]

    model = SentenceTransformer(SBERT_MODEL, backend="onnx", model_kwargs={
        "file_name": "onnx/model_quantized.onnx",
    })

    def generate_suggestions():
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
    
    print(f"Indexing suggestions into {ELASTIC_SUGGESTIONS_INDEX}...")
    helpers.bulk(client, generate_suggestions())


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("filename")
    args = parser.parse_args()
    main(args.filename)
