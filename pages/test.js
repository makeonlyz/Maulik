var request = require('request');


function Page() {
  app.get('/fileThumbnail', function(req, res) {
      var url = proxiedURL +"?" + querystring.stringify(req.query);
      logger.info('/fileThumbnail going to url', url); 
      request.get(url).pipe(res);
  });

}

export default Page