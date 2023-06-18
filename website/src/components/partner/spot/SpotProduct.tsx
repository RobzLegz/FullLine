import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useState } from "react";
import { Product } from "../../../interfaces/backendSafe";
import { deleteProduct } from "../../../requests/productRequests";
import { useDispatch } from "react-redux";
import { setNotification } from "../../../redux/slices/notificationSlice";
import { currencyFormatter } from "../../../utils/formatCurrency";
import { ExProduct } from "../../../interfaces/backendTypes";
import Button from "../../ui/Button";

const SpotProduct: React.FC<ExProduct & { index: number }> = ({
  index,
  ...props
}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    await deleteProduct({ id: props.id, dispatch });

    setLoading(false);
  };

  const handleEdit = () => {
    dispatch(setNotification({ type: "spot_product", params: props }));
  };

  return (
    <tr className="w-full">
      <td>{index + 1}.</td>
      <td>
        {props.cover && (
          <Image
            src={props.cover.src}
            width={80}
            height={80}
            alt={props.cover.alt ? props.cover.alt : props.title}
            className={`rounded-md object-cover`}
          />
        )}
      </td>
      <td>{props.title}</td>
      <td>{currencyFormatter.format(props.price)}</td>
      <td>{props?.category?.name ? props?.category?.name : "-"}</td>
      <td>
        <div className="flex gap-1">
          <button
            className="bg-accent-200 rounded-md p-1"
            type="button"
            onClick={handleEdit}
            disabled={loading}
          >
            <PencilIcon className="w-5 text-white" />
          </button>
          <Button
            className="bg-accent rounded-md p-1"
            type="button"
            onClick={handleDelete}
            disabled={loading}
            loading={loading}
          >
            <TrashIcon className="w-5 text-white" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default SpotProduct;
