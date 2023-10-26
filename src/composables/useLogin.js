import { projectAuth } from "@/firebase/Config";
import { ref } from "vue"



const error = ref (null)
const isPending = ref (false)

const login = async ( email, password ) => {
    error.value = null
    isPending.value = true

    if (!email || !password) {
        error.value = 'Bitte geben Sie eine gültige E-Mail und ein Passwort ein';
        isPending.value = false;
        } else  try {
        const res = await projectAuth.signInWithEmailAndPassword(email, password)
        error.value = null
        isPending.value = false
        console.log(res)
        return res
    } 
    catch (err) {
        console.log(err.message, "sd")
        error.value = 'Incorrect login credentials'
        isPending.value = false
    }

}

const useLogin = () => {
    return { error, login, isPending }
}

export default useLogin
