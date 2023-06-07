import { ref } from 'vue';
export const formValidationsRules = () => {
    const newpwd = ref('');
    const confirmpwd = ref('')
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
    const requiredrule = [
        (value) => {
            if (value) return true;
            return 'This field is requred.';
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
    const companynamerule = [
        (value) => {
            if (value) return true;
            return 'Company Name is requred.';
        },
        (value) => {
            if (value?.length >= 2) return true;

            return 'Company Name must be greater than 2 characters.';
        }
    ];
    const addresslinerule = [
        (value) => {
            if (value) return true;
            return 'Address Line Name is requred.';
        },
        (value) => {
            if (value?.length >= 2) return true;

            return 'Address Line must be greater than 2 characters.';
        }
    ];
    const arearule = [
        (value) => {
            if (value) return true;
            return 'Area Line Name is requred.';
        },
        (value) => {
            if (value?.length >= 2) return true;

            return 'Area must be greater than 2 characters.';
        }
    ];
    const countyrule = [
        (value) => {
            if (value) return true;
            return 'County Name is requred.';
        },
        (value) => {
            if (value?.length >= 2) return true;

            return 'County Name must be greater than 2 characters.';
        }
    ];
    const cityrule = [
        (value) => {
            if (value) return true;
            return 'City is requred.';
        },
        (value) => {
            if (value?.length >= 2) return true;

            return 'City must be greater than 2 characters.';
        }
    ];
    const staterule = [
        (value) => {
            if (value) return true;
            return 'State is requred.';
        },
        (value) => {
            if (value?.length >= 2) return true;

            return 'State must be greater than 2 characters.';
        }
    ];
    const zipcoderule = [
        (value) => {
            if (value) return true;
            return 'Zip Code is requred.';
        },
        (value) => {
            if (value?.length == 6) return true;
            return 'Zip Code must have 6 digits.';
        },
        (value) => {
            if(isNaN(value) == false) return true;
            return 'Zip Code must be a numeric value.';
        }
    ];
    return {requiredrule,cityrule,staterule,zipcoderule,countyrule,arearule,addresslinerule,companynamerule,confirmpwd, newpwd, firstnamerule, lastnamerule, mobilerule, emailrule, passwordrule, rule, confirmpasswordrule, dropdownrule,  };
};
