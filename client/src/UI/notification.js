import { Notyf } from "notyf";

import "notyf/notyf.min.css";

const notyf = new Notyf({
  types: [
    {
      type: "info",
      background: "#669bbc",
      icon: false
    }
  ],
  duration: 3500,
  ripple: true,
  position: {
    x: "left",
    y: "top"
  },
  dismissible: false
});

export default notyf;

