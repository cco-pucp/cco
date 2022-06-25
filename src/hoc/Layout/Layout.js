import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import GroupsIcon from '@mui/icons-material/Groups';
import Grid from '@mui/material/Grid';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CampaignIcon from '@mui/icons-material/Campaign';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Auxiliar from '../Auxiliar/Auxiliar.js';
import { useNavigate, useLocation } from "react-router-dom";
import * as ROUTES from "../../routes/routes.js";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Layout  = (props) => {   
    const {title, optionBack, cursiveTitle} = props;
    const [value, setValue] = React.useState(0);
    const [goBackActive, setGoBackActive] = React.useState(false);
    const ref = React.useRef(null);
    let navigate = useNavigate();
    let location = useLocation();

    const switchBottomOption = () =>{
        switch(location.pathname){
            case ROUTES.ACTIVITIES:
                setValue(0);
                break;
            case ROUTES.ATTENDANCE:
            case ROUTES.ATTENDANCE_RESULTS:
                setValue(1);
                break;
            case ROUTES.CAPACITY:
            case ROUTES.CAPACITY_RESULTS:
                setValue(2);
                break;
            case ROUTES.INCIDENTS:
                setValue(3);
                break;
            default:
                break;
        };

    }
    React.useEffect(() => {
        if (goBackActive){
            switchBottomOption();
        }
    }, [location]);

    React.useEffect(() => {        
        switchBottomOption();        
    }, []);

    React.useEffect(() => {
        ref.current.ownerDocument.body.scrollTop = 0;        
    }, [value]);   
    
    const changeMenuOption = (value) =>{
        switch(value){
            case 0:
                navigate(ROUTES.ACTIVITIES);
                break;
            case 1:
                navigate(ROUTES.ATTENDANCE);
                break;
            case 2:
                navigate(ROUTES.CAPACITY);
                break;
            case 3:
                navigate(ROUTES.INCIDENTS);
                break;
            default:
                break;
        };

    }

    const goBack = () => {      
        setGoBackActive(true);  
        navigate(-1);
    }

    return(
        <Auxiliar>
            <Box ref={ref}>                
                <Typography 
                    sx={{
                        fontWeight: "bold !important",
                        marginTop: "32px",
                        fontStyle: "italic",
                        marginRight: "16px",
                        marginLeft: "16px",
                    }} 
                    variant="h5" 
                    component="div" 
                    gutterBottom 
                    align={optionBack?"left":"center"}
                >         
                    {optionBack &&
                    <ArrowBackIcon 
                        onClick={()=>goBack()}
                        sx={{verticalAlign: "Bottom", marginBottom: "5px", cursor: 'pointer'}}
                    />}
                    {optionBack?
                    <span style={{marginLeft:"20px"}}>       
                    {title}
                    </span>:
                    title}                     
                </Typography> 
                {props.children}
                <CssBaseline />
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, paddingBottom: "15px", paddingLeft: "10px", paddingRight: "10px"}} elevation={3}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            changeMenuOption(newValue);
                        }}
                    >
                        <BottomNavigationAction label="Actividades" icon={<CalendarTodayIcon />} />
                        <BottomNavigationAction label="Asistencia" icon={<AutoGraphIcon />} />
                        <BottomNavigationAction label="Aforo" icon={<GroupsIcon />} />
                        <BottomNavigationAction label="Incidencia" icon={<CampaignIcon />} />
                    </BottomNavigation>
                </Paper>
            </Box>
        </Auxiliar>
    )
};

export default Layout;