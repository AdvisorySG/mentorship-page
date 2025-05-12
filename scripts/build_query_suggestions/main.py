import os

from dotenv import load_dotenv
from elasticsearch import Elasticsearch, helpers
from sentence_transformers import SentenceTransformer
from tqdm import tqdm

load_dotenv()

ELASTIC_API_KEY = os.getenv("ELASTIC_API_KEY")
ELASTIC_CLOUD_ID = os.getenv("ELASTIC_CLOUD_ID")
ELASTIC_INDEX = "query-suggestions"

SBERT_MODEL = "Xenova/paraphrase-MiniLM-L3-v2"


def main():
    client = Elasticsearch(cloud_id=ELASTIC_CLOUD_ID, api_key=ELASTIC_API_KEY)
    client.delete_by_query(
        index=ELASTIC_INDEX,
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
            yield {
                "_index": ELASTIC_INDEX,
                "suggestion": suggestion,
                "embedding": model.encode(suggestion).tolist(),
            }
    
    helpers.bulk(client, generate_docs())

if __name__ == "__main__":
    main()
