import React from "react";

const result_category = {
  fontFamily: "Helvetica",
  fontSize: 14,
  color: "#7C7C72",
};

export default ({ result }: { result: any }) => {
  console.log(result.course_of_study ? result.course_of_study.raw : "NA");
  return (
    <div>
      <li className="sui-result">
        <div className="sui-result__header">
          <span
            className="sui-result__title"
            // Snippeted results contain search term highlights with html and are
            // 100% safe and santitized, so we dangerously set them here
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
              <span style={result_category}>Role: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html: result.role ? result.role.snippet : "NA",
                }}
              />
            </li>
            <li>
              <span style={result_category}>Organisation: </span>
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
              <span style={result_category}>School graduated from: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html: result.school ? result.school.snippet : "NA",
                }}
              />
            </li>
            <li>
              <span style={result_category}>Course of study: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html: result.course_of_study
                    ? result.course_of_study.raw
                    : "NA",
                }}
              />
            </li>
            <li>
              <span style={result_category}>Biography: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html: result.full_bio ? result.full_bio.snippet : "NA",
                }}
              />
            </li>
          </ul>
        </div>
      </li>
    </div>
  );
};
