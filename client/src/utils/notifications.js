const notifications = {
  common: {
    container: "top-right",
    insert: "top",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeout"],
    dismiss: {
      duration: 2000,
      showIcon: true,
    },
    width: 600,
  },
  success: {
    type: "success",
  },
  failed: {
    type: "danger",
  },
  info:{type:"info"},
  login: { message: "Вы успешно вошли в свой аккаунт" },
  registration: { message: "Вы успешно зарегистрировались" },
}
export default notifications
