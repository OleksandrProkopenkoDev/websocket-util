export class GenericStorageService<T extends { addedOn: Date }> {
  private readonly storageKey: string;
  private readonly identityField: keyof T;

  constructor(storageKey: string, identityField: keyof T) {
    this.storageKey = storageKey;
    this.identityField = identityField;
  }

  public saveItemIfNotSaved(item: T) {
    let items = this.getAllItems();
    let existingItem = items.find(e => e[this.identityField] === item[this.identityField]);
    if (!existingItem) {
      this.addItem(item);
    } else {
      existingItem.addedOn = new Date();
      this.saveItemsList(items);
    }
  }

  public updateItemDate(identityValue: T[keyof T]) {
    let items = this.getAllItems();
    let item = items.find(e => e[this.identityField] === identityValue);
    if (item) {
      item.addedOn = new Date();
      this.saveItemsList(items);
    }
  }

  public getAllItemsSortedByDate(): string[] {
    return this.getAllItems()
    .sort((a, b) => new Date(b.addedOn).getTime() - new Date(a.addedOn).getTime())
    .map(e => e[this.identityField]);
  }

  public addItem(item: T) {
    let items = this.getAllItems();
    items.push(item);
    this.saveItemsList(items);
  }

  public removeItem(identityValue: T[keyof T]) {
    let items = this.getAllItems();
    let filteredItems = items.filter(e => e[this.identityField] !== identityValue);
    this.saveItemsList(filteredItems);
  }

  public getAllItems(): T[] {
    let items = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
    return items;
  }

  public saveItemsList(items: T[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}
