'use client';

import CmsApiService from '@/services/cms-api-service';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { FunctionComponent } from 'react';
import { usePathname } from 'next/navigation'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pagination } from '@/models/pagination';
import PaginationTable from '@/components/pagination-table';
import { Broadcast } from '@/models/broadcast/broadcast';

const tableHeadings = ['Názov', ''];

const Shows: FunctionComponent = () => {
    const router = useRouter();
    const pathname = usePathname();

    const dataToRowTransformationFn = (data: Pagination<Broadcast>): Array<Array<number | string | React.ReactNode>> => {
        if (data?.results) {
            return data.results.map((broadcast, index) => [
                broadcast.name,
                <FontAwesomeIcon
                    className='cursor-pointer'
                    key={index}
                    icon={faPenToSquare}
                    onClick={() => router.push(`${pathname}/form?id=${broadcast.id}`)}
                />
            ]);
        }

        return [];
    };

    return (
        <PaginationTable
            title='Vysielanie'
            tableHeadings={tableHeadings}
            queryKey='programsPage'
            queryFn={CmsApiService.Broadcast.PaginationAsync}
            dataToRowTransformationFn={dataToRowTransformationFn}
            maxRows={4}
        />
    )
};

export default withPageAuthRequired(Shows);