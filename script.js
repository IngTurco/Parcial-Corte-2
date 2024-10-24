document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    const productFilter = document.getElementById('product-filter');
    let products = [];

    // Cargar productos desde la API
    const loadProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            products = await response.json();
            displayProducts(products);
            populateFilterOptions(products);
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    };

    // Mostrar productos
    const displayProducts = (productList) => {
        productGrid.innerHTML = '';
        productList.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <p>Precio: $${product.price}</p>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    };

    // Llenar las opciones del filtro
    const populateFilterOptions = (productList) => {
        productList.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = product.title;
            productFilter.appendChild(option);
        });
    };

    // Filtrar productos
    productFilter.addEventListener('change', () => {
        const selectedValue = productFilter.value;
        if (selectedValue === 'all') {
            displayProducts(products);
        } else {
            const filteredProduct = products.filter(product => product.id == selectedValue);
            displayProducts(filteredProduct);
        }
    });

    // Cargar productos al iniciar
    loadProducts();
});
