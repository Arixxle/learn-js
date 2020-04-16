let sevenEleven = {
  goods: [
    {
      id: 'A038',
      name: '麥香紅茶',
      cost: 2,
      price: 10,
      '製造商': '統一',
      size: '100ml',
      '庫存': 200,
      category:[
        'drink',
        'sweet',
      ],
      type:'red',
      campain: [ 
        '紅配綠', 
        `b1g1f`
      ],
    },
    {
      id: 'B039',
      name: '握便當',
      cost: 10,
      price: 50,
      '製造商': '統一',
      size: '350g',
      '庫存': 20,
      category:[
        'food',
        'chicken',
      ],
      type: 'green',
      campain: [ 
        '紅配綠'
      ],
    },
    {
      id: 'C342',
      name: '拿鐵',
      cost: 2,
      price: 55,
      '製造商': '統一',
      size: '100ml',
      '庫存': 156,
      category:[
        'drink',
        'coffee'
      ],
      type:[
      ],
      campain: [ 
        '口罩',
        '第二杯6折'
      ],
    },
    {
      id: 'M983',
      name: '口罩',
      cost: 2,
      price: 0,
      '製造商': '中衛',
      size: '1',
      '庫存': 20,
      category:[
        'medical'
      ],
      type:[
      ],
      campain: [
      ],
    },
  ],
  purchaseRecor: [
    {
      id: 'B039',
      '製造日期':20200101,
      '到期日期':20200101,
      '進貨日期':20200101,
      '進貨量': 50,
    }
  ],
  salesRecord: [
    {
      date:20200101,
      time:1830,
      id:'B039',
      quantity: 1,
  
    },
  ],
};
let redTea = sevenEleven.goods[0];
let ohBandun = sevenEleven.goods[1];
let latte = sevenEleven.goods[2];
let mask = sevenEleven.goods[3];
let orderListA = [redTea, ohBandun, ohBandun];
let orderListB = [latte, mask, latte];

/* Buy one get one free */
function buyOneGetOneFree(items, num) {
  if (items.campain.includes('b1g1f')) {
    return Math.ceil((num / 2.0)) * items.price
  } else {
    return num * items.price
  }
};
console.log(buyOneGetOneFree(redTea, 11));

/* Buy red and green */
function buyRedAndGreen(items) {
  let redList = []
  let greenList = [] 
  let normalList = []
  let redAmount = 0
  let greenAmount = 0
  let normalAmount = 0
  let discount = 8
  for (let item of items) {
    if (item.type === 'red') {
      redList.push(item)
    } else if (item.type === 'green'){
      greenList.push(item)
    } 
  }  
  for (let red of redList) {
    redAmount += (red.price)
  }
  for (let green of greenList) {
    greenAmount += green.price
  }
  for (let normal of normalList) {
    normalAmount += normal.price
  }
  if (redList.length <= greenList.length ) {
    return greenAmount + redAmount - (redList.length * discount) + normalAmount
  } else {
    return greenAmount + redAmount - (greenList.length * discount) + normalAmount
  }
};
console.log(buyRedAndGreen(orderListA));

/* When you get mask, latte could buy on get one free */
function deleteMask(value) {
  return value != mask;
};
function findLatte(value) {
  return value === latte;
};
function getGoodsPrice(good){
  return  good.price;
};
function getMaskAndBuyCoffee(items) {
  let amount = 0;
  let priceList = [];
  if (items.includes(mask)) {
    latteList = items.filter(findLatte);
  };
  return amount = Math.ceil(latteList.length / 2) * getGoodsPrice(latte);
};
console.log(getMaskAndBuyCoffee(orderListB));

/* 綜合練習：當購物車中的商品有各種特惠條件時 */
function findGreen(value) {
  return value.type === 'green';
};
function findRed(value) {
  return value.type === 'red';
};
function deleteGreen(value) {
  return value.type != 'green';
};
function deleteRed(value) {
  return value.type != 'red';
};
function getOneFree(value) {
  return value.campain.includes('b1g1f');
};
function deleteFree(value) {
  if (value.campain.includes('b1g1f')) {
    return null;
  } else {
    return value;
  };
};

function shopingCart(params) {
  let total = [];
  let cart = [];
  let greenCart = [];
  let redCart = [];
  let redDiscount = 8;
  let redMatch = [];
  let oneMoreLatte = [];

  for (const param of params) {
    for (let i = 0; i < param[1]; i++) {
      cart.push(param[0]);
    };
  };

  /* 先進行紅配綠優惠計算 */
  greenCart = cart.filter(findGreen);
  cart = cart.filter(deleteGreen);
  redCart =  cart.filter(findRed);
  cart = cart.filter(deleteRed);

  if (redCart.length > greenCart.length) {
    for (let i = 0; i < greenCart.length; i++) {
      redMatch.push(redCart[0]);
      redCart.shift();
    };
    for (const green of greenCart) {
      total.push(green.price);
    };
    for (const red of redMatch) {
      total.push(red.price - redDiscount);
    };
    
  } else {
    for (const green of greenCart) {
      total.push(green.price);
    };
    for (const red of redCart) {
      total.push(red.price - redDiscount);
    };
  };
  cart = cart.concat(redCart);

  /* 買一送一優惠計算 */
  oneFreeCart = cart.filter(getOneFree);
  cart = cart.filter(deleteFree);
  total.push(Math.ceil(oneFreeCart.length / 2) * oneFreeCart[0].price);

  if (cart.includes(mask) && cart.includes(latte)) {
    for (const good of cart) {
      if (good.name === '拿鐵') {
        oneMoreLatte.push(good);
      };
    };
    total.push(Math.ceil(oneMoreLatte.length / 2) * oneMoreLatte[0].price);
  } else {
    for (const good of cart) {
      if (good.name === '拿鐵') {
        oneMoreLatte.push(good);
      };
    };
    total.push(Math.ceil(oneMoreLatte.length * oneMoreLatte[0].price));
  }
  
  /* 領口罩，拿鐵買一送一計算 */
  let totalPrice = total.reduce(function(amount, price){
    return amount + price;
  });

  return totalPrice;
};

/* 訂單成立與應收總金額 */
let orderList = [[redTea, 7], [latte, 3], [ohBandun, 2], [mask, 1]];
console.log(shopingCart(orderList));
