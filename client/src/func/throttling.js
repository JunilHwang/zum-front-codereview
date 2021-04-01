export const throttling = () => {
    let throttleCheck;

    return {
        throttle(callback, milliseconds){
            if(!throttleCheck){
                throttleCheck = setTimeout(() => {
                    callback(...arguments);
                    throttleCheck = false;
                }, milliseconds);
            }
        }
    };
}