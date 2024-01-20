function fetchAndShowProducts(category) {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = '';

    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            const categoryData = data.categories.find(eachItem => eachItem.category_name === category);

            if (categoryData) {
                categoryData.category_products.forEach(product => {
                    const productCard = ProductCard(product);
                    productContainer.appendChild(productCard);
                });
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function ProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
        ${product.badge_text ? `<div class="badge">${product.badge_text}</div>` : `<div class="badge"></div>`}
        
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <div class="title-content">
        <div class="heading">${product.title}</div>
        <div class="vendor-content">${product.vendor}</div>
        </div>
        <divclass="price-line-container">
        <div class="price-line">Rs ${product.price}</div>
        ${product.compare_at_price ? `
            <div class="line-throught price-line">${product.compare_at_price}</div>
            <div class="price-line discount-price">${calculatePercentageOff(product.price, product.compare_at_price)}% Off</div>
        ` : ''}
        <div>
        <button class="add-cart-btn">Add to Cart</button>
    `;


    return card;
}


function calculatePercentageOff(price, comparePrice) {
    const percentageOff = ((comparePrice - price) / comparePrice) * 100;
    return percentageOff.toFixed(2);
}

// Show initial products (Men category by default)
fetchAndShowProducts('Men');