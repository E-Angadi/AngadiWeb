export const unitsMap = {
  0: "Kilograms",
  1: "Liters",
};

export const taxMap = {
  0: "Percentage",
  1: "Amount",
};

export const getTaxSelect = () => {
  var taxSelect = [];
  for (const select in taxMap) {
    taxSelect.push({ id: select, title: taxMap[select] });
  }
  return taxSelect;
};

export const getUnitSelect = () => {
  var unitSelect = [];
  for (const select in unitsMap) {
    unitSelect.push({ id: select, title: unitsMap[select] });
  }
  return unitSelect;
};
