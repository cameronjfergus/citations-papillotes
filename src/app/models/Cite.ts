export interface CiteI {
  id: number;
  author: string;
  cite: string;
  getId(): number;
  getAuthor(): string;
  getCite(): string;
  setId(id: number): CiteI;
  setAuthor(author: string): CiteI;
  setCite(cite: string): CiteI;
}

export class Cite implements CiteI {
  id: number;
  author: string;
  cite: string;

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
}
