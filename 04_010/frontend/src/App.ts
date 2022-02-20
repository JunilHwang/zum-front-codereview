import { div } from "./core/h";
import Router from "./Router";

function App() {
  const router = Router();

  return {
    template: () => div({ id: "app" }, [router.template()]),
  };
}

export default App;
