import React, { useEffect, useState } from "react";
import titleBorder from "../../../assets/title-bar-top.svg";
import icon1 from "../../../assets/box.svg";
import icon2 from "../../../assets/pocket.svg";
import icon3 from "../../../assets/star.svg";
import icon4 from "../../../assets/three-layers.svg";
import icon5 from "../../../assets/check-square.svg";
import icon6 from "../../../assets/list.svg";
import googleReview from "../../../assets/google-review.png";
import googleIcon from "../../../assets/google-icon.svg";
import { Image } from "primereact/image";
import { getGReviewData } from "../../../services/bookingServices";

const Thankyou = () => {
  const [reviewData, setReviewData] = useState();

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsData = await getGReviewData();
      if (reviewsData) {
        setReviewData(reviewsData);
      }
    };

    fetchReviews();
  }, [reviewData]);

  return (
    <div className="form-container">
      <div className="step1 w-full flex flex-grow justify-center px-4 overflow-x-hidden py-4 sm:py-14 sm:pb-6">
        <div className="w-full py-8 sm:py-5 md:px-40 opacity-100">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2
                style={{
                  "--bg-image-url": `url(${titleBorder})`,
                }}
                className={`before-border-image text-center relative mt-3 before:content-[''] before:top-[-15px] before:block before:text-center before:relative before:w-[200px] before:h-[5px] before:my-0 before:mx-auto`}
              >
                Thank You
              </h2>
              <h4 className="m-0 mb-4 text-center text-[#2A2A2A] text-[20px] font-normal">
                We'll be in contact shortly
              </h4>
              <p className="m-0 text-center">
                If you wish to speak with one of representatives, call (02) 9737
                111 <br></br>our friendly team will get your job booked
                immediately.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="heading">
              <h3 className="text-2xl font-medium text-center mb-3">
                Enjoy Numerous Benefits:
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="relative p-6 bg-white rounded-lg border-2 border-solid border-[#A2B9CF]">
                <div className="flex items-center mb-4 pr-16">
                  <div className="absolute top-[15px] right-[15px]">
                    <Image src={icon1} height="30" alt="" />
                  </div>
                  <h3 className="text-[#024FA3] text-[21px] leading-7 font-semibold m-0">
                    Free Removal Boxes*
                  </h3>
                </div>
                <p className="text-[15px] font-normal leading-6">
                  By providing you with free removal boxes, we are committed to
                  making your move smooth and stress-free.
                </p>
              </div>
              <div className="relative p-6 bg-white rounded-lg border-2 border-solid border-[#A2B9CF]">
                <div className="flex items-center mb-4 pr-16">
                  <div className="absolute top-[15px] right-[15px]">
                    <Image src={icon2} height="30" alt="" />
                  </div>
                  <h3 className="text-[#024FA3] text-[21px] leading-7 font-semibold m-0">
                    Removal Insurance
                  </h3>
                </div>
                <p>
                  As members of AFRA, we are able to offer you insurance against
                  accidental loss and damage during the relocation.
                </p>
              </div>
              <div className="relative p-6 bg-white rounded-lg border-2 border-solid border-[#A2B9CF]">
                <div className="flex items-center mb-4 pr-16">
                  <div className="absolute top-[15px] right-[15px]">
                    <Image src={icon3} height="30" alt="" />
                  </div>
                  <h3 className="text-[#024FA3] text-[21px] leading-7 font-semibold m-0">
                    Loyalty Reward
                  </h3>
                </div>
                <p>
                  Platinum Card qualifies you for generous discounts, vouchers,
                  special promotions and VIP service.
                </p>
              </div>
              <div className="relative p-6 bg-white rounded-lg border-2 border-solid border-[#A2B9CF]">
                <div className="flex items-center mb-4 pr-16">
                  <div className="absolute top-[15px] right-[15px]">
                    <Image src={icon4} height="30" alt="" />
                  </div>
                  <h3 className="text-[#024FA3] text-[21px] leading-7 font-semibold m-0">
                    Pre Packing Material
                  </h3>
                </div>
                <p>
                  Pre Packing can reduce costs on move day as it gives us a
                  clearer picture of the tactics employed on move day.
                </p>
              </div>
              <div className="relative p-6 bg-white rounded-lg border-2 border-solid border-[#A2B9CF]">
                <div className="flex items-center mb-4 pr-16">
                  <div className="absolute top-[15px] right-[15px]">
                    <Image src={icon5} height="30" alt="" />
                  </div>
                  <h3 className="text-[#024FA3] text-[21px] leading-7 font-semibold m-0">
                    Free Utility Services
                  </h3>
                </div>
                <p>
                  We offer FREE utilities changeover services for a seamless
                  move. Let AAA simplify your move.
                </p>
              </div>
              <div className="relative p-6 bg-white rounded-lg border-2 border-solid border-[#A2B9CF]">
                <div className="flex items-center mb-4 pr-16">
                  <div className="absolute top-[15px] right-[15px]">
                    <Image src={icon6} height="30" alt="" />
                  </div>
                  <h3 className="text-[#024FA3] text-[21px] leading-7 font-semibold m-0">
                    Unique Moving Tips
                  </h3>
                </div>
                <p>
                  To plan an efficient move is to hire skilled movers. We help
                  you to plan stress free move with unique moving tips.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-12">
            <div className="bg-[#002853] rounded-3xl shadow-[0_4px_12px_0px_rgba(0,0,0,0.15)] pt-16 px-8">
              <div className="flex flex-col mb-2">
                <div className="flex flex-col sm:flex-row items-center justify-center">
                  <h3
                    style={{
                      "--bg-image-url": `url(${titleBorder})`,
                    }}
                    className={`before-border-image text-center text-white text-[28px] relative mt-3 before:content-[''] before:top-[-15px] before:block before:text-center before:relative before:w-[200px] before:h-[5px] before:my-0 before:mx-auto`}
                  >
                    Over 7,000+ Satisfied Customers
                  </h3>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-stretch gap-16 px-6 pb-12 text-black">
                <Image src={googleReview} alt="" height="100" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-12">
              <div className="relative p-6 bg-white">
                <div className="flex items-center mb-4 pr-16">
                  <div className="review-name">
                    <div className="review-tag">
                      <span>R</span>
                    </div>
                    <div className="review-title-count">
                      <h3>Rob Manson</h3>
                      <p className="text-[12px] font-normal">
                        6 review . 1 Photo
                      </p>
                      <h5 className="m-0 star-rating text-[12px] font-normal leading-5">
                        5 months ago
                      </h5>
                    </div>
                  </div>
                  <div className="absolute top-[15px] right-[15px]">
                    <Image src={googleIcon} height="30" alt="" />
                  </div>
                </div>
                <p className="text-[15px] font-normal leading-6">
                  Truck 20, George and his boys did a great job with our move -
                  some massive items to get into some difficult spots, an
                  underground garage and very large wardrobes to be moved...
                </p>
              </div>
              <div className="relative p-6 bg-white">
                <div className="flex items-center mb-4 pr-16">
                  <div className="review-name">
                    <div className="review-tag">
                      <span>M</span>
                    </div>
                    <div className="review-title-count">
                      <h3>Manuel Micallef</h3>
                      <p className="text-[12px] font-normal">
                        1 review
                      </p>
                      <h5 className="m-0 star-rating text-[12px] font-normal leading-5">
                        a months ago
                      </h5>
                    </div>
                  </div>
                  <div className="absolute top-[15px] right-[15px]">
                    <Image src={googleIcon} height="30" alt="" />
                  </div>
                </div>
                <p>
                  Truck 55 driver Rawad, Joe and Danny I highly recommend these
                  boys! Their expertise in ensuring all our computer equipment
                  was wrapped and delivered safely was amazing! ...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
