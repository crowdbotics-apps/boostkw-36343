export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export function validatePassword(password) {
  if (
    password.length < 6 ||
    password.length > 30 ||
    !/[a-zA-Z]/g.test(password) ||
    /^\w+$/.test(password)
  ) {
    return "Password must be 6 to 30 characters with at least 1 number, 1 letter & 1 special character"
  }
  return ""
}
