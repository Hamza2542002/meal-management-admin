import { ArrowUpToLine, BadgeJapaneseYen, CloudUpload, Columns3Cog, DollarSign, FileImage, FileText, Leaf, Star, WavesArrowDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GeneralCard, GeneralCardBody, GeneralCardHeader } from "../common/GeneralCard";
import FormRow from "../common/FormRow";
import Input from "../common/Input";
import { IconInputField, InputField } from "../common/TextInput";
import DropDownInput from "../common/DropDownInput";
import useUploadImage from "../../hooks/useUploadImage";
import IngredientsCheckList from "./IngredientsCheckList";
import SidesRadioButtonList from "./SidesRadioButtonList";
import ToggleInput from "../common/ToggleInput";
import FormColumn from "../common/FormColumn";
import categoriesService from "../../services/categoriesService";
import { categoriesAtom } from "../../atoms/meals/categoryAtom";
import { useAtom } from "jotai";
import toppingsService from "../../services/toppingService";
import sidesService from "../../services/sidesService";

function CustomizationOptionsSkeleton() {
  return (
    <div className="animate-pulse space-y-6" role="status">
      <span className="sr-only">Loading toppings and side options...</span>
      <section aria-hidden="true">
        <div className="mb-4 h-5 w-36 rounded bg-surface-container" />
        <div className="grid grid-cols-12 gap-6">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="col-span-6 flex h-12 items-center gap-3 rounded-md border border-outline-variant p-3">
              <span className="h-5 w-5 rounded-sm bg-surface-container" />
              <span className="h-4 w-24 rounded bg-surface-container" />
            </div>
          ))}
        </div>
      </section>
      <section aria-hidden="true">
        <div className="mb-4 h-5 w-28 rounded bg-surface-container" />
        <div className="space-y-3">
          {[0, 1].map((item) => (
            <div key={item} className="flex h-12 items-center gap-3 rounded-md border border-outline-variant p-3">
              <span className="h-5 w-5 rounded-full bg-surface-container" />
              <span className="h-4 w-32 rounded bg-surface-container" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function MealsFormContent({ register, errors, watch, setValue }) {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mealCategories] = useAtom(categoriesAtom);
  const {
    file,
    previewUrl,
    error,
    selectImage,
    clearImage,
  } = useUploadImage();
  const imageRegistration = register("image", {
    required: "Meal image is required.",
  });
  useEffect(() => {
    Promise.all([
      categoriesService.getAll(),
      toppingsService.getAll(),
      sidesService.getAll(),
    ])
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <div className="flex flex-col gap-4 pb-4">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-8 flex flex-col gap-y-4">
          <GeneralCard>
            <GeneralCardHeader title="Basic Information" headIcon={FileText} />
            <GeneralCardBody>
              <FormRow>
                <FormColumn col={6}>
                  <Input label="Meal Name"><InputField
                    register={{
                      ...register("name", {
                        required: "Meal Name is required.",
                      })
                    }} error={errors.name} type="text" placeholder="Enter meal name" /></Input>
                </FormColumn>
                <FormColumn col={6}>
                  <Input label="Category">
                    <DropDownInput
                      register={{
                        ...register("category", {
                          required: "Category is required.",
                        })
                      }} error={errors.category}
                      setValue={setValue}
                      value={watch("category")}
                      label="Select a category"
                      options={mealCategories}
                    />
                  </Input>
                </FormColumn>
              </FormRow>
              <FormRow>
                <FormColumn col={12}>
                  <Input label="Description">
                    <InputField register={{
                      ...register("description", {
                        required: "Description is required.",
                      })
                    }} error={errors.description} type="textarea" placeholder="Enter meal description" /></Input>
                </FormColumn>
              </FormRow>
              <FormRow>
                <FormColumn col={6}>
                  <Input label="Base Price ($)">
                    <IconInputField register={{
                      ...register("basePrice", {
                        required: "Base Price is required.",
                      })
                    }} error={errors.basePrice} type="text" placeholder="0.00" Icon={DollarSign} />
                  </Input>
                </FormColumn>
              </FormRow>
            </GeneralCardBody>
          </GeneralCard>
          <GeneralCard>
            <GeneralCardHeader title="Customization Engine" headIcon={Columns3Cog} />
            <GeneralCardBody>
              {
                isLoading ? <CustomizationOptionsSkeleton /> :
                  <>
                    <IngredientsCheckList register={{ ...register("toppings") }} />
                    <SidesRadioButtonList register={{ ...register("sideOption") }} />
                  </>
              }
            </GeneralCardBody>
          </GeneralCard>
        </div>
        <div className="col-span-4 flex flex-col gap-y-4">
          <GeneralCard>
            <GeneralCardHeader title="Media" headIcon={FileImage} />
            <GeneralCardBody>
              <div className="hidden">
                <input
                  {...imageRegistration}
                  ref={(element) => {
                    imageRegistration.ref(element);
                    fileInputRef.current = element;
                  }}
                  onChange={(event) => {
                    imageRegistration.onChange(event);
                    const selectedFile = event.target.files?.[0];
                    if (selectedFile) {
                      selectImage(selectedFile);
                    }
                  }}
                  accept="image/jpeg,image/png,image/webp"
                  type="file"
                />
              </div>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`${previewUrl ? "after:bg-transparent" : ""} image-placeholder relative flex cursor-pointer items-center justify-center rounded-md text-md font-semibold`}
              >
                {previewUrl ? (
                  <img
                    src={previewUrl} alt={file?.name || "Meal preview"}
                    className="absolute inset-0 h-full w-full rounded-md object-cover" />
                ) : (
                  <div className="z-10 flex flex-col items-center gap-1">
                    <CloudUpload size={35} className="font-bold text-primary" />
                    <p className="text-inverse-surface">Upload meal image</p>
                    <p className="px-20 text-center">Recommended: Square aspect ratio 1:1, high resolution</p>
                  </div>
                )}
                {previewUrl && (
                  <button
                    type="button"
                    aria-label="Remove image"
                    onClick={(event) => {
                      event.stopPropagation();
                      clearImage();
                      fileInputRef.current.value = "";
                      setValue("image", null, { shouldDirty: true, shouldValidate: true });
                    }}
                    className="absolute right-2 top-2 z-20 rounded-full bg-white p-1 text-error shadow"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              {errors.image && <p className="mt-2 text-sm text-error">{errors.image.message}</p>}
              {file && !error && <p className="mt-2 truncate text-sm text-on-surface-variant">{file.name}</p>}
            </GeneralCardBody>
          </GeneralCard>
          <GeneralCard>
            <GeneralCardHeader title="Publishing" headIcon={ArrowUpToLine} />
            <GeneralCardBody>
              <div className="flex justify-between items-center py-5 border-b border-outline-variant">
                <div className="text">
                  <h3 className="capitalize text-inverse-surface font-semibold">Live on menue</h3>
                  <p className="capitalize text-outline">visible to all customers</p>
                </div>
                <ToggleInput
                  id="menueVisability"
                  checked={watch("live")}
                  onChange={(event) => setValue("live", event.target.checked, { shouldDirty: true })}
                />
              </div>
              <div className="">
                <h3 className="capitalize text-inverse-surface font-semibold">Daily tags</h3>
                <div className="mt-2 flex gap-y-3 gap-x-6 flex-wrap">
                  <span className="tag py-2 px-4 rounded-lg border border-outline-variant"><Leaf size={14} className="inline" /> Vegan</span>
                  <span className="tag py-2 px-4 rounded-lg border border-outline-variant"><BadgeJapaneseYen size={14} className="inline" /> Gluten Free</span>
                  <span className="tag py-2 px-4 rounded-lg border border-outline-variant"><WavesArrowDown size={14} className="inline" /> Low Carb</span>
                  <span className="tag py-2 px-4 rounded-lg border border-outline-variant"><Leaf size={14} className="inline" /> Vegan</span>
                </div>
              </div>
            </GeneralCardBody>
          </GeneralCard>
          <div className="p-4 bg-primary-container rounded-md ">
            <div className="flex items-center gap-5 mb-5">
              <Star className="inline text-secondary-dark font-bold" size={24} fontWeight={900} />
              <span className="uppercase text-white font-bold tracking-wide">Admit tip</span>
            </div>
            <p className="text-primary-fixed italic">"Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptatibus consectetur impedit officia, rem totam, temporibus ipsum numquam distinctio amet quo, doloribus nemo ex ullam? Quod quidem quibusdam minima incidunt."</p>
          </div>
        </div>
      </div>
    </div>
  )
}
