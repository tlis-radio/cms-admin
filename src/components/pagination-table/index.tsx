import Table from "../table";
import { useSearchParams } from "next/navigation";
import PreviousButton from "./previous-button";
import NextButton from "./next-button";
import { Pagination } from "@/models/pagination";
import { useQuery } from '@tanstack/react-query';

type PaginationTableProps = {
    tableHeadings: Array<string>;
    queryKey: string;
    queryFn: (limit: number, page: number) => Promise<any>;
    dataToRowTransformationFn: (data: Pagination<any>) => Array<Array<number | string | React.ReactNode>>;
    maxRows?: number;
};

const PaginationTable: React.FC<PaginationTableProps> = ({ tableHeadings, queryKey, queryFn, dataToRowTransformationFn: tableRowFn, maxRows = 10 }) => {
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get('page') ?? "1");
    const { isLoading, data } = useQuery({
        queryKey: [queryKey, page],
        queryFn: async () => queryFn(maxRows, page),
        keepPreviousData: true,
        staleTime: 5000
    });

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="overflow-hidden">
                <Table
                    headings={tableHeadings}
                    data={tableRowFn(data)}
                />
            </div>
            <span className='flex justify-between'>
                <PreviousButton />
                <NextButton hasNextPage={isLoading || data?.totalPages == page} />
            </span>
        </div>
    )
};

export default PaginationTable;