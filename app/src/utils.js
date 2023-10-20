import { useCookies } from "vue3-cookies";
import { api_call } from "./api";
const { cookies } = useCookies();
export const userData = {
  "id": cookies.get('id'),
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

const in_prod = import.meta.env.VITE_IN_PROD;
const prod_url = import.meta.env.VITE_PROD_BASE_URL;
const local_url = import.meta.env.VITE_LOCAL_BASE_URL;
// export const URL = import.meta.env.BASE_URL
export const URL = in_prod === 'true' ? prod_url : local_url;
console.log(`App URL: ${URL}`);


export const parseObj = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

const utadeo_api = "https://utadeoapi-6dae6e29b5b0.herokuapp.com/api/v1/software-architecture/market-place"

export const buyIngredients = async (ingredient) => {
  const data = await api_call(`${utadeo_api}?ingredient=${ingredient}`)
  return data
}