document.addEventListener('DOMContentLoaded', ()=>{
  const orderSummary = document.getElementById('order-summary');
  const paymentMethod = document.getElementById('payment-method');
  const paymentFields = document.getElementById('payment-fields');
  const paymentTotal = document.getElementById('payment-total');
  const payNow = document.getElementById('pay-now');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function formatNumber(n){ return Number(n).toLocaleString(); }

  function renderOrder(){
    orderSummary.innerHTML = '';
    if(!cart || cart.length === 0){
      orderSummary.innerHTML = '<p>Your cart is empty.</p>';
      paymentTotal.textContent = '0';
      return;
    }
    let subtotal = 0;
    const list = document.createElement('div');
    list.className = 'order-list';
    cart.forEach(item=>{
      const price = parseInt(String(item.price).replace(/[^0-9]/g,'')) || 0;
      subtotal += price;
      const row = document.createElement('div');
      row.className = 'order-row';
      row.innerHTML = `<div class="o-left">${item.title}</div><div class="o-right">₹${formatNumber(price)}</div>`;
      list.appendChild(row);
    });
    orderSummary.appendChild(list);
    paymentTotal.textContent = formatNumber(subtotal);
  }

  function renderFields(){
    const m = paymentMethod.value;
    paymentFields.innerHTML = '';
    if(m === 'credit-card' || m === 'debit-card'){
      paymentFields.innerHTML = `
        <div class="form-row"><label>Card Number</label><input id="card-number" placeholder="1234 5678 9012 3456"></div>
        <div class="form-row"><label>Expiry (MM/YY)</label><input id="card-expiry" placeholder="MM/YY"></div>
        <div class="form-row"><label>CVV</label><input id="card-cvv" placeholder="CVV"></div>
      `;
    } else if(m === 'upi'){
      paymentFields.innerHTML = `
        <div class="form-row"><label>UPI ID</label><input id="upi-id" placeholder="example@upi"></div>
      `;
    } else if(m === 'netbanking'){
      paymentFields.innerHTML = `
        <div class="form-row"><label>Bank</label><select id="bank-select"><option>HDFC</option><option>ICICI</option><option>SBI</option><option>Axis</option></select></div>
      `;
    }
  }

  paymentMethod.addEventListener('change', renderFields);

  payNow.addEventListener('click', ()=>{
    if(!cart || cart.length===0){ alert('Cart is empty'); return; }
    const method = paymentMethod.value;
    if((method==='credit-card'||method==='debit-card')){
      const num = (document.getElementById('card-number')||{}).value || '';
      const cvv = (document.getElementById('card-cvv')||{}).value || '';
      if(num.replace(/\s+/g,'').length < 12 || cvv.length < 3){ alert('Enter valid card details'); return; }
    }
    if(method==='upi'){
      const upi = (document.getElementById('upi-id')||{}).value || '';
      if(!upi.includes('@')){ alert('Enter valid UPI ID'); return; }
    }

    payNow.disabled = true;
    payNow.textContent = 'Processing...';
    setTimeout(()=>{
      alert('Payment successful — thank you!');
      localStorage.removeItem('cart');
      window.location.href = 'index.html';
    }, 1200);
  });

  renderOrder();
  renderFields();
});