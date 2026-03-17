# Elegance Parfumerie - E-Commerce Platform

Một ứng dụng e-commerce hiện đại cho một cửa hàng bán nước hoa trực tuyến, được xây dựng bằng React và các công nghệ web tiên tiến.

## 🌟 Tính Năng

- ✨ **Giao diện người dùng đẹp** - Thiết kế hiện đại và responsive
- 🛍️ **Quản lý Giỏ Hàng** - Thêm, xóa, cập nhật sản phẩm
- ❤️ **Wishlist** - Lưu sản phẩm yêu thích
- 💳 **Thanh Toán Secure** - Hỗ trợ thanh toán bằng thẻ tín dụng
- 📦 **Quản lý Đơn Hàng** - Theo dõi đơn hàng
- 🔍 **Tìm Kiếm & Lọc** - Tìm sản phẩm dễ dàng
- 📘 **Thông Tin Sản Phẩm Chi Tiết** - Xem thông tin đầy đủ
- 📱 **Responsive Design** - Hoạt động tốt trên mọi thiết bị
- 🔐 **User Authentication** (Ready for integration)
- 💬 **Contact Form** - Liên hệ với hỗ trợ

## 📁 Cấu Trúc Dự Án

```
src/
├── pages/
│   ├── Home.jsx              # Trang chính
│   ├── Collections.jsx       # Danh sách sản phẩm
│   ├── ProductDetail.jsx     # Chi tiết sản phẩm
│   ├── Cart.jsx              # Giỏ hàng
│   ├── Checkout.jsx          # Thanh toán
│   ├── Wishlist.jsx          # Danh sách yêu thích
│   ├── AboutUs.jsx           # Về chúng tôi
│   └── Contact.jsx           # Liên hệ
├── components/
│   ├── Navbar.jsx            # Thanh điều hướng
│   ├── Hero.jsx              # Hero section
│   ├── FeaturedProducts.jsx  # Sản phẩm nổi bật
│   ├── ProductCard.jsx       # Card sản phẩm
│   ├── BrandStory.jsx        # Câu chuyện thương hiệu
│   ├── Testimonial.jsx       # Bình luận khách hàng
│   └── Footer.jsx            # Chân trang
├── context/
│   └── StoreContext.jsx      # State management (Cart, Wishlist)
├── services/
│   └── api.js                # API services
├── styles/
│   ├── global.css            # CSS chung
│   └── pages.css             # CSS cho pages
├── App.jsx                   # Main app component
└── index.js                  # Entry point
```

## 🚀 Cài Đặt & Chạy

### Yêu Cầu
- Node.js (v14 hoặc cao hơn)
- npm hoặc yarn

### 1. Clone hoặc Download dự án

```bash
cd d:\shopnuochoa
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Chạy development server

```bash
npm start
```

Ứng dụng sẽ mở tại `http://localhost:3000`

### 4. Build cho production

```bash
npm run build
```

Kết quả sẽ ở thư mục `build/`

## 📦 Dependencies

- **React** (^18.3.1) - UI library
- **React DOM** (^18.3.1) - DOM rendering
- **React Router DOM** (^6.x) - Navigation
- **React Icons** (^4.11.0) - Icons
- **React Scripts** (^5.0.1) - Build tools

Install:
```bash
npm install react react-dom react-router-dom react-icons
```

## 🎯 Tính Năng Chi Tiết

### 1. **Home Page**
- Hero section với background image
- Featured products section
- Brand story
- Customer testimonials
- Navigation menu

### 2. **Collections Page**
- Hiển thị tất cả sản phẩm
- Lọc theo danh mục
- Quick view sản phẩm
- Thêm vào giỏ hàng
- Thêm vào wishlist

### 3. **Product Detail Page**
- Hình ảnh sản phẩm lớn
- Chi tiết sản phẩm
- Chọn số lượng
- Nút Thêm vào giỏ hàng
- Nút Thêm vào Wishlist
- Bảng thông tin sản phẩm

### 4. **Shopping Cart**
- Hiển thị tất cả sản phẩm
- Cập nhật số lượng
- Xóa sản phẩm
- Tính toán tổng tiền
- Thanh toán

