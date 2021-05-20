export interface AuthorI {
  name: string;
  count: number;
  getName(): string;
  getCount(): number;
  addCount(): number;
}

export class Author implements AuthorI {
  name: string;
  count: number;

  constructor(name: string, count = 1) {
    this.name = name;
    this.count = count;
  }

  getName(): string {
    return this.name;
  }

  getCount(): number {
    return this.count;
  }

  addCount(): number {
    this.count++;

    return this.count;
  }
}
