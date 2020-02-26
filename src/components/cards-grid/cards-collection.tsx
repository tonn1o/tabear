import React, {Dispatch, useContext, useState} from 'react';
import { Bookmark } from '../../models/bookmark';
import { Collection } from '../../models/collection';
import styled from "styled-components";
import Card from "./card";
import {
  CARD_GAP,
  CARD_HEIGHT,
  COLLECTION_BOTTOM_MARGIN,
  COLLECTION_TOP_MARGIN,
  DraggableItemTypes
} from "../../constants";
import CardsCollectionHeader from "./cards-collection-header";
import { LayoutType } from "../../models/layout-type";
import DropWrapper from "../dnd/drop-wrapper";
import CardsPlaceholder from "./cards-placeholder";
import {LayoutTypeContext} from "../../store/layout-type-context";
import {LayoutConfigContext} from "../../store/layout-config-context";

const CardsCollection = ({
  bookmarks,
  collection,
  onAddBookmarkButtonClick,
  moveCard,
  setDraggingItemId,
  draggableItemId,
  layoutType,
}: PropTypes) => {
  const {
    id, name, description,
  } = collection;

  const { maxItemsPerRow } = useContext(LayoutConfigContext);
  const rows = Math.ceil(bookmarks.length / maxItemsPerRow);
  const [ isCollectionCollapsed, toggleCollection ] = useState<boolean>(false);
  const maxCollectionHeight = isCollectionCollapsed ? 0 : ((CARD_HEIGHT + CARD_GAP + COLLECTION_TOP_MARGIN + COLLECTION_BOTTOM_MARGIN) * rows - CARD_GAP);
  const hasBookmarks = !!bookmarks.length;
  const destination = {
    type: DraggableItemTypes.BOOKMARK,
    id,
    index: 0
  };

  return (
    <DropWrapper
      acceptType={DraggableItemTypes.BOOKMARK}
      destination={destination}
      moveCard={moveCard}
    >
      <OuterWrapper>
        <Wrapper>
            <CardsCollectionHeader
              name={name}
              description={description}
              isCollectionCollapsed={isCollectionCollapsed}
              disabled={!hasBookmarks}
              toggleCollection={() => toggleCollection(!isCollectionCollapsed)}
            />
          <InnerWrapper
            // @ts-ignore
            maxCollectionHeight={maxCollectionHeight}
          >
            {
              hasBookmarks ? (
                <Grid>
                  {
                    bookmarks.map((bookmark: Bookmark, index: number) => (
                      <Card
                        key={bookmark.id}
                        index={index}
                        collectionId={id}
                        bookmark={bookmark}
                        draggableItemId={draggableItemId}
                        moveCard={moveCard}
                        setDraggingItemId={setDraggingItemId}
                      />
                    ))
                  }
                </Grid>
              ) : (
                <CardsPlaceholder/>
              )
            }
          </InnerWrapper>
        </Wrapper>
      </OuterWrapper>
    </DropWrapper>
  );
};

export default CardsCollection;

type PropTypes = {
  bookmarks: Bookmark[]
  collection: Collection
  collectionIndex: number
  draggableItemId: string | null
  onAddBookmarkButtonClick: (id: string) => void
  setDraggingItemId: Dispatch<string | null>
  layoutType: LayoutType
  moveCard: (source: any, destination: any, draggableId: string) => void
}

const OuterWrapper = styled.div`
  padding: 0 30px;
`;

const Wrapper = styled.div`
  margin: 0 0 40px;
  padding: 10px 20px;
  width: 100%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 2px 2px 40px -12px #999;
  border: 1px solid #f4f4f4;
`;

const InnerWrapper = styled.div`
  overflow: hidden;
  max-height: ${(props: any) => props.maxCollectionHeight}px;
  transition: max-height .3s;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 230px));
  grid-auto-rows: 130px;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  margin: 25px 0 15px;
`;

