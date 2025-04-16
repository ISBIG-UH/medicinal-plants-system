import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { spy } from 'mobx';
import { Login } from '../features/account';
import HomeComponent from '../features/home';
import Registration from '../features/account/components/registration';
import Confirmation from '../features/account/components/confirmation';
import AppLayout from './app-layout';
import NotFound from './pages/not-found';

function App() {
    const [count, setCount] = useState(0);

    // TODO: make this development environment only
    spy((event) => {
        if (event.type === 'reaction') {
            console.log('MobX Reaction:', event);
        }
    });

    return (
        <>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<HomeComponent />} />
                </Route>
                <Route path="/account/login" element={<Login />}></Route>
                <Route
                    path="/account/registration"
                    element={<Registration />}
                ></Route>
                <Route
                    path="/account/confirmation"
                    element={<Confirmation />}
                ></Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
