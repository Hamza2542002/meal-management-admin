import { Plus, X } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import MealsFormContent from "../components/meals/MealsFormContent";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import mealsService from "../services/mealService";

export default function AddMealPage() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      name: "",
      category: "",
      price: "",
      description: "",
      toppings: [],
      sideOption: "",
      tags: [],
      live: true,
      image: null,
    },
  });

  const onSubmit = async (data) => {
    console.log("FORM DATA:", data);
    // const meal = await mealsService.create(data);
    if (meal) {
      navigate("/meals");
      return;
    }

    form.setError("root.server", {
      type: "server",
      message: "Unable to save the meal. Please try again.",
    });
  };

  const onInvalid = (errors) => {
    console.log("FORM INVALID:", errors);
  };

  return (
    <form className="space-y-8 pt-8"
      onSubmit={form.handleSubmit(onSubmit, onInvalid)}
    >
      <PageHeader
        title="Add New Meal"
        description="Create a new meal by filling out the form below."
        buttons={[
          {
            id: "cancel",
            text: "Cancel",
            icon: X,
            onClick: () => navigate("/meals"),
            mode: "secondary"
          },
          {
            id: "add",
            text: "Save Meal",
            icon: Plus,
            type: "submit",
            mode: "primary-container"
          }
        ]}
      />

      {form.formState.errors.root?.server?.message && (
        <p role="alert" className="text-sm text-error">
          {form.formState.errors.root.server.message}
        </p>
      )}

      <section>
        <MealsFormContent
          register={form.register}
          errors={form.formState.errors}
          watch={form.watch}
          setValue={form.setValue} />
      </section>
    </form >
  )
}