//Masks
$("#inputPrice").mask("000.000.000.000.000,00", { reverse: true });

function convertToNumber(priceFormat) {
    return priceFormat.replace(/\./g, '').replace(',', '.');
}

var products = [
    {
        id: 1,
        name: "Computador M1-TX",
        description: "Intel I7, 16GB, SSD 256, HD 1T",
        price: 4900,
        category: 1,
        promotion: true,
        new: true
    },
    {
        id: 2,
        name: "Computador M2-TX",
        description: "Intel I7, 32GB, SSD 512, HD 1T",
        price: 5900,
        category: 2,
        promotion: false,
        new: true
    },
    {
        id: 3,
        name: "Computador M1-T",
        description: "Intel I5, 16GB, HD 1T",
        price: 2900,
        category: 3,
        promotion: false,
        new: false
    },
];

var categories = [
    { id: 1, name: "Produção Própria" },
    { id: 2, name: "Nacional" },
    { id: 3, name: "Importado" }
];


//OnLoad
loadProducts();

//Load all products
function loadProducts() {
    for (let product of products) {
        addNewRow(product);
    }
}

//Save a product
function save() {

    var product = {
        id: products.length + 1,
        name: document.getElementById("inputName").value,
        description: document.getElementById("inputDescription").value,
        price: convertToNumber(document.getElementById("inputPrice").value),
        category: document.getElementById("selectCategory").value,
        promotion: document.getElementById("checkBoxPromotion").checked,
        new: document.getElementById("checkBoxNewProduct").checked
    };

    addNewRow(product);

    products.push(product);

    document.getElementById("formProduct").reset();
}

//Add new Row
function addNewRow(product) {
    var table = document.getElementById("productsTable");

    var newRow = table.insertRow();

    //Formatter Price
    var formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    //Insert id product
    var idNode = document.createTextNode(product.id);
    newRow.insertCell().appendChild(idNode);

    //Insert name product
    var nameNode = document.createTextNode(product.name);
    newRow.insertCell().appendChild(nameNode);

    //Insert description product
    var descriptionNode = document.createTextNode(product.description);
    var cell = newRow.insertCell();
    cell.className = "d-none d-md-table-cell";
    cell.appendChild(descriptionNode);

    //Insert price product
    var priceNode = document.createTextNode(formatter.format(product.price));
    newRow.insertCell().appendChild(priceNode);

    //Insert category product
    var categoryNode = document.createTextNode(categories[product.category - 1].name);
    newRow.insertCell().appendChild(categoryNode);

    //Insert product options
    var options = "";

    //Insert promotion product
    if (product.promotion)
        options = "<span class='badge bg-success me-1'>P</span>";
    
    //Insert new product
    if (product.new)
        options += "<span class='badge bg-primary'>L</span>";
    
    cell = newRow.insertCell();
    cell.className = "d-none d-md-table-cell";
    cell.innerHTML = options;
}