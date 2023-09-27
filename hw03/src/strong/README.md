# HW3 Strong baseline (4pt)

~~~sh
// Load the Observable runtime and inspector.
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
~~~

~~~sh
// Your notebook, compiled as an ES module.
import notebook from "ec0e39b666962d0e";
~~~

~~~sh
// Load the notebook, observing its cells with a default Inspector that simply
// renders the value of every cell into the provided DOM node.
const runtime = new Runtime();
const main = runtime.module(notebook, Inspector.into(document.body));
~~~