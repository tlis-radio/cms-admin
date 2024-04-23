'use client';

import CmsApiService from '@/services/cms-api-service';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { FunctionComponent, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pagination } from '@/models/pagination';
import PaginationTable from '@/components/pagination-table';
import { UserBasicInformations } from '@/models/user/user-basic-informations';

const phoneTableHeadings = ['Meno','Priezvisko','Prezývka',''];
const normalScreenTableHeadings = ['Meno','Priezvisko','Prezývka','E-mail',''];
const wideScreenTableHeadings = ['Meno','Priezvisko','Prezývka','E-mail','Role', 'Status',''];

const Users: FunctionComponent = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [screenType, setScreenType] = useState('');

    const getTableHeadings = () => {
        switch (screenType) {
            case 'phone':
                return phoneTableHeadings;
            case 'normal':
                return normalScreenTableHeadings;
            case 'wide':
                return wideScreenTableHeadings;
            default:
                return [];
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 1440) {
                setScreenType('phone');
            } else if (width <= 2048) {
                setScreenType('normal');
            } else {
                setScreenType('wide');
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const dataToRowTransformationFn = (data: Pagination<UserBasicInformations>): Array<Array<number | string | React.ReactNode>> => {
        if (data?.results) {
            return data.results.map((user, index) => {
                const commonData = [
                    user.firstname,
                    user.lastname,
                    user.nickname,
                ];

                let additionalData: string[] = [];
                if (screenType === 'normal') {
                    additionalData = [user.email];
                } else if (screenType === 'wide') {
                    additionalData = [user.email, user.roles.join(', '), user.status];
                }

                return [...commonData, ...additionalData, 
                    <FontAwesomeIcon
                        className='cursor-pointer'
                        key={index}
                        icon={faPenToSquare}
                        onClick={() => router.push(`${pathname}/form?id=${user.id}`)} 
                    />
                ];
            });
        }

        return [];
    };

    return (
        <PaginationTable
            title='Uživatelia'
            tableHeadings={getTableHeadings()}
            queryKey='usersPage'
            queryFn={CmsApiService.User.PaginationAsync}
            dataToRowTransformationFn={dataToRowTransformationFn}
            maxRows={4}
        />
    )
};

export default withPageAuthRequired(Users);
