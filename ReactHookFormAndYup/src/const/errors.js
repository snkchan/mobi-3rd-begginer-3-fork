export const ERRORS = {
  message: {
    email: "이메일 형식이 아닙니다.",
    emailRequired: "이메일을 입력해주세요",
    password: "비밀번호 형식이 틀렸습니다.",
    passwordRequired: "비밀번호를 입력해주세요!",
  },
  pattern: {
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/,
  },
}