### 5. **Checkout**
- Form thông tin giao hàng
- Form thông tin thanh toán
- Xác nhận đơn hàng
- Thông báo thành công

### 6. **Wishlist**
- Hiển thị sản phẩm yêu thích
- Xóa khỏi wishlist
- Thêm vào giỏ hàng từ wishlist

### 7. **About Us**
- Câu chuyện thương hiệu
- Sứ mệnh
- Giá trị
- Lợi ích của cửa hàng

### 8. **Contact**
- Thông tin liên hệ
- Form gửi tin nhắn
- Links mạng xã hội

## 💾 State Management

Sử dụng React Context API với file `StoreContext.jsx`:

```javascript
import { useStore } from './context/StoreContext';

const { 
  products,
  cartItems,
  wishlistItems,
  addToCart,
  removeFromCart,
  addToWishlist,
  getCartTotal,
  getCartCount
} = useStore();
```

## 🔌 API Integration

File `src/services/api.js` chứa tất cả function gọi API:

```javascript
import { productAPI, orderAPI, paymentAPI, userAPI, contactAPI } from './services/api';

// Ví dụ
const products = await productAPI.getAllProducts();
const order = await orderAPI.createOrder(orderData);
```

## 📋 Mock Products

Hiện tại dự án sử dụng mock data với 6 sản phẩm mẫu:

1. **Midnight Elegance** - $120
2. **Rose Garden** - $95
3. **Ocean Breeze** - $85
4. **Vanilla Sunset** - $110
5. **Jasmine Nights** - $105
6. **Cedar Woods** - $125

## 🎨 Styling

- **Colors**: Nâu và vàng (luxury theme)
- **Typography**: Playfair Display cho headings, Open Sans cho body
- **Responsive**: Mobile-first approach
- **CSS**: Custom CSS với CSS Variables

## 🔐 Backend Integration

File `BACKEND_SETUP.md` chứa chi tiết API endpoints cần thiết.

### API Endpoints chính:
- `/api/products` - Lấy sản phẩm
- `/api/orders` - Tạo đơn hàng
- `/api/payments` - Xử lý thanh toán
- `/api/users` - Xác thực người dùng
- `/api/contact` - Gửi tin nhắn

Xem [BACKEND_SETUP.md](./BACKEND_SETUP.md) để biết chi tiết.

## 📱 Responsive Breakpoints

- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px
- Small Mobile: < 480px

## 🐛 Troubleshooting

### Port 3000 đã được sử dụng
```bash
# Windows
npx kill-port 3000

# hoặc sử dụng port khác
PORT=3001 npm start
```

### Module not found
```bash
npm install
```

### CSS không load
- Kiểm tra import trong `index.js`
- Clear browser cache
- Restart dev server

## 📝 File Quan Trọng

| File | Mục Đích |
|------|---------|
| `src/App.jsx` | Main routing & app setup |
| `src/context/StoreContext.jsx` | State management |
| `src/services/api.js` | API calls |
| `src/styles/global.css` | Global styles |
| `src/styles/pages.css` | Page-specific styles |
| `BACKEND_SETUP.md` | Backend documentation |

## 🚀 Next Steps

1. **Kết nối Backend** - Cập nhật `api.js` với thực tế API endpoints
2. **Authentication** - Thêm login/register pages
3. **Payment Gateway** - Tích hợp Stripe hoặc PayPal
4. **Email Notifications** - Gửi email xác nhận đơn hàng
5. **Admin Dashboard** - Quản lý sản phẩm & đơn hàng
6. **User Profile** - Quản lý tài khoản người dùng
7. **Order History** - Xem lịch sử đơn hàng
8. **Product Reviews** - Thêm review sản phẩm

## 📞 Support

Để hỗ trợ, vui lòng liên hệ:
- Email: support@eleganceparfumerie.com
- Website: www.eleganceparfumerie.com

## 📄 License

Dự án này được cấp phép dưới MIT License.

## 👨‍💻 Tác Giả

Tạo bởi Elegance Parfumerie Development Team

---

**Created**: March 2024
**Last Updated**: March 17, 2026
