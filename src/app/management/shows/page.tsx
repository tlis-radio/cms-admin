'use client';
import { ShowDto } from '@/app/api/show-management/dtos/show-dto';
import { PaginationDto } from '@/app/api/user-management/dtos/pagination-dto';
import CmsApiService from '@/services/cms-api-service';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { FunctionComponent, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import Button from '@/components/button';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Table from '@/components/table';

const limit = 10;
const tableHeadings = ['#', 'Názov', ''];

const Shows: FunctionComponent = ()=> {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get('page') ?? "1");

    useEffect(() =>
    {
        const fetchData = async () => {
            var response = await CmsApiService.GetAsync<PaginationDto<ShowDto>>(`/api/show-management?limit=${limit}&page=${[page]}`);
            console.warn(response);
        };
        fetchData();
    }, [page])

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="overflow-hidden border-b">
                <Table
                    headings={tableHeadings}
                    data={[[1, 'Mark', ''], [2, 'Jacob', ''], [3, 'Larry', '']]}
                />
            </div>
            <span className='flex justify-between'>
                <Button
                    onClick={() => router.push(`${pathname}?page=${page-1}`)}
                    icon={faArrowLeft}
                />
                <Button
                    onClick={() => router.push(`${pathname}?page=${page+1}`)}
                    icon={faArrowRight}
                />
            </span>
        </div>
    )
};

export default withPageAuthRequired(Shows);