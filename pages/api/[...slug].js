var request = require("request");

export default function handler(req, res) {
  let blog = `https://${process.env.BLOG_URL}/`;
  let url = `${blog}${req.query.slug.join("/")}`;
  request.get(url).pipe(res);
}
