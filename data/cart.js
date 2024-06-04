export let cart = JSON.parse(localStorage.getItem('cart'));

  if(!cart){
    cart = [{
      productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2 ,
      deliveryOptionId : '1'
    },{
      productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId : '2'
    }];
    }

function savetoStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addtoCart(productId){
  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  const quantity = Number(quantitySelector.value);
  //console.log(quantity);

    let matchingItem;
    cart.forEach((cartitem) => {
      if(productId === cartitem.productId){
        matchingItem = cartitem;
      }
    });

    if(matchingItem){
      matchingItem.quantity += quantity;   
    } else {
      cart.push(
        //{productId,quantity,deliveryOptionId }
        {
        productId : productId,
        quantity : quantity,
        deliveryOptionId : '1'
      }
      );
    }

    // We're going to use an object to save the timeout ids.
    // The reason we use an object is because each product
    // will have its own timeoutId. So an object lets us
    // save multiple timeout ids for different products.
    // For example:
    // {
    //   'product-id1': 2,
    //   'product-id2': 5,
    //   ...
    // }
    // (2 and 5 are ids that are returned when we call setTimeout).
    const addtoMessageTimeouts = {};


    const addtoMessage = document.querySelector(`.js-added-to-cart-${productId}`);
    addtoMessage.classList.add('added-to-cart-visible');
    // Check if there's a previous timeout for this
      // product. If there is, we should stop it.
      const previousTimeoutId = addtoMessageTimeouts[productId];
      if (previousTimeoutId) {
        clearTimeout(previousTimeoutId);
      }

    const timeoutId = setTimeout(() => {
      addtoMessage.classList.remove('added-to-cart-visible');
    },2000);

    // Save the timeoutId for this product
    // so we can stop it later if we need to.
    addtoMessageTimeouts[productId] = timeoutId;
    
    savetoStorage();
 }

export function removefromCart(productId){
    const newCart = [];
    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    savetoStorage();
}


export function calculateCartQuantity(){
  let cartQuantity = 0;
    cart.forEach((cartitem) => {
      cartQuantity += cartitem.quantity;
    });
  return cartQuantity;  
  
}

export function updatecartQuantity(productId,newQuantity){
  let matchingItem;
  cart.forEach((cartitem) => {
    if(productId === cartitem.productId){
      matchingItem = cartitem;
    }
  });
  matchingItem.quantity = newQuantity;
  savetoStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingItem;
  cart.forEach((cartitem) => {
    if(productId === cartitem.productId){
      matchingItem = cartitem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;

  savetoStorage();

  return matchingItem;
}