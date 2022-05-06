import { ICreateComment, ICreateReview, uploadState } from "../../../common/info";
import { IMovie, IPageType, IUser } from "../../../common/page";
import { without } from "../utils/Utils";

const csvFileToArray = (string: string, type: IPageType) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(";");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
        const obj = csvHeader.reduce((object: {[key: string]: string}, header, index) => {
        const values = i.split(";");
            object[header.replaceAll('\"', '')] = values[index].replaceAll('\"', '');
            return object;
        }, {});
        return obj;
    });

    const finalArr: (ICreateReview | ICreateComment | IMovie | IUser)[] = []

    array.map((item) => {
        const obj: {[key: string]: string | number | boolean} = {
            movie: item['item'],
            user: item['author'],
            title: item['title'],
            review : item['text'],
            comment: item['text'],
            rating: parseFloat(item['rating']),
            creationDate: item['date'],
            category: item['category'],
            views: parseFloat(item['views']),
            status: (item['status'] === 'APPROVED' || item['status'] === 'VISIBLE') ? true : false,
            name: item['basic info']?.split('/')[0],
            email: item['basic info']?.split('/')[1],
            username: item['username'],
            comments: parseFloat(item['comments']),
            reviews: parseFloat(item['reviews']),
            pricing: item['pricing'],
        };
        Object.keys(obj).map(key => (obj[key] === undefined || Number.isNaN(obj[key])) ? delete obj[key] : {});

        const review: ICreateReview = without(obj)('comment', 'status') as unknown as ICreateReview;
        const comment: ICreateComment = without(obj)('review', 'status') as unknown as ICreateComment;
        const movie: IMovie = obj as unknown as IMovie;
        const user: IUser = obj as unknown as IUser;

        const typeArr = [user, comment, review, movie];
        finalArr.push(typeArr[type]);
    });
    return finalArr;
};

const uploadFile = async (file: File, type: IPageType) => {
    const fileReader = new FileReader();

    //array not updated
    // fileReader.onload = async function (event) {
    //     const csvOutput = event.target?.result;
    //     const values = csvFileToArray(csvOutput?.toString()!, type);
    //     return values
        // valuesArr.push.apply(valuesArr, values);
        // console.log(valuesArr)
    // };

    fileReader.readAsText(file)
    const arrayOfValues = (await Promise.all(await file.text())).join('');
    const values = csvFileToArray(arrayOfValues?.toString()!, type);
    console.log(values)

    return values as uploadState;
};

const fileService = {
    uploadFile
};

export default fileService;