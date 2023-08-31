'use client';
import Input from '@/components/form/input';
import MultiSelect, { MultiSelectData } from '@/components/form/multi-select';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { FunctionComponent } from "react";
import { Resolver, useForm } from 'react-hook-form';

type ShowFormValues = {
    name: string;
    description: string;
    moderators: Array<MultiSelectData>;
};

// TODO: validation
const resolver: Resolver<ShowFormValues> = async (values) => {
    return {
      values: values.name ? values : {},
      errors: !values.name
        ? {
            name: {
              type: "required",
              message: "Relácia musí obsahovať názov."
            },
            description: {
                type: "required",
                message: "Relácia musí obsahovať popis."
            },
            moderators: {
                type: "minLength",
                length: 1,
                message: "Relácia musí obsahovať aspoň jedného moderátora."
            }
          }
        : {},
    }
  }

const Shows: FunctionComponent = () => {
    const {register, handleSubmit, setValue, reset, formState:{errors}} = useForm({ resolver });
    const onSubmit = handleSubmit((data) => {
        console.log(data);
        reset();
    })

    const fetchUsers = async (): Promise<Array<MultiSelectData>> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const randomInt = (min: number, max: number) => {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                };

                if (randomInt(0, 10) == 5) return resolve([]);

                return resolve([
                    { id: randomInt(0, 100000).toString(), value: "test" },
                    { id: randomInt(0, 100000).toString(), value: "test2" },
                    { id: randomInt(0, 100000).toString(), value: "test3" },
                    { id: randomInt(0, 100000).toString(), value: "test4" },
                    { id: randomInt(0, 100000).toString(), value: "test5" },
                    { id: randomInt(0, 100000).toString(), value: "test6" },
                    { id: randomInt(0, 100000).toString(), value: "test7" },
                    { id: randomInt(0, 100000).toString(), value: "test8" },
                    { id: randomInt(0, 100000).toString(), value: "test9" },
                ]);
            }, 1000);
        });
    };

    return (
        <form onSubmit={onSubmit} className='flex flex-col gap-4'>
            <Input
                label='Názov relácie'
                placeholder='Názov relácie'
                registerReturn={register("name")}
                error={errors?.name}
            />
            <Input
                label='Popis relácie'
                placeholder='Popis relácie'
                registerReturn={register("description")}
                error={errors?.description}
            />
            <MultiSelect
                label='Moderátori'
                fetchData={fetchUsers}
                onValueChange={(value) => setValue("moderators", value)}
                error={errors?.moderators}
            />

            <input type="submit" />
        </form>
    );
};
  
export default withPageAuthRequired(Shows);