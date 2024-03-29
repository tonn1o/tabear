import React from 'react';
import { LayoutType } from "../models/layout-type";
import { LAYOUT_TYPES_CODES } from "../constants";
import MasonryLayout from "./lists-masonry/lists-masonry";
import { Collection } from "../models/collection";
import { Bookmark } from "../models/bookmark";
import CardsCollection from "./cards-grid/cards-collection";
import CardsGrid from "./cards-grid/cards-grid";
import { Bookmarks } from "../models/bookmarks";
import { Collections } from "../models/collections";
import CardsCollectionWrapper from "./cards-grid/cards-collection-wrapper";

class LayoutResolver extends React.Component<PropTypes, StateTypes> {
  private layoutComponents = {
    masonry: MasonryLayout,
    grid: CardsGrid
  };

  private layoutCollectionComponents = {
    masonry: CardsCollection,
    grid: CardsCollectionWrapper
  };

  constructor(props: any) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount(): void {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions(): void {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const { width } = this.state;
    const {
      layoutType,
      collectionsOrder,
      moveCard,
      moveCollection,
      bookmarks,
      collections,
      onDispatch,
      isSearchMode,
    } = this.props;

    const componentName = layoutType === LAYOUT_TYPES_CODES.Grid ? 'grid' : 'masonry';
    const Layout = this.layoutComponents[componentName];
    const LayoutCollection = this.layoutCollectionComponents[componentName];

    return (
      <Layout width={width}>
        {
          (collectionsOrder.map((collectionId: string, index: number) => {
            const collection: Collection = collections[collectionId];
            const bookmarksList: Bookmark[] =
              collection.bookmarksIds.map((id: string) => bookmarks[id]).filter(Boolean);

            return bookmarksList.length || !isSearchMode ? (
              <LayoutCollection
                key={collectionId}
                bookmarks={bookmarksList}
                moveCard={moveCard}
                moveCollection={moveCollection}
                collection={collection}
                collectionIndex={index}
                layoutType={layoutType}
                onDispatch={onDispatch}
              />
            ) : undefined;
          })).filter(Boolean)
        }
      </Layout>
    )
  }
}

interface PropTypes {
  layoutType: LayoutType
  collectionsOrder: string[]
  moveCard: (source: any, destination: any, draggableId: string) => void
  moveCollection: (source: any, destination: any, draggableId: string) => void
  onDispatch: () => any
  bookmarks: Bookmarks
  collections: Collections
  isSearchMode: boolean
}

type StateTypes = {
  width: number
  height: number
}

export default LayoutResolver;
