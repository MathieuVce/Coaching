import { Link } from "react-router-dom";

const NoPage: React.FunctionComponent = () => {

    return(
        <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-b from-blue-light to-blue">
            <div className="px-40 py-20 bg-white rounded-md shadow-xl">
                <div className="flex flex-col items-center">
                    <div className="flex flex-row">
                        <h1 className="font-bold text-primary text-9xl">
                            4<span className="text-blue">0</span>4</h1>
                    </div>
                <h6 className="mb-2 text-2xl font-bold text-center md:text-3xl">
                    <span>Oops!</span> Page not found
                </h6>
                <p className="mb-8 text-center text-brown md:text-lg">
                    The page you’re looking for doesn’t exist.
                </p>
                <div className="px-6 py-2 text-lg font-semibold text-blue-light">
                     <Link to="/login">Go Home</Link>
                </div>
                </div>
            </div>
        </div>
    );
};

export default NoPage
