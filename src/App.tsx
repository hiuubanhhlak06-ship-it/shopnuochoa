import { useEffect, useState } from "react";
import "./App.css";

type Product = {
  id: number;
  name: string;
  price: number;
  img: string;
  category: string;
  description: string;
  rating: number;
  featured: boolean;
  inStock: boolean;
  discount?: number;
  tags: string[];
};

type CartItem = Product & { qty: number };

type User = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  isPremium: boolean;
  phone?: string;
  address?: string;
};

type Review = {
  id: number;
  productId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
};

type LoginCredentials = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
};

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [fadeKey, setFadeKey] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [notification, setNotification] = useState<{message: string, type: string} | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState<"vi" | "en">("vi");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showNotification, setShowNotification] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // Thêm state cho đăng nhập/đăng ký
  const [loginForm, setLoginForm] = useState<LoginCredentials>({
    email: "",
    password: "",
    rememberMe: false
  });
  
  const [registerForm, setRegisterForm] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });
  
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  
  // Mock users database (trong thực tế sẽ lấy từ API)
  const mockUsers = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "user@example.com",
      password: "password123", // Trong thực tế phải mã hóa
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isPremium: true,
      phone: "0901234567",
      address: "123 Đường ABC, Quận 1, TP.HCM"
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "customer@example.com",
      password: "123456",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      isPremium: false,
      phone: "0987654321",
      address: "456 Đường XYZ, Quận 2, TP.HCM"
    }
  ];

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
      title: "Bộ Sưu Tập Mùa Mới",
      subtitle: "Khám phá hương thơm độc quyền",
      cta: "Xem Ngay"
    },
    {
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
      title: "Ưu Đãi Đặc Biệt",
      subtitle: "Giảm đến 30% cho khách hàng VIP",
      cta: "Mua Ngay"
    },
    {
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
      title: "Nước Hoa Limited Edition",
      subtitle: "Chỉ có 500 chai trên toàn thế giới",
      cta: "Đặt Trước"
    }
  ];

  const categories = [
    { id: "all", name: "Tất Cả", icon: "🌟" },
    { id: "women", name: "Nữ", icon: "👩" },
    { id: "men", name: "Nam", icon: "👨" },
    { id: "unisex", name: "Unisex", icon: "⚥" },
    { id: "limited", name: "Limited", icon: "🎯" },
    { id: "vip", name: "VIP Collection", icon: "👑" }
  ];

  const languages = {
    vi: {
      home: "Trang chủ",
      products: "Sản phẩm",
      cart: "Giỏ hàng",
      checkout: "Thanh toán",
      contact: "Liên hệ",
      login: "Đăng nhập",
      logout: "Đăng xuất",
      profile: "Hồ sơ",
      wishlist: "Yêu thích",
      orders: "Đơn hàng",
      search: "Tìm kiếm sản phẩm...",
      featured: "Sản phẩm nổi bật",
      newArrivals: "Hàng mới về",
      bestSellers: "Bán chạy nhất",
      sale: "Khuyến mãi",
      addToCart: "Thêm vào giỏ",
      viewDetails: "Xem chi tiết",
      total: "Tổng cộng",
      apply: "Áp dụng",
      coupon: "Mã giảm giá",
      checkoutNow: "Thanh toán ngay",
      continueShopping: "Tiếp tục mua sắm",
      emptyCart: "Giỏ hàng trống",
      customerReviews: "Đánh giá từ khách hàng",
      relatedProducts: "Sản phẩm liên quan",
      description: "Mô tả",
      specifications: "Thông số",
      reviews: "Đánh giá",
      shipping: "Giao hàng",
      returns: "Đổi trả",
      support: "Hỗ trợ",
      followUs: "Theo dõi chúng tôi",
      newsletter: "Đăng ký nhận tin",
      subscribe: "Đăng ký",
      privacy: "Chính sách bảo mật",
      terms: "Điều khoản",
      about: "Về chúng tôi",
      careers: "Tuyển dụng",
      blog: "Blog",
      stores: "Cửa hàng",
      register: "Đăng ký",
      rememberMe: "Ghi nhớ đăng nhập",
      forgotPassword: "Quên mật khẩu?",
      haveAccount: "Đã có tài khoản?",
      noAccount: "Chưa có tài khoản?",
      createAccount: "Tạo tài khoản",
      name: "Họ và tên",
      email: "Email",
      password: "Mật khẩu",
      confirmPassword: "Xác nhận mật khẩu",
      phone: "Số điện thoại",
      requiredField: "Trường này là bắt buộc",
      invalidEmail: "Email không hợp lệ",
      passwordMismatch: "Mật khẩu không khớp",
      passwordLength: "Mật khẩu phải có ít nhất 6 ký tự",
      loginSuccess: "Đăng nhập thành công!",
      registerSuccess: "Đăng ký thành công!",
      logoutSuccess: "Đã đăng xuất!",
      welcome: "Chào mừng",
      myAccount: "Tài khoản của tôi",
      editProfile: "Chỉnh sửa hồ sơ",
      changePassword: "Đổi mật khẩu",
      save: "Lưu",
      cancel: "Hủy",
      deleteAccount: "Xóa tài khoản",
      security: "Bảo mật",
      preferences: "Tùy chọn"
    },
    en: {
      home: "Home",
      products: "Products",
      cart: "Cart",
      checkout: "Checkout",
      contact: "Contact",
      login: "Login",
      logout: "Logout",
      profile: "Profile",
      wishlist: "Wishlist",
      orders: "Orders",
      search: "Search products...",
      featured: "Featured Products",
      newArrivals: "New Arrivals",
      bestSellers: "Best Sellers",
      sale: "Sale",
      addToCart: "Add to Cart",
      viewDetails: "View Details",
      total: "Total",
      apply: "Apply",
      coupon: "Coupon Code",
      checkoutNow: "Checkout Now",
      continueShopping: "Continue Shopping",
      emptyCart: "Your cart is empty",
      customerReviews: "Customer Reviews",
      relatedProducts: "Related Products",
      description: "Description",
      specifications: "Specifications",
      reviews: "Reviews",
      shipping: "Shipping",
      returns: "Returns",
      support: "Support",
      followUs: "Follow Us",
      newsletter: "Newsletter",
      subscribe: "Subscribe",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      about: "About Us",
      careers: "Careers",
      blog: "Blog",
      stores: "Stores",
      register: "Register",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      haveAccount: "Already have an account?",
      noAccount: "Don't have an account?",
      createAccount: "Create account",
      name: "Full name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      phone: "Phone number",
      requiredField: "This field is required",
      invalidEmail: "Invalid email",
      passwordMismatch: "Passwords don't match",
      passwordLength: "Password must be at least 6 characters",
      loginSuccess: "Login successful!",
      registerSuccess: "Registration successful!",
      logoutSuccess: "Logged out!",
      welcome: "Welcome",
      myAccount: "My Account",
      editProfile: "Edit Profile",
      changePassword: "Change Password",
      save: "Save",
      cancel: "Cancel",
      deleteAccount: "Delete Account",
      security: "Security",
      preferences: "Preferences"
    }
  };

  const t = languages[language];

  const products: Product[] = [
    { 
      id: 1, 
      name: "Luxury Gold Eau de Parfum", 
      price: 5200000, 
      img: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "women",
      description: "Hương thơm sang trọng với tầng hương hoa cỏ tự nhiên, phù hợp cho những dịp đặc biệt.",
      rating: 4.8,
      featured: true,
      inStock: true,
      discount: 15,
      tags: ["Bán chạy", "Mới", "Limited"]
    },
    { 
      id: 2, 
      name: "Rose Velvet Elixir", 
      price: 6900000, 
      img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "women",
      description: "Sự kết hợp hoàn hảo giữa hoa hồng Bulgaria và gỗ đàn hương.",
      rating: 4.9,
      featured: true,
      inStock: true,
      tags: ["Premium", "Nữ tính"]
    },
    { 
      id: 3, 
      name: "Night Noir Signature", 
      price: 7800000, 
      img: "https://images.unsplash.com/photo-1590736969957-7eb631165349?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "men",
      description: "Hương thơm nam tính mạnh mẽ với hương gỗ và da thuộc.",
      rating: 4.7,
      featured: true,
      inStock: true,
      tags: ["Nam tính", "Mạnh mẽ"]
    },
    { 
      id: 4, 
      name: "Ocean Breeze Limited", 
      price: 4500000, 
      img: "https://images.unsplash.com/photo-1590736969957-7eb631165349?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "unisex",
      description: "Hương thơm tươi mát như làn gió biển, phù hợp mọi lứa tuổi.",
      rating: 4.6,
      featured: false,
      inStock: true,
      discount: 20,
      tags: ["Unisex", "Tươi mát"]
    },
    { 
      id: 5, 
      name: "Royal Oud Collection", 
      price: 12000000, 
      img: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "vip",
      description: "Bộ sưu tập độc quyền với tinh dầu oud quý hiếm từ Trung Đông.",
      rating: 5.0,
      featured: true,
      inStock: false,
      tags: ["VIP", "Độc quyền", "Limited"]
    },
    { 
      id: 6, 
      name: "Floral Garden Mist", 
      price: 3800000, 
      img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "women",
      description: "Hương hoa cỏ nhẹ nhàng, thanh khiết như khu vườn mùa xuân.",
      rating: 4.5,
      featured: false,
      inStock: true,
      tags: ["Hoa cỏ", "Nhẹ nhàng"]
    },
    { 
      id: 7, 
      name: "Black Leather Essence", 
      price: 6500000, 
      img: "https://images.unsplash.com/photo-1590736969957-7eb631165349?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "men",
      description: "Hương da thuộc đậm chất cổ điển kết hợp với gỗ tuyết tùng.",
      rating: 4.8,
      featured: true,
      inStock: true,
      discount: 10,
      tags: ["Da thuộc", "Cổ điển"]
    },
    { 
      id: 8, 
      name: "Citrus Sunrise Splash", 
      price: 4200000, 
      img: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "unisex",
      description: "Hương cam chanh tươi mát, hoàn hảo cho ngày mới tràn đầy năng lượng.",
      rating: 4.4,
      featured: false,
      inStock: true,
      tags: ["Cam chanh", "Năng động"]
    }
  ];

  const reviews: Review[] = [
    {
      id: 1,
      productId: 1,
      userName: "Nguyễn Thị Lan",
      rating: 5,
      comment: "Hương thơm tuyệt vời, lưu hương rất lâu. Tôi nhận được rất nhiều lời khen!",
      date: "2024-03-15",
      verified: true
    },
    {
      id: 2,
      productId: 1,
      userName: "Trần Văn Hùng",
      rating: 4,
      comment: "Chất lượng tốt, đóng gói đẹp. Hơi đắt nhưng xứng đáng.",
      date: "2024-03-10",
      verified: true
    },
    {
      id: 3,
      productId: 2,
      userName: "Lê Minh Anh",
      rating: 5,
      comment: "Mùi hương quyến rũ, phù hợp với công sở. Sẽ mua thêm!",
      date: "2024-03-05",
      verified: true
    }
  ];

  // ===== Effects =====
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedUser = localStorage.getItem("user");
    const savedTheme = localStorage.getItem("theme");
    const savedLanguage = localStorage.getItem("language");
    const savedWishlist = localStorage.getItem("wishlist");
    const savedCredentials = localStorage.getItem("rememberedCredentials");

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedTheme) setTheme(savedTheme as "light" | "dark");
    if (savedLanguage) setLanguage(savedLanguage as "vi" | "en");
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    
    // Tự động điền thông tin đăng nhập nếu có "Ghi nhớ đăng nhập"
    if (savedCredentials) {
      const credentials = JSON.parse(savedCredentials);
      setLoginForm({
        email: credentials.email,
        password: credentials.password,
        rememberMe: true
      });
    }
    
    // Auto slide
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("theme", theme);
    localStorage.setItem("language", language);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    document.documentElement.setAttribute("data-theme", theme);
  }, [cart, theme, language, wishlist]);

  // Load Yandex Ads Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://yandex.ru/ads/system/context.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Render Yandex Ads
  useEffect(() => {
    if ((window as any).Ya && (window as any).Ya.Context) {
      (window as any).Ya.Context.AdvManager.render({
        renderTo: 'yandex_rtb_R-A-19039787-1',
        blockId: 'R-A-19039787-1'
      });
    }
  }, []);

  // ===== Functions =====
  const goPage = (p: string) => {
    setLoading(true);
    setTimeout(() => {
      setPage(p);
      setFadeKey(k => k + 1);
      setShowMobileMenu(false);
      setLoading(false);
    }, 300);
  };

  const showNotificationMessage = (message: string, type: string = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (p: Product) => {
    if (!p.inStock) {
      showNotificationMessage("Sản phẩm đã hết hàng!", "error");
      return;
    }

    const found = cart.find(c => c.id === p.id);
    if (found) {
      setCart(cart.map(c => c.id === p.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...p, qty: 1 }]);
    }
    showNotificationMessage("Đã thêm vào giỏ hàng!");
  };

  const changeQty = (id: number, delta: number) => {
    setCart(
      cart
        .map(c => c.id === id ? { ...c, qty: c.qty + delta } : c)
        .filter(c => c.qty > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(c => c.id !== id));
    showNotificationMessage("Đã xóa sản phẩm khỏi giỏ hàng!");
  };

  const toggleWishlist = (product: Product) => {
    if (wishlist.find(p => p.id === product.id)) {
      setWishlist(wishlist.filter(p => p.id !== product.id));
      showNotificationMessage("Đã xóa khỏi danh sách yêu thích!");
    } else {
      setWishlist([...wishlist, product]);
      showNotificationMessage("Đã thêm vào danh sách yêu thích!");
    }
  };

  const handleLogin = async () => {
    // Validation
    if (!loginForm.email.trim()) {
      showNotificationMessage("Vui lòng nhập email!", "error");
      return;
    }
    
    if (!loginForm.password.trim()) {
      showNotificationMessage("Vui lòng nhập mật khẩu!", "error");
      return;
    }

    // Mock API call
    setLoading(true);
    setTimeout(() => {
      const foundUser = mockUsers.find(
        u => u.email === loginForm.email && u.password === loginForm.password
      );

      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        const userData: User = {
          ...userWithoutPassword
        };
        
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        
        // Lưu thông tin đăng nhập nếu chọn "Ghi nhớ"
        if (loginForm.rememberMe) {
          localStorage.setItem("rememberedCredentials", JSON.stringify({
            email: loginForm.email,
            password: loginForm.password
          }));
        } else {
          localStorage.removeItem("rememberedCredentials");
        }
        
        showNotificationMessage(t.loginSuccess);
        setShowLogin(false);
        goPage("home");
      } else {
        showNotificationMessage("Email hoặc mật khẩu không đúng!", "error");
      }
      setLoading(false);
    }, 1000);
  };

  const handleRegister = () => {
    // Validation
    const errors: string[] = [];
    
    if (!registerForm.name.trim()) errors.push(t.name + " " + t.requiredField);
    if (!registerForm.email.trim()) errors.push(t.email + " " + t.requiredField);
    if (!registerForm.password) errors.push(t.password + " " + t.requiredField);
    if (!registerForm.confirmPassword) errors.push(t.confirmPassword + " " + t.requiredField);
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (registerForm.email && !emailRegex.test(registerForm.email)) {
      errors.push(t.invalidEmail);
    }
    
    if (registerForm.password && registerForm.password.length < 6) {
      errors.push(t.passwordLength);
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      errors.push(t.passwordMismatch);
    }
    
    if (errors.length > 0) {
      showNotificationMessage(errors.join(". "), "error");
      return;
    }

    // Check if email already exists
    if (mockUsers.some(u => u.email === registerForm.email)) {
      showNotificationMessage("Email đã được sử dụng!", "error");
      return;
    }

    // Mock registration
    setLoading(true);
    setTimeout(() => {
      const newUser: User = {
        id: mockUsers.length + 1,
        name: registerForm.name,
        email: registerForm.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(registerForm.name)}&background=random`,
        isPremium: false,
        phone: registerForm.phone || ""
      };

      // In thực tế, bạn sẽ gửi dữ liệu này đến API
      console.log("New user registered:", newUser);
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      // Clear form
      setRegisterForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: ""
      });
      
      showNotificationMessage(t.registerSuccess);
      setShowRegister(false);
      setShowLogin(false);
      goPage("home");
      setLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("rememberedCredentials");
    showNotificationMessage(t.logoutSuccess);
    goPage("home");
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    showNotificationMessage("Cập nhật hồ sơ thành công!");
  };

  const applyCoupon = () => {
    if (couponCode === "VIP10") {
      setDiscount(10);
      showNotificationMessage("Áp dụng mã giảm giá 10% thành công!");
    } else if (couponCode === "WELCOME20") {
      setDiscount(20);
      showNotificationMessage("Áp dụng mã giảm giá 20% thành công!");
    } else {
      showNotificationMessage("Mã giảm giá không hợp lệ!", "error");
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredProducts = products.filter(p => p.featured);
  const newArrivals = products.slice(0, 4);

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const discountAmount = (total * discount) / 100;
  const finalTotal = total - discountAmount;

  const openProductModal = (product: Product) => {
    setCurrentProduct(product);
    setShowProductModal(true);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star} className={star <= rating ? "star filled" : "star"}>
            ★
          </span>
        ))}
        <span className="rating-number">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // ===== Modal Đăng nhập =====
  const LoginModal = () => (
    <div className="modal-overlay" onClick={() => setShowLogin(false)}>
      <div className="modal-content auth-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setShowLogin(false)}>×</button>
        
        {showRegister ? (
          // Form đăng ký
          <>
            <h2>{t.register}</h2>
            <div className="form-group">
              <input
                type="text"
                placeholder={t.name}
                value={registerForm.name}
                onChange={e => setRegisterForm({...registerForm, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder={t.email}
                value={registerForm.email}
                onChange={e => setRegisterForm({...registerForm, email: e.target.value})}
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                placeholder={t.phone + " (Tùy chọn)"}
                value={registerForm.phone}
                onChange={e => setRegisterForm({...registerForm, phone: e.target.value})}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder={t.password}
                value={registerForm.password}
                onChange={e => setRegisterForm({...registerForm, password: e.target.value})}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder={t.confirmPassword}
                value={registerForm.confirmPassword}
                onChange={e => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
              />
            </div>
            <button className="btn-primary full-width" onClick={handleRegister}>
              {t.register}
            </button>
            <p className="auth-switch">
              {t.haveAccount} <button onClick={() => setShowRegister(false)}>{t.login}</button>
            </p>
          </>
        ) : (
          // Form đăng nhập
          <>
            <h2>{t.login}</h2>
            <div className="form-group">
              <input
                type="email"
                placeholder={t.email}
                value={loginForm.email}
                onChange={e => setLoginForm({...loginForm, email: e.target.value})}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder={t.password}
                value={loginForm.password}
                onChange={e => setLoginForm({...loginForm, password: e.target.value})}
              />
            </div>
            <div className="form-options">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={loginForm.rememberMe}
                  onChange={e => setLoginForm({...loginForm, rememberMe: e.target.checked})}
                />
                <span>{t.rememberMe}</span>
              </label>
              <button className="text-btn">{t.forgotPassword}</button>
            </div>
            <button className="btn-primary full-width" onClick={handleLogin}>
              {t.login}
            </button>
            <p className="auth-switch">
              {t.noAccount} <button onClick={() => setShowRegister(true)}>{t.createAccount}</button>
            </p>
            
            {/* Social login options */}
            <div className="social-login">
              <p>Hoặc đăng nhập với</p>
              <div className="social-buttons">
                <button className="social-btn google">G</button>
                <button className="social-btn facebook">f</button>
                <button className="social-btn apple"></button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className={`app ${theme}`}>
      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      {/* Login/Register Modal */}
      {showLogin && <LoginModal />}

      {/* Product Modal */}
      {showProductModal && currentProduct && (
        <div className="modal-overlay" onClick={() => setShowProductModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowProductModal(false)}>×</button>
            <div className="modal-product">
              <img src={currentProduct.img} alt={currentProduct.name} />
              <div className="modal-product-info">
                <h2>{currentProduct.name}</h2>
                <div className="price-section">
                  {currentProduct.discount && (
                    <span className="original-price">
                      {(currentProduct.price * 1.15).toLocaleString()} đ
                    </span>
                  )}
                  <span className="current-price">
                    {currentProduct.price.toLocaleString()} đ
                  </span>
                  {currentProduct.discount && (
                    <span className="discount-badge">-{currentProduct.discount}%</span>
                  )}
                </div>
                {renderStars(currentProduct.rating)}
                <p>{currentProduct.description}</p>
                <div className="tags">
                  {currentProduct.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="modal-actions">
                  <button 
                    className="btn-primary" 
                    onClick={() => addToCart(currentProduct)}
                    disabled={!currentProduct.inStock}
                  >
                    {currentProduct.inStock ? t.addToCart : "Hết hàng"}
                  </button>
                  <button 
                    className="btn-secondary"
                    onClick={() => toggleWishlist(currentProduct)}
                  >
                    {wishlist.find(p => p.id === currentProduct.id) ? "❤️ Đã thích" : "🤍 Thêm vào yêu thích"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="header">
        <div className="header-top">
          <div className="container">
            <div className="header-top-content">
              <span>🔥 Ưu đãi đặc biệt: Giảm 20% cho đơn hàng đầu tiên</span>
              <div className="header-top-right">
                <select value={language} onChange={e => setLanguage(e.target.value as "vi" | "en")}>
                  <option value="vi">🇻🇳 Tiếng Việt</option>
                  <option value="en">🇺🇸 English</option>
                </select>
                <button className="theme-toggle" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                  {theme === "light" ? "🌙" : "☀️"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="header-main">
          <div className="container">
            <div className="header-main-content">
              {/* Logo với animation */}
              <div className="logo-container" onClick={() => goPage("home")}>
                <div className="logo-animated">
                  <span className="logo-icon">🌸</span>
                  <div className="logo-text">
                    <span className="logo-main">ELYSIUM</span>
                    <span className="logo-sub">PERFUME COLLECTION</span>
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="search-bar">
                <input
                  type="text"
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <button className="search-btn">🔍</button>
              </div>

              {/* User Actions */}
              <div className="user-actions">
                {user ? (
                  <>
                    <button className="user-menu" onClick={() => goPage("profile")}>
                      <img src={user.avatar} alt={user.name} className="user-avatar" />
                      <span className="user-name">{user.name.split(' ')[0]}</span>
                      {user.isPremium && <span className="premium-badge">VIP</span>}
                    </button>
                    <button className="icon-btn" onClick={() => goPage("wishlist")}>
                      ❤️ {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
                    </button>
                    <button className="icon-btn" onClick={() => goPage("orders")}>
                      📦
                    </button>
                    <button className="icon-btn logout-btn" onClick={handleLogout} title={t.logout}>
                      👋
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn-outline" onClick={() => setShowLogin(true)}>
                      👤 {t.login}
                    </button>
                    <button className="btn-primary" onClick={() => {
                      setShowRegister(true);
                      setShowLogin(true);
                    }}>
                      {t.register}
                    </button>
                  </>
                )}
                <button className="icon-btn cart-btn" onClick={() => goPage("cart")}>
                  🛒 {cart.length > 0 && <span className="badge">{cart.reduce((sum, item) => sum + item.qty, 0)}</span>}
                </button>
                <button className="mobile-menu-btn" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                  ☰
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`navbar ${showMobileMenu ? 'show' : ''}`}>
          <div className="container">
            <div className="nav-content">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`nav-item ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    goPage("products");
                  }}
                >
                  <span className="nav-icon">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="mobile-menu">
            <button onClick={() => goPage("home")}>🏠 {t.home}</button>
            <button onClick={() => goPage("products")}>🛍️ {t.products}</button>
            <button onClick={() => goPage("cart")}>🛒 {t.cart}</button>
            <button onClick={() => goPage("checkout")}>💳 {t.checkout}</button>
            <button onClick={() => goPage("contact")}>📞 {t.contact}</button>
            {user ? (
              <>
                <button onClick={() => goPage("profile")}>👤 {t.profile}</button>
                <button onClick={() => goPage("wishlist")}>❤️ {t.wishlist}</button>
                <button onClick={handleLogout}>🚪 {t.logout}</button>
              </>
            ) : (
              <>
                <button onClick={() => setShowLogin(true)}>🔐 {t.login}</button>
                <button onClick={() => {
                  setShowRegister(true);
                  setShowLogin(true);
                }}>📝 {t.register}</button>
              </>
            )}
          </div>
        )}
      </header>

      {/* ... (phần còn lại của code giữ nguyên từ dòng 717 trở đi) ... */}
      {/* HERO SLIDER */}
      <div className="hero-slider">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay">
              <div className="hero-content">
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
                <button className="hero-cta" onClick={() => goPage("products")}>
                  {slide.cta} →
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="slider-controls">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* PROMO BANNERS */}
      <div className="promo-banners">
        <div className="promo-card vip-promo">
          <div className="promo-content">
            <h3>🎁 Ưu đãi thành viên VIP</h3>
            <p>Giảm thêm 15%, tích điểm 2x, miễn phí vận chuyển</p>
            <button className="btn-outline-white">Đăng ký ngay</button>
          </div>
        </div>
        <div className="promo-card shipping-promo">
          <div className="promo-content">
            <h3>🚚 Miễn phí vận chuyển</h3>
            <p>Cho đơn hàng từ 2.000.000 đ trong nội thành</p>
          </div>
        </div>
        <div className="promo-card gift-promo">
          <div className="promo-content">
            <h3>🎀 Quà tặng đặc biệt</h3>
            <p>Tặng kèm sample và hộp quà cao cấp</p>
          </div>
        </div>
      </div>

      <main key={fadeKey} className={`main ${page === 'home' ? 'home-page' : ''}`}>
        
        {/* HOME PAGE - giữ nguyên ... */}
        {page === "home" && (
          <>
            {/* Featured Products */}
            <section className="section">
              <div className="section-header">
                <h2 className="section-title">{t.featured}</h2>
                <button className="view-all" onClick={() => goPage("products")}>
                  Xem tất cả →
                </button>
              </div>
              <div className="products-grid">
                {featuredProducts.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-image">
                      <img src={product.img} alt={product.name} />
                      {product.discount && (
                        <div className="product-badge discount">-{product.discount}%</div>
                      )}
                      {!product.inStock && (
                        <div className="product-badge out-of-stock">Hết hàng</div>
                      )}
                      <button 
                        className="wishlist-btn"
                        onClick={() => toggleWishlist(product)}
                      >
                        {wishlist.find(p => p.id === product.id) ? "❤️" : "🤍"}
                      </button>
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      {renderStars(product.rating)}
                      <div className="price">
                        {product.discount ? (
                          <>
                            <span className="original-price">
                              {(product.price * 1.15).toLocaleString()} đ
                            </span>
                            <span className="current-price">
                              {product.price.toLocaleString()} đ
                            </span>
                          </>
                        ) : (
                          <span className="current-price">
                            {product.price.toLocaleString()} đ
                          </span>
                        )}
                      </div>
                      <div className="product-actions">
                        <button 
                          className="btn-primary"
                          onClick={() => openProductModal(product)}
                        >
                          {t.viewDetails}
                        </button>
                        <button 
                          className="btn-secondary"
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                        >
                          {t.addToCart}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Categories */}
            <section className="section">
              <h2 className="section-title">Danh mục nổi bật</h2>
              <div className="categories-grid">
                {categories.slice(1).map(cat => (
                  <div 
                    key={cat.id} 
                    className="category-card"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      goPage("products");
                    }}
                  >
                    <div className="category-icon">{cat.icon}</div>
                    <h3>{cat.name}</h3>
                    <p>Khám phá bộ sưu tập</p>
                  </div>
                ))}
              </div>
            </section>

            {/* New Arrivals */}
            <section className="section">
              <div className="section-header">
                <h2 className="section-title">{t.newArrivals}</h2>
              </div>
              <div className="products-grid">
                {newArrivals.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-image">
                      <img src={product.img} alt={product.name} />
                      <div className="product-badge new">Mới</div>
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      {renderStars(product.rating)}
                      <div className="price">
                        <span className="current-price">
                          {product.price.toLocaleString()} đ
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials */}
            <section className="section testimonials">
              <h2 className="section-title">{t.customerReviews}</h2>
              <div className="testimonials-grid">
                {reviews.map(review => (
                  <div key={review.id} className="testimonial-card">
                    <div className="testimonial-header">
                      <div className="reviewer">
                        <div className="reviewer-avatar">
                          {review.userName.charAt(0)}
                        </div>
                        <div>
                          <h4>{review.userName}</h4>
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      {review.verified && <span className="verified-badge">✓ Đã mua hàng</span>}
                    </div>
                    <p className="testimonial-text">"{review.comment}"</p>
                    <span className="testimonial-date">{review.date}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* PRODUCTS PAGE - giữ nguyên ... */}
        {page === "products" && (
          <>
            <div className="products-header">
              <h1 className="page-title">Bộ Sưu Tập Nước Hoa</h1>
              <div className="products-filters">
                <div className="filter-group">
                  <span className="filter-label">Sắp xếp:</span>
                  <select className="filter-select">
                    <option>Phổ biến nhất</option>
                    <option>Giá thấp đến cao</option>
                    <option>Giá cao đến thấp</option>
                    <option>Đánh giá cao nhất</option>
                  </select>
                </div>
                <div className="filter-group">
                  <span className="filter-label">Hiển thị:</span>
                  <select className="filter-select">
                    <option>Tất cả sản phẩm</option>
                    <option>Còn hàng</option>
                    <option>Đang giảm giá</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="products-content">
              <div className="sidebar">
                <h3>Danh mục</h3>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`sidebar-item ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span className="sidebar-icon">{cat.icon}</span>
                    {cat.name}
                    <span className="sidebar-count">
                      {cat.id === "all" 
                        ? products.length 
                        : products.filter(p => p.category === cat.id).length}
                    </span>
                  </button>
                ))}
              </div>

              <div className="products-list">
                <div className="products-grid">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="product-card detailed">
                      <div className="product-image">
                        <img src={product.img} alt={product.name} />
                        {product.discount && (
                          <div className="product-badge discount">-{product.discount}%</div>
                        )}
                        {!product.inStock && (
                          <div className="product-badge out-of-stock">Hết hàng</div>
                        )}
                        <button 
                          className="wishlist-btn"
                          onClick={() => toggleWishlist(product)}
                        >
                          {wishlist.find(p => p.id === product.id) ? "❤️" : "🤍"}
                        </button>
                      </div>
                      <div className="product-info">
                        <div className="product-header">
                          <h3>{product.name}</h3>
                          <span className="product-category">
                            {categories.find(c => c.id === product.category)?.name}
                          </span>
                        </div>
                        <p className="product-description">{product.description}</p>
                        {renderStars(product.rating)}
                        <div className="price">
                          {product.discount ? (
                            <>
                              <span className="original-price">
                                {(product.price * 1.15).toLocaleString()} đ
                              </span>
                              <span className="current-price">
                                {product.price.toLocaleString()} đ
                              </span>
                            </>
                          ) : (
                            <span className="current-price">
                              {product.price.toLocaleString()} đ
                            </span>
                          )}
                        </div>
                        <div className="product-tags">
                          {product.tags.map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                          ))}
                        </div>
                        <div className="product-actions">
                          <button 
                            className="btn-primary"
                            onClick={() => openProductModal(product)}
                          >
                            {t.viewDetails}
                          </button>
                          <button 
                            className="btn-secondary"
                            onClick={() => addToCart(product)}
                            disabled={!product.inStock}
                          >
                            {t.addToCart}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* CART PAGE - giữ nguyên ... */}
        {page === "cart" && (
          <div className="cart-page">
            <h1 className="page-title">Giỏ Hàng Của Bạn</h1>
            
            {cart.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">🛒</div>
                <h2>{t.emptyCart}</h2>
                <p>Hãy khám phá các sản phẩm tuyệt vời của chúng tôi!</p>
                <button className="btn-primary" onClick={() => goPage("products")}>
                  {t.continueShopping}
                </button>
              </div>
            ) : (
              <div className="cart-content">
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <img src={item.img} alt={item.name} className="cart-item-image" />
                      <div className="cart-item-info">
                        <div className="cart-item-header">
                          <h3>{item.name}</h3>
                          <button 
                            className="remove-btn"
                            onClick={() => removeFromCart(item.id)}
                          >
                            ✕
                          </button>
                        </div>
                        <p className="cart-item-description">{item.description}</p>
                        <div className="cart-item-price">
                          <span>{item.price.toLocaleString()} đ</span>
                          {item.discount && (
                            <span className="cart-item-discount">-{item.discount}%</span>
                          )}
                        </div>
                        <div className="cart-item-controls">
                          <div className="quantity-control">
                            <button onClick={() => changeQty(item.id, -1)}>-</button>
                            <span>{item.qty}</span>
                            <button onClick={() => changeQty(item.id, 1)}>+</button>
                          </div>
                          <div className="cart-item-total">
                            {(item.price * item.qty).toLocaleString()} đ
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="summary-card">
                    <h3>Tóm tắt đơn hàng</h3>
                    <div className="summary-row">
                      <span>Tạm tính:</span>
                      <span>{total.toLocaleString()} đ</span>
                    </div>
                    <div className="summary-row">
                      <span>Giảm giá:</span>
                      <span className="discount-text">-{discountAmount.toLocaleString()} đ</span>
                    </div>
                    <div className="summary-row">
                      <span>Phí vận chuyển:</span>
                      <span>Miễn phí</span>
                    </div>
                    <div className="summary-row total">
                      <span>Tổng cộng:</span>
                      <span className="final-total">{finalTotal.toLocaleString()} đ</span>
                    </div>

                    <div className="coupon-section">
                      <input
                        type="text"
                        placeholder={t.coupon}
                        value={couponCode}
                        onChange={e => setCouponCode(e.target.value)}
                      />
                      <button className="btn-outline" onClick={applyCoupon}>
                        {t.apply}
                      </button>
                    </div>

                    <button className="btn-primary checkout-btn" onClick={() => goPage("checkout")}>
                      🛒 {t.checkoutNow}
                    </button>

                    <button className="btn-outline continue-btn" onClick={() => goPage("products")}>
                      ← {t.continueShopping}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CHECKOUT PAGE - giữ nguyên ... */}
        {page === "checkout" && (
          <div className="checkout-page">
            <h1 className="page-title">Thanh Toán</h1>
            <div className="checkout-content">
              {/* Left: Form */}
              <div className="checkout-form">
                <div className="form-section">
                  <h3>Thông tin giao hàng</h3>
                  <div className="form-grid">
                    <input type="text" placeholder="Họ và tên" />
                    <input type="text" placeholder="Số điện thoại" />
                    <input type="email" placeholder="Email" />
                    <input type="text" placeholder="Địa chỉ" />
                    <select>
                      <option>Chọn thành phố</option>
                      <option>Hà Nội</option>
                      <option>TP. Hồ Chí Minh</option>
                      <option>Đà Nẵng</option>
                    </select>
                    <select>
                      <option>Chọn quận/huyện</option>
                    </select>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Phương thức thanh toán</h3>
                  <div className="payment-methods">
                    <label className="payment-method">
                      <input type="radio" name="payment" defaultChecked />
                      <span className="payment-label">
                        💳 Thanh toán khi nhận hàng
                      </span>
                    </label>
                    <label className="payment-method">
                      <input type="radio" name="payment" />
                      <span className="payment-label">
                        🏦 Chuyển khoản ngân hàng
                      </span>
                    </label>
                    <label className="payment-method">
                      <input type="radio" name="payment" />
                      <span className="payment-label">
                        📱 Ví điện tử (Momo, ZaloPay)
                      </span>
                    </label>
                    <label className="payment-method">
                      <input type="radio" name="payment" />
                      <span className="payment-label">
                        💳 Thẻ tín dụng/ghi nợ
                      </span>
                    </label>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Ghi chú đơn hàng</h3>
                  <textarea 
                    placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                    rows={4}
                  />
                </div>
              </div>

              {/* Right: Order Summary */}
              <div className="order-summary">
                <div className="summary-card">
                  <h3>Đơn hàng của bạn</h3>
                  <div className="order-items">
                    {cart.map(item => (
                      <div key={item.id} className="order-item">
                        <span className="order-item-name">
                          {item.name} × {item.qty}
                        </span>
                        <span className="order-item-price">
                          {(item.price * item.qty).toLocaleString()} đ
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="summary-details">
                    <div className="summary-row">
                      <span>Tạm tính:</span>
                      <span>{total.toLocaleString()} đ</span>
                    </div>
                    <div className="summary-row">
                      <span>Giảm giá:</span>
                      <span>-{discountAmount.toLocaleString()} đ</span>
                    </div>
                    <div className="summary-row">
                      <span>Phí vận chuyển:</span>
                      <span>Miễn phí</span>
                    </div>
                    <div className="summary-row total">
                      <span>Tổng cộng:</span>
                      <span className="final-total">{finalTotal.toLocaleString()} đ</span>
                    </div>
                  </div>
                  <button className="btn-primary place-order-btn">
                    🚀 Đặt hàng ngay
                  </button>
                  <p className="security-note">
                    🔒 Thanh toán an toàn · Bảo mật thông tin
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT PAGE - giữ nguyên ... */}
        {page === "contact" && (
          <div className="contact-page">
            <div className="contact-content">
              <div className="contact-info">
                <h1 className="page-title">Liên Hệ Với Chúng Tôi</h1>
                <div className="contact-methods">
                  <div className="contact-method">
                    <div className="contact-icon">📞</div>
                    <div>
                      <h3>Hotline</h3>
                      <p>1900 1234 (Miễn phí)</p>
                      <p>Thứ 2 - Chủ nhật: 8:00 - 22:00</p>
                    </div>
                  </div>
                  <div className="contact-method">
                    <div className="contact-icon">✉️</div>
                    <div>
                      <h3>Email</h3>
                      <p>support@elysium-perfume.com</p>
                      <p>Phản hồi trong 24h</p>
                    </div>
                  </div>
                  <div className="contact-method">
                    <div className="contact-icon">🏪</div>
                    <div>
                      <h3>Cửa hàng</h3>
                      <p>216 Trần Duy Hưng, Hà Nội</p>
                      <p>Mở cửa: 9:00 - 21:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <form className="contact-form">
                <h2>Gửi tin nhắn</h2>
                <div className="form-group">
                  <input type="text" placeholder="Họ và tên" required />
                  <input type="email" placeholder="Email" required />
                </div>
                <input type="text" placeholder="Số điện thoại" />
                <select required>
                  <option value="">Chọn chủ đề</option>
                  <option>Hỗ trợ đơn hàng</option>
                  <option>Tư vấn sản phẩm</option>
                  <option>Góp ý dịch vụ</option>
                  <option>Hợp tác kinh doanh</option>
                </select>
                <textarea placeholder="Nội dung tin nhắn..." rows={5} required />
                <button type="submit" className="btn-primary">
                  📤 Gửi tin nhắn
                </button>
              </form>
            </div>
          </div>
        )}

        {/* PROFILE PAGE - cập nhật với form chỉnh sửa */}
        {page === "profile" && user && (
          <div className="profile-page">
            <div className="profile-header">
              <div className="profile-avatar">
                <img src={user.avatar} alt={user.name} />
                {user.isPremium && <div className="premium-crown">👑</div>}
                <button className="edit-avatar-btn" title="Đổi ảnh đại diện">📷</button>
              </div>
              <div className="profile-info">
                <h1>{user.name}</h1>
                <p>{user.email}</p>
                <div className="profile-badges">
                  {user.isPremium ? (
                    <span className="badge premium">Thành viên VIP</span>
                  ) : (
                    <span className="badge regular">Thành viên</span>
                  )}
                  <span className="badge points">1,250 điểm</span>
                </div>
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat-card">
                <div className="stat-icon">🛒</div>
                <div className="stat-info">
                  <h3>Đơn hàng</h3>
                  <p className="stat-number">12</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">❤️</div>
                <div className="stat-info">
                  <h3>Yêu thích</h3>
                  <p className="stat-number">{wishlist.length}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-info">
                  <h3>Điểm tích lũy</h3>
                  <p className="stat-number">1,250</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <h3>Đã chi tiêu</h3>
                  <p className="stat-number">25.8M đ</p>
                </div>
              </div>
            </div>

            <div className="profile-tabs">
              <button className="tab active">Thông tin cá nhân</button>
              <button className="tab">Bảo mật</button>
              <button className="tab">Tùy chọn</button>
              <button className="tab">Đơn hàng</button>
            </div>

            <div className="profile-content">
              {/* Thông tin cá nhân */}
              <div className="tab-content active">
                <h3>Thông tin cá nhân</h3>
                <form className="profile-form">
                  <div className="form-group">
                    <label>Họ và tên</label>
                    <input 
                      type="text" 
                      value={user.name} 
                      onChange={e => updateProfile({ name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      value={user.email} 
                      readOnly
                      className="readonly"
                    />
                  </div>
                  <div className="form-group">
                    <label>Số điện thoại</label>
                    <input 
                      type="tel" 
                      value={user.phone || ""} 
                      onChange={e => updateProfile({ phone: e.target.value })}
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div className="form-group">
                    <label>Địa chỉ</label>
                    <textarea 
                      value={user.address || ""} 
                      onChange={e => updateProfile({ address: e.target.value })}
                      placeholder="Nhập địa chỉ"
                      rows={3}
                    />
                  </div>
                  <button type="button" className="btn-primary">
                    {t.save}
                  </button>
                </form>
              </div>

              {/* Bảo mật */}
              <div className="tab-content">
                <h3>Bảo mật tài khoản</h3>
                <div className="security-section">
                  <h4>Đổi mật khẩu</h4>
                  <form className="security-form">
                    <div className="form-group">
                      <label>Mật khẩu hiện tại</label>
                      <input type="password" placeholder="Nhập mật khẩu hiện tại" />
                    </div>
                    <div className="form-group">
                      <label>Mật khẩu mới</label>
                      <input type="password" placeholder="Nhập mật khẩu mới" />
                    </div>
                    <div className="form-group">
                      <label>Xác nhận mật khẩu mới</label>
                      <input type="password" placeholder="Nhập lại mật khẩu mới" />
                    </div>
                    <button type="button" className="btn-primary">
                      Đổi mật khẩu
                    </button>
                  </form>
                  
                  <div className="danger-zone">
                    <h4>Vùng nguy hiểm</h4>
                    <p>Xóa tài khoản sẽ xóa vĩnh viễn tất cả dữ liệu của bạn.</p>
                    <button className="btn-danger" onClick={() => {
                      if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác!")) {
                        handleLogout();
                        showNotificationMessage("Tài khoản đã được xóa!");
                      }
                    }}>
                      🗑️ Xóa tài khoản
                    </button>
                  </div>
                </div>
              </div>

              {/* Tùy chọn */}
              <div className="tab-content">
                <h3>Tùy chọn</h3>
                <div className="preferences">
                  <div className="preference-item">
                    <span>Nhận thông báo qua email</span>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="preference-item">
                    <span>Nhận tin khuyến mãi</span>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="preference-item">
                    <span>Hiển thị đánh giá ẩn danh</span>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Đơn hàng */}
              <div className="tab-content">
                <h3>Đơn hàng gần đây</h3>
                <div className="orders-list">
                  {[1, 2, 3].map(order => (
                    <div key={order} className="order-card">
                      <div className="order-header">
                        <div>
                          <h4>Đơn hàng #ORD202400{order}</h4>
                          <p>Ngày đặt: 2024-03-{15 + order}</p>
                        </div>
                        <span className="order-status delivered">Đã giao</span>
                      </div>
                      <div className="order-total">
                        <span>Tổng tiền:</span>
                        <span className="total-amount">{(order * 2500000).toLocaleString()} đ</span>
                      </div>
                      <button className="btn-outline">Xem chi tiết</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WISHLIST PAGE - giữ nguyên ... */}
        {page === "wishlist" && (
          <div className="wishlist-page">
            <h1 className="page-title">Sản Phẩm Yêu Thích</h1>
            {wishlist.length === 0 ? (
              <div className="empty-wishlist">
                <div className="empty-icon">❤️</div>
                <h2>Danh sách yêu thích trống</h2>
                <p>Hãy thêm sản phẩm bạn yêu thích vào đây!</p>
                <button className="btn-primary" onClick={() => goPage("products")}>
                  Khám phá sản phẩm
                </button>
              </div>
            ) : (
              <div className="wishlist-grid">
                {wishlist.map(product => (
                  <div key={product.id} className="wishlist-card">
                    <img src={product.img} alt={product.name} />
                    <div className="wishlist-info">
                      <h3>{product.name}</h3>
                      {renderStars(product.rating)}
                      <div className="price">
                        {product.price.toLocaleString()} đ
                      </div>
                      <div className="wishlist-actions">
                        <button 
                          className="btn-primary"
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                        >
                          {product.inStock ? t.addToCart : "Hết hàng"}
                        </button>
                        <button 
                          className="btn-outline"
                          onClick={() => toggleWishlist(product)}
                        >
                          ✕ Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* NEWSLETTER */}
      {showNotification && (
        <div className="newsletter">
          <div className="newsletter-content">
            <button className="newsletter-close" onClick={() => setShowNotification(false)}>×</button>
            <h3>🎁 Nhận ưu đãi đặc biệt!</h3>
            <p>Đăng ký nhận bản tin để nhận ngay voucher 10%</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Email của bạn" />
              <button className="btn-primary">Đăng ký</button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <h4>Về Chúng Tôi</h4>
              <p>Elysium Perfume Collection - Nước hoa cao cấp từ Pháp</p>
            </div>
            <div className="footer-column">
              <h4>Liên Hệ</h4>
              <p>Email: info@elysium.com</p>
              <p>Hotline: 1900-0000</p>
            </div>
            <div className="footer-column">
              <h4>Mạng Xã Hội</h4>
              <p>Facebook | Instagram | Twitter</p>
            </div>
          </div>
        </div>

        {/* Yandex Ads */}
        <div style={{ margin: '20px 0', textAlign: 'center', backgroundColor: '#f5f5f5', padding: '20px' }}>
          <div id="yandex_rtb_R-A-19039787-1"></div>
        </div>

        <div className="container">
          <div className="footer-bottom-content">
            <p>© 2024 Elysium Perfume Collection. Bảo lưu mọi quyền.</p>
            <div className="payment-methods">
              <span>💳</span>
              <span>🏦</span>
              <span>📱</span>
              <span>💰</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
