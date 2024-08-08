export async function trackClicks(mentor_name) {
  const ELASTIC_SEARCH_KEY = "search-bv3s7kksqjinbswx7g4my9ur";
  var baseUrl =
    "https://advisorysg.ent.ap-southeast-1.aws.found.io/api/as/v1/engines/mentorship-page/search";
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${ELASTIC_SEARCH_KEY}`);

  // retrieve the search term found in the input
  const search_term = document.getElementById("downshift-1-input").value;

  // search query retrieves the mentor's info
  const searchQuery = JSON.stringify({
    query: search_term,
    filters: {
      name: [mentor_name],
    },
    result_fields: {
      name: {
        raw: {},
      },
    },
    page: {
      size: 1,
    },
  });

  // base request options
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: searchQuery,
    redirect: "follow",
  };

  // send post request to elasticsearch to retrieve mentor info
  await fetch(baseUrl, requestOptions)
    .then(function (response) {
      // if error is found return
      if (response.status != 200) {
        // console.log("search Status code: " + response.status, response);
        return;
      }

      // examine text in response
      response.json().then(function (dataResponse) {
        const resultsObj = dataResponse["results"][0];
        const document_id = resultsObj["id"]["raw"];

        // track click increment click count for mentor
        const trackClickQuery = JSON.stringify({
          query: mentor_name,
          document_id: document_id,
        });

        // update body to trackclickquery
        requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: trackClickQuery,
          redirect: "follow",
        };

        // update baseurl to click instead of search
        baseUrl =
          "https://advisorysg.ent.ap-southeast-1.aws.found.io/api/as/v1/engines/mentorship-page/click";

        // send post request to elasticsearch to track click when mentor profile is clicked
        fetch(baseUrl, requestOptions)
          .then(function (response) {
            if (response.status != 200) {
              // console.log(
              // 	"fetch Status code: " + response.status,
              // 	response
              // );
              return;
            } else {
              // console.log("success");
              return;
            }
          })
          .then(function (result) {
            return;
            console.log(result);
          })
          .catch(function (error) {
            return "error";
            console.error(error);
          });
        return;
      });
    })
    .then(function (result) {
      return;
      console.log(result);
    })
    .catch(function (error) {
      return;
      console.error(error);
    });
}
