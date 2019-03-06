import React from 'react';
import { observer } from 'mobx-react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        border: `2px solid orangered`,
        boxSizing: 'border-box',
        position: 'absolute',
        minHeight: '100vh',
        maxHeight: '100vh',
        minWidth: '100vw',
        maxWidth: '100vw',
        overflow: 'scroll',
        // display: 'flex',
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start',
    },
});

export const Screen =
    withStyles(styles)(
        observer(
            ({ children, classes, id }) =>
                <div id={id} className={classes.root}>{children}</div>
        )
    )

