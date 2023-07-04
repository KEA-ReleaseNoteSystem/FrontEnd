// moveItemWithinArray, insertItemIntoArray
export const moveItemWithinArray = (arr, item, newIndex) => {
  const arrClone = [...arr];
  
  console.log("** arrClone: ", arrClone);
  console.log("** item: ", item);
  
  const oldIndex = arrClone.indexOf(item);
  let temp = arr.splice(oldIndex,1);
  // arr.push(temp, newIndex)
  console.log("** temp: ", temp);
  arrClone.splice(newIndex+1, 0, temp[0]);
  console.log("** arrClone: ", arrClone);
  return arrClone;
};

export const insertItemIntoArray = (arr, item, index) => {
  const arrClone = [...arr]; // 기존

  console.log("** arr: ", arr);
  console.log("** item: ", item);
  // const oldIndex = arrClone.indexOf(item);
  console.log("** index: ", index);
  arrClone.splice(index,0, item[0]);
  console.log("** arrClone: ", arrClone);

  // arrClone.splice(index, 0, temp);
  // arrClone.splice(index, 0, item);// 기존
  return arrClone;// 기존
};

export const updateArrayItemById = (arr, itemId, fields) => {
  const arrClone = [...arr];
  const item = arrClone.find(({ id }) => id === itemId);
  if (item) {
    const itemIndex = arrClone.indexOf(item);
    arrClone.splice(itemIndex, 1, { ...item, ...fields });
  }
  return arrClone;
};

export const sortByNewest = (items, sortField) =>
  items.sort((a, b) => -a[sortField].localeCompare(b[sortField]));
