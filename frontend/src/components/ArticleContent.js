import React, { useEffect } from "react";

const ArticleContent = ({ Article }) => {
  useEffect(() => {
    const articleContent = document.querySelector(".articleContent");
    if (articleContent) {
      articleContent.innerHTML = Article.content;
      let images = document.querySelectorAll(".articleContent img");
      if (images) {
        images.forEach((item) => {
          item.style.width = "100%";
        });
      }
    } else {
      console.log("Article Content is not found");
    }
  }, [Article]);

  return <p className="articleContent"></p>;
};

export default ArticleContent;
