import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "../button";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

type PaginationNextButtonProps = {
    hasNextPage: boolean;
};

const NextButton: React.FC<PaginationNextButtonProps> = ({ hasNextPage }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get('page') ?? "1");

    return (
        <Button
            onClick={() => router.push(`${pathname}?page=${page+1}`)}
            icon={faArrowRight}
            disabled={hasNextPage}
        />
    )
}

export default NextButton;