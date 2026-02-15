
const STORAGE_KEY = "finance_data_v1";

function loadData() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}