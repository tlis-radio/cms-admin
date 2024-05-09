import Button from "../button";
import { faPlus } from '@fortawesome/free-solid-svg-icons';

type SectionProps = {
    title: string;
    onAdd?: () => void;
};

const Section: React.FC<SectionProps & React.PropsWithChildren> = ({ title, children, onAdd }) => {
    const renderAddButton = () => onAdd ? (
        <span className='flex flex-row justify-end py-4'>
            <Button
                onClick={onAdd}
                icon={faPlus}
                type='ADD'
            />
        </span>
    ) : <></>;
    
    return (
        <div>
            <h1 className='font-bold border-b my-4'>{ title }</h1>
            <div>
                { renderAddButton() }
                { children }
            </div>
        </div>
    );
};

export default Section;