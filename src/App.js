import React, { useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, Coffee, Search } from 'lucide-react';

const products = [
  { id: 1, name: 'กาแฟแคปซูล Nespresso', price: 590, image: 'https://i.pinimg.com/564x/e1/47/c6/e147c66d45d226024495bfca4633a0c8.jpg', category: 'แคปซูล' },
  { id: 2, name: 'เครื่องชงกาแฟ Moka Pot', price: 890, image: 'https://i.pinimg.com/236x/1a/64/40/1a6440980668c328c2a47ac5751410ac.jpg', category: 'อุปกรณ์' },
  { id: 3, name: 'เครื่องบดกาแฟมือหมุน', price: 1500, image: 'https://i.pinimg.com/564x/26/1e/00/261e00970a295882fcb1f41f2bb2e731.jpg', category: 'อุปกรณ์' },
  { id: 4, name: 'แก้วเก็บความเย็น Stanley', price: 1590, image: 'https://i.pinimg.com/564x/1e/3c/43/1e3c43c40adf0b687eec12764efed4c7.jpg', category: 'แก้ว' },
  { id: 5, name: 'ชุดดริปกาแฟ Hario V60', price: 750, image: 'https://i.pinimg.com/564x/30/b9/e8/30b9e8616a73b38c734d68a0e0414ba9.jpg', category: 'อุปกรณ์' },
  { id: 6, name: 'เมล็ดกาแฟคั่ว', price: 450, image: 'https://i.pinimg.com/736x/df/54/85/df5485fbc52cd5f90e3aac6a20ed7342.jpg', category: 'เมล็ดกาแฟ' },
  { id: 7, name: 'เครื่องทำฟองนม', price: 1200, image: 'https://i.pinimg.com/564x/c0/5a/93/c05a93417aafae5903a40cbc0bbd23ee.jpg', category: 'อุปกรณ์' },
  { id: 8, name: 'ถ้วยเอสเพรสโซ่คู่', price: 390, image: 'https://i.pinimg.com/236x/5f/58/3f/5f583f83e9d336db02377d8ce374d8c6.jpg', category: 'แก้ว' },
  { id: 9, name: 'กาต้มน้ำคอห่าน', price: 890, image: 'https://i.pinimg.com/736x/87/ff/01/87ff010c1e51e4176c21c65446d65504.jpg', category: 'อุปกรณ์' },
  { id: 10, name: 'เหยือกตวงน้ำสแตนเลส', price: 350, image: 'https://i.pinimg.com/236x/24/5a/2e/245a2ecfe825de18f14f212b9f8e7f78.jpg', category: 'อุปกรณ์' },
];

const SHIPPING_COST = 100;
const DISCOUNT_COUPON = 'SAVE10';
const DISCOUNT_AMOUNT = 0.1;

const categories = ['ทั้งหมด', ...new Set(products.map(product => product.category))];

export default function EcommerceApp() {
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'ทั้งหมด' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const applyCoupon = () => {
    if (couponCode === DISCOUNT_COUPON && !isDiscountApplied) {
      setIsDiscountApplied(true);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = isDiscountApplied ? subtotal * DISCOUNT_AMOUNT : 0;
  const total = subtotal - discount + (cart.length > 0 ? SHIPPING_COST : 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Coffee className="text-orange-500" size={24} />
              <h1 className="text-2xl font-bold text-gray-800">CaféShop</h1>
            </div>
            <div className="relative">
              <ShoppingCart />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Products Section */}
          <div className="md:w-2/3">
            <div className="mb-6 space-y-4">
              <div className="relative">
                <input 
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  placeholder="ค้นหาสินค้า..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button 
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg ${
                      selectedCategory === category 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-white border hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <span className="inline-block px-2 py-1 text-sm bg-orange-100 text-orange-800 rounded">
                      {product.category}
                    </span>
                    <h3 className="font-semibold text-lg mt-2">{product.name}</h3>
                    <p className="text-xl font-bold text-orange-500 mt-2">{product.price.toLocaleString()} บาท</p>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full mt-4 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors"
                    >
                      เพิ่มลงตะกร้า
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <ShoppingCart className="mr-2" /> ตะกร้าสินค้า
              </h2>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">ไม่มีสินค้าในตะกร้า</p>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center space-x-4">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-orange-500">{item.price.toLocaleString()} บาท</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded border hover:bg-gray-100">
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded border hover:bg-gray-100">
                          <Plus size={14} />
                        </button>
                        <button onClick={() => removeFromCart(item.id)}
                          className="p-1 rounded bg-red-500 text-white hover:bg-red-600">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex space-x-2">
                      <input 
                        type="text"
                        className="flex-1 px-4 py-2 border rounded"
                        placeholder="รหัสคูปอง" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <button 
                        onClick={applyCoupon}
                        disabled={isDiscountApplied}
                        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
                      >
                        ใช้คูปอง
                      </button>
                    </div>
                    
                    <div className="space-y-2 pt-4 border-t">
                      <div className="flex justify-between">
                        <span className="text-gray-600">ราคารวม:</span>
                        <span>{subtotal.toLocaleString()} บาท</span>
                      </div>
                      {isDiscountApplied && (
                        <div className="flex justify-between text-green-600">
                          <span>ส่วนลด (10%):</span>
                          <span>-{discount.toLocaleString()} บาท</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">ค่าจัดส่ง:</span>
                        <span>{cart.length > 0 ? `${SHIPPING_COST} บาท` : 'ฟรี'}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2 border-t">
                        <span>ราคาสุทธิ:</span>
                        <span className="text-orange-500">{total.toLocaleString()} บาท</span>
                      </div>
                    </div>
                    
                    <button className="w-full py-3 bg-orange-500 text-white rounded-lg text-lg font-semibold hover:bg-orange-600">
                      ดำเนินการสั่งซื้อ
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
