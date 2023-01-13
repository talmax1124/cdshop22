import asyncHandler from "express-async-handler";
import Article from "../models/articleModel.js";

// @desc    Fetch all articles
// @route   GET /api/articles
// @access  Public
const getArticles = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Article.countDocuments({ ...keyword });
  const articles = await Article.find({
    $or: [{ ...keyword }],
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort([["createdAt", -1]]);

  res.json({ articles, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single article
// @route   GET /api/articles/:id
// @access  Public
const getArticleById = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (article) {
    res.json(article);
  } else {
    res.status(404);
    throw new Error("Article not found");
  }
});

// @desc    Delete a article
// @route   DELETE /api/articles/:id
// @access  Private/Admin
const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (article) {
    await article.remove();
    res.json({ message: "Article Deleted" });
  } else {
    res.status(404);
    throw new Error("Article not found");
  }
});

// @desc    Create a article
// @route   POST /api/articles
// @access  Private/Admin
const createArticle = asyncHandler(async (req, res) => {
  const article = new Article({
    name: "Title Name",
    user: req.user._id,
    image:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgSFRIYGBgYGBgYGBgYGRgYGBgYGBgaGRoYGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8PGBERGDEhGCE0NDQ0MTQxMTExNDQxMTQ0NDQxMTQxPzE/MTExPzQ/MT8xMTExMTE0MTExPzExMTExMf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQIDBAUGB//EAEIQAAIBAgMEAw0IAgEDBQAAAAECAAMRBBIhBRMxUQZBUgcUFiIjMmFxgZGSk9MVM1NyobHR8ELBJUNi4SQmgqKy/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFxEBAQEBAAAAAAAAAAAAAAAAABEBMf/aAAwDAQACEQMRAD8A+zREQEREBERAREQEREBERAREQEREBERAREi8CYlcw5yu8XtD3wMkTEa69oSvfK8/0MDNE1jjF9PujvwdlvcP5gbMTT78/wC0+2QcYez+sLG9Ew0awYXEzQhERAREQEREBERAREQEgmTOfjxciBu7xe0PeJXfr2h75z1prbhIWit9eElWOh3wnaEjvhef7zRWmP7eN2v9JikbhxSypxi+maboOX6yiqOX7xVjdOOHKQcd6P1moUHL9TJyDlBGc448hKnHH0TAUHKTuxygZxiGOt5Q1mv5xlMsxkawLmsecbwyuWSVHKBBeRmgqOUnIP7eBAaTmMkJJCQKFjB15/tLbqCkKqBLD0ySgMMIRKBh5ptabeCxeca8euaSNyPrkbM+8f8ANGGu3ERKyREQEREBERAREQImnjFuR6puTTxnEQuMGQ2NiL9VxcX6ri4v75jFOr+Iny3+pNlBPPdPcKrYKu+Z1elSqPTZKjoVYLe5yEZhoNDcSK65p1fxE+W/1JBSr+Iny3+pPD9B9hJitn06r1sQtZzVG9TEV1cZarqpAz5TYAcR1TY6DdIK7YivszFuHrUCxSrYAuiMFOYDS9mVgeJDG+ouQ9cUq/iJ8t/qSm6q9tPlv9SeV7qe0KiYbc0Cwd71HZCVZKFFkLvccPGemPUW5Gei6NbVGKw1LEC13QZwOp18V19jBoG2adTtp8t/qSoSr20+W/1J86XA/wDNnB77Ebjd5933ziLZt0Gtmz5rZtbX/TST07olNoYKnTrV1TE1FFVVr1grZq1NDlGbxbqxHi2gfRd3V7afLf6ksEq/iJ8t/qTJQpKiqi3soCi7M5sObMSWPpJJnzXujbPq4d6eOpVa5oGoO+KQxFYLmL5tLP4qsMy6EBTltxgfRSlXt0/lv9SUyVe2ny3+pPMbZVMccLSw9aqudVrtUp1KiZMLws4DWLu1kGYEjKx/xIPrcNQVEWmt8qgAZmZ2sObOSWPpJMDEUq9tPlv9SRkq9tPlv9SfN+k5xWDxtTFYV6j0qKUXrUmq1HXLWNUMcrE2XyfEeaWB4A29BtnG0cbs84ujUqIVtlKVHpujl0V0cKwBNtNbjW443geo3VXtp8t/qSd3V7afLf6k8T3S8CMPghVo1K6OjrTVhiK5JRmckNdzmNze514C9tJsLsbD1MPSpricQmJr0MyOMTiWs4phmdkLkZQSLi3XYQPXhKvbT5b/AFIyVe3T+W/1J4fulYGsmDXE061VKtLdpUNOrVVGUjKTlBAuHKnNa5HHqtl6RbVYbJpHC589empQh2aoiKhr1mLsxYlVRlve92AHVA9pkq9tPlv9SQadX8RPlv8AUnin2h35smlVzutdjToKyVHRhiGqLRLHIwzDUvY3FpHTvF95pg6AasuFaqRiHWo7VWVSrZN4Wz+NdyQCDZLCw0ge3yVe2ny3+pLU0f8AzZTyyqV992a/6TzOzsJTqPh6+AxbNh1qFq9IVndSDSZV8VyWRgzLdDYHQkXUT1oEDFlmPZn3j/mmciYdnfev+b/QjDXbiIlZIiICIiAiIgIiIETUxfEe2bc1MZxHthcQs8/06qBcBirsBehUAubXJUgAcySRO8k8h082ulF8NSfZ9PFtWNQItQoMrKEvlzowuwb0cANbyK1u5ttOhT2XTapWRAjVs+d1XLes7C4J5EG3XcTldAsM+Ix+K2sUZKL51pFhlzhmQBhfqCILnhdrX0M0G6W0qTj/ANu0kqWBGUUywBvbVaJIJsTbjYX4Te2h3SHVGFbZXkyVRw9ZGQ7xCyoRuyGBUE9Y6jrpCOzhA+Mq4rEUnw70XBwih1d700vnIyOAA71H9YRTOJ3LcacPWxOy6tQFkqM9M30YqclTL6wEcD0t6ZiwvTYUUFWlsNESsLZqVSmM6qWWzKlK9gcw8YfvNNemNBbVF6PUVykkMopgqVytm0oXW11IY29HA2DpriE8Iid4ttzkvmFs25By+v0SndFroNp7NJdRkqIz6jxF74pm7chZW48jOS3THCga9HaAAve6IALcb3oTZo9LqNcPXXYOHcZ/Hdnw9y5Gbxi9PMxtrfXrge96Q9JaOGp5t4juzKlOmHBZ2ZgvAG+UXuT6JtdI0RsLiFq5chpVA2Y2GiEjXqNwD6xPmSdL8OpGXo7SBuLWRAc1swt/6e97a/rNnH90paiWr7IV0BDjeuHQHUBhnokA+cAfXBXV7jgTvNyLZzWYPr41giFQR1Dxmt1anmZ9AnynZ3ThEK1aGxaSFxURXpvSRmFMK7rdaYNhdDY8bi1zN6p3TKyuaZ2W+cGxC1c+voKUyDwPA9R5GCvT4KrTbaGLTMjXw+FUrcG/jYnMCOvRluP+4c54PpHsats2q3e+uDxTKjIbkU3zKQp5EWOVusEqeAJyL01pIVrrsGmjZns65FcMmXObijmUjOtybed65tr3SWr03P2WtRFIzhsRTIvcFfEZLsc1rWBudBrA63dfqKMAVzAM1anlFxc2zE2HXoD7psbFwmz6VHDY4GhSKUAXdMiZ89NQ4qW1Y39t/XPL43p4lVg9bYSu4GUNUAdgAScoZqBNr5jb1zWrdL8KrIG2BhlZxmUHc5mBZk4bm4OZWFjY6QPodNhj8B4y5O+aDWF75S4OU35g5T7J5LuUU3qoTVXxMKtTDoDqc1Z95XB9QFNfaZDd0WpR8j9kMmTxAiVPFUgXyLkpZdADoOFjyMwJ3SxRUkbK3Su7OTvCiu7WLNfdAMxuLn1QMfQnAVKWPqbOP3WGrNihx4inuqV/WtVG9aT2nSXaVJa1DC4lEfD4haucut1RkalkLG9kUl7ZjwYrqJ5g9PHQ98/Y9jUVRvFrKWdQquoutMs1lqKbdQJ5Gyn3RajhmGyGYKhLE1DbIbXAzUvGB8XxRe/G1hA0tq7AXAY/CHAVWzV6gVqOfMRTBUuSeJplc/nXta4Omn1m8+V7D6a0lrItLYqYffVKdI1Fsn3jKBcikL6Nmy31n1O0LiJg2afKP+Y/pM5M1tlHyj/nb9zGGu9ERKyREQEREBERAREQImnjTqPb/qbk08aNV9v+oXGLOACSQANSToAB1kzy/TLoucc+HqJihQagzspyZyXY02UjxlsQad+u956LEuqo7MAVCMWB4FQpJBsDpb0GeZp7YwCsCtPDBkIsQrBlI0FvJXBkVwE6F1lBA26tiApvSQ+LkVbXaqdMip68oPEXl6nc8xLqt9r3CFSpXDhSpph1XK6VAdA7jj/keudtNu4DgEw2vINqPN/C9FvZNul0koKoCZAo4Bd4FHqApWhHncN3PsWiqibWyqgsqjDIQBmL9b6+MS2t9TLjoLjRf/mTre572S5uoQ657+aqj2CeiPSenzX31fpx4TU+ae+p9OFeWxPQHFFGV9seIVcMGw6quVtWv5QWGgPosJqp0FqLcjbS+eHYmmjksUZFLM1Uk3XMADpoeU9i/SSkQQchBBBB3hBB0II3U1vtXCa+Ro6kMfFfVlvYnyWpGZtfSYRwD0UxBu327TOpudxR4urcTvOtWb2EzBiehFV8yvttNSjMN1TU5kC5CctUEEDJY8svIT0o2lg/waHPzH42tf7rjH2nhL5tzQzaa5HvplA13XVkX4RygeaodBaqHKu2UuM7a0KbveqoNQlmqFvGXKSb6i0zHodiCW/5xdQMw3NO1lNhmXeWsC1vaByE79TauFZi5pUSx4sVck6BdTutdAB6o+1MJr5Gh42h8R9QbXB8lrwHugedxXQuqwamdsoFfRk3S2tlVCCWrFj4tNQSTfQ66m+Kn3Pailqg2yLs1NmZqSsS1Ns1Ilmqk6FdNf8AG2oE9Odq4WwG6o2F7DK9hc3Nhuus6yF2lhACoo0ADa4CPY5b5bjddVzb1wPOJ0PreKq7dQZTdQtOkLEujXFqupzrT/bgSDiqdAHdgDtpWbRcopqM2V2qKpRavjWfM1iDrflPULtLBjUUKHAjzH4EAH/pdYAEmntbCqQy0qKsvmkK4I87gRS085viPOBzPArGZUUbVAyG+ZcOMzWFlDXqWso0AAFvWAZo1e5tiGsW2qbgkgihlYFkWm1itQEAoiKRwIX1z1XhNT5r76n048JqfNffU+nCvMUO5ziUCqu1iAgsg3Fwoy1F0BqdmrUH/wA/QLZfAfFoAx2yFCganDUwFVTmGpewAOvsnfbpbQByl0BtexZwbc7buUqdKcM6srNSZSCGBZypB0IINOxHVA4SdBKoelVrbVV0o1kq2aiqgspQkF95oSEUa358Tr9ApVke+R1a3HKwa3Ea2OmoPuM8yvSHBhCoWhka9wM+U2te/krHgvuE6ewsXQcPuEpqBlzbsEA3LWvdF683PiYHVZZqbI89/wA7fuZuMZp7J+8f87fuYw3j0ERErJERAREQEREBERAiamM4j2/6m3NbFcR7YXGCtRV0ZGGjKVPqYWOvtnFborhTqaZ+I/3rPvncvpKtIrheCWD/AAf1MuOjGGGgQj0B2/mdgGWU6wOMejGG7DfG38yPBnDdhvjb+Z2qhlOvWByPBnDdhvjb+Y8GcN2G+Nv5nWzQHgck9GcN2G+Nv5keDOG7DfG38zrF5BeByT0Zw3Yb42/mR4NYbsN8bfzOsXkFoHK8GsN2G+Nv5kHo5hvw2+Nv5nVLcIZoHKXo3huw3xt/Mt4NYbsN8bfzOpmjNA5fg1huw3xt/MeDWG7DfG38zqF5YGBxn6L4UnWmT62JlV6J4Qf9L0eceHH/AFO3eLwON4KYTrpf/Yze2fsulQDCkuUNa4uTwva1+HnGbgMgmBVjMGyfPf8AMf3mwZr7KHlH/MYw3j0ESJMrJERAREQEREBERATVxfEe2bU1MUdR7YGNuExy7tpMeaRollMpeWSBLiUVT1zK0gGBjy6SMpEuZBMDHlgLwkkxeBUrx/vVIKySYvAOJXLLReBAX++yMsm8ZoEFZJBuJN4vAGSBIkiAEkxaDAo0wbKPlH/MZsGYNm/ev64w3jvxIkyskREBERAREQERECJp4/q9s3Jp48cPbC41ryTKgTIBIqtpkQSBJJgQxlbySZEBeQTIvIvAgyLw5lLwqxMi8qTIvCRcmM0oTEEXvF5SIItmjNK2kQrJmkhpikgwRlDyxMwgywMJEkzFs4+Vf1ySZTZZ8o/rMYa9BJiJWSIiAiIgIiICIiAmri+qbU1cX1QNbLLCVYyZGlklDJWQxgRIkFpQmBa8gtKkypMKl2lLyGMreBa8kSglwYEGReQTJgIvEiEqwMm8oDLXhUgy15QSbwJkSVaH4QKXkYD70/3rMqYwjje+rT9Sf9xibx6KTIEmVkiIgIiICIiAiIgJqY3/AB9s25pY88PXA1yZaY7ybyNL3lDJzTGzwIaQZBaVJhUkyCZUmReAMrJJlSYE3ls0peSDACWJkAyLwJvF5QmTmgWvJlM0Z4RcGTeYt5J3kKveSWmMPBeAeYsIfK/p7jLF5TA61Paf3/8AEmG8eoXhLSq8JaaYIiICIiAiIgIiICc7abWy+3/U6M5e18KzhSrWy30te97dd9OEDUSrLmpOYcNV6o71rSRqugakqXmh3rVkd71pIVv55GaaO5rRua0pW6XkF5pd7VY71qyQuNwtIzTV72qye96vKIXG0GklprDD1uX6SwwtXkPdELjPeULyjYSr/RK94VYhcZM8gvMf2dU5x9l1OZlhV88jeSPsmpzMDZFTmYhQvG8En7IfmZH2O/MxCoNQc5G8k/Yr8zJ+xG5mIVQuOczbLa7i3Vf/APRlBsR+ZnU2Vs3IbmIbrsCTESskREBERAREQEREBIIiIEZByjIOUiIE5BykZByiIDdjlG7HKRECcg5RkHKIgMg5RkHKIgTlHKMo5SIgTlHKMo5RECcsWiIC0WiIC0WiIC0WiIC0mIgIiICIiAiIgf/Z",
    author: "Carlos D",
    category: "Tutorial",
    description: "Sample description",
    content: "Sample content",
  });

  const createdArticle = await article.save();
  res.status(201).json(createdArticle);
});

// @desc    Update a article
// @route   PUT /api/articles/:id
// @access  Private/Admin
const updateArticle = asyncHandler(async (req, res) => {
  const { name, image, author, category, description, content } = req.body;

  const article = await Article.findById(req.params.id);

  if (article) {
    article.name = name;
    article.description = description;
    article.image = image;
    article.category = category;
    article.author = author;
    article.content = content;

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } else {
    res.status(404);
    throw new Error("Article not found");
  }
});

export {
  getArticles,
  getArticleById,
  deleteArticle,
  createArticle,
  updateArticle,
};
