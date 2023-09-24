import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../button";
import { usePathname, useRouter } from "next/navigation";

const AddButton: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <Button
            type="ADD"
            icon={faPlus}
            onClick={() => router.push(`${pathname}/form`)}
        />
    );
};

export default AddButton;