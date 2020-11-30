export interface CiteI {
  author: string;
  cite: string;
  getAuthor(): string;
  getCite(): string;
  setAuthor(author: string): CiteI;
  setCite(cite: string): CiteI;
}

export class Cite implements CiteI {
  author: string;
  cite: string;

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
