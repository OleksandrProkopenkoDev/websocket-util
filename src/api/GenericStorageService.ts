import {message, notification} from "antd";

export class GenericStorageService<T extends { addedOn: Date }> {
  private readonly storageKey: string;
  private readonly identityField: keyof T;

  constructor(storageKey: string, identityField: keyof T) {
    this.storageKey = storageKey;
    this.identityField = identityField;
  }

  public saveItemIfNotSaved(item: T) : T {
    let items = this.getAllItems();
    let existingItem = items.find(e => e[this.identityField] === item[this.identityField]);
    if (!existingItem) {
      return this.addItem(item);
    } else {
      existingItem.addedOn = new Date();
      this.saveItemsList(items);
      return existingItem;
    }
  }

  public updateItemDate(identityValue: T[keyof T]) {
    let items = this.getAllItems();
    let item = items.find(e => e[this.identityField] === identityValue);
    if (item) {
      console.log("item found update date !")
      item.addedOn = new Date();
      console.log(items)
      this.saveItemsList(items);
    }
  }

  public updateItemProperty(identityValue: T[keyof T], propertyName : string, propertyValue : string) {
    let items = this.getAllItems();
    let item = items.find(e => e[this.identityField] === identityValue);
    if (item) {
      item[propertyName] = propertyValue;
      this.saveItemsList(items);
    }
  }

  public getAllItemsSortedByDate(): string[] {
    return this.getAllItems()
    .sort((a, b) => new Date(b.addedOn).getTime() - new Date(a.addedOn).getTime())
    .map(e => e[this.identityField]);
  }

  public addItem(item: T) : T {
    let items = this.getAllItems();
    items.push(item);
    this.saveItemsList(items);
    return item
  }

  public removeItem(identityValue: T[keyof T]) {
    let items = this.getAllItems();
    let filteredItems = items.filter(e => e[this.identityField] !== identityValue);
    this.saveItemsList(filteredItems);
  }

  public getAllItems(): T[] {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || "[]");
    } catch (e) {
      notification.warning({message: "Unexpected error when parse " +this.storageKey, description : "Please import data from another file"})
      return []
    }
  }


  public saveItemsList(items: T[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}
