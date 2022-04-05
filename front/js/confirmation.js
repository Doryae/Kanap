let order = new URLSearchParams(window.location.search);

const orderId = document.getElementById("orderId");
orderId.textContent = order.get("id");