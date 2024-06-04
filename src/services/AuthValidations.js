import Swal from "sweetalert2"

export default class AuthValidations {
    static passwordValidations(password, confirmPassword) {
        if (password == '' && confirmPassword) {
            // console.log('Password tidak boleh kosong')
            // throw new Error('Password tidak boleh kosong')
            return Swal.fire({
                title: 'Kesalahan',
                text: 'Password tidak boleh kosong',
                icon: "error",
                timer: 2000
            })
        } else if (password && confirmPassword == '') {
            // console.log('Password tidak boleh kosong')
            // throw new Error('Password tidak boleh kosong')
            return Swal.fire({
                title: 'Kesalahan',
                text: 'Password tidak boleh kosong',
                icon: "error",
                timer: 2000
            })
        } else if (password !== confirmPassword) {
            // console.log('Password tidak sesuai')
            // throw new Error('Password tidak sesuai')
            return Swal.fire({
                title: 'Kesalahan',
                text: 'Password tidak sesuai',
                icon: "error",
                timer: 2000
            })
        } else if (password == '' || confirmPassword == '') {
            // console.log('Password tidak boleh kosong')
            // throw new Error('Password tidak sesuai')
            return Swal.fire({
                title: 'Kesalahan',
                text: 'Password tidak boleh kosong',
                icon: "error",
                timer: 2000
            })
        } else if (password === confirmPassword) {
            // router.push({name: 'Login'})
            return
        }
    };
    static loginValidation(email, password) {
        if (!email || !password) {
            message.value = messageList.errorMessage2
            isSuccessLogin.value = false
        } else if (email == 'jajang@gmail.com' && password == 'qweasd') {
            message.value = messageList.errorMessage
            isSuccessLogin.value = false
        } else {
            return
            // localStorage.setItem('authenticated', true)
            // router.push({name: 'Services', query: {order : 'desc'}})
            // message.value = messageList.succesMessage
            // isSuccessLogin.value = true
        }
    }
}