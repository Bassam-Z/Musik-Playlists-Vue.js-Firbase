import { ref } from "vue"
import { projectAuth } from "@/firebase/Config";

//refs
const user = ref (projectAuth.currentUser)

// auth changes
projectAuth.onAuthStateChanged(_user => {
    console.log('Current user is: ', _user)
    user.value = _user
})

const getUser = () => {
    return { user }
}

export default getUser