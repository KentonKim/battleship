const fillGrid = (side, element) => {
  const _makeComponent = (side, identifier, type = "div") => {
    const element = document.createElement(type);
    element.id = `${side}-${identifier}`;
    element.classList.add(identifier)
    return element;
  };

  // Make 10x10 grid with row/col labels
  for (let i = -1; i < 10; i += 1) {
    for (let j = -1; j < 10; j += 1) {
      if (i === -1 && j === -1) {
        const emptyNode = _makeComponent(side, 'empty-node');
        element.appendChild(emptyNode);
      } else if (i === -1 && j > -1) {
        const columnNode = _makeComponent(side, `column-${j}`);
        columnNode.textContent = j;
        element.appendChild(columnNode);
      } else if (j === -1 && i > -1) {
        const rowNode = _makeComponent(side, `row-${i}`);
        rowNode.textContent = i;
        element.appendChild(rowNode);
      } else {
        const gridNode = _makeComponent(side, `${i}${j}`);
        gridNode.classList.add("grid-node");
        element.appendChild(gridNode);
      }
    }
  }

  return element;
};

export default fillGrid;
