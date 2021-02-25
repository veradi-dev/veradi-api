import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

export default function Copyright () {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContents: "center",
        alignItem: "center",
        minHeight: "300px"
      }}
    >
      <Typography variant='body2' color='textSecondary' align='center'>
        {"Copyright © "}
        <Link color='inherit' href='#'>
          VERADI
        </Link>
      </Typography>
    </Box>
  );
}
