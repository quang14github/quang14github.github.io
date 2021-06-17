// open cart menu
document.querySelector(".menu-btn-icon").addEventListener("click", () => {
    document.querySelector(".menu-btn").classList.add("hide");
    document.querySelector(".cart-menu").style.transform = "translateX(0)";
    document.body.style.backgroundColor = "#262626";
});

// close cart menu
document.querySelector(".close-btn").addEventListener("click", () => {
    document.querySelector(".cart-menu").style.transform = "translateX(100%)";
    document.body.style.backgroundColor = "white";
    document.querySelector(".menu-btn").classList.remove("hide");
});
const items = [
    {
        cost: 29.89,
        number: 1,
        total: 29.89,
        node: document.querySelectorAll(".order-ctn")[0]
    },
    {
        cost: 67.25,
        number: 1,
        total: 67.25,
        node: document.querySelectorAll(".order-ctn")[1]
    }
]

function render(item) {
    item.node.querySelector("input[type=number]").value = item.number;
    item.total = item.number * item.cost;
    item.node.querySelector(".order-cost-now").innerHTML = `$${item.total.toFixed(2)}`;
    let checkoutMoney = document.querySelector(".checkout-info-money");
    let subTotal = items[0].total + items[1].total;
    checkoutMoney.innerHTML = `$${subTotal.toFixed(2)}`;
}
function minusFunc(item) {
    item.node.querySelector(".minus-btn").addEventListener("click", () => {
        if (item.number > 1) item.number--;
        render(item);
    });
}
function addFunc(item) {
    item.node.querySelector(".add-btn").addEventListener("click", () => {
        if (item.number < 99) item.number++;
        render(item);
    });
}
function changeFunc(item) {
    item.node.querySelector("input[type=number]").addEventListener("keyup", (event) => {
        item.number = event.target.value;
        if (item.number > 99) item.number = 99;
        if (item.number < 1) item.number = 1;
        render(item);
    });
}
function removeFunc(item) {
    item.node.querySelector(".order-remove-btn").addEventListener("click", () => {
        item.cost = 0;
        item.node.classList.add("hide");
        let numberOrder = document.getElementById("numberOrder");
        numberOrder.innerHTML = `${parseInt(numberOrder.innerHTML) - 1}`; 
        render(item);
    });
}
items.forEach(item => {
    minusFunc(item);
    addFunc(item);
    changeFunc(item);
    removeFunc(item);
});
