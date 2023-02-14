import { Button,ButtonGroup } from "@mui/material";


export default function GraphButtons ({functions,names}){

    var buttons = functions.map((f,i) => <Button key={i+names[i]} onClick={f}>{names[i]}</Button>);

      return (
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            {buttons}
        </ButtonGroup>
      );
}