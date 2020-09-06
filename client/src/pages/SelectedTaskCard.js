{
    return(
        <CardContent style={{ padding: "0" }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", marginRight: "0" }}>
                {selectedTask.status === "new" ? <ColorCompleteButton variant="contained" onClick={markTaskComplete} style={{ boxShadow: "none" }} startIcon={<CheckCircleOutlineIcon />} color="primary" size="small" className={classes.margin}>
                    Mark Complete
                                            </ColorCompleteButton> : <ColorCompletedButton variant="contained" onClick={markTaskNew} style={{ boxShadow: "none" }} startIcon={<CheckCircleOutlineIcon />} color="primary" size="small" className={classes.margin}>
                        Completed
                                            </ColorCompletedButton>}
                <div>
                    <IconButton style={{ color: "grey" }} onClick={handleCloseDetail}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </div>
            <Divider />
        <EditFormInput />
            <Typography className={classes.pos} color="textSecondary">
                {selectedTask.description}
            </Typography>
            <Typography variant="body2" component="p">
                task details go here foo
                            <br />
                {'"a benevolent smile"'}
            </Typography>
        </CardContent>)
}