import React from "react";

export default ({ result }: { result: any }) => {
  //console.log(result.course_of_study ? result.course_of_study.raw : "NA");
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
              <span className="sui-result__key">Industries</span>{" "}
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html: result.industries ? result.industries.snippet : "NA",
                }}
              />
            </li>
            <li>
              <span className="sui-result__key">Organisation</span>{" "}
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
              <span className="sui-result__key">Role</span>{" "}
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html: result.role ? result.role.snippet : "NA",
                }}
              />
            </li>
            <li>
              <span className="sui-result__key">Biography</span>{" "}
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html: result.full_bio ? result.full_bio.raw : "NA",
                }}
              />
            </li>
            <li>
              <span className="sui-result__key">Course of study</span>{" "}
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
              <span className="sui-result__key">School graduated from</span>{" "}
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html: result.school ? result.school.snippet : "NA",
                }}
              />
            </li>
          </ul>
        </div>
      </li>
    </div>
  );
};
