import { spy } from 'mobx';
import AppContainer from './app-container';
import AppRouter from './app-router';

const App: React.FC = () => {
    // TODO: make this development environment only
    // spy((event) => {
    //     if (event.type === 'reaction') {
    //         console.log('MobX Reaction:', event);
    //     }
    // });

    return (
        <AppContainer>
            <AppRouter />
        </AppContainer>
    );
};

export default App;
