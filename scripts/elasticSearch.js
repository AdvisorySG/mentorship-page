export function elasticSearch(query, callback) {
  // var baseUrl = "https://advisorysg.kb.ap-southeast-1.aws.found.io/";
  var baseUrl = "https://advisorysg.ent.ap-southeast-1.aws.found.io";
  var engine = "mentorship-page";
  var searchOnlyKey = "search-bv3s7kksqjinbswx7g4my9ur";

  console.log("why");
  var searchReq = new XMLHttpRequest();

  // error debugging
  searchReq.onerror = function (XMLHttpRequest, textStatus, errorThrown) {
    console.log("Data failed to load");
    console.log(JSON.stringify(XMLHttpRequest));
  };

  searchReq.onload = function () {
    console.log("success");
  };

  // var query = "test";
  // var payload = { query: query };
  var payload = {
    filters: {
      date: {
        from: "2024-03-15T12:00:00+00:00",
        to: "2024-05-19T00:00:00+00:00",
      },
    },
  };
  searchReq.open("POST", `${baseUrl}/api/as/v1/engines/${engine}/analytics`);
  searchReq.addEventListener("load", callback);
  searchReq.setRequestHeader("Content-Type", "application/json");
  searchReq.setRequestHeader("Authorization", `Bearer ${searchOnlyKey}`);
  searchReq.setRequestHeader("Access-Control-Allow-Origin", "*");
  searchReq.send(JSON.stringify(payload));

  // return resposne
  console.log(searchReq.responseText);
}
