const convertDateToDays = (dateOne, dateTwo) => {};

const generateRandomID = (len) => {
    if (len < 1 || len > 12) {
        throw new Error("Length must be at least 1 and below 13");
    }

    const min = Math.pow(10, len - 1);
    const max = Math.pow(10, len) - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { convertDateToDays, generateRandomID };
