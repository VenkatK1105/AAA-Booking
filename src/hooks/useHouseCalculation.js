import { useCallback } from 'react';

const useHouseCalculation = (bedrooms) => {
  const calculateValues = useCallback(() => {
    let teamSize = 2;
    let truckSize = '4 Tonne';
    let hours = 0;

    switch (bedrooms) {
      case 1:
      case 2:
        hours = bedrooms === 1 ? 23 : 26;
        break;
      case 3:
        hours = 30;
        break;
      case 4:
        teamSize = 3;
        truckSize = '6 Tonne';
        hours = 31;
        break;
      case 5:
      default:
        teamSize = 4;
        truckSize = '8 Tonne';
        hours = 35;
        break;
    }

    return {
      teamSize,
      truckSize,
      hours: `${hours} - ${hours + 2}` // Approximate range
    };
  }, [bedrooms]);

  return calculateValues();
};

export default useHouseCalculation;