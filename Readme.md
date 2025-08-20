
### 📦 Parcel Delivery server
A secure, modular, and role-based backend API for a parcel delivery system inspired by services like Pathao Courier and Sundarban. Built using **Express.js** and **Mongoose**, this system supports robust **authentication**, **role-based authorization**, and **parcel tracking** with status history.

---

#### 🚀 Features
- 🔐 JWT-based authentication with secure password hashing (bcrypt)
- 🎭 Role-based access for **Admin**, **Sender**, and **Receiver**
- 📦 Full parcel lifecycle: create, cancel, dispatch, track, deliver
- 📜 Embedded parcel status logs with timestamps and history
- 🧱 Clean, modular architecture using Express and Mongoose
- 🧾 Unique parcel tracking ID generation (`TRK-YYYYMMDD-xxxxxx`)
- 🔎 Filter/search parcels by status, date, or role
- 🛑 Parcel and user blocking system
- 🧪 Full CRUD APIs with status codes and validations

---

#### 🧰 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT, Bcrypt
- **Validation:** Custom middleware and Mongoose schema validations

---

#### 📦 Live Link

```bash
🌍 Live Deployment Link -> https://delivery-server-three.vercel.app 
```
