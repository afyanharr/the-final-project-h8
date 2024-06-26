import Swal from "sweetalert2"

export default class AuthValidations {
    static RegisterValidations(username,email,password, confirmPassword, phoneNumber) {
        const tempUsername = username.split('')
        const tempPhoneNumberToString = phoneNumber.toString()
        const tempPhoneNumber = tempPhoneNumberToString.split('')
        const tempPassword = password.split('')
        const hasUpperCase = /[A-Z]/;
        const hasNumber = /[0-9]/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let isError = false
        if (username == ''
        || email == ''
        || password == ''
        || confirmPassword == ''
        || phoneNumber == ''
        ) {
            Swal.fire({
                title: 'Kesalahan',
                text: 'Data harus diisi',
                icon: "error",
                timer: 4000
            })
            isError = true
            return isError
        } else if (password == '' && confirmPassword) {
            Swal.fire({
                title: 'Kesalahan',
                text: 'Password tidak boleh kosong',
                icon: "error",
                timer: 4000
            })
            isError = true
            return isError
        } else if (password && confirmPassword == '') {
            // throw new Error('Password tidak boleh kosong')
            return Swal.fire({
                title: 'Kesalahan',
                text: 'Password tidak boleh kosong',
                icon: "error",
                timer: 4000
            })
        } else if (password !== confirmPassword) {
            // throw new Error('Password tidak sesuai')
            Swal.fire({
                title: 'Kesalahan',
                text: 'Password tidak sesuai',
                icon: "error",
                timer: 4000
            })
            isError = true
            return isError
        } else if (password == '' || confirmPassword == '') {
            // throw new Error('Password tidak sesuai')
            Swal.fire({
                title: 'Kesalahan',
                text: 'Password tidak boleh kosong',
                icon: "error",
                timer: 4000
            })
            isError = true
            return isError
        } if (tempUsername.includes(' ')) {
            Swal.fire({
                title: 'format tidak valid',
                text: 'Username tidak boleh mengandung spasi',
                icon: 'error',
                timer: 4000
            })
            isError = true
            return isError
        } else if (tempUsername.length < 6) {
            Swal.fire({
                title: 'format tidak valid',
                text: 'Username minimal 6 huruf',
                icon: 'error',
                timer: 4000
            })
            isError = true
            return isError
        } else if (tempPhoneNumber.length < 10) {
            return Swal.fire({
                title: 'format tidak valid',
                text: 'Phone number harus berjumlah minimal 11 angka',
                icon: 'error',
                timer: 4000
            })
        } else if (!hasUpperCase.test(tempPassword)) {
            return Swal.fire({
                title: 'format tidak valid',
                text: 'Password harus minimal memiliki angka dan huruf kapital',
                icon: 'error',
                timer: 4000
            })
        } else if (!hasNumber.test(tempPassword)) {
            return Swal.fire({
                title: 'format tidak valid',
                text: 'Password harus memiliki angka dan huruf kapital',
                icon: 'error',
                timer: 4000
            })
        } else if (!emailRegex.test(email)) {
            return Swal.fire({
                title: 'format tidak valid',
                text: 'format email tidak valid',
                icon: 'error',
                timer: 4000
            })
        } else if (password === confirmPassword) {
            // router.push({name: 'Login'})
            return
        }
    };
    static loginValidation(email, password) {
        if ((!email || !password) || (email == '' || password == '')) {
            // isSuccessLogin.value = false
            Swal.fire({
                title: 'Kesalahan',
                text: 'Silahkan isi email dan password',
                icon: "error",
                timer: 2000
            })
        }
    }
}