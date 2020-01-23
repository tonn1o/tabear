import React from 'react';
import BookmarkCardImage from "./bookmark-card-image";
import styled from "styled-components";

const BookmarkCardInfo = ({
  name,
  description,
  url,
  iconUrl
}: PropTypes) => {
  return (
    <Wrapper>
      <Header>
        <BookmarkCardImage url={url} iconUrl={iconUrl}/>
        <Title>{name}</Title>
      </Header>
      <Description>{description}</Description>
    </Wrapper>
  );
};

interface PropTypes {
  name: string
  description: string
  url?: string
  iconUrl?: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  height: 100%;
  padding: 0 12px;
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  height: 2.2em;
  font-size: 14px;
  line-height: 1.1em;
  padding: 13px 0 13px 10px;
  overflow: hidden;
  box-sizing: content-box;
  background: #F3F2F8;
  color: #3c78bf;
`;

const Title = styled.p`
  display: flex;
  width: 100%;
  padding: 12px 0 0 15px;
  margin: 0;
  color: #000;
  font-weight: 600;
`;

export default BookmarkCardInfo;