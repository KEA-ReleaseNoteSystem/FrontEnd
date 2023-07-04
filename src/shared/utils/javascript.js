// moveItemWithinArray, insertItemIntoArray
export const moveItemWithinArray = (arr, item, newIndex) => {
  const arrClone = [...arr];
  const oldIndex = arrClone.indexOf(item);
  let temp = arr.splice(oldIndex,1);
  
  arrClone.splice(newIndex+1, 0, temp[0]);
  return arrClone;
};

export const insertItemIntoArray = (arr, item, index) => {
  const arrClone = [...arr]; // 기존

  arrClone.splice(index,0, item[0]);
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
