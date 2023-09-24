'use client';

import CmsApiService from '@/services/cms-api-service';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { FunctionComponent } from 'react';
import { usePathname } from 'next/navigation'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pagination } from '@/models/pagination';
import { Show } from '@/models/show';
import PaginationTable from '@/components/pagination-table';

const tableHeadings = ['Názov', ''];

const Shows: FunctionComponent = () => {
    const router = useRouter();
    const pathname = usePathname();

    const dataToRowTransformationFn = (data: Pagination<Show>): Array<Array<number | string | React.ReactNode>> => {
        if (data?.results) {
            return data.results.map((show, index) => [
                show.name,
                <FontAwesomeIcon
                    className='cursor-pointer'
                    key={index}
                    icon={faPenToSquare}
                    onClick={() => router.push(`${pathname}/form?id=${show.id}`)}
                />
            ]);
        }

        return [];
    };

    return (
        <PaginationTable
            title='Relácie'
            tableHeadings={tableHeadings}
            queryKey='showsPage'
            queryFn={CmsApiService.Show.PaginationAsync}
            dataToRowTransformationFn={dataToRowTransformationFn}
            maxRows={4}
        />
    )
};

export default withPageAuthRequired(Shows);