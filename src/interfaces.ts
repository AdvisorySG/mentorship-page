export interface Photo {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: {
    small: {
      url: string;
      width: number;
      height: number;
    };
    large: {
      url: string;
      width: number;
      height: number;
    };
    full: {
      url: string;
      width: number;
      height: number;
    };
  };
}

export interface RawData {
  id: string;
  Biography: string;
  "Course of Study": string;
  Email: string;
  "Industry 1"?: string[];
  "Industry 2"?: string[];
  "Industry 3"?: string[];
  "Job Title": string;
  Name: string;
  Organisation: string;
  Photo: Photo[];
  School: string;
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
