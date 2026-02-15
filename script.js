
let data = loadData();
let chart;

function addExpense() {
    const expense = {
        id: Date.now(),
        date: document.getElementById("date").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value || "Outros",
        amount: Number(document.getElementById("amount").value)
    };

    if (!expense.description || !expense.amount) return;

    data.push(expense);
    saveData(data);

    renderTable();
    renderChart();
}

function deleteExpense(id) {
    data = data.filter(e => e.id !== id);
    saveData(data);
    renderTable();
    renderChart();
}

function renderTable() {
    const tbody = document.querySelector("#table tbody");
    tbody.innerHTML = "";

    data.forEach(e => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
<td>${e.date}</td>
<td>${e.description}</td>
<td>${e.category}</td>
<td>R$ ${e.amount.toFixed(2)}</td>
<td><button onclick="deleteExpense(${e.id})">Excluir</button></td>
`;

        tbody.appendChild(tr);
    });
}

function renderChart() {
    const grouped = {};

    data.forEach(e => {
        if (!grouped[e.category]) grouped[e.category] = 0;
        grouped[e.category] += e.amount;
    });

    const labels = Object.keys(grouped);
    const values = Object.values(grouped);

    if (chart) chart.destroy();

    chart = new Chart(document.getElementById("chart"), {
        type: "pie",
        data: {
            labels,
            datasets: [{ data: values }]
        }
    });
}

renderTable();
renderChart();