let order = new URLSearchParams(window.location.search);

// We use the URL params "id" (?id=...) to use it as the check number.
const orderId = document.getElementById("orderId");
orderId.textContent = order.get("id");