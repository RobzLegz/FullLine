import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import React from "react";

interface Props {
  txt: string;
}

const QuestionMark: React.FC<Props> = ({ txt }) => {
  return (
    <div className="relative group">
      <QuestionMarkCircleIcon className="text-gray-400 w-5" />

      <div className="absolute left-0 bottom-0 bg-white border p-2 rounded-md shadow-lg w-[200px] hidden group-hover:flex">
        <small className="text-gray-500">{txt}</small>
      </div>
    </div>
  );
};

export default QuestionMark;
