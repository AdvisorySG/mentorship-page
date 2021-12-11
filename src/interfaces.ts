export interface RawData {
  id: string;
  course_of_study: string;
  full_bio: string;
  full_image_url: string;
  industries: string[];
  name: string;
  organisation: string;
  role: string;
  school: string;
  thumbnail_image_url: string;
  wave_id: number;
  wave_name: string;
}

export interface Mentor {
  courseOfStudy: string;
  fullBio: string;
  fullImageUrl: string;
  industries: string[];
  name: string;
  organisation: string;
  role: string;
  school: string;
  thumbnailImageUrl: string;
}
