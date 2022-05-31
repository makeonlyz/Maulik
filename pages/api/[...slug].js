import axios from "axios";

export default function handler(req, res) {
  let blog = "https://lolitopia.com/";
  let url = `${blog}${req.query.slug.join("/")}`;

  axios({
    method: "get",
    url,
  })
    .then(function (response) {
      var headers = { "Content-Type": "image/jpeg" };
      res.writeHead(200, headers);
      res.end(response.data, "binary");
    })
    .catch(function (error) {
      res.send("error:" + error);
    });
}
