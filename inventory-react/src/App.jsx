import '@trussworks/react-uswds/lib/index.css';
import Home from './pages/Home'
import Items from './pages/Items';
import Warehouses from './pages/Warehouses'
import Inventory from './pages/Inventory';
import { Grid, GridContainer, Header, PrimaryNav, Title } from '@trussworks/react-uswds';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

export default function App() {
    
    const navItems = [
        <Link to='/'>HOME</Link>,
        <Link to='/warehouses'>WAREHOUSES</Link>,
        <Link to='/items'>ITEMS CATALOG</Link>,
        <Link to='/inventory'>INVENTORY</Link>
    ]

    return(
        <>  
            <Header basic={true}>
                <Title className='text-base-lightest bg-primary text-center'>WAREHOUSE MANAGEMENT</Title>
            </Header>

            <BrowserRouter basename='/'>
                <GridContainer>
                    <Grid row>
                        <PrimaryNav className='' items={navItems}></PrimaryNav>
                    </Grid>
                </GridContainer>
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