

export const addItemToCart = (item) => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        cart.orderAmount.base_price+=item.price
        let flag=false
        cart.item_list.find(v=>{
            if(v.food===item.foodId){
                v.count+=1
                flag=true
                return
            }

        })
        if(!flag){
            cart.item_list.push({count:1,food:item.foodId,name:item.name,price:item.price})
        }
      }else{
            cart={orderAmount:{base_price:item.price},
            restaurant:item.restaurant,
            customer:item.customer,
            item_list:[{count:1,food:item.foodId}]
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };
  
  export const loadCart = () => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        return JSON.parse(localStorage.getItem("cart"));
      }
    }
  };
  
  export const removeItemFromCart = foodId => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        cart.item_list.forEach((v) => {
            if (v.food===foodId ) {
                v.count-=1
            }
        });
        localStorage.setItem("cart", JSON.stringify(cart));
      }    
    }
  };
  
  export const cartEmpty = () => {
    if (typeof window !== undefined) {
      localStorage.removeItem("cart");
    }
  };
  