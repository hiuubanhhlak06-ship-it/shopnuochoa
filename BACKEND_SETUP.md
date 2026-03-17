# Elegance Parfumerie - Backend Setup Guide

## Tổng Quan

Hướng dẫn này cung cấp thông tin để xây dựng backend API cho ứng dụng Elegance Parfumerie.

## Backend Stack Đề Xuất

- **Framework**: Node.js + Express.js (hoặc Django, FastAPI)
- **Database**: MongoDB hoặc PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: Stripe hoặc PayPal

## API Endpoints

### 1. Products API

#### GET /api/products
Lấy tất cả sản phẩm

```bash
curl http://localhost:5000/api/products
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Midnight Elegance",
      "price": 120,
      "category": "Eau de Parfum",
      "image": "url",
      "description": "..."
    }
  ]
}
```

#### GET /api/products/:id
Lấy chi tiết sản phẩm

```bash
curl http://localhost:5000/api/products/1
```

#### GET /api/products?category=Eau%20de%20Parfum
Lấy sản phẩm theo danh mục

#### GET /api/products/search?q=rose
Tìm kiếm sản phẩm

### 2. Orders API

#### POST /api/orders
Tạo đơn hàng mới

```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "items": [
      {
        "productId": 1,
        "quantity": 2,
        "price": 120
      }
    ],
    "shippingAddress": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001"
    },
    "totalAmount": 250
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "ORD-2024-12345",
    "status": "pending",
    "createdAt": "2024-03-17T10:30:00Z"
  }
}
```

#### GET /api/orders/:orderId
Lấy chi tiết đơn hàng

#### GET /api/users/:userId/orders
Lấy tất cả đơn hàng của user

### 3. Payments API

#### POST /api/payments
Xử lý thanh toán

```bash
curl -X POST http://localhost:5000/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORD-2024-12345",
    "amount": 250,
    "currency": "USD",
    "paymentMethod": "card",
    "cardNumber": "4111111111111111",
    "expiryDate": "12/25",
    "cvv": "123"
  }'
```

#### POST /api/payments/validate-card
Xác thực thẻ tín dụng

### 4. Users API

#### POST /api/users/register
Đăng ký người dùng mới

```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "secure_password"
  }'
```

#### POST /api/users/login
Đăng nhập

```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "secure_password"
  }'
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user123",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### GET /api/users/:userId
Lấy thông tin người dùng (require authentication)

```bash
curl -H "Authorization: Bearer jwt_token" \
  http://localhost:5000/api/users/user123
```

#### PUT /api/users/:userId
Cập nhật thông tin người dùng

### 5. Contact API

#### POST /api/contact
Gửi tin nhắn liên hệ

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Product Inquiry",
    "message": "I am interested in your perfumes..."
  }'
```

## Database Schema

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  price: Number,
  category: String,
  image: String,
  description: String,
  stock: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Users Collection
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  password: String (hashed),
  phone: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  wishlist: [ObjectId], // Product IDs
  createdAt: Date,
  updatedAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  orderId: String,
  userId: ObjectId,
  items: [
    {
      productId: ObjectId,
      quantity: Number,
      price: Number
    }
  ],
  shippingAddress: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String
  },
  status: String, // pending, processing, shipped, delivered
  totalAmount: Number,
  paymentStatus: String, // pending, completed, failed
  createdAt: Date,
  updatedAt: Date
}
```

### Payments Collection
```javascript
{
  _id: ObjectId,
  orderId: String,
  amount: Number,
  currency: String,
  paymentMethod: String,
  status: String, // pending, completed, failed
  transactionId: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Authentication

### JWT Token
- Token được trả về sau khi đăng nhập
- Cần được gửi trong header `Authorization: Bearer <token>`
- Token expiration: 24 hours (recommended)

### Bearer Token Example
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": "Error message here",
  "code": "ERROR_CODE"
}
```

### Common HTTP Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Example Node.js + Express Backend

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Products routes
app.get('/api/products', (req, res) => {
  // Your logic here
  res.json({ success: true, data: [] });
});

app.get('/api/products/:id', (req, res) => {
  // Your logic here
  res.json({ success: true, data: {} });
});

// Orders routes
app.post('/api/orders', (req, res) => {
  // Your logic here
  res.json({ success: true, data: {} });
});

// Payments routes
app.post('/api/payments', (req, res) => {
  // Your logic here
  res.json({ success: true, data: {} });
});

// Users routes
app.post('/api/users/register', (req, res) => {
  // Your logic here
  res.json({ success: true, data: {} });
});

app.post('/api/users/login', (req, res) => {
  // Your logic here
  res.json({ success: true, token: '...' });
});

// Contact routes
app.post('/api/contact', (req, res) => {
  // Your logic here
  res.json({ success: true, message: 'Message sent' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

## Environment Variables

Thêm file `.env` trong backend project:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/elegance-parfumerie
JWT_SECRET=your_secret_key_here
STRIPE_API_KEY=your_stripe_key_here
PAYPAL_CLIENT_ID=your_paypal_id_here
EMAIL_SERVICE_API_KEY=your_email_service_key_here
```

## Testing API Endpoints

Sử dụng Postman hoặc cURL để test:

```bash
# Test connection
curl http://localhost:5000/api/products

# Test POST request
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "123456"}'
```

## Security Considerations

1. **HTTPS**: Luôn sử dụng HTTPS trong production
2. **CORS**: Cấu hình CORS đúng cách
3. **Rate Limiting**: Thêm rate limiting để ngăn chặn spam
4. **Input Validation**: Validate tất cả user input
5. **Password Hashing**: Hash password với bcrypt
6. **SQL Injection**: Sử dụng parameterized queries
7. **JWT Expiration**: Set thời gian hết hạn cho JWT tokens

## Deploy Backend

### Tùy chọn:
1. **Heroku** - Dễ deploy
2. **AWS** - EC2, Lambda, App Runner
3. **DigitalOcean** - Droplets, App Platform
4. **Render.com** - Đơn giản và miễn phí
5. **Railway** - Hiện đại và dễ sử dụng

## Contact

Nếu có bất kỳ câu hỏi nào về API, vui lòng liên hệ support@eleganceparfumerie.com
