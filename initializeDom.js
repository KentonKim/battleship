const initializeDom = (parentDiv) => {
    const _makeComponent = (id, type = 'div') => {
        const element = document.createElement(type)
        element.id = id
        return element
    }

    const _makeGrid = (id) => {
        const element = _makeComponent(id) 
        element.classList.add('grid')

        // Make 10x10 grid
        for (let i = -1; i < 10; i += 1) {
            for (let j = -1; j < 10; j += 1) {
                if (i === -1 && j === -1) {
                    const emptyNode = _makeComponent(`${id}-empty`)
                    element.appendChild(emptyNode)
                } else if (i === -1 && j > -1) {
                    const columnNode = _makeComponent(`${id}-column-${j}`)
                    columnNode.textContent = j
                    element.appendChild(columnNode)
                } else if (j === -1 && i > -1) {
                    const rowNode = _makeComponent(`${id}-row-${i}`)
                    rowNode.textContent = i
                    element.appendChild(rowNode)
                } else {
                const gridNode = _makeComponent(`${id}-${i}${j}`)
                gridNode.classList.add('grid-node')
                element.appendChild(gridNode)
                }
            }
        }

        return element
    }

    const header = _makeComponent('header')
    header.appendChild(_makeComponent('notifications'))

    const content = _makeComponent('content')
    content.appendChild(_makeGrid('user-grid'))
    content.appendChild(_makeComponent('log'))
    content.appendChild(_makeGrid('computer-grid'))

    const optionsContainer = _makeComponent('options-container')
    optionsContainer.appendChild(_makeComponent('options'))
    optionsContainer.appendChild(_makeComponent('options-tab'))

    const footer = _makeComponent('footer')
    footer.appendChild(_makeComponent('user-ships'))
    footer.appendChild(_makeComponent('computer-ships'))

    parentDiv.appendChild(optionsContainer)
    parentDiv.appendChild(header)
    parentDiv.appendChild(content)
    parentDiv.appendChild(footer)
}

export default initializeDom