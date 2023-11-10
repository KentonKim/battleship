const initializeDom = (parentDiv) => {
  const _makeComponent = (player, identifier, type = "div") => {
    const element = document.createElement(type);
    element.id = `${player}-${identifier}`;
    element.classList.add(identifier)
    return element;
  };

  const _makeGrid = (player, identifier) => {
    const element = _makeComponent(player, identifier);

    // Make 10x10 grid
    for (let i = -1; i < 10; i += 1) {
      for (let j = -1; j < 10; j += 1) {
        if (i === -1 && j === -1) {
          const emptyNode = _makeComponent(player, 'empty-node');
          element.appendChild(emptyNode);
        } else if (i === -1 && j > -1) {
          const columnNode = _makeComponent(player, `column-${j}`);
          columnNode.textContent = j;
          element.appendChild(columnNode);
        } else if (j === -1 && i > -1) {
          const rowNode = _makeComponent(player, `row-${i}`);
          rowNode.textContent = i;
          element.appendChild(rowNode);
        } else {
          const gridNode = _makeComponent(player, `${i}${j}`);
          gridNode.classList.add("grid-node");
          element.appendChild(gridNode);
        }
      }
    }

    return element;
  };

  const _addShips = (id) => {
    const element = _makeComponent(id, 'ships-container')
    element.appendChild(_makeComponent(id, 'carrier'))
    element.appendChild(_makeComponent(id, 'battleship'))
    element.appendChild(_makeComponent(id, 'cruiser'))
    element.appendChild(_makeComponent(id, 'submarine'))
    element.appendChild(_makeComponent(id, 'destroyer'))
    return element
  }

  const battleLog = _makeComponent('n', 'log')

  const optionsContainer = _makeComponent('options', 'container')
  const optionsBookmark = _makeComponent('options', 'bookmark')
  const options = _makeComponent('options', 'options')
  options.appendChild(_makeComponent('options', 'button-replay', 'button'))
  options.appendChild(_makeComponent('options', 'button-easy', "button"))
  options.appendChild(_makeComponent('options', 'button-medium', "button"))
  options.appendChild(_makeComponent('options', 'button-hard', "button"))
  optionsContainer.appendChild(options)
  optionsContainer.appendChild(optionsBookmark)

  const userSide = _makeComponent("user", "side");
  userSide.appendChild(_makeComponent("user", "name"))
  userSide.appendChild(_makeGrid("user", "grid"));
  userSide.appendChild(_addShips('user'))
  const computerSide = _makeComponent("computer", "side");
  computerSide.classList.add('side')
  computerSide.appendChild(_makeComponent('computer' ,'name'))
  computerSide.appendChild(_makeGrid("computer", "grid"));
  computerSide.appendChild(_addShips('computer'))

  parentDiv.appendChild(optionsContainer);
  parentDiv.appendChild(battleLog);
  parentDiv.appendChild(userSide);
  parentDiv.appendChild(computerSide);
};

export default initializeDom;
