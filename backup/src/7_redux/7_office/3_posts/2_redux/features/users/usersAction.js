import axios from 'axios'
import store from '../../store'

const fetchUserSync = (data) => ({type:"fetchUsers", data})

export const fetchUserAction = () => {
  return async() => {
    let response = await axios.get("http://localhost:3006/fakeApi/users")
    store.dispatch(fetchUserSync(response.data))
  }
}






