document.addEventListener("DOMContentLoaded", function () {
    let cart = [];
    
    // Add to cart functionality
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (e) => {
            let product = e.target.parentElement;
            let name = product.querySelector("h2").innerText;
            let price = parseFloat(product.querySelector("p").innerText.replace("$", ""));
            
            cart.push({ name, price });
            updateCart();
        });
    });

    // Update cart UI
    function updateCart() {
        let cartContainer = document.getElementById("cart-items");
        let totalContainer = document.getElementById("cart-total");
        let cartCount = document.getElementById("cart-count");

        cartContainer.innerHTML = "";
        let total = 0;
        
        cart.forEach((item, index) => {
            let div = document.createElement("div");
            div.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button onclick="removeItem(${index})">Remove</button>`;
            cartContainer.appendChild(div);
            total += item.price;
        });

        totalContainer.innerText = total.toFixed(2);
        cartCount.innerText = cart.length;
        document.getElementById("cart").style.display = cart.length > 0 ? "block" : "none";
    }

    // Remove item from cart
    window.removeItem = function(index) {
        cart.splice(index, 1);
        updateCart();
    };

    // Search products
    document.getElementById("search-bar").addEventListener("input", function (e) {
        let searchValue = e.target.value.toLowerCase();
        document.querySelectorAll(".product").forEach(product => {
            let name = product.getAttribute("data-name").toLowerCase();
            product.style.display = name.includes(searchValue) ? "block" : "none";
        });
    });
});
