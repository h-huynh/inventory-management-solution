import '@trussworks/react-uswds/lib/index.css';
import Home from './pages/Home'
import Items from './pages/Items';
import Warehouses from './pages/Warehouses'
import Inventory from './pages/Inventory';
import { Grid, Header, PrimaryNav, Title } from '@trussworks/react-uswds';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

export default function App() {
    
    const navItems = [
        <Link to='/'>Home</Link>,
        <Link to='/warehouses'>All warehouses</Link>,
        <Link to='/items'>All items</Link>,
        <Link to='/inventory'>All inventory</Link>
    ]

    return(
        <>  
            <Header basic={true}>
                <Title className='text-center'>WAREHOUSE MANAGEMENT</Title>
            </Header>

            <BrowserRouter basename='/'>
                <Grid row>
                    <PrimaryNav items={navItems}></PrimaryNav>
                </Grid>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/warehouses' element={<Warehouses/>}/>
                    <Route path='/items' element={<Items/>}/> 
                    <Route path='/inventory' element={<Inventory/>}/>  
                </Routes>
            </BrowserRouter>
        </>
    );
}