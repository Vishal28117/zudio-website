const products = [
  {id:1, title:"Men Casual Shirt", price:"₹799", category:"men", img:"https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?auto=format&fit=crop&w=800&q=80"},
  {id:2, title:"Women Summer Dress", price:"₹999", category:"women", img:"https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80"},
  {id:3, title:"Kids Hoodie", price:"₹599", category:"kids", img:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80"},
  {id:4, title:"Men Denim Jacket", price:"₹1499", category:"offers", img:"https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80"},
  {id:5, title:"Women Handbag", price:"₹699", category:"women", img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"},
  {id:6, title:"Kids T-shirt", price:"₹399", category:"kids", img:"https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=80"},

  {id:8, title:"Women Jeans", price:"₹1299", category:"women", img:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80"},
  {id:9, title:"Kids Shoes", price:"₹899", category:"kids", img:"https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80"},
  {id:10, title:"Women Top", price:"₹599", category:"women", img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80"}
];



function displayProducts(items){
  const container = document.getElementById('productContainer');
  container.innerHTML = '';
  items.forEach(p=>{
    container.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <div class="card-content">
          <h4>${p.title}</h4>
          <div class="price">${p.price}</div>
          <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>`;
  });
}

function filterProducts(category){
  if(category === 'all'){
    displayProducts(products);
  } else {
    displayProducts(products.filter(p=>p.category===category));
  }
}

function addToCart(productId){
  const product = products.find(p => p.id === productId);
  if (product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cartCount').innerText = cart.length;
  }
}

displayProducts(products);