import axios from "axios";

const requestOptions = {
  method: 'GET',
  url: 'https://youtube-mp36.p.rapidapi.com/dl',
  params: {},
  headers: {
    'X-RapidAPI-Key': '8fe86ff132msh0c737acaccdaf3fp1e1b81jsne69b3d9bfdc3',
    'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
  }
};

const fetch = async (id) => {
    requestOptions.params = { id };
    const response = await axios.request(requestOptions);
    return response;
}

export { fetch };