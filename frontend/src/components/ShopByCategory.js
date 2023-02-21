import React from "react";
// import { Row, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";

const ShopByCat = ({ products }) => {
  //GET CATEGORIES
  if (!products) {
    return <div></div>;
  }
  var categ = products
    .map((product) => {
      return { count: 1, product: product.category };
    })
    .reduce((a, b) => {
      a[b.product] = (a[b.product] || 0) + b.count;
      return a;
    }, {});
  var keys = Object.keys(categ); /* .map((k) => console.log(k)) */

  keys.map((cat, k) => console.log(cat));

  return (
    <div>
      <h1>Categories</h1>
      {/* <Row>
        {keys.map((cat, k) => (
          <Col key={k} md={3} className="mb-2">
            <Link to={`/products/category/${cat}`}>
              <div className="flex flex-col items-center justify-center">
                <h6>{cat}</h6>
              </div>
            </Link>
          </Col>
        ))}
      </Row> */}

      {/* <AppBar color="inherit" position="static">
        <Tabs
          variant="scrollable"
          scrollButtons="on"
          aria-label="scrollable force tabs example"
        > 
          {keys.map((cat, k) => (
            <Link to={`/products/category/${cat}`}>
              <Tab key={k} style={{ color: "black" }} label={cat} textColor="primary">
                {cat}
              </Tab>
            </Link>
          ))}
        </Tabs>
      </AppBar> */}
    </div>
  );
};

export default ShopByCat;
