export default {
  name: { required: { value: true, message: "Name is required" } },
  email: {
    required: { value: true, message: "Email is required" },
    pattern: {
      value:
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|(^[0-9]{10})+$/,
      message: "Invalid Email / PhoneNumber Format",
    },
  },
  password: {
    required: { value: true, message: "Password is required" },
    pattern: {
      value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
      message:
        "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
    },
  },
  otp:{
    required: { value: true, message: "OTP is required" }
  }
};
