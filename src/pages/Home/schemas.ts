import * as Yup from "yup";

export const newCardSchema = Yup.object({
  front: Yup.string().required("front required."),
  back: Yup.string().required("back required."),
});
