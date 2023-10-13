import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
export const userData = {
  "name": cookies.get('name'),
  "role": cookies.get('role'),
  "email": cookies.get('email'),
  "token": cookies.get('token'),
}

export const token = userData.token;

export const logOut = () => {
  console.log("logged out")
  cookies.remove("token")
  cookies.remove("name")
  cookies.remove("username")
  cookies.remove("role")
  cookies.remove("email")
  window.location.reload()
}

export const isLogged = () => {
  if (userData.token) {
    if (userData.token.length > 0) {
      return true
    }
  }
  else {
    return false
  }
}

// export const URL = import.meta.env.BASE_URL
export const URL = "http://localhost:80/api/v1"


export const parseObj = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}