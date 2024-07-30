import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useHouseCalculation from './useHouseCalculation'; // Adjust the path as needed

const useHouseDetails = (bedrooms) => {
  const calculationValues = useHouseCalculation(bedrooms);
  const [plansInfo, setPlansInfo] = useState([]);

  const appData = useSelector((state) => state.theme);

  useEffect(() => {
    setPlansInfo(appData?.allPlans || []);
  }, [appData]);

  const filteredPlans = useCallback(() => {
    const { teamSize, truckSize } = calculationValues;
    return plansInfo.filter((plan) => {
      const planTeamSize = parseInt(plan.features.find(f => f.includes('Men')) || '0', 10);
      const planTruckSize = plan.features.find(f => f.includes('Truck')) || '';

      return (
        planTeamSize >= teamSize &&
        planTruckSize.includes(truckSize.replace(' ', '-'))
      );
    });
  }, [calculationValues, plansInfo]);

  return filteredPlans();
};

export default useHouseDetails;