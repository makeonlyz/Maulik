import dbConnect from "../mongodb/dbConnect";
import { useEffect } from "react";
import Post from "../mongodb/Post";
import config from "../config";

function Page({ data, redirect, pid }) {
  const id = data.id;
  const title = data.title["rendered"];
  const content_in = data.content["rendered"];

  useEffect(() => {
    if (redirect) {
      window.location.href = `https://${config.BLOG_URL}/post/${pid}`;
    }
  }, []);

  const content =
    '<!DOCTYPE html> <html> <head> <meta name="viewport" content="width=device-width, initial-scale=1"> <meta charset="utf-8"> <meta charset="UTF-8"> <title>' +
    title +
    '</title> <meta content="en_US"> <meta content="article"> <meta content="' +
    title +
    '"> <meta content=" ..."> <meta content=""> <meta content=""> <meta content="Animal"> <meta content="https://wildlifeephotography.vercel.app/wp-content/uploads/2021/04/cover10-6-1.png"> <meta content="' +
    title +
    '"> <style> * { box-sizing: border-box; } body { font-family: Arial; padding: 20px; background: #f1f1f1; } .card { background-color: white; padding: 20px; margin-top: 20px; } @media screen and (max-width: 800px) { .leftcolumn, .rightcolumn { width: 100%; padding: 0; } } </style> </head> <body> <a href="#">Home</a> <a href="#">News</a> <a href="#">Contact</a> <div class="row"> <div class="leftcolumn"> <div class="card"> <h2>' +
    title +
    "</h2> " +
    content_in +
    " </div> </body> </html> ";

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

export async function getServerSideProps({ params, req }) {
  const pid = params.pid;
  let data;
  await dbConnect();

  //check if post exist in mognodb
  let post = await Post.findOne({ pid });
  if (!post) {
    console.log("fetching from wordpress");
    const url = `https://${config.BLOG_URL}/?rest_route=/wp/v2/posts/${pid}`;

    const res = await fetch(url);
    data = await res.json(); //replace image url to use proxy api
    data.content["rendered"] = data.content["rendered"].replaceAll(
      `https://${config.BLOG_URL}/wp-content`,
      "/api/wp-content"
    );
    data.content["rendered"] = data.content["rendered"].replaceAll(
      `https://www.${config.BLOG_URL}/wp-content`,
      "/api/wp-content"
    );

    //save post to mongodb
    const post = new Post({
      pid,
      data,
    });

    await post.save();
  } else {
    console.log("found in mongodb");
    data = post.data;
  }

  return {
    props: {
      data,
      redirect: req?.headers?.referer?.toLowerCase().includes("facebook") ?? "",
      pid,
    },
  };
}

export default Page;
