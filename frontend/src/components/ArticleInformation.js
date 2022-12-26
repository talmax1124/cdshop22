import React, { useEffect } from "react";

const ArticleInformation = ({ Article }) => {
  useEffect(() => {
    const articleDesc = document.querySelector(".articleDesc");
    if (articleDesc) {
      articleDesc.innerHTML = Article.description;
      let images = document.querySelectorAll(".articleDesc img");
      if (images) {
        images.forEach((item) => {
          item.style.width = "100%";
        });
      }
    } else {
      console.log("Article Information is not found");
    }
  }, [Article]);

  return <p className="articleDesc"></p>;
};

export default ArticleInformation;
