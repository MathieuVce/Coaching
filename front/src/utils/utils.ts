export const checkEmail = (input: string) => {
     return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(input)
};

export const truncateString = (text: string, max: number) => {
    return text.substring(0,max-1)+(text.length>max?"...":""); 
}

export const headTableStyle: {[key: string]: string} = {
    "id": "pr-8",
    "item": "pr-28", 
    "author": "pr-20", 
    "text": "pr-48",
    "created date": "pr-8", 
    "actions": "pl-5",
    'rating': 'pr-8'
}

// export const headTableStyle: {[key: string]: string} = {
//     "id": "w-28",
//     "item": "w-38", 
//     "author": "w-30", 
//     "text": "w-58",
//     "created date": "w-40", 
//     "actions": "w-30",
//     'rating': "w-30"
// }