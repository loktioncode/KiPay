export default {
  name: {
    required: { value: true, message: "Name is required" },
    // pattern: {
    //   value: /^\w{2,}$/,
    //   message: "Must contain name and surname",
    // },
  },
  email: {
    pattern: {
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: "Invalid Email Format",
    },
  },
  phone: {
    required: { value: true, message: "phone number is required" },
    // pattern: {
    //   value:
    //     /^\+[1-9]{1}[0-9]{3,14}$/,
    //   message:
    //     "Must contain at least 10 numbers or phonenumber with country code ",
    // },
  },
  password: {
    required: { value: true, message: "Password is required" },
    pattern: {
      value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
      message:
        "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
    },
  },
  otp: {
    required: { value: true, message: "OTP is required" },
  },
  quantity: {
    required: { value: true, message: "quantity is required" },
  },
  merchant: {
    required: { value: true, message: "merchant code is required" },
  },
  line1: { required: { value: true, message: "required" } },
  postalCode: { required: { value: true, message: "required" } },
  city: { required: { value: true, message: "required" } },
  district: { required: { value: true, message: "required" } },
  country: { required: { value: true, message: "required" } },
};
