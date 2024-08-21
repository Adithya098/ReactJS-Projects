import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

function RootLayout() {
   // const navigation = useNavigation();
    return (
        <>
            <MainNavigation />
            <main>
                {/* {navigation.state=='loading' && <p style={{ display: 'flex', justifyContent: 'center' }}><b>Loading pa</b></p>} */}
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;
