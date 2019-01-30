export class List {
  _id: string;
  title: string;
  date: Date;
  isMain: Boolean;
  constructor(name: string) {
    this.title = name;
    this.date = new Date();
    this.isMain = false;
  }
}
