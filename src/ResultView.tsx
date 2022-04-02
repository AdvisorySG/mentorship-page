import React from "react";

const ResultView = ({ result }: { result: any }) => {
  console.log("Start of loop");
  var string = "";
  for (const entry of result.industries.raw) {
    if (result.industries.snippet.toString() === entry) {
    } else {
      string += entry.toString() + ", ";
    }
  }
  string = string.slice(0, string.length - 2);
  console.log(result.industries.snippet + ", " + string);

  return (
    <div>
      <li className="sui-result">
        <div className="sui-result__header">
          <span
            className="sui-result__title"
            dangerouslySetInnerHTML={{ __html: result.name.snippet }}
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
                  __html: result.industries
                    ? result.industries.snippet + ", " + string
                    : "NA",
                }}
              />
            </li>
            <li>
              <span className="sui-result__label">Role: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html: result.role ? result.role.snippet : "NA",
                }}
              />
            </li>
            <li>
              <span className="sui-result__label">Organisation: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html: result.organisation
                    ? result.organisation.snippet
                    : "NA",
                }}
              />
            </li>
            <li>
              <span className="sui-result__label">School graduated from: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html: result.school ? result.school.snippet : "NA",
                }}
              />
            </li>
            <li>
              <span className="sui-result__label">Course of study: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html: result.course_of_study
                    ? result.course_of_study.snippet
                    : "NA",
                }}
              />
            </li>
            <li>
              <span className="sui-result__label">Biography: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html: result.full_bio
                    ? result.full_bio.snippet + " ..."
                    : "NA",
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
