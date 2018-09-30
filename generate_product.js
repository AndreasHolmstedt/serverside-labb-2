module.exports = function generateProduct(){
  n1 = ['Blue', 'Red', 'Awesome', 'Fresh', 'Sick', 'Purple', 'Sexy', 'Dope', 'Killer', 'Retro', 'Fancy', 'Chill', 'Cosy', 'Warm', 'Soft', 'Lazy', 'Cool', 'Fashionable'];
  n2 = ['Cheap monday', 'Converse', 'Tiger', 'Gucci', 'Filippa k', 'Calvin Klein', 'Nike', 'Adidas', "Levi's", 'River island'];
  n3 = ['t-shirt', 'shorts', 'jacket', 'slacks', 'jeans', 'shirt', 'bikini', 'socks', 'hoodie', 'dress',];

  r1 = Math.floor(Math.random() * n1.length);
  r2 = Math.floor(Math.random() * n2.length);
  r3 = Math.floor(Math.random() * n3.length);

  name = `${n1[r1]} ${n2[r2]} ${n3[r3]}`;
  price = Math.floor(Math.random() * 200) + 50;
  category = n3[r3];

  return {
    name: name,
    price: price,
    category: category,
  };
};
