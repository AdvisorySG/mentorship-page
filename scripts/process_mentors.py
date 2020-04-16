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

        print(row[0])
        mentors.append({
            "name": row[0],
            "role": row[1],
            "organization": row[2],
            "school": row[3],
            "courseOfStudy": row[4],
            "fullBio": row[5],
            "imageUrl": "/profile_images/{}.jpg".format(
                row[0].replace(" ", "")
            )
        })
    print(json.dumps({"mentors": mentors})) 
