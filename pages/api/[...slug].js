var request = require("request");

export default function handler(req, res) {
  let blog = "https://lolitopia.com/";
  let url = `${blog}${req.query.slug.join("/")}`;
  request.get(url).pipe(res);
}
