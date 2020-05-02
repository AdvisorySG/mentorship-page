import csv
import json
import sys
from pathlib import Path

from PIL import Image
import click
import imagehash

CSV_FIELDS = [
    None,
    None,
    'fullBio',
    None,
    None,
    None,
    'role',
    'organization',
    'school',
    'courseOfStudy',
    'firstNameAndLastName',
    'name'
]

IMG_SIZES = {
    'thumbnail': (160, 160),
    'full': (250, 250)
}

@click.command()
@click.argument('csv_src', type=click.Path(exists=True))
@click.argument('im_src', type=click.Path(file_okay=False, dir_okay=True))
@click.argument('im_dst', type=click.Path(file_okay=False, dir_okay=True))
def main(csv_src, im_src, im_dst):
    def process_image(im, mentor_id, im_hash):
        im_paths = {}
        for size_name, size in IMG_SIZES.items():
            w, h = size
            im2 = im.resize(size)
            im2_dir = Path('{}x{}'.format(w, h))
            im2_fn = Path('{}.{}.jpg'.format(mentor_id, im_hash))

            Path(im_dst, im2_dir).mkdir(parents=True, exist_ok=True)
            im2.save(Path(im_dst, im2_dir, im2_fn), optimize=True, progressive=True)
            im_paths[size_name] = Path(im2_dir, im2_fn)
        return im_paths

    def process_row(row):
        row = [x.strip() for x in row]
        if row[0] == '':
            return None

        mentor = {}
        for i, field in enumerate(CSV_FIELDS):
            if field:
                mentor[field] = row[i]
        mentor_id = mentor['firstNameAndLastName'].replace(' ', '').replace('(', '').replace(')', '')

        with Image.open(Path(im_src, '{}.jpg'.format(mentor_id))) as im:
            im_hash = str(imagehash.average_hash(im))[:7]
            im_paths = process_image(im, mentor_id, im_hash)
            for size_name, im_path in im_paths.items():
                mentor['{}ImageUrl'.format(size_name)] = '/profile_images/{}'.format(im_path)

        return (mentor_id, mentor)

    with open(csv_src, newline='', encoding='utf-8') as f:
        lines = csv.reader(f, delimiter=',', quotechar='"')
        mentors = dict(process_row(row) for row in lines if process_row(row))
        print(json.dumps({'mentors': mentors}, indent=4, sort_keys=True))

if __name__ == '__main__':
    main()
