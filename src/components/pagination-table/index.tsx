import Table from "../table";
import { useSearchParams } from "next/navigation";
import PreviousButton from "./previous-button";
import NextButton from "./next-button";
import { Pagination } from "@/models/pagination";
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import AddButton from "./add-button";

type PaginationTableProps = {
    title: string;
    tableHeadings: Array<string>;
    queryKey: string;
    queryFn: (limit: number, page: number) => Promise<any>;
    dataToRowTransformationFn: (data: Pagination<any>) => Array<Array<number | string | React.ReactNode>>;
    maxRows?: number;
};

const PaginationTable: React.FC<PaginationTableProps> = ({
    title,
    tableHeadings,
    queryKey,
    queryFn,
    dataToRowTransformationFn,
    maxRows = 10
}) => {
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get('page') ?? "1");
    const { isLoading, data } = useQuery({
        queryKey: [queryKey, page],
        queryFn: async () => queryFn(maxRows, page),
        placeholderData: keepPreviousData,
        refetchOnMount: true,
        staleTime: 0
    });

    return (
        <div className="flex flex-col gap-4 w-full">
            <h1 className="font-bold p-4 text-xl">{title}</h1>
            <div className="overflow-hidden">
                <Table
                    headings={tableHeadings}
                    data={dataToRowTransformationFn(data)}
                />
            </div>
            <span className="flex flex-row justify-end">
                <AddButton />
            </span>
            <span className='flex justify-between'>
                <PreviousButton />
                <NextButton hasNextPage={isLoading || data?.totalPages == page} />
            </span>
        </div>
    )
};

export default PaginationTable;