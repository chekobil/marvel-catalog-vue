declare global {
    interface Catalog {
        offset?: number;
        limit?: number;
        total?: number;
        count?: number;
        results?: Comic[];
      }
      
      interface CharacterCatalog {
        offset?: number;
        limit?: number;
        total?: number;
        count?: number;
        results?: Character[];
      }

      interface CharacterEmitData {
        text: string, character: CharacterValue
      }
      
      interface CharacterValue {
        id?: number, name?: string
      }

      interface Character {
        id: number;
        name: string;
        description: string;
        modified: string;
        thumbnail: Thumbnail;
        resourceURI: string;
        comics: Comics;
        series: Comics;
        stories: Comics;
        events: Comics;
        urls: Url[];
      }
      
      interface Thumbnail {
        path: string;
        extension: string;
      }
      
      interface ComicsParams {
        limit?: number;
        titleStartsWith?: string;
        characters?: number | string
      }

      interface Comics {
        available: number;
        collectionURI: string;
        items: any[]; // We don't know the exact structure of the items yet
        returned: number;
      }
      
      interface Url {
        type: string;
        url: string;
      }

      interface EmptyComic {
        id?: number;
        title?: string;
        description?: string;
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
        available?: number;
        collectionURI?: string;
        items?: any[];
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