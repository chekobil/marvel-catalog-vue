declare global {
    interface Catalog {
        offset?: number;
        limit?: number;
        total?: number;
        count?: number;
        results?: Comic[];
      }
      
      interface EmptyComic {
        id?: number;
        title?: string;
        pageCount?: number;
        urls?: Url[];
        characters?: Characters;
        creators?: Creators;
        images?: Image[];
      }

      interface Comic {
        id: number;
        digitalId: number;
        title: string;
        issueNumber: number;
        variantDescription: string;
        description: string;
        modified: string;
        isbn: string;
        upc: string;
        diamondCode: string;
        ean: string;
        issn: string;
        format: string;
        pageCount: number;
        textObjects: TextObject[];
        resourceURI: string;
        urls: Url[];
        series: Series;
        variants: Variant[];
        collections: any[];
        collectedIssues: any[];
        dates: Date[];
        prices: Price[];
        thumbnail: Thumbnail;
        images: Image[];
        creators: Creators;
        characters: Characters;
        stories: Story[];
        events: Events;
      }
      
      interface TextObject {
        type: string;
        language: string;
        text: string;
      }
      
      interface Url {
        type: string;
        url: string;
      }
      
      interface Series {
        resourceURI: string;
        name: string;
      }
      
      interface Variant {
        resourceURI: string;
        name: string;
      }
      
      interface Date {
        type: string;
        date: string;
      }
      
      interface Price {
        type: string;
        price: number;
      }
      
      interface Thumbnail {
        path: string;
        extension: string;
      }
      
      interface Image {
        path: string;
        extension: string;
      }
      
      interface Creators {
        available: number;
        collectionURI: string;
        items: Creator[];
      }
      
      interface Creator {
        resourceURI: string;
        name: string;
        role: string;
      }
      
      interface Characters {
        available: number;
        collectionURI: string;
        items: any[];
      }
      
      interface Story {
        resourceURI: string;
        name: string;
        type: string;
      }
      
      interface Events {
        available: number;
        collectionURI: string;
        items: any[];
      }
    }