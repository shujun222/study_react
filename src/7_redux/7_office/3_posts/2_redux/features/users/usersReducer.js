export default function userReducer(preState = [], action) {
  const { type, data } = action
  switch (type) {
    case "fetchUsers":
      return [...preState, ...data];
    default:
      return preState;
  }
}




