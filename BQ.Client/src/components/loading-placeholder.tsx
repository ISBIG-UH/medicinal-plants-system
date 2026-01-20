import { ProgressBar } from 'primereact/progressbar';

const LoadingPlaceholder: React.FC = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <img src="/2.png" className="scale-75"></img>
            <div className="w-[80%] md:w-[50%] lg:w-[30%]">
                <ProgressBar
                    mode="indeterminate"
                    style={{ height: '20px', width: '100%' }}
                    color="#00695c"
                ></ProgressBar>
            </div>
        </div>
    );
};

export default LoadingPlaceholder;
