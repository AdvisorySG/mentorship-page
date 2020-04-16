import csv
import json
import sys

with open(sys.argv[1], newline='') as f:
    lines = csv.reader(f, delimiter=',', quotechar='"')
    mentors = []
    for row in lines:
        row = [x.strip() for x in row]
        if row[1] == "" or row[1].lower() == "name":
            continue

        if row[0].lower() == "full profile" or row[0].lower() == "":
            mentors.append({
                "name": row[1],
                "role": row[2],
                "organization": row[3],
                "school": row[4],
                "courseOfStudy": row[5],
                "fullBio": row[6],
                "imageUrl": "/profile_images/{}.jpg".format(
                    row[1].replace(" ", "")
                )
            })
    print(json.dumps({"mentors": mentors})) 
