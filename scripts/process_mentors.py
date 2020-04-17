import csv
import json
import sys

with open(sys.argv[1], newline='') as f:
    lines = csv.reader(f, delimiter=',', quotechar='"')
    mentors = []
    for row in lines:
        row = [x.strip() for x in row]
        if row[0] == "":
            continue

        mentors.append({
            "name": row[11],
            "role": row[6],
            "organization": row[7],
            "school": row[8],
            "courseOfStudy": row[9],
            "fullBio": row[2],
            "imageUrl": "/profile_images/{}.jpg".format(
                row[10].replace(" ", "").replace("(", "").replace(")", "")
            )
        })
    print(json.dumps({"mentors": mentors[1:]})) # discard header row
