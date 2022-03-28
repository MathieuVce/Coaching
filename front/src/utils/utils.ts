export const checkEmail = (input: string) => {
     return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(input)
};

export const truncateString = (text: string, max: number) => {
    return text.substring(0,max-1)+(text.length>max?'...':''); 
}