import React from "react";
import CategoryContainer from "../components/home/CategoryContainer";
import ScreenModule from "../modules/ScreenModule";

const Category = () => {
  return (
    <ScreenModule statusBgColor="#ffffff" barStyle="dark">
      <CategoryContainer />
    </ScreenModule>
  );
};

export default Category;
