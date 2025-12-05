# 📚 Hệ thống Quản lý Thư viện

> Ứng dụng web quản lý thư viện toàn diện với giao diện hiện đại, hỗ trợ quản lý sách, độc giả, nhân viên và phiếu mượn trả.

[![Vue.js](https://img.shields.io/badge/Vue.js-3.5.17-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.16.3-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-5.1.0-000000?logo=express)](https://expressjs.com/)

## 📋 Mục lục

-   [Tính năng](#-tính-năng)
-   [Công nghệ sử dụng](#️-công-nghệ-sử-dụng)
-   [Cấu trúc dự án](#-cấu-trúc-dự-án)
-   [Database Schema](#-database-schema)
-   [Cài đặt và chạy](#-cài-đặt-và-chạy)
-   [API Documentation](#-api-documentation)
-   [Tài khoản mặc định](#-tài-khoản-mặc-định)
-   [Screenshots](#-screenshots)

---

## 🎯 Tính năng

### 👤 Dành cho Độc giả (User)

| Chức năng                 | Mô tả                                  |
| ------------------------- | -------------------------------------- |
| 📖 **Xem danh sách sách** | Browse toàn bộ thư viện với phân trang |
| 🔍 **Tìm kiếm & Lọc**     | Tìm kiếm theo tên sách, tác giả, NXB   |
| 📝 **Đăng ký tài khoản**  | Tạo tài khoản độc giả mới              |
| 🔐 **Đăng nhập**          | Xác thực với JWT Token                 |
| 📚 **Mượn sách**          | Đặt mượn sách trực tuyến               |
| 📊 **Lịch sử mượn**       | Theo dõi sách đã mượn và hạn trả       |
| ⏰ **Thông báo hạn trả**  | Cảnh báo sách sắp hết hạn              |

### 🔧 Dành cho Quản trị viên (Admin)

| Chức năng                 | Mô tả                               |
| ------------------------- | ----------------------------------- |
| 📊 **Dashboard**          | Thống kê tổng quan hệ thống         |
| 📚 **Quản lý Sách**       | CRUD sách (Thêm/Sửa/Xóa/Upload ảnh) |
| 🏢 **Quản lý NXB**        | CRUD nhà xuất bản                   |
| 👥 **Quản lý Độc giả**    | Xem và chỉnh sửa thông tin độc giả  |
| 👔 **Quản lý Nhân viên**  | CRUD nhân viên thư viện             |
| 📋 **Quản lý Phiếu mượn** | Duyệt/Từ chối/Xác nhận trả sách     |
| 🔍 **Tìm kiếm nâng cao**  | Filter theo trạng thái, ngày mượn   |

---

## 🛠️ Công nghệ sử dụng

### Frontend

| Technology     | Version | Mục đích                          |
| -------------- | ------- | --------------------------------- |
| **Vue 3**      | 3.5.17  | Framework chính - Composition API |
| **Vite**       | 7.0.3   | Build tool & Dev server           |
| **Pinia**      | 3.0.3   | State management                  |
| **Vue Router** | 4.5.1   | SPA routing                       |
| **Axios**      | 1.10.0  | HTTP client                       |
| **Pure CSS**   | Custom  | Semantic CSS (không framework)    |

### Backend

| Technology   | Version | Mục đích           |
| ------------ | ------- | ------------------ |
| **Node.js**  | v18+    | JavaScript runtime |
| **Express**  | 5.1.0   | Web framework      |
| **MongoDB**  | 8.16.3  | NoSQL database     |
| **Mongoose** | 8.16.3  | ODM cho MongoDB    |
| **JWT**      | 9.0.2   | Authentication     |
| **bcryptjs** | 3.0.2   | Password hashing   |

### Development Tools

-   **Nodemon** - Auto-restart server
-   **ESLint** - Code linting
-   **Git** - Version control

---

## 📁 Cấu trúc dự án

```plaintext
libary-managerment/
│
├── back-end/                    # Backend API Server
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/            # Business logic
│   │   ├── accountController.js
│   │   ├── bookController.js
│   │   ├── borrowController.js
│   │   ├── publisherController.js
│   │   ├── staffController.js
│   │   └── userController.js
│   ├── models/                 # Mongoose schemas
│   │   ├── Account.js          # User authentication
│   │   ├── Book.js            # Book catalog
│   │   ├── Borrow.js          # Borrowing records
│   │   ├── Publisher.js       # Publishers
│   │   ├── Staff.js           # Staff members
│   │   └── User.js            # Library users
│   ├── routes/                # API endpoints
│   │   ├── accountRoutes.js
│   │   ├── bookRoutes.js
│   │   ├── borrowRoutes.js
│   │   ├── publisherRoutes.js
│   │   ├── staffRoutes.js
│   │   └── userRoutes.js
│   ├── seed/
│   │   └── rootAccount.js     # Create admin account
│   ├── server.js              # Entry point
│   └── package.json
│
├── front-end/                  # Vue 3 SPA
│   ├── public/
│   │   └── images/            # Static assets
│   ├── src/
│   │   ├── assets/
│   │   │   └── styles/        # 16 CSS files (~4,700 lines)
│   │   │       ├── main.css
│   │   │       ├── dark-theme.css
│   │   │       ├── books.css
│   │   │       ├── admin.css
│   │   │       └── ...
│   │   ├── components/        # Reusable components
│   │   │   ├── BookCard.vue
│   │   │   ├── Navbar.vue
│   │   │   ├── AdminSidebar.vue
│   │   │   └── ...
│   │   ├── pages/            # Page components
│   │   │   ├── Home.vue
│   │   │   ├── Books.vue
│   │   │   ├── Admin/
│   │   │   │   ├── Dashboard.vue
│   │   │   │   ├── BooksPage.vue
│   │   │   │   ├── BorrowsPage.vue
│   │   │   │   └── ...
│   │   │   └── Auth/
│   │   │       ├── Login.vue
│   │   │       └── Register.vue
│   │   ├── router/
│   │   │   └── index.js      # Vue Router config
│   │   ├── stores/           # Pinia stores
│   │   │   └── auth.js
│   │   ├── services/         # API services
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── ...
│   │   ├── App.vue
│   │   └── main.js
│   ├── dist/                 # Build output (served by backend)
│   ├── vite.config.js
│   └── package.json
│
├── docs/                     # Documentation
│   └── PhamDuyAnh_B2308346_BaoCao.docx
└── README.md
```

---

## 🗄️ Database Schema

<details>
<summary><b>Xem Entity Relationship Diagram (ERD)</b></summary>

### 📊 Sơ đồ quan hệ

File diagram: [`database-diagram.drawio`](./database-diagram.drawio)

**Cách mở:**

1. Truy cập https://app.diagrams.net
2. File → Open from → Device → Chọn `database-diagram.drawio`

### 📋 Các bảng chính

| Bảng          | Mô tả               | Primary Key       |
| ------------- | ------------------- | ----------------- |
| **User**      | Thông tin độc giả   | maDocGia (Number) |
| **Staff**     | Thông tin nhân viên | msnv (Number)     |
| **Account**   | Tài khoản đăng nhập | \_id (ObjectId)   |
| **Book**      | Danh mục sách       | maSach (Number)   |
| **Publisher** | Nhà xuất bản        | maNXB (Number)    |
| **Borrow**    | Phiếu mượn sách     | \_id (ObjectId)   |

### 🔗 Quan hệ

```plaintext
Account (1) ──────── (1) User/Staff     # Polymorphic (refId + refModel)
Borrow  (N) ──────── (1) User/Staff     # Polymorphic (borrowerId + onModel)
Borrow  (N) ──────── (1) Book           # bookId → maSach
Book    (N) ──────── (1) Publisher      # maNXB → maNXB
```

</details>

---

## 🚀 Cài đặt và chạy

### 📋 Yêu cầu hệ thống

-   **Node.js** v18 trở lên ([Download](https://nodejs.org/))
-   **MongoDB** v6+ ([Download](https://www.mongodb.com/try/download/community))
-   **npm** hoặc **yarn**
-   **Git** (optional)

### 🔧 Bước 1: Clone repository

```bash
git clone https://github.com/anh1650000/CT449_libary-managerment.git
cd libary-managerment
```

### 📦 Bước 2: Cài đặt dependencies

```bash
# Backend
cd back-end
npm install

# Frontend
cd ../front-end
npm install
```

### 🗄️ Bước 3: Khởi động MongoDB

**Windows:**

```bash
net start MongoDB
```

**macOS/Linux:**

```bash
sudo systemctl start mongod
# hoặc
brew services start mongodb-community
```

**Kiểm tra MongoDB đã chạy:**

```bash
mongosh  # Nếu kết nối được là OK
```

### 🏗️ Bước 4: Build frontend

```bash
cd front-end
npm run build
```

Output sẽ ở trong thư mục `front-end/dist/`

### ▶️ Bước 5: Start server

```bash
cd back-end
npm start
```

**Server sẽ chạy tại:** http://localhost:5000

### 🎉 Hoàn tất!

Mở trình duyệt và truy cập:

-   **Trang chủ:** http://localhost:5000
-   **Admin:** http://localhost:5000/admin (login với tài khoản admin)

---

## 🔑 Tài khoản mặc định

Hệ thống tự động tạo tài khoản admin khi khởi động lần đầu:

| Role      | Email               | Password   |
| --------- | ------------------- | ---------- |
| **Admin** | `admin@library.com` | `admin123` |

> ⚠️ **Lưu ý:** Đổi mật khẩu admin sau lần đăng nhập đầu tiên để bảo mật!

---

## 📡 API Documentation

Base URL: `http://localhost:5000`

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint              | Auth | Description                   |
| ------ | --------------------- | ---- | ----------------------------- |
| `POST` | `/api/auth/register`  | ❌   | Đăng ký tài khoản độc giả mới |
| `POST` | `/api/auth/login`     | ❌   | Đăng nhập (trả về JWT token)  |
| `GET`  | `/api/auth/me/:email` | ✅   | Lấy thông tin user hiện tại   |

**Example Request:**

```json
POST /api/auth/login
{
  "email": "admin@library.com",
  "password": "admin123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "email": "admin@library.com",
    "role": "admin"
  }
}
```

### 📚 Books (`/api/library/books`)

| Method   | Endpoint                 | Auth     | Description               |
| -------- | ------------------------ | -------- | ------------------------- |
| `GET`    | `/api/library/books`     | ❌       | Lấy danh sách tất cả sách |
| `GET`    | `/api/library/books/:id` | ❌       | Chi tiết 1 cuốn sách      |
| `POST`   | `/api/library/books`     | 🔒 Admin | Thêm sách mới             |
| `PUT`    | `/api/library/books/:id` | 🔒 Admin | Cập nhật thông tin sách   |
| `DELETE` | `/api/library/books/:id` | 🔒 Admin | Xóa sách                  |

**Query Parameters:**

-   `search` - Tìm kiếm theo tên sách/tác giả
-   `maNXB` - Filter theo nhà xuất bản
-   `page` & `limit` - Phân trang

### 📋 Borrows (`/api/library/borrows`)

| Method   | Endpoint                          | Auth     | Description                 |
| -------- | --------------------------------- | -------- | --------------------------- |
| `GET`    | `/api/library/borrows`            | 🔒 Admin | Danh sách tất cả phiếu mượn |
| `GET`    | `/api/library/borrows/me/:userId` | ✅       | Lịch sử mượn của user       |
| `POST`   | `/api/library/borrows`            | ✅       | Tạo phiếu mượn sách         |
| `PATCH`  | `/api/library/borrows/return/:id` | 🔒 Admin | Xác nhận trả sách           |
| `DELETE` | `/api/library/borrows/:id`        | 🔒 Admin | Xóa phiếu mượn              |

### 🏢 Publishers (`/api/library/publishers`)

| Method   | Endpoint                      | Auth     | Description   |
| -------- | ----------------------------- | -------- | ------------- |
| `GET`    | `/api/library/publishers`     | ❌       | Danh sách NXB |
| `POST`   | `/api/library/publishers`     | 🔒 Admin | Thêm NXB      |
| `PUT`    | `/api/library/publishers/:id` | 🔒 Admin | Cập nhật NXB  |
| `DELETE` | `/api/library/publishers/:id` | 🔒 Admin | Xóa NXB       |

### 👥 Readers & Staff (`/api/management`)

| Method   | Endpoint                      | Auth     | Description         |
| -------- | ----------------------------- | -------- | ------------------- |
| `GET`    | `/api/management/readers`     | 🔒 Admin | Danh sách độc giả   |
| `PUT`    | `/api/management/readers/:id` | 🔒 Admin | Cập nhật độc giả    |
| `DELETE` | `/api/management/readers/:id` | 🔒 Admin | Xóa độc giả         |
| `GET`    | `/api/management/staff`       | 🔒 Admin | Danh sách nhân viên |
| `POST`   | `/api/management/staff`       | 🔒 Admin | Thêm nhân viên      |
| `PUT`    | `/api/management/staff/:id`   | 🔒 Admin | Cập nhật nhân viên  |
| `DELETE` | `/api/management/staff/:id`   | 🔒 Admin | Xóa nhân viên       |

**Legend:**

-   ❌ Public (không cần auth)
-   ✅ User (cần JWT token)
-   🔒 Admin only (role admin)

---

## 🎨 Design & Architecture

### Frontend Design

**100% Semantic CSS** - Không sử dụng framework CSS

```css
/* Ví dụ naming convention */
.book-card {
} /* Component */
.book-card__image {
} /* Element */
.book-card--featured {
} /* Modifier */
.status-badge {
}
.status-badge--available {
}
.status-badge--borrowed {
}
```

**Stats:**

-   16 CSS files tùy chỉnh
-   ~4,700+ lines CSS
-   Dark theme support
-   Responsive design
-   Smooth animations

**Key Features:**

-   ✨ Gradient effects & transitions
-   🌙 Dark mode toggle
-   📱 Mobile-first responsive
-   🎨 Consistent color palette
-   ♿ Accessible UI components

### Authentication Flow

```plaintext
┌─────────────┐       ┌──────────────┐       ┌──────────────┐
│   Client    │       │   Express    │       │   MongoDB    │
│  (Vue SPA)  │       │   Backend    │       │   Database   │
└──────┬──────┘       └───────┬──────┘       └───────┬──────┘
       │                      │                       │
       │  POST /auth/login    │                       │
       │─────────────────────>│                       │
       │   {email, password}  │  Find user & verify   │
       │                      │──────────────────────>│
       │                      │<──────────────────────│
       │  Generate JWT        │      User data        │
       │<─────────────────────│                       │
       │   {token, user}      │                       │
       │                      │                       │
       │  Store in localStorage                       │
       │  + Pinia store       │                       │
       │                      │                       │
       │  Subsequent requests │                       │
       │  with Bearer token   │                       │
       │─────────────────────>│   Verify JWT          │
       │  Authorization:      │                       │
       │  Bearer <token>      │                       │
       └──────────────────────┴───────────────────────┘
```

**Security Features:**

-   🔒 Passwords hashed with bcrypt (10 rounds)
-   🎫 JWT tokens with expiration
-   🛡️ Protected routes with middleware
-   🚫 Auto-logout on token expiry
-   🔐 Role-based access control (RBAC)

---

## 🖼️ Screenshots

<details>
<summary><b>Xem ảnh demo</b></summary>

### 🏠 Trang chủ (Home)

-   Hero section với search bar
-   Featured books
-   Book catalog với pagination

### 📚 Books Page

-   Grid layout responsive
-   Filter & search
-   Book details modal

### 🔐 Authentication

-   Login/Register forms
-   Form validation
-   Smooth transitions

### 👨‍💼 Admin Dashboard

-   Statistics cards
-   Recent activities
-   Dark theme support

### 📊 Admin Management

-   Books management
-   Borrows tracking
-   User management
-   Publisher CRUD

</details>

---

## 🧪 Development

### 🔨 Development Mode

**Backend với hot-reload:**

```bash
cd back-end
npm run dev  # nodemon auto-restart
```

**Frontend với Vite dev server:**

```bash
cd front-end
npm run dev  # http://localhost:5173
```

### 📂 Environment Variables

Tạo file `back-end/.env`:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/library_management

# JWT
JWT_SECRET=your-super-secret-key-here
JWT_EXPIRES_IN=7d

# Admin Account (auto-created on first start)
ADMIN_EMAIL=admin@library.com
ADMIN_PASSWORD=admin123
```

### 🧹 Code Quality

```bash
# Linting (if configured)
npm run lint

# Format code
npm run format
```

---

## ⚠️ Troubleshooting

### ❌ MongoDB không chạy?

**Windows:**

```bash
# Start service
net start MongoDB

# Check status
sc query MongoDB
```

**macOS:**

```bash
brew services start mongodb-community
brew services list
```

**Linux:**

```bash
sudo systemctl start mongod
sudo systemctl status mongod
```

**Kết nối thủ công:**

```bash
mongosh mongodb://localhost:27017
```

### ❌ Port 5000 đã được sử dụng?

**Cách 1:** Đổi port trong `.env`:

```env
PORT=5001
```

**Cách 2:** Kill process đang dùng port:

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### ❌ Frontend không load được?

Rebuild frontend:

```bash
cd front-end
npm run build
cd ../back-end
npm start
```

### ❌ CORS errors?

Backend đã cấu hình CORS. Nếu vẫn lỗi, check:

```javascript
// back-end/server.js
app.use(
    cors({
        origin: "http://localhost:5173", // Vite dev server
        credentials: true,
    })
);
```

### ❌ JWT token expired?

Đăng xuất và đăng nhập lại. Token có thời hạn 7 ngày.

### ❌ MongoDB connection failed?

Check:

1. MongoDB service đang chạy
2. Port 27017 không bị block
3. URI trong `.env` đúng format

---

## 📚 Additional Resources

### 📖 Documentation

-   [Vue 3 Docs](https://vuejs.org/)
-   [Express Guide](https://expressjs.com/en/guide/routing.html)
-   [Mongoose Docs](https://mongoosejs.com/docs/guide.html)
-   [JWT Introduction](https://jwt.io/introduction)

### 🎓 Learning Path

1. **JavaScript ES6+** - Async/Await, Destructuring, Arrow Functions
2. **Vue 3 Composition API** - Setup, Reactive, Computed
3. **RESTful API Design** - CRUD, HTTP Methods, Status Codes
4. **MongoDB Basics** - Collections, Documents, Queries
5. **Authentication** - JWT, Hashing, Sessions

---

## 👨‍💻 Thông tin sinh viên

| Field          | Value                           |
| -------------- | ------------------------------- |
| **Họ và tên**  | Phạm Duy Anh                    |
| **MSSV**       | B2308346                        |
| **Lớp**        | CT449 - Phát triển ứng dụng Web |
| **Giảng viên** | ThS. GVC Nguyễn Minh Trung      |
| **Học kỳ**     | 1 - Năm học 2025-2026           |
| **Trường**     | Đại học Cần Thơ                 |

---

## 🤝 Contributing

Dự án này là bài tập môn học. Mọi đóng góp, góp ý xin gửi về:

📧 Email: anhb2308346@student.ctu.edu.vn  
🐙 GitHub: [@anh1650000](https://github.com/anh1650000)

---

## 📄 License

This project is developed for **educational purposes** as part of the CT449 course curriculum.

© 2025-2026 - Đại học Cần Thơ

---

## 🌟 Features Roadmap (Future)

-   [ ] Real-time notifications với WebSocket
-   [ ] Email notifications cho hạn trả sách
-   [ ] Book reviews & ratings
-   [ ] Advanced search với filters
-   [ ] Export reports (PDF/Excel)
-   [ ] QR code cho sách
-   [ ] Mobile app (React Native)
-   [ ] Multi-language support

---

<div align="center">

**⭐ Nếu thấy project hữu ích, hãy cho 1 star nhé! ⭐**

Made with ❤️ by [Phạm Duy Anh](https://github.com/anh1650000)

</div>
