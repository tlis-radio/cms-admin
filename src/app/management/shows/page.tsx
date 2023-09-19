'use client';

import { ShowDto } from '@/app/api/show-management/dtos/show-dto';
import { PaginationDto } from '@/app/api/user-management/dtos/pagination-dto';
import CmsApiService from '@/services/cms-api-service';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { FunctionComponent } from 'react';
import { usePathname } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import Button from '@/components/button';
import { faArrowLeft, faArrowRight, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Table from '@/components/table';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const limit = 4;
const tableHeadings = ['Názov', ''];

const Shows: FunctionComponent = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get('page') ?? "1");
    const { isLoading, data } = useQuery({
        queryKey: ['showsPage', page],
        queryFn: async () => CmsApiService.GetAsync<PaginationDto<ShowDto>>(`/api/show-management/pagination?limit=${limit}&page=${[page]}`),
        keepPreviousData: true,
        staleTime: 5000
    });

    if (isLoading) return <div>Loading...</div>

    const getData = () => data?.results?.map((show, index) => [
        show.name,
        <FontAwesomeIcon
            className='cursor-pointer'
            key={index}
            icon={faPenToSquare}
            onClick={() => router.push(`${pathname}/form?id=${show.id}`)}
        />
    ]) ?? []

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="overflow-hidden">
                <Table
                    headings={tableHeadings}
                    data={getData()}
                />
            </div>
            <span className='flex justify-between'>
                <Button
                    onClick={() => page > 1 && router.push(`${pathname}?page=${page-1}`)}
                    icon={faArrowLeft}
                    disabled={page <= 1}
                />
                <Button
                    onClick={() => router.push(`${pathname}?page=${page+1}`)}
                    icon={faArrowRight}
                    disabled={isLoading || data?.totalPages == page}
                />
            </span>
        </div>
    )
};

export default withPageAuthRequired(Shows);