import { useState } from "react";
import { IconBaseProps } from "react-icons";
import { Dropdown } from "./Dropdown";
import { Form } from "./Form";
import { Modal } from "./Modal";
import { ScrollView } from "./ScrollView";


import { collection, doc, setDoc } from "firebase/firestore"; 
import { db } from "../services/firebase";
import { IUser } from "../../../common/page";

export interface IPageProps {
   title: string;
   total: string;
   header: string[];
   values: IUser[];
   icon: IconBaseProps
}

export const Page: React.FC<IPageProps> = ({ title, total, header, values, icon, children }) => {
    
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState({email: "", name: "", username: ""});
    const [final, setFinal] = useState<string>('pricing');
    const pricing = ['FREE', 'STANDARD', 'PREMIUM'];

    const handleChange = (prop: keyof typeof user, value: string) => {
        setUser({
            ...user,
            [prop]: value
        });
    };

    // return firebase.firestore().collection('Sites');

    // const items = await setItems();

    // await items.doc(item.previousName).set({
    //   creator: client?.firstname,
    //   description: values.description,
    //   image: values.uri.includes(item.image) ? item.image : values.uri.split('/')[values.uri.split('/').length - 1],
    //   likes: item.likes,
    //   name: values.name,
    //   type: item.type,
    //   coords: item.coords,
    //   previousName: item.previousName,
    // });


    const handleApply = async () => {
        setShowModal(false);

        const newUserRef = doc(collection(db, "users"));

        await setDoc(newUserRef, {
            ...user,
            pricing: final,
            comments: 0,
            reviews: 0,
            status: true,
            creationDate: new Date().toLocaleString()
        })

    }

    const handleClick = () => {
        setUser({email: "", name: "", username: ""});
        setFinal("pricing");
        setShowModal(true);
    }

    return (
        <>
            <div className="h-screen  flex flex-col">
                <Modal setShowModal={setShowModal} showModal={showModal} onApply={handleApply} title={`Add new ${title.toLowerCase()}`}>
                    <Form name="Name" type='text' placeholder='Enter name' onChange={(e) => {handleChange('name', e.target.value)}} value={user.name}/>
                    <Form name="Username" type='text' placeholder='Enter username' onChange={(e) => {handleChange('username', e.target.value)}} value={user.username}/>
                    <Form name="Email" type='email' placeholder='name@email.com' onChange={(e) => { handleChange('email', e.target.value); }} value={user.email} />
                    <Dropdown color="bg-blue" display={final} setDisplay={setFinal} title='Pricing' values={pricing}/>
                </Modal>
                <section className="h-16 flex items-center justify-start flex-row mx-4 mt-2 pb-4">
                    <h1 className="font-semibold text-3xl pr-2">{title}</h1>
                    <p className="font-light text-base pt-2 text-brown">{total} total</p>
                    <article className="ml-auto pr-5">
                        <button className="bg-white-light h-8 flex items-center justify-center rounded-lg w-8" onClick={() => {handleClick()}}>
                            {icon}
                        </button>
                    </article>
                </section>
                <section className="border-t mx-4 px-4">
                    <ScrollView header={header} body={values} child={children}/>
                </section>
            </div>
        </>
    )
}