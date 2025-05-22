import React from "react";
import Rating from "../ui/Rating";
import { IoEllipsisHorizontal } from "react-icons/io5";
import Button from "@/components/ui/button";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Review } from "@/types/review.types";
import { cn } from "@/lib/utils";

// PropTypes will be used for prop validation below

const ReviewCard = ({
  blurChild,
  isAction = false,
  isDate = false,
  data,
  className,
}) => {
  return (
    <div
      className={cn([
        "relative bg-white flex flex-col items-start aspect-auto border border-black/10 rounded-[20px] p-6 sm:px-8 sm:py-7 overflow-hidden",
        className,
      ])}
    >
      {blurChild && blurChild}
      <div className="w-full flex items-center justify-between mb-3 sm:mb-4">
        <Rating
          initialValue={data.rating}
          allowFraction
          SVGclassName="inline-block"
          size={23}
          readonly
        />
        {isAction && (
          <Button variant="ghost" size="small">
            <IoEllipsisHorizontal className="text-black/40 text-2xl" />
          </Button>
        )}
      </div>
      <div className="flex items-center mb-2 sm:mb-3">
        <strong className="text-black sm:text-xl mr-1">{data.user}</strong>
        <IoIosCheckmarkCircle className="text-[#01AB31] text-xl sm:text-2xl" />
      </div>
      <p className="text-sm sm:text-base text-black/60">{data.content}</p>
      {isDate && (
        <p className="text-black/60 text-sm font-medium mt-4 sm:mt-6">
          Posted on {data.date}
        </p>
      )}
    </div>
  );
};

import PropTypes from "prop-types";

ReviewCard.propTypes = {
  blurChild: PropTypes.node,
  isAction: PropTypes.bool,
  isDate: PropTypes.bool,
  data: PropTypes.shape({
    rating: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
};

export default ReviewCard;
