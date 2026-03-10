import { Notyf } from "notyf";

import "notyf/notyf.min.css";

const notyf = new Notyf({
  duration: 3500,
  ripple: true,
  position: {
    x: "left",
    y: "top"
  },
  dismissible: true
});

export default notyf;

