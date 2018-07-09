const email = require('./sendEmail')
    cart= {
    _id: "5b3f49eb944fba5de90c941f",
    user: "5b34b11cc33d4b70bfbbce44",
    item: [
    {
    _id: "5b3f49eb944fba5de90c9420",
    product: "5b39e4ef4a651a495cf81ad8",
    price: 79.6,
    discount: 0
    }
    ],
    expired: "2018-07-11T10:52:27.603Z",
    __v: 0
    },
    product= [
    {
    tags: [
    "PC",
    "Cases",
    "Mid",
    "Tower",
    "ATX"
    ],
    _id: "5b3611d5bc01987f112a63ce",
    picture: "https://www.corsair.com/corsairmedia/sys_master/productcontent/CC-9011075-WW-100R_001.png",
    name: "Carbide Series™ 100R Mid-Tower Case",
    price: 48,
    discount: 0,
    stock: 1,
    category: "5b3600bd0b67146e099ee5fa",
    __v: 0
    },
    {
    tags: [
    "Desk",
    "Case"
    ],
    _id: "5b39e4694a651a495cf81ad7",
    name: "Desk Case DK-02",
    price: 1032,
    stock: 0,
    picture: "https://tpucdn.com/reviews/LianLi/DK-02X/images/dk-02x.jpg",
    discount: 20,
    category: "5b39df384a651a495cf81ad6",
    __v: 0
    },
    {
    tags: [
    "microATX",
    "white"
    ],
    _id: "5b39e4ef4a651a495cf81ad8",
    name: "Carbide Series™ Air 240 Arctic White High Airflow MicroATX and Mini-ITX PC Case",
    price: 79.6,
    stock: 10,
    picture: "https://www.corsair.com/medias/sys_master/images/images/hc5/h12/8844091228190/-CC-9011069-WW-Gallery-AIR240-WHT-001.png",
    discount: 0,
    category: "5b3600bd0b67146e099ee5fa",
    __v: 0
    },
    {
    tags: [
    "portable",
    "miniITX"
    ],
    _id: "5b39e5ff4a651a495cf81ad9",
    name: "Graphite Series™ 380T White Portable Mini ITX Case",
    price: 108.44,
    stock: 11,
    picture: "https://www.corsair.com/medias/sys_master/images/images/hfd/hff/8850492882974/-CC-9011060-WW-Gallery-380T-White-01.png",
    discount: 12,
    category: "5b3600bd0b67146e099ee5fa",
    __v: 0
    },
    {
    tags: [
    "Modular",
    ""
    ],
    _id: "5b39e9834a651a495cf81ada",
    name: "LIAN LI Casing PC-T80X",
    price: 158.7,
    stock: 12,
    picture: "https://ecs7.tokopedia.net/img/cache/300/product-1/2016/5/19/1557416/1557416_d3333be3-65e7-437c-b3dd-ded79084abe4.jpg",
    discount: 20,
    category: "5b39df384a651a495cf81ad6",
    __v: 0
    }
    ],
    total= 79.6,
    user= {
    email: "email@email.com",
    _id: "5b34b11cc33d4b70bfbbce44",
    isAdmin: false,
    iat: 1530883525,
    exp: 1530890725
    }
console.log(cart)
email.sendreminder(cart, product, total, user)