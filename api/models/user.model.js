import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      //   lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    // fullName: {
    //   type: String,
    //   required: true,
    //   trim: true,
    //   index: true,
    // },
    avatar: {
      type: String, // cloudinary string
      default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKsAAACUCAMAAADbGilTAAAAMFBMVEXk5ueutLersbTM0NHn6erh4+TU19mzuLvAxce3vL+orrHFycvq7O3Y293b3t/Q09VQfWixAAAEDElEQVR4nO2c23LcIAxADRY3g/H//22x95Jss2sDwpIz4Tx0kk4fzmgFaEHqMHQ6nU6n0+l0Op1Op/N3AYBBbaQfuWX2AFDzMnq74cclqqv6BlisE0I+EcbZGQK31w9giDbZ/UAKH4eLBVfb6Y3pZitTcLn1vgjRiQ+mt9hadRFbGPyO6N124bbcgOiOVBPTFUILeu/j/xZaw5+1Y47ozVbzysI4Zbsyy8KY9fk/YZSFpcg0RZYtZ0GXRXWVZdsNSk2Tq1MspmCLw5pkPYtq4bp6yHKsL2VqVBP0rqEmA7bAjuQVrSo4BF4x1MsLbK1qCixtFsBcrUof2MOSdYdpIQ2scoi4CkO6uspP15fARkLVqiPrC+kJkwBQqikJCF1j9eZ6hy4JALMLbNBtsQG1CwjahK0tW56uluw4iEhVIchKbtQBe8NQLa7ir4Rv+EWucqZyzb9r+eiqyVyx22t3fe+KVf1drr9obQkyV413JSu0IrYeoDtj669cHhBewTWoCalUh1B/kXGHrtaGBXsYUF4WIr9vGTrTISAXlyO8zEBWBJL0kgj3LWaivYHFXLyQXrtgdwLK66yV+uOA8Av3jYp3uCfkLzGQ9xT/Bkf+EAO68jyYGF4OKy/giDeBO1VVLNODbF0WML3Kh/IskAtbG1zp6SUtX2OGyml3+q7KZrpSIsusCgWyzKoJZTN3g4mlI+OV4LOCKmgfYT8A+jgPpOPv0NsA5T81vz5Uxwt0Pt4BtdMAK4W9VmcxzNa87YGWxsdLmQ5bw/bi5GsupF+tjtfshYdBe3OL5vqn8/O1Pvz/gAAqaq3nuP7IbbMLQPgCrvnpr5ZD1OvQhntg7bjodXTjMsbr/EvUo03rauW/tbX+jUnOM79zgKhTJNe5kr2TYBs38WPkmzeBEL17rPlD1n9mrGYILoDSVh6crG+YJrfQzscAaO/KRW/xnYQdFVUywDDujr8c6wrjKWqZtDMdFVV50XWnn2kwe1RIv+va5UzboGwr01VWOH1a3h6W1MVM5/TowLCYxqYr8oTqNhReW+TLmsbXRmmbOsd0s206hgZnBfUu23CkB/QZmfpCqwtkfAfpMdK1cfXYxtwsWdNiP8C1ZufTYHby9FR9gp1AOncDaCpLqipQDx9ArCpkdXmAnHioovIIa9COWU7dU12DruwK6p5AVcOyuoCaganqeUIssjgL8O1i1a7Fb4v4Vsx62cIsoKitPlJYcyk+09JBT7aFdZctiiuralFgWbN1peD0wk2UtiC7OmwxR4Sj4PmeOwUSuUmAbnPHM+XOoKAnSvHkHrQsdesP8i650NMDLZjyUiDwp0ByzfuaCFdwzTy6LrC0ElmLC/QkL0BeR28cr0Dmf7oGVyBPtfPH+Af1MThSebmITAAAAABJRU5ErkJggg=='
    },
    // coverImage: {
    //   type: String,
    // },
    // refreshToken: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);