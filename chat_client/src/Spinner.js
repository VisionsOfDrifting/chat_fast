import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";

// You might want to choose a different spinner or make the
// entire theme be dark
const Spinner = () => (
  <Dimmer active>
    <Loader size="huge" content={"Preparing Chat..."} />
  </Dimmer>
);

export default Spinner;
