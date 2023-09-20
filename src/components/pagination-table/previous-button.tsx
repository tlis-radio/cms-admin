import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "../button";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const PreviousButton: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get('page') ?? "1");

    return (
        <Button
            onClick={() => page > 1 && router.push(`${pathname}?page=${page-1}`)}
            icon={faArrowLeft}
            disabled={page <= 1}
        />
    )
}

export default PreviousButton;