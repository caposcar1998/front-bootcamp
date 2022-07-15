export const isValidName = (name) => {
  return name.length > 2
}

export const isValidEmail = (email) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return email !== '' && re.test(String(email).toLowerCase())
}

export const isValidPassword = (password) => {
  const re =
    /(?=(.*[0-9]))(?=.*[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
  return password !== '' && re.test(String(password))
}
