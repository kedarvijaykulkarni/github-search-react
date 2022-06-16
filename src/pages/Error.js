import React from "react";
import styled from "styled-components";

const Error = () => {
  return (
    <Wrapper>
      <h1>404</h1>
      <h3>Sorry, page not found</h3>
      <a data-testid="back-search" href="/" className="btn">
        back to search
      </a>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    margin-bottom: 1.5rem;
  }
`;

export default Error;
