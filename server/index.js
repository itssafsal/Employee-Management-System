// Existing imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Admin schema for login
const adminSchema = mongoose.Schema({
  username: String,
  password: String,
});

// Employee schema
const schemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    designation: String,
    gender: String,
    course: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

// Models
const adminModel = mongoose.model("adminLoginDetails", adminSchema);
const model = mongoose.model("Employee", schemaData);

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, files, cb) => {
    cb(null, "../ui/public/empImages");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "No token provided!" });
  }

  jwt.verify(token.split(" ")[1], "123abc", (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

// Login endpoint
app.post("/loginapi", async (req, res) => {
  const { username, password } = req.body;
  const admin = await adminModel.findOne({ username });
  const adminUsername = "admin";
  const adminPassword = "123abc";

  if (!admin) {
    if (username === adminUsername && password === adminPassword) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const newAdmin = new adminModel({
        username: adminUsername,
        password: hashedPassword,
      });
      await newAdmin.save();

      const token = jwt.sign({ id: newAdmin._id }, "123abc", {
        expiresIn: 86400,
      });
      return res.json({ success: true, token });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
  }

  const isPasswordValid = bcrypt.compareSync(password, admin.password);
  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid password" });
  }

  const token = jwt.sign({ id: admin._id }, "123abc", { expiresIn: 86400 });
  res.json({ success: true, token });
});

// Read all employees (protected)
app.get("/", verifyToken, async (req, res) => {
  const data = await model.find({});
  res.json({ success: true, data: data });
});

// Create employee (protected)
app.post("/create", verifyToken, upload.single("file"), async (req, res) => {
  const imageName = req.file.filename;
  const empData = new model(req.body);
  empData.image = imageName;
  await model.create(empData);
  res.send({ success: true, message: "Employee created" });
});

// Update employee
// Update employee (protected)
app.put("/update/:id", verifyToken, upload.single("file"), async (req, res) => {
  try {
    const { id } = req.params;

    // Get the existing employee data
    const existingEmployee = await model.findById(id);
    if (!existingEmployee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    // Prepare updated data
    const updatedData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      designation: req.body.designation,
      gender: req.body.gender,
      course: req.body.course,
    };

    // If a new file is uploaded, replace the image
    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const result = await model.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.json({
      success: true,
      message: "Employee updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res
      .status(500)
      .json({ success: false, message: "Error updating employee" });
  }
});

// Delete employee
app.delete("/delete/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const data = await model.deleteOne({ _id: id });
  res.send({ success: true, message: "Employee removed", data: data });
});

// Connect to MongoDB and start server
mongoose
  .connect("mongodb://localhost:27017/EMS")
  .then(() => {
    console.log("DB connected with server");
    app.listen(PORT, () => console.log("server started"));
  })
  .catch(() => console.log("connection error"));
