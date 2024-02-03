'use client';

import CmsApiService from '@/services/cms-api-service';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { FunctionComponent } from 'react';
import { usePathname } from 'next/navigation'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pagination } from '@/models/pagination';
import { User } from '@/models/user';
import PaginationTable from '@/components/pagination-table';

const tableHeadings = ['Obrázok','Login','Heslo','Tag',''];

const Users: FunctionComponent = () => {
    const router = useRouter();
    const pathname = usePathname();

    const dataToRowTransformationFn = (data: Pagination<User>): Array<Array<number | string | React.ReactNode>> => {
        if (data?.results) {
            return data.results.map((user, index) => [
                user.nickname,
                <FontAwesomeIcon
                    className='cursor-pointer'
                    key={index}
                    icon={faPenToSquare}
                    onClick={() => router.push(`${pathname}/form?id=${user.id}`)}
                />
            ]);
        }

        return [];
    };

    return (
        <PaginationTable
            title='Uživatelia'
            tableHeadings={tableHeadings}
            queryKey='showsPage'
            queryFn={CmsApiService.User.PaginationAsync}
            dataToRowTransformationFn={dataToRowTransformationFn}
            maxRows={4}
        />
    )
};

export default withPageAuthRequired(Users);