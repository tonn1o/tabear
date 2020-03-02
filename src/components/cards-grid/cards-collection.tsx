import React, {Dispatch, useContext, useState} from 'react';
import { Bookmark } from '../../models/bookmark';
import { Collection } from '../../models/collection';
import styled from "styled-components";
import Card from "./card";
import CardsCollectionHeader from "./cards-collection-header";
import { LayoutType } from "../../models/layout-type";
import DropWrapper from "../dnd/drop-wrapper";
import CardsPlaceholder from "./cards-placeholder";
import { LayoutConfigContext } from "../../store/layout-config-context";
import { DnDDestination } from "../../models/dnd-destination";
import {
  CARD_HEIGHT,
  CARD_ROW_GAP,
  COLLECTION_BOTTOM_MARGIN,
  COLLECTION_TOP_MARGIN, CONTAINER_MARGIN,
  DraggableItemTypes,
  WRAPPER_MARGIN
} from "../../constants";
import { getMaxGridCollectionHeight } from "../../utils/get-max-grid-collection-height";

const CardsCollection = (props: PropTypes) => {
  const { bookmarks, collection, moveCard, setDraggingItemId, draggingItemId } = props;
  const { id, name, description } = collection;
  const { BOOKMARK, TAB } = DraggableItemTypes;

  const { maxItemsPerRow } = useContext(LayoutConfigContext);
  const [ isCollectionCollapsed, toggleCollection ] = useState<boolean>(false);

  const hasBookmarks = !!bookmarks.length;

  const rows = Math.ceil(bookmarks.length / maxItemsPerRow);
  const maxCollectionHeight = getMaxGridCollectionHeight(isCollectionCollapsed, rows);

  const destination: DnDDestination = {
    type: DraggableItemTypes.BOOKMARK,
    id,
    index: bookmarks.length
  };

  return (
    <DropWrapper
      acceptType={[ BOOKMARK, TAB ]}
      destination={destination}
      moveCard={moveCard}
    >
      <OuterWrapper>
        <Wrapper>
            <CardsCollectionHeader
              name={name}
              description={description}
              isCollectionCollapsed={isCollectionCollapsed}
              toggleCollection={() => toggleCollection(!isCollectionCollapsed)}
            />
          <InnerWrapper
            maxCollectionHeight={maxCollectionHeight}
            hasBookmarks={isCollectionCollapsed || hasBookmarks}
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
                        draggingItemId={draggingItemId}
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
  draggingItemId?: string | null
  setDraggingItemId: Dispatch<string | undefined>
  layoutType: LayoutType
  moveCard: (source: any, destination: any, draggableId: string) => void
}

const OuterWrapper = styled.div`
  padding: 0 ${CONTAINER_MARGIN}px;
`;

const Wrapper = styled.div`
  margin: 0 0 40px;
  width: 100%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
  border: 1px solid #f4f4f4;
`;

const InnerWrapper = styled.div`
  padding: 0 ${WRAPPER_MARGIN}px 10px;
  height: ${({ hasBookmarks, maxCollectionHeight }: { hasBookmarks: boolean, maxCollectionHeight: number }) => hasBookmarks ? `${maxCollectionHeight}px` : 'auto'};
  transition: height .3s;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 230px));
  grid-auto-rows: ${CARD_HEIGHT}px;
  grid-column-gap: 20px;
  grid-row-gap: ${CARD_ROW_GAP}px;
  margin: ${COLLECTION_TOP_MARGIN}px 0 ${COLLECTION_BOTTOM_MARGIN}px;
`;
