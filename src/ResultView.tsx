import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const ResultView = ({ result }: { result: any }) => {
  const {
    course_of_study,
    full_bio,
    industries,
    name,
    organisation,
    role,
    school,
  } = result;
  const MobileView = useMediaQuery("(max-width:800px)");
  if (MobileView) {
    return (
      <div>
        <li className="sui-result">
          <div className="sui-result__header">
            <span
              className="sui-result__title"
              dangerouslySetInnerHTML={{
                __html: name && name.snippet ? name.snippet : "NA",
              }}
            />
          </div>
          <div
            className="sui-result__image"
            style={{
              width: "100%",
              display: "flex",
              position: "relative",
              justifyContent: "center",
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
              className="mentor-image"
            />
          </div>
          <div className="sui-result__body">
            <ul className="sui-result__details">
              <li>
                <span className="sui-result__label">Industries: </span>
                <span
                  className="sui-result__value"
                  dangerouslySetInnerHTML={{
                    __html:
                      industries && industries.raw
                        ? industries.raw.join(", ")
                        : "NA",
                  }}
                />
              </li>
              <li>
                <span className="sui-result__label">Role: </span>
                <span
                  className="sui-result__value"
                  dangerouslySetInnerHTML={{
                    __html: role && role.snippet ? role.snippet : "NA",
                  }}
                />
              </li>
              <li>
                <span className="sui-result__label">Organisation: </span>
                <span
                  className="sui-result__value"
                  dangerouslySetInnerHTML={{
                    __html:
                      organisation && organisation.snippet
                        ? organisation.snippet
                        : "NA",
                  }}
                />
              </li>
              <li>
                <span className="sui-result__label">
                  School graduated from:{" "}
                </span>
                <span
                  className="sui-result__value"
                  dangerouslySetInnerHTML={{
                    __html: school && school.snippet ? school.snippet : "NA",
                  }}
                />
              </li>
              <li>
                <span className="sui-result__label">Course of study: </span>
                <span
                  className="sui-result__value"
                  dangerouslySetInnerHTML={{
                    __html:
                      course_of_study && course_of_study.snippet
                        ? course_of_study.snippet
                        : "NA",
                  }}
                />
              </li>
              <li>
                <span className="sui-result__label">Biography: </span>
                <span
                  className="sui-result__value"
                  dangerouslySetInnerHTML={{
                    __html:
                      full_bio && full_bio.snippet
                        ? full_bio.snippet + "..."
                        : "NA",
                  }}
                />
              </li>
            </ul>
          </div>
        </li>
      </div>
    );
  }
  return (
    <div>
      <li className="sui-result">
        <div className="sui-result__header">
          <span
            className="sui-result__title"
            dangerouslySetInnerHTML={{
              __html: name && name.snippet ? name.snippet : "NA",
            }}
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
              className="mentor-image"
            />
          </div>
          <ul className="sui-result__details">
            <li>
              <span className="sui-result__label">Industries: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html:
                    industries && industries.raw
                      ? industries.raw.join(", ")
                      : "NA",
                }}
              />
            </li>
            <li>
              <span className="sui-result__label">Role: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html: role && role.snippet ? role.snippet : "NA",
                }}
              />
            </li>
            <li>
              <span className="sui-result__label">Organisation: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html:
                    organisation && organisation.snippet
                      ? organisation.snippet
                      : "NA",
                }}
              />
            </li>
            <li>
              <span className="sui-result__label">School graduated from: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html: school && school.snippet ? school.snippet : "NA",
                }}
              />
            </li>
            <li>
              <span className="sui-result__label">Course of study: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html:
                    course_of_study && course_of_study.snippet
                      ? course_of_study.snippet
                      : "NA",
                }}
              />
            </li>
            <li>
              <span className="sui-result__label">Biography: </span>
              <span
                className="sui-result__value"
                dangerouslySetInnerHTML={{
                  __html:
                    full_bio && full_bio.snippet
                      ? full_bio.snippet + "..."
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
