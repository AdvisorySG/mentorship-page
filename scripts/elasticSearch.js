export async function elasticSearch(mentor_name) {
  var baseUrl = "https://advisorysg.ent.ap-southeast-1.aws.found.io";
  var engine = "mentorship-page";
  var ELASTIC_SEARCH_KEY = "search-bv3s7kksqjinbswx7g4my9ur";
  // var payload = {
  // 	query: {
  // 		query_string: {
  // 			query: mentor_name,
  // 			default_field: "name",
  // 		},
  // 	},
  // };
  var payload = {
    query: {
      match: {
        name: mentor_name,
      },
    },
  };
  console.log("payload", payload);

  const response = await fetch(
    `${baseUrl}/api/as/v1/engines/${engine}/search`,
    {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "no-cors", // no-cors, *cors, same-origin
      //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ELASTIC_SEARCH_KEY}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      //redirect: "follow", // manual, *follow, error
      //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(payload), // body data type must match "Content-Type" header
    }
  );
  // .then(function (response) {
  // 	if (response.status != 200) {
  // 		console.log("search Status code: " + response.status);
  // 		return;
  // 	}

  // 	// examine text in response
  // 	response.json().then(function (data) {
  // 		console.log("elasticdata", data);
  // 		return data;
  // 	});
  // })
  // .catch(function (err) {
  // 	console.log("Fetch error :-S", err);
  // });
  return response;
}
