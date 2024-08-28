import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calorias: 0,
};

const Form = ({ dispatch, state }: FormProps) => {
  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];
      setActivity(selectActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calorias"].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calorias } = activity;

    return name.trim() !== "" && calorias > 0;
  };

  const hanldeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "save-activity", payload: { newActivity: activity } });

    setActivity({ ...initialState, id: uuidv4() });
  };

  return (
    <form
      onSubmit={hanldeSubmit}
      className="space-y-5 bg-white shadow p-10 rounded-lg"
    >
      <div className=" grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoria:
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className=" grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          type="text"
          id="name"
          value={activity.name}
          onChange={handleChange}
          className="border border-slate-300 rounded-lg p-2"
          placeholder="Ej. Comida,Jugo , Ensalada, Pesas, Bici"
        />
      </div>

      <div className=" grid grid-cols-1 gap-3">
        <label htmlFor="calorias" className="font-bold">
          Calorias:
        </label>
        <input
          type="number"
          id="calorias"
          value={activity.calorias}
          onChange={handleChange}
          className="border border-slate-300 rounded-lg p-2"
          placeholder="Calorias, Ej . 200 , 500"
        />
      </div>

      <input
        disabled={!isValidActivity()}
        type="submit"
        value={activity.category === 1 ? "Guardar comida" : "Guardar Ejercicio"}
        className="bg-gray-800 disabled:opacity-10 hover:bg-gray-900 w-full p-2 text-white cursor-pointer font-bold uppercase"
      />
    </form>
  );
};

export default Form;
