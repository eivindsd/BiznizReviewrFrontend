import { TableCell, TableRow } from "@mui/material";

interface IProps {
    stars: Number,
    text: String
    business_name: any
}


const baseURL = "http://localhost:8080/api/"
export const ReviewComponent = (props: IProps) => {
  
    return(
        <div>
            <TableRow 
            key={props.business_name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row"> {props.business_name} </TableCell>
                <TableCell align="right">{props.text}</TableCell>
                <TableCell align="right">{props.stars}</TableCell>
            </TableRow>
        </div>
        
    )
}