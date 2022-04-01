import React from "react";

export default ({ result }: any) => {
  const openFullBio = "View Full Bio";
  const closeFullBio = "Close Full Bio";
  const [open, setOpen] = React.useState(false);
  const [buttonText, setButtonText] = React.useState("View Full Bio");
  const onButtonClick = () => {
    setOpen(!open);
    if (open) {
      setButtonText(openFullBio);
    } else {
      setButtonText(closeFullBio);
    }
  };
  
  return (<li className="sui-result">
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
          paddingTop: "10px"
        }}
      >
        <img
          src={result.thumbnail_image_url.raw}
          alt="thumb"
          style={{
            display: "block",
            width: "150px",
            height: "150px",
            objectFit: "cover",
            objectPosition: "center"
          }}
        />
      </div>
      <ul className="sui-result__details">
        <li>
          <span className="sui-result__key">Name</span>{" "}
          <span
            className="sui-result__value"
            dangerouslySetInnerHTML={{
              __html: result.name.snippet
            }}
          />
        </li>
        <li>
          <span className="sui-result__key">Industries</span>{" "}
          <span className="sui-result__value">{result.industries.snippet}</span>
        </li>
        <li>
          <span className="sui-result__key">Course of Study</span>{" "}
          <span className="sui-result__value">{result.course_of_study?.snippet}</span>
        </li>
        <li>
          <span className="sui-result__key">Organisation</span>{" "}
          <span className="sui-result__value">{result.organisation.snippet}</span>
        </li>
        <li>
          <span className="sui-result__key">Role</span>{" "}
          <span className="sui-result__value">{result.role.snippet}</span>
        </li>
        <button 
         style={{
          background: '#ff9700',
          border: 'none',
          }}
          onClick={() => onButtonClick()}>{buttonText} 
        </button>
        {open && <li>
          <span className="sui-result__key">Full Bio</span>{" "}
          <span className="sui-result__value">{result.full_bio.snippet}</span>
        </li>
        } 
      </ul>
    </div>
  </li>);
};
