import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type ImageInputProps = {
    registerReturn: UseFormRegisterReturn;
    watch: FileList | string | null;
};

const imagePlaceholder = "https://via.placeholder.com/150";

const ImageInput: React.FC<ImageInputProps> = ({ registerReturn, watch }) => {
    const [src, setSrc] = useState(watch ? watch !== "string" ? imagePlaceholder : watch : imagePlaceholder);

    useEffect(() => {
        if (watch && typeof watch !== "string") {
            const image = watch[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                const img = new Image();
                img.src = reader.result?.toString() ?? imagePlaceholder;
                setSrc(img.src);
            };

            if (image) {
                reader.readAsDataURL(image);
            } else {
                setSrc(imagePlaceholder);
            }
        }
        else if (watch && typeof watch === "string")
        {
            setSrc(watch);
        }
    }, [watch]);

    return (
        <div className="flex flex-row gap-4 items-center">
            <label className="w-64 flex flex-col justify-center items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide uppercase border border-gray-100 cursor-pointer hover:bg-green-500 hover:text-white">
                <FontAwesomeIcon className="text-2xl" icon={faCloudUploadAlt} />
                <span className="mt-2 text-base leading-normal">
                    Select Image
                </span>
                <input
                    type="file"
                    className="hidden"
                    {...registerReturn}
                    accept=".jpeg,.png,.jpg"
                />
            </label>
            <img
                className="mt-2 w-32 h-32 object-cover"
                src={src}
                alt="preview"
            />
        </div>
    )
};

export default ImageInput;