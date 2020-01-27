import Loadable from "react-loadable";
import { Loading } from "../../common/navigation";

const Search = Loadable({
    loader: () => import("./components/Search"),
    loading: Loading
  });


export const routes = [
    {
      path:  "/search",
      exact: true,
      name: "Search",
      component: Search
    }
]