import { ref } from 'vue';
export const formValidationsRules = () => {
    const newpwd = ref('');
    const confirmpwd = ref('')
    const filesizelimitrule = [
        // function limitFileSize(e) {
        //     const file1 = e.target.files[0]
        //     let size = parseFloat(file1 ? file1.size : '') / (1024 * 1024).toFixed(2);
        //     size > 10 ? fileSize.value = true : fileSize.value = false;
        // }
        // ($event) => {
        //     console.log("valll",value)
        //     if($event.target.value[0] < 1000000) return true;
        //     return 'Avatar size should be less than 2 MB!'
        //   },
    ]
    const firstnamerule = [
        (value) => {
            if (value) return true;
            return 'First Name is requred.';
        },
        (value) => {
            if (value?.length >= 2) return true;

            return 'First Name must be greater than 2 characters.';
        }
    ];
    const lastnamerule = [
        (value) => {
            if (value) return true;
            return 'Last Name is required.';
        },
        (value) => {
            if (value?.length >= 2) return true;

            return 'Last Name must be greater than 2 characters.';
        }
    ];
    const mobilerule = [
        (value) => {
            if (value) return true;
            return 'Mobile number is required.';
        },
        (value) => {
            if (value?.length <= 15 && value?.length >= 3) return true;

            return 'Mobile Number must be between 3-15 digit.';
        },
        (value) => {
            if (/^\d+$/.test(value)) return true;
            return 'Mobile Number must be a numeric value.';
        }
    ];

    const emailrule = [
        (value) => {
            if (value) return true;
            return 'Email is required.';
        },
        (value) => {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) return true;
            return 'Email must be in valid email address format';
        }
    ];
    const rule = [
        (confirmpwd, newpwd) => {
            if (confirmpwd == newpwd) return true;
            return 'Password and Confirm password does not match.';
        }
    ];
    const passwordrule = [
        (value) => {
            if (value) return true;
            return 'Password is required.';
        },
        (value) => {
            if (value?.length >= 6) return true;
            return 'The password should be a minimum of 6 characters';
        },
        
    ];
    const confirmpasswordrule = [
        (value) => {
            if (value) return true;
            return 'Password is required.';
        },
        (value) => {
            if (value?.length >= 6) return true;
            return 'The password should be a minimum of 6 characters';
        },
        (value) => {
            if (value == newpwd.value) return true;
            return 'Password and Confirm password does not match.';
        },
        
    ];

    const dropdownrule = [
        (value) => {
            if (value.length !== 0) return true;

            return 'Please select an item.';
        }
    ];
    return {confirmpwd,filesizelimitrule, newpwd, firstnamerule, lastnamerule, mobilerule, emailrule, passwordrule, rule, confirmpasswordrule, dropdownrule,  };
};
