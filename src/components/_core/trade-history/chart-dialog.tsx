import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import { DialogChart } from "./dialog-chart";

export const ChartDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Image
          src={"/image/bar-chart.svg"}
          height={20}
          width={20}
          alt="chart"
          className="cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent className="bg-[#10101A] border-[#6B6C7033]">
        <DialogHeader>
          <DialogTitle>Trade ID</DialogTitle>
          <DialogDescription>
            7sdged-dg45-65ee-acfr-4312ccdcocd071
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex gap-6">
          <div className="text-sm space-y-2">
            <div className="font-semibold text-[#AEAEAE]">Asset:</div>
            <div className="flex gap-2 items-center">
              <div className="h-[30px] w-[30px] bg-[#26262BBA] flex justify-center items-center rounded-full">
                <Image
                  src="/apple_logo.svg.svg"
                  width={14}
                  height={14}
                  alt="apple"
                />
              </div>
              <div className="font-bold">Apple (OTC)</div>
            </div>
          </div>
          <div className="text-sm space-y-2">
            <div className="font-semibold text-[#AEAEAE]">Type:</div>
            <div className="flex gap-2 items-center">
              <div className="h-[30px] w-[30px] bg-[#10A05536] flex justify-center items-center rounded-full">
                <ArrowUp className="h-4 w-4" />
              </div>
              <div className="font-bold text-base">$1</div>
            </div>
          </div>
          <div className="text-sm space-y-2">
            <div className="font-semibold text-[#AEAEAE]">Duration:</div>
            <div className="flex gap-2 items-center">
              <div className="h-[30px] mt-1 font-bold text-base">00:00:31</div>
            </div>
          </div>
          <div className="text-sm space-y-2">
            <div className="font-semibold text-[#AEAEAE]">Result:</div>
            <div className="flex gap-2 items-center">
              <div className="h-[30px] mt-1 font-bold text-base text-[#10A055]">
                0+$1.90
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <DialogChart />

        <div className="flex gap-6 mt-10">
          <div className="font-semibold">
            <div className="text-[#AEAEAE]">Opening quote:</div>
            <div>1.95066</div>
            <div className="text-[#AEAEAE]">22-06-2024 17:28:03</div>
          </div>
          <div className="font-semibold">
            <div className="text-[#AEAEAE]">Closing quote:</div>
            <div>1.95066</div>
            <div className="text-[#AEAEAE]">22-06-2024 17:28:03</div>
          </div>
          <div className="font-semibold">
            <div className="text-[#AEAEAE]">Difference:</div>
            <div>1.95066</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
