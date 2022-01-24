const container = document.querySelector('.graph');
const input = document.querySelector('input[name=peopleCount]');
const button = document.querySelector('button[name=simulate]');
const span = document.querySelector('span#currentValue');

const options = {
    edges: {
        arrows: {
            to: {
                enabled: true
            }
        }
    }
};

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const setButtonLoading = (state) => {
    if(state) {
        button.disabled = true;
        button.textContent = "Ładowanie..."
    } else {
        button.disabled = false;
        button.textContent = "Generuj"
    }
}

const simulate = (peopleCount) => {
    setButtonLoading(true);

    // create nodes (people) & edges (links)
    const peopleNodes = [];
    const edges = [];
    for (let i = 1; i <= peopleCount; i++) {
        peopleNodes.push({ id: i, label: `Os. ${i}` });

        let randomPeopleNumber = random(1, peopleCount);
        while (i == randomPeopleNumber)
            randomPeopleNumber = random(1, peopleCount);

        edges.push({ from: i, to: randomPeopleNumber });
    }

    // draw randomized nodes & edges
    new vis.Network(
        container,
        {
            nodes: new vis.DataSet(peopleNodes),
            edges: new vis.DataSet(edges)
        },
        options
    ).once("stabilizationIterationsDone", () => setButtonLoading(false));
}

simulate(30);

button.addEventListener('click', () => {
    const peopleCount = input.value;
    simulate(+peopleCount);
})

input.addEventListener('input', event => {
    const value = event.target.value;
    span.innerHTML = `&nbsp;(${value})`
})