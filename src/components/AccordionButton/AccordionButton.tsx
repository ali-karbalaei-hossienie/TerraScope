import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IconButton } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState, type FC, type ReactNode } from "react";
import { useStyles } from "./styles/MapButtonStyles";

interface AccordionButtonProps {
  children?: ReactNode;
  title?: string;
}

const AccordionButton: FC<AccordionButtonProps> = ({ children, title }) => {
  const { classes } = useStyles();
  const [expanded, setExpanded] = useState(true);

  const handleAccordionChange = (
    _event: React.SyntheticEvent,
    isExpanded: boolean,
  ) => {
    setExpanded(isExpanded);
  };

  const handleClose = () => {
    setExpanded(false);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleAccordionChange}
      disableGutters
      className={classes["map-button"]}
      slotProps={{ transition: { unmountOnExit: true, timeout: 400 } }}
    >
      <AccordionSummary
        className={classes["map-button__summary"]}
        expandIcon={
          <KeyboardArrowDownIcon
            sx={{
              width: "100% !important",
              mt: expanded ? 0 : "1rem",
              opacity: expanded ? 0 : 1,
              transition: "all 0.3s ease-in-out",
            }}
          />
        }
      >
        <Typography variant="body1" className={classes["map-button__text"]}>
          {title}
        </Typography>
      </AccordionSummary>

      <AccordionDetails className={classes["map-button__details"]}>
        <Box className={classes["map-button__body"]}>{children}</Box>

        <Box className={classes["map-button__footer"]}>
          <IconButton onClick={handleClose} aria-label="close">
            <ExpandLessIcon />
          </IconButton>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionButton;
