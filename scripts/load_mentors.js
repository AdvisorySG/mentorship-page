import axios from "axios";

export const loadData = async () => {
  const response = await axios.get(
    `https://d3f3pna2dcek92.cloudfront.net/?sort%5B0%5D%5Bfield%5D=Name`
  );
  var mentors = response.data.records;

  var offset = response.data.offset;

  while (offset) {
    const response = await axios.get(
      `https://d3f3pna2dcek92.cloudfront.net/?sort%5B0%5D%5Bfield%5D=Name&offset=${offset}`
    );
    mentors = mentors.concat(response.data.records);

    if (response.data.offset) {
      offset = response.data.offset;
    } else {
      offset = "";
    }
  }

  var mentorsJson = JSON.stringify(mentors);
  return mentorsJson;
};
