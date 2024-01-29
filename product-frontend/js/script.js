//Masks
$("#inputPrice").mask("000.000.000.000.000,00", { reverse: true });

function convertToNumber(priceFormat) {
    return priceFormat.replace(/\./g, '').replace(',', '.');
}

//Data
var products = [];
var categories = [];

//OnLoad
loadCategories();
loadProducts();

//Load all products
function loadCategories() {
    
    $.ajax({
        url: "http://localhost:8080/categories",
        type: "GET",
        async: false,
        success: (response) => {
            categories = response;

            for (let categorie of categories) {
                addNewCategorie(categorie);
            }
        }
    });
}

//Load all products
function loadProducts() {

    $.getJSON("http://localhost:8080/products", (response) => {

        products = response;

        for (let product of products) {
            addNewRow(product);
        }
    });
}

//Save a product
function save() {

    var product = {
        id: products.length + 1,
        name: document.getElementById("inputName").value,
        description: document.getElementById("inputDescription").value,
        price: convertToNumber(document.getElementById("inputPrice").value),
        category: {
            id: document.getElementById("selectCategory").value,
            name: document.getElementById("selectCategory").textContent
        },
        promotion: document.getElementById("checkBoxPromotion").checked,
        newProduct: document.getElementById("checkBoxNewProduct").checked
    };

    $.ajax({
        url: "http://localhost:8080/products",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(product),
        success: (product) => {
            addNewRow(product);
            products.push(product);
            document.getElementById("formProduct").reset();
        }
    });
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
    var categoryNode = document.createTextNode(categories[product.category.id - 1].name);
    newRow.insertCell().appendChild(categoryNode);

    //Insert product options
    var options = "";

    //Insert promotion product
    if (product.promotion)
        options = "<span class='badge bg-success me-1'>P</span>";
    
    //Insert new product
    if (product.newProduct)
        options += "<span class='badge bg-primary'>L</span>";
    
    cell = newRow.insertCell();
    cell.className = "d-none d-md-table-cell";
    cell.innerHTML = options;
}

function addNewCategorie(categorie) {
    var option = new Option(categorie.name, categorie.id);
    var select = document.getElementById("selectCategory");
    select.add(option);
}