const Validator = (() => {
  const numberRegex = /^[\d]+(\.[\d]*)?$/g;
  const integerRegex = /^[\d]+$/g;
  const floatRegex = /^[\d]+\.[\d]+$/g;

  return {
    checkString: (value: any) => {
      if (typeof value === 'string') {
        return true;
      }

      return false;
    },
    checkNumber: (value: any) => {
      if (typeof value === 'number') {
        return true;
      } else {
        if (numberRegex.test(value)) {
          return true;
        }

        return false;
      }
    },
    checkInteger: (value: any) => {
      if (typeof value === 'number') {
        return true;
      } else {
        if (numberRegex.test(value) && integerRegex.test(value)) {
          return true;
        }

        return false;
      }
    },
    checkFloat: (value: any) => {
      if (typeof value === 'number') {
        return true;
      } else {
        if (numberRegex.test(value) && floatRegex.test(value)) {
          return true;
        }

        return false;
      }
    },
    checkDate: (value: any) => {
      if (typeof value === 'object' && value instanceof Date) {
        return true;
      }

      return false;
    },
  };
})();

export default Validator;
