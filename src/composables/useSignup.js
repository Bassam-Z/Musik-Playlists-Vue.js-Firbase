import { projectAuth } from "../firebase/Config";
import { ref } from "vue"

const error = ref(null);
const isPending = ref (false)

const signup = async ( displayName, email, password) => {
    error.value = null;
    isPending.value = true

    try {
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)
        isPending.value = false
        if(!res){
            throw new Error('could not complete the signup')
        }
        await res.user.updateProfile({displayName})
        error.value = null;
        return res;
        
    } catch (err) {
        console.log(err.message)
        error.value = err.message
        isPending.value = false
    }

}

const useSignup = () => {

    return { error, signup, isPending }
}

export default useSignup