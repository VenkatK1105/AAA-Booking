import { useEffect, useState } from "react";
import { allPlans } from "../assets/utils";

export const calculateDeposit = (hourlyRate, callOutFee) => {
  return hourlyRate + callOutFee; // 1 hour + call out fee
};

export const calculateTotalFee = (
  hourlyRate,
  estimatedHours,
  additionalFees,
  gstRate,
  deposit
) => {
  const baseFee = hourlyRate * estimatedHours;
  const totalBeforeGST = baseFee + additionalFees;
  const gstAmount = totalBeforeGST * (gstRate / 100);
  const totalFee = totalBeforeGST + gstAmount;
  const totalPayable = totalFee - deposit;

  return {
    baseFee: baseFee.toFixed(2),
    totalBeforeGST: totalBeforeGST.toFixed(2),
    gstAmount: gstAmount.toFixed(2),
    totalFee: totalFee.toFixed(2),
    totalPayable: totalPayable.toFixed(2),
  };
};

export const useSuggestedPlan = (bedrooms, furnitureCount) => {
  const [suggestedPlan, setSuggestedPlan] = useState(null);

  useEffect(() => {
    const plan = allPlans.find((plan) => console.log(plan));
    setSuggestedPlan(plan);
  }, [bedrooms, furnitureCount]);

  return suggestedPlan;
};
