const initializeDom = (parentDiv) => {
  const _makeComponent = (id, type = "div") => {
    const element = document.createElement(type);
    element.id = id;
    return element;
  };

  const _makeGrid = (id) => {
    const element = _makeComponent(id);
    element.classList.add("grid");

    // Make 10x10 grid
    for (let i = -1; i < 10; i += 1) {
      for (let j = -1; j < 10; j += 1) {
        if (i === -1 && j === -1) {
          const emptyNode = _makeComponent(`${id}-empty`);
          element.appendChild(emptyNode);
        } else if (i === -1 && j > -1) {
          const columnNode = _makeComponent(`${id}-column-${j}`);
          columnNode.textContent = j;
          element.appendChild(columnNode);
        } else if (j === -1 && i > -1) {
          const rowNode = _makeComponent(`${id}-row-${i}`);
          rowNode.textContent = i;
          element.appendChild(rowNode);
        } else {
          const gridNode = _makeComponent(`${id}-${i}${j}`);
          gridNode.classList.add("grid-node");
          element.appendChild(gridNode);
        }
      }
    }

    return element;
  };



  const replayButton = _makeComponent('button-replay', 'button')
  const battleLog = _makeComponent('log')

  const userSide = _makeComponent("user-side");
  const userInfo = _makeComponent('user-info')
  userInfo.appendChild(_makeComponent('user-name'))
  userSide.appendChild(userInfo)
  userSide.appendChild(_makeGrid("user-grid"));
  userSide.appendChild(_makeComponent('user-ships-container'))
  const computerSide = _makeComponent("computer-side");
  const computerInfo = _makeComponent('computer-info')
  computerInfo.appendChild(_makeComponent('computer-name'))
  computerInfo.appendChild(_makeComponent('button-easy', "button"))
  computerInfo.appendChild(_makeComponent('button-medium', "button"))
  computerInfo.appendChild(_makeComponent('button-hard', "button"))
  computerSide.appendChild(computerInfo)
  computerSide.appendChild(_makeGrid("computer-grid"));
  computerSide.appendChild(_makeComponent('compter-ships-container'))

  parentDiv.appendChild(replayButton);
  parentDiv.appendChild(battleLog);
  parentDiv.appendChild(userSide);
  parentDiv.appendChild(computerSide);
};

export default initializeDom;
