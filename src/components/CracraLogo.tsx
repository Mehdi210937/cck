import cracraTypo from '@/assets/cracra-typo.svg';

const CracraLogo = () => {
  return (
    <div className="h-6 md:h-8 w-auto">
      <svg
        viewBox="0 750 654.77 98.86"
        className="h-full w-auto"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <use href={`${cracraTypo}#layer1`} />
      </svg>
    </div>
  );
};

export default CracraLogo;
