import { AiFillClockCircle } from "react-icons/ai";
import { HiX } from "react-icons/hi";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import autoAnimate from "@formkit/auto-animate";
import { CategoryFormPropsType } from "./types";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  createCategory,
  selectCategoryById,
  updateCategory,
} from "../../../redux/features/category/categorySlice";
import {
  createSubCategory,
  selectSubCategoryById,
  updateSubCategory,
} from "../../../redux/features/subCategory/subCategorySlice";
import { formatDistanceToNow } from "date-fns";
import Alert from "../Alert/Alert";

const CategoryFormModal = (props: CategoryFormPropsType) => {
  const updateFormType = props.type === "update";

  const dispatch = useAppDispatch();

  // this parent category will be used if the user is creating sub category
  const parentCategory = useAppSelector((state) => {
    const parentId = props.parentId;
    if (parentId) {
      return (
        selectCategoryById(state, parentId) ||
        selectSubCategoryById(state, parentId)
      );
    }
  });

  const [formData, setFormData] = useState({
    name: updateFormType ? props.category.name : "",
    description: updateFormType ? props.category.description : "",
  });
  const [formError, setFormError] = useState<{
    errorAt: "name" | "description";
    warnType?: boolean;
    message: string;
  } | null>(null);

  const parent = useRef<HTMLButtonElement>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "name") {
      if (value.length >= 30) {
        setFormError({
          errorAt: "name",
          warnType: true,
          message: "Max characters of category's name must be 30!",
        });
        return;
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.length) {
      setFormError({
        errorAt: "name",
        message: "Please fill out category's name!",
      });
      return;
    }

    if (!formData.description?.length) {
      setFormError({
        errorAt: "description",
        message: "Please fill out description!",
      });
      return;
    }
    if (!updateFormType) {
      dispatch(
        parentCategory
          ? createSubCategory({
              name: formData.name,
              description: formData.description,
              parentId: parentCategory?.id,
              createdAt: new Date().toISOString(),
            })
          : createCategory({
              name: formData.name,
              description: formData.description,
              createdAt: new Date().toISOString(),
            })
      );
      toast.success("Category created!", {
        autoClose: 3000,
        position: "top-right",
      });
    } else {
      dispatch(
        parentCategory
          ? updateSubCategory({
              id: props.category.id,
              changes: {
                name: formData.name,
                description: formData.description,
              },
            })
          : updateCategory({
              id: props.category.id,
              changes: {
                name: formData.name,
                description: formData.description,
              },
            })
      );

      toast.success("Category updated!", {
        autoClose: 3000,
        position: "top-right",
      });
    }
    setFormData({ name: "", description: "" });
    setFormError(null);
    props.onClose();
  };

  useEffect(() => {
    parent.current && autoAnimate(parent.current, { duration: 100 });
  }, []);

  return createPortal(
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 scale-0 bg-black/80 transition-all duration-300  z-[100]  ${
        props.open ? "scale-100" : "pointer-events-none delay-150"
      }`}
    >
      <div
        className={`fixed z-[101] duration-300 scale-0 ${
          props.open ? "scale-100 delay-150" : ""
        } top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white rounded p-5 min-w-[90%] md:min-w-[500px]`}
      >
        <button
          onClick={props.onClose}
          className="absolute top-5 right-5 text-xl"
        >
          <HiX />
        </button>
        <div>
          <h1 className="text-xl font-bold my-2 text-center lg:text-start flex flex-col items-center md:flex-row gap-1">
            <span>
              {props.type === "update" ? "Update" : "Create"} Category{" "}
            </span>
            {parentCategory && (
              <span className="text-sm">(under {parentCategory.name})</span>
            )}
          </h1>
          <div className="mt-5">
            <Alert
              show={!!formError}
              warnType={formError?.warnType}
              message={formError?.message || ""}
            />
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="block flex-col w-full"
            >
              <input
                type="text"
                id="category_name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter category's name"
                required={false}
                className={`px-5 py-2 w-full font-semibold placeholder:text-black/60 outline-none border ${
                  formError &&
                  formError.errorAt === "name" &&
                  !formError.warnType
                    ? "border-red-500"
                    : "border-black/30"
                } focus:border-black/60 duration-200 rounded block`}
              />
              <textarea
                id="category_description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                rows={10}
                className={`w-full mt-5 px-5 py-2 font-medium placeholder:text-black/60 outline-none border ${
                  formError && formError.errorAt === "description"
                    ? "border-red-500"
                    : "border-black/30"
                } focus:border-black/60 duration-200 rounded`}
              ></textarea>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-black/60">
                  {updateFormType ? (
                    <span className="flex items-center space-x-1">
                      <AiFillClockCircle />
                      <span>
                        {formatDistanceToNow(
                          new Date(props.category.createdAt),
                          { addSuffix: true }
                        )}
                      </span>
                    </span>
                  ) : (
                    ""
                  )}
                </span>
                <button className="px-5 py-2 bg-black text-white mt-5 hover:bg-black/80 active:bg-black rounded duration-200 inline-block">
                  {updateFormType ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CategoryFormModal;
