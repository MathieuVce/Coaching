import { useEffect, useRef, useState } from "react";

interface IDragAndDropProps {
    onUpload: (file: File) => void;
}

export const DragAndDrop: React.FC<IDragAndDropProps> = ({ onUpload }) => {
    const drop = useRef(null);
    const drag = useRef(null);
    const [dragging, setDragging] = useState(false);
    const eventListener = ['dragenter', 'dragover', 'dragleave', 'drop'];

    useEffect(() => {
       
        eventListener.forEach((event, index) => {
            drop.current?[addEventListener(event, callbackListener[index])] : null;
        });
      
        return () => {
            eventListener.forEach((event, index) => {
                drop.current?[removeEventListener(event, callbackListener[index])] : null;
            });
        };
    }, []);

    const handleDragEnter = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (e.target !== drag.current) {
            setDragging(true);
        }
    };
      
    const handleDragLeave = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (e.target === drag.current) {
            setDragging(false);
        }
    };

    const handleDragOver = (e: { preventDefault: () => void; stopPropagation: () => void; }) => {
        e.preventDefault();
        e.stopPropagation();
    };
      
    const handleDrop = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        
        const files = [...e.dataTransfer.files];

        if (files.length > 1) {
            alert('Only 1 file can be uploaded at a time');
            setDragging(false);
            return;
        }
        if (files.some((file) => file.name.toLowerCase().endsWith('.csv')) === false) {
            alert('Only following file format is acceptable: .csv');
            setDragging(false);
            return;
        }
        if (files) {
            setDragging(false);
            onUpload(files[0]);
        }

        setDragging(false);
    };
    const callbackListener = [handleDragEnter, handleDragOver, handleDragLeave, handleDrop];

    return (
        <div ref={drop} onDragLeave={() => {setDragging(false)}} className={`${dragging ? 'bg-primary bg-opacity-70 w-full h-full border-dotted border-4 border-white' : 'bg-transparent'} absolute flex justify-center items-center rounded-lg`}>
            {dragging && (
                <section ref={drag} className="rounded-lg py-24 px-16 max-w-sm lg:max-w-3xl md:max-w-2xl sm:max-w-sm mx-5 ">
                    <label className="text-white text-lg font-semibold uppercase">
                        Drag your .csv file here
                    </label>
                </section>
            )}
        </div>
    );
};