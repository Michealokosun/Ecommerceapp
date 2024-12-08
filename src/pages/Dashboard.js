import Navbarconponent from "../conponents/Navbarconponent";
import Productlist from "../conponents/productlist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const DashobardPage = () => {
  return (
    <>
      <ToastContainer />
      <Navbarconponent />
      <Productlist />
    </>
  );
};
