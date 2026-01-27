import cracraTypo from '@/assets/cracra-typo.jpg';

const CracraLogo = () => {
  return (
    <img 
      src={cracraTypo} 
      alt="CRACRAKREW" 
      className="h-6 md:h-8 w-auto mix-blend-multiply dark:mix-blend-screen dark:invert"
    />
  );
};

export default CracraLogo;
