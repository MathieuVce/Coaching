import { useState } from "react";

interface IStarsProps {
    color: string;
    setRating: React.Dispatch<React.SetStateAction<number>>;
    rating: number;
}


export const Stars: React.FC<IStarsProps> = ({ color, rating, setRating }) => {
    const [hover, setHover] = useState<boolean>(false);
    const [stars, setStars] = useState<number>(rating);

    const onHover = (i: number) => {
      setHover(true);
      setStars(i);
    };
  
    const onLeave = () => {
      setHover(false);
    };

    const handleClick = (i: number) => {
        setRating(i);
    }
    return (
        <div className="flex items-center justify-start">
            {Array.from({ length: 10 }, (_, i) =>
                <button onClick={() => {handleClick(i)}}
                    onMouseEnter={() => {onHover(i)}}
                    onMouseLeave={onLeave}>
                    <svg key={i} className={`w-8 h-8 ${i <= (hover ? stars : rating) ? color : 'text-brown'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                </button>
            )}
        </div>
    );
};