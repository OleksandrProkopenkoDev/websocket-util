
const NAME = "destinations"
export interface DestinationListItem {
  destination : string
  addedOn : Date
  jsonTemplates : JsonTemplate[]
}

export interface JsonTemplate {
  json : string,
  lastOpenedOn : Date
}

const defaultTemplate : JsonTemplate =
    {
      json : JSON.stringify({
        id: 1
      }),
      lastOpenedOn : new Date()
    }

export const saveDestinationIfNotSaved = (destination : string) => {
  let destinations = getAllDestinations();
  if (!destinations.includes(destination)) {
    addDestinationItem(destination)
  }
}

export const getAllDestinations = () : string[] =>  {
  return getAllDestinationsItems()
  .sort(function(a,b){
    return new Date(b.addedOn) - new Date(a.addedOn);
  })
  .map((e) => e.destination)
}

export const UpdateDestination = (destination : DestinationListItem) => {
  let list = getAllDestinationsItems();
 let elem =  list.find((e) => e.destination === destination.destination)
  if (elem) {
    list[list.indexOf(elem)] = destination;
    saveList(list)
  } else console.error("not found")
}

const addDestinationItem = (destination : string) => {
  let list =getAllDestinationsItems();
  let item : DestinationListItem = {
    destination : destination,
    addedOn : new Date(),
    jsonTemplates: [
        defaultTemplate,
        defaultTemplate,
        defaultTemplate
    ]
  }
  list.push(item)
  saveList(list)
}

export const removeDestinationsItem = (destination : string) => {
  let list = getAllDestinationsItems();
  let newList = list.filter((e) => e.destination !== destination)
  saveList(newList)
}

export const getAllDestinationsItems = (): DestinationListItem[] => {
  let list = localStorage.getItem(NAME)
  if (list) {
    return JSON.parse(list).sort(function (a, b) {
      return new Date(b.addedOn) - new Date(a.addedOn);
    });
  } else {
    saveList([])
    return []
  }
}

const saveList = (list :  DestinationListItem[]) => {
  localStorage.setItem(NAME, JSON.stringify(list))
}