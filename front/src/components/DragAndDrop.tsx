import { useEffect, useRef, useState } from "react";

interface IDragAndDropProps {
    onUpload: (file: File) => void;
}

export const DragAndDrop: React.FC<IDragAndDropProps> = ({ onUpload }) => {
    const drop = useRef(null);
    const drag = useRef(null);
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        drop.current?[addEventListener('dragover', handleDragOver)] : null;
        drop.current?[addEventListener('drop', handleDrop)] : null;
        drop.current?[addEventListener('dragenter', handleDragEnter)] : null;
        drop.current?[addEventListener('dragleave', handleDragLeave)] : null;
      
        return () => {
            drop.current?[removeEventListener('dragover', handleDragOver)] : null;
            drop.current?[removeEventListener('drop', handleDrop)] : null;
            drop.current?[removeEventListener('dragenter', handleDragEnter)] : null;
            drop.current?[removeEventListener('dragleave', handleDragLeave)] : null;
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