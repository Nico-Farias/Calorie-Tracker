type CalorieDisplayProps = {
  calories: number;
  texto: string;
};

const CalorieDisplay = ({ calories, texto }: CalorieDisplayProps) => {
  return (
    <p className="text-white rounded-full font-bold grid grid-cols-1 gap-3 text-center">
      <span className="font-black text-6xl text-orange-50">{calories}</span>
      {texto}
    </p>
  );
};

export default CalorieDisplay;
