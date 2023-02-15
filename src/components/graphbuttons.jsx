import { Button,ButtonGroup } from "@mui/material";


export default function GraphButtons ({functions,names}){
      return (
        <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{backgroundColor: 'rgba(0, 0, 255, 0)' }}>
            {functions.map((f,i) => <Button 
                                        key={i+names[i]} 
                                        onClick={f}
                                        size={"small"}>
                                          {names[i]}
                                    </Button> )}
        </ButtonGroup>
      );
}