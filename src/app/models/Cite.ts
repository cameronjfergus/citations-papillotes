export interface CiteI {
  getId(): number;
  getAuthor(): string;
  getCite(): string;
  getTags(): Array<string|null>;
  setId(id: number): CiteI;
  setAuthor(author: string): CiteI;
  setCite(cite: string): CiteI;
  setTags(tags: Array<string|null>): CiteI;
  addTag(tag: string): CiteI;
  hasTags(): boolean;
}

export class Cite implements CiteI {
  private id: number;
  private author: string;
  private cite: string;
  private tags?: Array<string> = [];

  constructor() {
    this.tags = [];
  }

  getId(): number {
    return this.id;
  }

  setId(id: number): CiteI {
    this.id = id;

    return this;
  }

  getAuthor(): string {
    return this.author;
  }

  setAuthor(author: string): CiteI {
    this.author = author;

    return this;
  }

  getCite(): string {
    return this.cite;
  }

  setCite(cite: string): CiteI {
    this.cite = cite;

    return this;
  }

  getTags(): Array<string|null> {
    return this.tags;
  }

  setTags(tags: Array<string|null> = []): CiteI {
    this.tags = tags;

    return this;
  }

  addTag(tag: string): CiteI {
    if (!this.tags.includes(tag.trim())) {
      this.tags.push(tag.trim());
    }

    return this;
  }

  hasTags(): boolean {
    return !!this.tags.length;
  }
}
