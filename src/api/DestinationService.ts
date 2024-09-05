import {GenericStorageService} from "./GenericStorageService.ts";

const NAME = "destinations";

export interface DestinationListItem {
  destination: string;
  addedOn: Date;
  jsonTemplates: JsonTemplate[];
}

export interface JsonTemplate {
  json: string;
  lastOpenedOn: Date;
}

const defaultTemplate: JsonTemplate = {
  json: JSON.stringify({ id: 1 }),
  lastOpenedOn: new Date(),
};

const destinationService = new GenericStorageService<DestinationListItem>(NAME, "destination");

export const saveDestinationIfNotSaved = (destination: string) => {
  const destinations = getAllDestinations();
  if (!destinations.includes(destination)) {
    addDestinationItem(destination);
  }
};

export const getAllDestinations = (): string[] => {
  return destinationService.getAllItemsSortedByDate();
};

export const getAllDestinationsItems = (): DestinationListItem[] => {
    return destinationService.getAllItems()
}
export const saveDestinationsList = (list : DestinationListItem[]) => {
    return destinationService.saveItemsList(list);
}

export const updateDestination = (destination: DestinationListItem) => {
  const existingItems = destinationService.getAllItems();
  const existingItem = existingItems.find(item => item.destination === destination.destination);

  if (existingItem) {
    existingItems[existingItems.indexOf(existingItem)] = destination;
    destinationService.saveItemIfNotSaved(destination);
  } else {
    console.error("Destination not found");
  }
};

const addDestinationItem = (destination: string) => {
  const newItem: DestinationListItem = {
    destination: destination,
    addedOn: new Date(),
    jsonTemplates: [defaultTemplate, defaultTemplate, defaultTemplate],
  };
  destinationService.addItem(newItem);
};

export const removeDestinationItem = (destination: string) => {
  destinationService.removeItem(destination);
};