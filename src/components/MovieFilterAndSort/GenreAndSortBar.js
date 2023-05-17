import SortButtons from "./SortButtons";
import GenreSelect from "./GenreSelect";
import { AppBar, Toolbar, Typography } from '@mui/material';

const GenreAndSortBar = () => {
    return (
      <AppBar position="static" style={{ background: 'hsl(0, 0%, 96%)' }}>
        <Toolbar variant="dense" style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0px', paddingBottom: '0px' }}>
        <Typography style={{ flexGrow: 1, color: 'black', fontSize: '14px' }}>
          </Typography>
          <div style={{ display: 'flex', gap: '28px' }}>
            <div>
              <GenreSelect />
            </div>
            <div>
              <SortButtons />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    );
  };

export default GenreAndSortBar;
