import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="w-full flex items-center formsubmit">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-1 ml-sm-5 w-full rounded-sm search-input"
      ></Form.Control>
      <Button
        type="submit"
        className="p-2 rounded-sm bg-slate-400 hover:bg-slate-500 search-btn"
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
