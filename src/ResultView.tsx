import React from "react";

type FieldRaw<T> = { raw: T };
type FieldSnippet<T> = { snippet: T };

type MentorResult = {
  course_of_study: FieldSnippet<string>;
  full_bio: FieldRaw<string> & FieldSnippet<string>;
  full_image_url: FieldRaw<string>;
  industries: FieldRaw<string[]>;
  name: FieldSnippet<string>;
  organisation: FieldSnippet<string>;
  role: FieldSnippet<string>;
  school: FieldSnippet<string>;
  thumbnail_image_url: FieldRaw<string>;
  wave_id: FieldRaw<number>;
};

const ResultView = ({ result }: { result: MentorResult }) => {
  const {
    course_of_study,
    full_bio,
    industries,
    name,
    organisation,
    role,
    school,
  } = result;

  return (
    <div>
      <li className="sui-result">
        <div className="sui-result__header">
          <span
            className="sui-result__title"
            dangerouslySetInnerHTML={{ __html: name.snippet }}
          />
        </div>
        <div className="sui-result__body">
          <div
            className="sui-result__image"
            style={{
              maxWidth: "140px",
              paddingLeft: "24px",
              paddingTop: "10px",
            }}
          >
            <img
              src={result.thumbnail_image_url.raw}
              alt="thumb"
              style={{
                display: "block",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
          <ul className="sui-result__details">
            <li>
              <span className="sui-result__label">Industries: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html: industries.raw ? industries.raw.join(", ") : "NA",
                }}
              />
            </li>
            <li>
              <span className="sui-result__label">Role: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{ __html: role.snippet ?? "NA" }}
              />
            </li>
            <li>
              <span className="sui-result__label">Organisation: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html: organisation.snippet ?? "NA",
                }}
              />
            </li>
            <li>
              <span className="sui-result__label">School graduated from: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{ __html: school.snippet ?? "NA" }}
              />
            </li>
            <li>
              <span className="sui-result__label">Course of study: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html: course_of_study.snippet ?? "NA",
                }}
              />
            </li>
            <li>
              <span className="sui-result__label">Biography: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html: full_bio.snippet ? full_bio.snippet + "..." : "NA",
                }}
              />
            </li>
          </ul>
        </div>
      </li>
    </div>
  );
};

export default ResultView;
