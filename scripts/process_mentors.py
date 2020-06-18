import csv
import itertools
import json
import sys
from pathlib import Path

from PIL import Image
import click
import imagehash

CSV_FIELDS = [
    'name',
    None,
    None,
    None,
    None,
    'imageFilename',
    None,
    None,
    'fullBio',
    None,
    None,
    'role',
    'organization',
    'school',
    'courseOfStudy'
]

IMG_SIZES = {
    'thumbnail': (160, 160),
    'full': (250, 250)
}

@click.command()
@click.argument('csv_src', type=click.Path(file_okay=False, dir_okay=True))
@click.argument('im_src', type=click.Path(file_okay=False, dir_okay=True))
@click.argument('im_dst', type=click.Path(file_okay=False, dir_okay=True))
def main(csv_src, im_src, im_dst):
    mentors = {}

    for wave in itertools.count():
        csv_fn = Path(csv_src, 'wave{}.csv'.format(wave))
        if not csv_fn.is_file():
            break

        def process_image(im, im_fn, im_hash):
            im_paths = {}
            im_fn_split = im_fn.split('.')
            assert len(im_fn_split) > 1

            for size_name, size in IMG_SIZES.items():
                w, h = size
                im2 = im.resize(size)
                im2_dir = Path('{}x{}'.format(w, h))
                im2_fn = Path('{}.{}.{}'.format(im_fn_split[:-1], im_hash, im_fn_split[-1]))

                Path(im_dst, im2_dir).mkdir(parents=True, exist_ok=True)
                im2.save(Path(im_dst, im2_dir, im2_fn), optimize=True, progressive=True)
                im_paths[size_name] = Path(im2_dir, im2_fn)
            return im_paths

        def process_row(row):
            row = [x.strip() for x in row]
            if row[0] == '':
                return None

            mentor = {}
            mentor['wave'] = wave
            for i, field in enumerate(CSV_FIELDS):
                if field:
                    mentor[field] = row[i]
            
            im_fn = mentor['imageFilename']
            with Image.open(Path(im_src, im_fn)) as im:
                im_hash = str(imagehash.average_hash(im))[:7]
                im_paths = process_image(im, im_fn, im_hash)
                for size_name, im_path in im_paths.items():
                    mentor['{}ImageUrl'.format(size_name)] = '/profile_images/{}'.format(im_path)

            return (mentor['name'].replace(' ', '').replace('(', '').replace(')', ''), mentor)

        with open(csv_fn, newline='', encoding='utf-8') as f:
            lines = csv.reader(f, delimiter=',', quotechar='"')
            mentors.update(process_row(row) for row in lines if process_row(row))

    print(json.dumps({'mentors': mentors}, indent=2, sort_keys=True))

if __name__ == '__main__':
    main()
