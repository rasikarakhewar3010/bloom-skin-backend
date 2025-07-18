import React from "react";
import { Timeline } from "@/components/ui/timeline";

const Steps = () => {
  const data = [
    {
      title: "Step 1: Snap & Share",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Take a bright, makeup-free selfie — your skincare journey begins here.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/images/snapshot.png"
              alt="snapshot"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
            />
            <img
              src="https://static.vecteezy.com/system/resources/previews/004/640/699/non_2x/circle-upload-icon-button-isolated-on-white-background-vector.jpg"
              alt="upload"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
            />
            <img
              src="/images/step1[3].png"
              alt="step 1"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
            />
            <img
              src="/images/ste1[4].png"
              alt="step 1"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Step 2: Let AI Do the Magic",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Behind the scenes, our smart AI scans every pixel to detect skin concerns.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/images/steo2[1].png"
              alt="step 2"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
            />
            <img
              src="/images/step2[2].jpeg"
              alt="step 2"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
            />
            <img
              src="/images/step3[1].jpeg"
              alt="step 3"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
            />
            <img
              src="/images/step3[2].png"
              alt="step 3"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Step 3: View History",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            View your Skin Analysis History
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/images/step3[[1]].png"
              alt="history 1"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
            />
            <img
              src="/images/step3[[2]].png"
              alt="history 2"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
};

export default Steps;
