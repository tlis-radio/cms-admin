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
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Table from '@/components/table';
import { useQuery } from '@tanstack/react-query';

const limit = 4;
const tableHeadings = ['Názov', ''];

const Shows: FunctionComponent = ()=> {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get('page') ?? "1");
    const { isLoading, data } = useQuery({
        queryKey: ['showsPage', page],
        queryFn: async () => CmsApiService.GetAsync<PaginationDto<ShowDto>>(`/api/show-management?limit=${limit}&page=${[page]}`),
        keepPreviousData: true,
        staleTime: 5000
    });

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="overflow-hidden">
                <Table
                    headings={tableHeadings}
                    data={data?.results.map((show) => [show.name, '']) ?? []}
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