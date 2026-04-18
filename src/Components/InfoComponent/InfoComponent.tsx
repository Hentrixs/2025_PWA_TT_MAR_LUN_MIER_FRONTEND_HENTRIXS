import './InfoComponent.css';

const InfoComponent = ({ response }: string | any) => {
    return (
        <>
            {
                response.ok === false && <div className='info-component error'>
                    <p>{response.message}</p>
                </div>
            }
            {
                response.ok === true && <div className='info-component success'>
                    <p>{response.message}</p>
                </div>
            }
        </>
    );
};

export default InfoComponent;